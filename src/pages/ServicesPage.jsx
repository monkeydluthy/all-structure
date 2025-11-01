import React from 'react';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  const services = [
    {
      icon: '🏠',
      title: 'Full Restoration & Repairs',
      description:
        'Complete property restoration from water damage, fire damage, and general wear. We bring your property back to its original condition.',
      image: '/images/restore.jpg',
      link: '/services/restoration',
      key: 'restoration',
      features: [
        'Water Damage Restoration',
        'Fire Damage Restoration',
        'Storm Damage Repair',
        'Mold Remediation',
        '24/7 Emergency Response',
      ],
    },
    {
      icon: '🔧',
      title: 'Remodeling & Renovations',
      description:
        'Transform your space with our expert remodeling services. Kitchens, bathrooms, basements, and whole-home renovations.',
      image: '/images/remodel.jpg',
      link: '/services/remodeling',
      key: 'remodeling',
      features: [
        'Kitchen Remodeling',
        'Bathroom Renovations',
        'Basement Finishing',
        'Room Additions',
        'Custom Design Services',
      ],
    },
    {
      icon: '🏠',
      title: 'Roof Repair & Gutter Cleaning',
      description:
        'Expert roof repairs, gutter cleaning, and maintenance to protect your property from the elements.',
      image: '/images/roof.JPEG',
      link: '/services/roofing',
      key: 'roofing',
      features: [
        'Roof Repair & Replacement',
        'Gutter Cleaning & Installation',
        'Leak Detection & Repair',
        'Ice Dam Removal',
        'Emergency Roof Repairs',
      ],
    },
    {
      icon: '🎨',
      title: 'Painting & Sheetrock',
      description:
        'Professional interior and exterior painting, sheetrock installation, and drywall repairs.',
      image: '/images/sheetrock.JPG',
      link: '/services/painting',
      key: 'painting',
      features: [
        'Interior & Exterior Painting',
        'Sheetrock Installation',
        'Drywall Repair',
        'Texture Application',
        'Color Consultation',
      ],
    },
    {
      icon: '🔲',
      title: 'Tile Installation',
      description:
        'Beautiful tile work for bathrooms, kitchens, and floors. Custom designs and expert installation.',
      image: '/images/tile.jpg',
      link: '/services/tile',
      key: 'tile',
      features: [
        'Bathroom Tile Work',
        'Kitchen Tile Installation',
        'Floor Tile Installation',
        'Custom Tile Designs',
        'Grout Repair & Sealing',
      ],
    },
    {
      icon: '⚙️',
      title: 'Property Maintenance',
      description:
        'Regular maintenance services to keep your property in perfect condition year-round.',
      image: '/images/lawn.jpg',
      link: '/services/maintenance',
      key: 'maintenance',
      features: [
        'Seasonal Maintenance',
        'Preventative Maintenance',
        'HVAC Maintenance',
        'Plumbing Maintenance',
        'Electrical Maintenance',
      ],
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p className="services-hero-description">
            Comprehensive property care solutions tailored to your needs. From emergency repairs to complete renovations, we've got you covered.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-list">
        <div className="container">
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card-large">
                <div className="service-image-large">
                  <img
                    src={service.image}
                    alt={`${service.title} - All Structure Maintenance`}
                  />
                </div>
                <div className="service-content-large">
                  <div className="service-icon-large">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  
                  <ul className="service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>✓ {feature}</li>
                    ))}
                  </ul>

                  <Link
                    to={service.link}
                    state={{ serviceKey: service.key }}
                    className="service-btn"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;

