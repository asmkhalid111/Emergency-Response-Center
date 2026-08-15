import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../../store/AppContext';
import { Search, Bell, Circle, Moon, Sun, Menu } from 'lucide-react';
import './layout.css';

function TopBar() {
  const location = useLocation();
  const { isSidebarOpen, setIsSidebarOpen } = useAppContext();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Format page title from pathname
  const pageTitle = location.pathname.replace('/', '').replace('-', ' ');
  const displayTitle = pageTitle ? pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1) : 'Dashboard';

  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button 
          className="notification-btn" 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <Menu size={24} />
        </button>
        <h1 className="page-title">{displayTitle}</h1>
      </div>
      
      <div className="topbar-center">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search incidents, units, locations..." 
            className="search-input"
          />
        </div>
      </div>
      
      <div className="topbar-right">
        <div className="system-status">
          <Circle size={10} fill="var(--status-success)" className="status-icon success" />
          <span>SYSTEM OPERATIONAL</span>
        </div>
        
        <div className="time-display">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
        </div>
        
        <button className="notification-btn" onClick={toggleTheme} title="Toggle Theme">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="notification-btn">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>
        
        <div className="operator-profile">
          <div className="avatar">OP</div>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
