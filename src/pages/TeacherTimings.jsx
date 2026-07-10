import React, { useEffect, useState } from 'react';
import '../css/Campus.css'; 
import { 
  Search, 
  Watch, 
  CalendarDays, 
  UserCheck, 
  Coffee
} from 'lucide-react';
import Sidebar2 from '../components/Sidebar2';
import Header from '../components/Header';

// Shared Global Primitive Architecture Layers
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';

// Unique Configuration Assets
import { teacherTimingsFormSchema } from '../Data/Data';

const TeacherTimings = () => {
  const [showModal, setShowModal] = useState(false);
  const [teacherTimingsData, setTeacherTimingsData] = useState([]);

  const [totals, setTotals] = useState({
    totalShifts: 0,
    totalGracePeriod: 0,
  });

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchedValue, setSearchedValue] = useState('');

  const API_URL = 'http://localhost:5000/api/teacher-timings';

  const fetchTeacherTimings = async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();

      if (result.success) {
        setTeacherTimingsData(result.data || []);
        setTotals(
          result.totals || {
            totalShifts: 0,
            totalGracePeriod: 0,
          }
        );
      }
    } catch (error) {
      console.error('Teacher timings fetch error:', error);
    }
  };

  useEffect(() => {
    fetchTeacherTimings();
  }, []);

  const handleSaveTeacherTiming = async (formData) => {
    try {
      const shiftTitle = formData.shiftTitle?.trim();

      if (!shiftTitle) {
        alert('Shift title is required');
        return;
      }

      if (!formData.checkInTime) {
        alert('Check-in time is required');
        return;
      }

      if (!formData.checkOutTime) {
        alert('Check-out time is required');
        return;
      }

      const duplicate = teacherTimingsData.some(
        (item) =>
          item.shiftTitle?.trim().toLowerCase() === shiftTitle.toLowerCase() ||
          item.name?.trim().toLowerCase() === shiftTitle.toLowerCase()
      );

      if (duplicate) {
        alert('This shift title already exists');
        return;
      }

      const payload = {
        shiftTitle,
        checkInTime: formData.checkInTime,
        checkOutTime: formData.checkOutTime,
        gracePeriod: Number(formData.gracePeriod) || 0,
        halfDayAfter: formData.halfDayAfter || '',
        applicableDays: formData.applicableDays || [],
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
        alert(result.message || 'Failed to save teacher timing');
        return;
      }

      alert('Teacher timing added successfully');
      setShowModal(false);
      fetchTeacherTimings();

    } catch (error) {
      console.error('Teacher timing save error:', error);
      alert('Something went wrong while saving teacher timing');
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

  const displayedTeacherTimings =
    searchedValue === ''
      ? teacherTimingsData
      : teacherTimingsData.filter((row) => {
          const name = row.name || '';
          const shiftTitle = row.shiftTitle || '';
          const inTime = row.inTime || '';
          const checkInTime = row.checkInTime || '';
          const outTime = row.outTime || '';
          const checkOutTime = row.checkOutTime || '';
          const gracePeriodText = row.gracePeriodText || '';
          const gracePeriod = row.gracePeriod ? String(row.gracePeriod) : '';
          const days = row.days || '';
          const applicableDays = Array.isArray(row.applicableDays)
            ? row.applicableDays.join(', ')
            : '';

          return (
            name.toLowerCase().includes(searchedValue.toLowerCase()) ||
            shiftTitle.toLowerCase().includes(searchedValue.toLowerCase()) ||
            inTime.toLowerCase().includes(searchedValue.toLowerCase()) ||
            checkInTime.toLowerCase().includes(searchedValue.toLowerCase()) ||
            outTime.toLowerCase().includes(searchedValue.toLowerCase()) ||
            checkOutTime.toLowerCase().includes(searchedValue.toLowerCase()) ||
            gracePeriodText.toLowerCase().includes(searchedValue.toLowerCase()) ||
            gracePeriod.toLowerCase().includes(searchedValue.toLowerCase()) ||
            days.toLowerCase().includes(searchedValue.toLowerCase()) ||
            applicableDays.toLowerCase().includes(searchedValue.toLowerCase())
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
            title="Teacher Timings & Shifts"
            subtitle="Configure official school hours, shift rotations, and break intervals"
            btnText="Create New Shift"
            onBtnClick={() => setShowModal(true)}
          />

          {/* ATTENDANCE METRICS */}
          <section className="stats-container">
            <StatCard 
              icon={Watch} 
              title="Active Shifts" 
              value={totals.totalShifts} 
              dotColor="var(--accent-blue)" 
              iconColor="var(--accent-blue)" 
            />

            <StatCard 
              icon={UserCheck} 
              title="Total Grace Period" 
              value={`${totals.totalGracePeriod}m`} 
              dotColor="var(--accent-green)" 
              iconColor="var(--accent-green)" 
            />

            <StatCard 
              icon={CalendarDays} 
              title="Working Days" 
              value="Mon-Sat" 
              dotColor="#f59e0b" 
              iconColor="#f59e0b" 
            />

            <StatCard 
              icon={Coffee} 
              title="Avg. Grace" 
              value={
                totals.totalShifts > 0
                  ? `${Math.round(totals.totalGracePeriod / totals.totalShifts)}m`
                  : '0m'
              } 
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
                placeholder="Search shift name..."
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

          {/* ROSTER TABLE */}
          <DataTable headers={['Shift Name', 'In-Time', 'Out-Time', 'Grace Period', 'Days Applicable']}>
            {displayedTeacherTimings.length > 0 ? (
              displayedTeacherTimings.map((row) => (
                <tr key={row.id}>
                  <td>
                    <strong>{row.name || row.shiftTitle}</strong>
                  </td>
                  <td>{row.inTime || row.checkInTime}</td>
                  <td>{row.outTime || row.checkOutTime}</td>
                  <td>{row.gracePeriodText || `${row.gracePeriod} mins`}</td>
                  <td>{row.days || row.applicableDays?.join(', ')}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                  No teacher timing found
                </td>
              </tr>
            )}
          </DataTable>
        </div>
      </div>

      {/* SHIFT REGISTRATION MODAL */}
      <ModalWrapper 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        title="Setup Faculty Shift"
      >
        <AddClassForm 
          fields={teacherTimingsFormSchema} 
          buttonText="Save Shift Timings" 
          onSubmit={handleSaveTeacherTiming}
        />
      </ModalWrapper>
    </div>
  );
};

export default TeacherTimings;