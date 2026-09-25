import { CONTACT } from '../data/portfolioData';

export const DEFAULT_WA_MESSAGE = "Hi Vignesh, I'd like to discuss a project.";

/** Build a wa.me link with a per-context prefilled message. */
export const waLink = (message = DEFAULT_WA_MESSAGE) =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const waHref = () => `https://wa.me/${CONTACT.whatsappNumber}`;
