import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';
import './Dashboard.css';

const UserDashboard = () => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, showToast } = useContext(AuthContext);

  useEffect(() => {
    fetchApplication();
  }, []);

  const fetchApplication = async () => {
    try {
      const token = localStorage.getItem('token');
  const response = await fetch('https://api.carthagedynasty.com:8443/api/applications/my', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setApplication(data.application);
      }
    } catch (error) {
      console.error('Error fetching application:', error);
      showToast('Failed to load application data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'status-approved';
      case 'rejected':
        return 'status-rejected';
      default:
        return 'status-pending';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return '✅';
      case 'rejected':
        return '❌';
      default:
        return '⏳';
    }
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="page-container">
          <div className="loading-card torn-paper">
            <div className="spinner"></div>
            <p>Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Welcome, {user.username}!</h1>
          <p className="page-subtitle">Your Creative Studio Dashboard</p>
        </div>

        <div className="dashboard-grid">
          {/* User Info Card */}
          <div className="dashboard-card torn-paper">
            <h3 className="card-title">Account Information</h3>
            <div className="user-info">
              <div className="info-row">
                <span className="info-label">Username:</span>
                <span className="info-value">{user.username}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{user.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Role:</span>
                <span className="info-value">
                  <span className={`role-badge ${user.role === 'admin' ? 'admin' : 'user'}`}>
                    {user.role}
                  </span>
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Member Since:</span>
                <span className="info-value">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Application Status Card */}
          <div className="dashboard-card torn-paper">
            <h3 className="card-title">Whitelist Application</h3>
            
            {application ? (
              <div className="application-status">
                <div className="status-header">
                  <span className={`status-badge ${getStatusColor(application.status)}`}>
                    {getStatusIcon(application.status)} {application.status}
                  </span>
                </div>
                
                <div className="app-details">
                  <div className="detail-row">
                    <span className="detail-label">In-Game Name:</span>
                    <span className="detail-value">{application.inGameName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Experience:</span>
                    <span className="detail-value">{application.experience}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Submitted:</span>
                    <span className="detail-value">
                      {new Date(application.submittedAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {application.reviewedAt && (
                    <div className="detail-row">
                      <span className="detail-label">Reviewed:</span>
                      <span className="detail-value">
                        {new Date(application.reviewedAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  
                  {application.reviewedBy && (
                    <div className="detail-row">
                      <span className="detail-label">Reviewed By:</span>
                      <span className="detail-value">{application.reviewedBy}</span>
                    </div>
                  )}
                </div>

                {application.adminNotes && (
                  <div className="admin-notes">
                    <h4>Admin Notes:</h4>
                    <p>{application.adminNotes}</p>
                  </div>
                )}

                {application.status === 'pending' && (
                  <div className="pending-message">
                    <p>Your application is currently under review. We'll notify you once a decision has been made.</p>
                  </div>
                )}

                {application.status === 'approved' && (
                  <div className="approved-message">
                    <p>🎉 Congratulations! Your application has been approved. You can now join our server!</p>
                    <div className="server-info">
                      <h4>Server Information:</h4>
                      <p><strong>Server IP:</strong> cfx.carthagedynasty.com</p>
                      <p><strong>Discord:</strong>discord.gg/3JJkHaGGRr</p>
                    </div>
                  </div>
                )}

                {application.status === 'rejected' && (
                  <div className="rejected-message">
                    <p>Unfortunately, your application was not approved at this time. You may reapply in 24 hours.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="no-application">
                <div className="no-app-icon">📝</div>
                <h4>No Application Submitted</h4>
                <p>You haven't submitted a whitelist application yet.</p>
                <Link to="/apply" className="btn btn-primary">
                  Submit Application
                </Link>
              </div>
            )}
          </div>

          {/* Quick Actions Card */}
          <div className="dashboard-card torn-paper">
            <h3 className="card-title">Quick Actions</h3>
            <div className="quick-actions">
              {!application && (
                <Link to="/apply" className="action-btn btn btn-primary">
                  📝 Submit Whitelist Application
                </Link>
              )}
              
              {application && application.status === 'pending' && (
                <div className="action-info">
                  <p>Your application is being reviewed. Please be patient.</p>
                </div>
              )}
              
              {application && application.status === 'approved' && (
                <div className="action-buttons">
                  <a 
                    href="https://discord.gg/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-btn btn btn-secondary"
                  >
                    💬 Join Discord
                  </a>
                  <button className="action-btn btn btn-primary">
                    🎮 Connect to Server
                  </button>
                </div>
              )}
              
              {application && application.status === 'rejected' && (
                <div className="action-info">
                  <p>You can reapply in 24 hours from the rejection date.</p>
                </div>
              )}
            </div>
          </div>

          {/* Community Info Card */}
          <div className="dashboard-card sepia-photo">
            <h3 className="card-title">Community Information</h3>
            <div className="community-info">
              <div className="community-stat">
                <span className="stat-number">150+</span>
                <span className="stat-label">Active Players</span>
              </div>
              <div className="community-stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Server Uptime</span>
              </div>
              <div className="community-stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Storylines</span>
              </div>
            </div>
            <div className="community-links">
              <a 
                href="https://discord.gg/3JJkHaGGRr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="community-link"
              >
                Join our Discord community
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
