import React from 'react';
import { useLocation } from 'react-router-dom';
import Contact from '../components/Contact';

const ServicePage = () => {
  const location = useLocation();
  const serviceData = location.state || {};

  const allServices = {
    restoration: {
      title: 'Full Restoration & Repairs',
      icon: '🏠',
      heroImage: '/images/restore.jpg',
      description: 'Complete property restoration from water damage, fire damage, and general wear.',
      overview: `At All Structure Maintenance, we specialize in comprehensive property restoration and repair services. Whether your property has suffered from water damage, fire damage, or general wear and tear, our team brings it back to its original condition with precision and care.`,
      services: [
        {
          title: 'Water Damage Restoration',
          description: 'Complete drying, sanitization, and restoration after flooding or water leaks.',
        },
        {
          title: 'Fire Damage Restoration',
          description: 'Smoke and soot removal, structural repairs, and complete restoration.',
        },
        {
          title: 'Storm Damage Repair',
          description: 'Roof, siding, and structural repairs after severe weather.',
        },
        {
          title: 'Mold Remediation',
          description: 'Professional mold removal and prevention services.',
        },
        {
          title: 'Structural Repairs',
          description: 'Foundation, framing, and load-bearing wall repairs.',
        },
        {
          title: 'Emergency Response',
          description: '24/7 emergency restoration services for urgent situations.',
        },
      ],
      process: [
        { text: 'Assessment & Inspection', icon: '🔍' },
        { text: 'Detailed Estimate & Planning', icon: '📋' },
        { text: 'Restoration & Repair Work', icon: '🔧' },
        { text: 'Quality Inspection', icon: '✅' },
        { text: 'Final Walkthrough', icon: '🏁' },
      ],
      benefits: [
        'Fully Licensed & Insured',
        'Insurance Claim Assistance',
        'Emergency Response Available',
        'Quality Materials & Workmanship',
        'Satisfaction Guaranteed',
        'Free Estimates',
      ],
    },
    remodeling: {
      title: 'Remodeling & Renovations',
      icon: '🔧',
      heroImage: '/images/remodel.jpg',
      description: 'Transform your space with expert remodeling services.',
      overview: `Transform your space into the home of your dreams with our expert remodeling and renovation services. From complete kitchen transformations to luxury bathroom upgrades, we handle every detail with precision and craftsmanship.`,
      services: [
        {
          title: 'Kitchen Remodeling',
          description: 'Custom cabinets, countertops, appliances, and complete kitchen transformations.',
        },
        {
          title: 'Bathroom Renovations',
          description: 'Modern fixtures, tile work, vanities, and luxury bathroom designs.',
        },
        {
          title: 'Basement Finishing',
          description: 'Transform unfinished basements into living spaces, offices, or entertainment areas.',
        },
        {
          title: 'Room Additions',
          description: 'Home additions including bedrooms, offices, or family rooms.',
        },
        {
          title: 'Whole Home Renovation',
          description: 'Complete home makeovers from top to bottom.',
        },
        {
          title: 'Custom Design Services',
          description: 'Interior design consultation and custom build-outs.',
        },
      ],
      process: [
        { text: 'Design Consultation', icon: '📐' },
        { text: 'Detailed Planning & Permits', icon: '📝' },
        { text: 'Material Selection', icon: '🎨' },
        { text: 'Professional Installation', icon: '🔨' },
        { text: 'Final Inspection & Delivery', icon: '🎉' },
      ],
      benefits: [
        'Custom Design Options',
        'Lifetime Warranty on Workmanship',
        'Energy-Efficient Upgrades',
        'On-Time Project Completion',
        'Increase Your Home Value',
        'Free Consultations',
      ],
    },
    roofing: {
      title: 'Roof Repair & Gutter Cleaning',
      icon: '🏠',
      heroImage: '/images/roof.JPEG',
      description: 'Expert roof repairs and maintenance to protect your property.',
      overview: `Protect your biggest investment with our expert roofing and gutter services. From emergency roof repairs to preventative maintenance, we keep your property safe and dry in all weather conditions.`,
      services: [
        {
          title: 'Roof Repair & Replacement',
          description: 'Complete roof repairs, replacements, and installations for all roof types.',
        },
        {
          title: 'Gutter Cleaning & Installation',
          description: 'Professional gutter cleaning, repair, and seamless gutter installation.',
        },
        {
          title: 'Roof Inspections',
          description: 'Comprehensive roof assessments and damage reports.',
        },
        {
          title: 'Leak Detection & Repair',
          description: 'Find and fix roof leaks before they cause major damage.',
        },
        {
          title: 'Ice Dam Removal',
          description: 'Professional ice dam prevention and removal services.',
        },
        {
          title: 'Emergency Roof Repairs',
          description: '24/7 emergency roof repair for storm and weather damage.',
        },
      ],
      process: [
        { text: 'Inspection & Assessment', icon: '🔎' },
        { text: 'Detailed Estimate', icon: '💰' },
        { text: 'Material Selection', icon: '🏠' },
        { text: 'Professional Installation', icon: '⚙️' },
        { text: 'Final Inspection & Warranty', icon: '🛡️' },
      ],
      benefits: [
        'Licensed Roofing Contractors',
        'All Roof Types Covered',
        'Lifetime Material Warranty',
        'Insurance Claim Assistance',
        'Free Estimates',
        '24/7 Emergency Service',
      ],
    },
    painting: {
      title: 'Painting & Sheetrock',
      icon: '🎨',
      heroImage: '/images/sheetrock.JPG',
      description: 'Professional painting and drywall services.',
      overview: `Transform your space with our professional painting and sheetrock services. We deliver flawless finishes on both interior and exterior surfaces, ensuring your property looks its absolute best.`,
      services: [
        {
          title: 'Interior Painting',
          description: 'Complete interior painting with premium paints and expert technique.',
        },
        {
          title: 'Exterior Painting',
          description: 'Weather-resistant exterior painting that stands the test of time.',
        },
        {
          title: 'Sheetrock Installation',
          description: 'Professional drywall installation and finishing.',
        },
        {
          title: 'Drywall Repair',
          description: 'Patch holes, cracks, and damage with seamless repairs.',
        },
        {
          title: 'Texture Application',
          description: 'Custom textures including knockdown, orange peel, and smooth finishes.',
        },
        {
          title: 'Power Washing Prep',
          description: 'Surface preparation and power washing before painting.',
        },
      ],
      process: [
        { text: 'Color Consultation', icon: '🎨' },
        { text: 'Surface Preparation', icon: '🧹' },
        { text: 'Professional Application', icon: '🖌️' },
        { text: 'Quality Inspection', icon: '👁️' },
        { text: 'Final Touch-ups', icon: '✨' },
      ],
      benefits: [
        'Premium Paint Brands',
        'Clean, Professional Results',
        'Extended Warranty Coverage',
        'Minimal Disruption',
        'Expert Color Matching',
        'Free Color Consultations',
      ],
    },
    tile: {
      title: 'Tile Installation',
      icon: '🔲',
      heroImage: '/images/tile.jpg',
      description: 'Beautiful tile work for bathrooms, kitchens, and floors.',
      overview: `Elevate your space with stunning tile installations. Our expert craftsmen create beautiful, durable tile work that adds value and style to your home or commercial property.`,
      services: [
        {
          title: 'Bathroom Tile Work',
          description: 'Custom shower tiles, backsplashes, and floor installations.',
        },
        {
          title: 'Kitchen Tile Installation',
          description: 'Backsplashes, countertops, and floor tiles for kitchens.',
        },
        {
          title: 'Floor Tile Installation',
          description: 'Ceramic, porcelain, and natural stone floor tiles.',
        },
        {
          title: 'Custom Tile Designs',
          description: 'Mosaic, pattern, and custom tile layouts.',
        },
        {
          title: 'Tile Repair & Restoration',
          description: 'Grout repair, tile replacement, and restoration services.',
        },
        {
          title: 'Commercial Tile Work',
          description: 'Large-scale commercial tile installations.',
        },
      ],
      process: [
        { text: 'Design Consultation', icon: '🎯' },
        { text: 'Material Selection', icon: '🔲' },
        { text: 'Surface Preparation', icon: '📏' },
        { text: 'Precision Installation', icon: '🔧' },
        { text: 'Grouting & Sealing', icon: '💎' },
      ],
      benefits: [
        'Expert Craftsmanship',
        'Premium Tile Options',
        'Custom Design Services',
        'Lifetime Warranty',
        'Professional Grouting',
        'Free Design Consultations',
      ],
    },
    maintenance: {
      title: 'Property Maintenance',
      icon: '⚙️',
      heroImage: '/images/lawn.jpg',
      description: 'Regular maintenance to keep your property in perfect condition.',
      overview: `Maintain your property's value and appearance with our comprehensive maintenance services. From seasonal upkeep to emergency repairs, we keep everything running smoothly.`,
      services: [
        {
          title: 'Seasonal Maintenance',
          description: 'Spring, summer, fall, and winter property care.',
        },
        {
          title: 'Preventative Maintenance',
          description: 'Regular inspections and repairs to prevent major issues.',
        },
        {
          title: 'HVAC Maintenance',
          description: 'Heating and cooling system servicing and repairs.',
        },
        {
          title: 'Plumbing Maintenance',
          description: 'Regular plumbing inspections and repairs.',
        },
        {
          title: 'Electrical Maintenance',
          description: 'Electrical system checks and safety updates.',
        },
        {
          title: 'Facility Management',
          description: 'Complete facility management for commercial properties.',
        },
      ],
      process: [
        { text: 'Property Assessment', icon: '🔍' },
        { text: 'Maintenance Plan Creation', icon: '📋' },
        { text: 'Scheduled Service Visits', icon: '📅' },
        { text: 'Quality Inspections', icon: '✅' },
        { text: 'Ongoing Support', icon: '🔄' },
      ],
      benefits: [
        'Prevent Major Repairs',
        'Save Money Long-term',
        'Maintain Property Value',
        'Peace of Mind',
        'Flexible Scheduling',
        'Priority Service',
      ],
    },
  };

  const service = allServices[serviceData.serviceKey] || allServices.restoration;

  return (
    <div>
      {/* Hero Section */}
      <section className="service-hero">
        <div className="container">
          <div className="service-hero-content">
            <div className="service-hero-text">
              <div className="service-icon-large">{service.icon}</div>
              <h1>{service.title}</h1>
              <p className="service-hero-description">{service.overview}</p>
              <div className="service-cta-buttons">
                <a href="#contact-section" className="cta-primary">
                  📞 Get Free Estimate
                </a>
                <a href="tel:2032333862" className="cta-secondary">
                  Call 203.233.3862
                </a>
              </div>
            </div>
            <div className="service-hero-image">
              <img src={service.heroImage} alt={service.title} />
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="service-details">
        <div className="container">
          <h2>Our {service.title} Services</h2>
          <div className="service-details-grid">
            {service.services.map((item, index) => (
              <div key={index} className="service-detail-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="service-process">
        <div className="container">
          <h2>Our Process</h2>
          <div className="process-steps">
            {service.process.map((step, index) => (
              <div key={index} className="process-step">
                <div className="process-icon">{step.icon}</div>
                <div className="process-number">{index + 1}</div>
                <div className="process-text">{step.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="service-benefits">
        <div className="container">
          <h2>Why Choose All Structure Maintenance</h2>
          <div className="benefits-grid">
            {service.benefits.map((benefit, index) => (
              <div key={index} className="benefit-item">
                <span className="benefit-check">✅</span>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <div id="contact-section">
        <Contact />
      </div>
    </div>
  );
};

export default ServicePage;

