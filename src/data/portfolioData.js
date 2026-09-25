/**
 * Central content module for Vignesh Growth Lab portfolio.
 * Ported from vigneshgrowthlab-portfolio src/data/vgl/* — keep facts exact.
 */

export const CONTACT = {
  whatsappNumber: '918220034139',
  phoneDisplay: '+91 82200 34139',
  phoneHref: 'tel:+918220034139',
  email: 'vigneshgrowthlab@gmail.com',
  location: 'Pollachi, Tamil Nadu',
};

export const BRAND = {
  name: 'Vignesh Growth Lab',
  short: 'VGL',
  tagline: 'Build. Automate. Grow.',
  founder: 'Vignesh Prabhu',
  msmeId: 'UDYAM-TN-03-0328658',
  copyright: '© 2026 Vignesh Growth Lab. All rights reserved.',
  siteUrl: 'https://vigneshgrowthlab.dev',
};

export const SOCIALS = {
  linkedin: 'https://www.linkedin.com/in/vignesh-prabhu-m-06b173253',
  github: 'https://github.com/Vignesh-10032000',
  instagram: 'https://www.instagram.com/vigneshgrowthlab/',
};

export const DOCUMENTS = {
  resume: '/documents/vgl-resume.pdf',
  msmeCertificate: '/documents/udyam-certificate.pdf',
};

export const RESERVED_MEDIA = {
  clientTestimonialVideo: '/videos/client-testimonial.mp4',
  clientTestimonialPoster: '/images/client-testimonial-poster.webp',
};

export const SEO_DEFAULTS = {
  title: 'Vignesh Growth Lab — Websites, POS & WhatsApp Automation in Tamil Nadu',
  description:
    'Pollachi-based MSME building fast websites, custom software, retail POS and WhatsApp AI automation for Tamil Nadu businesses. 15+ projects delivered.',
  keywords:
    'Vignesh Growth Lab, Vignesh Prabhu, VGL, Website Development Tamil Nadu, Retail POS, WhatsApp AI Automation, Pollachi, MSME',
  author: 'Vignesh Prabhu - Vignesh Growth Lab',
  ogImage: '/brand/vgl-logo.svg',
};

export const FOUNDER = {
  name: 'Vignesh Prabhu',
  photo: '/images/vignesh.webp',
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
  deliveredBadge: '15+ DELIVERED',
  topPercentLabel: 'MSME',
  topPercentSub: 'Pollachi, Tamil Nadu · Build. Automate. Grow.',
  greeting: "HELLO, I'M",
  name: 'VIGNESH',
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
    'ACCLAIMED // CUSTOM SOFTWARE',
  ],
  chips: ['15+ Projects Delivered', 'Websites', 'POS', 'WhatsApp AI'],
  intro:
    'Founder of Vignesh Growth Lab. I build fast, conversion-focused websites, custom software, retail POS systems and WhatsApp AI workflows for Tamil Nadu businesses. Average delivery around 2 weeks — and you own 100% of it.',
  ctaPrimary: 'Talk on WhatsApp',
  ctaSecondary: 'View Our Work',
  cardBadge: 'FOUNDER',
  cardRole: 'AI Automation & BPA Specialist',
  cardStat1: { value: '15+', label: 'Projects Delivered' },
  cardStat2: { value: '8+', label: 'Happy Clients' },
};

/** Trust strip stats (first 4 used in TrustStats grid). */
export const STATS_DATA = [
  { value: '15+', label: 'Projects Delivered', desc: 'Websites, POS, automation & custom apps across Tamil Nadu' },
  { value: '8+', label: 'Happy Clients', desc: 'Local businesses with real testimonials and live sites' },
  { value: '100%', label: 'Client Satisfaction', desc: 'Direct founder support — no middle-men' },
  { value: '72 hrs', label: 'To First Online Sale', desc: 'NextGen Toys recorded its first sale within 72 hours' },
];

