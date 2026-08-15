import React, { useState } from 'react';
import { useAppContext } from '../store/AppContext';
import CreateIncidentModal from '../components/modals/CreateIncidentModal';
import IncidentDetailsModal from '../components/modals/IncidentDetailsModal';
import { Search, Filter, Plus } from 'lucide-react';
import './pages.css';

function CrisisQueue() {
  const { incidents } = useAppContext();
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Priority');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);

  const getPriorityScore = (priority) => {
    switch(priority) {
      case 'Critical': return 4;
      case 'High': return 3;
      case 'Medium': return 2;
      case 'Low': return 1;
      default: return 0;
    }
  };

  let filteredIncidents = incidents.filter(i => {
    if (filter === 'All') return true;
    return i.priority === filter;
  });

  filteredIncidents.sort((a, b) => {
    if (sort === 'Priority') {
      return getPriorityScore(b.priority) - getPriorityScore(a.priority) || b.priorityScore - a.priorityScore;
    } else if (sort === 'Newest') {
      return new Date(b.timeReported) - new Date(a.timeReported);
    }
    return 0;
  });

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="controls" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>    <h2>Crisis Queue</h2>
        <button 
          className="btn-primary" 
          onClick={() => setIsCreateOpen(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: 'var(--accent-primary)', color: '#fff', borderRadius: '4px', fontWeight: 'bold' }}
        >
          <Plus size={16} /> Create Incident
        </button>
      </div>

      <div className="controls" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="search-bar" style={{ maxWidth: '300px' }}>
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Filter incidents..." className="search-input" />
        </div>
        
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}
        >
          <option value="All">All Priorities</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select 
          value={sort} 
          onChange={(e) => setSort(e.target.value)}
          style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}
        >
          <option value="Priority">Sort: Priority</option>
          <option value="Newest">Sort: Newest</option>
        </select>
      </div>

      <div className="queue-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', flex: 1 }}>
        {filteredIncidents.map(inc => (
          <div 
            key={inc.id} 
            className="queue-card" 
            onClick={() => setSelectedIncident(inc)}
            style={{ 
              display: 'flex', justifyContent: 'space-between', padding: '1.25rem', 
              backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', 
              borderRadius: '8px', cursor: 'pointer', transition: '0.2s' 
            }}
          >
            <div className="queue-card-left" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ width: '80px' }}>
                <span className={`badge ${inc.priority.toLowerCase()}`}>{inc.priority}</span>
              </div>
              <div>
                <h3 style={{ marginBottom: '0.25rem' }}>{inc.type}</h3>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', gap: '1rem' }}>
                  <span>{inc.id}</span>
                  <span>📍 {inc.location}</span>
                  <span>👥 {inc.peopleAffected} affected</span>
                  <span>⏱ {Math.floor((Date.now() - new Date(inc.timeReported)) / 60000)} min ago</span>
                </div>
              </div>
            </div>
            <div className="queue-card-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <span className="badge" style={{ backgroundColor: 'var(--bg-primary)' }}>{inc.status}</span>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                Priority Score: {inc.priorityScore}
              </div>
            </div>
          </div>
        ))}
        {filteredIncidents.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            ✓ All clear — No active incidents match your filters.
          </div>
        )}
      </div>

      {isCreateOpen && <CreateIncidentModal onClose={() => setIsCreateOpen(false)} />}
      {selectedIncident && <IncidentDetailsModal incident={selectedIncident} onClose={() => setSelectedIncident(null)} />}
    </div>
  );
}

export default CrisisQueue;
