import React, { useState } from 'react';
import '../css/Campus.css';
import { Receipt, Printer, Save, FileText, CheckCircle2 } from 'lucide-react';
import Sidebar2 from '../components/Sidebar2';
import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import ModalWrapper from '../components/ModalWrapper';
import AddClassForm from '../components/AddClassForm';
import { feePerStudentData, feeHeadFormSchema } from '../Data/Data';

const FeePerStudent = () => {
  const [data, setData] = useState(feePerStudentData);
  const [isGenerated, setIsGenerated] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    alert('Vouchers saved successfully!');
  };

  const handleAddFeeHead = (formValues) => {
    const addedAmount = Number(formValues.amount || 0);
    const updatedGross = Number(data.grossFee) + addedAmount;

    setData({
      ...data,
      grossFee: updatedGross,
      netExpected: updatedGross,
      expectedTotal: updatedGross
    });

    setShowModal(false);
    alert('Fee head added successfully!');
  };

  return (
    <div className="campus-layout">
      <Sidebar2 />

      <div className="main-content">
        <Header />

        <div className="page-container">
          <PageHeader
            title="Fee Per Student"
            subtitle="Review expected totals, voucher summaries, and generation settings per student"
            btnText="Add Fee Head"
            onBtnClick={() => setShowModal(true)}
          />

          {/* Quick Metrics Stat Cards */}
          <section className="stats-container">
            <StatCard icon={Receipt} title="Fee Per Student" value={`Rs. ${data.feePerStudent}`} dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
            <StatCard icon={FileText} title="Expected Total" value={`Rs. ${data.expectedTotal}`} dotColor="var(--accent-green)" iconColor="var(--accent-green)" />
            <StatCard icon={Receipt} title="Gross Fee" value={`Rs. ${data.grossFee}`} dotColor="#f59e0b" iconColor="#f59e0b" />
            <StatCard icon={CheckCircle2} title="Net Expected" value={`Rs. ${data.netExpected}`} dotColor="var(--accent-blue)" iconColor="var(--accent-blue)" />
          </section>

          {/* Main Content Grid */}
          <div className="fee-bottom-grid">
            
            {/* Voucher Summary Card */}
            <div className="fee-card-section" style={{ marginBottom: 0 }}>
              <h3 className="section-title">Voucher Summary</h3>
              <div className="summary-list">
                <div className="summary-row">
                  <span className="summary-label">Gross Fee:</span>
                  <strong>Rs. {data.grossFee}</strong>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Discount:</span>
                  <strong>Rs. {data.discount}</strong>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Fine:</span>
                  <strong>Rs. {data.fine}</strong>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Previous Balance:</span>
                  <strong>Rs. {data.previousBalance}</strong>
                </div>
                <hr className="summary-divider" />
                <div className="summary-row net-row">
                  <span>Net Expected:</span>
                  <strong style={{ color: 'var(--accent-blue)' }}>Rs. {data.netExpected}</strong>
                </div>
              </div>
            </div>

            {/* Instructions, Copies & Actions Panel */}
            <div className="fee-card-section actions-card" style={{ marginBottom: 0 }}>
              <div>
                <h3 className="section-title">Voucher Instructions & Config</h3>
                
                <div className="instruction-box" style={{ marginBottom: '16px', padding: '12px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '0.9rem', color: '#4b5563' }}>
                  <p><strong>Note:</strong> {data.instructions}</p>
                </div>

                <div className="summary-row" style={{ marginBottom: '12px' }}>
                  <span className="summary-label">Voucher Copies:</span>
                  <strong>{data.copies}</strong>
                </div>

                <div className="status-indicator-row">
                  <span className="summary-label">Voucher Status:</span>
                  <span className={`status-badge ${isGenerated ? 'generated' : 'pending'}`}>
                    {isGenerated ? 'Generated' : 'Pending'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="fee-action-buttons">
                <button onClick={handlePrint} className="btn-secondary-custom">
                  <Printer size={16} /> Generate & Print
                </button>
                <button onClick={handleSave} className="btn-primary-custom">
                  <Save size={16} /> Save Vouchers
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Reusable Modal Wrapper */}
      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)} title="Add Fee Head">
        <AddClassForm fields={feeHeadFormSchema} buttonText="Save Fee Head" onSubmit={handleAddFeeHead} />
      </ModalWrapper>
    </div>
  );
};

export default FeePerStudent;