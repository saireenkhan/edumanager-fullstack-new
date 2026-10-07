import React, { useState, useEffect } from 'react';
import '../css/Campus.css';
import { ClipboardList, CheckCircle2, Clock, AlertCircle, Search } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';
import { homeworkFormSchema } from '../Data/Data';

const API_BASE = 'http://localhost:5000/api/homework';

export default function Homework() {
  const [showModal, setShowModal] = useState(false);
  const [homeworks, setHomeworks] = useState([]);
  const [totals, setTotals] = useState({ total: 0 });

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchedValue, setSearchedValue] = useState('');

  useEffect(() => {
    fetchHomework();
    fetchTotals();
  }, []);

  async function fetchHomework() {
    try {
      const res = await fetch(API_BASE);
      const json = await res.json();
      if (json.success) setHomeworks(json.data);
    } catch (err) {
      console.error('Could not load homework', err);
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

  async function handleAddHomework(formValues) {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
      const json = await res.json();

      if (json.success) {
        alert('Homework added successfully!');
        setShowModal(false);
        fetchHomework();
        fetchTotals();
      } else {
        alert(json.message || 'Failed to save homework');
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

  const displayedHomeworks =
    searchedValue === ''
      ? homeworks
      : homeworks.filter((item) => {
          const title = item.title || '';
          const description = item.description || '';
          const subjectName = item.subjectName || '';
          const classSection = item.classSection || '';
          const issueDate = item.issueDate || '';
          const dueDate = item.dueDate || '';

          return (
            title.toLowerCase().includes(searchedValue.toLowerCase()) ||
            description.toLowerCase().includes(searchedValue.toLowerCase()) ||
            subjectName.toLowerCase().includes(searchedValue.toLowerCase()) ||
            classSection.toLowerCase().includes(searchedValue.toLowerCase()) ||
            issueDate.toLowerCase().includes(searchedValue.toLowerCase()) ||
            dueDate.toLowerCase().includes(searchedValue.toLowerCase())
          );
        });

  return (
    <div className="campus-layout">
      <Sidebar />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Homework Management"
            subtitle="Assign daily coursework assignments, specify submission deadlines, and monitor student grading progress"
            btnText="Assign Homework"
            onBtnClick={() => setShowModal(true)}
          />

          <section className="stats-container">
            <StatCard icon={ClipboardList} title="Total Assigned" value={totals.total} dotColor="#555" />
            <StatCard icon={CheckCircle2} title="Fully Graded" value="10" dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={Clock} title="Pending Review" value="03" dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
            <StatCard icon={AlertCircle} title="Overdue Cutoffs" value="01" dotColor="var(--accent-red)" iconColor="var(--accent-red)" />
          </section>

          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input
                type="text"
                placeholder="Search by homework title or description..."
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

          <DataTable headers={['Assignment Title', 'Subject', 'Class & Sec', 'Issue Date', 'Submission Deadline']}>
            {displayedHomeworks.length > 0 ? (
              displayedHomeworks.map((item) => (
                <tr key={item._id}>
                  <td>
                    <strong>{item.title}</strong>
                    <br />
                    <small style={{ color: '#555' }}>{item.description}</small>
                  </td>
                  <td>{item.subjectName}</td>
                  <td>{item.classSection}</td>
                  <td>{item.issueDate}</td>
                  <td>{item.dueDate}</td>
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

      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Publish New Student Assignment">
        <AddClassForm fields={homeworkFormSchema} buttonText="Publish Assignment" onSubmit={handleAddHomework} />
      </ModalWrapper>
    </div>
  );
}