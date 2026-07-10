import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const ModalWrapper = ({ isOpen, onClose, title, children }) => {
  // Lock background window scrolling entirely for accessibility and viewport escape prevention
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">
          <h2 style={{ color: 'var(--text-primary)' }}>{title}</h2>
          <X 
            size={24} 
            style={{ cursor: 'pointer' }} 
            onClick={onClose} 
            tabIndex={0}
            role="button"
            aria-label="Close modal window"
            onKeyDown={(e) => e.key === 'Enter' && onClose()}
          />
        </div>
        <div className="modal-form">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;