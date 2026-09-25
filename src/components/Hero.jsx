import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, MessageCircle } from 'lucide-react';
import profileImg from '../assets/profile.jpg';
import { HERO, BRAND, SOCIALS, CONTACT } from '../data/portfolioData';
import { waLink } from '../utils/whatsapp';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const spotlightRef = useRef(null);
  const contentRef = useRef(null);
  const textRef = useRef(null);

  const developerRoles = HERO.marqueeRoles;
  const rollingTexts = HERO.rollingTexts;

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const content = contentRef.current;
    if (!section || !card || !content) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      content.querySelectorAll('.hero-anim-item'),
      { y: 40, opacity: 0, filter: "blur(8px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, stagger: 0.08 }
    )
    .fromTo(
      card,
      { scale: 0.8, opacity: 0, rotationY: 25, rotateX: -10 },
      { scale: 1, opacity: 1, rotateY: 0, rotateX: 0, duration: 1.2, ease: "back.out(1.2)" },
      "-=0.8"
    );

    gsap.to(card, {
      y: 70,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
      }
    });

    gsap.to(textRef.current, {
      y: -40,
      opacity: 0.8,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
      }
    });

    const xTilt = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power3.out" });
    const yTilt = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power3.out" });
    const glareX = gsap.quickTo(glareRef.current, "x", { duration: 0.3, ease: "power2.out" });
    const glareY = gsap.quickTo(glareRef.current, "y", { duration: 0.3, ease: "power2.out" });

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      }

      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2 - rect.left;
      const cardCenterY = cardRect.top + cardRect.height / 2 - rect.top;

      const rotateX = -((y - cardCenterY) / (cardRect.height / 2)) * 14;
      const rotateY = ((x - cardCenterX) / (cardRect.width / 2)) * 14;

      xTilt(rotateY);
      yTilt(rotateX);

      if (glareRef.current) {
        glareX((x - cardRect.left) - cardRect.width / 2);
        glareY((y - cardRect.top) - cardRect.height / 2);
      }
    };

    const handleMouseEnter = () => {
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
      xTilt(0);
      yTilt(0);
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseenter", handleMouseEnter);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseenter", handleMouseEnter);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex flex-col justify-between pt-28 pb-16 select-none bg-grid-pattern"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/90 to-[#050505] z-0">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.07]">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...developerRoles, ...developerRoles].map((role, idx) => (
              <span key={idx} className="text-[12vw] font-black font-netflix text-[#4B72E8] mx-8 uppercase tracking-tighter">
                {role} &bull;
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[100px] transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(75,114,232,0.3) 0%, rgba(56,189,248,0.1) 40%, transparent 70%)'
        }}
      ></div>

      <div ref={contentRef} className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 h-full flex flex-col justify-between my-auto">
        
        <div className="hero-anim-item flex items-center justify-between w-full mb-6" data-aos="fade-down">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-[#4B72E8]/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#4B72E8] animate-ping"></span>
            <span className="text-[#4B72E8] font-bold tracking-wider">{HERO.badge}</span>
            <span className="text-white/40">|</span>
            <span className="text-white/80">{HERO.badgeRight}</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-white/50 tracking-wider">
            <span className="px-2.5 py-1 border border-white/20 rounded bg-black/40 text-emerald-400">{HERO.availability}</span>
            <span className="px-2.5 py-1 border border-white/20 rounded bg-black/40">{HERO.deliveredBadge}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10">
          
          <div ref={textRef} className="lg:col-span-7 flex flex-col items-start space-y-5 text-left will-change-transform">
            
            <div className="hero-anim-item flex items-center gap-3" data-aos="fade-right">
              <span className="px-3 py-1 bg-[#4B72E8] text-white font-black text-xs rounded tracking-widest shadow-[0_0_20px_rgba(75,114,232,0.8)] animate-pulse">{HERO.topPercentLabel}</span>
              <span className="text-white/80 text-xs font-mono tracking-widest uppercase">{HERO.topPercentSub}</span>
            </div>

            <div className="hero-anim-item flex flex-col w-full" data-aos="fade-up">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none">
                {HERO.greeting} <span className="gold-gradient-text">{HERO.name}</span>
              </h1>
              
              <div className="leading-[0.9] pb-1 overflow-hidden h-[11vw] sm:h-[4.2rem] lg:h-[4.8rem] relative mt-1">
                <div className="animate-text-roll flex flex-col">
                  {rollingTexts.map((text, idx) => (
                    <h1
                      key={idx}
                      className="text-[8vw] sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-transparent [-webkit-text-stroke:2px_#4B72E8] m-0 p-0 leading-[0.9] drop-shadow-[0_0_20px_rgba(75,114,232,0.6)]"
                    >
                      {text}
                    </h1>
                  ))}
                </div>
              </div>
            </div>

            <div className="hero-anim-item flex flex-wrap items-center gap-2 text-xs font-mono text-[#4B72E8] font-bold" data-aos="fade-up" data-aos-delay="100">
              {HERO.chips.map((chip, i) => (
                <React.Fragment key={chip}>
                  {i > 0 && <span className="text-white/40">•</span>}
                  <span className={i === 0 ? "px-2.5 py-1 bg-[#4B72E8]/10 border border-[#4B72E8]/30 rounded text-[#4B72E8]" : "text-white/90"}>
                    {chip}
                  </span>
                </React.Fragment>
              ))}
            </div>

            <p className="hero-anim-item text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-xl" data-aos="fade-up" data-aos-delay="150">
              Founder of <strong className="text-white font-semibold">{BRAND.name}</strong>. {HERO.intro.replace(`Founder of ${BRAND.name}. `, '')}
            </p>

            <div className="hero-anim-item flex flex-wrap items-center gap-3 pt-2" data-aos="fade-up" data-aos-delay="200">
              <a
                href={waLink("Hi Vignesh, I'd like to discuss a project.")}
                target="_blank"
                rel="noreferrer"
                className="netflix-red-btn px-7 py-3.5 rounded text-xs font-mono uppercase tracking-widest flex items-center gap-2.5 shadow-[0_0_25px_rgba(75,114,232,0.6)] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                {HERO.ctaPrimary}
              </a>
              <a
                href="#work"
                className="px-6 py-3.5 bg-white/10 text-white border border-white/20 font-mono text-xs uppercase tracking-widest rounded hover:bg-white/20 transition-all duration-300 backdrop-blur-md flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
              >
                {HERO.ctaSecondary}
              </a>
            </div>

            <div className="hero-anim-item flex items-center gap-3 pt-3" data-aos="fade-up" data-aos-delay="250">
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full bg-[#141414] border border-white/15 flex items-center justify-center transition-all duration-300 hover:bg-[#25D366] hover:border-[#25D366] hover:shadow-[0_0_20px_rgba(37,211,102,0.6)] group"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-white transition-colors" />
              </a>

              <a
                href={`mailto:${CONTACT.email}`}
                className="w-11 h-11 rounded-full bg-[#141414] border border-white/15 flex items-center justify-center transition-all duration-300 hover:bg-[#4B72E8] hover:border-[#4B72E8] hover:shadow-[0_0_20px_rgba(75,114,232,0.6)] group"
                aria-label="Email"
              >
                <svg className="w-5 h-5 text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>

              <a
                href={SOCIALS.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full bg-[#141414] border border-white/15 flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-rose-500 hover:to-purple-500 hover:border-transparent hover:shadow-[0_0_20px_rgba(236,72,153,0.6)] group"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>

              <a
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full bg-[#141414] border border-white/15 flex items-center justify-center transition-all duration-300 hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:shadow-[0_0_20px_rgba(10,102,194,0.6)] group"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>

          </div>

          <div className="lg:col-span-5 flex justify-center perspective-[1200px]" data-aos="fade-left" data-aos-delay="200">
            <div 
              ref={cardRef}
              className="relative group transform-gpu transition-transform duration-100 ease-out will-change-transform w-full max-w-sm"
            >
              <div className="absolute -inset-3 bg-gradient-to-r from-[#4B72E8]/70 via-indigo-600/40 to-sky-500/20 rounded-3xl blur-3xl opacity-90 group-hover:opacity-100 animate-pulse duration-1000"></div>
              
              <div className="relative p-4 bg-[#141414]/90 backdrop-blur-2xl rounded-2xl border border-[#4B72E8]/40 shadow-[0_40px_80px_rgba(0,0,0,0.95)] overflow-hidden">
                
                <div 
                  ref={glareRef}
                  className="absolute inset-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transform-gpu z-40"
                ></div>

                <div className="absolute top-6 left-6 z-30 px-3 py-1 bg-[#4B72E8] text-white font-mono text-[10px] font-bold tracking-widest rounded shadow-xl">
                  {HERO.cardBadge}
                </div>

                <div className="relative w-full aspect-[4/4] rounded-xl overflow-hidden mb-4 bg-black">
                  <img
                    src={profileImg}
                    alt={`${BRAND.founder}, founder of ${BRAND.name}`}
                    className="w-full h-full object-cover object-top filter brightness-105 contrast-110 group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div>
                      <h3 className="font-bold text-lg font-heading">{BRAND.founder}</h3>
                      <p className="text-xs text-[#4B72E8] font-mono font-bold uppercase">{HERO.cardRole}</p>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/80 border border-white/20 text-[10px] text-emerald-400 font-mono">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Active Now
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-black/60 border border-white/10 flex flex-col">
                    <span className="text-xl font-black text-white font-heading">{HERO.cardStat1.value}</span>
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">{HERO.cardStat1.label}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/60 border border-white/10 flex flex-col">
                    <span className="text-xl font-black text-[#4B72E8] font-heading">{HERO.cardStat2.value}</span>
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">{HERO.cardStat2.label}</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
