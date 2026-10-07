import React, { useState, useEffect } from 'react';
import '../css/Campus.css';
import { BookOpen, UserCheck, GraduationCap, Clock, Search } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';
import { subjectFormSchema } from '../Data/Data';

const API_BASE = '/api/subjectassignment';

export default function SubjectAssignment() {
  const [showModal, setShowModal] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [totals, setTotals] = useState({ total: 0 });

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchedValue, setSearchedValue] = useState('');

  useEffect(() => {
    fetchAssignments();
    fetchTotals();
  }, []);

  async function fetchAssignments() {
    try {
      const res = await fetch(API_BASE);
      const json = await res.json();
      if (json.success) setAssignments(json.data);
    } catch (err) {
      console.error('Could not load assignments', err);
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

  async function handleAddAssignment(formValues) {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
      const json = await res.json();

      if (json.success) {
        alert('Subject assignment added successfully!');
        setShowModal(false);
        fetchAssignments();
        fetchTotals();
      } else {
        alert(json.message || 'Failed to save assignment');
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

  const displayedAssignments =
    searchedValue === ''
      ? assignments
      : assignments.filter((item) => {
          const subjectName = item.subjectName || '';
          const classCode = item.classCode || '';
          const classSection = item.classSection || '';
          const assignedTeacher = item.assignedTeacher || '';
          const weeklyHours = item.weeklyHours ? String(item.weeklyHours) : '';

          return (
            subjectName.toLowerCase().includes(searchedValue.toLowerCase()) ||
            classCode.toLowerCase().includes(searchedValue.toLowerCase()) ||
            classSection.toLowerCase().includes(searchedValue.toLowerCase()) ||
            assignedTeacher.toLowerCase().includes(searchedValue.toLowerCase()) ||
            weeklyHours.toLowerCase().includes(searchedValue.toLowerCase())
          );
        });

  return (
    <div className="campus-layout">
      <Sidebar />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Subject Assignment"
            subtitle="Allocate academic subjects, credit allocations, and assign instructors to specific classrooms"
            btnText="Assign New Subject"
            onBtnClick={() => setShowModal(true)}
          />

          <section className="stats-container">
            <StatCard icon={BookOpen} title="Total Subjects" value={totals.total} dotColor="#555" />
            <StatCard icon={UserCheck} title="Assigned Allocations" value={totals.total} dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={GraduationCap} title="Vacant Allocations" value="03" dotColor="var(--accent-red)" iconColor="var(--accent-red)" />
            <StatCard icon={Clock} title="Total Weekly Hours" value="72h" dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
          </section>

          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input
                type="text"
                placeholder="Search by subject name or code..."
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

          <DataTable headers={['Subject Details', 'Subject Code', 'Class / Section', 'Assigned Teacher', 'Weekly Allocation']}>
            {displayedAssignments.length > 0 ? (
              displayedAssignments.map((item) => (
                <tr key={item._id}>
                  <td>
                    <strong>{item.subjectName}</strong>
                    <br />
                    <small style={{ color: '#555' }}>Core Curriculum</small>
                  </td>
                  <td>{item.classCode}</td>
                  <td>{item.classSection}</td>
                  <td>{item.assignedTeacher}</td>
                  <td>{item.weeklyHours}</td>
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

      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Create New Subject Allocation">
        <AddClassForm fields={subjectFormSchema} buttonText="Save Subject Assignment" onSubmit={handleAddAssignment} />
      </ModalWrapper>
    </div>
  );
}