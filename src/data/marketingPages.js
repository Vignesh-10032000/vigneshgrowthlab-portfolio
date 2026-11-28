import { commercialPolicies } from './commercialPolicies.js';
import { BRAND, CONTACT } from './portfolioData.js';
import { projects, projectPath } from './projects.js';

export const services = [
  {
    slug: 'pos-billing-software', name: 'POS and billing software',
    intro: 'Retail POS brings counter billing and stock records into the same workflow. Restaurant billing needs a menu, portion selection and receipt printing.',
    sections: [
      ['Which setup suits my counter?', 'For a shop, start with the product list, stock movements and the reports you need at closing time. For a restaurant, walk through taking an order, holding a bill, splitting a payment and reprinting the receipt.'],
      ['Can billing work offline?', 'The restaurant Android installation stores bills locally in SQLite. For a new installation, confirm the device, printer, backup procedure and restore test in the quotation.'],
      ['What does it cost?', 'Eligible retail configurations start at ₹10,000 one-time or ₹700 per month. Restaurant POS is quoted separately after reviewing the counter workflow.'],
    ],
  },
  {
    slug: 'website-development', name: 'Business website development',
    intro: 'A business landing page gives customers the essentials to make an enquiry. A catalogue adds product pages and a way to ask about a specific item.',
    sections: [
      ['Landing page or catalogue?', 'Choose a landing page for a single offer, service area and contact action. A catalogue suits a shop whose staff confirm sizes, availability or final prices in a conversation.'],
      ['How does WhatsApp ordering work?', 'On the Rani Sarees catalogue, choosing an item opens an enquiry with the boutique. The shopper can confirm the details directly with the shop.'],
      ['What should I prepare?', 'Bring the trading name, contact details, service descriptions and images you have permission to use. Eligible landing pages start at ₹8,000. Catalogue and store builds receive their own quotations.'],
    ],
  },
  {
    slug: 'custom-software', name: 'Custom business software',
    intro: 'Custom software follows a business process such as preparing a quotation and checking available stock before confirming it.',
    sections: [
      ['Where do we start?', 'Walk through one real task using example records with personal details removed. Identify who enters each item, who approves a change and which document or report completes the task.'],
      ['How does this work for a shop?', 'KMS Vision needed quotations and stock management for a CCTV shop. Those two workflows define the scope of its case study.'],
      ['What affects the quotation?', 'Roles, imports, approvals, reports, integration access and installation requirements affect the work. Agree the acceptance examples and support scope before development.'],
    ],
  },
  {
    slug: 'erp-development', name: 'ERP development',
    intro: 'An ERP connects operational records across teams. A useful starting point is the journey of one order from quotation through stock allocation and delivery.',
    sections: [
      ['Which modules should come first?', 'List the steps where staff currently re-enter the same information. Choose the records, approvals and reports needed to complete one workflow before adding other departments.'],
      ['How are permissions and migration agreed?', 'Identify who can create, approve or correct a record. Supply a sanitised sample of the existing format to scope validation, migration checks and reporting. ERP modules and integrations receive a custom quotation.'],
    ],
  },
  {
    slug: 'crm-development', name: 'CRM development',
    intro: 'A CRM helps a team record enquiries, assign follow-ups and see the next action for each customer conversation.',
    sections: [
      ['How is a CRM different from an ERP?', 'CRM work centres on relationships and follow-ups. ERP work centres on operations such as stock, approvals and fulfilment. A quotation can specify a handoff between them.'],
      ['What goes into the first version?', 'Agree the enquiry sources, fields, staff roles and follow-up stages. Specify which staff can export contact information and how opt-outs are recorded before connecting a messaging channel. Pricing depends on this scope.'],
    ],
  },
  {
    slug: 'whatsapp-automation', name: 'WhatsApp and Instagram automation',
    intro: 'Messaging automation can route an incoming enquiry to a team member or trigger an agreed follow-up. The business must have permission for the messages it sends.',
    sections: [
      ['What can be connected?', 'Map the customer’s entry point, the information needed to route the enquiry and the point where a person takes over. Instagram and WhatsApp may need different permissions, templates and account reviews.'],
      ['Does a catalogue need an automation platform?', 'A click-to-chat product link opens WhatsApp for the shopper. Automated outbound messaging is a separate integration with provider rules, fees and opt-in requirements.'],
      ['How is cost agreed?', 'VGL quotes the integration after reviewing the workflow. Messaging charges, API fees and ongoing support are identified separately where applicable.'],
    ],
  },
  {
    slug: 'android-app-development', name: 'Android app development',
    intro: 'A custom Android app can support work at a counter or on a device that may lose connectivity. Device and peripheral requirements shape the design.',
    sections: [
      ['What does offline delivery involve?', 'For a restaurant POS installation, VGL used local SQLite storage, backup and restore, and receipt preview and printing. Synchronisation between devices is a separate requirement to scope.'],
      ['How is an app accepted?', 'Agree the target Android devices, printer models, access roles and example tasks. Test installation, data recovery and the agreed workflow on the target hardware. App development and deployment are quoted per project.'],
    ],
  },
  {
    slug: 'e-commerce-development', name: 'E-commerce website development',
    intro: 'An online store needs product collections, product detail and a clear ordering process. Payment and fulfilment requirements determine the scope.',
    sections: [
      ['How do catalogue and store projects differ?', 'A catalogue can send a product enquiry to staff. An e-commerce brief should also specify variants, stock updates, payment handling, delivery areas, cancellation and order support.'],
      ['What examples can I see?', 'NextGen Toys is an external client store. VELNIRAI is a family-owned saree storefront. Both show how collections guide shoppers through different product ranges.'],
      ['What does a quotation include?', 'Specify the catalogue size, product data, integrations, hosting and ongoing responsibilities. Payment gateway, domain and renewal charges are disclosed where applicable.'],
    ],
  },
  {
    slug: 'ai-workflow-automation', name: 'AI-assisted business workflows',
    intro: 'AI can help classify an enquiry or prepare a draft response for a person to review. Start with one task and a clear rule for handing exceptions to staff.',
    sections: [
      ['What data can be used?', 'Use synthetic examples to define inputs and expected outputs. Agree which provider can receive which fields before connecting any operational data. Keep credentials and private customer records outside test prompts.'],
      ['How is the workflow evaluated?', 'Test representative examples, exceptions and incorrect predictions. Agree human review, failure handling, usage costs and who maintains the integration. Scope and pricing are project-specific.'],
    ],
  },
];