export const STATS_ALL = [
  { value: '15+', label: 'Projects delivered' },
  { value: '8+', label: 'Happy clients' },
  { value: '100%', label: 'Client satisfaction' },
  { value: '72 hrs', label: 'To first online sale' },
  { value: '2 wks', label: 'Average delivery' },
  { value: '600+', label: 'Concurrent users handled' },
];

export const STATS_FOOTNOTE =
  'Direct founder support — no middle-men, direct WhatsApp access to Vignesh.';

export const ABOUT = {
  episodeLabel: 'ABOUT VIGNESH GROWTH LAB',
  title: 'MORE THAN JUST A DEVELOPER.',
  synopsis:
    'I bridge technical execution and real business growth. When you work with VGL, you work with Vignesh directly — from the first strategy call to handover.',
  quote: FOUNDER.bioSecondary,
  location: CONTACT.location,
  projectsBadge: '15+ Projects',
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
      desc: 'Bilingual English–Tamil billing, inventory, WhatsApp digital receipts — load-tested to 600 concurrent clients under 300ms.',
    },
    {
      title: 'WhatsApp AI Automation',
      desc: 'n8n + Gemini/GPT workflows that capture leads, reply in under 5 seconds, and route every enquiry to Sheets and WhatsApp.',
    },
  ],
};

/** Services for ServicesWheel — 4 VGL services (+ reuse colors). */
export const SERVICES_WHEEL = [
  {
    title: 'Website Development',
    desc: 'Fast, SEO-ready business and e-commerce websites that show up on Google, load quickly on mobile, and turn visitors into WhatsApp enquiries. Starting at ₹8,000.',
    tag: 'Websites',
    bgColor: '#4B72E8',
    imageKey: 'blue',
  },
  {
    title: 'Custom Development',
    desc: "Hand-coded web applications and API integrations when a template won't cut it — built exactly for your workflow. HTML, CSS, JavaScript and GitHub-managed code.",
    tag: 'Custom',
    bgColor: '#7C3AED',
    imageKey: 'purple',
  },
  {
    title: 'Retail POS Solutions',
    desc: 'Custom billing software with inventory, reports, bilingual English–Tamil UI and WhatsApp digital receipts. Load-tested to 600 concurrent clients under 300ms.',
    tag: 'POS',
    bgColor: '#EA580C',
    imageKey: 'orange',
  },
  {
    title: 'WhatsApp AI Automation',
    desc: 'AI chatbots and workflows that capture leads, follow up automatically and route every enquiry — 100+ leads daily to Google Sheets and WhatsApp.',
    tag: 'Automation',
    bgColor: '#16A34A',
    imageKey: 'green',
  },
];

