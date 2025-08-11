import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';
import './LandingPage.css';
import Logo from '../assets/logo.svg';
import RoleplayScape from '../assets/Roleplay.webp';

const LandingPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="landing-page">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title creative-studio-header">
            Carthage Dynasty
          </h1>
          <p className="page-subtitle">
            Where imagination meets reality in the world of GTA RP
          </p>
        </div>

        <div className="hero-section">
          <div className="hero-content">
            <h2 className="hero-title">
              Welcome to the Ultimate Roleplay Experience
            </h2>
            <p className="hero-description">
              Join our vibrant community of storytellers, creators, and roleplayers. 
              Experience Los Santos like never before with immersive storylines, 
              dynamic characters, and unforgettable adventures.
            </p>
            
            <div className="hero-features">
              <div className="feature-item">
                <span className="feature-icon">🎭</span>
                <h3>Immersive Roleplay</h3>
                <p>Create compelling characters and stories</p>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🏙️</span>
                <h3>Living City</h3>
                <p>Experience a dynamic, evolving Los Santos</p>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🤝</span>
                <h3>Community</h3>
                <p>Join a supportive, creative community</p>
              </div>
            </div>

            <div className="cta-section">
            {/* Gallery Section */}
            <div className="gallery-section">
              <h3 className="gallery-title">Gallery</h3>
              <div className="gallery-grid">
                <img src={Logo} alt="Logo" className="gallery-img" />
                <img src={RoleplayScape} alt="Roleplay Scene" className="gallery-img" />
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="City" className="gallery-img" />
                <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" alt="Roleplay" className="gallery-img" />
              </div>
            </div>
              {user ? (
                <div className="cta-buttons">
                  <Link to="/apply" className="btn btn-primary">
                    Apply for Whitelist
                  </Link>
                  <Link to="/dashboard" className="btn btn-secondary">
                    View Dashboard
                  </Link>
                </div>
              ) : (
                <div className="cta-buttons">
                  <Link to="/signup" className="btn btn-primary">
                    Join Our Community
                  </Link>
                  <Link to="/login" className="btn btn-secondary">
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="info-section">
          <div className="info-grid">
            <div className="info-card sepia-photo">
              <h3>Latest Projects</h3>
              <p>
                Our community has been working on some amazing storylines. 
                From detective mysteries to business empires, every day brings 
                new adventures and opportunities.
              </p>
              <div className="project-stats">
                <div className="stat">
                  <span className="stat-number">150+</span>
                  <span className="stat-label">Active Players</span>
                </div>
                <div className="stat">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Storylines</span>
                </div>
                <div className="stat">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Server Uptime</span>
                </div>
              </div>
            </div>

            <div className="info-card torn-paper">
              <h3>Application Process</h3>
              <p>
                Getting started is easy! Simply create an account and submit 
                your whitelist application. Our team reviews each application 
                carefully to ensure quality roleplay.
              </p>
              <div className="process-steps">
                <div className="step">
                  <span className="step-number">1</span>
                  <span className="step-text">Create Account</span>
                </div>
                <div className="step">
                  <span className="step-number">2</span>
                  <span className="step-text">Submit Application</span>
                </div>
                <div className="step">
                  <span className="step-number">3</span>
                  <span className="step-text">Get Approved</span>
                </div>
                <div className="step">
                  <span className="step-number">4</span>
                  <span className="step-text">Start Playing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rules-section">
          <div className="rules-card torn-paper">
            <h3>Community Guidelines</h3>
            <div className="rules-list">
              <div className="rule-item">
                <span className="rule-icon">✨</span>
                <span>Respect all players and their characters</span>
              </div>
              <div className="rule-item">
                <span className="rule-icon">🎭</span>
                <span>Stay in character during roleplay</span>
              </div>
              <div className="rule-item">
                <span className="rule-icon">🤝</span>
                <span>Collaborate and build stories together</span>
              </div>
              <div className="rule-item">
                <span className="rule-icon">📝</span>
                <span>Follow server rules and guidelines</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;