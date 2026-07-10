import React, { useState } from 'react';
import '../css/Campus.css'; // Keeps layout alignment and dashboard grids identical
import { ClipboardList, CheckCircle2, Clock, AlertCircle, Search } from 'lucide-react';
import Sidebar from '../components/Sidebar'; // Using your unified Sidebar component
import Header from '../components/Header';

// Shared Global UI Primitives
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';

// UNIQUE CONFIGURATION ASSETS - Reading straight from your centralized store
import { homeworkData, homeworkFormSchema } from '../Data/Data';

export default function Homework() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="campus-layout">
      {/* 1. SIDEBAR NAVIGATION */}
      <Sidebar />

      <div className="main-content">
        {/* 2. TOP BANNER NAVBAR */}
        <Header />

        <div className="page-container">
          {/* 3. PAGE HEADER & ACTIONS */}
          <PageHeader 
            title="Homework Management"
            subtitle="Assign daily coursework assignments, specify submission deadlines, and monitor student grading progress"
            btnText="Assign Homework"
            onBtnClick={() => setShowModal(true)}
          />

          {/* 4. STATISTICS DASHBOARD GRID */}
          <section className="stats-container">
            <StatCard icon={ClipboardList} title="Total Assigned" value="14" dotColor="#555" />
            <StatCard icon={CheckCircle2} title="Fully Graded" value="10" dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={Clock} title="Pending Review" value="03" dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
            <StatCard icon={AlertCircle} title="Overdue Cutoffs" value="01" dotColor="var(--accent-red)" iconColor="var(--accent-red)" />
          </section>

          {/* 5. SEARCH & SELECT FILTERS ROW */}
          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input type="text" placeholder="Search by homework title or description..." />
            </div>
            <select className="filter-select"><option>All Subjects</option></select>
            <select className="filter-select"><option>All Classes</option></select>
            <select className="filter-select"><option>Grading Status</option></select>
          </div>

          {/* 6. RESPONSIVE CUSTOM DATA ENGINE TABLE */}
          <DataTable headers={['Assignment Title', 'Subject', 'Class & Sec', 'Issue Date', 'Submission Deadline', 'Status']}>
            {homeworkData && homeworkData.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.title}</strong>
                  <br />
                  <small style={{ color: '#555' }}>{item.description || 'Syllabus assignment task'}</small>
                </td>
                <td>{item.subjectName}</td>
                <td>{item.classSection}</td>
                <td>{item.issueDate}</td>
                <td>{item.dueDate}</td>
                <td>
                  <span className={`status-badge ${
                    item.status.toLowerCase() === 'graded' ? 'active' : 
                    item.status.toLowerCase() === 'pending review' ? 'suspended' : 'stale'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </DataTable>
        </div>
      </div>

      {/* 7. REUSABLE DRAWER MODAL OVERLAY */}
      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Publish New Student Assignment">
        <AddClassForm fields={homeworkFormSchema} buttonText="Publish Assignment" />
      </ModalWrapper>
    </div>
  );
}