export const SERVICES_DATA = [
  {
    id: '01',
    slug: 'website-development',
    title: 'Website Development',
    shortDesc:
      'Fast, SEO-ready business and e-commerce websites that show up on Google, load quickly on mobile, and turn visitors into WhatsApp enquiries.',
    fullDesc:
      'More enquiries from Google and social — without paying monthly platform fees. WordPress or custom builds, GA4, ~2 week average delivery, 100% ownership. Starting at ₹8,000.',
    icon: 'Globe',
    category: 'Development',
    deliverables: [
      'WordPress or custom build',
      'E-commerce ready',
      'Responsive UI',
      'SEO ready',
      'Fast loading',
      'Google Analytics',
    ],
    startingPrice: 'Starting at ₹8,000',
    waMessage: "Hi Vignesh, I'm interested in website development.",
  },
  {
    id: '02',
    slug: 'custom-development',
    title: 'Custom Development',
    shortDesc:
      "Hand-coded web applications and API integrations when a template won't cut it — built exactly for your workflow.",
    fullDesc:
      'Software shaped around how your business already works. HTML, CSS, JavaScript, web applications, API integrations and GitHub-managed code you fully own.',
    icon: 'Code2',
    category: 'Custom Tech',
    deliverables: [
      'HTML, CSS & JavaScript',
      'Web applications',
      'API integrations',
      'GitHub-managed code',
      'WhatsApp-first features',
      'Analytics & schema',
    ],
    startingPrice: '',
    waMessage: "Hi Vignesh, I'm interested in custom development.",
  },
  {
    id: '03',
    slug: 'retail-pos-solutions',
    title: 'Retail POS Solutions',
    shortDesc:
      'Custom billing software with inventory, reports, bilingual English–Tamil UI and WhatsApp digital receipts.',
    fullDesc:
      'Billing, stock and reports in one place — owned by you, not rented. Flask-based, load-tested to 600 concurrent clients under 300ms.',
    icon: 'ShoppingCart',
    category: 'POS',
    deliverables: [
      'Custom billing (Flask)',
      'Inventory management',
      'Reports',
      'Customer management',
      'Local database',
      'Thermal receipt integration',
    ],
    startingPrice: '',
    waMessage: "Hi Vignesh, I'm interested in retail POS software.",
  },
  {
    id: '04',
    slug: 'whatsapp-ai-automation',
    title: 'WhatsApp AI Automation',
    shortDesc:
      'AI chatbots and workflows that capture leads, follow up automatically and route every enquiry where it belongs.',
    fullDesc:
      'Reduce missed leads with automatic capture and routing on n8n with Gemini/GPT. Route 100+ leads daily to Google Sheets and WhatsApp.',
    icon: 'Bot',
    category: 'Automation',
    deliverables: [
      'AI chatbots',
      'Lead capture',
      'Automation workflows',
      'Follow-up systems',
      'Google Sheets logging',
      'WhatsApp delivery',
    ],
    startingPrice: '',
    waMessage: "Hi Vignesh, I'm interested in WhatsApp AI automation.",
  },
];

