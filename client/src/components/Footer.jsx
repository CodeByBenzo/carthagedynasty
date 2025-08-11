import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p className="footer-text">
            © {currentYear} Creative Studio GTA RP. All rights reserved.
          </p>
          <p className="footer-subtitle">
            Crafting immersive roleplay experiences
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
