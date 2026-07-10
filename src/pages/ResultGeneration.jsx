import React, { useState } from 'react';
import '../css/Campus.css'; // Maintains perfect layout alignment and cross-device media breakpoints
import { FileSpreadsheet, CheckCircle, Clock, Percent, Search } from 'lucide-react';
import Sidebar from '../components/Sidebar'; // Using your unified Sidebar component
import Header from '../components/Header';

// Shared Global UI Primitives
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';

// UNIQUE CONFIGURATION ASSETS - Pulling directly from your data module
import { resultsData, resultsFormSchema } from '../Data/Data';

export default function ResultGeneration() {
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
            title="Result Generation"
            subtitle="Compile term transcripts, compute cumulative GPA metrics, and dispatch formal student report cards"
            btnText="Generate New Report"
            onBtnClick={() => setShowModal(true)}
          />

          {/* 4. STATISTICS DASHBOARD GRID */}
          <section className="stats-container">
            <StatCard icon={FileSpreadsheet} title="Classes Compiled" value="06" dotColor="#555" />
            <StatCard icon={CheckCircle} title="Published Terms" value="04" dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={Clock} title="Awaiting Approval" value="02" dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
            <StatCard icon={Percent} title="Passing Rate" value="94.2%" dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
          </section>

          {/* 5. SEARCH & SELECT FILTERS ROW */}
          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input type="text" placeholder="Search by student or final grade..." />
            </div>
            <select className="filter-select"><option>Select Academic Year</option></select>
            <select className="filter-select"><option>Filter by Class</option></select>
            <select className="filter-select"><option>Publication Status</option></select>
          </div>

          {/* 6. RESPONSIVE CUSTOM DATA ENGINE TABLE */}
          <DataTable headers={['Student Name / Roll', 'Class & Sec', 'Total Grade Percentage', 'CGPA / Pointer', 'Term Framework', 'Status']}>
            {resultsData && resultsData.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.studentName}</strong>
                  <br />
                  <small style={{ color: '#555' }}>Roll No: {item.rollNo}</small>
                </td>
                <td>{item.classSection}</td>
                <td>
                  <strong>{item.percentage}%</strong>
                </td>
                <td>{item.gpa || '---'}</td>
                <td>{item.termName || 'Final Term'}</td>
                <td>
                  <span className={`status-badge ${
                    item.status.toLowerCase() === 'published' ? 'active' : 'suspended'
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
      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Compile Semester Report Cards">
        <AddClassForm fields={resultsFormSchema} buttonText="Generate & Publish Results" />
      </ModalWrapper>
    </div>
  );
}