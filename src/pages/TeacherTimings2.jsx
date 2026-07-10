import React, { useState } from 'react';
import '../css/Campus.css'; 
import { 
  Search, 
  Watch, 
  CalendarDays, 
  UserCheck, 
  Coffee
} from 'lucide-react';
import Sidebar3 from '../components/Sidebar3';
import Header from '../components/Header';

// Shared Global Primitive Architecture Layers
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';

// Unique Configuration Assets
import { teacherTimingsData, teacherTimingsFormSchema } from '../Data/Data';

const TeacherTimings2 = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="campus-layout">
      {/* SIDEBAR */}
      <Sidebar3/>

      <div className="main-content">
        {/* HEADER */}
        <Header />

        <div className="page-container">
          {/* PAGE HEADER SECTION */}
          <PageHeader 
            title="Teacher Timings & Shifts"
            subtitle="Configure official school hours, shift rotations, and break intervals"
            btnText="Create New Shift"
            onBtnClick={() => setShowModal(true)}
          />

          {/* ATTENDANCE METRICS */}
          <section className="stats-container">
            <StatCard icon={Watch} title="Active Shifts" value="03" dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
            <StatCard icon={UserCheck} title="On-Time Rate" value="92%" dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={CalendarDays} title="Working Days" value="Mon-Sat" dotColor="#f59e0b" iconColor="#f59e0b" />
            <StatCard icon={Coffee} title="Avg. Break" value="40m" dotColor="var(--accent-red)" iconColor="var(--accent-red)" />
          </section>

          {/* FILTERS */}
          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input type="text" placeholder="Search shift name..." />
            </div>
            <select className="filter-select"><option>All Departments</option></select>
            <select className="filter-select"><option>Shift Status</option></select>
          </div>

          {/* ROSTER TABLE */}
          <DataTable headers={['Shift Name', 'In-Time', 'Out-Time', 'Grace Period', 'Days Applicable', 'Status']}>
            {teacherTimingsData.map((row) => (
              <tr key={row.id}>
                <td><strong>{row.name}</strong></td>
                <td>{row.inTime}</td>
                <td>{row.outTime}</td>
                <td>{row.gracePeriod}</td>
                <td>{row.days}</td>
                <td>
                  <span className="status-badge active" style={{ background: '#dcfce7', color: '#16a34a', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </DataTable>
        </div>
      </div>

      {/* SHIFT REGISTRATION MODAL */}
      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Setup Faculty Shift">
        <AddClassForm fields={teacherTimingsFormSchema} buttonText="Save Shift Timings" />
      </ModalWrapper>
    </div>
  );
};

export default TeacherTimings2;