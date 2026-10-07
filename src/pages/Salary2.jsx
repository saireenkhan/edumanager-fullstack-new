import React, { useState, useEffect } from 'react';
import '../css/Campus.css';
import { Search, Wallet, Percent, Coins, ShieldAlert, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import Sidebar3 from '../components/Sidebar3';
import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';
import { salaryFormSchema } from '../Data/Data';

const API_BASE = 'http://localhost:5000/api/salary2';

const Salary2 = () => {
  const [showModal, setShowModal] = useState(false);
  const [salaries, setSalaries] = useState([]);
  const [totals, setTotals] = useState({ total: 0, earnings: 0, deductions: 0 });

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchedValue, setSearchedValue] = useState('');

  useEffect(() => {
    fetchSalaries();
    fetchTotals();
  }, []);

  async function fetchSalaries() {
    try {
      const res = await fetch(API_BASE);
      const json = await res.json();
      if (json.success) setSalaries(json.data);
    } catch (err) {
      console.error('Could not load salaries', err);
    }
  }

  async function fetchTotals() {
    try {
      const res = await fetch(`${API_BASE}/totals`);
      const json = await res.json();
      if (json.success) setTotals(json.data);
    } catch (err) {
      console.error('Could not load totals', err);
    }
  }

  async function handleAddSalary(formValues) {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
      const json = await res.json();

      if (json.success) {
        alert('Component added successfully!');
        setShowModal(false);
        fetchSalaries();
        fetchTotals();
      } else {
        alert(json.message || 'Failed to save component');
      }
    } catch (err) {
      alert('Network error — is the backend running?');
    }
  }

  const handleSearch = () => {
    setSearchedValue(searchText.trim());
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    // Jab search input clear ho, original fetched data wapas show hoga
    if (value.trim() === '') {
      setSearchedValue('');
    }
  };

  const displayedSalaries =
    searchedValue === ''
      ? salaries
      : salaries.filter((row) => {
          const componentName = row.componentName || '';
          const category = row.category || '';
          const calculationMethod = row.calculationMethod || '';
          const value = row.value ? String(row.value) : '';
          const taxableComponent = row.taxableComponent ? String(row.taxableComponent) : '';

          return (
            componentName.toLowerCase().includes(searchedValue.toLowerCase()) ||
            category.toLowerCase().includes(searchedValue.toLowerCase()) ||
            calculationMethod.toLowerCase().includes(searchedValue.toLowerCase()) ||
            value.toLowerCase().includes(searchedValue.toLowerCase()) ||
            taxableComponent.toLowerCase().includes(searchedValue.toLowerCase())
          );
        });

  return (
    <div className="campus-layout">
      <Sidebar3 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Salary Allowances & Deductions"
            subtitle="Manage recurring payroll components, tax configurations, and staff bonuses"
            btnText="New Component"
            onBtnClick={() => setShowModal(true)}
          />

          <section className="stats-container">
            <StatCard icon={Wallet} title="Total Components" value={totals.total} dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
            <StatCard icon={ArrowUpRight} title="Earnings" value={totals.earnings} dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={ArrowDownLeft} title="Deductions" value={totals.deductions} dotColor="var(--accent-red)" iconColor="var(--accent-red)" />
            <StatCard icon={Coins} title="Avg. Bonus" value="8%" dotColor="#f59e0b" iconColor="#f59e0b" />
          </section>

          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input
                type="text"
                placeholder="Search component (e.g. HRA, PF)..."
                value={searchText}
                onChange={handleSearchInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
            </div>
             <button className="filter-select" onClick={handleSearch}>Search</button>
          </div>

          <DataTable headers={['Component Name', 'Category', 'Calculation Type', 'Value', 'Taxable']}>
            {displayedSalaries.length > 0 ? (
              displayedSalaries.map((row) => (
                <tr key={row._id}>
                  <td><strong>{row.componentName}</strong></td>
                  <td>
                    {row.category === 'Earning (+)' ? (
                      <span style={{ color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <ArrowUpRight size={14} /> {row.category}
                      </span>
                    ) : (
                      <span style={{ color: '#dc2626', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <ArrowDownLeft size={14} /> {row.category}
                      </span>
                    )}
                  </td>
                  <td>{row.calculationMethod}</td>
                  <td>{row.value}</td>
                  <td>{row.taxableComponent}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                  No salary component found
                </td>
              </tr>
            )}
          </DataTable>
        </div>
      </div>

      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Define Payroll Component">
        <AddClassForm fields={salaryFormSchema} buttonText="Save Component" onSubmit={handleAddSalary} />
      </ModalWrapper>
    </div>
  );
};

export default Salary2;