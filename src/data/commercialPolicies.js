import { BRAND, CONTACT } from './portfolioData.js';

export const commercialPolicies = [
  {
    path: '/terms-and-conditions/', name: 'Terms and conditions',
    intro: 'These terms describe how Vignesh Growth Lab agrees, delivers and supports software and website projects.',
    sections: [
      ['When a project starts', 'Browsing the site or making an enquiry does not create a paid contract. A service engagement starts through an accepted quotation, agreement, order confirmation or other mutually agreed arrangement.'],
      ['Scope, changes and acceptance', 'The agreed quotation defines the deliverables, inclusions, exclusions, price, milestones, estimated schedule, hosting, integrations, support, warranty and software rights. VGL quotes out-of-scope work separately and obtains approval before starting chargeable changes. Deployment, installation, app packages, configuration, documentation, training and source code are delivered as agreed. Acceptance follows the agreed criteria and applicable build, installation and functional checks.'],
      ['Client responsibilities', 'Provide accurate requirements, authorised materials and lawful access. Review milestones, maintain agreed subscriptions and backups, pay on the agreed terms and use the software lawfully.'],
      ['Acceptable use', 'Prohibited uses include fraud, unlawful activity, unauthorised access or personal-data collection, spam or prohibited bulk messaging, malware, intellectual-property infringement and violations of platform rules or applicable law. Restrictions or termination for unlawful or material abuse follow the agreement and law, including agreed safeguards.'],
      ['Confidentiality and client records', 'VGL uses confidential client records, databases, credentials, financial information, strategies, code and internal documents for authorised project purposes. VGL restricts access and avoids unauthorised disclosure, subject to lawful disclosure requirements. An NDA or data-processing agreement can apply where needed. Use synthetic records in testing and keep raw client records and secrets out of public code, analytics, screenshots and marketing.'],
      ['Third-party services', 'Hosting, messaging, AI and payment providers can change availability, prices, approvals and policies. VGL may assist with integration and approvals. VGL remains responsible for its own contractual and integration obligations.'],
      ['Payment and disputes', 'The agreed payment milestones apply. Eligible engagements retain the delayed-payment protections under the MSMED Act. Contact VGL first to try to resolve a dispute in good faith. If unresolved, use an appropriate legal or mutually agreed process. Indian law governs. Competent courts or authorities in Coimbatore District may hear a dispute where mandatory jurisdiction and valid contractual arrangements permit. Statutory consumer and MSME remedies remain available where applicable.'],
      ['Changes to these terms', 'Website policy updates do not automatically change an accepted contract. Review the applicable agreement and any changes you have accepted.'],
    ],
    links: [['Pricing and payments', '/pricing/'], ['MSME registration and delayed payments', '/msme/'], ['Refund and cancellation', '/refund-policy/'], ['Warranty and support', '/support-policy/'], ['Licensing and ownership', '/software-licensing/'], ['Disclaimer and liability', '/disclaimer/'], ['Privacy and grievances', '/privacy-policy/']],
  },
  {
    path: '/refund-policy/', name: 'Refund and cancellation policy',
    intro: 'Refunds and cancellations follow the accepted agreement and applicable law. The stage of delivery and authorised costs determine the eligible balance.',
    sections: [
      ['Before development', 'VGL reviews the advance against authorised expenses and work already performed and refunds any eligible balance.'],
      ['During development', 'The review considers completed work, approved milestones, authorised third-party purchases and reasonable agreed nonrecoverable costs. Refunds cover the eligible unused balance under the agreement and applicable law.'],
      ['After delivery or VGL cancellation', 'A change of mind after completion and acceptance does not automatically qualify for a refund. Remedies for defects, material non-delivery, breach and statutory rights remain available. If VGL cancels without fault by the customer, VGL refunds the appropriate amount for undelivered work.'],
      ['Provider costs and subscriptions', 'Third-party costs are nonrefundable only to the extent allowed by provider rules and the authorised agreement. VGL accounts fairly for recoverable amounts. Subscription renewal, cancellation, end of access, data export and refund arrangements are disclosed before purchase.'],
      ['Request a refund', 'Email ' + CONTACT.email + ' with the quotation or invoice reference. Approved refunds use the original payment method where practical or an agreed alternative. Timing depends on the circumstances, provider and applicable law. Mandatory consumer rights apply.'],
    ],
    links: [['Terms and conditions', '/terms-and-conditions/'], ['Pricing and payments', '/pricing/']],
  },
  {
    path: '/support-policy/', name: 'Warranty, maintenance and support',
    intro: 'Your accepted quotation describes the warranty, support, hosting and maintenance applicable to your project.',
    sections: [
      ['Bug-fix warranty', 'Eligible projects include a three-month bug-fix warranty where expressly agreed, beginning at the agreed delivery or acceptance date. It covers reproducible defects in agreed features, including implementation-caused calculation errors, functional failures and in-scope integration defects.'],
      ['Warranty scope', 'New features, changed requirements, unauthorised changes, hardware failures, customer-caused corruption, misuse, post-delivery OS or API changes and independent provider outages fall outside the bug-fix warranty. VGL remains responsible for its own defects and applicable statutory remedies.'],
      ['Maintenance and support', 'VGL can quote an annual maintenance contract separately after warranty. Agreed support may include updates, minor fixes, security, compatibility and backup assistance. Major features and redesigns are separately quoted. Remote and scheduled on-site support, travel charges and any emergency response or SLA depend on the agreement. Confirm support availability for your project.'],
      ['Hosting and renewals', 'Hosting may be client-owned, VGL-managed, provided through a third-party cloud or installed offline as agreed. Domain and server renewals are separate unless the quotation includes them. An uptime SLA applies where expressly agreed in writing and supported. Provider pricing and limits can change.'],
      ['Backups and handoff', 'The agreement assigns backup responsibilities. Clients maintain appropriate backups where assigned. Recovery depends on usable backups and VGL’s own obligations. The agreement and applicable law govern end-of-service access, export and deletion. VGL informs clients of available export before permanent deletion where practicable.'],
    ],
    links: [['Terms and conditions', '/terms-and-conditions/'], ['Refund and cancellation policy', '/refund-policy/']],
  },
  {
    path: '/software-licensing/', name: 'Software licensing and ownership',
    intro: 'The accepted agreement sets the rights to custom software, source files and any subscription services.',
    sections: [
      ['Client materials and business data', 'Clients keep their existing rights in supplied logos, trademarks, content, photographs and business documents and must have permission to supply them. Clients retain their rights and control over their original business data, including records, inventory and transactions. Development and hosting leave those rights with the client.'],
      ['Custom software and source code', 'The accepted agreement defines licensing, source-code or repository access and modification rights. A source-code transfer follows the agreed written assignment and delivery terms, subject to payment and applicable law.'],
      ['VGL components and third-party software', 'VGL retains its existing frameworks, reusable components, utilities, libraries, internal tools and methods unless assigned. The client receives the rights agreed for the project. Open-source software remains subject to its original license, including attribution and redistribution requirements.'],
      ['Subscription access', 'A subscription grants access for the applicable period under the agreement. Ownership can transfer through a separately agreed assignment.'],
    ],
    links: [['Terms and conditions', '/terms-and-conditions/'], ['Hosting and support', '/support-policy/']],
  },
  {
    path: '/disclaimer/', name: 'Website and service disclaimer',
    intro: 'Website descriptions, demonstrations and indicative prices provide general information. Accepted agreements set the actual scope and commitments.',
    sections: [
      ['Results and third parties', 'Search rankings, growth in sales or revenue, AI recommendations, third-party availability and approvals, absolute security and compatibility with every device are outside general website promises. Any specific commitment must be expressly agreed and permitted by law.'],
      ['AI and business records', 'Review AI outputs before relying on them. Billing, GST, reporting and analytics tools assist business operations. Use qualified accounting, tax or legal advice where appropriate.'],
      ['Liability and statutory rights', 'The agreement and applicable law govern liability. Where law permits, VGL excludes responsibility for losses caused solely by unauthorised changes, misuse, inaccurate customer input or independent third-party failures outside reasonable control. Liability that law forbids excluding, fraud, deliberate misconduct, mandatory obligations and statutory rights remain protected. VGL’s own contractual duties continue to apply.'],
      ['Questions about services', 'Contact ' + BRAND.name + ' to confirm the scope, supported devices, providers and terms relevant to your project.'],
    ],
    links: [['Terms and conditions', '/terms-and-conditions/'], ['Privacy policy', '/privacy-policy/'], ['Project portfolio', '/projects/']],
  },
];
