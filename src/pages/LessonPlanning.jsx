import React, { useState, useEffect } from 'react';
import '../css/Campus.css';
import { Calendar, CheckCircle2, AlertCircle, Clock, Search } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';
import { lessonPlanFormSchema } from '../Data/Data';

const API_BASE = 'http://localhost:5000/api/lessonplanning';

export default function LessonPlanning() {
  const [showModal, setShowModal] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [totals, setTotals] = useState({ total: 0 });

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchedValue, setSearchedValue] = useState('');

  useEffect(() => {
    fetchLessons();
    fetchTotals();
  }, []);

  async function fetchLessons() {
    try {
      const res = await fetch(API_BASE);
      const json = await res.json();
      if (json.success) setLessons(json.data);
    } catch (err) {
      console.error('Could not load lessons', err);
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

  async function handleAddLesson(formValues) {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
      const json = await res.json();

      if (json.success) {
        alert('Lesson plan added successfully!');
        setShowModal(false);
        fetchLessons();
        fetchTotals();
      } else {
        alert(json.message || 'Failed to save lesson plan');
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

  const displayedLessons =
    searchedValue === ''
      ? lessons
      : lessons.filter((item) => {
          const topicName = item.topicName || '';
          const objective = item.objective || '';
          const subjectName = item.subjectName || '';
          const classSection = item.classSection || '';
          const scheduledDate = item.scheduledDate || '';
          const weekTerm = item.weekTerm || '';

          return (
            topicName.toLowerCase().includes(searchedValue.toLowerCase()) ||
            objective.toLowerCase().includes(searchedValue.toLowerCase()) ||
            subjectName.toLowerCase().includes(searchedValue.toLowerCase()) ||
            classSection.toLowerCase().includes(searchedValue.toLowerCase()) ||
            scheduledDate.toLowerCase().includes(searchedValue.toLowerCase()) ||
            weekTerm.toLowerCase().includes(searchedValue.toLowerCase())
          );
        });

  return (
    <div className="campus-layout">
      <Sidebar />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Lesson Planning"
            subtitle="Organize your weekly learning objectives, design course timelines, and track lecture milestones"
            btnText="Create Lesson Plan"
            onBtnClick={() => setShowModal(true)}
          />

          <section className="stats-container">
            <StatCard icon={Calendar} title="Total Plans" value={totals.total} dotColor="#555" />
            <StatCard icon={CheckCircle2} title="Approved Plans" value="09" dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={AlertCircle} title="Pending Review" value="02" dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
            <StatCard icon={Clock} title="Needs Revision" value="01" dotColor="var(--accent-red)" iconColor="var(--accent-red)" />
          </section>

          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input
                type="text"
                placeholder="Search by topic or subject name..."
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

          <DataTable headers={['Lesson Topic / Unit', 'Subject', 'Target Class & Sec', 'Scheduled Date', 'Week / Term']}>
            {displayedLessons.length > 0 ? (
              displayedLessons.map((item) => (
                <tr key={item._id}>
                  <td>
                    <strong>{item.topicName}</strong>
                    <br />
                    <small style={{ color: '#555' }}>{item.objective}</small>
                  </td>
                  <td>{item.subjectName}</td>
                  <td>{item.classSection}</td>
                  <td>{item.scheduledDate}</td>
                  <td>{item.weekTerm}</td>
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

      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Generate New Lesson Plan">
        <AddClassForm fields={lessonPlanFormSchema} buttonText="Submit Lesson Plan" onSubmit={handleAddLesson} />
      </ModalWrapper>
    </div>
  );
}