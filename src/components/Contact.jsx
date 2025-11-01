import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showServiceModal, setShowServiceModal] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleServiceSelect = (service) => {
    setFormData({
      ...formData,
      service: service,
    });
    setShowServiceModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create email subject and body
    const subject = `Free Estimate Request - ${formData.service}`;
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Service Needed: ${formData.service}

Project Details:
${formData.message}
    `.trim();
    
    // Create mailto link
    const mailtoLink = `mailto:luthdigitalconsult@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open default email client
    window.location.href = mailtoLink;
    
    setIsSubmitting(true);
    setSubmitStatus('success');
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    });

    // Reset status after 5 seconds
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus(null);
    }, 5000);
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

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2>Get Your Free Estimate Today</h2>
        <p className="section-subtitle">
          Ready to transform your property? Contact us for a free, no-obligation
          estimate.
        </p>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <span style={{ fontSize: '1.5rem', color: '#3b82f6' }}>📞</span>
              <div>
                <h4>Call Us</h4>
                <a href="tel:2032333862">203.233.3862</a>
                <p>Available 7 days a week</p>
              </div>
            </div>

            <div className="contact-item">
              <span style={{ fontSize: '1.5rem', color: '#3b82f6' }}>✉️</span>
              <div>
                <h4>Email Us</h4>
                <a href="mailto:info@allstructuremaintenance.com">
                  info@allstructuremaintenance.com
                </a>
                <p>We respond within 24 hours</p>
              </div>
            </div>

            <div className="contact-item">
              <span style={{ fontSize: '1.5rem', color: '#3b82f6' }}>📍</span>
              <div>
                <h4>Visit Us</h4>
                <p>Meriden, CT 06451</p>
                <p>Serving all of Connecticut</p>
              </div>
            </div>

            <div className="contact-item">
              <span style={{ fontSize: '1.5rem', color: '#3b82f6' }}>🕒</span>
              <div>
                <h4>Business Hours</h4>
                <p>Monday - Friday: 7:00 AM - 6:00 PM</p>
                <p>Saturday: 8:00 AM - 4:00 PM</p>
                <p>Sunday: Emergency Service Only</p>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Request Free Estimate</h3>

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone Number *"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    className="service-select-btn"
                    onClick={() => setShowServiceModal(true)}
                  >
                    {formData.service || 'Select Service Needed *'}
                    <span>▼</span>
                  </button>
                  {!formData.service && (
                    <span className="required-indicator">*</span>
                  )}
                  {formData.service && (
                    <input
                      type="hidden"
                      name="service"
                      value={formData.service}
                      required
                    />
                  )}
                </div>
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Tell us about your project (optional)"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>📤 Get My Free Estimate</>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="success-message">
                  ✅ Thank you! We'll contact you within 24 hours.
                </div>
              )}
            </form>

            {/* Quick Contact Options */}
            <div className="quick-contact">
              <h4>Prefer to call or text?</h4>
              <div className="quick-buttons">
                <a href="tel:2032333862" className="quick-btn phone">
                  📞 Call Now
                </a>
                <a href="sms:2032333862" className="quick-btn text">
                  💬 Text Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

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
              <h3>Select Service</h3>
              <button
                className="service-modal-close"
                onClick={() => setShowServiceModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="service-modal-list">
              {services.map((service, index) => (
                <button
                  key={index}
                  type="button"
                  className="service-option-btn"
                  onClick={() => handleServiceSelect(service)}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