/** Projects mapped to template Portfolio / ProjectModal shape. */
export const PROJECTS_DATA = [
  {
    id: 'nextgen-toys',
    title: 'NextGen Toys',
    category: 'E-Commerce Store',
    platform: 'WordPress',
    url: 'https://nextgentoys.in/',
    shortDesc:
      'An e-commerce store for a Coimbatore toy retailer — full RC-car and drone catalogue, 650+ Google Reviews embedded. The store recorded its first online sale within 72 hours of launch.',
    image: '/images/project-nextgen.webp',
    client: 'NextGen Toys',
    objective: "Bring the store's RC-car and drone range online for customers to browse and buy.",
    workPerformed: [
      'Full RC-car and drone product catalogue',
      '650+ Google Reviews embedded',
      'Mobile-first, fast-loading storefront',
    ],
    technologies: ['WordPress', 'E-Commerce', 'SEO'],
    featured: true,
    resultBadge: 'First sale in 72 hours',
    location: 'Coimbatore, Tamil Nadu',
    results: [
      { value: '72 hrs', label: 'To first online sale' },
      { value: '650+', label: 'Google Reviews embedded' },
      { value: 'Full', label: 'Catalogue online' },
    ],
  },
  {
    id: 'rani-sarees',
    title: 'Rani Sarees & Boutique',
    category: 'Business Website',
    platform: 'HTML / JS / CSS',
    url: 'https://ranisareesandbotique.com/',
    shortDesc:
      'A custom-coded business website for a Pollachi boutique — pre-filled WhatsApp order buttons on every product, GA4 and local JSON-LD schema. The site resulted in 3× online reach.',
    image: '/images/project-rani.webp',
    client: 'Rani Sarees & Boutique',
    objective:
      'Let customers order any product directly on WhatsApp, with analytics and local schema in place for discovery.',
    workPerformed: [
      'Pre-filled WhatsApp order buttons on every product',
      'Summer 20% OFF announcement bar',
      'GA4 analytics and JSON-LD local schema',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'GA4'],
    featured: true,
    resultBadge: '3× online reach',
    location: 'Pollachi, Tamil Nadu',
    results: [
      { value: '3×', label: 'Online reach' },
      { value: 'Every product', label: 'WhatsApp-orderable' },
      { value: 'GA4', label: 'Analytics and local schema live' },
    ],
  },
  {
    id: 'vgl-pos',
    title: 'VGL POS Software',
    category: 'Retail POS',
    platform: 'Flask',
    url: 'https://pos-project-li2v.onrender.com/',
    shortDesc:
      'A bilingual (English ↔ Tamil) retail POS for Tamil Nadu grocery stores and apparel showrooms — billing, inventory and sales reporting with automated WhatsApp digital receipts. Load-tested to 600 concurrent clients at under 300ms.',
    image: '/images/project-pos.webp',
    client: 'VGL POS Software',
    objective:
      'Busy grocery and apparel counters need billing, inventory and sales visibility in one fast screen — in both Tamil and English — without depending on rented software.',
    workPerformed: [
      '100% bilingual interface — English ↔ Tamil across the UI and receipts',
      'Automated WhatsApp digital receipts sent to customers',
      'EOD Day-Close summary split by Cash, UPI and Card',
      'Real-time inventory and sales reporting',
      'Load-tested to 600 concurrent clients at under 300ms',
    ],
    technologies: ['Flask', 'Python', 'WhatsApp', 'Bilingual UI'],
    featured: true,
    resultBadge: '600 concurrent clients',
    location: 'Tamil Nadu',
    results: [
      { value: '600', label: 'Concurrent clients load-tested' },
      { value: '<300ms', label: 'Average response time' },
      { value: 'Bilingual', label: 'English ↔ Tamil UI and receipts' },
    ],
  },
  {
    id: 'ai-whatsapp-automation',
    title: 'AI WhatsApp Automations',
    category: 'AI Automation',
    platform: 'n8n + Gemini AI',
    url: '',
    shortDesc:
      'A lead routing system built on n8n and Gemini AI — it auto-classifies and routes 100+ leads daily directly to Google Sheets and WhatsApp.',
    image: '/images/project-ai-automation.webp',
    client: 'AI WhatsApp Automations',
    objective:
      'Classify incoming enquiries and deliver each one to the right place — without a person sorting them by hand.',
    workPerformed: [
      'AI replies to every enquiry in under 5 seconds, 24/7',
      'Gemini AI parses and classifies each conversation',
      'Every lead logged straight into Google Sheets (CRM)',
      'Instant routing to WhatsApp for follow-up',
    ],
    technologies: ['n8n', 'Gemini AI', 'WhatsApp', 'Google Sheets'],
    featured: true,
    resultBadge: '100+ leads daily',
    location: 'Tamil Nadu',
    videoSrc: '/videos/n8n-workflow.mp4',
    videoPoster: '/images/n8n-workflow-poster.webp',
    results: [
      { value: '100+', label: 'Leads routed daily' },
      { value: '<5s', label: 'AI reply, any time of day' },
      { value: '24/7', label: 'Automated — zero human input' },
    ],
  },
  {
    id: 'nexus-crm',
    title: 'Nexus CRM Platform',
    category: 'SaaS CRM',
    platform: 'React + Node.js',
    url: '',
    shortDesc:
      'A full-stack scalable CRM platform allowing businesses to track leads, manage customer data, and monitor sales pipelines in real-time.',
    image: '/images/nexus_crm_dashboard.jpg',
    client: 'Nexus CRM Platform',
    objective:
      'Build a centralized platform to manage leads, contacts, and sales pipelines without disjointed spreadsheets.',
    workPerformed: [
      'Interactive React dashboard',
      'Secure Node.js API backend',
      'Real-time sales pipeline tracking',
    ],
    technologies: ['React', 'Node.js', 'SaaS'],
    featured: false,
    resultBadge: 'Scalable CRM',
    location: 'Global',
    results: [
      { value: '100%', label: 'Centralized lead management' },
      { value: 'Real-time', label: 'Analytics' },
      { value: 'Secure', label: 'Customer Data Storage' },
    ],
  },
  {
    id: 'kms-vision-cctv',
    title: 'KMS Vision — CCTV Serial & DC Suite',
    category: 'Web Application',
    platform: 'Django + SQLite',
    url: 'https://vigneshprabhu.pythonanywhere.com/',
    shortDesc:
      'A cloud database engine that eliminates paper tracking for CCTV sales and installations. Technicians can instantly map serial numbers to customers, check warranty dates, and generate delivery challans from mobile.',
    image: '/images/cctv_tracker_dashboard.jpg',
    client: 'KMS Vision',
    objective:
      'Field technicians were losing time tracking physical warranty papers and generating delivery challans manually on-site.',
    workPerformed: [
      '1-Second Warranty Lookup by Serial Number',
      '30-Second On-site Delivery Challan (DC) Generation',
      'Mobile-responsive Centralized Customer Directory',
    ],
    technologies: ['Django', 'SQLite', 'PythonAnywhere'],
    featured: false,
    resultBadge: '30-second Delivery Challans',
    location: 'Pollachi, Tamil Nadu',
    results: [
      { value: '<30s', label: 'DC Generation' },
      { value: '100%', label: 'Mobile Accessible' },
      { value: '1s', label: 'Warranty Lookup' },
    ],
  },
  {
    id: 'vgl-evm-spares-dc-suite',
    title: 'VGL EVM Spares & Enterprise DC Suite',
    category: 'Enterprise ERP Suite',
    platform: 'Django + MariaDB',
    url: '',
    shortDesc:
      'A comprehensive, enterprise-grade dealership management software to manage EV spare parts, customer service requests, and advanced inventory dispatch across multiple roles.',
    image: '/images/evm_spares_dashboard.jpg',
    client: 'Dheera Motors',
    objective:
      'Scaling EV dealerships require robust tracking of job cards, spare parts mapping, warranty end dates, and automated tax calculations for delivery challans.',
    workPerformed: [
      'Automated multi-item Delivery Challans with GST and PDF exports',
      'Digital Job Cards for complete vehicle service histories',
      'Cataloged spare parts with auto-calculated warranties',
      'Role-based Employee Portal (Admin, Manager, Employee)',
    ],
    technologies: ['Django', 'MariaDB', 'WeasyPrint', 'GST'],
    featured: false,
    resultBadge: 'Enterprise Dealership Suite',
    location: 'Tamil Nadu',
    results: [
      { value: '19', label: 'Database Tables Integrated' },
      { value: 'Automated', label: 'GST & Warranty Calculations' },
      { value: 'Enterprise', label: 'Role-Based Access Control' },
    ],
  },
];

