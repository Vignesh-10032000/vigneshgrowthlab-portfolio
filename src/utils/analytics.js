import { PROJECT_CATEGORIES, PROJECTS_DATA, SERVICES_WHEEL } from '../data/portfolioData';

import { pages, services } from '../data/marketingPages';

const MEASUREMENT_ID = 'G-FDQ2NEH7L1';
const HOME = 'https://vigneshgrowthlab.dev/';
const DISABLE_KEY = 'ga-disable-' + MEASUREMENT_ID;
export const ANALYTICS_CHOICE_KEY = 'vgl:analytics-choice';

const denied = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
};
const granted = { ...denied, analytics_storage: 'granted' };
const publicPaths = new Set(['/', ...pages.map(page => page.path)]);
const pageContext = () => ({ page_location: new URL(window.location.pathname, HOME).href, page_referrer: '' });
const contactActions = new Set([
  'whatsapp_click', 'phone_click', 'enquiry_click', 'enquiry_whatsapp_handoff',
]);
const serviceIds = new Set([...SERVICES_WHEEL, ...services].map(service => service.slug));
const projectIds = new Set(PROJECTS_DATA.map(project => project.id));
const categoryIds = new Set(PROJECT_CATEGORIES.map(portfolioCategoryId));
const catalogEvents = new Map([
  ['service_select', ['service_id', serviceIds]],
  ['project_open', ['project_id', projectIds]],
  ['project_link_click', ['project_id', projectIds]],
  ['portfolio_filter', ['category_id', categoryIds]],
]);

let tag;
let tagFailed = false;
let pageViewSent = false;

export function portfolioCategoryId(category) {
  return category.toLowerCase().replaceAll(' ', '-');
}

export function isAnalyticsAvailable() {
  return import.meta.env.PROD && import.meta.env.VITE_GA4_ENABLED === 'true'
    && typeof window !== 'undefined' && window.location.origin === new URL(HOME).origin && publicPaths.has(window.location.pathname);
}

export function readAnalyticsChoice() {
  try {
    const choice = window.localStorage.getItem(ANALYTICS_CHOICE_KEY);
    return choice === 'allow' || choice === 'deny' ? choice : null;
  } catch {
    return null;
  }
}

export function saveAnalyticsChoice(choice) {
  try {
    window.localStorage.setItem(ANALYTICS_CHOICE_KEY, choice);
  } catch {
    // The choice still takes effect in this document if storage is unavailable.
  }
}

export function applyAnalyticsChoice(choice) {
  if (!isAnalyticsAvailable()) return;

  const disabled = choice !== 'allow';
  const wasDisabled = window[DISABLE_KEY];
  window[DISABLE_KEY] = disabled;

  if (disabled) {
    for (const name of ['_ga', '_ga_' + MEASUREMENT_ID.slice(2)]) {
      document.cookie = name + '=; Max-Age=0; Path=/; Secure; SameSite=Lax';
    }
    // Unload the running vendor script and its automatic listeners on withdrawal.
    // A consent update sent to a loaded tag could itself trigger a request.
    if (tag && !wasDisabled) window.location.reload();
    return;
  }

  if (!tag) {
    // One owner for the tag and its queue, including with React Strict Mode.
    if (window.gtag || document.querySelector('script[src^="https://www.googletagmanager.com/"]')) return;
    window.dataLayer = window.dataLayer || [];
    tag = window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    tag('consent', 'default', denied);
    tag('consent', 'update', granted);
    tag('js', new Date());
    tag('set', 'url_passthrough', false);
    tag('config', MEASUREMENT_ID, {
      ...pageContext(),
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_domain: 'none',
    });

    const script = document.createElement('script');
    script.async = true;
    script.referrerPolicy = 'no-referrer';
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
    script.addEventListener('error', () => { tagFailed = true; }, { once: true });
    document.head.append(script);
  } else if (wasDisabled) {
    tag('consent', 'update', granted);
  }

  if (!pageViewSent) {
    pageViewSent = true;
    tag('event', 'page_view', { ...pageContext(), send_to: MEASUREMENT_ID });
  }
}

export function trackAnalyticsConversion(event) {
  if (!tag || tagFailed || window[DISABLE_KEY]) return;
  const { action, itemId } = event.detail || {};
  if (contactActions.has(action)) {
    tag('event', action, { ...pageContext(), send_to: MEASUREMENT_ID });
    return;
  }

  const catalog = catalogEvents.get(action);
  if (!catalog) return;
  const [parameter, allowedIds] = catalog;
  if (allowedIds.has(itemId)) {
    tag('event', action, { ...pageContext(), send_to: MEASUREMENT_ID, [parameter]: itemId });
  }
}
