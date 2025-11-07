import React from 'react';
import usePageMetadata from '../hooks/usePageMetadata';

const TermsPage = () => {
  usePageMetadata({
    title: 'Terms of Service | All Structure Maintenance',
    description: 'Review the terms of service for working with All Structure Maintenance, Meriden CT contractors.',
    canonicalPath: '/terms',
    openGraph: {
      title: 'Terms of Service | All Structure Maintenance',
      description: 'Understand the terms and conditions that apply to All Structure Maintenance projects in Connecticut.',
      type: 'article',
    },
  });
  return (
    <div>
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <h1>Terms of Service</h1>
          <p className="services-hero-description">
            Please read these terms carefully before using our services.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
              <strong>Last Updated:</strong> {new Date().getFullYear()}
            </p>

            <div className="terms-content">
              <h2>1. Agreement to Terms</h2>
              <p style={{ marginBottom: '2rem' }}>
                By accessing or using the services of All Structure Maintenance LLC ("Company", "we", "us", or "our"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
              </p>

              <h2>2. Services</h2>
              <p style={{ marginBottom: '2rem' }}>
                We provide general contracting, property maintenance, repair, and restoration services in Connecticut. All services are subject to availability and our professional assessment of the work required.
              </p>

              <h2>3. Estimates and Quotes</h2>
              <p style={{ marginBottom: '2rem' }}>
                Free estimates are provided for informational purposes and are valid for 30 days. Final pricing may vary based on the actual scope of work, unforeseen conditions, or changes requested by the client. All estimates are non-binding until a written agreement is executed.
              </p>

              <h2>4. Payment Terms</h2>
              <p>
                Payment terms are as follows:
              </p>
              <ul style={{ marginLeft: '2rem', marginBottom: '2rem' }}>
                <li>A deposit may be required before work begins</li>
                <li>Progress payments for large projects as outlined in your agreement</li>
                <li>Final payment due upon completion of work</li>
                <li>Late fees may apply to overdue accounts</li>
                <li>Payment can be made by check, cash, or credit card as specified</li>
              </ul>

              <h2>5. Warranty and Guarantees</h2>
              <p style={{ marginBottom: '2rem' }}>
                We guarantee our workmanship and materials used. Specific warranty terms will be outlined in your service agreement. This warranty does not cover damage caused by misuse, negligence, or normal wear and tear.
              </p>

              <h2>6. Property Damage</h2>
              <p style={{ marginBottom: '2rem' }}>
                While we exercise the utmost care in performing services, we are insured and bonded. Any damages occurring during the course of our work will be addressed in accordance with our insurance coverage and your specific agreement.
              </p>

              <h2>7. Changes and Cancellations</h2>
              <p>
                Work schedules may be subject to change due to weather, material availability, or unforeseen circumstances. You may cancel services with at least 48 hours notice, subject to any applicable cancellation fees outlined in your agreement.
              </p>

              <h2>8. Client Responsibilities</h2>
              <p>
                You agree to:
              </p>
              <ul style={{ marginLeft: '2rem', marginBottom: '2rem' }}>
                <li>Provide accurate information about the property and work required</li>
                <li>Ensure safe access to the work area</li>
                <li>Obtain necessary permits if applicable</li>
                <li>Make timely payments as agreed</li>
              </ul>

              <h2>9. Limitations of Liability</h2>
              <p style={{ marginBottom: '2rem' }}>
                To the maximum extent permitted by law, All Structure Maintenance LLC shall not be liable for indirect, incidental, special, consequential, or punitive damages, including loss of profits, revenue, or use.
              </p>

              <h2>10. License and Insurance</h2>
              <p style={{ marginBottom: '2rem' }}>
                We maintain all required licenses, insurance, and bonding as required by Connecticut law. Certificates of insurance are available upon request.
              </p>

              <h2>11. Disputes</h2>
              <p style={{ marginBottom: '2rem' }}>
                Any disputes arising from our services will be governed by Connecticut law. We encourage clients to contact us directly to resolve any issues before pursuing formal dispute resolution.
              </p>

              <h2>12. Contact Information</h2>
              <p style={{ marginBottom: '2rem' }}>
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div style={{ marginLeft: '2rem', marginBottom: '2rem' }}>
                <p><strong>Email:</strong> AllstructureMainLLC@yahoo.com</p>
                <p><strong>Phone:</strong> 203.233.3862</p>
                <p><strong>Address:</strong> Meriden, CT 06451</p>
              </div>

              <h2>13. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of our services after changes are posted constitutes acceptance of those changes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;