export const MORE_PROJECTS = [
  {
    name: 'Masala Mill Store',
    type: 'E-Commerce Store',
    location: 'Tamil Nadu',
    copy: 'Bilingual spice-brand store with weight-based product variants, pre-filled WhatsApp order buttons and a tested UPI gateway. Full catalogue live and taking orders.',
    liveUrl: '',
    tags: ['Bilingual UI', 'UPI Gateway', 'WhatsApp Orders'],
    icon: 'ShoppingBag',
  },
  {
    name: 'Day To Day Gifts',
    type: 'E-Commerce Store',
    location: 'Tamil Nadu',
    copy: 'Personalized gifting store with custom hampers, WhatsApp order notifications, and high-speed mobile checkout — live and taking customer orders.',
    liveUrl: 'https://daytodaygifts.netlify.app/',
    tags: ['Custom Hampers', 'Fast Checkout', 'Mobile Ready'],
    icon: 'Gift',
  },
  {
    name: 'Meat & Eat',
    type: 'E-Commerce Store',
    location: 'Tamil Nadu',
    copy: 'Fresh meat online ordering platform featuring category cuts, local delivery dispatch, and instant WhatsApp confirmations — live and taking orders.',
    liveUrl: 'https://meatandeatd.netlify.app/',
    tags: ['Local Delivery', 'Quick Order', 'Category Cuts'],
    icon: 'UtensilsCrossed',
  },
  {
    name: 'Albatross Gym',
    type: 'Landing Page',
    location: 'Coimbatore',
    copy: 'Mobile-first local lead-generation page with Formspree forms and WhatsApp CTAs — shipped with a custom domain and 3-month priority support.',
    liveUrl: 'https://soft-figolla-562f2b.netlify.app/',
    tags: ['Lead Gen Page', 'Formspree', 'Custom Domain'],
    icon: 'Dumbbell',
  },
];

