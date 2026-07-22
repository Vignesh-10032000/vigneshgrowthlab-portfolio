import { CONTACT, SOCIALS, DOCUMENTS, BRAND } from '~/data/vgl/site';

export interface NavLink {
  text: string;
  href: string;
  /** Key matched against the current page to set aria-current="page". */
  activeKey?: 'about' | 'services' | 'projects' | 'contact';
  external?: boolean;
}

/**
 * Header order is fixed by the approved design:
 * About, Services, Clients (/#clients), Projects, Why VGL (/#why-vgl), Resume.
 * There is intentionally NO Contact link in the header — Contact is reached
 * via the WhatsApp CTA and the footer.
 */
export const headerLinks: NavLink[] = [
  { text: 'About', href: '/about', activeKey: 'about' },
  { text: 'Services', href: '/services', activeKey: 'services' },
  { text: 'Clients', href: '/#clients' },
  { text: 'Projects', href: '/projects', activeKey: 'projects' },
  { text: 'Why VGL', href: '/#why-vgl' },
  { text: 'Resume', href: DOCUMENTS.resume, external: true },
];

export const footerExploreLinks: NavLink[] = [
  { text: 'About', href: '/about' },
  { text: 'Services', href: '/services' },
  { text: 'Projects', href: '/projects' },
  { text: 'Why VGL', href: '/#why-vgl' },
  { text: 'Contact', href: '/contact' },
  { text: 'Resume', href: DOCUMENTS.resume, external: true },
];

export const footerContact = {
  whatsappDisplay: `WhatsApp: ${CONTACT.phoneDisplay}`,
  phoneDisplay: CONTACT.phoneDisplay,
  phoneHref: CONTACT.phoneHref,
  email: CONTACT.email,
  location: CONTACT.location,
  msmeCertificate: DOCUMENTS.msmeCertificate,
};

export const footerSocials = SOCIALS;

export const footerBrand = BRAND;
