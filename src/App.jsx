import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import CrisisQueue from './pages/CrisisQueue';
import LiveMap from './pages/LiveMap';
import ResponseUnits from './pages/ResponseUnits';
import Hospitals from './pages/Hospitals';
import ActivityLog from './pages/ActivityLog';
import Analytics from './pages/Analytics';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="queue" element={<CrisisQueue />} />
        <Route path="map" element={<LiveMap />} />
        <Route path="units" element={<ResponseUnits />} />
        <Route path="hospitals" element={<Hospitals />} />
        <Route path="activity" element={<ActivityLog />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
    </Routes>
  );
}

export default App;
