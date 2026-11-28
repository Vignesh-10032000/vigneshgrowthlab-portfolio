import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Globe,
  Code2,
  ShoppingCart,
  Bot,
  MapPin,
  Award,
  FileText,
  Linkedin,
  Github,
  ExternalLink,
  BadgeCheck,
  Cloud,
  Database,
  ScrollText,
} from 'lucide-react';
import AnimatedCard from './AnimatedCard';
import {
  ABOUT,
  BRAND,
  FOUNDER,
  CREDENTIALS,
  SOCIALS,
} from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const pillarIcons = [Globe, Code2, ShoppingCart, Bot];
const credIcons = [ScrollText, Cloud, Database, BadgeCheck];

const About = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  const pillars = ABOUT.pillars.map((p, i) => ({
    ...p,
    icon: pillarIcons[i % pillarIcons.length],
  }));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      '.welcome-huge-text',
      { y: -80, scale: 0.9, opacity: 0 },
      {
        y: 0,
        scale: 1,
        opacity: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'top center',
          scrub: 1,
        },
      }
    );

    gsap.fromTo(
      cardRefs.current.filter(Boolean),
      { y: 60, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 w-full min-h-screen bg-[#050505] text-white pt-24 sm:pt-28 pb-36 sm:pb-48 px-4 sm:px-8 flex flex-col select-none overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <div aria-hidden="true" data-decoration="WELCOME" className="welcome-huge-text text-[22vw] sm:text-[18vw] font-black font-netflix uppercase text-white tracking-tighter leading-none whitespace-nowrap opacity-0" />
      </div>

      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#4B72E8]/15 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">
        <div className="flex flex-col items-start space-y-4" data-aos="fade-up">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-[#4B72E8]/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#4B72E8] animate-ping"></span>
            <span className="text-brand-readable font-bold">EPISODE 01</span>
            <span aria-hidden="true" className="text-readable-muted">|</span>
            <span>{ABOUT.episodeLabel}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            EPISODE SYNOPSIS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4B72E8] via-blue-500 to-cyan-400 drop-shadow-[0_0_30px_rgba(75,114,232,0.4)]">
              {ABOUT.title}
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-3xl">
            {ABOUT.synopsis}
          </p>
          <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed max-w-3xl">
            {FOUNDER.bio}
          </p>
          <p className="text-sm sm:text-base text-white/80 font-medium leading-relaxed max-w-3xl border-l-2 border-[#4B72E8] pl-4">
            {FOUNDER.bioSecondary}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="/projects/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-action text-white text-sm font-bold hover:bg-[#3154C2] transition-colors shadow-[0_0_24px_rgba(75,114,232,0.35)]"
            >
              <FileText className="w-4 h-4" />
              View projects
            </a>
            <a
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 text-white text-sm font-bold hover:border-[#4B72E8]/60 hover:bg-[#4B72E8]/10 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 text-white text-sm font-bold hover:border-[#4B72E8]/60 hover:bg-[#4B72E8]/10 transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div ref={addToRefs} data-aos="fade-right" className="lg:col-span-5">
            <AnimatedCard className="h-full">
              <div aria-hidden="true" data-decoration="01" className="absolute top-0 right-0 p-6 text-white/5 font-mono text-7xl font-black pointer-events-none" />

              <div className="flex flex-col items-center text-center space-y-5">
                <div className="relative w-36 h-36 rounded-full p-1 bg-gradient-to-tr from-[#4B72E8] via-indigo-500 to-cyan-400 shadow-2xl">
                  <img
                    src="/images/proof/founder.webp"
                    srcSet="/images/proof/founder-small.webp 320w, /images/proof/founder.webp 840w"
                    sizes="(max-width: 640px) 75vw, 400px"
                    alt={FOUNDER.photoAlt}
                    width={840}
                    height={1050}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full rounded-full object-cover object-top border-4 border-[#050505]"
                  />
                  <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-400 border-2 border-[#050505] rounded-full shadow-lg shadow-emerald-400/50" />
                </div>

                <div>
                  <h3 className="text-2xl font-black font-heading text-white">{BRAND.founder}</h3>
                  <p className="text-xs font-mono font-bold uppercase tracking-widest text-brand-readable mt-1">
                    {FOUNDER.jobTitle}
                  </p>
                </div>

                <p className="text-sm text-white/70 font-light leading-relaxed">
                  &ldquo;{ABOUT.quote}&rdquo;
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 w-full text-xs font-mono text-white/70 pt-4 border-t border-white/10">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-readable" /> {ABOUT.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-brand-readable" /> {ABOUT.projectsBadge}
                  </span>
                </div>
              </div>
            </AnimatedCard>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6" data-aos="fade-left">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} ref={addToRefs}>
                  <AnimatedCard className="h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-[#4B72E8]/10 text-brand-readable border border-[#4B72E8]/20 group-hover:bg-[#4B72E8] group-hover:text-white transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-readable-muted font-bold">0{idx + 2}</span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold font-heading text-white group-hover:text-brand-readable transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </AnimatedCard>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-8" data-aos="fade-up">
          <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">Credentials</h3>
          <figure className="my-6 max-w-lg">
            <img src="/images/proof/workstation.webp" srcSet="/images/proof/workstation-small.webp 320w, /images/proof/workstation.webp 840w"
              sizes="(max-width: 640px) 90vw, 500px" width="840" height="598" loading="lazy"
              alt="Vignesh’s development desk with a monitor, laptop and keyboard" />
            <figcaption>VGL development workspace</figcaption>
          </figure>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {CREDENTIALS.map((cred, idx) => {
              const Icon = credIcons[idx % credIcons.length];
              return (
                <a
                  key={cred.title}
                  href={cred.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex items-start gap-4 p-5 sm:p-6 rounded-2xl border transition-all duration-300 ease-out cursor-pointer transform hover:-translate-y-2 hover:scale-[1.025] will-change-transform ${
                    cred.highlight
                      ? 'border-[#4B72E8]/60 bg-[#4B72E8]/10 hover:bg-[#4B72E8]/20 hover:border-[#4B72E8] hover:shadow-[0_16px_36px_rgba(75,114,232,0.35)]'
                      : 'border-white/10 bg-[#141414]/90 hover:border-[#4B72E8]/60 hover:bg-[#1a1a1a] hover:shadow-[0_16px_36px_rgba(75,114,232,0.25)]'
                  }`}
                >
                  <div
                    className={`p-3.5 rounded-xl border shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${
                      cred.highlight
                        ? 'bg-[#4B72E8] text-white border-[#4B72E8] shadow-lg shadow-[#4B72E8]/40'
                        : 'bg-[#4B72E8]/10 text-brand-readable border-[#4B72E8]/20 group-hover:bg-[#4B72E8] group-hover:text-white group-hover:border-[#4B72E8]'
                    }`}
                  >
                    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-brand-readable transition-colors">
                      {cred.title}
                    </h4>
                    <p className="mt-1.5 text-xs font-mono text-white/60 inline-flex items-center gap-1.5 group-hover:text-white/90 transition-colors">
                      <span>{cred.linkLabel}</span>
                      <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
