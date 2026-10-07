import React, { useState, useEffect } from 'react';
import '../css/Campus.css';
import { FileSpreadsheet, CheckCircle, Clock, Percent, Search } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';
import { resultsFormSchema } from '../Data/Data';

const API_BASE = 'http://localhost:5000/api/resultgeneration';

export default function ResultGeneration() {
  const [showModal, setShowModal] = useState(false);
  const [results, setResults] = useState([]);
  const [totals, setTotals] = useState({ total: 0, avgPercentage: 0, passing: 0 });

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchedValue, setSearchedValue] = useState('');

  useEffect(() => {
    fetchResults();
    fetchTotals();
  }, []);

  async function fetchResults() {
    try {
      const res = await fetch(API_BASE);
      const json = await res.json();
      if (json.success) setResults(json.data);
    } catch (err) {
      console.error('Could not load results', err);
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

  async function handleAddResult(formValues) {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
      const json = await res.json();

      if (json.success) {
        alert('Result added successfully!');
        setShowModal(false);
        fetchResults();
        fetchTotals();
      } else {
        alert(json.message || 'Failed to save result');
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

  const displayedResults =
    searchedValue === ''
      ? results
      : results.filter((item) => {
          const studentName = item.studentName || '';
          const rollNo = item.rollNo || '';
          const classSection = item.classSection || '';
          const percentage = item.percentage ? String(item.percentage) : '';
          const gpa = item.gpa ? String(item.gpa) : '';
          const termName = item.termName || '';

          return (
            studentName.toLowerCase().includes(searchedValue.toLowerCase()) ||
            rollNo.toLowerCase().includes(searchedValue.toLowerCase()) ||
            classSection.toLowerCase().includes(searchedValue.toLowerCase()) ||
            percentage.toLowerCase().includes(searchedValue.toLowerCase()) ||
            gpa.toLowerCase().includes(searchedValue.toLowerCase()) ||
            termName.toLowerCase().includes(searchedValue.toLowerCase())
          );
        });

  return (
    <div className="campus-layout">
      <Sidebar />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Result Generation"
            subtitle="Compile term transcripts, compute cumulative GPA metrics, and dispatch formal student report cards"
            btnText="Generate New Report"
            onBtnClick={() => setShowModal(true)}
          />

          <section className="stats-container">
            <StatCard icon={FileSpreadsheet} title="Total Results" value={totals.total} dotColor="#555" />
            <StatCard icon={CheckCircle} title="Passing Students" value={totals.passing} dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={Clock} title="Avg Percentage" value={`${totals.avgPercentage}%`} dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
            <StatCard icon={Percent} title="Passing Rate" value={totals.total > 0 ? `${Math.round((totals.passing / totals.total) * 100)}%` : '0%'} dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
          </section>

          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input
                type="text"
                placeholder="Search by student or final grade..."
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

          <DataTable headers={['Student Name / Roll', 'Class & Sec', 'Total Grade Percentage', 'CGPA / Pointer', 'Term Framework']}>
            {displayedResults.length > 0 ? (
              displayedResults.map((item) => (
                <tr key={item._id}>
                  <td>
                    <strong>{item.studentName}</strong>
                    <br />
                    <small style={{ color: '#555' }}>Roll No: {item.rollNo}</small>
                  </td>
                  <td>{item.classSection}</td>
                  <td><strong>{item.percentage}%</strong></td>
                  <td>{item.gpa}</td>
                  <td>{item.termName}</td>
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

      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Compile Semester Report Cards">
        <AddClassForm fields={resultsFormSchema} buttonText="Generate & Publish Results" onSubmit={handleAddResult} />
      </ModalWrapper>
    </div>
  );
}