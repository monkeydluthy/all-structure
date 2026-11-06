// Redirects that must happen before the Netlify Prerender extension sees the
// request. _redirects rules are applied after prerendering, so for bots the
// old-host rule produced a broken URL and /services/roofing returned a 200.
// The matching rules in public/_redirects stay as a fallback.

const OLD_HOST = 'all-structure-maintenance.netlify.app';
const CANONICAL_ORIGIN = 'https://allstructuremaintenance.com';
const ROOFING_PATH = /^\/services\/roofing\/?$/;

export default async (request, context) => {
  const url = new URL(request.url);

  // Exact host match only. Deploy previews and branch deploys use
  // <prefix>--all-structure-maintenance.netlify.app and pass through.
  if (url.hostname.toLowerCase() === OLD_HOST) {
    return new Response(null, {
      status: 301,
      headers: { location: `${CANONICAL_ORIGIN}${url.pathname}${url.search}` },
    });
  }

  if (ROOFING_PATH.test(url.pathname)) {
    return new Response(null, {
      status: 301,
      headers: { location: '/services' },
    });
  }

  return context.next();
};
