import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {

  const values = [
    {
      icon: '✨',
      title: 'Excellence in Every Detail',
      description:
        'We believe that great work comes from attention to detail and a commitment to quality in every project.',
    },
    {
      icon: '🤝',
      title: 'Customer First',
      description:
        'Your satisfaction is our top priority. We listen, communicate, and deliver results that exceed expectations.',
    },
    {
      icon: '🏆',
      title: 'Integrity & Honesty',
      description:
        'Transparent pricing, honest assessments, and ethical practices in everything we do.',
    },
    {
      icon: '⚡',
      title: 'Reliable & Efficient',
      description:
        'On-time delivery, responsive service, and efficient processes that respect your time and budget.',
    },
  ];

  const milestones = [
    { year: '2017', title: 'Founded', description: 'Started serving Connecticut communities' },
    { year: '2019', title: 'Expanded', description: 'Added emergency restoration services' },
    { year: '2021', title: '500+ Projects', description: 'Completed our 500th project' },
    { year: '2024', title: 'Today', description: 'Continuing to serve with excellence' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <h1>About All Structure Maintenance</h1>
          <p className="services-hero-description">
            Your trusted partner for all your property maintenance and improvement needs across Connecticut.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="about-story" style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2017, All Structure Maintenance began with a simple mission: to provide 
                Connecticut homeowners and businesses with reliable, high-quality general contracting 
                services they could trust.
              </p>
              <p>
                What started as a small operation has grown into a trusted local business serving 
                communities across the state. We've completed over 500 projects, from emergency 
                restoration work to complete home renovations, always maintaining our commitment to 
                quality craftsmanship and customer satisfaction.
              </p>
              <p>
                Today, we continue to build on our reputation for excellence, offering a full range 
                of services including restoration, remodeling, roofing, painting, tiling, and property 
                maintenance. Our team brings years of experience, attention to detail, and a genuine 
                passion for transforming properties and exceeding expectations.
              </p>
            </div>
            <div className="about-image">
              <img src="/images/logo.png" alt="All Structure Maintenance" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="about-values" style={{ padding: '4rem 0', background: '#f8fafc' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Our Core Values</h2>
          <div className="features-grid">
            {values.map((value, index) => (
              <div key={index} className="feature">
                <div className="feature-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="about-milestones" style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Our Journey</h2>
          <div className="milestones-grid">
            {milestones.map((milestone, index) => (
              <div key={index} className="milestone-item">
                <div className="milestone-year">{milestone.year}</div>
                <h3>{milestone.title}</h3>
                <p>{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us" style={{ background: '#f8fafc' }}>
        <div className="container">
          <h2>Why Connecticut Trusts All Structure Maintenance</h2>

          {/* Stats Section */}
          <div className="stats-section">
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">7+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Customer Satisfaction</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Emergency Service</div>
              </div>
            </div>
          </div>

          {/* Guarantees Section */}
          <div className="guarantees-section">
            <h3>Our Guarantees</h3>
            <div className="guarantees-grid">
              <div className="guarantee-item">
                ✅ <span>Licensed & Insured General Contractor</span>
              </div>
              <div className="guarantee-item">
                ✅ <span>Free Estimates on All Projects</span>
              </div>
              <div className="guarantee-item">
                ✅ <span>7+ Years of Proven Experience</span>
              </div>
              <div className="guarantee-item">
                ✅ <span>100% Satisfaction Guarantee</span>
              </div>
              <div className="guarantee-item">
                ✅ <span>Emergency Service Available</span>
              </div>
              <div className="guarantee-item">
                ✅ <span>Quality Materials & Workmanship</span>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="cta-section">
            <div className="cta-content">
              <h3>Ready to Work Together?</h3>
              <p>
                Let's discuss your project. Contact us today for a free, no-obligation estimate.
              </p>
              <div className="cta-buttons">
                <a href="tel:2032333862" className="cta-primary">
                  📞 Call 203.233.3862
                </a>
                <Link to="/contact" className="cta-secondary">
                  Get Free Estimate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

