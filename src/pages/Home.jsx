import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SocialProof from '../components/SocialProof';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import WhyChooseUs from '../components/WhyChooseUs';
import Contact from '../components/Contact';
import { GOOGLE_REVIEW_URL } from '../config/business';
import usePageMetadata from '../hooks/usePageMetadata';

const SITE_URL = 'https://allstructuremaintenance.com';

const Home = () => {
  const highlightServices = [
    {
      title: 'Kitchen Remodeling & Bathroom Renovations',
      description: 'Design-build upgrades with custom cabinetry, tile, and fixtures tailored to your lifestyle.',
      link: '/services/remodeling',
    },
    {
      title: 'Emergency Water Damage Restoration in Meriden',
      description: 'Emergency dry-out, remediation, and structural repairs handled by licensed pros.',
      link: '/services/restoration',
    },
    {
      title: 'Property Maintenance Services Near Me',
      description: 'Seasonal upkeep and preventative inspections for peace of mind.',
      link: '/services/maintenance',
    },
    {
      title: 'Painting Contractor for Interior & Exterior Projects',
      description: 'Flawless finishes, drywall repair, and color consultations for homes and commercial spaces.',
      link: '/services/painting',
    },
  ];

  usePageMetadata({
    title: 'General Contractor Meriden CT | All Structure Maintenance',
    description:
      'All Structure Maintenance is a licensed general contractor serving Meriden, Wallingford, Cheshire, Southington, and Wolcott, CT. We deliver kitchen remodeling, bathroom renovations, painting, water damage restoration, and property maintenance.',
    keywords: [
      'general contractor meriden ct',
      'kitchen remodeling connecticut',
      'bathroom renovation meriden ct',
      'property maintenance cheshire ct',
      'water damage restoration meriden',
      'painting contractor connecticut',
    ],
    canonicalPath: '/',
    openGraph: {
      title: 'All Structure Maintenance | General Contractor in Meriden, CT',
      description:
        'Licensed and insured Connecticut contractors providing remodeling, restoration, painting, tile, and property maintenance.',
      type: 'website',
      image: `${SITE_URL}/images/kitchen-after.jpg`,
    },
    structuredData: [
      {
        id: 'local-business',
        data: {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'All Structure Maintenance',
          description:
            'Licensed general contractor providing remodeling, restoration, painting, tile, and property maintenance in Meriden, Connecticut.',
          url: SITE_URL,
          telephone: '+1-203-233-3862',
          areaServed: [
            { '@type': 'City', name: 'Meriden, CT' },
            { '@type': 'City', name: 'Wallingford, CT' },
            { '@type': 'City', name: 'Cheshire, CT' },
            { '@type': 'City', name: 'Middletown, CT' },
            { '@type': 'City', name: 'Southington, CT' },
            { '@type': 'City', name: 'Wolcott, CT' },
          ],
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Meriden',
            addressRegion: 'CT',
            addressCountry: 'US',
          },
          sameAs: [
            'https://www.facebook.com/people/All-Structure-Maintenance/100063566413883/',
          ],
        },
      },
    ],
  });

  return (
    <>
      <Hero />
      <SocialProof />
      <Services />
      <Portfolio />
      <WhyChooseUs />
      <section className="home-review">
        <div className="container">
          <h2>Love Your Project? Share Your Experience</h2>
          <p>
            Reviews help other Connecticut homeowners discover a licensed, locally trusted general contractor. If we recently completed work for you—whether it was kitchen remodeling, emergency restoration, or property maintenance—please take a moment to leave feedback on Google.
          </p>
          <a
            className="cta-primary"
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            ⭐ Leave a Google Review
          </a>
        </div>
      </section>
      <section className="home-seo">
        <div className="container">
          <div className="home-seo-intro">
            <h2>Meriden&apos;s Trusted General Contractor for Remodeling &amp; Restoration</h2>
            <p>
              When you search for a general contractor in Meriden, CT, you want a partner who can manage every detail—from design consultations and permitting to the final cleanup. All Structure Maintenance brings licensed expertise to kitchen remodeling across central Connecticut, bathroom renovation projects in Meriden, and emergency water damage restoration for nearby New Haven-area homeowners. Our crew responds quickly, communicates clearly, and documents every milestone so you always know what is happening inside your property.
            </p>
            <p>
              We support busy homeowners, landlords, and commercial property managers with preventive maintenance plans, interior and exterior painting, and custom tile installations. Explore our most popular services:
            </p>
          </div>
          <div className="home-seo-grid">
            {highlightServices.map((service) => (
              <div key={service.title} className="home-seo-card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to={service.link} className="cta-text-link">
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
          <div className="home-seo-cta">
            <p>
              Need guidance on permits or inspections? Review the{' '}
              <a
                href="https://www.meridenct.gov/government/departments/building/"
                target="_blank"
                rel="noopener noreferrer"
              >
                City of Meriden Building Department resources
              </a>{' '}
              and let our team coordinate the paperwork while you focus on design decisions and daily life.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="cta-primary">Request a Free Estimate</Link>
              <a href="tel:2032333862" className="cta-secondary">Call 203.233.3862</a>
            </div>
          </div>
        </div>
      </section>
      <Contact />
    </>
  );
};

export default Home;



