import { useEffect } from 'react';
import { BRAND, CONTACT } from '../data/portfolioData';
import { projects, projectPath } from '../data/projects';
import { services, servicePath, policyPages } from '../data/marketingPages';
import AnalyticsConsent from './AnalyticsConsent';
import ProjectImage from './ProjectImage';
import { waLink } from '../utils/whatsapp';
import { trackContactLink } from '../utils/conversions';

function ProjectLinks({ entries }) {
  return <ul>{entries.map(project =>
    <li key={project.id}><a href={projectPath(project)}>{project.title}</a> · {project.classification}<p>{project.shortDesc}</p></li>
  )}</ul>;
}

export default function MarketingPage({ page }) {
  useEffect(() => {
    document.addEventListener('click', trackContactLink);
    return () => document.removeEventListener('click', trackContactLink);
  }, []);
  const related = projects.filter(project => project.service === page.slug ||
    (page.slug === 'pos-billing-software' && project.id === 'restaurant-android-pos'));
  const project = page.project;
  const serviceLinks = {
    'pos-billing-software': ['android-app-development', 'custom-software'],
    'website-development': ['e-commerce-development', 'whatsapp-automation'],
    'custom-software': ['erp-development', 'crm-development'],
    'erp-development': ['custom-software', 'crm-development'],
    'crm-development': ['erp-development', 'whatsapp-automation'],
    'whatsapp-automation': ['ai-workflow-automation', 'crm-development'],
    'android-app-development': ['pos-billing-software', 'custom-software'],
    'e-commerce-development': ['website-development', 'whatsapp-automation'],
    'ai-workflow-automation': ['whatsapp-automation', 'custom-software'],
  };
  const relatedServices = services.filter(service => serviceLinks[page.slug]?.includes(service.slug));
  return <div className="marketing-page">
    <a className="skip-content" href="#main">Skip to content</a>
    <header><a href="/"><img src="/brand/vgl-logo-mark.png" width="40" height="40" alt="" />{BRAND.name}</a>
      <nav aria-label="Main"><a href="/#services">Services</a><a href="/projects/">Projects</a><a href="/pricing/">Pricing</a></nav>
    </header>
    <main id="main">
      <nav aria-label="Breadcrumb"><a href="/">Home</a> / {project && <><a href="/projects/">Projects</a> / </>}<span aria-current="page">{page.name}</span></nav>
      <h1>{page.name}</h1>
      {project && <p>{project.classification} · {project.platform}</p>}
      <p className="intro">{page.intro}</p>
      {project?.photo && <figure><ProjectImage project={project} sizes="(max-width: 800px) 95vw, 760px" /></figure>}
      {page.kind === 'portfolio' && <ProjectLinks entries={projects} />}
      {page.facts && <dl className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-4 gap-y-3 py-4">
        {page.facts.map(([label, value]) => <div key={label} className="contents"><dt className="font-semibold">{label}</dt><dd>{value}</dd></div>)}
      </dl>}
      {page.sections?.map(([heading, body]) => <section key={heading}><h2>{heading}</h2><p>{body}</p></section>)}
      {!!related.length && <section><h2>See the work</h2><ProjectLinks entries={related} /></section>}
      {!!relatedServices.length && <section><h2>Related services</h2><ul>{relatedServices.map(service =>
        <li key={service.slug}><a href={servicePath(service.slug)}>{service.name}</a></li>
      )}</ul><a href="/pricing/">See pricing and quotation details</a></section>}
      {project && <section><h2>Project links</h2>
        <a href={servicePath(project.service)}>{services.find(s => s.slug === project.service).name}</a>
        {project.url && <p><a href={project.url} rel="noreferrer">{'Visit ' + project.title}</a></p>}
        {project.enquiry && <p><a href={waLink('Hi Vignesh, I’d like to request a demo of ' + project.title + '.')} rel="noreferrer">{project.enquiry}</a></p>}
      </section>}
      {page.links && <section><h2>Further information</h2><ul>{page.links.map(([label, url]) => <li key={url}><a href={url}>{label}</a></li>)}</ul></section>}
      <section><h2>Contact Vignesh Growth Lab</h2>
        <p>{BRAND.founder} · {CONTACT.location}, India. Remote work and scheduled on-site service.</p>
        <p><a href={'mailto:' + CONTACT.email}>{CONTACT.email}</a> · <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a> · <a href={waLink()}>WhatsApp</a></p>
        <a href="/#contact">Discuss your requirements</a>
      </section>
    </main>
    <footer><nav aria-label="Policies">{policyPages.map(p => <a key={p.path} href={p.path}>{p.name}</a>)}</nav>
      <AnalyticsConsent />
    </footer>
  </div>;
}
