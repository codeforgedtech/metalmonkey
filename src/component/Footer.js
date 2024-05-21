import React from 'react';
import './footer.css'; // Importera CSS-filen för styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
Metal Monkey is an integral component of CodeForged Technology, with its code and design meticulously crafted by its subsidiary, Monkey Dev.</p>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@codeforged.se</p>
          <p>Phone: +460736550614</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Signal</a></li>
            <li><a href="#">MetalCentral</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 CodeForged Technology. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;