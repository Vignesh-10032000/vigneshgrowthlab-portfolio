/**
 * Project route → content matrix.
 * Ported verbatim from design-reference/.../project/project-routes.js.
 * Media fields hold production paths; '' = asset not yet available, which
 * collapses the corresponding block (gallery, video, quote, live URL …).
 * Canonical/OG URLs are derived at render time from the configured site URL.
 */

export interface ProjectResult {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  client: string;
  pageRoute: string;
  seoTitle: string;
  seoDescription: string;
  location: string;
  projectType: string;
  technology: string;
  summary: string;
  /**
   * Label used when the client's original challenge was not explicitly
   * supplied — keep copy factual, never imply client statements.
   */
  challengeKicker: string;
  challengeTitle: string;
  challenge: string;
  solutionTitle: string;
  solution: string;
  delivered: string[];
  results: ProjectResult[];
  cardImage: string;
  cardImageAlt: string;
  heroImage: string;
  heroImageAlt: string;
  galleryImages: string[];
  galleryCaptions: string[];
  /** Number of reserved gallery slots when real images are pending (gallery hidden until supplied). */
  gallerySlots: number;
  videoSrc: string;
  videoPoster: string;
  videoHeading: string;
  videoLabel: string;
  videoTranscript: string;
  videoCaptionsFile: string;
  quote: string;
  quoteAuthor: string;
  testimonialImage: string;
  testimonialImageAlt: string;
  liveUrl: string;
  liveLabel: string;
  relatedServiceRoute: string;
  waMessage: string;
  /** Result badge shown on project cards. */
  resultBadge: string;
}

