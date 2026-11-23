import { BRAND, CONTACT, SERVICES_WHEEL, SOCIALS } from './portfolioData.js';

const url = new URL('/', BRAND.siteUrl).href;
const organizationId = url + '#organization';
const title = 'Vignesh Growth Lab | POS, Websites & Business Automation';
const description = 'Vignesh Growth Lab builds retail and restaurant billing, ERP, CRM, websites, Android apps and WhatsApp automation from Pollachi, Tamil Nadu.';
const logo = new URL('/brand/vgl-logo.png', url).href;

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@id': organizationId,
      '@type': ['Organization', 'LocalBusiness'],
      name: BRAND.name,
      url,
      logo,
      slogan: BRAND.tagline,
      telephone: CONTACT.phoneHref.replace('tel:', ''),
      email: CONTACT.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Pollachi',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'IN',
      },
      areaServed: { '@type': 'Country', name: 'India' },
      sameAs: [SOCIALS.instagram],
    },
    {
      '@id': url + '#website',
      '@type': 'WebSite',
      url,
      name: BRAND.name,
      inLanguage: 'en',
      publisher: { '@id': organizationId },
    },
    ...SERVICES_WHEEL.map(({ title: name, desc: description, slug }) => ({
      '@id': url + '#service-' + slug,
      '@type': 'Service',
      name,
      description,
      url: url + '#service-' + slug,
      provider: { '@id': organizationId },
    })),
  ],
};

export function homepageHead() {
  const meta = (attribute, key, content) => ({
    tag: 'meta',
    attrs: { [attribute]: key, content },
    injectTo: 'head',
  });
  return [
    { tag: 'title', children: title, injectTo: 'head' },
    { tag: 'link', attrs: { rel: 'canonical', href: url }, injectTo: 'head' },
    meta('name', 'description', description),
    meta('property', 'og:type', 'website'),
    meta('property', 'og:site_name', BRAND.name),
    meta('property', 'og:locale', 'en_IN'),
    meta('property', 'og:url', url),
    meta('property', 'og:title', title),
    meta('property', 'og:description', description),
    meta('property', 'og:image', logo),
    meta('property', 'og:image:alt', BRAND.name + ' logo'),
    meta('name', 'twitter:card', 'summary'),
    meta('name', 'twitter:title', title),
    meta('name', 'twitter:description', description),
    meta('name', 'twitter:image', logo),
    meta('name', 'twitter:image:alt', BRAND.name + ' logo'),
    {
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      children: JSON.stringify(schema).replaceAll('<', '\\u003c'),
      injectTo: 'head',
    },
  ];
}
