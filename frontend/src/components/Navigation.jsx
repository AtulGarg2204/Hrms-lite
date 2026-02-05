import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Calendar } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navStyle = {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '1rem 2rem',
    marginBottom: '2rem'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    marginRight: '1rem',
    borderRadius: '4px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const activeStyle = {
    ...linkStyle,
    backgroundColor: '#34495e'
  };

  return (
    <nav style={navStyle}>
      <h1 style={{ margin: '0 0 1rem 0' }}>HRMS Lite</h1>
      <div>
        <Link 
          to="/" 
          style={location.pathname === '/' ? activeStyle : linkStyle}
        >
          <Users size={18} />
          Employees
        </Link>
        <Link 
          to="/attendance" 
          style={location.pathname === '/attendance' ? activeStyle : linkStyle}
        >
          <Calendar size={18} />
          Attendance
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;