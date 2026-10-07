import React, { useState, useEffect } from 'react';
import '../css/Campus.css';
import { Users2, Search, Briefcase, Network, UserCog } from 'lucide-react';
import Sidebar3 from '../components/Sidebar3';
import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';
import { departmentFormSchema } from '../Data/Data';

const API_BASE = 'http://localhost:5000/api/departs2';

const Departs2 = () => {
  const [showModal, setShowModal] = useState(false);
  const [departs, setDeparts] = useState([]);
  const [totals, setTotals] = useState({ total: 0, academic: 0, administrative: 0, none: 0 });

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchedValue, setSearchedValue] = useState('');

  useEffect(() => {
    fetchDeparts();
    fetchTotals();
  }, []);

  async function fetchDeparts() {
    try {
      const res = await fetch(API_BASE);
      const json = await res.json();
      if (json.success) setDeparts(json.data);
    } catch (err) {
      console.error('Could not load departments', err);
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

  async function handleAddDepart(formValues) {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
      const json = await res.json();

      if (json.success) {
        alert('Department added successfully!');
        setShowModal(false);
        fetchDeparts();
        fetchTotals();
      } else {
        alert(json.message || 'Failed to save department');
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

  const displayedDeparts =
    searchedValue === ''
      ? departs
      : departs.filter((row) => {
          const departmentName = row.DepartmentName || '';
          const keyDesignation = row.KeyDesignation || '';
          const staffCount = row.StaffCount ? String(row.StaffCount) : '';
          const lead = row.Lead || '';

          return (
            departmentName.toLowerCase().includes(searchedValue.toLowerCase()) ||
            keyDesignation.toLowerCase().includes(searchedValue.toLowerCase()) ||
            staffCount.toLowerCase().includes(searchedValue.toLowerCase()) ||
            lead.toLowerCase().includes(searchedValue.toLowerCase())
          );
        });

  return (
    <div className="campus-layout">
      <Sidebar3 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Departments & Designations"
            subtitle="Organize your staff hierarchy by defining functional departments and job roles"
            btnText="Add New Unit"
            onBtnClick={() => setShowModal(true)}
          />

          <section className="stats-container">
            <StatCard icon={Network} title="Total Depts." value={totals.total} dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
            <StatCard icon={Briefcase} title="Academic" value={totals.academic} dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={Users2} title="Administrative" value={totals.administrative} dotColor="#f59e0b" iconColor="#f59e0b" />
            <StatCard icon={UserCog} title="Main Unit" value={totals.none} dotColor="var(--accent-red)" iconColor="var(--accent-red)" />
          </section>

          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input
                type="text"
                placeholder="Search departments or roles..."
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

          <DataTable headers={['Department Name', 'Key Designation', 'Staff Count', 'HOD / Lead']}>
            {displayedDeparts.length > 0 ? (
              displayedDeparts.map((row) => (
                <tr key={row._id}>
                  <td><strong>{row.DepartmentName}</strong></td>
                  <td>{row.KeyDesignation}</td>
                  <td>{row.StaffCount}</td>
                  <td>{row.Lead}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                  Nothing found
                </td>
              </tr>
            )}
          </DataTable>
        </div>
      </div>

      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Setup New Organizational Unit">
        <AddClassForm fields={departmentFormSchema} buttonText="Save Structure" onSubmit={handleAddDepart} />
      </ModalWrapper>
    </div>
  );
};

export default Departs2;