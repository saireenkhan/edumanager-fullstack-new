import React, { useState } from 'react';
import '../css/Campus.css'; 
import { 
  Search, 
  Wallet, 
  Percent, 
  Coins, 
  ShieldAlert,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';
import Sidebar3 from '../components/Sidebar3';
import Header from '../components/Header';

// Shared Primitive Global Components
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';

// Unique Configuration Assets
import { salaryData, salaryFormSchema } from '../Data/Data';

const Salary2 = () => {
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
            title="Salary Allowances & Deductions"
            subtitle="Manage recurring payroll components, tax configurations, and staff bonuses"
            btnText="New Component"
            onBtnClick={() => setShowModal(true)}
          />

          {/* PAYROLL METRICS */}
          <section className="stats-container">
            <StatCard icon={Wallet} title="Active Allowances" value="12" dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
            <StatCard icon={ShieldAlert} title="Fixed Deductions" value="04" dotColor="var(--accent-red)" iconColor="var(--accent-red)" />
            <StatCard icon={Percent} title="Tax Brackets" value="03" dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={Coins} title="Avg. Bonus" value="8%" dotColor="#f59e0b" iconColor="#f59e0b" />
          </section>

          {/* FILTERS */}
          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input type="text" placeholder="Search component (e.g. HRA, PF)..." />
            </div>
            <select className="filter-select"><option>Earnings</option><option>Deductions</option></select>
            <select className="filter-select"><option>Taxable Only</option></select>
          </div>

          {/* PAYROLL TABLE */}
          <DataTable headers={['Component Name', 'Category', 'Calculation Type', 'Value', 'Taxable', 'Status']}>
            {salaryData.map((row) => (
              <tr key={row.id}>
                <td>
                  <strong>{row.name}</strong><br />
                  <small style={{ color: '#6b7280' }}>{row.description}</small>
                </td>
                <td>
                  {row.categoryType === 'earning' ? (
                    <span style={{ color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <ArrowUpRight size={14} /> {row.category}
                    </span>
                  ) : (
                    <span style={{ color: '#dc2626', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <ArrowDownLeft size={14} /> {row.category}
                    </span>
                  )}
                </td>
                <td>{row.calcType}</td>
                <td>{row.value}</td>
                <td>{row.taxable}</td>
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

      {/* MODAL CONFIGURATION CONTAINER */}
      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Define Payroll Component">
        <AddClassForm fields={salaryFormSchema} buttonText="Save Component" />
      </ModalWrapper>
    </div>
  );
};

export default Salary2;