import React, { useState, useEffect } from 'react';
import '../css/Campus.css';
import { BookOpen, Search, FileText, Award, BookMarked } from 'lucide-react';
import Sidebar3 from '../components/Sidebar3';
import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';
import { subjectsFormSchema } from '../Data/Data';

const API_BASE = 'http://localhost:5000/api/subjectmanagement2';

const SubjectManagement2 = () => {
  const [showModal, setShowModal] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [totals, setTotals] = useState({ total: 0, theory: 0, practical: 0, both: 0 });

  useEffect(() => {
    fetchSubjects();
    fetchTotals();
  }, []);

  async function fetchSubjects() {
    try {
      const res = await fetch(API_BASE);
      const json = await res.json();
      if (json.success) setSubjects(json.data);
    } catch (err) {
      console.error('Could not load subjects', err);
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

  async function handleAddSubject(formValues) {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
      const json = await res.json();

      if (json.success) {
        alert('Subject added successfully!');
        setShowModal(false);
        fetchSubjects();
        fetchTotals();
      } else {
        alert(json.message || 'Failed to save subject');
      }
    } catch (err) {
      alert('Network error — is the backend running?');
    }
  }

  return (
    <div className="campus-layout">
      <Sidebar3 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Subject Management"
            subtitle="Configure academic subjects, syllabus codes, and credit weightage"
            btnText="Add New Subject"
            onBtnClick={() => setShowModal(true)}
          />

          <section className="stats-container">
            <StatCard icon={BookOpen} title="Total Subjects" value={totals.total} dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
            <StatCard icon={FileText} title="Theory Based" value={totals.theory} dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={Award} title="Practical/Lab" value={totals.practical} dotColor="#f59e0b" iconColor="#f59e0b" />
            <StatCard icon={BookMarked} title="Both" value={totals.both} dotColor="var(--accent-red)" iconColor="var(--accent-red)" />
          </section>

          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input type="text" placeholder="Search by subject name or code..." />
            </div>
            <select className="filter-select"><option>Select Class</option></select>
            <select className="filter-select"><option>Subject Type</option></select>
          </div>

          <DataTable headers={['Subject Name', 'Subject Code', 'Assigned Class', 'Subject Type', 'Total Marks', 'Passing Marks']}>
            {subjects.map((row) => (
              <tr key={row._id}>
                <td>
                  <strong>{row.subjectName}</strong><br />
                  <small style={{ color: '#6b7280' }}>{row.subjectObjectives}</small>
                </td>
                <td>{row.subjectCode}</td>
                <td>{row.assignedClass}</td>
                <td>
                  <span style={{ fontWeight: '600' }}>
                    {row.subjectCategory}
                  </span>
                </td>
                <td>{row.totalMarks}</td>
                <td>{row.passingPercentage}%</td>
              </tr>
            ))}
          </DataTable>
        </div>
      </div>

      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Register New Subject">
        <AddClassForm fields={subjectsFormSchema} buttonText="Save Subject Configuration" onSubmit={handleAddSubject} />
      </ModalWrapper>
    </div>
  );
};

export default SubjectManagement2;