export const policyPages = [
  {
    path: '/pricing/', name: 'Pricing and payments',
    intro: 'Business landing pages start at ₹8,000. Retail POS starts at ₹10,000 one-time or ₹700 per month for eligible basic configurations.',
    sections: [
      ['Which services receive a custom quotation?', 'Restaurant POS, e-commerce, ERP, CRM, Android apps, WhatsApp and Instagram automation, AI workflows and maintenance are quoted by scope.'],
      ['What costs are included?', 'Your quotation identifies the features, installation, integrations and support included. Domains, hosting, messaging, APIs, gateways, app store fees, premium licences, travel, extra modules and renewals are itemised when applicable.'],
      ['When do I pay?', 'The accepted quotation sets the advance, milestones, subscription and maintenance terms for your project. Verify payment instructions directly with VGL before using an agreed UPI or bank transfer. Later public prices do not change an accepted quotation.'],
      ['Is GST charged?', 'VGL is currently unregistered for GST. It issues ordinary invoices or receipts, collects no GST on its own services, and issues no GST tax invoices or input tax credit claims. Clients remain responsible for their own tax settings and obligations when using billing software.'],
    ],
  },
  {
    path: '/privacy-policy/', name: 'Privacy policy',
    intro: 'This notice covers the VGL marketing website and related business enquiries. Client applications may have separate notices and agreements.',
    sections: [
      ['What happens to an enquiry?', 'The form prepares a WhatsApp message in your browser using the details you enter. Opening WhatsApp passes the prepared message to that service. You decide whether to send it. VGL uses received contact details, requirements and correspondence to respond, quote and provide agreed services. An enquiry alone gives no marketing permission.'],
      ['Which providers receive information?', 'Netlify serves the website and can process request details such as IP address and browser information. Google Fonts delivers site fonts. WhatsApp handles the messaging handoff. Following social or client links takes you to those providers. They may process information outside India. VGL does not sell personal data.'],
      ['How is optional measurement handled?', 'On our production website, Google Analytics loads only after you accept optional analytics. It uses analytics cookies and receives the canonical page address without query or fragment, selected interaction types and site catalogue identifiers. We exclude names, email addresses, phone numbers, form fields, enquiry messages and WhatsApp links from analytics events. Advertising consent and personalisation stay off.'],
      ['Client data, security and AI', 'Project access is limited to authorised development, hosting or support purposes. Agree roles, export and deletion in the engagement. Confidential records, credentials and personal data require authorisation and safeguards before use with external AI providers. AI-assisted work needs human review.'],
      ['Retention and rights', 'Business communications, billing and support records are kept as needed for the engagement and applicable obligations. Ask about access, correction, permissible deletion, consent withdrawal or a grievance by emailing '+CONTACT.email+' with the subject Privacy Request. We may need to verify the requester. Required billing records may need to be retained.'],
      ['Questions and grievances', 'Use the contact details below for privacy, billing, complaints, policy questions and support. VGL routes messages to the relevant business contact and makes reasonable efforts to acknowledge and resolve them within applicable statutory or contractual timelines.'],
      ['Children and policy changes', 'This site is intended for business users. VGL does not knowingly seek children’s data for marketing. Material changes to optional processing require notice and renewed consent where applicable.'],
    ],
    links: [['Cookie and analytics settings', '/cookie-policy/'], ['Netlify privacy policy','https://www.netlify.com/privacy/'],['Google privacy policy','https://policies.google.com/privacy'],['WhatsApp privacy policy','https://www.whatsapp.com/legal/privacy-policy']],
  },
  {
    path: '/cookie-policy/', name: 'Cookie and analytics settings',
    intro: 'Optional analytics is off until you accept it. You can browse services and contact VGL with analytics declined.',
    sections: [
      ['What is stored?', 'The browser preference vgl:analytics-choice records your choice in local storage, or temporarily in the current tab if local storage is unavailable. On production, Google Analytics may set first-party _ga and _ga_* cookies only after you accept optional analytics.'],
      ['What is measured?', 'After consent, the site measures page visits, pricing, service and case study views, and selected contact actions. An enquiry event records an attempt to open a prepared WhatsApp message after form validation. These events measure contact intent only. Advertising personalisation stays off.'],
      ['How can I withdraw?', 'Use Cookie Settings in the footer to reject optional analytics. Withdrawal stops new collection and clears accessible site analytics cookies. It does not automatically erase previously collected records. External services apply their own cookie policies.'],
    ],
  },
  {
    path: '/msme/', name: 'MSME registration and payment terms',
    intro: BRAND.name + ' is registered as a Micro Enterprise for 2026–27 under ' + BRAND.msmeId + '. VGL works from the Pollachi region through remote work and scheduled on-site services.',
    facts: [
      ['Enterprise', BRAND.name],
      ['Udyam registration number', BRAND.msmeId],
      ['Classification', 'Micro Enterprise, 2026–27'],
      ['Major activity', 'Services'],
      ['Business commencement', '1 December 2025'],
      ['Udyam registration date', '7 June 2026'],
      ['NIC code', '62012 (Web-page designing)'],
    ],
    sections: [
      ['Which deadline applies?', 'Follow the payment date in the accepted quotation. For eligible supplies under section 15 of the MSMED Act, a written agreed period cannot exceed 45 days from acceptance or deemed acceptance. The appointed-day provisions apply in the absence of a written agreement. A shorter agreed deadline still applies.'],
      ['What happens if payment is late?', 'Where Chapter V applies, sections 16 and 17 provide for recovery of the amount due and compound interest with monthly rests at three times the RBI-notified bank rate. Section 18 provides for reference to the Facilitation Council. Eligibility and registration timing depend on the engagement.'],
    ],
    links: [['MSME Samadhaan', 'https://samadhaan.msme.gov.in/'], ['Terms and conditions', '/terms-and-conditions/']],
  },
  {
    path: '/accessibility/', name: 'Accessibility feedback',
    intro: 'If a page, control or enquiry form is difficult to use, you can contact VGL directly by email or phone.',
    sections: [
      ['Accessibility on this site', 'VGL aims to support responsive layouts, semantic HTML, keyboard navigation, readable contrast, meaningful image alternatives and usable forms. Feedback helps identify barriers and guide improvements.'],
      ['How to report a barrier', 'Include the page address, the task you were trying to complete and, if useful, your browser or assistive technology. Please leave out sensitive client or account details.']],
  },
  ...commercialPolicies,
];

export const servicePath = slug => '/services/' + slug + '/';
export const pages = [
  ...services.map(service => ({ ...service, path: servicePath(service.slug), kind: 'service' })),
  { path: '/projects/', name: 'Project portfolio', intro: 'Explore client installations and websites, a family-owned storefront and VGL’s own retail product.', kind: 'portfolio' },
  ...projects.map(project => ({
    path: projectPath(project), name: project.title, intro: project.shortDesc, kind: 'project', project,
    sections: [['Project brief', project.objective], ['Delivered scope', project.workPerformed.join(' ')]],
  })),
  ...policyPages,
];

export const pageForPath = path => pages.find(page => page.path === path);
