/**
 * VGL site-wide business facts.
 * Source of truth: design-reference/.../uploads/master_prompt_claude_fable.md
 * and the approved .dc.html designs. Do not invent or alter facts here.
 */

export const CONTACT = {
  whatsappNumber: '918220034139',
  phoneDisplay: '+91 82200 34139',
  phoneHref: 'tel:+918220034139',
  email: 'vigneshgrowthlab@gmail.com',
  location: 'Pollachi, Tamil Nadu',
} as const;

export const BRAND = {
  name: 'Vignesh Growth Lab',
  short: 'VGL',
  tagline: 'Build. Automate. Grow.',
  founder: 'Vignesh Prabhu',
  msmeId: 'UDYAM-TN-03-0328658',
  copyright: '© 2026 Vignesh Growth Lab. All rights reserved.',
} as const;

export const SOCIALS = {
  linkedin: 'https://www.linkedin.com/in/vignesh-prabhu-m-06b173253',
  github: 'https://github.com/Vignesh-10032000',
  /** Real Instagram URL not yet supplied — footer icon stays disabled ("coming soon"). */
  instagram: null,
} as const;

export const DOCUMENTS = {
  resume: '/documents/vgl-resume.pdf',
  msmeCertificate: '/documents/udyam-certificate.pdf',
} as const;

/** Client-testimonial media (compressed from the founder-supplied original). */
export const RESERVED_MEDIA = {
  clientTestimonialVideo: '/videos/client-testimonial.mp4',
  clientTestimonialPoster: '/images/client-testimonial-poster.webp',
} as const;

export const TRUST_ITEMS = [
  { icon: 'ph:seal-check', label: 'MSME Registered' },
  { icon: null, label: BRAND.msmeId, badge: true },
  { icon: 'ph:map-pin', label: 'Pollachi, Tamil Nadu' },
  { icon: 'ph:stack', label: '15+ projects delivered' },
  { icon: 'ph:whatsapp-logo', label: 'Direct founder support', whatsapp: true },
] as const;

export const STATS = [
  { value: '15+', label: 'Projects delivered' },
  { value: '8+', label: 'Happy clients' },
  { value: '100%', label: 'Client satisfaction' },
  { value: '72 hrs', label: 'To first online sale' },
  { value: '2 wks', label: 'Average delivery' },
  { value: '250+', label: 'Concurrent users handled' },
] as const;

export const STATS_FOOTNOTE = 'Direct founder support — no middle-men, direct WhatsApp access to Vignesh.';

export interface ProcessStep {
  number: string;
  title: string;
  copy: string;
}

/** Homepage variant (full copy). */
export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Free 30-min strategy call',
    copy: 'Honest advice about what your business actually needs. No sales pitch.',
  },
  { number: '02', title: 'Custom proposal in 24 hours', copy: 'Fixed price, clear scope, no hidden costs.' },
  {
    number: '03',
    title: 'Build starts within 1 week',
    copy: 'Average delivery is about 2 weeks; typical projects run 2–4 weeks depending on scope.',
  },
  {
    number: '04',
    title: 'You own everything',
    copy: '100% ownership of code, hosting and data. No monthly lock-in, no retainers.',
  },
];

/** Compact variant used on /services and service detail pages. */
export const PROCESS_STEPS_COMPACT: ProcessStep[] = [
  { number: '01', title: 'Free 30-min strategy call', copy: 'Honest advice, no sales pitch.' },
  { number: '02', title: 'Proposal in 24 hours', copy: 'Fixed price, no hidden costs.' },
  { number: '03', title: 'Build starts within 1 week', copy: 'Average delivery ≈ 2 weeks; typical range 2–4 weeks.' },
  { number: '04', title: 'You own everything', copy: 'Code, hosting and data — 100% yours.' },
];

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: "Do I own my website after it's built?",
    answer:
      'Yes. 100% ownership — full code, hosting credentials, and domain access transferred to you on delivery. You never need to pay VGL monthly to keep your site running.',
  },
  {
    question: 'What if I need changes after the project?',
    answer:
      'Minor changes are included free for 30 days after delivery. After that, we charge a simple hourly rate. No retainer contracts, no lock-in packages.',
  },
  {
    question: "I'm not technical at all. Will I manage it?",
    answer:
      'Yes. We do a personal handover session where we train you to manage your own website. Most clients handle everything independently after one 30-minute session.',
  },
  {
    question: 'How is VGL different from Fiverr or a random freelancer?',
    answer:
      'We are a Pollachi-based MSME registered business (UDYAM-TN-03-0328658). You can call Vignesh directly on WhatsApp. We have delivered 15+ projects across Tamil Nadu with real testimonials from real local businesses.',
  },
  {
    question: 'Why not just use Wix or build it myself?',
    answer:
      "Wix works for hobby projects. For a business that needs to show up on Google, load fast on mobile, and convert visitors into customers — you need a custom-built site. We also handle things Wix can't: POS software, WhatsApp automation, and AI workflows.",
  },
  {
    question: 'What is your payment structure?',
    answer:
      '50% advance before we start. 50% on delivery after you approve everything. No full upfront payment. No invoice surprises.',
  },
];

