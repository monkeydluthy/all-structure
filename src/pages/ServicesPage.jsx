import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import usePageMetadata from '../hooks/usePageMetadata';
import { servicesList } from '../data/services';
import FaqAccordion from '../components/FaqAccordion';

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

  const popularPages = [
    {
      title: 'Kitchen Remodeling in Connecticut',
      description: 'Full design-build services with custom cabinetry, countertops, and smart storage solutions.',
      link: '/services/remodeling',
    },
    {
      title: 'Water Damage Restoration in Meriden, CT',
      description: '24/7 emergency dry-out, remediation, and rebuilds handled by licensed restoration specialists.',
      link: '/services/restoration',
    },
    {
      title: 'Roofing Contractor near Wallingford, CT',
      description: 'Leak repair, full replacements, and gutter protection to keep your property weather-ready.',
      link: '/services/roofing',
    },
    {
      title: 'Property Maintenance Services in Cheshire, CT',
      description: 'Scheduled upkeep, preventative inspections, and on-call technicians for homeowners and landlords.',
      link: '/services/maintenance',
    },
    {
      title: 'Project Gallery & Before/After Photos',
      description: 'See transformations from recent remodeling, restoration, and maintenance projects across Connecticut.',
      link: '/portfolio',
    },
    {
      title: 'Request a Free Estimate',
      description: 'Share your project goals and receive a detailed roadmap, budget, and timeline from our team.',
      link: '/contact',
    },
  ];

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
          <div className="services-overview-intro">
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
          </div>
          <div className="services-overview-grid">
            {popularPages.map((page) => (
              <div key={page.title} className="services-overview-card">
                <h3>{page.title}</h3>
                <p>{page.description}</p>
                <Link to={page.link} className="cta-text-link">
                  Learn more →
                </Link>
              </div>
            ))}
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
          <FaqAccordion items={servicesFaq} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <div className="container">
          <div className="services-cta-card">
            <h2>Ready to Work With Meriden’s Trusted Contractors?</h2>
            <p>
              Schedule a consultation to discuss your project goals, timeline, and budget. We’ll provide a detailed estimate and roadmap whether you need kitchen remodeling, bathroom renovations, roofing, painting, tile work, or a custom property maintenance plan.
            </p>
            <div className="cta-buttons">
              <a href="tel:2032333862" className="cta-primary">
                <span aria-hidden="true">📞</span>
                <span>Call 203.233.3862</span>
              </a>
              <Link to="/contact" className="cta-secondary">Book a Free Estimate</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;

