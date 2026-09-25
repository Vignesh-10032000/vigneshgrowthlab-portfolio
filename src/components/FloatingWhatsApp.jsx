import React from 'react';
import { waLink } from '../utils/whatsapp';

const FloatingWhatsApp = () => {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Vignesh on WhatsApp"
      className="fixed z-[100] bottom-[calc(20px+env(safe-area-inset-bottom,0px))] right-[calc(20px+env(safe-area-inset-right,0px))] w-[58px] h-[58px] rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_8px_28px_rgba(37,211,102,0.35)] hover:scale-105 transition-transform duration-200 motion-reduce:transition-none motion-reduce:hover:scale-100 group"
    >
      <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-40 motion-reduce:animate-none pointer-events-none" />
      <svg
        viewBox="0 0 32 32"
        className="w-7 h-7 relative z-10"
        aria-hidden="true"
        fill="#0b1410"
      >
        <path d="M19.11 17.53c-.28-.14-1.64-.81-1.9-.9-.25-.1-.44-.14-.62.14-.18.28-.71.9-.87 1.08-.16.18-.32.2-.6.07-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.38-1.64-1.54-1.92-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.62-1.5-.85-2.05-.22-.53-.45-.46-.62-.47h-.53c-.18 0-.48.07-.73.34-.25.28-.96.94-.96 2.3s.98 2.67 1.12 2.85c.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.57.65.21 1.25.18 1.72.11.52-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.11-.25-.18-.53-.32z" />
        <path d="M16.02 3C9.39 3 4 8.37 4 14.98c0 2.11.55 4.17 1.6 5.99L4 29l8.22-2.15A12.95 12.95 0 0 0 16.02 27C22.66 27 28 21.63 28 14.98 28 8.37 22.66 3 16.02 3zm0 21.74c-1.86 0-3.68-.5-5.26-1.44l-.38-.22-4.88 1.28 1.3-4.75-.25-.4A9.74 9.74 0 0 1 6.28 14.98c0-5.36 4.38-9.72 9.74-9.72s9.74 4.36 9.74 9.72-4.38 9.76-9.74 9.76z" />
      </svg>
    </a>
  );
};

export default FloatingWhatsApp;
