import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

import "../css/Dashboard.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {

  const moneyFlowData = {
    labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    datasets: [
      {
        label: "Income",
        data: [100000,200000,150000,250000,180000,300000,220000,280000,320000,350000,370000,400000],
        backgroundColor: "#14243d",
        borderRadius: 6
      },
      {
        label: "Expense",
        data: [50000,100000,80000,120000,90000,150000,110000,140000,160000,180000,200000,220000],
        backgroundColor: "#60A5FA",
        borderRadius: 6
      }
    ]
  };

  const attendanceData = {
    labels: ["Aug","Sep","Oct","Nov"],
    datasets: [
      {
        label: "Attendance",
        data: [65,80,72,90],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59,130,246,0.2)",
        fill: true,
        tension: 0.45,
        borderWidth: 3,
        pointRadius: 6,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#3B82F6",
        pointBorderWidth: 3
      }
    ]
  };

  const trendData = {
    labels: ["20","25","30","35","40","45","50","55","60","65","70","75"],
    datasets: [
      {
        data: [20,60,45,50,40,80,35,65,25,50,30,45],
        backgroundColor: [
          "#E0F2FE","#E0F2FE","#E0F2FE","#E0F2FE",
          "#E0F2FE","#3B82F6","#E0F2FE","#E0F2FE",
          "#E0F2FE","#E0F2FE","#E0F2FE","#E0F2FE"
        ],
        borderRadius: 10
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        grid: { color: "#DBEAFE", borderDash: [5,5] },
        ticks: { color: "#1E3A8A", font: { size: 11 } }
      },
      x: {
        grid: { display: false },
        ticks: { color: "#1E3A8A", font: { size: 11 } }
      }
    }
  };

  return (
    <div className="dashboard-wrapper">
      <Sidebar/>
      <div className="dashboard-main">
        <Header/>
        <main className="dashboard-content">
          <div className="welcome-section">
            <p className="welcome-text">Welcome back,</p>
            <h1 className="welcome-name">Nathanirl Poole</h1>
          </div>

          {/* Cleaned Stat Grid Container Component Mounts */}
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

          <div className="content-grid">
            <div className="left-column">
              <div className="container">
                <div className="section-header">
                  <h3>Money Flow</h3>
                  <div className="legend">
                    <span><span className="legend-dot income"/> Income</span>
                    <span><span className="legend-dot expense"/> Expense</span>
                  </div>
                </div>
                <div className="chart-wrapper">
                  <Bar data={moneyFlowData} options={chartOptions}/>
                </div>
              </div>

              <div className="container">
                <h3>Attendance</h3>
                <div className="chart-wrapper">
                  <Line data={attendanceData} options={chartOptions}/>
                </div>
              </div>
            </div>

            <div className="right-column">
              <div className="container">
                <h3>Trend</h3>
                <div className="chart-wrapper">
                  <Bar data={trendData} options={chartOptions}/>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Reusable Sub-component
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
            {up ? "" : ""} {trend}
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
          <circle cx="60" cy="25" r="4" fill="white" stroke={color} strokeWidth="2"/>
        </svg>
      </div>
    </div>
  </div>
);

export default Dashboard;