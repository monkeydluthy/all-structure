import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SocialProof from '../components/SocialProof';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import WhyChooseUs from '../components/WhyChooseUs';
import Contact from '../components/Contact';
import usePageMetadata from '../hooks/usePageMetadata';

const SITE_URL = 'https://all-structure-maintenance.netlify.app';

const Home = () => {
  usePageMetadata({
    title: 'General Contractor Meriden CT | All Structure Maintenance',
    description:
      'All Structure Maintenance is a licensed general contractor serving Meriden, Wallingford, and Cheshire, CT. We deliver kitchen remodeling, bathroom renovations, roofing, painting, water damage restoration, and property maintenance.',
    keywords: [
      'general contractor meriden ct',
      'kitchen remodeling connecticut',
      'bathroom renovation meriden ct',
      'roofing contractor wallingford ct',
      'property maintenance cheshire ct',
      'water damage restoration meriden',
      'painting contractor connecticut',
    ],
    canonicalPath: '/',
    openGraph: {
      title: 'All Structure Maintenance | General Contractor in Meriden, CT',
      description:
        'Licensed and insured Connecticut contractors providing remodeling, restoration, roofing, painting, tile, and property maintenance.',
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
            'Licensed general contractor providing remodeling, restoration, roofing, painting, tile, and property maintenance in Meriden, Connecticut.',
          url: SITE_URL,
          telephone: '+1-203-233-3862',
          areaServed: [
            { '@type': 'City', name: 'Meriden, CT' },
            { '@type': 'City', name: 'Wallingford, CT' },
            { '@type': 'City', name: 'Cheshire, CT' },
            { '@type': 'City', name: 'Middletown, CT' },
            { '@type': 'City', name: 'Southington, CT' },
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
            href="https://www.google.com/search?q=all+structure+maintenance&oq=all+structure+maintenance&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MggIARAAGBYYHjINCAIQABiGAxiABBiKBTINCAMQABiGAxiABBiKBTIKCAQQABiABBiiBDIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBCDMwNDNqMGo0qAIBsAIB8QWX_cOS5lrdKQ&sourceid=chrome&ie=UTF-8#lrd=0x81581fb96d39545:0x28e82c0a03449e84,3,,,,"
            target="_blank"
            rel="noopener noreferrer"
          >
            ⭐ Leave a Google Review
          </a>
        </div>
      </section>
      <section className="home-seo">
        <div className="container">
          <h2>Meriden&apos;s Trusted General Contractor for Remodeling &amp; Restoration</h2>
          <p>
            When you search for a general contractor in Meriden, CT, you want a partner who can manage every detail—from design consultations and permitting to the final cleanup. All Structure Maintenance brings licensed expertise to kitchen remodeling across Connecticut, bathroom renovation projects in Meriden, and emergency water damage restoration for New Haven County homeowners. Our crew responds quickly, communicates clearly, and documents every milestone so you always know what is happening inside your property.
          </p>
          <p>
            We support busy homeowners, landlords, and commercial property managers with preventive maintenance plans, emergency roof repairs, interior and exterior painting, and custom tile installations. Explore our most popular services:
          </p>
          <ul className="home-seo-links">
            <li><Link to="/services/remodeling">Kitchen Remodeling &amp; Bathroom Renovations</Link></li>
            <li><Link to="/services/restoration">24/7 Water Damage Restoration in Meriden</Link></li>
            <li><Link to="/services/roofing">Roofing Contractor Serving Wallingford &amp; Meriden</Link></li>
            <li><Link to="/services/maintenance">Property Maintenance Services Near Me</Link></li>
            <li><Link to="/services/painting">Painting Contractor for Interior &amp; Exterior Projects</Link></li>
          </ul>
          <p>
            Need guidance on permits or inspections? Review the{' '}
            <a
              href="https://www.meridenct.gov/government/departments/building/"
              target="_blank"
              rel="noopener noreferrer"
            >
              City of Meriden Building Department resources
            </a>{' '}
            and let our team coordinate the paperwork while you focus on design decisions and daily life. When you are ready, contact us for a no-obligation estimate or call <a href="tel:2032333862">203.233.3862</a> to speak with a project specialist.
          </p>
        </div>
      </section>
      <Contact />
    </>
  );
};

export default Home;



