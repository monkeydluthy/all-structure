import React from 'react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: '🛡️',
      title: 'Licensed & Insured',
      description:
        'Fully licensed general contractor with comprehensive insurance coverage for your peace of mind.',
    },
    {
      icon: '⏰',
      title: 'On-Time Delivery',
      description:
        'We respect your time and deliver projects on schedule, every time.',
    },
    {
      icon: '💰',
      title: 'Fair Pricing',
      description:
        'Transparent pricing with no hidden costs. Get detailed estimates before we start.',
    },
    {
      icon: '🔧',
      title: 'Quality Craftsmanship',
      description:
        'Attention to detail and quality materials ensure lasting results.',
    },
  ];

  const stats = [
    { number: '7+', label: 'Years Experience' },
    { number: '500+', label: 'Projects Completed' },
    { number: '100%', label: 'Customer Satisfaction' },
    { number: '24/7', label: 'Emergency Service' },
  ];

  const guarantees = [
    'Licensed & Insured General Contractor',
    'Free Estimates on All Projects',
    '7+ Years of Proven Experience',
    '100% Satisfaction Guarantee',
    'Emergency Service Available',
    'Quality Materials & Workmanship',
  ];

  return (
    <section id="about" className="why-choose-us">
      <div className="container">
        <h2>Why Connecticut Trusts All Structure Maintenance</h2>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Guarantees Section */}
        <div className="guarantees-section">
          <h3>Our Guarantees</h3>
          <div className="guarantees-grid">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="guarantee-item">
                ✅ <span>{guarantee}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <div className="cta-content">
            <h3>Ready to Get Started?</h3>
            <p>
              Contact us today for a free, no-obligation estimate on your
              project.
            </p>
            <div className="cta-buttons">
              <a href="tel:2032333862" className="cta-primary">
                📞 Call 203.233.3862
              </a>
              <a href="#contact" className="cta-secondary">
                Get Free Estimate
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
