import React from 'react';
import '../css/Campus.css'; 
import { useState } from 'react';
import { 
  RotateCw,
  Activity, 
  Search, 
  User, 
  Shield, 
  AlertCircle,
  Clock 
} from 'lucide-react';
import Sidebar2 from '../components/Sidebar2';
import Header from '../components/Header';

// Shared Primitive Structural Building Blocks
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';

// Unique Configuration Assets
import { logsData } from '../Data/Data';

const Logs = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simple sync handler to simulate data reloading
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };
  return (
    <div className="campus-layout">
      {/* SIDEBAR */}
      <Sidebar2 />

      <div className="main-content">
        {/* HEADER */}
        <Header />

        <div className="page-container">
          {/* PAGE HEADER SECTION */}
          <PageHeader 
            title="System Audit Logs"
            subtitle="Monitor real-time system activities, user transitions, and security events"
            btnText={
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RotateCw size={16} className={isRefreshing ? "spin-animation" : ""} />
                {isRefreshing ? "Refreshing..." : "Refresh Logs"}
              </span>
            }
            onBtnClick={handleRefresh}
          />

          {/* LOG ACTIVITY METRICS */}
          <section className="stats-container">
            <StatCard icon={Activity} title="Total Events" value="1,284" dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" showDot={false} />
            <StatCard icon={Shield} title="Logins Today" value="42" dotColor="var(--accent-green)" iconColor="var(--accent-green)" showDot={false} />
            <StatCard icon={AlertCircle} title="Critical Errors" value="03" dotColor="var(--accent-red)" iconColor="var(--accent-red)" showDot={false} />
            <StatCard icon={User} title="Active Sessions" value="12" dotColor="#f59e0b" iconColor="#f59e0b" showDot={false} />
          </section>

          {/* LOG FILTERS */}
          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input type="text" placeholder="Search by user or action..." />
            </div>
          <button className="filter-select">search</button>
          </div>

          {/* LOGS TABLE */}
          <DataTable headers={['Timestamp', 'User', 'Action', 'Module', 'IP Address', 'Status']}>
            {logsData.map((row) => (
              <tr key={row.id} style={row.rowStyle}>
                <td style={{ color: '#6b7280', fontSize: '13px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Clock size={14} /> {row.time}
                  </div>
                </td>
                <td>
                  <strong>{row.userName}</strong>
                  {row.userRole && <><br /><small>{row.userRole}</small></>}
                </td>
                <td>{row.action}</td>
                <td>{row.module}</td>
                <td>{row.ipAddress}</td>
                <td>
                  <span 
                    className="status-badge active" 
                    style={{ 
                      background: row.badgeStyle.background, 
                      color: row.badgeStyle.color, 
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
    </div>
  );
};

export default Logs;