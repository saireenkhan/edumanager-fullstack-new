import React, { useState, useEffect } from 'react';
import '../css/Campus.css';
import { Wallet, Search, CreditCard, RefreshCcw, TrendingUp } from 'lucide-react';
import Sidebar2 from '../components/Sidebar2';
import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';
import { feeTypeFormSchema } from '../Data/Data';

const API_BASE = 'http://localhost:5000/api/feetype';

const FeeType = () => {
  const [showModal, setShowModal] = useState(false);
  const [feeTypes, setFeeTypes] = useState([]);
  const [totals, setTotals] = useState({ total: 0, monthly: 0, oneTime: 0, mandatory: 0 });

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchedValue, setSearchedValue] = useState('');

  useEffect(() => {
    fetchFeeTypes();
    fetchTotals();
  }, []);

  async function fetchFeeTypes() {
    try {
      const res = await fetch(API_BASE);
      const json = await res.json();
      if (json.success) setFeeTypes(json.data);
    } catch (err) {
      console.error('Could not load fee types', err);
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

  async function handleAddFeeType(formValues) {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
      const json = await res.json();

      if (json.success) {
        alert('Fee type added successfully!');
        setShowModal(false);
        fetchFeeTypes();
        fetchTotals();
      } else {
        alert(json.message || 'Failed to save fee type');
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

  const displayedFeeTypes =
    searchedValue === ''
      ? feeTypes
      : feeTypes.filter((row) => {
          const feeName = row.feeName || '';
          const lateFeeFineLogic = row.lateFeeFineLogic || '';
          const frequency = row.frequency || '';
          const ledgerAccount = row.ledgerAccount || '';
          const mandatoryForAll = row.mandatoryForAll ? 'yes' : 'no';
          const baseAmount = row.baseAmount ? String(row.baseAmount) : '';

          return (
            feeName.toLowerCase().includes(searchedValue.toLowerCase()) ||
            lateFeeFineLogic.toLowerCase().includes(searchedValue.toLowerCase()) ||
            frequency.toLowerCase().includes(searchedValue.toLowerCase()) ||
            ledgerAccount.toLowerCase().includes(searchedValue.toLowerCase()) ||
            mandatoryForAll.toLowerCase().includes(searchedValue.toLowerCase()) ||
            baseAmount.toLowerCase().includes(searchedValue.toLowerCase())
          );
        });

  return (
    <div className="campus-layout">
      <Sidebar2 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Fee Type & Structure"
            subtitle="Configure various fee categories, collection frequencies, and base amounts"
            btnText="Add Fee Type"
            onBtnClick={() => setShowModal(true)}
          />

          <section className="stats-container">
            <StatCard icon={Wallet} title="Active Fee Types" value={totals.total} dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
            <StatCard icon={RefreshCcw} title="Monthly Fees" value={totals.monthly} dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={CreditCard} title="One-Time Fees" value={totals.oneTime} dotColor="#f59e0b" iconColor="#f59e0b" />
            <StatCard icon={TrendingUp} title="Mandatory" value={totals.mandatory} dotColor="var(--accent-red)" iconColor="var(--accent-red)" />
          </section>

          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input
                type="text"
                placeholder="Search fee head (e.g. Tuition)..."
                value={searchText}
                onChange={handleSearchInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
            </div>
            <button className="filter-select" onClick={handleSearch}>search</button> 
          </div>

          <DataTable headers={['Fee Head / Name', 'Frequency', 'Ledger Account', 'Mandatory', 'Base Amount']}>
            {displayedFeeTypes.length > 0 ? (
              displayedFeeTypes.map((row) => (
                <tr key={row._id}>
                  <td>
                    <strong>{row.feeName}</strong><br />
                    <small style={{ color: '#6b7280' }}>{row.lateFeeFineLogic}</small>
                  </td>
                  <td>
                    <span style={{ fontWeight: '600' }}>{row.frequency}</span>
                  </td>
                  <td>{row.ledgerAccount}</td>
                  <td>{row.mandatoryForAll ? 'Yes' : 'No'}</td>
                  <td><strong>{row.baseAmount}</strong></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                  Nothing found
                </td>
              </tr>
            )}
          </DataTable>
        </div>
      </div>

      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Define Fee Type">
        <AddClassForm fields={feeTypeFormSchema} buttonText="Create Fee Head" onSubmit={handleAddFeeType} />
      </ModalWrapper>
    </div>
  );
};

export default FeeType;