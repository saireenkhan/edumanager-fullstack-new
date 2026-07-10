import React, { useState, useEffect } from 'react';
import '../css/Campus.css';
import { Building2, MapPin, Search } from 'lucide-react';
import Sidebar2 from '../components/Sidebar2';
import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';
import { campusFormSchema } from '../Data/Data';

const API_BASE = 'http://localhost:5000/api/campuses';

const CampusSetup = () => {
  const [showModal, setShowModal] = useState(false);
  const [campuses, setCampuses] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchedValue, setSearchedValue] = useState('');

  useEffect(() => {
    fetchCampuses();
  }, []);

  async function fetchCampuses() {
    try {
      const res = await fetch(API_BASE);
      const json = await res.json();

      if (json.success) {
        setCampuses(json.data);
      }
    } catch (err) {
      console.error('Could not load campuses', err);
    }
  }

  async function handleAddCampus(formValues) {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });

      const json = await res.json();

      if (json.success) {
        alert('Campus added successfully!');
        setShowModal(false);
        fetchCampuses();
      } else {
        alert(json.message || 'Failed to save campus');
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

  const displayedCampuses =
    searchedValue === ''
      ? campuses
      : campuses.filter((item) => {
          const campusName = item.name || '';
          const campusAddress = item.address || '';
          const campusContact = item.contact || '';

          return (
            campusName.toLowerCase().includes(searchedValue.toLowerCase()) ||
            campusAddress.toLowerCase().includes(searchedValue.toLowerCase()) ||
            campusContact.toLowerCase().includes(searchedValue.toLowerCase())
          );
        });

  return (
    <div className="campus-layout">
      <Sidebar2 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Campus Setup"
            subtitle="Configure and manage your institutional branches and physical locations"
            btnText="Add New Campus"
            onBtnClick={() => setShowModal(true)}
          />

          <section className="stats-container">
            <StatCard
              icon={Building2}
              title="Total Branches"
              value={campuses.length}
              dotColor="#555"
            />

            <StatCard
              icon={Building2}
              title="Active Campus"
              value="03"
              dotColor="var(--accent-green)"
              iconColor="var(--accent-green)"
            />

            <StatCard
              icon={MapPin}
              title="Maintenance"
              value="01"
              dotColor="var(--accent-red)"
              iconColor="var(--accent-red)"
            />

            <StatCard
              icon={Building2}
              title="Main Headquarter"
              value="01"
              dotColor="var(--accent-blue)"
              iconColor="var(--accent-blue)"
            />
          </section>

          <div className="filters-row">
            <div className="search-box">
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '12px',
                  color: '#555',
                }}
              />

              <input
                type="text"
                placeholder="Search by campus name..."
                value={searchText}
                onChange={handleSearchInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
            </div>

            <button className="filter-select" onClick={handleSearch}>
              Search
            </button>
          </div>

          <DataTable headers={['Campus Name', 'Location / Address', 'Contact Info']}>
            {displayedCampuses.length > 0 ? (
              displayedCampuses.map((item) => (
                <tr key={item._id}>
                  <td>
                    <strong>{item.name}</strong>
                  </td>
                  <td>{item.address}</td>
                  <td>{item.contact}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>
                  Nothing found
                </td>
              </tr>
            )}
          </DataTable>
        </div>
      </div>

      <ModalWrapper
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add New Campus Branch"
      >
        <AddClassForm
          fields={campusFormSchema}
          buttonText="Initialize Campus Setup"
          onSubmit={handleAddCampus}
        />
      </ModalWrapper>
    </div>
  );
};

export default CampusSetup;