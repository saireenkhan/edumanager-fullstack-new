import React, { useState, useEffect } from 'react';
import '../css/Campus.css';
import { Users, CheckCircle, XCircle, AlertCircle, Search } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';
import { attendanceFormSchema } from '../Data/Data';

const API_BASE = '/api/attendance';

export default function Attendance() {
  const [showModal, setShowModal] = useState(false);
  const [records, setRecords] = useState([]);
  const [totals, setTotals] = useState({ total: 0, present: 0, absent: 0, leave: 0 });

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchedValue, setSearchedValue] = useState('');

  useEffect(() => {
    fetchAttendance();
    fetchTotals();
  }, []);

  async function fetchAttendance() {
    try {
      const res = await fetch(API_BASE);
      const json = await res.json();
      if (json.success) setRecords(json.data);
    } catch (err) {
      console.error('Could not load attendance', err);
    }
  }

  async function fetchTotals() {
    try {
      const res = await fetch(`${API_BASE}/totals`);
      const json = await res.json();
      if (json.success) setTotals(json.data);
    } catch (err) {
      console.error('Could not load totals', err);
    }
  }

  async function handleAddAttendance(formValues) {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
      const json = await res.json();

      if (json.success) {
        alert('Attendance marked successfully!');
        setShowModal(false);
        fetchAttendance();
        fetchTotals();
      } else {
        alert(json.message || 'Failed to save attendance');
      }
    } catch (err) {
      alert('Network error — is the backend running?');
    }
  }

  const handleSearch = () => {
    setSearchedValue(searchText.trim());
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    // Jab search input clear ho, original fetched data wapas show hoga
    if (value.trim() === '') {
      setSearchedValue('');
    }
  };

  const displayedRecords =
    searchedValue === ''
      ? records
      : records.filter((item) => {
          const studentName = item.studentName || '';
          const rollNo = item.rollNo || '';
          const classSection = item.classSection || '';
          const subjectName = item.subjectName || '';
          const dateLogged = item.dateLogged || '';
          const status = item.status || '';

          return (
            studentName.toLowerCase().includes(searchedValue.toLowerCase()) ||
            rollNo.toLowerCase().includes(searchedValue.toLowerCase()) ||
            classSection.toLowerCase().includes(searchedValue.toLowerCase()) ||
            subjectName.toLowerCase().includes(searchedValue.toLowerCase()) ||
            dateLogged.toLowerCase().includes(searchedValue.toLowerCase()) ||
            status.toLowerCase().includes(searchedValue.toLowerCase())
          );
        });

  return (
    <div className="campus-layout">
      <Sidebar />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Attendance Tracking"
            subtitle="Record daily student presence, log institutional absences, and manage classroom roll calls"
            btnText="Mark Attendance"
            onBtnClick={() => setShowModal(true)}
          />

          <section className="stats-container">
            <StatCard icon={Users} title="Total Records" value={totals.total} dotColor="#555" />
            <StatCard icon={CheckCircle} title="Present" value={totals.present} dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={XCircle} title="Absent" value={totals.absent} dotColor="var(--accent-red)" iconColor="var(--accent-red)" />
            <StatCard icon={AlertCircle} title="Leave" value={totals.leave} dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
          </section>

          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input
                type="text"
                placeholder="Search by student name or roll number..."
                value={searchText}
                onChange={handleSearchInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
            </div>
            <button className="filter-select" onClick={handleSearch}>Search</button>
          </div>

          <DataTable headers={['Student Name / Roll', 'Class & Sec', 'Subject / Lecture', 'Date Logged', 'Attendance Status']}>
            {displayedRecords.length > 0 ? (
              displayedRecords.map((item) => (
                <tr key={item._id}>
                  <td>
                    <strong>{item.studentName}</strong>
                    <br />
                    <small style={{ color: '#555' }}>Roll No: {item.rollNo}</small>
                  </td>
                  <td>{item.classSection}</td>
                  <td>{item.subjectName}</td>
                  <td>{item.dateLogged}</td>
                  <td>
                    <span className={`status-badge ${
                      item.status.toLowerCase() === 'present' ? 'active' :
                      item.status.toLowerCase() === 'leave' ? 'suspended' : 'stale'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                  Nothing found
                </td>
              </tr>
            )}
          </DataTable>
        </div>
      </div>

      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Log Classroom Attendance Register">
        <AddClassForm fields={attendanceFormSchema} buttonText="Save Attendance Register" onSubmit={handleAddAttendance} />
      </ModalWrapper>
    </div>
  );
}