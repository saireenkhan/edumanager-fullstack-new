import React, { useState, useEffect } from 'react';

const DataTable = ({ headers = [], children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [openRows, setOpenRows] = useState({});

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 850);
    };
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleRow = (index) => {
    setOpenRows(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const rowsArray = React.Children.toArray(children);

  // Helper helper function to parse React child nodes cleanly and prevent runtime crashes
  const renderCellContent = (cell) => {
    if (!cell) return '-';
    if (typeof cell === 'string' || typeof cell === 'number') return cell;
    if (cell.props && cell.props.children) return cell.props.children;
    return '-';
  };

  return (
    <div className="table-section">
      {!isMobile ? (
        /* ================= DESKTOP VIEW ================= */
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={`th-${index}`}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {children}
            </tbody>
          </table>
        </div>
      ) : (
        /* ================= MOBILE ACCORDION VIEW ================= */
        <div className="mobile-accordion-container">
          {rowsArray.map((rowElement, rowIndex) => {
            if (!rowElement || !rowElement.props) return null;
            const cells = React.Children.toArray(rowElement.props.children);

            return (
              <div 
                key={`card-${rowIndex}`} 
                className={`accordion-card ${openRows[rowIndex] ? 'open' : ''}`}
                onClick={() => toggleRow(rowIndex)}
              >
                {/* Header Summary */}
                <div className="accordion-header">
                  <div className="mobile-row-summary">
                    <div className="mobile-summary-item">
                      <span className="mobile-label">{headers[0]}:</span>
                      <span className="mobile-value">{renderCellContent(cells[0])}</span>
                    </div>
                    {headers[1] && cells[1] && (
                      <div className="mobile-summary-item">
                        <span className="mobile-label">{headers[1]}:</span>
                        <span className="mobile-value">{renderCellContent(cells[1])}</span>
                      </div>
                    )}
                  </div>
                  <div className="accordion-toggle">
                    <span style={{ 
                      display: 'inline-block',
                      transform: openRows[rowIndex] ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      fontSize: '12px'
                    }}>
                      ▼
                    </span>
                  </div>
                </div>

                {/* Expanded Details Panel */}
                <div className={`accordion-content ${openRows[rowIndex] ? 'expanded' : ''}`}>
                  {headers.map((header, cellIndex) => (
                    <div key={`detail-${cellIndex}`} className="mobile-detail-row">
                      <span className="detail-label">{header}:</span>
                      <div className="detail-value">
                        {renderCellContent(cells[cellIndex])}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DataTable;