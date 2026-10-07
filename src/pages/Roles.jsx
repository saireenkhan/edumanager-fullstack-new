import React, { useEffect, useState } from 'react';
import '../css/Campus.css';

import {
  ShieldCheck,
  Search,
  Lock
} from 'lucide-react';

import Sidebar2 from '../components/Sidebar2';
import Header from '../components/Header';

import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';

import {
  rolesFormSchema,
  teacherFormSchema
} from '../Data/Data';

const API_BASE = '/api/roles';

const Roles = () => {
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showTeacherModal, setShowTeacherModal] = useState(false);

  const [roles, setRoles] = useState([]);

  const [totals, setTotals] = useState({
    totalAdmin: 0,
    totalTeachers: 0,
    total: 0
  });

  useEffect(() => {
    fetchRoles();
    fetchTotals();
  }, []);

  async function fetchRoles() {
    try {
      const res = await fetch(API_BASE);

      const json = await res.json();

      if (json.success) {
        setRoles(json.data);
      }
    } catch (error) {
      console.error('Fetch roles error:', error);
    }
  }

  async function fetchTotals() {
    try {
      const res = await fetch(`${API_BASE}/totals`);

      const json = await res.json();

      if (json.success) {
        setTotals(json.data);
      }
    } catch (error) {
      console.error('Fetch role totals error:', error);
    }
  }

  async function handleAdminSubmit(values) {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...values,
          roleType: 'Admin'
        })
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        alert(json.message || 'Something went wrong while saving admin');
        return;
      }

      setShowAdminModal(false);

      await fetchRoles();
      await fetchTotals();
    } catch (error) {
      console.error('Admin save error:', error);

      alert('Something went wrong while saving admin');
    }
  }

  async function handleTeacherSubmit(values) {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...values,
          roleType: 'Teacher'
        })
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        alert(json.message || 'Something went wrong while saving teacher');
        return;
      }

      setShowTeacherModal(false);

      await fetchRoles();
      await fetchTotals();
    } catch (error) {
      console.error('Teacher save error:', error);

      alert('Something went wrong while saving teacher');
    }
  }

  return (
    <div className="campus-layout">
      {/* SIDEBAR */}
      <Sidebar2 />

      <div className="main-content">
        {/* HEADER */}
        <Header />

        <div className="page-container">
          {/* PAGE HEADER */}
          <PageHeader
            title="Roles & Permissions"
            subtitle="Manage system access levels, security protocols, and specific module permissions"
            btnText="Create Admin"
            btnText2="Create Teacher"
            onBtnClick={() => setShowAdminModal(true)}
            onBtnClick2={() => setShowTeacherModal(true)}
          />

          {/* PERMISSION METRICS */}
          <section className="stats-container">
            <StatCard
              icon={Lock}
              title="Total Admin"
              value={totals.totalAdmin}
              dotColor="var(--accent-blue)"
              iconColor="var(--accent-blue)"
            />

            <StatCard
              icon={ShieldCheck}
              title="Total Teachers"
              value={totals.totalTeachers}
              dotColor="var(--accent-green)"
              iconColor="var(--accent-green)"
            />
          </section>

          {/* FILTERS */}
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
                placeholder="Search roles (e.g. Accountant)..."
              />
            </div>

            <button className="filter-select">
              search
            </button>
          </div>

          {/* ROLES TABLE */}
          <DataTable
            headers={[
              'User IDs',
              'Password'
            ]}
          >
            {roles.map((row) => (
              <tr key={row.id}>
                <td>{row.UserID}</td>
                <td>{row.Password}</td>
              </tr>
            ))}
          </DataTable>
        </div>
      </div>

      <ModalWrapper
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        title="Create Admin"
        style={{ maxWidth: '600px' }}
      >
        <AddClassForm
          fields={rolesFormSchema}
          buttonText="Create Admin"
          onSubmit={handleAdminSubmit}
        />
      </ModalWrapper>

      <ModalWrapper
        isOpen={showTeacherModal}
        onClose={() => setShowTeacherModal(false)}
        title="Create Teacher"
        style={{ maxWidth: '700px' }}
      >
        <AddClassForm
          fields={teacherFormSchema}
          buttonText="Create Teacher"
          onSubmit={handleTeacherSubmit}
        />
      </ModalWrapper>
    </div>
  );
};

export default Roles;