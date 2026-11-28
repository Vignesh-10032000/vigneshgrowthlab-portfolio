import { pages } from '../data/marketingPages';

const MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;
const ORIGIN = 'https://vigneshgrowthlab.dev';
const DISABLE_KEY = 'ga-disable-' + MEASUREMENT_ID;
export const ANALYTICS_CHOICE_KEY = 'vgl:analytics-choice';

const denied = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
};
const granted = { ...denied, analytics_storage: 'granted' };
const watchedPages = new Map([
  ['/pricing/', ['pricing_view']],
  ...pages.flatMap(page => {
    if (page.kind === 'service') return [[page.path, ['service_view', { service_id: page.slug }]]];
    if (page.kind === 'project') return [[page.path, ['case_study_view', { project_id: page.project.id }]]];
    return [];
  }),
]);
const publicPaths = new Set(['/', ...pages.map(page => page.path)]);
const interactions = new Map([
  ['whatsapp_click', ['whatsapp_click']],
  ['enquiry_whatsapp_handoff', ['project_enquiry']],
  ['phone_click', ['contact_click', { contact_method: 'phone' }]],
  ['email_click', ['contact_click', { contact_method: 'email' }]],
  ['enquiry_click', ['contact_click', { contact_method: 'contact_section' }]],
]);
const pageContext = () => ({
  page_location: ORIGIN + window.location.pathname,
  page_referrer: '',
});

let tag;
let tagFailed = false;
let pageViewSent = false;

export function portfolioCategoryId(category) {
  return category.toLowerCase().replaceAll(' ', '-');
}

export function isAnalyticsAvailable() {
  return import.meta.env.PROD && import.meta.env.VITE_GA4_ENABLED === 'true'
    && typeof MEASUREMENT_ID === 'string' && /^G-[A-Z0-9]+$/.test(MEASUREMENT_ID)
    && typeof window !== 'undefined' && window.location.origin === ORIGIN && publicPaths.has(window.location.pathname);
}

function readChoice(storageName) {
  try {
    const choice = window[storageName].getItem(ANALYTICS_CHOICE_KEY);
    return choice === 'allow' || choice === 'deny' ? choice : null;
  } catch {
    return null;
  }
}

export function readAnalyticsChoice() {
  return readChoice('sessionStorage') ?? readChoice('localStorage');
}

export function saveAnalyticsChoice(choice) {
  try {
    window.localStorage.setItem(ANALYTICS_CHOICE_KEY, choice);
  } catch {
    try {
      window.sessionStorage.setItem(ANALYTICS_CHOICE_KEY, choice);
      return true;
    } catch {
      return false;
    }
  }
  try {
    window.sessionStorage.removeItem(ANALYTICS_CHOICE_KEY);
  } catch {
    // Tab storage may be unavailable even when local storage is writable.
  }
  return true;
}

function sendEvent(name, parameters) {
  tag('event', name, { ...pageContext(), send_to: MEASUREMENT_ID, ...parameters });
}

export function applyAnalyticsChoice(choice, persisted = true) {
  if (!isAnalyticsAvailable()) return;

  const disabled = choice !== 'allow';
  const wasDisabled = window[DISABLE_KEY];
  window[DISABLE_KEY] = disabled;

  if (disabled) {
    for (const name of ['_ga', '_ga_' + MEASUREMENT_ID.slice(2)]) {
      const expired = name + '=; Max-Age=0; Path=/; Secure; SameSite=Lax';
      document.cookie = expired;
      document.cookie = expired + '; Domain=' + window.location.hostname;
    }
    // Unload the tag without sending a consent ping. Reload only if the choice survived storage.
    if (tag && !wasDisabled && persisted) window.location.reload();
    return;
  }

  if (!tag) {
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
    sendEvent('page_view');
    const view = watchedPages.get(window.location.pathname);
    if (view) sendEvent(...view);
  }
}

export function trackAnalyticsConversion(event) {
  if (!tag || tagFailed || window[DISABLE_KEY] || !isAnalyticsAvailable()) return;
  const interaction = interactions.get(event.detail?.action);
  if (interaction) sendEvent(...interaction);
}
