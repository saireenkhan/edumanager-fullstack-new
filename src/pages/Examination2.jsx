import React, { useState, useEffect } from 'react';
import '../css/Campus.css';
import { Search, ClipboardCheck, Trophy, AlertTriangle, Target } from 'lucide-react';
import Sidebar3 from '../components/Sidebar3';
import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';
import { examinationFormSchema } from '../Data/Data';

const API_BASE = 'http://localhost:5000/api/examination2';

const Examination2 = () => {
  const [showModal, setShowModal] = useState(false);
  const [examinations, setExaminations] = useState([]);
  const [totals, setTotals] = useState({ total: 0, monthly: 0, midTerm: 0, finalTerm: 0 });

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchedValue, setSearchedValue] = useState('');

  useEffect(() => {
    fetchExaminations();
    fetchTotals();
  }, []);

  async function fetchExaminations() {
    try {
      const res = await fetch(API_BASE);
      const json = await res.json();
      if (json.success) setExaminations(json.data);
    } catch (err) {
      console.error('Could not load examinations', err);
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

  async function handleAddExamination(formValues) {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
      const json = await res.json();

      if (json.success) {
        alert('Examination added successfully!');
        setShowModal(false);
        fetchExaminations();
        fetchTotals();
      } else {
        alert(json.message || 'Failed to save examination');
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

  const displayedExaminations =
    searchedValue === ''
      ? examinations
      : examinations.filter((row) => {
          const examTitle = row.examTitle || '';
          const termShortName = row.termShortName || '';
          const examCategory = row.examCategory || '';
          const resultPublicationDate = row.resultPublicationDate || '';
          const weightagePercentage = row.weightagePercentage
            ? String(row.weightagePercentage)
            : '';

          return (
            examTitle.toLowerCase().includes(searchedValue.toLowerCase()) ||
            termShortName.toLowerCase().includes(searchedValue.toLowerCase()) ||
            examCategory.toLowerCase().includes(searchedValue.toLowerCase()) ||
            resultPublicationDate.toLowerCase().includes(searchedValue.toLowerCase()) ||
            weightagePercentage.toLowerCase().includes(searchedValue.toLowerCase())
          );
        });

  return (
    <div className="campus-layout">
      <Sidebar3 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Examination Setup"
            subtitle="Define exam terms, grading scales, and weightage for academic assessments"
            btnText="Create Exam Term"
            onBtnClick={() => setShowModal(true)}
          />

          <section className="stats-container">
            <StatCard icon={ClipboardCheck} title="Total Exams" value={totals.total} dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
            <StatCard icon={Target} title="Monthly Tests" value={totals.monthly} dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={Trophy} title="Mid Terms" value={totals.midTerm} dotColor="#f59e0b" iconColor="#f59e0b" />
            <StatCard icon={AlertTriangle} title="Final Terms" value={totals.finalTerm} dotColor="var(--accent-red)" iconColor="var(--accent-red)" />
          </section>

          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input
                type="text"
                placeholder="Search by exam name (e.g. Midterm 2026)..."
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

          <DataTable headers={['Exam Name', 'Term Short Name', 'Category', 'Result Date', 'Weightage (%)']}>
            {displayedExaminations.length > 0 ? (
              displayedExaminations.map((row) => (
                <tr key={row._id}>
                  <td><strong>{row.examTitle}</strong></td>
                  <td>{row.termShortName}</td>
                  <td>{row.examCategory}</td>
                  <td>{row.resultPublicationDate}</td>
                  <td>{row.weightagePercentage}%</td>
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

      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="New Examination Setup">
        <AddClassForm fields={examinationFormSchema} buttonText="Initialize Examination" onSubmit={handleAddExamination} />
      </ModalWrapper>
    </div>
  );
};

export default Examination2;