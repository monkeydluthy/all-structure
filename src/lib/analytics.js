const MEASUREMENT_ID = 'G-Z0Q9V5RXYS';
const PRODUCTION_HOST = 'allstructuremaintenance.com';

const CLICK_EVENTS = {
  tel: 'phone_click',
  sms: 'sms_click',
  mailto: 'email_click',
};

let contactLinksListening = false;
let lastPagePath = null;

export function trackEvent(eventName, params = {}) {
  if (
    typeof window === 'undefined' ||
    window.location.hostname !== PRODUCTION_HOST ||
    typeof window.gtag !== 'function'
  ) {
    return;
  }

  window.gtag('event', eventName, params);
}

export function trackGenerateLead({ formLocation, serviceSelected }) {
  trackEvent('generate_lead', {
    form_location: formLocation,
    service_selected: serviceSelected || '',
    page_path: window.location.pathname,
  });
}

export function formLocationFromPath(pathname = window.location.pathname) {
  if (pathname === '/contact') return 'contact_page';
  if (pathname.startsWith('/services')) return 'service_page';
  return 'home_contact';
}

function classListOf(element) {
  const className = element?.className;
  if (typeof className !== 'string') return [];
  return className.split(/\s+/).filter(Boolean);
}

export function resolveLinkLocation(anchor) {
  const explicit = anchor.closest('[data-track-location]');
  const explicitValue = explicit?.getAttribute('data-track-location');
  if (explicitValue) return explicitValue;

  if (anchor.closest('header')) return 'header';
  if (anchor.closest('footer')) return 'footer';

  const section = anchor.closest('section');
  const classes = classListOf(section);
  const path = window.location.pathname;

  if (classes.includes('contact-hero')) return 'contact_page';
  if (classes.includes('hero')) return 'hero';
  if (section?.id === 'contact' || classes.includes('contact')) {
    if (path.startsWith('/services')) return 'service_page';
    if (path.startsWith('/contact')) return 'contact_page';
    return 'home_contact';
  }
  if (classes.includes('services-cta') || classes.includes('services-hero')) {
    return path.startsWith('/services/') ? 'service_page' : 'services_page';
  }
  if (classes.includes('home-seo') || classes.includes('home-review')) return 'home';
  if (classes.some((name) => name.startsWith('about'))) return 'about_page';
  if (classes.some((name) => name.includes('why-choose') || name.includes('whychoose'))) {
    return 'why_choose_us';
  }

  if (path.startsWith('/services/')) return 'service_page';
  if (path === '/services') return 'services_page';
  if (path === '/about') return 'about_page';
  if (path === '/contact') return 'contact_page';
  if (path === '/') return 'home';
  return 'page';
}

export function initContactLinkTracking() {
  if (contactLinksListening || typeof document === 'undefined') {
    return () => {};
  }

  contactLinksListening = true;

  const onClick = (event) => {
    const anchor = event.target?.closest?.('a[href]');
    if (!anchor) return;

    const href = anchor.getAttribute('href') || '';
    const scheme = href.split(':')[0].toLowerCase();
    const eventName = CLICK_EVENTS[scheme];
    if (!eventName) return;

    trackEvent(eventName, {
      link_location: resolveLinkLocation(anchor),
      page_path: window.location.pathname,
    });
  };

  document.addEventListener('click', onClick);

  return () => {
    document.removeEventListener('click', onClick);
    contactLinksListening = false;
  };
}

// Landing page_view already comes from the gtag config in index.html.
// Subsequent client-side route changes need their own page_view.
export function trackRouteChange(pathname) {
  if (lastPagePath === pathname) return;
  const isInitialLoad = lastPagePath === null;
  lastPagePath = pathname;
  if (isInitialLoad) return;

  trackEvent('page_view', {
    page_path: pathname,
    page_location: `${window.location.origin}${pathname}`,
    page_title: document.title,
    send_to: MEASUREMENT_ID,
  });
}