export const PROJECT_CATEGORIES = [
  'All',
  'E-Commerce Store',
  'Business Website',
  'Retail POS',
  'AI Automation',
  'SaaS CRM',
  'Web Application',
  'Enterprise ERP Suite',
];

/** Skills from TECHNOLOGY_GROUPS */
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
  { title: 'WordPress or custom sites', desc: 'Never a bloated template' },
  { title: 'E-commerce catalogues', desc: 'Orders, payments, WhatsApp CTAs' },
  { title: 'Bilingual retail POS', desc: 'English ↔ Tamil UI & receipts' },
  { title: 'WhatsApp digital receipts', desc: 'Automated after every sale' },
  { title: 'AI reply under 5 seconds', desc: '24/7 Gemini / GPT chatbots' },
  { title: 'Lead routing to Sheets', desc: '100+ leads classified daily' },
  { title: 'GA4 & local schema', desc: 'Wired in from day one' },
  { title: '100% ownership handover', desc: 'Code, hosting and data — yours' },
];

/** Homepage process — exact VGL copy (4 steps). */
export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Free 30-min strategy call',
    subtitle: 'Honest advice',
    description: 'Honest advice about what your business actually needs. No sales pitch.',
  },
  {
    step: '02',
    title: 'Custom proposal in 24 hours',
    subtitle: 'Fixed price',
    description: 'Fixed price, clear scope, no hidden costs.',
  },
  {
    step: '03',
    title: 'Build starts within 1 week',
    subtitle: '~2 week average',
    description:
      'Average delivery is about 2 weeks; typical projects run 2–4 weeks depending on scope.',
  },
  {
    step: '04',
    title: 'You own everything',
    subtitle: 'No lock-in',
    description: '100% ownership of code, hosting and data. No monthly lock-in, no retainers.',
  },
];

/** Why VGL — adapted from trust / comparison facts (no invented claims). */
export const WHY_WORK_WITH_ME = [
  {
    title: 'MSME Registered Business',
    desc: `We are a Pollachi-based MSME registered business (${BRAND.msmeId}). You can call Vignesh directly on WhatsApp.`,
  },
  {
    title: 'Direct Founder Support',
    desc: 'No middle-men — direct WhatsApp access to Vignesh from the first strategy call to handover.',
  },
  {
    title: '100% Ownership',
    desc: 'Full code, hosting credentials, and domain access transferred to you on delivery. No monthly lock-in.',
  },
  {
    title: 'Fast, Fixed-Price Delivery',
    desc: 'Custom proposal in 24 hours. Average delivery about 2 weeks. 50% advance, 50% on delivery after you approve.',
  },
  {
    title: 'Built for Tamil Nadu Businesses',
    desc: 'Websites, POS with English ↔ Tamil UI, and WhatsApp-first ordering for gyms, boutiques and retail stores.',
  },
  {
    title: 'Beyond Website Builders',
    desc: 'We also handle things Wix cannot: POS software, WhatsApp automation, and AI workflows on n8n + Gemini.',
  },
];

