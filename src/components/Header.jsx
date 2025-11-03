import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { trackPhoneCall, trackCTAClick } from '../utils/analytics';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTAClick = (e) => {
    e.preventDefault();
    trackCTAClick('Header Get Free Estimate');
    
    // If on homepage, scroll to contact section
    if (location.pathname === '/') {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Otherwise navigate to contact page
      navigate('/contact');
    }
  };

  return (
    <header className={`sticky-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <h2>All Structure Maintenance</h2>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <Link to="/services">Services</Link>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          <div className="header-cta">
            <a href="tel:2032333862" className="phone-btn" onClick={() => trackPhoneCall('203.233.3862')}>
              📞 203.233.3862
            </a>
            <a
              href={location.pathname === '/' ? '#contact' : '/contact'}
              className="cta-btn"
              onClick={handleCTAClick}
            >
              Get Free Estimate
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mobile-nav">
            <Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
            <Link to="/portfolio" onClick={() => setIsMenuOpen(false)}>Portfolio</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <div className="mobile-cta">
              <a href="tel:2032333862" className="phone-btn" onClick={() => trackPhoneCall('203.233.3862')}>
                📞 203.233.3862
              </a>
              <Link to="/contact" className="cta-btn" onClick={() => { trackCTAClick('Mobile Get Free Estimate'); setIsMenuOpen(false); }}>
                Get Free Estimate
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
