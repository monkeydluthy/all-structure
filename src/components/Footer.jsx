import React from 'react';
import { Link } from 'react-router-dom';
import { trackPhoneCall, trackEmailClick } from '../utils/analytics';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Full Restoration', link: '/services/restoration' },
    { name: 'Remodeling', link: '/services/remodeling' },
    { name: 'Roof Repair', link: '/services/roofing' },
    { name: 'Painting', link: '/services/painting' },
    { name: 'Tile Installation', link: '/services/tile' },
    { name: 'Maintenance', link: '/services/maintenance' },
  ];


  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>All Structure Maintenance</h3>
            <p>
              Connecticut's trusted general contractor since 2016. Licensed,
              insured, and committed to excellence in every project.
            </p>
            <div className="social-links">
              <a
                href="https://www.facebook.com/allstructuremaintenance/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                📘
              </a>
              <a
                href="https://www.instagram.com/allstructuremaintenance/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                📷
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              {services.map((service, index) => (
                <li key={index}>
                  <Link to={service.link}>{service.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/services">Our Services</Link>
              </li>
              <li>
                <Link to="/portfolio">Portfolio</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-details">
              <div className="contact-detail">
                📞
                <a href="tel:2032333862" onClick={() => trackPhoneCall('203.233.3862')}>203.233.3862</a>
              </div>
              <div className="contact-detail">
                ✉️
                <a href="mailto:AllstructureMainLLC@yahoo.com" onClick={() => trackEmailClick('AllstructureMainLLC@yahoo.com')}>
                  AllstructureMainLLC@yahoo.com
                </a>
              </div>
              <div className="contact-detail">
                📍
                <span>Meriden, CT 06451</span>
              </div>
            </div>

            <div className="business-hours">
              <h5>Business Hours</h5>
              <p>Mon-Fri: 7:00 AM - 6:00 PM</p>
              <p>Saturday: 8:00 AM - 4:00 PM</p>
              <p>Sunday: Emergency Service Only</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>
              &copy; {currentYear} All Structure Maintenance LLC. All rights
              reserved.
            </p>
            <div className="footer-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <a href="/sitemap.xml">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
