import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import usePageMetadata from '../hooks/usePageMetadata';
import { servicesList } from '../data/services';

const ServicesPage = () => {
  const servicesFaq = useMemo(
    () => [
      {
        question: 'How do I choose the best general contractor near Meriden, CT?',
        answer:
          'Start by confirming Connecticut licensing, adequate insurance coverage, and proven experience with projects similar to yours. All Structure Maintenance is a licensed general contractor based in Meriden that delivers restoration, remodeling, roofing, and property maintenance backed by clear estimates, real client reviews, and photo documentation.',
      },
      {
        question: 'Do I need permits for remodeling projects in Connecticut?',
        answer:
          'Yes. Kitchen remodeling, bathroom renovations, roofing projects, and structural changes usually require permits from your local building department. Our team prepares drawings, submits applications, and schedules inspections across Meriden, Wallingford, and Cheshire so your project stays compliant.',
      },
      {
        question: 'What should I look for in a property maintenance contractor?',
        answer:
          'Select a contractor that offers preventative maintenance schedules, rapid emergency response, and transparent reporting. We build property maintenance plans for Cheshire- and Meriden-area owners that include seasonal tune-ups, on-call repairs, and proactive equipment checks to avoid costly downtime.',
      },
    ],
    []
  );

  usePageMetadata({
    title: 'General Contractor Meriden CT | All Structure Maintenance Services',
    description:
      'Explore remodeling, roofing, restoration, painting, tile, and property maintenance services from All Structure Maintenance—licensed general contractors serving Meriden, Wallingford, and Cheshire, CT.',
    keywords: [
      'general contractor meriden ct',
      'kitchen remodeling connecticut',
      'bathroom renovation meriden ct',
      'roofing contractor wallingford ct',
      'property maintenance cheshire ct',
      'water damage restoration meriden',
      'painting contractor connecticut',
    ],
    canonicalPath: '/services',
    openGraph: {
      title: 'Meriden CT General Contractor Services | All Structure Maintenance',
      description:
        'Licensed general contractor offering remodeling, restoration, roofing, painting, tile, and property maintenance across Connecticut.',
      type: 'website',
    },
    structuredData: [
      {
        id: 'faq-services',
        data: {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: servicesFaq.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        },
      },
    ],
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <h1>General Contractor Services in Meriden, CT</h1>
          <p className="services-hero-description">
            All Structure Maintenance is the go-to general contractor for Meriden, Wallingford, and Cheshire, CT. From kitchen remodeling and bathroom renovations to emergency roof repair and property maintenance programs, our licensed team delivers reliable craftsmanship on every project.
          </p>
        </div>
      </section>

      {/* SEO Overview Section */}
      <section className="services-overview">
        <div className="container">
          <h2>Licensed Remodeling, Restoration, and Maintenance Experts</h2>
          <p>
            As a full-service general contractor in Meriden, CT, we help homeowners and commercial property owners tackle projects of every size. Our specialists manage kitchen remodeling across Connecticut, deliver bathroom renovation upgrades in Meriden, and deploy emergency roof repair teams throughout Wallingford and New Haven County. With proactive property maintenance plans in Cheshire and rapid water damage restoration in Meriden, we keep your property safe, efficient, and beautiful year-round.
          </p>
          <p>
            We follow state guidelines for contractor licensing and permitting. Review the latest requirements from the{' '}
            <a href="https://portal.ct.gov/DCP/License-Services-Division/All-License-Applications/Contractor-Registration" target="_blank" rel="noopener noreferrer">
              Connecticut Department of Consumer Protection
            </a>{' '}
            and lean on our team to handle paperwork, inspections, and scheduling so your project stays on track.
          </p>
          <div className="services-overview-links">
            <strong>Popular Service Pages:</strong>
            <ul>
              <li><Link to="/services/remodeling">Kitchen Remodeling in Connecticut</Link></li>
              <li><Link to="/services/restoration">Water Damage Restoration in Meriden, CT</Link></li>
              <li><Link to="/services/roofing">Roofing Contractor near Wallingford, CT</Link></li>
              <li><Link to="/services/maintenance">Property Maintenance Services in Cheshire, CT</Link></li>
              <li><Link to="/portfolio">Project Gallery &amp; Before/After Photos</Link></li>
              <li><Link to="/contact">Request a Free Estimate</Link></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-list">
        <div className="container">
          <div className="services-grid">
            {servicesList.map((service) => (
              <div key={service.key} className="service-card-large">
                <div className="service-image-large">
                  <img
                    src={service.heroImage}
                    alt={`${service.listTitle} in Connecticut - All Structure Maintenance`}
                  />
                </div>
                <div className="service-content-large">
                  <div className="service-icon-large">{service.icon}</div>
                  <h3>{service.listTitle}</h3>
                  <p className="service-description">{service.cardDescription}</p>

                  <ul className="service-features">
                    {service.services.slice(0, 5).map((feature, idx) => (
                      <li key={idx}>✓ {feature.title}</li>
                    ))}
                  </ul>

                  <Link to={`/services/${service.slug}`} className="service-btn learn-more-btn">
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="services-faq">
        <div className="container">
          <h2>General Contractor FAQs for Connecticut Property Owners</h2>
          <div className="faq-grid">
            {servicesFaq.map((faq) => (
              <div key={faq.question} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <div className="container">
          <h2>Ready to Work With Meriden’s Trusted Contractors?</h2>
          <p>
            Schedule a consultation to discuss your project goals, timeline, and budget. We’ll provide a detailed estimate and roadmap whether you need kitchen remodeling, bathroom renovations, roofing, painting, tile work, or a custom property maintenance plan.
          </p>
          <div className="cta-buttons">
            <a href="tel:2032333862" className="cta-primary">📞 Call 203.233.3862</a>
            <Link to="/contact" className="cta-secondary">Book a Free Estimate</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;

