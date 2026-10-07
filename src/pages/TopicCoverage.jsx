import React, { useState, useEffect } from 'react';
import '../css/Campus.css';
import { CheckCircle, Percent, AlertTriangle, BookOpen, Search } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';
import { topicCoverageFormSchema } from '../Data/Data';

const API_BASE = 'http://localhost:5000/api/topiccoverage';

export default function TopicCoverage() {
  const [showModal, setShowModal] = useState(false);
  const [topics, setTopics] = useState([]);
  const [totals, setTotals] = useState({ total: 0, completed: 0, inProgress: 0, notStarted: 0 });

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchedValue, setSearchedValue] = useState('');

  useEffect(() => {
    fetchTopics();
    fetchTotals();
  }, []);

  async function fetchTopics() {
    try {
      const res = await fetch(API_BASE);
      const json = await res.json();
      if (json.success) setTopics(json.data);
    } catch (err) {
      console.error('Could not load topics', err);
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

  async function handleAddTopic(formValues) {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
      const json = await res.json();

      if (json.success) {
        alert('Topic added successfully!');
        setShowModal(false);
        fetchTopics();
        fetchTotals();
      } else {
        alert(json.message || 'Failed to save topic');
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

  const displayedTopics =
    searchedValue === ''
      ? topics
      : topics.filter((item) => {
          const topicName = item.topicName || '';
          const chapterName = item.chapterName || '';
          const subjectName = item.subjectName || '';
          const classSection = item.classSection || '';
          const completionPercentage = item.completionPercentage ? String(item.completionPercentage) : '';
          const completionDate = item.completionDate || '';

          return (
            topicName.toLowerCase().includes(searchedValue.toLowerCase()) ||
            chapterName.toLowerCase().includes(searchedValue.toLowerCase()) ||
            subjectName.toLowerCase().includes(searchedValue.toLowerCase()) ||
            classSection.toLowerCase().includes(searchedValue.toLowerCase()) ||
            completionPercentage.toLowerCase().includes(searchedValue.toLowerCase()) ||
            completionDate.toLowerCase().includes(searchedValue.toLowerCase())
          );
        });

  return (
    <div className="campus-layout">
      <Sidebar />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Topic Coverage"
            subtitle="Track syllabus completion statuses, monitor academic progression, and update lecture logs"
            btnText="Log Covered Topic"
            onBtnClick={() => setShowModal(true)}
          />

          <section className="stats-container">
            <StatCard icon={CheckCircle} title="Completed Topics" value={totals.completed} dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={Percent} title="In Progress" value={totals.inProgress} dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
            <StatCard icon={AlertTriangle} title="Not Started" value={totals.notStarted} dotColor="var(--accent-red)" iconColor="var(--accent-red)" />
            <StatCard icon={BookOpen} title="Total Topics" value={totals.total} dotColor="#555" />
          </section>

          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input
                type="text"
                placeholder="Search by topic or chapter..."
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

          <DataTable headers={['Topic / Concept Name', 'Subject', 'Class & Sec', 'Completion (%)', 'Date Completed']}>
            {displayedTopics.length > 0 ? (
              displayedTopics.map((item) => (
                <tr key={item._id}>
                  <td>
                    <strong>{item.topicName}</strong>
                    <br />
                    <small style={{ color: '#555' }}>{item.chapterName}</small>
                  </td>
                  <td>{item.subjectName}</td>
                  <td>{item.classSection}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ background: '#e0e0e0', borderRadius: '4px', width: '60px', height: '6px', overflow: 'hidden' }}>
                        <div style={{
                          background: item.completionPercentage === 100 ? 'var(--accent-green)' : 'var(--accent-blue)',
                          width: `${item.completionPercentage}%`,
                          height: '100%'
                        }}></div>
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: '500' }}>{item.completionPercentage}%</span>
                    </div>
                  </td>
                  <td>{item.completionDate || '---'}</td>
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

      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Log Syllabus Progress Update">
        <AddClassForm fields={topicCoverageFormSchema} buttonText="Update Coverage Logs" onSubmit={handleAddTopic} />
      </ModalWrapper>
    </div>
  );
}