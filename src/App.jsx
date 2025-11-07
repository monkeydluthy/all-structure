import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PortfolioPage from './pages/PortfolioPage';
import ServicesPage from './pages/ServicesPage';
import ServicePage from './pages/ServicePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  // Add class to body for admin pages
  useEffect(() => {
    if (isAdminPage) {
      document.body.classList.add('admin-page');
    } else {
      document.body.classList.remove('admin-page');
    }
  }, [isAdminPage]);

  return (
    <div className="App">
      <ScrollToTop />
      {!isAdminPage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:serviceKey" element={<ServicePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      {!isAdminPage && <Footer />}
    </div>
  );
}

export default App;
