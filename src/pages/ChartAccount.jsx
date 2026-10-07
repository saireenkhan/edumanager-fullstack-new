import React, { useState, useEffect } from 'react';
import '../css/Campus.css';
import { Search, PieChart, ArrowUpRight, ArrowDownLeft, Banknote } from 'lucide-react';
import Sidebar2 from '../components/Sidebar2';
import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';
import { accountFormSchema } from '../Data/Data';

const API_BASE = '/api/chartaccount';

const ChartAccount = () => {
  const [showModal, setShowModal] = useState(false);
  const [accounts, setAccounts] = useState([]);
 const [totals, setTotals] = useState({ total: 0, debit: 0, credit: 0, assets: 0 });

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchedValue, setSearchedValue] = useState('');

  useEffect(() => {
    fetchAccounts();
    fetchTotals();
  }, []);

  async function fetchAccounts() {
    try {
      const res = await fetch(API_BASE);
      const json = await res.json();
      if (json.success) setAccounts(json.data);
    } catch (err) {
      console.error('Could not load accounts', err);
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

  async function handleAddAccount(formValues) {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
      const json = await res.json();

      if (json.success) {
        alert('Account added successfully!');
        setShowModal(false);
        fetchAccounts();
        fetchTotals();
      } else {
        alert(json.message || 'Failed to save account');
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

  const displayedAccounts =
    searchedValue === ''
      ? accounts
      : accounts.filter((row) => {
          const accountCode = row.accountCode || '';
          const accountName = row.accountName || '';
          const primaryCategory = row.primaryCategory || '';
          const balanceType = row.balanceType || '';

          return (
            accountCode.toLowerCase().includes(searchedValue.toLowerCase()) ||
            accountName.toLowerCase().includes(searchedValue.toLowerCase()) ||
            primaryCategory.toLowerCase().includes(searchedValue.toLowerCase()) ||
            balanceType.toLowerCase().includes(searchedValue.toLowerCase())
          );
        });

  return (
    <div className="campus-layout">
      <Sidebar2 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Chart of Accounts"
            subtitle="Manage your general ledger accounts, financial categories, and opening balances"
            btnText="Add New Account"
            onBtnClick={() => setShowModal(true)}
          />

          <section className="stats-container">
            <StatCard icon={PieChart} title="Total Accounts" value={totals.total} dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
           <StatCard icon={ArrowUpRight} title="Total Debit" value={totals.debit} dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
<StatCard icon={ArrowDownLeft} title="Total Credit" value={totals.credit} dotColor="var(--accent-red)" iconColor="var(--accent-red)" />
            <StatCard icon={Banknote} title="Assets" value={totals.assets} dotColor="#f59e0b" iconColor="#f59e0b" />
          </section>

          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input
                type="text"
                placeholder="Search accounts by name or code..."
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

          <DataTable headers={['Account Code', 'Account Name', 'Category', 'Balance Type']}>
            {displayedAccounts.length > 0 ? (
              displayedAccounts.map((row) => (
                <tr key={row._id}>
                  <td><strong>{row.accountCode}</strong></td>
                  <td>{row.accountName}</td>
                  <td>{row.primaryCategory}</td>
                  <td>{row.balanceType}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                  Nothing found
                </td>
              </tr>
            )}
          </DataTable>
        </div>
      </div>

      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Chart Of Account">
        <AddClassForm fields={accountFormSchema} buttonText="Register Account" onSubmit={handleAddAccount} />
      </ModalWrapper>
    </div>
  );
};

export default ChartAccount;