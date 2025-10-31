import React from 'react';

const SocialProof = () => {
  const testimonials = [
    {
      name: 'Sarah M.',
      location: 'Meriden, CT',
      text: 'All Structure Maintenance transformed our kitchen completely. Professional, on-time, and the quality exceeded our expectations.',
      rating: 5,
    },
    {
      name: 'Mike R.',
      location: 'Wallingford, CT',
      text: 'Outstanding roof repair service. They fixed our leak quickly and the work has held up perfectly for years.',
      rating: 5,
    },
    {
      name: 'Jennifer L.',
      location: 'Southington, CT',
      text: "Reliable, honest, and fair pricing. They've been maintaining our property for 3 years and we couldn't be happier.",
      rating: 5,
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < rating ? '#fbbf24' : '#e5e7eb' }}>
        ★
      </span>
    ));
  };

  return (
    <section className="social-proof">
      <div className="container">
        <h2>Trusted by Connecticut Homeowners</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial">
              <div className="stars">{renderStars(testimonial.rating)}</div>
              <p>"{testimonial.text}"</p>
              <div className="testimonial-author">
                <strong>{testimonial.name}</strong>
                <span>{testimonial.location}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="trust-badges">
          <div className="badge">
            🛡️ <span>Licensed & Insured</span>
          </div>
          <div className="badge">
            🏆 <span>7+ Years Experience</span>
          </div>
          <div className="badge">
            👥 <span>100% Satisfaction</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
