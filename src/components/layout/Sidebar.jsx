import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAppContext } from '../../store/AppContext';
import { 
  LayoutDashboard, 
  ListTodo, 
  Map as MapIcon, 
  Ambulance, 
  Building2, 
  Activity, 
  BarChart3,
  Settings,
  User
} from 'lucide-react';
import './layout.css';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Crisis Queue', path: '/queue', icon: ListTodo },
  { name: 'Live Map', path: '/map', icon: MapIcon },
  { name: 'Response Units', path: '/units', icon: Ambulance },
  { name: 'Hospitals', path: '/hospitals', icon: Building2 },
  { name: 'Activity Log', path: '/activity', icon: Activity },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
];

function Sidebar() {
  const { isSidebarOpen } = useAppContext();

  return (
    <aside className={`sidebar ${!isSidebarOpen ? 'closed' : ''}`}>
      <Link to="/dashboard" className="sidebar-brand" style={{ textDecoration: 'none', color: 'inherit' }}>
        <span className="brand-icon">🚨</span>
        <h2>RESPONSE COMMAND</h2>
      </Link>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <item.icon className="nav-icon" size={20} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-link">
          <Settings className="nav-icon" size={20} />
          <span>Settings</span>
        </button>
        <button className="nav-link">
          <User className="nav-icon" size={20} />
          <span>Operator Profile</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
