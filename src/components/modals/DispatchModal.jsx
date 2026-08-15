import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import { X } from 'lucide-react';
import './modals.css';

function DispatchModal({ incident, onClose, onSuccess }) {
  const { units, dispatchUnit } = useAppContext();
  const [selectedUnit, setSelectedUnit] = useState(null);

  // Simple mock matching - recommend available units
  const availableUnits = units.filter(u => u.status === 'AVAILABLE');

  const handleDispatch = () => {
    if (!selectedUnit) return;
    dispatchUnit(incident.id, selectedUnit.id);
    onSuccess();
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1100 }}>
      <div className="modal-content" style={{ maxWidth: '500px' }}>
        <div className="modal-header">
          <h2>Dispatch Resource</h2>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className="modal-body">
          <p style={{ marginBottom: '1rem' }}>Select a resource to dispatch to <strong>{incident.type}</strong> at {incident.location}.</p>
          
          <h4 className="text-muted text-xs uppercase" style={{ marginBottom: '0.5rem' }}>Recommended Resources</h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', maxHeight: '300px', overflowY: 'auto' }}>
            {availableUnits.length > 0 ? availableUnits.map(unit => (
              <div 
                key={unit.id}
                onClick={() => setSelectedUnit(unit)}
                style={{
                  padding: '1rem',
                  backgroundColor: selectedUnit?.id === unit.id ? 'var(--bg-tertiary)' : 'var(--bg-primary)',
                  border: `1px solid ${selectedUnit?.id === unit.id ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{unit.type} Unit {unit.id}</div>
                  <div className="text-xs text-secondary">1.2 km away • {unit.status}</div>
                </div>
                <div className="text-sm font-mono">
                  ETA 03:12
                </div>
              </div>
            )) : (
              <div style={{ padding: '1rem', border: '1px dashed var(--border-color)', textAlign: 'center', color: 'var(--status-critical)' }}>
                NO AVAILABLE RESOURCES
              </div>
            )}
          </div>

          <div className="modal-actions">
            <button className="btn-secondary" onClick={onClose}>Cancel</button>
            <button 
              className="btn-primary" 
              onClick={handleDispatch}
              disabled={!selectedUnit}
            >
              Confirm Dispatch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DispatchModal;
