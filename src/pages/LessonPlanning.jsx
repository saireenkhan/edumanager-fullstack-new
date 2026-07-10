import React, { useState } from 'react';
import '../css/Campus.css'; // Keeps layout alignment and mobile queries identical
import { Calendar, CheckCircle2, AlertCircle, Clock, Search } from 'lucide-react';
import Sidebar from '../components/Sidebar'; // Uses your isolated teacher sidebar module
import Header from '../components/Header';

// Shared Global UI Primitives
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';

// UNIQUE CONFIGURATION ASSETS - Reading straight from your centralized store
import { lessonPlansData, lessonPlanFormSchema } from '../Data/Data';

export default function LessonPlanning() {
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
            title="Lesson Planning"
            subtitle="Organize your weekly learning objectives, design course timelines, and track lecture milestones"
            btnText="Create Lesson Plan"
            onBtnClick={() => setShowModal(true)}
          />

          {/* 4. STATISTICS DASHBOARD GRID */}
          <section className="stats-container">
            <StatCard icon={Calendar} title="Total Plans" value="12" dotColor="#555" />
            <StatCard icon={CheckCircle2} title="Approved Plans" value="09" dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={AlertCircle} title="Pending Review" value="02" dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
            <StatCard icon={Clock} title="Needs Revision" value="01" dotColor="var(--accent-red)" iconColor="var(--accent-red)" />
          </section>

          {/* 5. SEARCH & SELECT FILTERS ROW */}
          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input type="text" placeholder="Search by topic or subject name..." />
            </div>
            <select className="filter-select"><option>All Subjects</option></select>
            <select className="filter-select"><option>Sort by Week</option></select>
            <select className="filter-select"><option>Approval Status</option></select>
          </div>

          {/* 6. RESPONSIVE CUSTOM DATA ENGINE TABLE */}
          <DataTable headers={['Lesson Topic / Unit', 'Subject', 'Target Class & Sec', 'Scheduled Date', 'Week / Term', 'Status']}>
            {lessonPlansData && lessonPlansData.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.topicName}</strong>
                  <br />
                  <small style={{ color: '#555' }}>{item.objective || 'Objective-driven lecture'}</small>
                </td>
                <td>{item.subjectName}</td>
                <td>{item.classSection}</td>
                <td>{item.scheduledDate}</td>
                <td>{item.weekTerm || 'Week 1'}</td>
                <td>
                  <span className={`status-badge ${
                    item.status.toLowerCase() === 'approved' ? 'active' : 
                    item.status.toLowerCase() === 'pending' ? 'suspended' : 'stale'
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
      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Generate New Lesson Plan">
        <AddClassForm fields={lessonPlanFormSchema} buttonText="Submit Lesson Plan" />
      </ModalWrapper>
    </div>
  );
}