import { useEffect } from 'react';

const SITE_URL = 'https://all-structure-maintenance.netlify.app';

const upsertMetaTag = (selector, attributes = {}) => {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    document.head.appendChild(tag);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      tag.setAttribute(key, value);
    }
  });

  return tag;
};

const removeExistingStructuredData = (ids) => {
  ids.forEach((id) => {
    const existing = document.getElementById(id);
    if (existing) {
      existing.remove();
    }
  });
};

export const usePageMetadata = ({
  title,
  description,
  keywords,
  canonicalPath,
  structuredData = [],
  openGraph = {},
  twitter = {},
  robots,
} = {}) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      upsertMetaTag('meta[name="description"]', { name: 'description', content: description });
    }

    if (keywords && keywords.length) {
      upsertMetaTag('meta[name="keywords"]', { name: 'keywords', content: keywords.join(', ') });
    }

    if (robots) {
      upsertMetaTag('meta[name="robots"]', { name: 'robots', content: robots });
    }

    const canonicalUrl = canonicalPath ? `${SITE_URL}${canonicalPath}` : undefined;
    if (canonicalUrl) {
      let linkTag = document.head.querySelector('link[rel="canonical"]');
      if (!linkTag) {
        linkTag = document.createElement('link');
        linkTag.setAttribute('rel', 'canonical');
        document.head.appendChild(linkTag);
      }
      linkTag.setAttribute('href', canonicalUrl);
    }

    const ogTitle = openGraph.title || title;
    const ogDescription = openGraph.description || description;
    const ogUrl = openGraph.url || canonicalUrl;

    if (ogTitle) {
      upsertMetaTag('meta[property="og:title"]', { property: 'og:title', content: ogTitle });
    }

    if (ogDescription) {
      upsertMetaTag('meta[property="og:description"]', { property: 'og:description', content: ogDescription });
    }

    if (openGraph.type) {
      upsertMetaTag('meta[property="og:type"]', { property: 'og:type', content: openGraph.type });
    }

    if (ogUrl) {
      upsertMetaTag('meta[property="og:url"]', { property: 'og:url', content: ogUrl });
    }

    if (openGraph.image) {
      upsertMetaTag('meta[property="og:image"]', { property: 'og:image', content: openGraph.image });
    }

    const twitterTitle = twitter.title || ogTitle;
    const twitterDescription = twitter.description || ogDescription;

    if (twitterTitle) {
      upsertMetaTag('meta[name="twitter:title"]', { name: 'twitter:title', content: twitterTitle });
    }

    if (twitterDescription) {
      upsertMetaTag('meta[name="twitter:description"]', { name: 'twitter:description', content: twitterDescription });
    }

    if (twitter.card) {
      upsertMetaTag('meta[name="twitter:card"]', { name: 'twitter:card', content: twitter.card });
    }

    const structuredDataIds = [];
    if (structuredData.length) {
      structuredData.forEach((item, index) => {
        if (!item || !item.data) return;
        const scriptId = item.id || `ld-json-${index}`;
        structuredDataIds.push(scriptId);
        let script = document.getElementById(scriptId);
        if (!script) {
          script = document.createElement('script');
          script.type = 'application/ld+json';
          script.id = scriptId;
          document.head.appendChild(script);
        }
        script.text = JSON.stringify(item.data);
      });
    }

    return () => {
      if (structuredDataIds.length) {
        removeExistingStructuredData(structuredDataIds);
      }
    };
  }, [
    title,
    description,
    keywords?.join(','),
    canonicalPath,
    JSON.stringify(structuredData),
    JSON.stringify(openGraph),
    JSON.stringify(twitter),
    robots,
  ]);
};

export default usePageMetadata;

