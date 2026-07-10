import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DataTable from '../components/DataTable';
import "../css/Dashboard.css";
import Sidebar2 from "../components/Sidebar2";
import Header from "../components/Header";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

// Data array for the Ledger table
const accountsLedgerData = [
  { id: 1, code: "1010", name: "Cash Account", category: "Assets", subCategory: "Current Assets", balanceType: "Debit", status: "Active" },
  { id: 2, code: "2010", name: "Main Donations", category: "Revenue", subCategory: "Donations", balanceType: "Credit", status: "Active" }
];

const Dashboard2 = () => {
  // MONEY FLOW DATA
  const moneyFlowData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Income",
        data: [200000, 1800000, 300000, 450000, 700000, 350000, 600000, 150000, 950000, 500000, 700000, 500000],
        backgroundColor: "#3B82F6",
        borderRadius: 5,
        barThickness: 10,
      },
      {
        label: "Expense",
        data: [350000, 700000, 900000, 450000, 100000, 1800000, 750000, 120000, 850000, 480000, 800000, 1000000],
        backgroundColor: "#1E293B",
        borderRadius: 5,
        barThickness: 10,
      }
    ]
  };

  // OVERVIEW TRIPLE RING DATA
  const overviewData = {
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ["#3B82F6", "#F1F5F9"],
        borderWidth: 0,
        weight: 0.4,
      },
      {
        data: [50, 50],
        backgroundColor: ["#60A5FA", "#F1F5F9"],
        borderWidth: 0,
        weight: 0.4,
      },
      {
        data: [40, 60],
        backgroundColor: ["#1E293B", "#F1F5F9"],
        borderWidth: 0,
        weight: 0.4,
      }
    ]
  };

  return (
    <div className="dashboard-wrapper">
      <Sidebar2 />
      <div className="dashboard-main">
        <Header />
        <main className="dashboard-content">
          <div className="welcome-section">
            <p className="welcome-text">Welcome back,</p>
            <h1 className="welcome-name">Super Admin</h1>
          </div>

          {/* Stats Flex Grid Container */}
          <div className="stats-grid">
            <StatCard 
              title="Total Donations" 
              amount="RS: 55,000" 
              trend="30%" 
              up 
              color="#3B82F6" 
              path="M0 45 L20 35 L40 42 L60 20 L80 35 L100 45 L120 25" 
            />
            <StatCard 
              title="Monthly Income" 
              amount="RS: 10,000" 
              trend="30%" 
              up={false} 
              color="#9279d8" 
              path="M0 40 L25 20 L45 45 L65 25 L85 35 L105 50 L120 35" 
            />
            <StatCard 
              title="Expenses Summary" 
              amount="RS: 20,000" 
              trend="30%" 
              up 
              color="#3B82F6" 
              path="M0 45 L20 35 L40 42 L60 20 L80 35 L100 45 L120 25" 
            />
          </div>

          <div className="main-charts-row">
            {/* Money Flow */}
            <div className="container money-flow-card">
              <div className="section-header">
                <h3>Money Flow</h3>
                <div className="header-actions">
                  <div className="legend-custom">
                    <span><div className="dot income"/> Income</span>
                    <span><div className="dot expense"/> Expense</span>
                  </div>
                  <select className="chart-select"><option>All Account</option></select>
                  <select className="chart-select"><option>This year</option></select>
                </div>
              </div>
              <div className="chart-wrapper">
                <Bar data={moneyFlowData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
              </div>
            </div>

            {/* Overview - Fixed Size & Alignment */}
            <div className="container overview-card">
              <h3>Overview</h3>
              <div className="overview-body">
                <div className="radial-wrapper">
                  <Doughnut data={overviewData} options={{ cutout: "75%", spacing: 4, plugins: { legend: { display: false } } }} />
                </div>
                <div className="overview-legend">
                  <div className="legend-item"><span className="dot b1"/> Active <strong>22,500</strong></div>
                  <div className="legend-item"><span className="dot b2"/> Upcoming <strong>22,500</strong></div>
                  <div className="legend-item"><span className="dot b3"/> Close Vote <strong>22,500</strong></div>
                </div>
              </div>
            </div>
          </div>

          {/* LEDGER TABLE (Only Remaining Table) */}
          <div className="container ledger-card" style={{ marginTop: "30px" }}>
            <DataTable headers={['Account Code', 'Account Name', 'Category', 'Sub-Category', 'Balance Type', 'Status']}>
              {accountsLedgerData.map((row) => (
                <tr key={row.id}>
                  <td><strong>{row.code}</strong></td>
                  <td>{row.name}</td>
                  <td>{row.category}</td>
                  <td>{row.subCategory}</td>
                  <td>{row.balanceType}</td>
                  <td>
                    <span className="status-badge active" style={{ background: '#dcfce7', color: '#16a34a', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </DataTable>
          </div>

        </main>
      </div>
    </div>
  );
};

// Sub-Component: StatCard
const StatCard = ({ title, amount, trend, up, color, path }) => (
  <div className="stat-card">
    <div className="stat-card-header">
      <span className="stat-card-title">{title}</span>
      <span className="stat-card-date">Jan 24, 2022</span>
    </div>
    <div className="stat-card-body">
      <div className="stat-card-info">
        <p className="stat-amount">{amount}</p>
        <p className="stat-trend">
          <span 
            className="trend-badge" 
            style={{ backgroundColor: up ? "#DBEAFE" : "#FEE2E2", color: up ? "#0061bd" : "#dc2626" }}
          >
            {trend}
          </span>
          <span style={{ marginLeft: "6px", color: "#6b7280", fontSize: "12px" }}>than last week</span>
        </p>
      </div>
      <div className="stat-card-graph">
        <svg width="100" height="40" viewBox="0 0 120 50">
          <path 
            d={path} 
            fill="none" 
            stroke={color} 
            strokeWidth="3" 
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  </div>
);

export default Dashboard2;