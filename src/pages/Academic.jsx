import React, { useState, useEffect } from 'react';
import '../css/Campus.css';
import { Layers, LayoutGrid, Users, Search, Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import Sidebar2 from '../components/Sidebar2';
import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';
import { classFormSchema } from '../Data/Data';

const API_BASE = 'http://localhost:5000/api/academic';

const Academic = () => {
  const [showModal, setShowModal] = useState(false);
  const [classes, setClasses] = useState([]);
  const [totals, setTotals] = useState({ totalClasses: 0, totalSections: 0, totalCapacity: 0 });

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchedValue, setSearchedValue] = useState('');

  useEffect(() => {
    fetchClasses();
    fetchTotals();
  }, []);

  async function fetchClasses() {
    try {
      const res = await fetch(API_BASE);
      const json = await res.json();
      if (json.success) setClasses(json.data);
    } catch (err) {
      console.error('Could not load classes', err);
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

  async function handleAddClass(formValues) {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
      const json = await res.json();

      if (json.success) {
        alert('Class added successfully!');
        setShowModal(false);
        fetchClasses();
        fetchTotals();
      } else {
        alert(json.message || 'Failed to save class');
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

  const displayedClasses =
    searchedValue === ''
      ? classes
      : classes.filter((item) => {
          const className = item.className || '';
          const department = item.department || '';
          const capacity = item.capacity ? String(item.capacity) : '';
          const sections = Array.isArray(item.sections) ? item.sections.join(' ') : '';

          return (
            className.toLowerCase().includes(searchedValue.toLowerCase()) ||
            department.toLowerCase().includes(searchedValue.toLowerCase()) ||
            capacity.toLowerCase().includes(searchedValue.toLowerCase()) ||
            sections.toLowerCase().includes(searchedValue.toLowerCase())
          );
        });

  const handleDownloadExcel = () => {
    if (displayedClasses.length === 0) {
      alert('No academic data available to download.');
      return;
    }

    const excelData = displayedClasses.map((item, index) => ({
      'Sr. No.': index + 1,
      'Class / Grade': item.className || '',
      Sections: Array.isArray(item.sections) ? item.sections.join(', ') : '',
      Department: item.department || '',
      Capacity: item.capacity || '',
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    worksheet['!cols'] = [
      { wch: 10 },
      { wch: 25 },
      { wch: 30 },
      { wch: 25 },
      { wch: 15 },
    ];

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'Academic Data'
    );

    XLSX.writeFile(workbook, 'Academic_Data.xlsx');
  };

  return (
    <div className="campus-layout">
      <Sidebar2 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Academic"
            subtitle="Manage grade levels and assign sections to specific academic streams"
            btnText="Define New Class"
            onBtnClick={() => setShowModal(true)}
          />

          <section className="stats-container">
            <StatCard icon={Layers} title="Total Classes" value={totals.totalClasses} dotColor="#555" iconColor="var(--accent-blue)" />
            <StatCard icon={LayoutGrid} title="Total Sections" value={totals.totalSections} dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={Users} title="Total Capacity" value={totals.totalCapacity} dotColor="#f59e0b" iconColor="#f59e0b" />
          </section>

          <div className="filters-row">
            <div className="search-box">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: '#555' }} />
              <input
                type="text"
                placeholder="Search by class name..."
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

            <button
              className="filter-select"
              onClick={handleDownloadExcel}
              style={{
                backgroundColor: '#008000',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '7px',
                cursor: 'pointer'
              }}
            >
              <Download size={17} />
              Download Excel
            </button>
          </div>

          <DataTable headers={['Class / Grade', 'Sections', 'Department', 'Capacity']}>
            {displayedClasses.length > 0 ? (
              displayedClasses.map((item) => (
                <tr key={item._id}>
                  <td><strong>{item.className}</strong></td>
                  <td>
                    {item.sections.map((sec, idx) => (
                      <span
                        key={idx}
                        style={{
                          background: '#f3f4f6',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          marginRight: '4px'
                        }}
                      >
                        {sec}
                      </span>
                    ))}
                  </td>
                  <td>{item.department}</td>
                  <td>{item.capacity}</td>
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

      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Class">
        <AddClassForm fields={classFormSchema} buttonText="Create Class Structure" onSubmit={handleAddClass} />
      </ModalWrapper>
    </div>
  );
};

export default Academic;