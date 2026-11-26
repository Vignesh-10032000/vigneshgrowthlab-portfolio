/**
 * Central content module for Vignesh Growth Lab portfolio.
 * Ported from vigneshgrowthlab-portfolio src/data/vgl/* — keep facts exact.
 */

export const CONTACT = {
  whatsappNumber: '918220034139',
  phoneDisplay: '+91 82200 34139',
  phoneHref: 'tel:+918220034139',
  email: 'vigneshgrowthlab@gmail.com',
  location: 'Pollachi, Coimbatore district, Tamil Nadu',
};

export const BRAND = {
  name: 'Vignesh Growth Lab',
  short: 'VGL',
  tagline: 'Build. Automate. Grow.',
  founder: 'Vignesh Prabhu M',
  msmeId: 'UDYAM-TN-03-0328658',
  copyright: '© 2026 Vignesh Growth Lab. All rights reserved.',
  siteUrl: 'https://vigneshgrowthlab.dev',
};

export const SOCIALS = {
  linkedin: 'https://www.linkedin.com/in/vignesh-prabhu-m-06b173253',
  github: 'https://github.com/Vignesh-10032000',
  instagram: 'https://www.instagram.com/vigneshgrowthlab/',
  facebook: 'https://www.facebook.com/vigneshgrowthlab.media/',
  youtube: 'https://www.youtube.com/channel/UCrTHXlg6q3IkQjzJ-nCdWoA',
};



export const FOUNDER = {
  name: 'Vignesh Prabhu M',
  photoAlt: 'Vignesh Prabhu, founder of Vignesh Growth Lab',
  bio: 'AI Automation and Business Process Automation Specialist with an MCA from Dr. Mahalingam College of Engineering & Technology. Focused on delivering scalable AI workflows, digital transformation solutions, and client-focused web applications.',
  bioSecondary:
    'When you work with VGL, you work with Vignesh directly — from the first strategy call to handover.',
  jobTitle: 'AI Automation and Business Process Automation Specialist',
  alumniOf: 'Dr. Mahalingam College of Engineering & Technology',
};

export const HERO = {
  badge: 'VIGNESH GROWTH LAB',
  badgeRight: 'MSME REGISTERED',
  availability: 'AVAILABLE FOR NEW PROJECTS',
  deliveredBadge: 'SCHEDULED ON-SITE SERVICE',
  topPercentLabel: 'MSME',
  topPercentSub: 'Pollachi, Tamil Nadu · Build. Automate. Grow.',
  rollingTexts: [
    'AI AUTOMATION SPECIALIST',
    'WEBSITE DEVELOPER',
    'RETAIL POS BUILDER',
    'WHATSAPP AUTOMATION',
    'AI AUTOMATION SPECIALIST',
  ],
  marqueeRoles: [
    'VGL // WEBSITES & E-COMMERCE',
    'ORIGINAL SERIES // RETAIL POS',
    'HIGH IMPACT // WHATSAPP AI',
    'CUSTOM SOFTWARE',
  ],
  chips: ['Custom software', 'Websites', 'POS', 'WhatsApp AI'],
  intro:
    'From Pollachi, I build billing software, ERP and CRM systems, websites, Android apps and WhatsApp automation for businesses across India.',
  ctaPrimary: 'Talk on WhatsApp',
  ctaSecondary: 'View Our Work',
  cardBadge: 'FOUNDER',
  cardRole: 'AI Automation & BPA Specialist',
  cardStat1: { value: 'POS', label: 'Billing systems' },
  cardStat2: { value: 'Web', label: 'Business websites' },
};

/** Trust strip stats (first 4 used in TrustStats grid). */
export const STATS_DATA = [
  { value: 'Pollachi', label: 'Service area', desc: 'Coimbatore district, Tamil Nadu' },
  { value: 'On-site', label: 'Installation', desc: 'By arrangement for the project' },
  { value: 'Remote', label: 'Development', desc: 'Software and website projects' },
  { value: 'Direct', label: 'Enquiries', desc: 'Speak with the founder' },
];

export const ABOUT = {
  episodeLabel: 'ABOUT VIGNESH GROWTH LAB',
  title: 'MORE THAN JUST A DEVELOPER.',
  synopsis:
    'I bridge technical execution and real business growth. When you work with VGL, you work with Vignesh directly — from the first strategy call to handover.',
  quote: FOUNDER.bioSecondary,
  location: CONTACT.location,
  projectsBadge: 'Software development',
  pillars: [
    {
      title: 'Website & E-Commerce',
      desc: 'Fast, SEO-ready business and e-commerce websites — WordPress or custom — that show up on Google and turn visitors into WhatsApp enquiries.',
    },
    {
      title: 'Custom Development',
      desc: 'Hand-coded web applications and API integrations when a template will not cut it — built exactly for your workflow.',
    },
    {
      title: 'Retail POS Solutions',
      desc: 'Bilingual English–Tamil billing, inventory, WhatsApp digital receipts — with scope agreed for each installation.',
    },
    {
      title: 'WhatsApp AI Automation',
      desc: 'n8n + Gemini/GPT workflows that capture leads, draft replies and route enquiries to Sheets and WhatsApp.',
    },
  ],
};

