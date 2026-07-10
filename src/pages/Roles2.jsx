import React, { useState } from 'react';
import '../css/Campus.css'; 
import { 
  ShieldCheck, 
  Search, 
  Lock, 
  ShieldAlert,
  UserCheck,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import Sidebar3 from '../components/Sidebar3';
import Header from '../components/Header';

// Shared Global Primitive Wrappers
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';

// Unique Configuration Assets
import { rolesData, rolesFormSchema } from '../Data/Data';

const Roles2 = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="campus-layout">
      {/* SIDEBAR */}
      <Sidebar3/>

      <div className="main-content">
        {/* HEADER */}
        <Header />

        <div className="page-container">
          {/* PAGE HEADER */}
          <PageHeader 
            title="Roles & Permissions"
            subtitle="Manage system access levels, security protocols, and specific module permissions"
            btnText="Create New Role"
            onBtnClick={() => setShowModal(true)}
          />

          {/* PERMISSION METRICS */}
          <section className="stats-container">
            <StatCard icon={Lock} title="Total Roles" value="06" dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
            <StatCard icon={ShieldCheck} title="Active Admins" value="03" dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={UserCheck} title="Assigned Users" value="42" dotColor="#f59e0b" iconColor="#f59e0b" />
            <StatCard icon={ShieldAlert} title="Restricted" value="12" dotColor="var(--accent-red)" iconColor="var(--accent-red)" />
          </section>

          {/* FILTERS */}
          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input type="text" placeholder="Search roles (e.g. Accountant)..." />
            </div>
            <select className="filter-select"><option>All Status</option></select>
            <select className="filter-select"><option>Security Level</option></select>
          </div>

          {/* ROLES TABLE */}
          <DataTable headers={['Role Title', 'Core Permissions', 'User Count', 'Last Modified', 'Security Status', 'Actions']}>
            {rolesData.map((row) => (
              <tr key={row.id}>
                <td><strong>{row.title}</strong></td>
                <td>
                  {row.permissions.map((badge, idx) => (
                    <span 
                      key={idx}
                      className="tag" 
                      style={{ 
                        background: '#e0f2fe', 
                        color: '#0369a1', 
                        padding: '2px 8px', 
                        borderRadius: '4px', 
                        fontSize: '11px', 
                        marginRight: idx < row.permissions.length - 1 ? '4px' : '0px' 
                      }}
                    >
                      {badge}
                    </span>
                  ))}
                </td>
                <td>{row.userCount}</td>
                <td>{row.lastModified}</td>
                <td>
                  <span className="status-badge active" style={{ background: '#dcfce7', color: '#16a34a', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }}>
                    {row.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '12px', color: '#6b7280' }}>
                    <Eye size={16} style={{ cursor: 'pointer' }} />
                    <Edit size={16} style={{ cursor: 'pointer' }} />
                    <Trash2 size={16} style={{ cursor: 'pointer', color: '#ef4444' }} />
                  </div>
                </td>
              </tr>
            ))}
          </DataTable>
        </div>
      </div>

      {/* ACCESS CONSOLE MODAL */}
      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Create Access Role" style={{ maxWidth: '600px' }}>
        <AddClassForm fields={rolesFormSchema} buttonText="Initialize Role Access" buttonMarginTop="2.5rem" />
      </ModalWrapper>
    </div>
  );
};

export default Roles2;