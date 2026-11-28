import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ANALYTICS_CHOICE_KEY,
  applyAnalyticsChoice,
  isAnalyticsAvailable,
  readAnalyticsChoice,
  saveAnalyticsChoice,
  trackAnalyticsConversion,
} from '../utils/analytics';

const buttonStyle = 'rounded-lg border border-white/40 bg-white/5 px-3 py-2 text-sm font-semibold text-white hover:bg-white/15';

export default function AnalyticsConsent() {
  const [ready, setReady] = useState(false);
  const [choice, setChoice] = useState(null);
  const [details, setDetails] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const trigger = useRef(null);
  const heading = useRef(null);

  useEffect(() => {
    if (!isAnalyticsAvailable()) return;

    function syncChoice() {
      const savedChoice = readAnalyticsChoice();
      applyAnalyticsChoice(savedChoice);
      setChoice(savedChoice);
    }

    function handleStorage(event) {
      if (event.key === ANALYTICS_CHOICE_KEY || event.key === null) syncChoice();
    }

    syncChoice();
    setReady(true);
    document.addEventListener('vgl:conversion', trackAnalyticsConversion);
    window.addEventListener('storage', handleStorage);
    return () => {
      document.removeEventListener('vgl:conversion', trackAnalyticsConversion);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  useEffect(() => {
    if (showSettings) heading.current?.focus({ preventScroll: true });
  }, [showSettings]);

  if (!ready) return <a href="/cookie-policy/" className="underline">Cookie Settings</a>;

  const visible = choice === null || showSettings;
  function closeSettings() {
    setDetails(false);
    setShowSettings(false);
    if (showSettings) trigger.current?.focus({ preventScroll: true });
  }

  function choose(nextChoice) {
    const persisted = saveAnalyticsChoice(nextChoice);
    applyAnalyticsChoice(nextChoice, persisted);
    setChoice(nextChoice);
    closeSettings();
  }

  return (
    <>
      <button
        type="button"
        ref={trigger}
        aria-expanded={visible}
        onClick={() => {
          setShowSettings(true);
          if (visible) heading.current?.focus({ preventScroll: true });
        }}
        className="text-white/75 underline underline-offset-4 hover:text-white"
      >
        Cookie Settings
      </button>
      {visible && createPortal(
        <section
          aria-labelledby="analytics-consent-heading"
          className="fixed inset-x-4 bottom-20 z-40 max-h-[60vh] overflow-y-auto rounded-xl border border-white/30 bg-[#141414] p-4 text-white shadow-2xl sm:right-auto sm:max-w-md"
        >
          <h2 id="analytics-consent-heading" ref={heading} tabIndex={-1} className="text-base font-bold">
            Optional analytics
          </h2>
          <p className="my-2 text-sm leading-relaxed text-white/80">
            With your permission, Google Analytics uses cookies to measure page views and interactions
            with this website. We send page and interaction types and site catalog IDs. Enquiry
            details go to WhatsApp when you open the prepared message. You can change your analytics
            choice in the footer. <a href="/cookie-policy/" className="underline">About these settings</a>.
          </p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className={buttonStyle} onClick={() => choose('allow')}>Accept Analytics</button>
            <button type="button" className={buttonStyle} onClick={() => choose('deny')}>Reject Optional</button>
            <button type="button" aria-expanded={details} className={buttonStyle} onClick={() => setDetails(!details)}>Manage preferences</button>
            {showSettings && choice !== null && (
              <button type="button" className={buttonStyle} onClick={closeSettings}>Close</button>
            )}
          </div>
          {details && <p className="mt-3 text-sm">Analytics is {choice === 'allow' ? 'on' : 'off'}. Advertising stays off. Accept or reject optional analytics above.</p>}
        </section>,
        document.body,
      )}
    </>
  );
}
