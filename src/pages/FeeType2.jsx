import React, { useEffect, useState } from 'react';
import '../css/Campus.css'; 
import { 
  Wallet, 
  Search, 
  CreditCard, 
  RefreshCcw, 
  TrendingUp 
} from 'lucide-react';
import Sidebar3 from '../components/Sidebar3';
import Header from '../components/Header';

// Shared Primitive Global Layout Elements
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';

// Unique Configuration Assets
import { feeTypeFormSchema } from '../Data/Data';

const FeeType2 = () => {
  const [showModal, setShowModal] = useState(false);
  const [feeTypeData, setFeeTypeData] = useState([]);

  const [totals, setTotals] = useState({
    totalFeeTypes: 0,
    totalBaseAmount: 0,
  });

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchedValue, setSearchedValue] = useState('');

  const API_URL = 'http://localhost:5000/api/fee-types-2';

  const fetchFeeTypes = async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();

      if (result.success) {
        setFeeTypeData(result.data || []);
        setTotals(
          result.totals || {
            totalFeeTypes: 0,
            totalBaseAmount: 0,
          }
        );
      }
    } catch (error) {
      console.error('Fee types fetch error:', error);
    }
  };

  useEffect(() => {
    fetchFeeTypes();
  }, []);

  const handleSaveFeeType = async (formData) => {
    try {
      const feeName = formData.feeName?.trim();
      const shortCode = formData.shortCode?.trim();

      if (!feeName) {
        alert('Fee name is required');
        return;
      }

      if (!shortCode) {
        alert('Short code is required');
        return;
      }

      if (!formData.frequency) {
        alert('Frequency is required');
        return;
      }

      if (!formData.ledgerAccount) {
        alert('Ledger account is required');
        return;
      }

      const duplicate = feeTypeData.some(
        (item) =>
          item.feeName?.trim().toLowerCase() === feeName.toLowerCase() ||
          item.name?.trim().toLowerCase() === feeName.toLowerCase() ||
          item.shortCode?.trim().toLowerCase() === shortCode.toLowerCase() ||
          item.code?.trim().toLowerCase() === shortCode.toLowerCase()
      );

      if (duplicate) {
        alert('This fee name or short code already exists');
        return;
      }

      const payload = {
        feeName,
        shortCode,
        frequency: formData.frequency,
        ledgerAccount: formData.ledgerAccount,
        baseAmount: Number(formData.baseAmount) || 0,
        mandatoryForAll: formData.mandatoryForAll || 'No',
        lateFeeFineLogic: formData.lateFeeFineLogic || '',
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
        alert(result.message || 'Failed to save fee type');
        return;
      }

      alert('Fee type added successfully');
      setShowModal(false);
      fetchFeeTypes();

    } catch (error) {
      console.error('Fee type save error:', error);
      alert('Something went wrong while saving fee type');
    }
  };

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

  const displayedFeeTypeData =
    searchedValue === ''
      ? feeTypeData
      : feeTypeData.filter((row) => {
          const name = row.name || '';
          const feeName = row.feeName || '';
          const lateFeeFineLogic = row.lateFeeFineLogic || '';
          const frequency = row.frequency || '';
          const code = row.code || '';
          const shortCode = row.shortCode || '';
          const mandatoryForAll = row.mandatoryForAll || '';
          const amount = row.amount ? String(row.amount) : '';
          const baseAmount = row.baseAmount ? String(row.baseAmount) : '';

          return (
            name.toLowerCase().includes(searchedValue.toLowerCase()) ||
            feeName.toLowerCase().includes(searchedValue.toLowerCase()) ||
            lateFeeFineLogic.toLowerCase().includes(searchedValue.toLowerCase()) ||
            frequency.toLowerCase().includes(searchedValue.toLowerCase()) ||
            code.toLowerCase().includes(searchedValue.toLowerCase()) ||
            shortCode.toLowerCase().includes(searchedValue.toLowerCase()) ||
            mandatoryForAll.toLowerCase().includes(searchedValue.toLowerCase()) ||
            amount.toLowerCase().includes(searchedValue.toLowerCase()) ||
            baseAmount.toLowerCase().includes(searchedValue.toLowerCase())
          );
        });

  const recurringFees = feeTypeData.filter(
    (item) => item.frequency !== 'One-Time'
  ).length;

  const oneTimeFees = feeTypeData.filter(
    (item) => item.frequency === 'One-Time'
  ).length;

  const lateFineRules = feeTypeData.filter(
    (item) => item.lateFeeFineLogic && item.lateFeeFineLogic.trim() !== ''
  ).length;

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
            title="Fee Type & Structure"
            subtitle="Configure various fee categories, collection frequencies, and base amounts"
            btnText="Add Fee Type"
            onBtnClick={() => setShowModal(true)}
          />

          {/* FINANCIAL METRICS */}
          <section className="stats-container">
            <StatCard 
              icon={Wallet} 
              title="Active Fee Types" 
              value={totals.totalFeeTypes} 
              dotColor="var(--accent-blue)" 
              iconColor="var(--accent-blue)" 
            />

            <StatCard 
              icon={RefreshCcw} 
              title="Recurring Fees" 
              value={recurringFees} 
              dotColor="var(--accent-green)" 
              iconColor="var(--accent-green)" 
            />

            <StatCard 
              icon={CreditCard} 
              title="One-Time Fees" 
              value={oneTimeFees} 
              dotColor="#f59e0b" 
              iconColor="#f59e0b" 
            />

            <StatCard 
              icon={TrendingUp} 
              title="Total Base Amount" 
              value={totals.totalBaseAmount} 
              dotColor="var(--accent-red)" 
              iconColor="var(--accent-red)" 
            />
          </section>

          {/* FILTERS */}
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
            <button className="filter-select" onClick={handleSearch}>Search</button>
          </div>

          {/* FEE STRUCTURE TABLE */}
          <DataTable headers={['Fee Head / Name', 'Frequency', 'Account Code', 'Mandatory', 'Base Amount']}>
            {displayedFeeTypeData.length > 0 ? (
              displayedFeeTypeData.map((row) => (
                <tr key={row.id}>
                  <td>
                    <strong>{row.name || row.feeName}</strong><br />
                    <small style={{ color: '#6b7280' }}>
                      {row.lateFeeFineLogic || 'No late fine logic'}
                    </small>
                  </td>

                  <td>
                    <span style={{ color: row.frequency === 'One-Time' ? '#f59e0b' : '#16a34a', fontWeight: '600' }}>
                      {row.frequency}
                    </span>
                  </td>

                  <td>{row.code || row.shortCode}</td>
                  <td>{row.mandatoryForAll}</td>

                  <td>
                    <strong>{row.amount || row.baseAmount}</strong>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                  No fee type found
                </td>
              </tr>
            )}
          </DataTable>
        </div>
      </div>

      {/* MODAL CONTAINER RIGGING */}
      <ModalWrapper 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        title="Define Fee Type"
      >
        <AddClassForm 
          fields={feeTypeFormSchema} 
          buttonText="Create Fee Head" 
          onSubmit={handleSaveFeeType}
        />
      </ModalWrapper>
    </div>
  );
};

export default FeeType2;