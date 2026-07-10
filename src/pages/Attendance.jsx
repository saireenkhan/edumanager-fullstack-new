import React, { useState } from 'react';
import '../css/Campus.css'; // Keeps layout alignment and responsive layout grids identical
import { Users, CheckCircle, XCircle, AlertCircle, Search } from 'lucide-react';
import Sidebar from '../components/Sidebar'; // Using your unified Sidebar component
import Header from '../components/Header';

// Shared Global UI Primitives
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';

// UNIQUE CONFIGURATION ASSETS - Reading straight from your centralized store
import { attendanceData, attendanceFormSchema } from '../Data/Data';

export default function Attendance() {
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
            title="Attendance Tracking"
            subtitle="Record daily student presence, log institutional absences, and manage classroom roll calls"
            btnText="Mark Attendance"
            onBtnClick={() => setShowModal(true)}
          />

          {/* 4. STATISTICS DASHBOARD GRID */}
          <section className="stats-container">
            <StatCard icon={Users} title="Total Students" value="120" dotColor="#555" />
            <StatCard icon={CheckCircle} title="Present Today" value="112" dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={XCircle} title="Absence Logs" value="05" dotColor="var(--accent-red)" iconColor="var(--accent-red)" />
            <StatCard icon={AlertCircle} title="Leave Applications" value="03" dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
          </section>

          {/* 5. SEARCH & SELECT FILTERS ROW */}
          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input type="text" placeholder="Search by student name or roll number..." />
            </div>
            <select className="filter-select"><option>All Classes</option></select>
            <select className="filter-select"><option>Select Section</option></select>
            <select className="filter-select"><option>Attendance Status</option></select>
          </div>

          {/* 6. RESPONSIVE CUSTOM DATA ENGINE TABLE */}
          <DataTable headers={['Student Name / Roll', 'Class & Sec', 'Subject / Lecture', 'Date Logged', 'Remarks', 'Attendance Status']}>
            {attendanceData && attendanceData.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.studentName}</strong>
                  <br />
                  <small style={{ color: '#555' }}>Roll No: {item.rollNo}</small>
                </td>
                <td>{item.classSection}</td>
                <td>{item.subjectName || 'General Register'}</td>
                <td>{item.dateLogged}</td>
                <td>{item.remarks || 'No remarks recorded'}</td>
                <td>
                  <span className={`status-badge ${
                    item.status.toLowerCase() === 'present' ? 'active' : 
                    item.status.toLowerCase() === 'leave' ? 'suspended' : 'stale'
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
      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Log Classroom Attendance Register">
        <AddClassForm fields={attendanceFormSchema} buttonText="Save Attendance Register" />
      </ModalWrapper>
    </div>
  );
}