import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PortfolioPage from './pages/PortfolioPage';
import ServicePage from './pages/ServicePage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/services/restoration" element={<ServicePage />} />
        <Route path="/services/remodeling" element={<ServicePage />} />
        <Route path="/services/roofing" element={<ServicePage />} />
        <Route path="/services/painting" element={<ServicePage />} />
        <Route path="/services/tile" element={<ServicePage />} />
        <Route path="/services/maintenance" element={<ServicePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
