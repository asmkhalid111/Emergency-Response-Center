import React from 'react';
import { useAppContext } from '../store/AppContext';
import { Building2 } from 'lucide-react';
import './pages.css';

function Hospitals() {
  const { hospitals } = useAppContext();

  return (
    <div className="page-container">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {hospitals.map(hospital => (
          <div key={hospital.id} className="hospital-card" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
              <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: '50%' }}>
                <Building2 size={24} color="var(--accent-primary)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.125rem' }}>{hospital.name}</h3>
                <div className="text-secondary text-sm">{hospital.distance} away</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <div className="text-xs text-muted uppercase">Status</div>
                <div style={{ color: hospital.status === 'Operational' ? 'var(--status-success)' : 'var(--status-high)' }}>
                  {hospital.status}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted uppercase">Capacity</div>
                <div>{hospital.capacity}% full</div>
              </div>
              <div>
                <div className="text-xs text-muted uppercase">Available Beds</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{hospital.availableBeds}</div>
              </div>
              <div>
                <div className="text-xs text-muted uppercase">ICU Availability</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{hospital.icu}</div>
              </div>
              <div>
                <div className="text-xs text-muted uppercase">Trauma Center</div>
                <div style={{ color: hospital.trauma === 'Available' ? 'var(--status-success)' : 'var(--status-critical)' }}>
                  {hospital.trauma}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted uppercase">Ambulance Receiving</div>
                <div style={{ color: hospital.ambulanceReceiving === 'Open' ? 'var(--status-success)' : 'var(--status-critical)' }}>
                  {hospital.ambulanceReceiving}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hospitals;
