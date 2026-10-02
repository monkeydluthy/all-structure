export { trackEvent } from '../lib/analytics';
import { trackEvent } from '../lib/analytics';

export const trackCTAClick = (ctaName) => {
  trackEvent('cta_click', {
    event_category: 'Conversion',
    event_label: ctaName,
    value: 1,
  });
};
