import { CONTACT } from '~/data/vgl/site';

export const DEFAULT_WA_MESSAGE = "Hi Vignesh, I'd like to discuss a project.";

/** Build a wa.me link with a per-context prefilled message. */
export const waLink = (message: string = DEFAULT_WA_MESSAGE): string =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
