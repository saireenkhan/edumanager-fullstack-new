import React, { useState } from 'react';
import '../css/Campus.css';
import { Receipt, Printer, Save, FileText, CheckCircle2 } from 'lucide-react';
import Sidebar2 from '../components/Sidebar2';
import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import { 
  feeGenerationFormData, 
  feeHeadsData, 
  feeSummaryData 
} from '../Data/Data';

const StudentFeeGeneration = () => {
  const [isGenerated, setIsGenerated] = useState(false);
  const [formData, setFormData] = useState(feeGenerationFormData);
  const [feeHeads, setFeeHeads] = useState(feeHeadsData);
  const [summary, setSummary] = useState(feeSummaryData);

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleCheckboxChange = (id) => {
    setFeeHeads(feeHeads.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const handleGenerateVouchers = () => {
    setIsGenerated(true);
    alert('Fee challans generated successfully!');
  };

  const handleSaveVouchers = () => {
    alert('Fee challans saved successfully for this session!');
  };

  const handlePrintPreview = () => {
    window.print();
  };

  return (
    <div className="campus-layout">
      <Sidebar2 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Student Fee Generation"
            subtitle="Configure campus settings, session options, and dynamic fee heads for challan generation"
          />

          {/* Stat Cards for Quick Metrics */}
          <section className="stats-container">
            <StatCard icon={Receipt} title="Net Payable" value={`Rs. ${summary.netPayable}`} dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
            <StatCard icon={FileText} title="Total Fee" value={`Rs. ${summary.totalFee}`} dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={Receipt} title="Total Discount" value={`Rs. ${summary.totalDiscount}`} dotColor="#f59e0b" iconColor="#f59e0b" />
            <StatCard icon={CheckCircle2} title="Total Fine" value={`Rs. ${summary.totalFine}`} dotColor="var(--accent-red)" iconColor="var(--accent-red)" />
          </section>

          {/* Configuration Form Row - Responsive Grid */}
          <div className="fee-config-grid">
            <div className="form-group">
              <label>Campus</label>
              <select 
                className="filter-select" 
                value={formData.campus} 
                onChange={(e) => handleInputChange(e, 'campus')}
              >
                <option value="Main Campus">Main Campus</option>
              </select>
            </div>

            <div className="form-group">
              <label>Academic Session</label>
              <select 
                className="filter-select" 
                value={formData.academicSession} 
                onChange={(e) => handleInputChange(e, 'academicSession')}
              >
                <option value="2026-2027">2026-2027</option>
              </select>
            </div>

            <div className="form-group">
              <label>Generate Type</label>
              <select 
                className="filter-select" 
                value={formData.generateType} 
                onChange={(e) => handleInputChange(e, 'generateType')}
              >
                <option value="Class Wise">Class Wise</option>
              </select>
            </div>

            <div className="form-group">
              <label>Class</label>
              <select 
                className="filter-select" 
                value={formData.className} 
                onChange={(e) => handleInputChange(e, 'className')}
              >
                <option value="Play Group">Play Group</option>
              </select>
            </div>

            <div className="form-group">
              <label>Section</label>
              <select 
                className="filter-select" 
                value={formData.section} 
                onChange={(e) => handleInputChange(e, 'section')}
              >
                <option value="All Sections">All Sections</option>
              </select>
            </div>

            <div className="form-group">
              <label>Student</label>
              <select 
                className="filter-select" 
                value={formData.student} 
                onChange={(e) => handleInputChange(e, 'student')}
              >
                <option value="All Students">All Students</option>
              </select>
            </div>

            <div className="form-group">
              <label>Fee Month</label>
              <select 
                className="filter-select" 
                value={formData.feeMonth} 
                onChange={(e) => handleInputChange(e, 'feeMonth')}
              >
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
              </select>
            </div>

            <div className="form-group">
              <label>Due Date</label>
              <input 
                type="date" 
                className="filter-input-date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange(e, 'dueDate')}
              />
            </div>

            <div className="form-group">
              <label>Issue Date</label>
              <input 
                type="date" 
                className="filter-input-date"
                value={formData.issueDate}
                onChange={(e) => handleInputChange(e, 'issueDate')}
              />
            </div>
          </div>

          {/* Fee Heads Table Section */}
          <div className="fee-card-section">
            <h3 className="section-title">Fee Heads Selection</h3>
            
            <div className="table-responsive">
              <table className="custom-data-table">
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Fee Head</th>
                    <th>Amount</th>
                    <th>Discount</th>
                    <th>Fine</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {feeHeads.map((head) => (
                    <tr key={head.id}>
                      <td>
                        <input 
                          type="checkbox" 
                          checked={head.selected} 
                          onChange={() => handleCheckboxChange(head.id)}
                          className="custom-checkbox"
                        />
                      </td>
                      <td><strong>{head.feeHead}</strong></td>
                      <td>{head.amount}</td>
                      <td>{head.discount}</td>
                      <td>{head.fine}</td>
                      <td><strong style={{ color: 'var(--accent-blue)' }}>{head.total}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fee Summary & Remarks Panel (Responsive Two-Column Layout) */}
          <div className="fee-bottom-grid">
            
            {/* Fee Summary Card */}
            <div className="fee-card-section summary-card">
              <h3 className="section-title">Fee Summary</h3>
              <div className="summary-list">
                <div className="summary-row">
                  <span className="summary-label">Total Fee:</span>
                  <strong>Rs. {summary.totalFee}</strong>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Total Discount:</span>
                  <strong>Rs. {summary.totalDiscount}</strong>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Total Fine:</span>
                  <strong>Rs. {summary.totalFine}</strong>
                </div>
                <hr className="summary-divider" />
                <div className="summary-row net-row">
                  <span>Net Payable:</span>
                  <strong style={{ color: 'var(--accent-blue)' }}>Rs. {summary.netPayable}</strong>
                </div>
              </div>
            </div>

            {/* Remarks and Action Card */}
            <div className="fee-card-section actions-card">
              <div>
                <h3 className="section-title">Remarks & Status</h3>
                
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label className="form-label">Remarks</label>
                  <textarea 
                    placeholder="Optional remarks..."
                    value={formData.remarks}
                    onChange={(e) => handleInputChange(e, 'remarks')}
                    className="custom-textarea"
                  />
                </div>

                <div className="status-indicator-row">
                  <span className="summary-label">Status:</span>
                  <span className={`status-badge ${isGenerated ? 'generated' : 'pending'}`}>
                    {isGenerated ? 'Generated' : 'Pending'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="fee-action-buttons">
                <button onClick={handlePrintPreview} className="btn-secondary-custom">
                  <Printer size={16} /> Generate Fee Challan
                </button>
                <button onClick={handleSaveVouchers} className="btn-primary-custom">
                  <Save size={16} /> Save now for this
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFeeGeneration;