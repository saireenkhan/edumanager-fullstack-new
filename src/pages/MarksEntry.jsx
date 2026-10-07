import React, { useState, useEffect } from 'react';
import '../css/Campus.css';
import { Clipboard, CheckSquare, AlertCircle, Award, Search } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';
import { marksEntryFormSchema } from '../Data/Data';

const API_BASE = '/api/marks';

export default function MarksEntry() {
  const [showModal, setShowModal] = useState(false);
  const [marks, setMarks] = useState([]);
  const [totals, setTotals] = useState({ total: 0, avgPercentage: 0 });

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchedValue, setSearchedValue] = useState('');

  useEffect(() => {
    fetchMarks();
    fetchTotals();
  }, []);

  async function fetchMarks() {
    try {
      const res = await fetch(API_BASE);
      const json = await res.json();
      if (json.success) setMarks(json.data);
    } catch (err) {
      console.error('Could not load marks', err);
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

  async function handleAddMark(formValues) {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
      const json = await res.json();

      if (json.success) {
        alert('Marks added successfully!');
        setShowModal(false);
        fetchMarks();
        fetchTotals();
      } else {
        alert(json.message || 'Failed to save marks');
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

  const displayedMarks =
    searchedValue === ''
      ? marks
      : marks.filter((item) => {
          const studentName = item.studentName || '';
          const rollNo = item.rollNo || '';
          const classSection = item.classSection || '';
          const subjectName = item.subjectName || '';
          const assessmentType = item.assessmentType || '';
          const obtainedMarks = item.obtainedMarks ? String(item.obtainedMarks) : '';
          const totalMarks = item.totalMarks ? String(item.totalMarks) : '';

          return (
            studentName.toLowerCase().includes(searchedValue.toLowerCase()) ||
            rollNo.toLowerCase().includes(searchedValue.toLowerCase()) ||
            classSection.toLowerCase().includes(searchedValue.toLowerCase()) ||
            subjectName.toLowerCase().includes(searchedValue.toLowerCase()) ||
            assessmentType.toLowerCase().includes(searchedValue.toLowerCase()) ||
            obtainedMarks.toLowerCase().includes(searchedValue.toLowerCase()) ||
            totalMarks.toLowerCase().includes(searchedValue.toLowerCase())
          );
        });

  return (
    <div className="campus-layout">
      <Sidebar />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Marks Entry"
            subtitle="Record academic exam grades, manage quiz scores, and track assessment metrics across subjects"
            btnText="Enter New Marks"
            onBtnClick={() => setShowModal(true)}
          />

          <section className="stats-container">
            <StatCard icon={Clipboard} title="Assessments Logged" value={totals.total} dotColor="#555" />
            <StatCard icon={CheckSquare} title="Grading Complete" value="06" dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={AlertCircle} title="Draft / In Progress" value="02" dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
            <StatCard icon={Award} title="Class Average" value={`${totals.avgPercentage}%`} dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
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

          <DataTable headers={['Student Name / Roll', 'Class & Sec', 'Subject', 'Assessment Type', 'Obtained / Total']}>
            {displayedMarks.length > 0 ? (
              displayedMarks.map((item) => (
                <tr key={item._id}>
                  <td>
                    <strong>{item.studentName}</strong>
                    <br />
                    <small style={{ color: '#555' }}>Roll No: {item.rollNo}</small>
                  </td>
                  <td>{item.classSection}</td>
                  <td>{item.subjectName}</td>
                  <td>{item.assessmentType}</td>
                  <td>
                    <strong>{item.obtainedMarks}</strong> / {item.totalMarks}
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

      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Log Student Assessment Grades">
        <AddClassForm fields={marksEntryFormSchema} buttonText="Save Assessment Grades" onSubmit={handleAddMark} />
      </ModalWrapper>
    </div>
  );
}