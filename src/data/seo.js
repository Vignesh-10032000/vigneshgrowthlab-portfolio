import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import { pages, servicePath } from './marketingPages.js';
import { BRAND, CONTACT, SERVICES_WHEEL, SOCIALS } from './portfolioData.js';

const url = new URL('/', BRAND.siteUrl).href;
const organizationId = url + '#organization';
const title = 'Vignesh Growth Lab | POS, Websites & Business Automation';
const description = 'Vignesh Growth Lab builds retail and restaurant billing, ERP, CRM, websites, Android apps and WhatsApp automation from Pollachi, Tamil Nadu.';
const logo = new URL('/brand/vgl-logo.png', url).href;

const serviceCanonical = slug => new URL(servicePath(slug === 'pos-billing' ? 'pos-billing-software' : slug), url).href;

const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@id': organizationId,
      '@type': 'Organization',
      name: BRAND.name,
      url,
      logo,
      slogan: BRAND.tagline,
      telephone: CONTACT.phoneHref.replace('tel:', ''),
      email: CONTACT.email,
      areaServed: [
        { '@type': 'Place', name: 'Pollachi, Coimbatore district, Tamil Nadu' },
        { '@type': 'Country', name: 'India' },
      ],
      sameAs: [SOCIALS.instagram, SOCIALS.facebook, SOCIALS.youtube],
      founder: { '@id': url + '#founder' },
    },
    {
      '@id': url + '#website',
      '@type': 'WebSite',
      url,
      name: BRAND.name,
      inLanguage: 'en',
      publisher: { '@id': organizationId },
    },
    { '@id': url + '#founder', '@type': 'Person', name: BRAND.founder, worksFor: { '@id': organizationId } },
    ...SERVICES_WHEEL.map(({ title: name, desc: description, slug }) => ({
      '@id': serviceCanonical(slug) + '#service',
      '@type': 'Service',
      name,
      description,
      url: url + '#service-' + slug,
      provider: { '@id': organizationId },
    })),
  ],
};

export function marketingHead(page) {
  const canonical = page ? new URL(page.path, url).href : url;
  const pageTitle = page ? page.name + ' | ' + BRAND.name : title;
  const summary = page?.intro ?? description;
  const crumbs = [{ name: 'Home', item: url }];
  if (page?.project) crumbs.push({ name: 'Projects', item: url + 'projects/' });
  if (page) crumbs.push({ name: page.name, item: canonical });
  const graph = !page ? homeSchema : {
    '@context': 'https://schema.org',
    '@graph': [
      ...homeSchema['@graph'].filter(node => node['@type'] !== 'Service').map(node =>
        page.path === '/msme/' && node['@id'] === organizationId
          ? { ...node, identifier: { '@type': 'PropertyValue', propertyID: 'Udyam registration', value: BRAND.msmeId } }
          : node),
      { '@id': canonical + '#page', '@type': page.kind === 'portfolio' ? 'CollectionPage' : 'WebPage',
        url: canonical, name: page.name, description: summary, isPartOf: { '@id': url + '#website' },
        breadcrumb: { '@id': canonical + '#breadcrumb' },
        ...(page.kind === 'service' && { mainEntity: { '@id': canonical + '#service' } }),
        ...(page.path === '/msme/' && { mainEntity: { '@id': organizationId } }),
        ...(page.project && { about: { '@id': new URL(servicePath(page.project.service), url).href + '#service' } }),
      },
      { '@type': 'BreadcrumbList', '@id': canonical + '#breadcrumb', itemListElement: crumbs.map((crumb, i) => ({
        '@type': 'ListItem', position: i + 1, ...crumb,
      })) },
      ...(page.kind === 'service' ? [{ '@type': 'Service', '@id': canonical + '#service',
        name: page.name, url: canonical, description: summary, provider: { '@id': organizationId } }] : []),
    ],
  };
  const meta = (attribute, key, content) => ({
    tag: 'meta',
    attrs: { [attribute]: key, content },
    injectTo: 'head',
  });
  return [
    { tag: 'title', children: pageTitle, injectTo: 'head' },
    { tag: 'link', attrs: { rel: 'canonical', href: canonical }, injectTo: 'head' },
    meta('name', 'description', summary),
    meta('property', 'og:type', 'website'),
    meta('property', 'og:site_name', BRAND.name),
    meta('property', 'og:locale', 'en_IN'),
    meta('property', 'og:url', canonical),
    meta('property', 'og:title', pageTitle),
    meta('property', 'og:description', summary),
    meta('property', 'og:image', logo),
    meta('property', 'og:image:alt', BRAND.name + ' logo'),
    meta('name', 'twitter:card', 'summary'),
    meta('name', 'twitter:title', pageTitle),
    meta('name', 'twitter:description', summary),
    meta('name', 'twitter:image', logo),
    meta('name', 'twitter:image:alt', BRAND.name + ' logo'),
    {
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      children: JSON.stringify(graph).replaceAll('<', '\\u003c'),
      injectTo: 'head',
    },
  ].map(({ tag, attrs, children }) => renderToStaticMarkup(createElement(tag,
    tag === 'script' ? { ...attrs, dangerouslySetInnerHTML: { __html: children } } : attrs,
    tag === 'script' ? undefined : children))).join('\n');
}

export function sitemap() {
  const locations = ['/', ...pages.map(page => page.path)].map(path =>
    '  <url><loc>' + new URL(path, url).href + '</loc></url>');
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    locations.join('\n') + '\n</urlset>\n';
}
