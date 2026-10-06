import React from 'react';
import { GOOGLE_REVIEW_URL, yearsOfExperience } from '../config/business';

const SocialProof = () => {
  const testimonials = [
    {
      name: 'Noah H.',
      text: 'Steve was super friendly, easy to talk to, quick, and efficient with his work. And for the first time in what feels like forever we actually had a contractor show up on time!',
      rating: 5,
    },
    {
      name: 'Cheryl E.',
      text: "Steve has done work for me before - always courteous, skilled and does a great job. Reasonable prices and cleans up after the work is done. He is prompt in his replies, and doesn't take forever to get back to you like others. Dependable - He shows up when he says he will, unlike others.",
      rating: 5,
    },
    {
      name: 'Kristen C.',
      text: 'All structure maintenance remodeled my kitchen and did a phenomenal job. Very professional, clean, attentive. Highly recommend',
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
              </div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <a
            className="cta-text-link"
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more reviews on Google
          </a>
        </p>
        <div className="trust-badges">
          <div className="badge">
            🛡️ <span>Licensed & Insured</span>
          </div>
          <div className="badge">
            🏆 <span>{yearsOfExperience()}+ Years Experience</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
