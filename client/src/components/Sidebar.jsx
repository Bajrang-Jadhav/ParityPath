import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/home', icon: 'home', label: 'Home' },
    { path: '/employer', icon: 'business', label: 'Employer' },
    { path: '/candidate', icon: 'person', label: 'Candidate' },
    { path: '/match', icon: 'compare_arrows', label: 'Parity Match' }
  ];

  const insightItems = [
    { path: '/dashboard', icon: 'analytics', label: 'Dashboard' },
    { path: '/agent', icon: 'smart_toy', label: 'AI Agent', badge: 'NEW' }
  ];

  return (
    <nav className="sidebar" id="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon">
            <span className="material-icons-round">balance</span>
          </div>
          <div className="logo-text">
            <h1>ParityPath</h1>
            <span className="logo-tagline">Inclusive Hiring AI</span>
          </div>
        </div>
      </div>

      <div className="nav-section">
        <span className="nav-section-label">PORTALS</span>
        {navItems.map(item => (
          <NavLink 
            key={item.path}
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="material-icons-round">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="nav-section">
        <span className="nav-section-label">INSIGHTS</span>
        {insightItems.map(item => (
          <NavLink 
            key={item.path}
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="material-icons-round">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {item.badge && <span className="nav-badge">{item.badge}</span>}
          </NavLink>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="api-status">
            <span className="status-dot"></span>
            <span className="status-text">Backend Connected</span>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
