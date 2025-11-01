import React from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { emailConfig } from '../config/emailConfig';

const ContactPage = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Initialize EmailJS
  React.useEffect(() => {
    emailjs.init(emailConfig.publicKey);
  }, []);

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    service: 'Select a Service',
    message: '',
  });
  const [showServiceModal, setShowServiceModal] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setSubmitted(true);
    
    emailjs.send(emailConfig.serviceId, emailConfig.templateId, {
      to_email: 'luthdigitalconsult@gmail.com,AllstructureMainLLC@yahoo.com',
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message,
    }, emailConfig.publicKey)
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
    })
    .catch((error) => {
      console.log('FAILED...', error);
      // Fallback to mailto if EmailJS fails
      const subject = `Free Estimate Request - ${formData.service}`;
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\n\n${formData.message}`;
      window.location.href = `mailto:${emailConfig.recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'Select a Service',
      message: '',
    });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const services = [
    'Full Restoration & Repairs',
    'Remodeling & Renovations',
    'Roof Repair & Gutter Cleaning',
    'Painting & Sheetrock',
    'Tile Installation',
    'Property Maintenance',
    'Emergency Service',
    'Other',
  ];

  const handleServiceSelect = (service) => {
    setFormData({ ...formData, service });
    setShowServiceModal(false);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <h1>Get In Touch</h1>
          <p className="services-hero-description">
            Ready to start your project? Contact us today for a free, no-obligation estimate.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div className="contact-content">
            <div className="contact-form-wrapper">
              <h2>Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="203.555.1234"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="service">Service Needed</label>
                  <button
                    type="button"
                    className="service-select-btn"
                    onClick={() => setShowServiceModal(true)}
                  >
                    {formData.service} ▼
                  </button>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Project Details</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button type="submit" className="submit-btn">
                  {submitted ? (
                    <>
                      ✅ Sending...
                      <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', fontWeight: 'normal' }}>
                        Your estimate request is being sent.
                      </p>
                    </>
                  ) : (
                    'Get Free Estimate →'
                  )}
                </button>
              </form>

              {/* Service Selection Modal */}
              {showServiceModal && (
                <div
                  className="service-modal-overlay"
                  onClick={() => setShowServiceModal(false)}
                >
                  <div
                    className="service-modal-content"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="service-modal-header">
                      <h3>Select a Service</h3>
                      <button
                        className="service-modal-close"
                        onClick={() => setShowServiceModal(false)}
                      >
                        ✕
                      </button>
                    </div>
                    <ul className="service-modal-list">
                      {services.map((service, index) => (
                        <li key={index}>
                          <button
                            className="service-option-btn"
                            onClick={() => handleServiceSelect(service)}
                          >
                            {service}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="contact-info">
              <h2>Contact Information</h2>
              
              <div className="contact-info-grid">
                <div className="contact-card">
                  <div className="contact-card-icon">📞</div>
                  <h4>Call Us</h4>
                  <a href="tel:2032333862" className="contact-card-link phone-link">
                    203.233.3862
                  </a>
                  <p>Available 7 days a week</p>
                </div>

                <a href="mailto:info@allstructuremaintenance.com" className="contact-card" style={{ textDecoration: 'none' }}>
                  <div className="contact-card-icon">✉️</div>
                  <h4>Email Us</h4>
                  <p>We respond within 24 hours</p>
                </a>

                <div className="contact-card">
                  <div className="contact-card-icon">📍</div>
                  <h4>Visit Us</h4>
                  <p>Meriden, CT 06451</p>
                  <p>Serving all of Connecticut</p>
                </div>

                <div className="contact-card">
                  <div className="contact-card-icon">🕒</div>
                  <h4>Business Hours</h4>
                  <p>Monday - Friday: 7:00 AM - 6:00 PM</p>
                  <p>Saturday: 8:00 AM - 4:00 PM</p>
                  <p>Sunday: Emergency Service Only</p>
                </div>
              </div>

              <div className="service-areas-card">
                <h4>Service Areas</h4>
                <p>
                  We proudly serve all of Connecticut, including Meriden, New Haven, Hartford, 
                  Middletown, and surrounding communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '4rem 0', background: '#f8fafc' }}>
        <div className="container">
          <div className="cta-section">
            <div className="cta-content">
              <h3>Need Immediate Assistance?</h3>
              <p>
                For emergency services or urgent repairs, call us right now. We're available 24/7 
                for emergency situations.
              </p>
              <div className="cta-buttons">
                <a href="tel:2032333862" className="cta-primary">
                  📞 Call 203.233.3862 Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

