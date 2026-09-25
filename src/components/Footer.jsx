import React from 'react';
import { MessageCircle, Mail, Phone, ArrowUp } from 'lucide-react';
import { BRAND, CONTACT, SOCIALS, SERVICES_DATA, DOCUMENTS } from '../data/portfolioData';
import { waLink } from '../utils/whatsapp';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] text-white/60 pt-16 pb-12 border-t border-[#4B72E8]/20 relative z-10 font-sans select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-[#4B72E8]/60 p-0.5 bg-black shadow-[0_0_15px_rgba(75,114,232,0.4)]">
                <img
                  src="/brand/vgl-logo-mark.svg"
                  alt={`${BRAND.name} Logo`}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-black text-lg font-netflix text-white tracking-wider">
                VIGNESH <span className="text-[#4B72E8]">GROWTH LAB</span>
              </span>
            </div>

            <p className="text-xs text-white/60 font-light leading-relaxed max-w-sm">
              {BRAND.tagline} — Websites, POS & WhatsApp automation for Tamil Nadu businesses. MSME {BRAND.msmeId}.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white hover:text-emerald-400 hover:border-emerald-500/40 transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white hover:text-[#4B72E8] hover:border-[#4B72E8]/40 transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white hover:text-blue-400 hover:border-blue-500/40 transition-all text-xs font-mono"
                aria-label="LinkedIn"
              >
                in
              </a>
              <a
                href={SOCIALS.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white hover:text-white hover:border-white/40 transition-all text-xs font-mono"
                aria-label="GitHub"
              >
                GH
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#4B72E8]">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li><a href="#home" className="hover:text-[#4B72E8] transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-[#4B72E8] transition-colors">About</a></li>
              <li><a href="#services" className="hover:text-[#4B72E8] transition-colors">Services</a></li>
              <li><a href="#work" className="hover:text-[#4B72E8] transition-colors">Projects</a></li>
              <li><a href="#skills" className="hover:text-[#4B72E8] transition-colors">Skills</a></li>
              <li><a href="#process" className="hover:text-[#4B72E8] transition-colors">Process</a></li>
              <li><a href="#contact" className="hover:text-[#4B72E8] transition-colors">Contact</a></li>
              <li><a href={DOCUMENTS.resume} target="_blank" rel="noreferrer" className="hover:text-[#4B72E8] transition-colors">Resume</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#4B72E8]">
              Services
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              {SERVICES_DATA.map((s) => (
                <li key={s.id}>
                  <a href="#services" className="hover:text-[#4B72E8] transition-colors">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#4B72E8]">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs font-mono">
              <a href={CONTACT.phoneHref} className="text-white font-bold flex items-center gap-1.5 hover:text-[#4B72E8]">
                <Phone className="w-3.5 h-3.5 text-[#4B72E8]" /> {CONTACT.phoneDisplay}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="text-white/70 hover:text-[#4B72E8] block break-all">
                {CONTACT.email}
              </a>
              <p className="text-white/50">{CONTACT.location}</p>
              <a
                href={DOCUMENTS.msmeCertificate}
                target="_blank"
                rel="noreferrer"
                className="text-white/50 hover:text-[#4B72E8] block"
              >
                MSME {BRAND.msmeId}
              </a>
              <p className="text-emerald-400 font-semibold text-[11px] pt-2 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Direct founder WhatsApp
              </p>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <p>{BRAND.copyright}</p>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white hover:text-[#4B72E8] hover:border-[#4B72E8]/40 transition-all flex items-center gap-2"
          >
            Back to top <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
