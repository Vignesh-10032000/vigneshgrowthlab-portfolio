/**
 * JSON-LD builders. Every absolute URL derives from the configured site URL
 * (src/config.yaml → SITE.site) — the single "siteUrl" source.
 */
import { SITE } from 'astrowind:config';

import { BRAND, CONTACT, FOUNDER, SOCIALS, FAQS } from '~/data/vgl/site';

export const siteUrl = (path = '/'): string => String(new URL(path, SITE.site)).replace(/\/$/, path === '/' ? '/' : '');

const postalAddress = {
  '@type': 'PostalAddress',
  addressLocality: 'Pollachi',
  addressRegion: 'Tamil Nadu',
  addressCountry: 'IN',
};

/** LocalBusiness + ProfessionalService node (homepage). */
export const localBusiness = () => ({
  '@type': ['LocalBusiness', 'ProfessionalService'],
  '@id': `${siteUrl('/')}#business`,
  name: BRAND.name,
  founder: { '@type': 'Person', name: BRAND.founder },
  telephone: `+${CONTACT.whatsappNumber}`,
  email: CONTACT.email,
  address: postalAddress,
  identifier: BRAND.msmeId,
  sameAs: [SOCIALS.linkedin, SOCIALS.github],
  areaServed: 'Tamil Nadu',
  knowsAbout: ['Website Development', 'Custom Software', 'Retail POS', 'WhatsApp AI Automation'],
});

const professionalServiceRef = { '@type': 'ProfessionalService', name: BRAND.name, address: postalAddress };

export const faqPage = () => ({
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
});

export const aboutPage = () => ({
  '@type': 'AboutPage',
  name: `About ${BRAND.founder} — ${BRAND.name}`,
  mainEntity: {
    '@type': 'Person',
    name: BRAND.founder,
    jobTitle: FOUNDER.jobTitle,
    alumniOf: FOUNDER.alumniOf,
    worksFor: professionalServiceRef,
  },
});

export const contactPage = () => ({
  '@type': 'ContactPage',
  name: `Contact — ${BRAND.name}`,
  about: {
    ...professionalServiceRef,
    telephone: `+${CONTACT.whatsappNumber}`,
    email: CONTACT.email,
  },
});

export const collectionPage = (name: string, items: { name: string; path: string }[]) => ({
  '@type': 'CollectionPage',
  name,
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: siteUrl(item.path),
    })),
  },
});

export const breadcrumbList = (crumbs: { name: string; path?: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((crumb, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: crumb.name,
    ...(crumb.path ? { item: siteUrl(crumb.path) } : {}),
  })),
});

export const serviceSchema = (serviceName: string) => ({
  '@type': 'Service',
  name: serviceName,
  provider: professionalServiceRef,
  areaServed: 'Tamil Nadu',
});

export const creativeWork = (client: string) => ({
  '@type': 'CreativeWork',
  name: `${client} — client project`,
  creator: { '@type': 'Organization', name: BRAND.name },
});

/** Wrap one or more nodes into a single JSON-LD graph payload. */
export const jsonLd = (...nodes: object[]): string =>
  JSON.stringify(
    nodes.length === 1
      ? { '@context': 'https://schema.org', ...nodes[0] }
      : { '@context': 'https://schema.org', '@graph': nodes }
  );
