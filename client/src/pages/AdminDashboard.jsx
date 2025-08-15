import React, { useState, useEffect, useContext } from 'react';
import { whitelistQuestions } from '../config/questions';
import { AuthContext } from '../App';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('applications');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [reviewData, setReviewData] = useState({ status: 'pending', adminNotes: '' });
  const [reviewing, setReviewing] = useState(false);
  
  const { user, showToast } = useContext(AuthContext);

  // Function to detect placeholder text
  const isPlaceholderText = (text) => {
    if (!text) return false;
    const lowerText = text.toLowerCase();
    const repeatedPatterns = [
      'qddmdqkdkm',
      'qdqsdqsdqdq',
      'test',
      'placeholder',
      'lorem ipsum'
    ];
    
    return repeatedPatterns.some(pattern => {
      const regex = new RegExp(`(${pattern}){3,}`, 'i');
      return regex.test(lowerText);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch applications
  const appsResponse = await fetch('https://api.carthagedynasty.com:8443/api/admin/applications', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      // Fetch users
  const usersResponse = await fetch('https://api.carthagedynasty.com:8443/api/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (appsResponse.ok && usersResponse.ok) {
        const appsData = await appsResponse.json();
        const usersData = await usersResponse.json();
        setApplications(appsData.applications);
        setUsers(usersData.users);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      showToast('Failed to load admin data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleReviewApplication = async () => {
    if (!selectedApplication) return;
    
    setReviewing(true);
    try {
      const token = localStorage.getItem('token');
  const response = await fetch(`https://api.carthagedynasty.com:8443/api/admin/applications/${selectedApplication.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(reviewData)
      });

      if (response.ok) {
        showToast('Application reviewed successfully', 'success');
        setSelectedApplication(null);
        setReviewData({ status: 'pending', adminNotes: '' });
        fetchData(); // Refresh data
      } else {
        const data = await response.json();
        showToast(data.error || 'Failed to review application', 'error');
      }
    } catch (error) {
      console.error('Review error:', error);
      showToast('Network error. Please try again.', 'error');
    } finally {
      setReviewing(false);
    }
  };

  const handlePromoteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
  const response = await fetch(`https://api.carthagedynasty.com:8443/api/admin/users/${userId}/promote`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        showToast('User promoted to admin successfully', 'success');
        fetchData(); // Refresh data
      } else {
        const data = await response.json();
        showToast(data.error || 'Failed to promote user', 'error');
      }
    } catch (error) {
      console.error('Promote error:', error);
      showToast('Network error. Please try again.', 'error');
    }
  };

  const handleBanUser = async (userId, isBanned) => {
    try {
      const token = localStorage.getItem('token');
  const response = await fetch(`https://api.carthagedynasty.com:8443/api/admin/users/${userId}/ban`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isBanned })
      });

      if (response.ok) {
        showToast(`User ${isBanned ? 'banned' : 'unbanned'} successfully`, 'success');
        fetchData(); // Refresh data
      } else {
        const data = await response.json();
        showToast(data.error || 'Failed to update user status', 'error');
      }
    } catch (error) {
      console.error('Ban error:', error);
      showToast('Network error. Please try again.', 'error');
    }
  };

  const handleExport = async () => {
    try {
      const token = localStorage.getItem('token');
  const response = await fetch('https://api.carthagedynasty.com:8443/api/admin/export', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'applications.json';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        showToast('Applications exported successfully', 'success');
      }
    } catch (error) {
      console.error('Export error:', error);
      showToast('Failed to export applications', 'error');
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.inGameName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="admin-page">
        <div className="page-container">
          <div className="loading-card torn-paper">
            <div className="spinner"></div>
            <p>Loading admin dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Admin Dashboard</h1>
          <p className="page-subtitle">Manage applications and users</p>
        </div>

        <div className="admin-stats">
          <div className="stat-card torn-paper">
            <h3>Total Applications</h3>
            <span className="stat-number">{applications.length}</span>
          </div>
          <div className="stat-card torn-paper">
            <h3>Pending Review</h3>
            <span className="stat-number">{applications.filter(app => app.status === 'pending').length}</span>
          </div>
          <div className="stat-card torn-paper">
            <h3>Total Users</h3>
            <span className="stat-number">{users.length}</span>
          </div>
          <div className="stat-card torn-paper">
            <h3>Admins</h3>
            <span className="stat-number">{users.filter(user => user.role === 'admin').length}</span>
          </div>
        </div>

        <div className="admin-controls">
          <div className="search-filter">
            <input
              type="text"
              placeholder="Search by name or username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {activeTab === 'applications' && (
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            )}
          </div>
          
          <div className="tab-buttons">
            <button
              className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
              onClick={() => setActiveTab('applications')}
            >
              Applications ({applications.length})
            </button>
            <button
              className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              Users ({users.length})
            </button>
          </div>
        </div>

        {activeTab === 'applications' && (
          <div className="applications-section">
            <div className="section-header">
              <h2>Applications</h2>
              <button onClick={handleExport} className="btn btn-secondary">
                Export JSON
              </button>
            </div>
            
            <div className="applications-grid">
              {filteredApplications.length > 0 ? (
                filteredApplications.map(app => (
                  <div key={app.id} className="app-card torn-paper">
                    <div className="app-header">
                      <h3>{app.inGameName}</h3>
                      <span className={`status-badge status-${app.status}`}>
                        {app.status}
                      </span>
                    </div>
                    
                    <div className="app-details">
                      <p><strong>Username:</strong> {app.username}</p>
                      <p><strong>Experience:</strong> {app.experience}</p>
                      <p><strong>Submitted:</strong> {new Date(app.submittedAt).toLocaleDateString()}</p>
                      {app.reviewedAt && (
                        <p><strong>Reviewed:</strong> {new Date(app.reviewedAt).toLocaleDateString()}</p>
                      )}
                    </div>
                    
                    <div className="app-actions">
                      <button
                        onClick={() => setSelectedApplication(app)}
                        className="btn btn-primary"
                      >
                        Review
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-applications torn-paper">
                  <h3>No Applications Found</h3>
                  <p>There are currently no applications to review.</p>
                  {searchTerm || statusFilter !== 'all' ? (
                    <p>Try adjusting your search or filter criteria.</p>
                  ) : (
                    <p>Applications will appear here once users submit their whitelist forms.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-section">
            <div className="section-header">
              <h2>Users</h2>
            </div>
            
            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${user.isBanned ? 'status-rejected' : 'status-approved'}`}>
                          {user.isBanned ? 'Banned' : 'Active'}
                        </span>
                      </td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div className="user-actions">
                          {user.role !== 'admin' && (
                            <button
                              onClick={() => handlePromoteUser(user.id)}
                              className="btn btn-secondary btn-sm"
                            >
                              Promote
                            </button>
                          )}
                          <button
                            onClick={() => handleBanUser(user.id, !user.isBanned)}
                            className={`btn btn-sm ${user.isBanned ? 'btn-primary' : 'btn-danger'}`}
                          >
                            {user.isBanned ? 'Unban' : 'Ban'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Review Modal */}
        {selectedApplication && (
          <div className="modal-overlay">
            <div className="modal torn-paper" style={{maxWidth:'1200px',width:'98vw',minHeight:'70vh',padding:'2.5em 2em'}}>
              <div className="modal-header">
                <h3>Review Application - {selectedApplication.inGameName}</h3>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="modal-close"
                >
                  ×
                </button>
              </div>
              
              <div className="modal-content">
                <div className="app-review-details">
                  <h4>Application Details</h4>
                  <div className="answers-list big-answers">
                    {whitelistQuestions.map(q => {
                      const value = selectedApplication[q.id];
                      let displayValue = value;
                      if (q.type === 'select') {
                        const opt = q.options?.find(o => o.value === value);
                        displayValue = opt ? opt.label : value || 'Not provided';
                      }
                      if ((q.id === 'roleplaySample' || q.id === 'whyJoin') && value) {
                        displayValue = <>
                          {isPlaceholderText(value) && (
                            <div className="placeholder-warning">⚠️ This appears to be placeholder text</div>
                          )}
                          <span style={{fontSize: '1.15em', fontWeight: 500, color: '#222'}}>{value}</span>
                        </>;
                      }
                      if (!value) displayValue = <span className="not-provided" style={{color:'#b00',fontWeight:600}}>Not provided</span>;
                      return (
                        <div key={q.id} className="answer-row" style={{marginBottom:'1.2em',padding:'1em 1.5em',background:'#f7f7fa',borderRadius:'1em',boxShadow:'0 2px 12px #0001'}}>
                          <div className="answer-label" style={{fontSize:'1.2em',fontWeight:700,marginBottom:'0.5em',color:'#2a3a6e'}}>{q.label}</div>
                          <div className="answer-value" style={{fontSize:'1.15em',fontWeight:500,color:'#222'}}>{displayValue}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="review-form">
                  <h4>Review Decision</h4>
                  <select
                    value={reviewData.status}
                    onChange={(e) => setReviewData(prev => ({ ...prev, status: e.target.value }))}
                    className="form-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approve</option>
                    <option value="rejected">Reject</option>
                  </select>
                  
                  <textarea
                    placeholder="Admin notes (optional)..."
                    value={reviewData.adminNotes}
                    onChange={(e) => setReviewData(prev => ({ ...prev, adminNotes: e.target.value }))}
                    className="form-textarea"
                    rows="4"
                  />
                </div>
              </div>
              
              <div className="modal-actions">
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReviewApplication}
                  className="btn btn-primary"
                  disabled={reviewing}
                >
                  {reviewing ? 'Reviewing...' : 'Submit Review'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
