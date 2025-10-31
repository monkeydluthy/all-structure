import React from 'react';

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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
              <a href="#" aria-label="Facebook">
                📘
              </a>
              <a href="#" aria-label="Instagram">
                📷
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              {services.map((service, index) => (
                <li key={index}>
                  <a href={service.link}>{service.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('services');
                  }}
                >
                  Our Services
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('portfolio');
                  }}
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('about');
                  }}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contact');
                  }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-details">
              <div className="contact-detail">
                📞
                <a href="tel:2032333862">203.233.3862</a>
              </div>
              <div className="contact-detail">
                ✉️
                <a href="mailto:info@allstructuremaintenance.com">
                  info@allstructuremaintenance.com
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
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
