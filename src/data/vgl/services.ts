/**
 * Service route → content matrix.
 * Ported verbatim from design-reference/.../project/service-routes.js.
 * Icons are Iconify names in the Phosphor (`ph:`) set — except the WordPress
 * logo, which @iconify-json/ph does not ship (the design's Phosphor web font
 * has it); `tabler:brand-wordpress` renders the same glyph.
 * Canonical/OG URLs are derived at render time from the configured site URL —
 * never stored here.
 */

export interface ServiceFeature {
  icon: string;
  title: string;
  copy: string;
}

export interface RelatedProject {
  name: string;
  type: string;
  location: string;
  copy: string;
  result: string;
  caseRoute: string;
  liveUrl: string;
}

export interface Service {
  slug: string;
  serviceName: string;
  pageRoute: string;
  seoTitle: string;
  seoDescription: string;
  heroStatement: string;
  outcome: string;
  whoItIsFor: string;
  quickProof: string;
  features: ServiceFeature[];
  technologies: string[];
  /** Only website-development carries a price; others are intentionally blank. */
  startingPrice: string;
  related: RelatedProject;
  ctaHeading: string;
  waMessage: string;
  heroImage: string;
  heroImageAlt: string;
}

export const SERVICES: Service[] = [
  {
    slug: 'website-development',
    serviceName: 'Website Development',
    pageRoute: '/services/website-development',
    seoTitle: 'Website Development in Tamil Nadu — Vignesh Growth Lab',
    seoDescription:
      'Fast, SEO-ready business and e-commerce websites for Tamil Nadu businesses. WordPress or custom builds, GA4, ~2 week average delivery, 100% ownership.',
    heroStatement:
      'Fast, SEO-ready business and e-commerce websites that show up on Google, load quickly on mobile, and turn visitors into WhatsApp enquiries.',
    outcome: 'More enquiries from Google and social — without paying monthly platform fees.',
    whoItIsFor: 'Boutiques, retail stores and local brands that need to be found — and ordered from — online.',
    quickProof: 'NextGen Toys recorded its first online sale within 72 hours of launch.',
    features: [
      {
        icon: 'tabler:brand-wordpress',
        title: 'WordPress or custom build',
        copy: 'The right platform for your budget — never a bloated template.',
      },
      {
        icon: 'ph:shopping-cart',
        title: 'E-commerce ready',
        copy: 'Product catalogue, orders and payments when you need them.',
      },
      {
        icon: 'ph:device-mobile',
        title: 'Responsive UI',
        copy: 'Designed mobile-first — most of your customers are on phones.',
      },
      {
        icon: 'ph:magnifying-glass',
        title: 'SEO ready',
        copy: 'Semantic markup, local schema and clean URLs from day one.',
      },
      {
        icon: 'ph:lightning',
        title: 'Fast loading',
        copy: 'Optimised for Core Web Vitals — speed is a ranking factor.',
      },
      {
        icon: 'ph:chart-line-up',
        title: 'Google Analytics',
        copy: 'GA4 wired in so you can see exactly where enquiries come from.',
      },
    ],
    technologies: ['WordPress', 'E-Commerce', 'Responsive UI', 'SEO Ready', 'Fast Loading', 'Google Analytics'],
    startingPrice: 'Starting at ₹8,000',
    related: {
      name: 'NextGen Toys',
      type: 'E-Commerce Store',
      location: 'Coimbatore',
      copy: 'WordPress store with a full RC-car and drone catalogue and 650+ Google Reviews embedded.',
      result: 'First online sale within 72 hours of launch',
      caseRoute: '/projects/nextgen-toys',
      liveUrl: 'https://nextgentoys.in/',
    },
    ctaHeading: 'Ready to get your business online?',
    waMessage: "Hi Vignesh, I'm interested in website development.",
    heroImage: '/images/project-nextgen.webp',
    heroImageAlt: 'Website development project preview',
  },
  {
    slug: 'custom-development',
    serviceName: 'Custom Development',
    pageRoute: '/services/custom-development',
    seoTitle: 'Custom Web Application Development — Vignesh Growth Lab',
    seoDescription:
      'Hand-coded web applications and API integrations for Tamil Nadu businesses. HTML, CSS, JavaScript and GitHub-managed code — built exactly for your workflow.',
    heroStatement:
      "Hand-coded web applications and API integrations when a template won't cut it — built exactly for your workflow.",
    outcome: 'Software shaped around how your business already works.',
    whoItIsFor: "Businesses with a specific flow — like WhatsApp ordering on every product — that platforms can't do.",
    quickProof: 'Rani Sarees & Boutique achieved 3× online reach.',
    features: [
      {
        icon: 'ph:file-html',
        title: 'HTML, CSS & JavaScript',
        copy: 'Lightweight hand-coded pages — no plugin bloat, no page builders.',
      },
      {
        icon: 'ph:app-window',
        title: 'Web applications',
        copy: 'Interactive tools and flows built around your exact process.',
      },
      {
        icon: 'ph:plugs-connected',
        title: 'API integrations',
        copy: 'Connect your site to WhatsApp, payments, sheets and more.',
      },
      {
        icon: 'ph:github-logo',
        title: 'GitHub-managed code',
        copy: 'Versioned, documented code you fully own and can hand to anyone.',
      },
      {
        icon: 'ph:whatsapp-logo',
        title: 'WhatsApp-first features',
        copy: 'Pre-filled order buttons and enquiry flows on any element.',
      },
      {
        icon: 'ph:chart-line-up',
        title: 'Analytics & schema',
        copy: 'GA4 and JSON-LD local schema wired in from the start.',
      },
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Web Applications', 'API Integrations', 'GitHub'],
    startingPrice: '',
    related: {
      name: 'Rani Sarees & Boutique',
      type: 'Business Website',
      location: 'Pollachi',
      copy: 'Custom-coded HTML/JS/CSS site with pre-filled WhatsApp order buttons on every product, GA4 and local JSON-LD schema.',
      result: '3× online reach',
      caseRoute: '/projects/rani-sarees',
      liveUrl: 'https://ranisareesandbotique.com/',
    },
    ctaHeading: 'Have a workflow no template can handle?',
    waMessage: "Hi Vignesh, I'm interested in custom development.",
    heroImage: '/images/project-rani.webp',
    heroImageAlt: 'Custom development project preview',
  },
  {
    slug: 'retail-pos-solutions',
    serviceName: 'Retail POS Solutions',
    pageRoute: '/services/retail-pos-solutions',
    seoTitle: 'Retail POS Software for Tamil Nadu Stores — Vignesh Growth Lab',
    seoDescription:
      'Custom billing software with inventory, reports, bilingual English–Tamil UI and WhatsApp digital receipts. Flask-based, load-tested to 600 concurrent clients under 300ms.',
    heroStatement:
      'Custom billing software with inventory, reports, customer management and thermal receipt printing — running on your hardware, with your data.',
    outcome: 'Billing, stock and reports in one place — owned by you, not rented.',
    whoItIsFor:
      'Retail stores that want billing, stock and reports in one place — on their own hardware, with their own data.',
    quickProof: 'VGL POS load-tested to 600 concurrent clients at under 300ms.',
    features: [
      {
        icon: 'ph:receipt',
        title: 'Custom billing (Flask)',
        copy: 'A billing screen shaped around how your counter actually works.',
      },
      {
        icon: 'ph:package',
        title: 'Inventory management',
        copy: 'Real-time stock levels that update with every sale.',
      },
      { icon: 'ph:chart-bar', title: 'Reports', copy: 'Daily, weekly and monthly sales views at a glance.' },
      {
        icon: 'ph:users',
        title: 'Customer management',
        copy: 'Track repeat customers and their purchase history.',
      },
      {
        icon: 'ph:hard-drives',
        title: 'Local database',
        copy: 'Your data stays on your machine — works even when the internet is down.',
      },
      {
        icon: 'ph:printer',
        title: 'Thermal receipt integration',
        copy: 'Prints to standard thermal receipt printers out of the box.',
      },
    ],
    technologies: [
      'Custom Billing (Flask)',
      'Inventory',
      'Reports',
      'Customer Management',
      'Local Database',
      'Thermal Receipts',
    ],
    startingPrice: '',
    related: {
      name: 'VGL POS Software',
      type: 'Retail POS',
      location: 'Tamil Nadu',
      copy: 'Custom retail POS with real-time stock and sales tracking.',
      result: 'Load-tested to 600 concurrent clients at <300ms',
      caseRoute: '/projects/vgl-pos',
      liveUrl: 'https://pos-project-li2v.onrender.com/',
    },
    ctaHeading: 'Ready to speed up your counter?',
    waMessage: "Hi Vignesh, I'm interested in retail POS software.",
    heroImage: '/images/project-pos.webp',
    heroImageAlt: 'Retail POS dashboard preview',
  },
  {
    slug: 'whatsapp-ai-automation',
    serviceName: 'WhatsApp AI Automation',
    pageRoute: '/services/whatsapp-ai-automation',
    seoTitle: 'WhatsApp AI Automation & Chatbots — Vignesh Growth Lab',
    seoDescription:
      'AI chatbots, lead capture and follow-up workflows on n8n with Gemini/GPT. Route 100+ leads daily to Google Sheets and WhatsApp automatically.',
    heroStatement:
      'AI chatbots and workflows that capture leads, follow up automatically and route every enquiry where it belongs.',
    outcome: 'Reduce missed leads with automatic capture and routing.',
    whoItIsFor: 'Gyms, boutiques and stores handling a steady stream of WhatsApp enquiries — including after hours.',
    quickProof: 'The workflow routes 100+ leads daily to Google Sheets and WhatsApp.',
    features: [
      {
        icon: 'ph:robot',
        title: 'AI chatbots',
        copy: 'Gemini / GPT-powered replies that understand real customer questions.',
      },
      {
        icon: 'ph:funnel',
        title: 'Lead capture',
        copy: 'Every enquiry logged automatically — nothing lives only in a chat.',
      },
      {
        icon: 'ph:flow-arrow',
        title: 'Automation workflows',
        copy: 'n8n flows that classify and route each lead where it belongs.',
      },
      {
        icon: 'ph:arrow-u-up-right',
        title: 'Follow-up systems',
        copy: 'Automatic follow-ups so warm leads are not forgotten.',
      },
      {
        icon: 'ph:google-logo',
        title: 'Google Sheets logging',
        copy: 'A live sheet of every lead, its category and its status.',
      },
      {
        icon: 'ph:whatsapp-logo',
        title: 'WhatsApp delivery',
        copy: 'Qualified leads land directly on your phone, pre-classified.',
      },
    ],
    technologies: ['AI Chatbots', 'Lead Capture', 'Workflows', 'Follow-Up Systems', 'Gemini / GPT AI', 'n8n Engine'],
    startingPrice: '',
    related: {
      name: 'AI WhatsApp Automations',
      type: 'AI Automation',
      location: 'Tamil Nadu',
      copy: 'Lead routing system on n8n + Gemini AI — auto-classifies and routes enquiries to Google Sheets and WhatsApp.',
      result: 'Routes 100+ leads daily',
      caseRoute: '/projects/ai-whatsapp-automation',
      liveUrl: '',
    },
    ctaHeading: 'Losing enquiries in your WhatsApp inbox?',
    waMessage: "Hi Vignesh, I'm interested in WhatsApp AI automation.",
    heroImage: '/images/project-ai-automation.webp',
    heroImageAlt: 'WhatsApp automation workflow preview',
  },
];

export const getService = (slug: string): Service | undefined => SERVICES.find((s) => s.slug === slug);
