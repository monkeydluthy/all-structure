import React, { useMemo } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import Contact from '../components/Contact';
import usePageMetadata from '../hooks/usePageMetadata';
import { servicesByKey, servicesList } from '../data/services';

const SITE_URL = 'https://all-structure-maintenance.netlify.app';

const ServicePage = () => {
  const { serviceKey: paramKey } = useParams();
  const location = useLocation();
  const stateKey = location.state?.serviceKey;
  const key = (paramKey || stateKey || 'restoration').toLowerCase();
  const service = servicesByKey[key] || servicesByKey.restoration;

  const relatedServices = useMemo(
    () => servicesList.filter((item) => item.key !== service.key).slice(0, 3),
    [service.key]
  );

  const structuredData = useMemo(
    () => [
      {
        id: `service-${service.slug}`,
        data: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.heroHeading,
          description: service.metaDescription,
          areaServed: service.serviceAreas.map((city) => ({
            '@type': 'City',
            name: city,
          })),
          provider: {
            '@type': 'LocalBusiness',
            name: 'All Structure Maintenance',
            telephone: '+1-203-233-3862',
            url: SITE_URL,
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Meriden',
              addressRegion: 'CT',
              addressCountry: 'US',
            },
          },
          serviceType: service.listTitle,
        },
      },
      {
        id: `faq-${service.slug}`,
        data: {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: service.faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        },
      },
    ],
    [service]
  );

  usePageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    canonicalPath: `/services/${service.slug}`,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      type: 'article',
      image: `${SITE_URL}${service.heroImage}`,
      url: `${SITE_URL}/services/${service.slug}`,
    },
    structuredData,
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="service-hero">
        <div className="container">
          <div className="service-hero-content">
            <div className="service-hero-text">
              <div className="service-icon-large">{service.icon}</div>
              <h1>{service.heroHeading}</h1>
              <p className="service-hero-description">
                {service.overview}
              </p>
              <p>
                As licensed general contractors serving {service.serviceAreas[0]} and nearby Connecticut towns, we manage every stage—from planning and permits to the final walkthrough—so you can enjoy stress-free results. Whether you need {service.primaryKeyword.toLowerCase()} or want to explore related upgrades, our team delivers craftsmanship backed by warranties and real local references.
              </p>
              <div className="service-cta-buttons">
                <a href="#contact-section" className="cta-primary">
                  📞 Get Free Estimate
                </a>
                <a href="tel:2032333862" className="cta-secondary">
                  Call 203.233.3862
                </a>
              </div>
              {service.externalResource && (
                <p className="service-external-resource">
                  Stay informed: review the latest guidelines from{' '}
                  <a href={service.externalResource.url} target="_blank" rel="noopener noreferrer">
                    {service.externalResource.label}
                  </a>{' '}
                  to ensure your project meets Connecticut standards.
                </p>
              )}
            </div>
            <div className="service-hero-image">
              <img
                src={service.heroImage}
                alt={`${service.heroHeading} by All Structure Maintenance`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Offerings */}
      <section className="service-details">
        <div className="container">
          <h2>What&apos;s Included in Our {service.listTitle}</h2>
          <div className="service-details-grid">
            {service.services.map((item) => (
              <div key={item.title} className="service-detail-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="service-areas">
        <div className="container">
          <h2>Service Areas Across Connecticut</h2>
          <p>
            We regularly perform {service.primaryKeyword.toLowerCase()} projects in:
          </p>
          <ul className="service-areas-list">
            {service.serviceAreas.map((area) => (
              <li key={area}>📍 {area}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process Section */}
      <section className="service-process">
        <div className="container">
          <h2>How Our Process Works</h2>
          <div className="process-steps">
            {service.process.map((step, index) => (
              <div key={step.text} className="process-step">
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
          <h2>Why Connecticut Clients Trust Us</h2>
          <div className="benefits-grid">
            {service.benefits.map((benefit) => (
              <div key={benefit} className="benefit-item">
                <span className="benefit-check">✅</span>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="service-faq">
        <div className="container">
          <h2>{service.listTitle} FAQs</h2>
          <div className="faq-grid">
            {service.faq.map((item) => (
              <div key={item.question} className="faq-item">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="service-related">
        <div className="container">
          <h2>Related Services You May Need</h2>
          <div className="related-services-grid">
            {relatedServices.map((item) => (
              <div key={item.key} className="related-service-card">
                <div className="related-service-icon">{item.icon}</div>
                <h3>{item.listTitle}</h3>
                <p>{item.cardDescription}</p>
                <Link to={`/services/${item.slug}`} className="service-btn">
                  Explore {item.listTitle} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="service-cta">
        <div className="container">
          <h2>Let&apos;s Plan Your Next Project</h2>
          <p>{service.ctaBlurb}</p>
          <div className="cta-buttons">
            <a href="tel:2032333862" className="cta-primary">📞 Call 203.233.3862</a>
            <Link to="/contact" className="cta-secondary">Request a Detailed Estimate</Link>
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

