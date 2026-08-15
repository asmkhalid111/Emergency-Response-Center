import React, { useState } from 'react';
import { useAppContext } from '../store/AppContext';
import { Ambulance, CheckCircle, Navigation } from 'lucide-react';
import IncidentDetailsModal from '../components/modals/IncidentDetailsModal';
import './pages.css';

function ResponseUnits() {
  const { units, incidents, markUnitOnScene } = useAppContext();
  const [filter, setFilter] = useState('All');
  const [selectedIncident, setSelectedIncident] = useState(null);

  const handleViewIncident = (incidentId) => {
    const incident = incidents.find(i => i.id === incidentId);
    if (incident) setSelectedIncident(incident);
  };

  const filteredUnits = units.filter(u => {
    if (filter === 'All') return true;
    return u.status === filter;
  });

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="controls" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <button className={`btn-secondary ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')} style={{ backgroundColor: filter === 'All' ? 'var(--bg-tertiary)' : 'transparent' }}>All</button>
        <button className={`btn-secondary ${filter === 'AVAILABLE' ? 'active' : ''}`} onClick={() => setFilter('AVAILABLE')} style={{ backgroundColor: filter === 'AVAILABLE' ? 'var(--bg-tertiary)' : 'transparent' }}>Available</button>
        <button className={`btn-secondary ${filter === 'EN ROUTE' ? 'active' : ''}`} onClick={() => setFilter('EN ROUTE')} style={{ backgroundColor: filter === 'EN ROUTE' ? 'var(--bg-tertiary)' : 'transparent' }}>En Route</button>
        <button className={`btn-secondary ${filter === 'ON SCENE' ? 'active' : ''}`} onClick={() => setFilter('ON SCENE')} style={{ backgroundColor: filter === 'ON SCENE' ? 'var(--bg-tertiary)' : 'transparent' }}>On Scene</button>
      </div>

      <div className="table-container" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
              <th style={{ padding: '1rem', fontWeight: 600 }}>UNIT</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>TYPE</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>STATUS</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>LOCATION</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>ETA</th>
              <th style={{ padding: '1rem', fontWeight: 600, textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredUnits.map(unit => (
              <tr key={unit.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Ambulance size={18} className="text-accent" />
                  <strong>{unit.id}</strong>
                </td>
                <td style={{ padding: '1rem' }}>{unit.type}</td>
                <td style={{ padding: '1rem' }}>
                  <span className={`badge ${unit.status === 'AVAILABLE' ? 'success' : unit.status === 'EN ROUTE' ? 'high' : 'medium'}`}>
                    {unit.status}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>{unit.location}</td>
                <td style={{ padding: '1rem', fontFamily: 'monospace' }}>{unit.eta || '--:--'}</td>
                <td style={{ padding: '1rem', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                  {unit.status === 'EN ROUTE' && (
                    <button 
                      className="btn-secondary" 
                      onClick={() => markUnitOnScene(unit.id)}
                      style={{ padding: '0.25rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', borderColor: 'var(--status-medium)', color: 'var(--status-medium)' }}
                    >
                      <Navigation size={14} /> Mark On Scene
                    </button>
                  )}
                  {unit.status === 'ON SCENE' && (
                    <button 
                      className="btn-secondary" 
                      onClick={() => handleViewIncident(unit.assignedIncident)}
                      style={{ padding: '0.25rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                      <CheckCircle size={14} /> View Incident
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filteredUnits.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', opacity: 0.5 }}>
                    <Ambulance size={48} />
                    <div>
                      <h4 style={{ fontSize: '1.125rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>No Units Found</h4>
                      <p>There are no units matching the '{filter}' filter.</p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedIncident && (
        <IncidentDetailsModal 
          incident={selectedIncident} 
          onClose={() => setSelectedIncident(null)} 
        />
      )}
    </div>
  );
}

export default ResponseUnits;
