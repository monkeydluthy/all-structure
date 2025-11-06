import React from 'react';
import { trackPhoneCall, trackCTAClick } from '../utils/analytics';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="container">
          <div className="hero-image">
            <div className="hero-before-after">
              <div className="hero-before-after-item">
                <div className="hero-before-after-label">Before</div>
                <img
                  src="/images/kitchen-before.jpg"
                  alt="Kitchen Remodel Before - All Structure Maintenance"
                  loading="eager"
                />
              </div>
              <div className="hero-before-after-item">
                <div className="hero-before-after-label">After</div>
                <img
                  src="/images/kitchen-after.jpg"
                  alt="Kitchen Remodel After - All Structure Maintenance"
                  loading="eager"
                />
              </div>
            </div>
          </div>
          <div className="hero-text">
            <h1>Connecticut's Trusted General Contractor</h1>
            <p className="hero-subtitle">Licensed • Insured • Reliable</p>
            <p className="hero-description">
              From full restoration to roof repairs, gutter cleaning, and
              remodeling - we deliver exceptional results with a steadfast
              commitment to client satisfaction.
            </p>
            <div className="hero-buttons">
              <a href="tel:2032333862" className="cta-primary" onClick={() => trackPhoneCall('203.233.3862')}>
                📞 Call 203.233.3862
              </a>
              <a
                href="#contact"
                className="cta-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  trackCTAClick('Hero Get Free Estimate');
                  scrollToSection('contact');
                }}
              >
                Get Free Estimate →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
