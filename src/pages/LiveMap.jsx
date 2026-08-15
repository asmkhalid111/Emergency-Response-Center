import React from 'react';
import MapComponent from '../components/MapComponent';
import './pages.css';

function LiveMap() {
  return (
    <div style={{ height: 'calc(100vh - var(--topbar-height) - 3rem)', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
      <MapComponent interactive={true} zoom={13} />
    </div>
  );
}

export default LiveMap;
