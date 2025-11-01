import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: '🏠',
      title: 'Full Restoration & Repairs',
      description:
        'Complete property restoration from water damage, fire damage, and general wear. We bring your property back to its original condition.',
      image: '/images/restore.jpg',
      link: '/services/restoration',
      key: 'restoration',
    },
    {
      icon: '🔧',
      title: 'Remodeling & Renovations',
      description:
        'Transform your space with our expert remodeling services. Kitchens, bathrooms, basements, and whole-home renovations.',
      image: '/images/remodel.jpg',
      link: '/services/remodeling',
      key: 'remodeling',
    },
    {
      icon: '🏠',
      title: 'Roof Repair & Gutter Cleaning',
      description:
        'Expert roof repairs, gutter cleaning, and maintenance to protect your property from the elements.',
      image: '/images/roof.JPEG',
      link: '/services/roofing',
      key: 'roofing',
    },
    {
      icon: '🎨',
      title: 'Painting & Sheetrock',
      description:
        'Professional interior and exterior painting, sheetrock installation, and drywall repairs.',
      image: '/images/sheetrock.JPG',
      link: '/services/painting',
      key: 'painting',
    },
    {
      icon: '🔲',
      title: 'Tile Installation',
      description:
        'Beautiful tile work for bathrooms, kitchens, and floors. Custom designs and expert installation.',
      image: '/images/tile.jpg',
      link: '/services/tile',
      key: 'tile',
    },
    {
      icon: '⚙️',
      title: 'Property Maintenance',
      description:
        'Regular maintenance services to keep your property in perfect condition year-round.',
      image: '/images/lawn.jpg',
      link: '/services/maintenance',
      key: 'maintenance',
    },
  ];

  return (
    <section id="services" className="services">
      <div className="container">
        <h2>Complete Property Maintenance Services</h2>
        <p className="section-subtitle">
          From minor repairs to full-scale renovations, we've got your property
          covered.
        </p>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-image">
                <img
                  src={service.image}
                  alt={`${service.title} - All Structure Maintenance`}
                  loading="lazy"
                />
              </div>
              <div className="service-content">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to={service.link} state={{ serviceKey: service.key }} className="service-btn">
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