export const PROJECTS: Project[] = [
  {
    slug: 'nextgen-toys',
    client: 'NextGen Toys',
    pageRoute: '/projects/nextgen-toys',
    seoTitle: 'NextGen Toys case study — first online sale in 72 hours | Vignesh Growth Lab',
    seoDescription:
      'WordPress e-commerce store for a Coimbatore toy retailer: full RC-car and drone catalogue, 650+ Google Reviews embedded, first online sale within 72 hours.',
    location: 'Coimbatore, Tamil Nadu',
    projectType: 'E-Commerce Store',
    technology: 'WordPress',
    summary:
      'An e-commerce store for a Coimbatore toy retailer — full RC-car and drone catalogue, 650+ Google Reviews embedded. The store recorded its first online sale within 72 hours of launch.',
    challengeKicker: 'Project goal',
    challengeTitle: 'Take a local toy store online',
    challenge: "Bring the store's RC-car and drone range online for customers to browse and buy.",
    solutionTitle: 'A catalogue built to convert',
    solution:
      "A WordPress e-commerce store carrying the full product catalogue, with the store's 650+ Google Reviews embedded as social proof.",
    delivered: [
      'Full RC-car and drone product catalogue',
      '650+ Google Reviews embedded',
      'Mobile-first, fast-loading storefront',
    ],
    results: [
      { value: '72 hrs', label: 'To first online sale' },
      { value: '650+', label: 'Google Reviews embedded' },
      { value: 'Full', label: 'Catalogue online' },
    ],
    cardImage: '',
    cardImageAlt: 'NextGen Toys storefront screenshot',
    heroImage: '',
    heroImageAlt: 'NextGen Toys online store, full-width view',
    galleryImages: [],
    galleryCaptions: [],
    gallerySlots: 0,
    videoSrc: '',
    videoPoster: '',
    videoHeading: '',
    videoLabel: '',
    videoTranscript: '',
    videoCaptionsFile: '',
    quote:
      'Communication was smooth throughout the project, and the final website matched our expectations. We would recommend Vignesh Growth Lab for website development services.',
    quoteAuthor: 'Team NextGen Toys',
    testimonialImage: '/images/nextgen-testimonial.webp',
    testimonialImageAlt: 'WhatsApp review from Team NextGen Toys recommending Vignesh Growth Lab',
    liveUrl: 'https://nextgentoys.in/',
    liveLabel: 'Visit live site',
    relatedServiceRoute: '/services/website-development',
    waMessage: 'Hi Vignesh, I saw the NextGen Toys case study.',
    resultBadge: 'First sale in 72 hours',
  },
  {
    slug: 'rani-sarees',
    client: 'Rani Sarees & Boutique',
    pageRoute: '/projects/rani-sarees',
    seoTitle: 'Rani Sarees & Boutique case study — 3× online reach | Vignesh Growth Lab',
    seoDescription:
      'Custom-coded business website for a Pollachi boutique: pre-filled WhatsApp order buttons on every product, GA4, local JSON-LD schema — 3× online reach.',
    location: 'Pollachi, Tamil Nadu',
    projectType: 'Business Website',
    technology: 'HTML / JS / CSS',
    summary:
      'A custom-coded business website for a Pollachi boutique — pre-filled WhatsApp order buttons on every product, a Summer 20% OFF announcement bar, GA4 and local JSON-LD schema. The site resulted in 3× online reach.',
    challengeKicker: 'Project goal',
    challengeTitle: 'Make every product orderable',
    challenge:
      'Let customers order any product directly on WhatsApp, with analytics and local schema in place for discovery.',
    solutionTitle: 'WhatsApp ordering on every product',
    solution:
      'A hand-coded HTML/JS/CSS site where every product carries a pre-filled WhatsApp order button, plus a Summer 20% OFF announcement bar, GA4 analytics and JSON-LD local schema.',
    delivered: [
      'Pre-filled WhatsApp order buttons on every product',
      'Summer 20% OFF announcement bar',
      'GA4 analytics and JSON-LD local schema',
    ],
    results: [
      { value: '3×', label: 'Online reach' },
      { value: 'Every product', label: 'WhatsApp-orderable' },
      { value: 'GA4', label: 'Analytics and local schema live' },
    ],
    cardImage: '',
    cardImageAlt: 'Rani Sarees & Boutique website screenshot',
    heroImage: '',
    heroImageAlt: 'Rani Sarees & Boutique website, full-width view',
    galleryImages: [],
    galleryCaptions: [],
    gallerySlots: 0,
    videoSrc: '',
    videoPoster: '',
    videoHeading: '',
    videoLabel: '',
    videoTranscript: '',
    videoCaptionsFile: '',
    quote: '',
    quoteAuthor: '',
    testimonialImage: '',
    testimonialImageAlt: '',
    liveUrl: 'https://ranisareesandbotique.com/',
    liveLabel: 'Visit live site',
    relatedServiceRoute: '/services/custom-development',
    waMessage: 'Hi Vignesh, I saw the Rani Sarees & Boutique case study.',
    resultBadge: '3× online reach',
  },
  {
    slug: 'vgl-pos',
    client: 'VGL POS Software',
    pageRoute: '/projects/vgl-pos',
    seoTitle: 'VGL POS case study — 250 concurrent users | Vignesh Growth Lab',
    seoDescription:
      'Flask-based custom retail POS for Tamil Nadu stores: real-time stock and sales tracking, load-tested to 250 concurrent users. Live demo available.',
    location: 'Tamil Nadu',
    projectType: 'Retail POS',
    technology: 'Flask',
    summary:
      'A custom retail POS for Tamil Nadu stores — real-time stock and sales tracking, built with Flask. It passed a 250 concurrent user load test.',
    challengeKicker: 'Project goal',
    challengeTitle: 'Billing that keeps up with the counter',
    challenge:
      'Retail counters need billing, stock and sales visibility in one fast screen — without depending on rented software.',
    solutionTitle: 'A Flask POS built for load',
    solution:
      'A Flask-based POS with real-time stock and sales tracking, validated with a 250 concurrent user load test.',
    delivered: [
      'Real-time stock and sales tracking',
      'Flask-based custom build',
      '250 concurrent user load test passed',
    ],
    results: [
      { value: '250+', label: 'Concurrent users handled' },
      { value: 'Real-time', label: 'Stock and sales tracking' },
      { value: 'Live', label: 'Demo available online' },
    ],
    cardImage: '',
    cardImageAlt: 'VGL POS dashboard screenshot',
    heroImage: '',
    heroImageAlt: 'VGL POS dashboard, full-width view',
    galleryImages: [],
    galleryCaptions: [],
    gallerySlots: 0,
    videoSrc: '',
    videoPoster: '',
    videoHeading: '',
    videoLabel: '',
    videoTranscript: '',
    videoCaptionsFile: '',
    quote: '',
    quoteAuthor: '',
    testimonialImage: '',
    testimonialImageAlt: '',
    liveUrl: 'https://web-production-9375fc.up.railway.app',
    liveLabel: 'Open live demo',
    relatedServiceRoute: '/services/retail-pos-solutions',
    waMessage: 'Hi Vignesh, I saw the VGL POS case study.',
    resultBadge: '250+ concurrent users',
  },
  {
    slug: 'ai-whatsapp-automation',
    client: 'AI WhatsApp Automations',
    pageRoute: '/projects/ai-whatsapp-automation',
    seoTitle: 'AI WhatsApp Automation case study — 100+ leads daily | Vignesh Growth Lab',
    seoDescription:
      'Lead routing system on n8n + Gemini AI: auto-classifies and routes 100+ leads daily to Google Sheets and WhatsApp. Watch the workflow demonstration.',
    location: 'Tamil Nadu',
    projectType: 'AI Automation',
    technology: 'n8n + Gemini AI',
    summary:
      'A lead routing system built on n8n and Gemini AI — it auto-classifies and routes 100+ leads daily directly to Google Sheets and WhatsApp.',
    challengeKicker: 'Project goal',
    challengeTitle: 'Route every lead automatically',
    challenge:
      'Classify incoming enquiries and deliver each one to the right place — without a person sorting them by hand.',
    solutionTitle: 'n8n + Gemini doing the sorting',
    solution:
      'An n8n workflow with Gemini AI classification: each incoming lead is categorised and routed to Google Sheets for logging and to WhatsApp for immediate follow-up.',
    delivered: [
      'AI classification of incoming leads',
      'Automatic logging to Google Sheets',
      'Instant routing to WhatsApp',
    ],
    results: [
      { value: '100+', label: 'Leads routed daily' },
      { value: '2', label: 'Destinations: Sheets + WhatsApp' },
      { value: 'Auto', label: 'Classification via Gemini AI' },
    ],
    cardImage: '',
    cardImageAlt: 'n8n workflow overview',
    heroImage: '',
    heroImageAlt: 'n8n WhatsApp automation workflow, full-width view',
    // Real screenshots pending → gallery stays hidden; production paths will be
    // /images/workflow/n8n-workflow-1..4.webp when supplied.
    galleryImages: [],
    galleryCaptions: [
      'n8n workflow — full canvas overview',
      'n8n workflow — lead classification nodes',
      'n8n workflow — Google Sheets logging step',
      'n8n workflow — WhatsApp routing step',
    ],
    gallerySlots: 4,
    videoSrc: '/videos/n8n-workflow.mp4',
    videoPoster: '',
    videoHeading: 'Workflow demonstration',
    videoLabel: 'Screen recording of the n8n WhatsApp lead-routing workflow running',
    videoTranscript: '',
    videoCaptionsFile: '',
    quote: '',
    quoteAuthor: '',
    testimonialImage: '',
    testimonialImageAlt: '',
    liveUrl: '',
    liveLabel: '',
    relatedServiceRoute: '/services/whatsapp-ai-automation',
    waMessage: 'Hi Vignesh, I saw the AI WhatsApp automation case study.',
    resultBadge: '100+ leads daily',
  },
];

export const getProject = (slug: string): Project | undefined => PROJECTS.find((p) => p.slug === slug);
