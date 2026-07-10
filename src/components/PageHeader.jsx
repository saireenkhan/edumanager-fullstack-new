import React from 'react';
import { Download } from 'lucide-react';

const PageHeader = ({ 
  title, 
  subtitle, 
  btnText, 
  onBtnClick, 
  showExportBtn = false, 
  exportBtnText = "Export", 
  exportBtnStyle = {} 
}) => {
  return (
    <header className="dashboard-header">
      <div className="header-text">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="action-buttons">
        {showExportBtn && (
          <button type="button" className="btn-export" style={exportBtnStyle}>
            <Download size={18} /> {exportBtnText}
          </button>
        )}
        
        {btnText && (
          <button type="button" className="btn-add" onClick={onBtnClick}>
            {btnText}
          </button>
        )}
      </div>
    </header>
  );
};

export default PageHeader;