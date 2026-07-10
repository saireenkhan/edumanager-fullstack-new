import React, { useEffect, useState } from 'react';
import '../css/Campus.css'; 
import { 
  Search, 
  Wallet, 
  Percent, 
  Coins, 
  ShieldAlert,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';
import Sidebar2 from '../components/Sidebar2';
import Header from '../components/Header';

// Shared Primitive Global Components
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';

// Unique Configuration Assets
import { salaryFormSchema } from '../Data/Data';

const Salary = () => {
  const [showModal, setShowModal] = useState(false);
  const [salaryData, setSalaryData] = useState([]);

  const [totals, setTotals] = useState({
    totalEarnings: 0,
    totalDeductions: 0,
    netTotal: 0,
  });

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchedValue, setSearchedValue] = useState('');

  const API_URL = 'http://localhost:5000/api/salary';

  // Fetch Salary Data
  const fetchSalaryData = async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();

      if (result.success) {
        setSalaryData(result.data || []);
        setTotals(result.totals || {
          totalEarnings: 0,
          totalDeductions: 0,
          netTotal: 0,
        });
      }
    } catch (error) {
      console.error('Salary fetch error:', error);
    }
  };

  useEffect(() => {
    fetchSalaryData();
  }, []);

  // Save Salary Component
  const handleSaveComponent = async (formData) => {
    try {
      const componentName = formData.componentName?.trim();

      if (!componentName) {
        alert('Component name is required');
        return;
      }

      const duplicate = salaryData.some(
        (item) =>
          item.componentName?.trim().toLowerCase() === componentName.toLowerCase() ||
          item.name?.trim().toLowerCase() === componentName.toLowerCase()
      );

      if (duplicate) {
        alert('This salary component already exists');
        return;
      }

      const payload = {
        componentName: componentName,
        category: formData.category,
        calculationMethod: formData.calculationMethod,
        value: Number(formData.value) || 0,
        taxableComponent: formData.taxableComponent || false,
        mandatoryForAll: formData.mandatoryForAll || false,
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
        alert(result.message || 'Failed to save salary component');
        return;
      }

      alert('Salary component added successfully');
      setShowModal(false);
      fetchSalaryData();

    } catch (error) {
      console.error('Salary save error:', error);
      alert('Something went wrong while saving salary component');
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

  const displayedSalaryData =
    searchedValue === ''
      ? salaryData
      : salaryData.filter((row) => {
          const name = row.name || '';
          const componentName = row.componentName || '';
          const category = row.category || '';
          const categoryType = row.categoryType || '';
          const calcType = row.calcType || '';
          const calculationMethod = row.calculationMethod || '';
          const value = row.value ? String(row.value) : '';
          const taxable = row.taxable || '';
          const taxableComponent = row.taxableComponent ? 'yes' : 'no';
          const mandatoryForAll = row.mandatoryForAll ? 'mandatory for all' : 'optional component';

          return (
            name.toLowerCase().includes(searchedValue.toLowerCase()) ||
            componentName.toLowerCase().includes(searchedValue.toLowerCase()) ||
            category.toLowerCase().includes(searchedValue.toLowerCase()) ||
            categoryType.toLowerCase().includes(searchedValue.toLowerCase()) ||
            calcType.toLowerCase().includes(searchedValue.toLowerCase()) ||
            calculationMethod.toLowerCase().includes(searchedValue.toLowerCase()) ||
            value.toLowerCase().includes(searchedValue.toLowerCase()) ||
            taxable.toLowerCase().includes(searchedValue.toLowerCase()) ||
            taxableComponent.toLowerCase().includes(searchedValue.toLowerCase()) ||
            mandatoryForAll.toLowerCase().includes(searchedValue.toLowerCase())
          );
        });

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
            title="Salary Allowances & Deductions"
            subtitle="Manage recurring payroll components, tax configurations, and staff bonuses"
            btnText="New Component"
            onBtnClick={() => setShowModal(true)}
          />

          {/* PAYROLL METRICS */}
          <section className="stats-container">
            <StatCard 
              icon={Wallet} 
              title="Total Earnings" 
              value={totals.totalEarnings} 
              dotColor="var(--accent-blue)" 
              iconColor="var(--accent-blue)" 
            />

            <StatCard 
              icon={ShieldAlert} 
              title="Total Deductions" 
              value={totals.totalDeductions} 
              dotColor="var(--accent-red)" 
              iconColor="var(--accent-red)" 
            />

            <StatCard 
              icon={Coins} 
              title="Net Total" 
              value={totals.netTotal} 
              dotColor="var(--accent-green)" 
              iconColor="var(--accent-green)" 
            />

            <StatCard 
              icon={Percent} 
              title="Total Components" 
              value={salaryData.length} 
              dotColor="#f59e0b" 
              iconColor="#f59e0b" 
            />
          </section>

          {/* FILTERS */}
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
           <button className="filter-select" onClick={handleSearch}>search</button>
          </div>

          {/* PAYROLL TABLE */}
          <DataTable headers={['Component Name', 'Category', 'Calculation Type', 'Value', 'Taxable']}>
            {displayedSalaryData.length > 0 ? (
              displayedSalaryData.map((row) => (
                <tr key={row.id}>
                  <td>
                    <strong>{row.name || row.componentName}</strong><br />
                    <small style={{ color: '#6b7280' }}>
                      {row.mandatoryForAll ? 'Mandatory for all' : 'Optional component'}
                    </small>
                  </td>

                  <td>
                    {row.categoryType === 'earning' ? (
                      <span style={{ color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <ArrowUpRight size={14} /> {row.category}
                      </span>
                    ) : (
                      <span style={{ color: '#dc2626', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <ArrowDownLeft size={14} /> {row.category}
                      </span>
                    )}
                  </td>

                  <td>{row.calcType || row.calculationMethod}</td>
                  <td>{row.value}</td>
                  <td>{row.taxable || (row.taxableComponent ? 'Yes' : 'No')}</td>

                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                  No salary component found
                </td>
              </tr>
            )}
          </DataTable>
        </div>
      </div>

      {/* MODAL CONFIGURATION CONTAINER */}
      <ModalWrapper 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        title="Define Payroll Component"
      >
        <AddClassForm 
          fields={salaryFormSchema} 
          buttonText="Save Component" 
          onSubmit={handleSaveComponent}
        />
      </ModalWrapper>
    </div>
  );
};

export default Salary;