import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import './modals.css';

function ConfirmModal({ title, message, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel', type = 'default' }) {
  const isDanger = type === 'danger';
  
  return (
    <div className="modal-overlay" style={{ zIndex: 1100 }}>
      <div className="modal-content" style={{ width: '400px', maxWidth: '90vw' }}>
        <div className="modal-header">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {isDanger && <AlertTriangle size={20} color="var(--status-critical)" />}
            {title}
          </h2>
          <button className="close-btn" onClick={onCancel}><X size={20} /></button>
        </div>
        
        <div className="modal-body">
          <p style={{ color: 'var(--text-secondary)' }}>{message}</p>
        </div>
        
        <div className="modal-actions" style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button className="btn-secondary" onClick={onCancel}>{cancelText}</button>
          <button 
            className="btn-primary" 
            onClick={onConfirm}
            style={isDanger ? { backgroundColor: 'var(--status-critical)' } : {}}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