export interface ComparisonRow {
  criteria: string;
  vgl: string;
  diy: string;
  agency: string;
  /** Yes/No rows get check/cross icons with visible text. */
  boolean?: boolean;
}

export const COMPARISON_ROWS: ComparisonRow[] = [
  { criteria: 'Starting price', vgl: '₹8,000', diy: '₹0 — but costs your time*', agency: '₹1,00,000' },
  { criteria: 'Tamil Nadu local', vgl: 'Yes', diy: 'No', agency: 'No', boolean: true },
  { criteria: 'Custom built', vgl: 'Yes', diy: 'No', agency: 'Yes', boolean: true },
  { criteria: 'Direct founder WhatsApp access', vgl: 'Yes', diy: 'No', agency: 'No', boolean: true },
  { criteria: 'You own everything', vgl: 'Yes', diy: 'No', agency: 'Yes', boolean: true },
  { criteria: 'MSME registered', vgl: 'Yes', diy: 'No', agency: 'Yes', boolean: true },
  { criteria: 'POS + WhatsApp automation', vgl: 'Yes', diy: 'No', agency: 'No', boolean: true },
  { criteria: 'Delivery time', vgl: '2 weeks', diy: 'You do it', agency: '2 months' },
];

export const COMPARISON_FOOTNOTE =
  '*DIY platforms charge monthly fees forever. You never truly own your site on Wix or Shopify.';

export const COMPARISON_CAPTION = 'An honest comparison: Vignesh Growth Lab vs DIY website builders vs a big agency.';

export interface TechnologyGroup {
  label: string;
  icon: string;
  items: string[];
}

export const TECHNOLOGY_GROUPS: TechnologyGroup[] = [
  {
    label: 'Build',
    icon: 'ph:hammer',
    items: ['WordPress', 'HTML', 'CSS', 'JavaScript', 'Python', 'Flask', 'GitHub', 'API Integrations'],
  },
  {
    label: 'Automation',
    icon: 'ph:robot',
    items: ['n8n', 'Gemini', 'GPT', 'WhatsApp workflows', 'Google Sheets'],
  },
  {
    label: 'Business & creative',
    icon: 'ph:chart-pie-slice',
    items: ['Google Analytics', 'Power BI', 'Canva', 'CapCut'],
  },
];

export interface Credential {
  icon: string;
  title: string;
  linkLabel: string;
  href: string;
  /** MSME card gets accent treatment. */
  highlight?: boolean;
}

export const CREDENTIALS: Credential[] = [
  {
    icon: 'ph:certificate',
    title: 'HackerRank Python Basics',
    linkLabel: 'View certificate',
    href: 'https://drive.google.com/file/d/16yweKSe5cOAkw_veyu8c3a3mMwEmUM_T/view',
  },
  {
    icon: 'ph:cloud',
    title: 'AWS Academy — Cloud Foundations',
    linkLabel: 'View badge on Credly',
    href: 'https://www.credly.com/badges/99a6af1a-42ac-4b88-8692-1933dfb1c63d/public_url',
  },
  {
    icon: 'ph:database',
    title: 'HackerRank SQL Basics',
    linkLabel: 'View certificate',
    href: 'https://www.hackerrank.com/certificates/iframe/7c0d3f9a96ab',
  },
  {
    icon: 'ph:seal-check',
    title: 'MSME / Udyam Registration',
    linkLabel: 'View MSME certificate',
    href: DOCUMENTS.msmeCertificate,
    highlight: true,
  },
];

export const FOUNDER = {
  name: 'Vignesh Prabhu',
  photo: '/images/vignesh.webp',
  photoAlt: 'Vignesh Prabhu, founder of Vignesh Growth Lab',
  photoWidth: 1122,
  photoHeight: 1402,
  bio: 'AI Automation and Business Process Automation Specialist with an MCA from Dr. Mahalingam College of Engineering & Technology. Focused on delivering scalable AI workflows, digital transformation solutions, and client-focused web applications.',
  bioSecondary: 'When you work with VGL, you work with Vignesh directly — from the first strategy call to handover.',
  jobTitle: 'AI Automation and Business Process Automation Specialist',
  alumniOf: 'Dr. Mahalingam College of Engineering & Technology',
} as const;

/** Additional delivered work shown without case studies (Projects page + homepage). */
export const MORE_PROJECTS = [
  {
    name: 'Masala Mill Store',
    type: 'E-Commerce Store',
    location: 'Tamil Nadu',
    copy: 'Full catalog live, actively taking orders.',
  },
  {
    name: 'Albatross Gym',
    type: 'Landing Page',
    location: 'Coimbatore',
    copy: 'High-converting local lead generation page.',
  },
] as const;
