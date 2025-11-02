// Google Analytics helper functions

export const trackEvent = (eventName, eventParameters = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventParameters);
  }
};

// Track form submissions
export const trackFormSubmit = (formType, service = '') => {
  trackEvent('form_submit', {
    event_category: 'Contact',
    event_label: formType,
    service: service,
    value: 1,
  });
};

// Track phone calls
export const trackPhoneCall = (phoneNumber = '203.233.3862') => {
  trackEvent('phone_click', {
    event_category: 'Contact',
    event_label: 'Phone Call',
    phone_number: phoneNumber,
    value: 1,
  });
};

// Track email clicks
export const trackEmailClick = (email = '') => {
  trackEvent('email_click', {
    event_category: 'Contact',
    event_label: 'Email Click',
    email: email,
    value: 1,
  });
};

// Track CTA clicks
export const trackCTAClick = (ctaName) => {
  trackEvent('cta_click', {
    event_category: 'Conversion',
    event_label: ctaName,
    value: 1,
  });
};

// Track service interest
export const trackServiceInterest = (service) => {
  trackEvent('service_interest', {
    event_category: 'Service',
    event_label: service,
    value: 1,
  });
};

// Track page views
export const trackPageView = (pagePath) => {
  if (window.gtag) {
    window.gtag('config', 'G-Z0Q9V5RXYS', {
      page_path: pagePath,
    });
  }
};

