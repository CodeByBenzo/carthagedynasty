import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../App';
import logo from '../assets/Roleplay.webp';
import './NavBar.css';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            <img src={logo} alt="Creative Studio Logo" className="brand-logo" />
            <div className="brand-text">
              <h1 className="brand-title">Carthage Dynasty</h1>
              <span className="brand-subtitle"> RolePlay Whitelist</span>
            </div>
          </Link>
        </div>

        <div className="navbar-nav">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
              >
                Dashboard
              </Link>
              
                                    {user.role === 'admin' && (
                        <Link 
                          to="/admin" 
                          className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
                        >
                          Admin
                        </Link>
                      )}
              
              <Link 
                to="/apply" 
                className={`nav-link ${isActive('/apply') ? 'active' : ''}`}
              >
                Apply
              </Link>
              
              <button onClick={logout} className="nav-link logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`nav-link ${isActive('/login') ? 'active' : ''}`}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className={`nav-link ${isActive('/signup') ? 'active' : ''}`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {user && (
          <div className="user-info">
            <span className="username">{user.username}</span>
            {user.role === 'admin' && (
              <span className="role-badge">Admin</span>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
