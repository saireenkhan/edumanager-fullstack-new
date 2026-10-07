import React, { useState, useEffect } from 'react';
import '../css/Campus.css';
import { Layers, Search, Users, LayoutGrid, Clock, ShieldCheck } from 'lucide-react';
import Sidebar2 from '../components/Sidebar2';
import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';
import { classesFormSchema } from '../Data/Data';

const API_BASE = '/api/classsection';

const ClassesSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [totals, setTotals] = useState({ totalApplicants: 0, morningShift: 0, eveningShift: 0 });

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
          const voucherNumber = row.voucherNumber || '';
          const phone = row.phone || '';

          return (
            studentName.toLowerCase().includes(searchedValue.toLowerCase()) ||
            targetGrade.toLowerCase().includes(searchedValue.toLowerCase()) ||
            submittedDocs.toLowerCase().includes(searchedValue.toLowerCase()) ||
            guardianContact.toLowerCase().includes(searchedValue.toLowerCase()) ||
            admissionShift.toLowerCase().includes(searchedValue.toLowerCase()) ||
            voucherNumber.toLowerCase().includes(searchedValue.toLowerCase()) ||
            phone.toLowerCase().includes(searchedValue.toLowerCase())
          );
        });

  return (
    <div className="campus-layout">
      <Sidebar2 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Admission & Registration"
            subtitle="Monitor ongoing enrollment phases, handle form distributions, and manage registered applicants"
            btnText="New Registration Form"
            onBtnClick={() => setShowModal(true)}
          />

          <section className="stats-container">
            <StatCard icon={Layers} title="Total Applicants" value={totals.totalApplicants} dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
            <StatCard icon={LayoutGrid} title="Morning Shift" value={totals.morningShift} dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={Users} title="Evening Shift" value={totals.eveningShift} dotColor="#f59e0b" iconColor="#f59e0b" />
          </section>

          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input
                type="text"
                placeholder="Search by applicant name, phone, or voucher number..."
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

          <DataTable headers={['Applicant Details', 'Target Level', 'Documents Submitted', 'Guardian Contact', 'Shift']}>
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

      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Issue Admission Form">
        <AddClassForm fields={classesFormSchema} buttonText="Generate Registration Record" onSubmit={handleAddRegistration} />
      </ModalWrapper>
    </div>
  );
};

export default ClassesSection;