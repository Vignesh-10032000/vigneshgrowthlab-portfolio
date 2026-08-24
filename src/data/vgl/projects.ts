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

/** "Smart card" for a workflow screenshot — image plus a plain-language explainer. */
export interface WorkflowCard {
  src: string;
  alt: string;
  title: string;
  blurb: string;
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
  /** Annotated workflow screenshots (AI automation only); empty collapses the section. */
  workflowCards: WorkflowCard[];
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
    cardImage: '/images/project-nextgen.webp',
    cardImageAlt: 'NextGen Toys storefront screenshot',
    heroImage: '/images/project-nextgen.webp',
    heroImageAlt: 'NextGen Toys online store, full-width view',
    galleryImages: [],
    galleryCaptions: [],
    gallerySlots: 0,
    workflowCards: [],
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
    cardImage: '/images/project-rani.webp',
    cardImageAlt: 'Rani Sarees & Boutique website screenshot',
    heroImage: '/images/project-rani.webp',
    heroImageAlt: 'Rani Sarees & Boutique website, full-width view',
    galleryImages: [],
    galleryCaptions: [],
    gallerySlots: 0,
    workflowCards: [],
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
    seoTitle: 'VGL POS case study — bilingual billing, 600 concurrent users | Vignesh Growth Lab',
    seoDescription:
      'Flask-based bilingual (English ↔ Tamil) retail POS for Tamil Nadu grocery and apparel stores: inventory, WhatsApp digital receipts and EOD day-close, load-tested to 600 concurrent clients under 300ms. Live demo available.',
    location: 'Tamil Nadu',
    projectType: 'Retail POS',
    technology: 'Flask',
    summary:
      'A bilingual (English ↔ Tamil) retail POS for Tamil Nadu grocery stores and apparel showrooms — billing, inventory and sales reporting in one fast screen, with automated WhatsApp digital receipts. Load-tested to 600 concurrent clients at under 300ms average response.',
    challengeKicker: 'Project goal',
    challengeTitle: 'Billing that keeps up with the counter',
    challenge:
      'Busy grocery and apparel counters need billing, inventory and sales visibility in one fast screen — in both Tamil and English — without depending on rented software.',
    solutionTitle: 'A bilingual Flask POS built for load',
    solution:
      'A Flask-based POS with a fully bilingual interface (English ↔ Tamil across the UI and printed receipts), real-time inventory and sales tracking, automated WhatsApp digital receipts, and an end-of-day Day-Close summary that splits takings by Cash, UPI and Card. Load-tested to 600 concurrent clients while holding average response times under 300ms.',
    delivered: [
      '100% bilingual interface — English ↔ Tamil across the UI and receipts',
      'Automated WhatsApp digital receipts sent to customers',
      'EOD Day-Close summary split by Cash, UPI and Card',
      'Real-time inventory and sales reporting',
      'Load-tested to 600 concurrent clients at under 300ms',
    ],
    results: [
      { value: '600', label: 'Concurrent clients load-tested' },
      { value: '<300ms', label: 'Average response time' },
      { value: 'Bilingual', label: 'English ↔ Tamil UI and receipts' },
    ],
    cardImage: '/images/project-pos.webp',
    cardImageAlt: 'VGL POS bilingual dashboard screenshot',
    heroImage: '/images/project-pos.webp',
    heroImageAlt: 'VGL POS bilingual dashboard, full-width view',
    galleryImages: [],
    galleryCaptions: [],
    gallerySlots: 0,
    workflowCards: [],
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
    liveUrl: 'https://pos-project-li2v.onrender.com/',
    liveLabel: 'Open live demo',
    relatedServiceRoute: '/services/retail-pos-solutions',
    waMessage: 'Hi Vignesh, I saw the VGL POS case study.',
    resultBadge: '600 concurrent clients',
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
      'An end-to-end n8n workflow with Gemini AI: each incoming WhatsApp enquiry is understood, answered in under 5 seconds, and logged straight into Google Sheets as a CRM record — 24/7, with zero human input. A second engine scrapes and scores new business leads and routes them into tiered outreach automatically.',
    delivered: [
      'AI replies to every enquiry in under 5 seconds, 24/7',
      'Gemini AI parses and classifies each conversation',
      'Every lead logged straight into Google Sheets (CRM)',
      'Instant routing to WhatsApp for follow-up',
    ],
    results: [
      { value: '100+', label: 'Leads routed daily' },
      { value: '<5s', label: 'AI reply, any time of day' },
      { value: '24/7', label: 'Automated — zero human input' },
    ],
    cardImage: '/images/project-ai-automation.webp',
    cardImageAlt: 'n8n workflow overview',
    heroImage: '/images/project-ai-automation.webp',
    heroImageAlt: 'n8n WhatsApp automation workflow, full-width view',
    // The generic gallery stays unused; the two real workflows render as
    // annotated "smart cards" via workflowCards below.
    galleryImages: [],
    galleryCaptions: [],
    gallerySlots: 0,
    workflowCards: [
      {
        src: '/images/workflow/whatsapp-ai-flow.webp',
        alt: 'n8n workflow: WhatsApp trigger, Gemini AI reply, Google Sheets logging and WhatsApp send',
        title: 'WhatsApp reply & CRM logging',
        blurb:
          'A WhatsApp message triggers the flow, Gemini drafts the reply, the enquiry is appended to a Google Sheet as a CRM record, and the answer is sent back — in under 5 seconds, with no human in the loop.',
      },
      {
        src: '/images/workflow/lead-acquisition-engine.webp',
        alt: 'n8n workflow: daily cron scraping Google Maps leads, scoring them and routing to tiered outreach',
        title: 'Lead acquisition & scoring engine',
        blurb:
          'A daily job pulls and formats business leads from Google Maps, scores each one, checks whether they already have a website, then routes them into tiered WhatsApp and email outreach automatically.',
      },
      {
        src: '/images/workflow/booking-notifications.webp',
        alt: 'n8n workflow: restaurant booking webhook, validation and storage, instant notification and a sorted daily summary',
        title: 'Restaurant booking notifications',
        blurb:
          'A booking hits a webhook, gets validated and stored, and an instant confirmation goes out — while a scheduled morning job compiles every booking into a sorted daily summary for the front desk.',
      },
    ],
    videoSrc: '/videos/n8n-workflow.mp4',
    videoPoster: '/images/n8n-workflow-poster.webp',
    videoHeading: 'Workflow demonstration',
    videoLabel:
      'Vignesh walks through the AI WhatsApp automation — how enquiries are captured, answered by Gemini AI and logged automatically.',
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