/** Real client proof — screenshot + video from SOURCE (Astro homepage). */
export const CLIENT_PROOF = [
  {
    id: 'rani-video',
    variant: 'video',
    client: 'Rani Sarees & Boutique',
    videoSrc: '/videos/client-testimonial.mp4',
    videoPoster: '/images/client-testimonial-poster.webp',
    videoLabel: 'Video testimonial from the owner of Rani Sarees and Boutique, Pollachi',
    caption: 'The owner of Rani Sarees & Boutique on working with Vignesh Growth Lab.',
    captionMeta: 'Video testimonial · Rani Sarees & Boutique, Pollachi',
  },
  {
    id: 'nextgen-shot',
    variant: 'image',
    client: 'NextGen Toys',
    imageSrc: '/images/nextgen-testimonial.webp',
    imageAlt: 'WhatsApp review from Team NextGen Toys recommending Vignesh Growth Lab for website development',
    caption: '“Communication was smooth throughout the project, and the final website matched our expectations.”',
    captionMeta: 'Written review · Team NextGen Toys, Coimbatore',
  },
  {
    id: 'n8n-demo',
    variant: 'video',
    client: 'AI WhatsApp Automations',
    videoSrc: '/videos/n8n-workflow.mp4',
    videoPoster: '/images/n8n-workflow-poster.webp',
    videoLabel: 'n8n workflow demo showing AI lead capture and WhatsApp routing',
    caption: 'Live n8n + Gemini workflow — leads captured, AI replies under 5 seconds, routed to Sheets and WhatsApp.',
    captionMeta: 'Workflow demo · n8n + Gemini AI automation',
  },
];

/** Testimonials — only real quotes / proof from SOURCE. */
export const TESTIMONIALS = [
  {
    id: 1,
    client: 'NextGen Toys',
    name: 'Team NextGen Toys',
    role: 'Client',
    avatar: '/images/nextgen-testimonial.webp',
    rating: 5,
    match: 'Verified',
    quote:
      'Communication was smooth throughout the project, and the final website matched our expectations. We would recommend Vignesh Growth Lab for website development services.',
    tags: ['WordPress E-Commerce', 'First sale in 72 hrs', 'Coimbatore'],
  },
  {
    id: 2,
    client: 'Rani Sarees & Boutique',
    name: 'Rani Sarees & Boutique',
    role: 'Pollachi',
    avatar: '/images/project-rani.webp',
    rating: 5,
    match: '3× Reach',
    quote:
      'Custom-coded business website with pre-filled WhatsApp order buttons on every product, GA4 and local JSON-LD schema — resulting in 3× online reach.',
    tags: ['Business Website', 'WhatsApp Ordering', 'Pollachi'],
  },
  {
    id: 3,
    client: 'VGL POS Software',
    name: 'Retail POS Case Study',
    role: 'Tamil Nadu',
    avatar: '/images/project-pos.webp',
    rating: 5,
    match: '600 Clients',
    quote:
      'Bilingual English ↔ Tamil retail POS with inventory, WhatsApp digital receipts and EOD Day-Close — load-tested to 600 concurrent clients at under 300ms.',
    tags: ['Flask POS', 'Bilingual', '<300ms'],
  },
  {
    id: 4,
    client: 'AI WhatsApp Automations',
    name: 'Automation Case Study',
    role: 'Tamil Nadu',
    avatar: '/images/project-ai-automation.webp',
    rating: 5,
    match: '100+ / day',
    quote:
      'Lead routing on n8n + Gemini AI — auto-classifies and routes 100+ leads daily to Google Sheets and WhatsApp, with AI replies in under 5 seconds, 24/7.',
    tags: ['n8n', 'Gemini AI', 'WhatsApp'],
  },
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

export const COMPARISON_ROWS = [
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

export const COMPARISON_CAPTION =
  'An honest comparison: Vignesh Growth Lab vs DIY website builders vs a big agency.';

export const COMPARISON_META = {
  kicker: 'Why VGL',
  title: 'Why not just use Wix or hire a big agency?',
};

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
    href: 'https://www.hackerrank.com/certificates/iframe/7c0d3f9a96ab',
  },
  {
    title: 'MSME / Udyam Registration',
    linkLabel: 'View MSME certificate',
    href: DOCUMENTS.msmeCertificate,
    highlight: true,
  },
];
