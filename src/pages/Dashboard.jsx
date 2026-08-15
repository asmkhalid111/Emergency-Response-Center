import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import MapComponent from '../components/MapComponent';
import './pages.css';

function Dashboard() {
  const navigate = useNavigate();
  const { incidents, units, activityLog } = useAppContext();

  const activeIncidents = incidents.filter(i => i.status !== 'RESOLVED');
  const criticalIncidents = activeIncidents.filter(i => i.priority === 'Critical');
  const respondingUnits = units.filter(u => u.status === 'EN ROUTE' || u.status === 'ON SCENE');
  const pendingDispatch = activeIncidents.filter(i => i.status === 'AWAITING DISPATCH');

  // Helper to format time
  const formatTime = (isoString) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="dashboard-grid">
      <div className="stat-cards">
        <div className="stat-card" onClick={() => navigate('/queue')}>
          <h3>Active Incidents</h3>
          <div className="value">{activeIncidents.length}</div>
        </div>
        <div className="stat-card critical" onClick={() => navigate('/queue')}>
          <h3>Critical Incidents</h3>
          <div className="value">{criticalIncidents.length}</div>
        </div>
        <div className="stat-card" onClick={() => navigate('/units')}>
          <h3>Units Responding</h3>
          <div className="value">{respondingUnits.length}</div>
        </div>
        <div className="stat-card" onClick={() => navigate('/queue')}>
          <h3>Pending Dispatch</h3>
          <div className="value">{pendingDispatch.length}</div>
        </div>
      </div>

      <div className="main-panels">
        <div className="panel">
          <div className="panel-header">LIVE MAP</div>
          <div className="panel-content" style={{ padding: 0, overflow: 'hidden' }}>
            <MapComponent interactive={true} zoom={12} />
          </div>
          <div style={{ padding: '0.5rem', textAlign: 'center', cursor: 'pointer', backgroundColor: 'var(--bg-tertiary)' }} onClick={() => navigate('/map')}>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)' }}>Click to view full map</span>
          </div>
        </div>
        
        <div className="panel">
          <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>CRISIS QUEUE</span>
            <span style={{ fontSize: '0.75rem', cursor: 'pointer', color: 'var(--accent-primary)' }} onClick={() => navigate('/queue')}>View All</span>
          </div>
          <div className="panel-content">
            <div className="item-list">
              {activeIncidents.slice(0, 5).map(inc => (
                <div key={inc.id} className="list-item">
                  <div>
                    <div className="list-item-title">{inc.type}</div>
                    <div className="list-item-subtitle">{inc.location}</div>
                  </div>
                  <div className="list-item-right">
                    <span className={`badge ${inc.priority.toLowerCase()}`}>{inc.priority}</span>
                  </div>
                </div>
              ))}
              {activeIncidents.length === 0 && (
                <div style={{ color: 'var(--status-success)' }}>✓ All clear — No active incidents.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-panels">
        <div className="panel">
          <div className="panel-header">ACTIVE RESPONSE</div>
          <div className="panel-content">
            <div className="item-list">
              {respondingUnits.map(unit => (
                <div key={unit.id} className="list-item">
                  <div>
                    <div className="list-item-title">{unit.type} Unit {unit.id}</div>
                    <div className="list-item-subtitle">Responding to: {unit.assignedIncident}</div>
                  </div>
                  <div className="list-item-right">
                    <span className="text-sm font-mono">{unit.eta || '--:--'}</span>
                    <span className="badge text-xs">{unit.status}</span>
                  </div>
                </div>
              ))}
              {respondingUnits.length === 0 && (
                <div style={{ color: 'var(--text-muted)' }}>No units currently responding.</div>
              )}
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">RECENT ACTIVITY</div>
          <div className="panel-content">
            {activityLog.slice(0, 5).map(log => (
              <div key={log.id} className="activity-item">
                <span className="activity-time">{formatTime(log.time)}</span>
                <span className="activity-message">{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
