import React, {
  useEffect,
  useState
} from 'react';

import '../css/Campus.css';

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

import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';

const API_URL =
  'http://localhost:5000/api/login-logs';

const Logs = () => {
  const [isRefreshing, setIsRefreshing] =
    useState(false);

  const [logs, setLogs] = useState([]);

  const [searchTerm, setSearchTerm] =
    useState('');

  const [stats, setStats] = useState({
    totalEvents: 0,
    loginsToday: 0,
    successfulLogins: 0,
    failedLogins: 0
  });

  useEffect(() => {
    fetchLogs();
    fetchStats();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await fetch(
        API_URL
      );

      const json =
        await response.json();

      if (json.success) {
        setLogs(
          Array.isArray(json.data)
            ? json.data
            : []
        );
      }
    } catch (error) {
      console.error(
        'Fetch logs error:',
        error
      );
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(
        `${API_URL}/stats`
      );

      const json =
        await response.json();

      if (json.success) {
        setStats(json.data);
      }
    } catch (error) {
      console.error(
        'Fetch stats error:',
        error
      );
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);

    try {
      await Promise.all([
        fetchLogs(),
        fetchStats()
      ]);
    } finally {
      setIsRefreshing(false);
    }
  };

  const filteredLogs = logs.filter(
    (log) => {
      const search =
        searchTerm
          .trim()
          .toLowerCase();

      return (
        String(log.UserID || '')
          .toLowerCase()
          .includes(search) ||

        String(log.roleType || '')
          .toLowerCase()
          .includes(search) ||

        String(log.action || '')
          .toLowerCase()
          .includes(search) ||

        String(log.status || '')
          .toLowerCase()
          .includes(search)
      );
    }
  );

  const formatDate = (date) => {
    if (!date) {
      return '-';
    }

    return new Date(
      date
    ).toLocaleDateString();
  };

  const formatTime = (date) => {
    if (!date) {
      return '-';
    }

    return new Date(
      date
    ).toLocaleTimeString(
      'en-US',
      {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }
    );
  };

  return (
    <div className="campus-layout">
      <Sidebar2 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="System Audit Logs"
            subtitle="Monitor Admin and Teacher login and logout activities"
            btnText={
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <RotateCw
                  size={16}
                  className={
                    isRefreshing
                      ? 'spin-animation'
                      : ''
                  }
                />

                {isRefreshing
                  ? 'Refreshing...'
                  : 'Refresh Logs'}
              </span>
            }
            onBtnClick={handleRefresh}
          />

          <section className="stats-container">
            <StatCard
              icon={Activity}
              title="Total Events"
              value={stats.totalEvents}
              dotColor="var(--accent-blue)"
              iconColor="var(--accent-blue)"
              showDot={false}
            />

            <StatCard
              icon={Shield}
              title="Logins Today"
              value={stats.loginsToday}
              dotColor="var(--accent-green)"
              iconColor="var(--accent-green)"
              showDot={false}
            />

            <StatCard
              icon={User}
              title="Successful Logins"
              value={stats.successfulLogins}
              dotColor="var(--accent-green)"
              iconColor="var(--accent-green)"
              showDot={false}
            />

            <StatCard
              icon={AlertCircle}
              title="Failed Logins"
              value={stats.failedLogins}
              dotColor="var(--accent-red)"
              iconColor="var(--accent-red)"
              showDot={false}
            />
          </section>

          <div className="filters-row">
            <div className="search-box">
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '12px',
                  color: '#555'
                }}
              />

              <input
                type="text"
                placeholder="Search by user, role, action or status..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(
                    e.target.value
                  )
                }
              />
            </div>

            <button
              className="filter-select"
              type="button"
            >
              Search
            </button>
          </div>

          <DataTable
            headers={[
              'Date',
              'Time',
              'User ID',
              'Role',
              'Action',
              'Status'
            ]}
          >
            {filteredLogs.length > 0 ? (
              filteredLogs.map((row) => (
                <tr key={row._id}>
                  <td
                    style={{
                      color: '#6b7280',
                      fontSize: '13px'
                    }}
                  >
                    {formatDate(
                      row.loginTime
                    )}
                  </td>

                  <td
                    style={{
                      color: '#6b7280',
                      fontSize: '13px'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <Clock size={14} />

                      {formatTime(
                        row.loginTime
                      )}
                    </div>
                  </td>

                  <td>
                    <strong>
                      {row.UserID}
                    </strong>
                  </td>

                  <td>
                    {row.roleType}
                  </td>

                  <td>
                    <span
                      style={{
                        fontWeight: '700',
                        color:
                          row.action === 'Logout'
                            ? '#7c3aed'
                            : '#2563eb'
                      }}
                    >
                      {row.action || 'Login'}
                    </span>
                  </td>

                  <td>
                    <span
                      className="status-badge active"
                      style={{
                        background:
                          row.status === 'Success'
                            ? '#dcfce7'
                            : '#fee2e2',

                        color:
                          row.status === 'Success'
                            ? '#15803d'
                            : '#dc2626',

                        padding:
                          '4px 10px',

                        borderRadius:
                          '20px',

                        fontSize:
                          '11px',

                        fontWeight:
                          '700'
                      }}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: 'center',
                    padding: '20px'
                  }}
                >
                  No login logs found
                </td>
              </tr>
            )}
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Logs;