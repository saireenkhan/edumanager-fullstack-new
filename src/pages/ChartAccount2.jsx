import React, { useEffect, useState } from 'react';
import '../css/Campus.css';
import { Search, PieChart, ArrowUpRight, ArrowDownLeft, Banknote } from 'lucide-react';
import Sidebar3 from '../components/Sidebar3';
import Header from '../components/Header';

// Shared Interface Primitives
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';

// Unique Configuration Assets
import { accountFormSchema } from '../Data/Data';

const ChartAccount2 = () => {
  const [showModal, setShowModal] = useState(false);
  const [accountsLedgerData, setAccountsLedgerData] = useState([]);

  const [totals, setTotals] = useState({
    totalAccounts: 0,
    totalOpeningBalance: 0,
    totalDebitBalance: 0,
    totalCreditBalance: 0,
  });

  const API_URL = 'http://localhost:5000/api/chart-accounts-2';

  const fetchChartAccounts = async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();

      if (result.success) {
        setAccountsLedgerData(result.data || []);
        setTotals(
          result.totals || {
            totalAccounts: 0,
            totalOpeningBalance: 0,
            totalDebitBalance: 0,
            totalCreditBalance: 0,
          }
        );
      }
    } catch (error) {
      console.error('Chart accounts fetch error:', error);
    }
  };

  useEffect(() => {
    fetchChartAccounts();
  }, []);

  const handleSaveChartAccount = async (formData) => {
    try {
      const accountName = formData.accountName?.trim();
      const accountCode = formData.accountCode?.trim();

      if (!accountName) {
        alert('Account name is required');
        return;
      }

      if (!accountCode) {
        alert('Account code is required');
        return;
      }

      if (!formData.primaryCategory) {
        alert('Primary category is required');
        return;
      }

      if (!formData.balanceType) {
        alert('Balance type is required');
        return;
      }

      const duplicate = accountsLedgerData.some(
        (item) =>
          item.accountName?.trim().toLowerCase() === accountName.toLowerCase() ||
          item.name?.trim().toLowerCase() === accountName.toLowerCase() ||
          item.accountCode?.trim().toLowerCase() === accountCode.toLowerCase() ||
          item.code?.trim().toLowerCase() === accountCode.toLowerCase()
      );

      if (duplicate) {
        alert('This account name or account code already exists');
        return;
      }

      const payload = {
        accountName,
        accountCode,
        primaryCategory: formData.primaryCategory,
        balanceType: formData.balanceType,
        openingBalance: Number(formData.openingBalance) || 0,
        accountDescription: formData.accountDescription || '',
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!result.success) {
        alert(result.message || 'Failed to save chart account');
        return;
      }

      alert('Chart account added successfully');
      setShowModal(false);
      fetchChartAccounts();

    } catch (error) {
      console.error('Chart account save error:', error);
      alert('Something went wrong while saving chart account');
    }
  };

  const revenueHeads = accountsLedgerData.filter(
    (item) => item.primaryCategory === 'Revenue' || item.category === 'Revenue'
  ).length;

  const expenseHeads = accountsLedgerData.filter(
    (item) => item.primaryCategory === 'Expenses' || item.category === 'Expenses'
  ).length;

  return (
    <div className="campus-layout">
      {/* SIDEBAR */}
      <Sidebar3/>

      <div className="main-content">
        {/* HEADER */}
        <Header />

        <div className="page-container">
          {/* HEADER SECTION */}
          <PageHeader 
            title="Chart of Accounts"
            subtitle="Manage your general ledger accounts, financial categories, and opening balances"
            btnText="Add New Account"
            onBtnClick={() => setShowModal(true)}
          />

          {/* FINANCIAL OVERVIEW STATS */}
          <section className="stats-container">
            <StatCard 
              icon={PieChart} 
              title="Total Accounts" 
              value={totals.totalAccounts} 
              dotColor="var(--accent-blue)" 
              iconColor="var(--accent-blue)" 
            />

            <StatCard 
              icon={ArrowUpRight} 
              title="Revenue Heads" 
              value={revenueHeads} 
              dotColor="var(--accent-green)" 
              iconColor="var(--accent-green)" 
            />

            <StatCard 
              icon={ArrowDownLeft} 
              title="Expense Heads" 
              value={expenseHeads} 
              dotColor="var(--accent-red)" 
              iconColor="var(--accent-red)" 
            />

            <StatCard 
              icon={Banknote} 
              title="Opening Balance" 
              value={totals.totalOpeningBalance} 
              dotColor="#f59e0b" 
              iconColor="#f59e0b" 
            />
          </section>

          {/* FILTERS */}
          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input type="text" placeholder="Search accounts by name or code..." />
            </div>
            <button className='filter-select'>Search</button>
          </div>

          {/* LEDGER TABLE */}
          <DataTable headers={['Account Code', 'Account Name', 'Category', 'Sub-Category', 'Balance Type']}>
            {accountsLedgerData.length > 0 ? (
              accountsLedgerData.map((row) => (
                <tr key={row.id}>
                  <td>
                    <strong>{row.code || row.accountCode}</strong>
                  </td>

                  <td>{row.name || row.accountName}</td>

                  <td>{row.category || row.primaryCategory}</td>

                  <td>{row.description || row.accountDescription || 'N/A'}</td>

                  <td>{row.balanceType}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                  No chart account found
                </td>
              </tr>
            )}
          </DataTable>
        </div>
      </div>

      {/* MODAL CONTAINER */}
      <ModalWrapper 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        title="New General Ledger Account"
      >
        <AddClassForm 
          fields={accountFormSchema} 
          buttonText="Register Account" 
          onSubmit={handleSaveChartAccount}
        />
      </ModalWrapper>
    </div>
  );
};

export default ChartAccount2;