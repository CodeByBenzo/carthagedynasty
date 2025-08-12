import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import WhitelistForm from './pages/WhitelistForm';
import Toast from './components/Toast';
import SupportChat from './components/SupportChat';
import './App.css';

// Authentication Context
export const AuthContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // Check for stored token on app load
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (token) => {
    try {
  const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
  const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        showToast('Login successful!', 'success');
        return { success: true };
      } else {
        showToast(data.error || 'Login failed', 'error');
        return { success: false, error: data.error };
      }
    } catch (error) {
      showToast('Network error. Please try again.', 'error');
      return { success: false, error: 'Network error' };
    }
  };

  const signup = async (userData) => {
    try {
  const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        showToast('Account created successfully!', 'success');
        return { success: true };
      } else {
        showToast(data.error || 'Signup failed', 'error');
        return { success: false, error: data.error };
      }
    } catch (error) {
      showToast('Network error. Please try again.', 'error');
      return { success: false, error: 'Network error' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    showToast('Logged out successfully', 'info');
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, showToast }}>
      <div className="app">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route 
              path="/dashboard" 
              element={user ? <UserDashboard /> : <Navigate to="/login" />} 
            />
                            <Route 
                  path="/admin" 
                  element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/dashboard" />} 
                />
                <Route 
                  path="/apply" 
                  element={user ? <WhitelistForm /> : <Navigate to="/login" />} 
                />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
        {toast && <Toast message={toast.message} type={toast.type} />}

        {/* Global Support Chat Widget */}
        <SupportChat user={user} />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
