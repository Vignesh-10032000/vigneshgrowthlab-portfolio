import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES_WHEEL } from '../data/portfolioData';
import { waLink } from '../utils/whatsapp';

import redImg    from '../assets/service/red.jpeg';
import purpleImg from '../assets/service/purple.jpeg';
import orangeImg from '../assets/service/orange.jpeg';
import greenImg  from '../assets/service/green.jpeg';

gsap.registerPlugin(ScrollTrigger);

const imageMap = {
  red: redImg,
  purple: purpleImg,
  orange: orangeImg,
  green: greenImg,
};

const servicesData = SERVICES_WHEEL.map((s) => ({
  ...s,
  img: imageMap[s.imageKey] || redImg,
}));

const ServicesWheel = () => {
  const sectionRef = useRef(null);
  const cardsRef   = useRef([]);
  const bgRefs     = useRef([]);
  const textRefs   = useRef([]);
  const hintRef    = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 769px)',
          isMobile:  '(max-width: 768px)',
        },
        (context) => {
          const { isDesktop } = context.conditions;

          const radius      = isDesktop ? 1800 : 680;
          const angleSpread = isDesktop ? 18   : 22;

          const updateCards = (p) => {
            const activeIndex = Math.round(p);
            setActiveIdx(Math.max(0, Math.min(activeIndex, servicesData.length - 1)));

            cardsRef.current.forEach((card, i) => {
              if (!card) return;
              const offset  = i - p;
              const angle   = offset * angleSpread;
              const rad     = (angle * Math.PI) / 180;
              const x       = Math.sin(rad) * radius;
              const y       = radius - Math.cos(rad) * radius;
              const z       = -Math.abs(offset) * 50;
              const scale   = Math.max(0.4, 1 - Math.abs(offset) * 0.15);
              const opacity = Math.max(0.1, 1 - Math.abs(offset) * 0.3);
              const zIndex  = Math.round(100 - Math.abs(offset) * 10);

              gsap.set(card, { x, y, z, scale, rotationZ: angle, rotationY: 0, opacity, zIndex });
            });

            bgRefs.current.forEach((bg, i) => {
              if (!bg) return;
              const op = Math.max(0, 1 - Math.abs(i - p));
              gsap.set(bg, { opacity: op });
              if (textRefs.current[i]) gsap.set(textRefs.current[i], { opacity: op });
            });

            if (hintRef.current) {
              gsap.set(hintRef.current, { opacity: Math.max(0, 1 - p * 4) });
            }
          };

          updateCards(0);

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start:   'top top',
            end:     '+=500%',
            pin:     true,
            scrub:   1,
            onUpdate: (self) => {
              updateCards(self.progress * (servicesData.length - 1));
            },
          });
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative z-20 w-full h-screen bg-[#050505] text-white overflow-hidden flex items-center justify-center [perspective:1000px]"
    >
      {servicesData.map((s, i) => (
        <div
          key={`bg-${i}`}
          ref={el => (bgRefs.current[i] = el)}
          className="absolute inset-0 z-0 pointer-events-none opacity-0 transition-none"
          style={{ backgroundColor: s.bgColor }}
        />
      ))}

      <div className="absolute inset-0 flex items-start pt-16 md:items-center justify-center z-0 pointer-events-none overflow-hidden">
        {servicesData.map((s, i) => (
          <h1
            key={`txt-${i}`}
            ref={el => (textRefs.current[i] = el)}
            className="absolute text-[18vw] font-black uppercase text-transparent leading-none tracking-tighter mix-blend-overlay whitespace-nowrap font-netflix"
            style={{
              WebkitTextStroke: `2px rgba(255,255,255,0.35)`,
              opacity: 0,
            }}
          >
            SERVICES
          </h1>
        ))}
      </div>

      <div className="absolute top-24 sm:top-24 left-4 sm:left-8 z-30 pointer-events-none" data-aos="fade-down">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-[#4B72E8]/40 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
          <span className="w-2 h-2 rounded-full bg-[#4B72E8] animate-ping"></span>
          <span className="text-[#4B72E8] font-bold">EPISODE 02</span>
          <span className="text-white/40">|</span>
          <span className="hidden sm:inline">VGL SERVICES — </span>
          <span>SCROLL TO EXPLORE</span>
        </div>
      </div>

      <div className="relative w-full h-full flex items-center justify-center z-10 [transform-style:preserve-3d]">
        {servicesData.map((s, i) => (
          <div
            key={`card-${i}`}
            ref={el => (cardsRef.current[i] = el)}
            className="absolute w-[86vw] sm:w-[80vw] md:w-[420px] h-[400px] sm:h-[450px] md:h-[540px] rounded-[24px] sm:rounded-[28px] overflow-hidden bg-white border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group will-change-transform"
          >
            <div className="w-full h-full relative overflow-hidden bg-zinc-900">
              <img
                src={s.img}
                alt={s.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex flex-col justify-between p-5 sm:p-7 md:p-8">
                
                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-widest px-2.5 sm:px-3 py-1 rounded-full text-white shadow-md border border-white/20 backdrop-blur-md"
                    style={{ backgroundColor: s.bgColor }}
                  >
                    {s.tag}
                  </span>
                  <span className="text-2xl sm:text-3xl font-black font-netflix text-white/50">0{i + 1}</span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight tracking-tight mb-2 group-hover:text-amber-400 transition-colors drop-shadow-md">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-light mb-4 sm:mb-5 max-w-sm drop-shadow line-clamp-3 sm:line-clamp-none">
                    {s.desc}
                  </p>

                  <a
                    href={waLink(`Hi Vignesh, I'm interested in ${s.title}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-white text-black text-[11px] sm:text-xs font-mono uppercase font-bold tracking-widest hover:bg-[#4B72E8] hover:text-white transition-all duration-300 shadow-xl active:scale-95"
                  >
                    Start Project
                    <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>

              </div>

            </div>

            <div className="absolute inset-0 rounded-[24px] sm:rounded-[28px] border-2 border-transparent group-hover:border-white/50 transition-colors duration-500 pointer-events-none" />
          </div>
        ))}
      </div>

      <div
        ref={hintRef}
        className="md:hidden absolute bottom-8 left-0 w-full flex flex-col items-center gap-2 z-30 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-1 animate-bounce">
          <span className="text-white/70 text-[11px] tracking-[0.2em] uppercase font-semibold">Scroll</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
        <div className="flex gap-1.5 mt-1">
          {servicesData.map((_, i) => (
            <div
              key={`dot-${i}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIdx ? '20px' : '6px',
                height: '6px',
                background: i === activeIdx ? '#4B72E8' : 'rgba(255,255,255,0.3)'
              }}
            />
          ))}
        </div>
      </div>

      <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-30 flex-col gap-3 pointer-events-none">
        {servicesData.map((_, i) => (
          <div
            key={`pip-${i}`}
            className="rounded-full transition-all duration-500"
            style={{
              width: '6px',
              height: i === activeIdx ? '28px' : '6px',
              background: i === activeIdx ? '#4B72E8' : 'rgba(255,255,255,0.25)'
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesWheel;
