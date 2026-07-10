import React, { useState } from 'react';
import '../css/Campus.css'; // Maintains structural alignment and responsive queries
import { CheckCircle, Percent, AlertTriangle, BookOpen, Search } from 'lucide-react'; // FIXED: Changed ProgressPercent to Percent
import Sidebar from '../components/Sidebar'; // Using your unified Sidebar component
import Header from '../components/Header';

// Shared Global UI Primitives
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';

// UNIQUE CONFIGURATION ASSETS - Reading straight from your centralized store
import { topicCoverageData, topicCoverageFormSchema } from '../Data/Data';

export default function TopicCoverage() {
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
            title="Topic Coverage"
            subtitle="Track syllabus completion statuses, monitor academic progression, and update lecture logs"
            btnText="Log Covered Topic"
            onBtnClick={() => setShowModal(true)}
          />

          {/* 4. STATISTICS DASHBOARD GRID */}
          <section className="stats-container">
            <StatCard icon={CheckCircle} title="Completed Topics" value="24" dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={Percent} title="In Progress" value="05" dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" /> {/* FIXED: Updated here */}
            <StatCard icon={AlertTriangle} title="Delayed Topics" value="02" dotColor="var(--accent-red)" iconColor="var(--accent-red)" />
            <StatCard icon={BookOpen} title="Total Chapters" value="08" dotColor="#555" />
          </section>

          {/* 5. SEARCH & SELECT FILTERS ROW */}
          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input type="text" placeholder="Search by topic or chapter..." />
            </div>
            <select className="filter-select"><option>All Subjects</option></select>
            <select className="filter-select"><option>All Classes</option></select>
            <select className="filter-select"><option>Coverage Status</option></select>
          </div>

          {/* 6. RESPONSIVE CUSTOM DATA ENGINE TABLE */}
          <DataTable headers={['Topic / Concept Name', 'Subject', 'Class & Sec', 'Completion (%)', 'Date Completed', 'Status']}>
            {topicCoverageData && topicCoverageData.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.topicName}</strong>
                  <br />
                  <small style={{ color: '#555' }}>{item.chapterName || 'General Unit'}</small>
                </td>
                <td>{item.subjectName}</td>
                <td>{item.classSection}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ background: '#e0e0e0', borderRadius: '4px', width: '60px', height: '6px', overflow: 'hidden' }}>
                      <div style={{ background: item.status.toLowerCase() === 'completed' ? 'var(--accent-green)' : 'var(--accent-blue)', width: `${item.completionPercentage}%`, height: '100%' }}></div>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '500' }}>{item.completionPercentage}%</span>
                  </div>
                </td>
                <td>{item.completionDate || '---'}</td>
                <td>
                  <span className={`status-badge ${
                    item.status.toLowerCase() === 'completed' ? 'active' : 
                    item.status.toLowerCase() === 'in progress' ? 'suspended' : 'stale'
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
      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Log Syllabus Progress Update">
        <AddClassForm fields={topicCoverageFormSchema} buttonText="Update Coverage Logs" />
      </ModalWrapper>
    </div>
  );
}