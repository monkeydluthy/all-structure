import React from 'react';

const PrivacyPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p className="services-hero-description">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
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

            <div className="privacy-content">
              <h2>1. Information We Collect</h2>
              <p>
                We collect information that you provide directly to us, including:
              </p>
              <ul style={{ marginLeft: '2rem', marginBottom: '2rem' }}>
                <li>Name and contact information (email address, phone number)</li>
                <li>Property address and project details</li>
                <li>Payment information for completed services</li>
                <li>Communications and correspondence with us</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul style={{ marginLeft: '2rem', marginBottom: '2rem' }}>
                <li>Provide, maintain, and improve our services</li>
                <li>Process and complete service requests</li>
                <li>Send you confirmations, invoices, and updates</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Send you technical notices and support messages</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2>3. Information Sharing</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul style={{ marginLeft: '2rem', marginBottom: '2rem' }}>
                <li>With service providers who assist us in operating our business</li>
                <li>To comply with legal obligations or protect our rights</li>
                <li>In connection with any merger, sale, or acquisition</li>
                <li>With your explicit consent</li>
              </ul>

              <h2>4. Data Security</h2>
              <p style={{ marginBottom: '2rem' }}>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>

              <h2>5. Cookies and Tracking</h2>
              <p style={{ marginBottom: '2rem' }}>
                Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can control cookie preferences through your browser settings.
              </p>

              <h2>6. Your Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul style={{ marginLeft: '2rem', marginBottom: '2rem' }}>
                <li>Access and receive a copy of your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
              </ul>

              <h2>7. Contact Us</h2>
              <p style={{ marginBottom: '2rem' }}>
                If you have questions about this Privacy Policy, please contact us:
              </p>
              <div style={{ marginLeft: '2rem', marginBottom: '2rem' }}>
                <p><strong>Email:</strong> info@allstructuremaintenance.com</p>
                <p><strong>Phone:</strong> 203.233.3862</p>
                <p><strong>Address:</strong> Meriden, CT 06451</p>
              </div>

              <h2>8. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;

