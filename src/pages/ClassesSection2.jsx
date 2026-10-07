import React, { useState, useEffect } from 'react';
import '../css/Campus.css';
import { Layers, Search, Users, LayoutGrid, Clock, ShieldCheck } from 'lucide-react';
import Sidebar3 from '../components/Sidebar3';
import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';
import { classesFormSchema } from '../Data/Data';

const API_BASE = '/api/classsection2';

const ClassesSection2 = () => {
  const [showModal, setShowModal] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [totals, setTotals] = useState({ total: 0, morning: 0, evening: 0 });

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchedValue, setSearchedValue] = useState('');

  useEffect(() => {
    fetchRegistrations();
    fetchTotals();
  }, []);

  async function fetchRegistrations() {
    try {
      const res = await fetch(API_BASE);
      const json = await res.json();
      if (json.success) setRegistrations(json.data);
    } catch (err) {
      console.error('Could not load registrations', err);
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

  async function handleAddRegistration(formValues) {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
      const json = await res.json();

      if (json.success) {
        alert('Registration added successfully!');
        setShowModal(false);
        fetchRegistrations();
        fetchTotals();
      } else {
        alert(json.message || 'Failed to save registration');
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

  const displayedRegistrations =
    searchedValue === ''
      ? registrations
      : registrations.filter((row) => {
          const studentName = row.studentName || '';
          const targetGrade = row.targetGrade || '';
          const submittedDocs = row.submittedDocs || '';
          const guardianContact = row.guardianContact || '';
          const admissionShift = row.admissionShift || '';
          const roomNumber = row.roomNumber || '';
          const className = row.className || '';

          return (
            studentName.toLowerCase().includes(searchedValue.toLowerCase()) ||
            targetGrade.toLowerCase().includes(searchedValue.toLowerCase()) ||
            submittedDocs.toLowerCase().includes(searchedValue.toLowerCase()) ||
            guardianContact.toLowerCase().includes(searchedValue.toLowerCase()) ||
            admissionShift.toLowerCase().includes(searchedValue.toLowerCase()) ||
            roomNumber.toLowerCase().includes(searchedValue.toLowerCase()) ||
            className.toLowerCase().includes(searchedValue.toLowerCase())
          );
        });

  return (
    <div className="campus-layout">
      <Sidebar3 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Classes & Sessions"
            subtitle="Define your grade levels and organize them into manageable sections and shifts"
            btnText="Add New Class"
            onBtnClick={() => setShowModal(true)}
          />

          <section className="stats-container">
            <StatCard icon={Layers} title="Total Applicants" value={totals.total} dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
            <StatCard icon={LayoutGrid} title="Morning Shift" value={totals.morning} dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={Users} title="Evening Shift" value={totals.evening} dotColor="#f59e0b" iconColor="#f59e0b" />
            <StatCard icon={ShieldCheck} title="Unassigned" value="02" dotColor="var(--accent-red)" iconColor="var(--accent-red)" />
          </section>

          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input
                type="text"
                placeholder="Search by class name or room number..."
                value={searchText}
                onChange={handleSearchInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
            </div>
            <button className="filter-select" onClick={handleSearch}>search</button>
          </div>

          <DataTable headers={['Student Name', 'Target Grade', 'Documents', 'Guardian Contact', 'Shift']}>
            {displayedRegistrations.length > 0 ? (
              displayedRegistrations.map((row) => (
                <tr key={row._id}>
                  <td><strong>{row.studentName}</strong></td>
                  <td>{row.targetGrade}</td>
                  <td>
                    {row.submittedDocs
                      ? row.submittedDocs.split(',').map((doc, idx) => (
                          <span
                            key={idx}
                            style={{
                              background: '#eff6ff',
                              color: '#1e40af',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              fontSize: '12px',
                              border: '1px solid #dbeafe',
                              marginRight: '4px',
                            }}
                          >
                            {doc.trim()}
                          </span>
                        ))
                      : '—'}
                  </td>
                  <td>{row.guardianContact}</td>
                  <td>
                    <Clock size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                    {row.admissionShift}
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

      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Define New Class Structure">
        <AddClassForm fields={classesFormSchema} buttonText="Initialize Class & Sections" onSubmit={handleAddRegistration} />
      </ModalWrapper>
    </div>
  );
};

export default ClassesSection2;