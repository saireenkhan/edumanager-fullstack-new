import React, { useState } from 'react';
import '../css/Campus.css'; // Uses your core framework layout and media breakpoint rules
import { BookOpen, UserCheck, GraduationCap, Clock, Search } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

// Shared Global UI Primitives
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';

// UNIQUE CONFIGURATION ASSETS - Imported cleanly from your unified data file
import { subjectAssignmentsData, subjectFormSchema } from '../Data/Data';

export default function SubjectAssignment() {
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
            title="Subject Assignment"
            subtitle="Allocate academic subjects, credit allocations, and assign instructors to specific classrooms"
            btnText="Assign New Subject"
            onBtnClick={() => setShowModal(true)}
          />

          {/* 4. STATISTICS DASHBOARD GRID */}
          <section className="stats-container">
            <StatCard icon={BookOpen} title="Total Subjects" value="18" dotColor="#555" />
            <StatCard icon={UserCheck} title="Assigned Allocations" value="15" dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={GraduationCap} title="Vacant Allocations" value="03" dotColor="var(--accent-red)" iconColor="var(--accent-red)" />
            <StatCard icon={Clock} title="Total Weekly Hours" value="72h" dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
          </section>

          {/* 5. SEARCH & SELECT FILTERS ROW */}
          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input type="text" placeholder="Search by subject name or code..." />
            </div>
            <select className="filter-select"><option>All Classes</option></select>
            <select className="filter-select"><option>Filter by Teacher</option></select>
            <select className="filter-select"><option>Allocation Status</option></select>
          </div>

          {/* 6. RESPONSIVE CUSTOM DATA ENGINE TABLE */}
          <DataTable headers={['Subject Details', 'Subject Code', 'Class / Section', 'Assigned Teacher', 'Weekly Allocation', 'Status']}>
            {subjectAssignmentsData && subjectAssignmentsData.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.subjectName}</strong>
                  <br />
                  <small style={{ color: '#555' }}>{item.type || 'Core Curriculum'}</small>
                </td>
                <td>{item.classCode}</td>
                <td>{item.classSection}</td>
                <td>{item.assignedTeacher}</td>
                <td>{item.weeklyHours}</td>
                <td>
                  <span className={`status-badge ${item.status.toLowerCase() === 'assigned' ? 'active' : 'suspended'}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </DataTable>
        </div>
      </div>

      {/* 7. REUSABLE DRAWER MODAL OVERLAY */}
      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Create New Subject Allocation">
        <AddClassForm fields={subjectFormSchema} buttonText="Save Subject Assignment" />
      </ModalWrapper>
    </div>
  );
}