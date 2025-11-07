import React from 'react';
import { Link } from 'react-router-dom';
import { servicesList } from '../data/services';

const Services = () => {

  return (
    <section id="services" className="services">
      <div className="container">
        <h2>Complete Property Maintenance Services</h2>
        <p className="section-subtitle">
          From minor repairs to full-scale renovations, we've got your property
          covered.
        </p>

        <div className="services-grid">
          {servicesList.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-image">
                <img
                  src={service.heroImage}
                  alt={`${service.listTitle} in Connecticut - All Structure Maintenance`}
                  loading="lazy"
                />
              </div>
              <div className="service-content">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.listTitle}</h3>
                <p>{service.cardDescription}</p>
                <Link to={`/services/${service.slug}`} className="service-btn">
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
