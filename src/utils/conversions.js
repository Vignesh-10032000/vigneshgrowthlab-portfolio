export function emitConversion(action) {
  document.dispatchEvent(new CustomEvent('vgl:conversion', { detail: { action } }));
}

export function trackContactLink(event) {
  const link = event.target.closest?.('a[href]');
  if (!link) return;

  const url = new URL(link.href, location.href);
  if (url.protocol === 'tel:') {
    emitConversion('phone_click');
  } else if (url.hostname === 'wa.me') {
    emitConversion('whatsapp_click');
  } else if (url.origin === location.origin && url.hash === '#contact') {
    emitConversion('enquiry_click');
  }
}
