import React, { useState } from 'react';
import '../css/Campus.css'; 
import { 
  Users2, 
  Search, 
  Briefcase, 
  Network, 
  UserCog, 
  ArrowRight 
} from 'lucide-react';
import Sidebar3 from '../components/Sidebar3';
import Header from '../components/Header';

// Shared Primitive Structural Building Blocks
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';

// Unique Configuration Assets
import { departmentsData, departmentFormSchema } from '../Data/Data';

const Departs2 = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="campus-layout">
      {/* 1. SIDEBAR */}
      <Sidebar3 />

      <div className="main-content">
        {/* 2. HEADER */}
        <Header />

        <div className="page-container">
          {/* 3. PAGE HEADER */}
          <PageHeader 
            title="Departments & Designations"
            subtitle="Organize your staff hierarchy by defining functional departments and job roles"
            btnText="Add New Unit"
            onBtnClick={() => setShowModal(true)}
          />

          {/* 4. STATISTICS */}
          <section className="stats-container">
            <StatCard icon={Network} title="Total Depts." value="08" dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
            <StatCard icon={Briefcase} title="Designations" value="24" dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={Users2} title="Active Staff" value="156" dotColor="#f59e0b" iconColor="#f59e0b" />
            <StatCard icon={UserCog} title="Head Roles" value="08" dotColor="var(--accent-red)" iconColor="var(--accent-red)" />
          </section>

          {/* 5. FILTERS */}
          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input type="text" placeholder="Search departments or roles..." />
            </div>
            <select className="filter-select"><option>Sort by Dept</option></select>
            <select className="filter-select"><option>Status</option></select>
          </div>

          {/* 6. TABLE */}
          <DataTable headers={['Department Name', 'Key Designations', 'Staff Count', 'HOD / Lead', 'Status', 'Action']}>
            {departmentsData.map((row) => (
              <tr key={row.id}>
                <td><strong>{row.name}</strong></td>
                <td>
                  {row.designations.map((badge, idx) => (
                    <span 
                      key={idx}
                      style={{ 
                        fontSize: '11px', 
                        background: '#f3f4f6', 
                        padding: '2px 6px', 
                        borderRadius: '4px', 
                        marginRight: idx < row.designations.length - 1 ? '4px' : '0px' 
                      }}
                    >
                      {badge}
                    </span>
                  ))}
                </td>
                <td>{row.staffCount}</td>
                <td>{row.lead}</td>
                <td>
                  <span className="status-badge active" style={{ background: '#dcfce7', color: '#16a34a', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }}>
                    {row.status}
                  </span>
                </td>
                <td>
                  <button style={{ color: 'var(--accent-blue)', border: 'none', background: 'none', cursor: 'pointer' }}>
                    <ArrowRight size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </DataTable>
        </div>
      </div>

      {/* 7. MODAL SCHEMATIC POPUP */}
      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Setup New Organizational Unit">
        <AddClassForm fields={departmentFormSchema} buttonText="Save Structure" />
      </ModalWrapper>
    </div>
  );
};

export default Departs2;