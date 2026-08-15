import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import { X, Navigation } from 'lucide-react';
import DispatchModal from './DispatchModal';
import ConfirmModal from './ConfirmModal';
import MapComponent from '../MapComponent';
import './modals.css';

function IncidentDetailsModal({ incident, onClose }) {
  const { resolveIncident, units } = useAppContext();
  const [isDispatchOpen, setIsDispatchOpen] = useState(false);
  const [isResolveConfirmOpen, setIsResolveConfirmOpen] = useState(false);

  if (!incident) return null;

  const handleResolveConfirm = () => {
    resolveIncident(incident.id);
    setIsResolveConfirmOpen(false);
    onClose();
  };

  const assignedUnitDetails = units.filter(u => incident.assignedUnits.includes(u.id));

  return (
    <div className="modal-overlay">
      <div className="modal-content incident-details" style={{ width: '800px', maxWidth: '90vw' }}>
        <div className="modal-header">
          <h2>Incident Details: {incident.id}</h2>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className="modal-body split-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          
          {/* Left: Map Component */}
          <div className="map-section" style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)', minHeight: '300px' }}>
            <MapComponent interactive={false} zoom={16} center={incident.coordinates} />
          </div>

          {/* Right: Details */}
          <div className="info-section">
            <div className="info-header" style={{ marginBottom: '1.5rem' }}>
              <span className={`badge ${incident.priority.toLowerCase()}`} style={{ fontSize: '1rem', padding: '0.25rem 0.5rem' }}>
                {incident.priority}
              </span>
              <h3 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>{incident.type}</h3>
              <p className="text-secondary">{incident.location}</p>
            </div>

            <div className="info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label className="text-muted text-xs uppercase">Time Reported</label>
                <div>{new Date(incident.timeReported).toLocaleTimeString()}</div>
              </div>
              <div>
                <label className="text-muted text-xs uppercase">People Affected</label>
                <div>{incident.peopleAffected}</div>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label className="text-muted text-xs uppercase">Description</label>
                <div style={{ backgroundColor: 'var(--bg-primary)', padding: '0.75rem', borderRadius: '4px', marginTop: '0.25rem' }}>
                  {incident.description}
                </div>
              </div>
            </div>

            <div className="response-section" style={{ marginBottom: '2rem' }}>
              <h4 style={{ marginBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Response Resources</h4>
              {assignedUnitDetails.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {assignedUnitDetails.map(u => (
                    <div key={u.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: 'var(--bg-primary)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                      <div>
                        <strong>{u.type} Unit {u.id}</strong>
                        <div className="text-xs text-secondary">{u.status}</div>
                      </div>
                      <div className="text-right">
                        {u.eta && <div className="text-sm font-mono">ETA {u.eta}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted text-sm">No resources assigned.</div>
              )}
            </div>

            <div className="modal-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button className="btn-secondary" style={{ borderColor: 'var(--status-critical)', color: 'var(--status-critical)' }}>Escalate</button>
              {incident.status !== 'RESOLVED' && (
                <button className="btn-secondary" style={{ borderColor: 'var(--status-success)', color: 'var(--status-success)' }} onClick={() => setIsResolveConfirmOpen(true)}>Resolve</button>
              )}
              <button className="btn-primary" onClick={() => setIsDispatchOpen(true)}>Dispatch Unit</button>
            </div>
          </div>
        </div>
      </div>
      
      {isDispatchOpen && (
        <DispatchModal 
          incident={incident} 
          onClose={() => setIsDispatchOpen(false)} 
          onSuccess={() => setIsDispatchOpen(false)}
        />
      )}

      {isResolveConfirmOpen && (
        <ConfirmModal 
          title="Resolve Incident"
          message="Are you sure you want to resolve this incident? All assigned resources will become available."
          confirmText="Yes, Resolve"
          type="default"
          onConfirm={handleResolveConfirm}
          onCancel={() => setIsResolveConfirmOpen(false)}
        />
      )}
    </div>
  );
}

export default IncidentDetailsModal;
