import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAppContext } from '../../store/AppContext';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import './layout.css';

function AppLayout() {
  const { isSidebarOpen } = useAppContext();
  
  return (
    <div className="app-container">
      <Sidebar />
      <div className={`main-content ${!isSidebarOpen ? 'expanded' : ''}`}>
        <TopBar />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
