import React, { useState } from 'react';
import '../css/Campus.css'; 
import { 
  Search, 
  ClipboardCheck, 
  Trophy, 
  AlertTriangle, 
  Target 
} from 'lucide-react';
import Sidebar3 from '../components/Sidebar3';
import Header from '../components/Header';

// Shared Primitive Global Elements
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';

// Unique Configuration Assets
import { examinationData, examinationFormSchema } from '../Data/Data';

const Examination2 = () => {
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
            title="Examination Setup"
            subtitle="Define exam terms, grading scales, and weightage for academic assessments"
            btnText="Create Exam Term"
            onBtnClick={() => setShowModal(true)}
          />

          {/* EXAMINATION METRICS */}
          <section className="stats-container">
            <StatCard icon={ClipboardCheck} title="Active Terms" value="03" dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
            <StatCard icon={Target} title="Grading Schemes" value="02" dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={Trophy} title="Result Status" value="Pending" dotColor="#f59e0b" iconColor="#f59e0b" />
            <StatCard icon={AlertTriangle} title="Failed Subjects" value="0%" dotColor="var(--accent-red)" iconColor="var(--accent-red)" />
          </section>

          {/* FILTERS */}
          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input type="text" placeholder="Search by exam name (e.g. Midterm 2026)..." />
            </div>
            <select className="filter-select"><option>Academic Session</option></select>
            <select className="filter-select"><option>Result Visibility</option></select>
          </div>

          {/* EXAM TERMS TABLE */}
          <DataTable headers={['Exam Name', 'Session', 'Term Type', 'Result Date', 'Weightage (%)', 'Status']}>
            {examinationData.map((row) => (
              <tr key={row.id}>
                <td><strong>{row.name}</strong></td>
                <td>{row.session}</td>
                <td>{row.type}</td>
                <td>{row.date}</td>
                <td>{row.weightage}</td>
                <td>
                  <span 
                    className="status-badge active" 
                    style={{ 
                      background: row.badgeStyles.background, 
                      color: row.badgeStyles.color, 
                      padding: '4px 10px', 
                      borderRadius: '20px', 
                      fontSize: '11px', 
                      fontWeight: '700' 
                    }}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </DataTable>
        </div>
      </div>

      {/* MODAL CONFIGURATION CONTAINER */}
      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="New Examination Setup">
        <AddClassForm fields={examinationFormSchema} buttonText="Initialize Examination" />
      </ModalWrapper>
    </div>
  );
};

export default Examination2;