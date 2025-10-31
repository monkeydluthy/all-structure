import React from 'react';
import Portfolio from '../components/Portfolio';

const PortfolioPage = () => {
  return (
    <>
      <section className="portfolio" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <h2>Project Portfolio</h2>
          <p className="section-subtitle">Before and after results from recent projects</p>
        </div>
      </section>
      <Portfolio />
    </>
  );
};

export default PortfolioPage;