/** Services for ServicesWheel — 4 VGL services (+ reuse colors). */
export const SERVICES_WHEEL = [
  {
    slug: 'website-development',
    title: 'Website Development',
    desc: 'Mobile-friendly business websites, landing pages and e-commerce stores with clear paths to WhatsApp enquiries. Eligible landing pages start at ₹8,000.',
    tag: 'Websites',
    bgColor: '#4B72E8',
    imageKey: 'blue',
  },
  {
    slug: 'custom-software',
    title: 'Custom Development',
    desc: 'Custom software for MSMEs, including ERP for operations, CRM for sales, Android apps and API integrations.',
    tag: 'Custom',
    bgColor: '#7C3AED',
    imageKey: 'purple',
  },
  {
    slug: 'pos-billing',
    title: 'Retail POS Solutions',
    desc: 'Billing software for retailers and restaurants with inventory, reporting, an English–Tamil interface and WhatsApp digital receipts.',
    tag: 'POS',
    bgColor: '#EA580C',
    imageKey: 'orange',
  },
  {
    slug: 'whatsapp-automation',
    title: 'WhatsApp AI Automation',
    desc: 'WhatsApp and Instagram automation for lead capture, follow-ups and enquiry routing, with AI workflows and Google Sheets integrations.',
    tag: 'Automation',
    bgColor: '#16A34A',
    imageKey: 'green',
  },
];

export { projects as PROJECTS_DATA } from './projects.js';
import { projects } from './projects.js';
export const PROJECT_CATEGORIES = ['All', ...new Set(projects.map(project => project.category))];

export const SKILLS_TECH = [
  { name: 'WordPress', level: 'Production', category: 'Build' },
  { name: 'HTML / CSS / JS', level: 'Production', category: 'Build' },
  { name: 'Python / Flask', level: 'Production', category: 'Build' },
  { name: 'GitHub', level: 'Production', category: 'Build' },
  { name: 'API Integrations', level: 'Production', category: 'Build' },
  { name: 'n8n', level: 'Production', category: 'Automation' },
  { name: 'Gemini / GPT', level: 'Production', category: 'Automation' },
  { name: 'WhatsApp workflows', level: 'Production', category: 'Automation' },
  { name: 'Google Sheets', level: 'Production', category: 'Automation' },
  { name: 'Google Analytics', level: 'Production', category: 'Business' },
  { name: 'Power BI', level: 'Production', category: 'Business' },
  { name: 'Canva / CapCut', level: 'Production', category: 'Creative' },
];

export const SKILLS_DELIVERABLES = [
  { title: 'Business websites', desc: 'Landing pages and catalogues' },
  { title: 'E-commerce', desc: 'Product collections and ordering' },
  { title: 'Retail POS', desc: 'Billing and stock records' },
  { title: 'Restaurant POS', desc: 'Offline Android counter billing' },
  { title: 'Custom software', desc: 'Quotations and inventory' },
  { title: 'Messaging workflows', desc: 'Enquiry routing and follow-up' },
  { title: 'Android applications', desc: 'Device-specific workflows' },
  { title: 'Project handover', desc: 'Agreed access and documentation' },
];
export const PROCESS_STEPS = [
  { step: '01', title: 'Discuss the workflow', subtitle: 'Discovery', description: 'Walk through the task, users and devices involved.' },
  { step: '02', title: 'Review the quotation', subtitle: 'Scope', description: 'Agree deliverables, milestones, third-party costs and acceptance criteria.' },
  { step: '03', title: 'Build and test', subtitle: 'Development', description: 'Review progress against the agreed examples and record changes to scope.' },
  { step: '04', title: 'Install and hand over', subtitle: 'Delivery', description: 'Verify the agreed setup, access, documentation and support arrangements.' },
];
export const WHY_WORK_WITH_ME = [
  { title: 'Founder contact', desc: 'Discuss requirements directly with Vignesh Prabhu M.' },
  { title: 'Scheduled installation', desc: 'Agree the device, location and installation scope before delivery.' },
  { title: 'Project-specific quotation', desc: 'Review costs, recurring charges and handover arrangements in writing.' },
];

export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#work' },
  { name: 'Skills', href: '#skills' },
  { name: 'Process', href: '#process' },
  { name: 'Compare', href: '#compare' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

export const CONTACT_SERVICE_OPTIONS = [
  'Website Development',
  'Custom Development',
  'Retail POS Solutions',
  'WhatsApp AI Automation',
  'Other Services',
];

export const FAQS = [
  { question: 'Where is VGL based?', answer: 'VGL is based in the Pollachi region of Coimbatore district, Tamil Nadu. Meetings and on-site installations are by arrangement. Remote development is available.' },
  { question: 'How much does a project cost?', answer: 'Eligible business landing pages start at ₹8,000. Retail POS starts at ₹10,000 one-time or ₹700 per month. Restaurant POS, software, apps and automation are quoted by scope.' },
  { question: 'Can a restaurant use an offline counter?', answer: 'Yes. The Android restaurant installation uses local SQLite storage and receipt printing. Confirm compatibility with your device and printer when requesting a quote.' },
  { question: 'How do payment and support work?', answer: 'Milestones, delivery, support and any renewals are agreed in the quotation. Describe your current process and the help you need after launch.' },
];

export const FAQ_META = {
  kicker: 'FAQ',
  title: 'Questions Tamil Nadu business owners ask us',
};

export const CREDENTIALS = [
  {
    title: 'HackerRank Python Basics',
    linkLabel: 'View certificate',
    href: 'https://drive.google.com/file/d/16yweKSe5cOAkw_veyu8c3a3mMwEmUM_T/view',
  },
  {
    title: 'AWS Academy — Cloud Foundations',
    linkLabel: 'View badge on Credly',
    href: 'https://www.credly.com/badges/99a6af1a-42ac-4b88-8692-1933dfb1c63d/public_url',
  },
  {
    title: 'HackerRank SQL Basics',
    linkLabel: 'View certificate',
    href: 'https://www.hackerrank.com/certificates/7c0d3f9a96ab',
  },
  {
    title: 'MSME / Udyam Registration',
    linkLabel: 'Registration details',
    href: '/msme/',
    highlight: true,
  },
];
