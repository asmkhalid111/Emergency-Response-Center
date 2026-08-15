import React from 'react';
import { useAppContext } from '../store/AppContext';
import './pages.css';

function ActivityLog() {
  const { activityLog } = useAppContext();

  const getLogColor = (type) => {
    switch (type) {
      case 'Incident': return 'var(--status-critical)';
      case 'Dispatch': return 'var(--accent-primary)';
      case 'Unit': return 'var(--status-high)';
      case 'System': return 'var(--status-success)';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {activityLog.map(log => (
            <div key={log.id} style={{ display: 'flex', gap: '1.5rem', padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ width: '120px', color: 'var(--text-muted)', fontSize: '0.875rem', fontFamily: 'monospace' }}>
                {new Date(log.time).toLocaleTimeString()}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getLogColor(log.type) }}></div>
                  <strong style={{ fontSize: '0.875rem', color: getLogColor(log.type) }}>{log.type.toUpperCase()}</strong>
                </div>
                <div style={{ marginTop: '0.5rem', fontSize: '1rem', color: 'var(--text-primary)' }}>
                  {log.message}
                </div>
              </div>
            </div>
          ))}
          {activityLog.length === 0 && (
            <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', opacity: 0.5 }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <strong style={{ fontSize: '1.5rem' }}>ℹ️</strong>
              </div>
              <div>
                <h4 style={{ fontSize: '1.125rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>No Activity Recorded</h4>
                <p>System activities and dispatches will appear here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActivityLog;
