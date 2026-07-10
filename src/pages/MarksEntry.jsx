import React, { useState } from 'react';
import '../css/Campus.css'; // Maintains perfect layout parity and responsive design
import { Clipboard, CheckSquare, AlertCircle, Award, Search } from 'lucide-react';
import Sidebar from '../components/Sidebar'; // Using your unified Sidebar component
import Header from '../components/Header';

// Shared Global UI Primitives
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';

// UNIQUE CONFIGURATION ASSETS - Reading straight from your centralized store
import { marksEntryData, marksEntryFormSchema } from '../Data/Data';

export default function MarksEntry() {
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
            title="Marks Entry"
            subtitle="Record academic exam grades, manage quiz scores, and track assessment metrics across subjects"
            btnText="Enter New Marks"
            onBtnClick={() => setShowModal(true)}
          />

          {/* 4. STATISTICS DASHBOARD GRID */}
          <section className="stats-container">
            <StatCard icon={Clipboard} title="Assessments Logged" value="08" dotColor="#555" />
            <StatCard icon={CheckSquare} title="Grading Complete" value="06" dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={AlertCircle} title="Draft / In Progress" value="02" dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
            <StatCard icon={Award} title="Class Average" value="78%" dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
          </section>

          {/* 5. SEARCH & SELECT FILTERS ROW */}
          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input type="text" placeholder="Search by student name or roll number..." />
            </div>
            <select className="filter-select"><option>All Classes</option></select>
            <select className="filter-select"><option>All Subjects</option></select>
            <select className="filter-select"><option>Assessment Type</option></select>
          </div>

          {/* 6. RESPONSIVE CUSTOM DATA ENGINE TABLE */}
          <DataTable headers={['Student Name / Roll', 'Class & Sec', 'Subject', 'Assessment Type', 'Obtained / Total', 'Status']}>
            {marksEntryData && marksEntryData.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.studentName}</strong>
                  <br />
                  <small style={{ color: '#555' }}>Roll No: {item.rollNo}</small>
                </td>
                <td>{item.classSection}</td>
                <td>{item.subjectName}</td>
                <td>{item.assessmentType || 'Midterm Exam'}</td>
                <td>
                  <strong>{item.obtainedMarks}</strong> / {item.totalMarks}
                </td>
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
      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Log Student Assessment Grades">
        <AddClassForm fields={marksEntryFormSchema} buttonText="Save Assessment Grades" />
      </ModalWrapper>
    </div>
  );
}