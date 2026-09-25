import React from 'react';
import { SKILLS_TECH, SKILLS_DELIVERABLES } from '../data/portfolioData';

const Skills = () => {
  const techCardsRow1 = SKILLS_TECH;
  const deliverablesRow2 = SKILLS_DELIVERABLES;

  return (
    <section id="skills" className="py-28 bg-[#050505] relative z-10 select-none overflow-hidden border-t border-white/10">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#4B72E8]/15 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-14">
        <div className="flex flex-col items-start space-y-4" data-aos="fade-up">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-[#4B72E8]/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#4B72E8] animate-ping"></span>
            <span className="text-[#4B72E8] font-bold">EPISODE 04</span>
            <span className="text-white/40">|</span>
            <span>TECHNICAL CAPABILITY & STACK</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            CORE STACK & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4B72E8] via-blue-500 to-cyan-400 drop-shadow-[0_0_30px_rgba(75,114,232,0.4)]">
              PRODUCTION DELIVERABLES.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-3xl">
            Build, Automation, and Business &amp; creative tools used daily to ship websites, POS, and WhatsApp AI workflows for Tamil Nadu businesses.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-8" data-aos="fade-up" data-aos-delay="100">

        <div>
          <div className="flex items-center justify-between px-6 sm:px-12 max-w-7xl mx-auto mb-3">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#4B72E8] flex items-center gap-2">
              ⚡ Core Technologies
            </span>
          </div>

          <div className="marquee-row-wrap">
            <div className="marquee-fade-left"></div>
            <div className="marquee-row-clip">
              <div className="py-2">
                <div className="marquee-inner flex transform-gpu min-w-[200%] gap-5 px-4">
                  {[...techCardsRow1, ...techCardsRow1, ...techCardsRow1].map((card, idx) => (
                    <div
                      key={`tech-${idx}`}
                      className="skill-marquee-card w-[190px] sm:w-[230px] md:w-[260px] p-4 sm:p-5 shrink-0 cursor-pointer flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-[#4B72E8] bg-[#4B72E8]/10 px-2 sm:px-2.5 py-0.5 rounded border border-[#4B72E8]/20">
                          {card.category}
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-mono text-emerald-400 font-bold border border-emerald-500/30 px-1.5 py-0.5 rounded bg-emerald-500/10">
                          {card.level}
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-black font-heading text-white mb-1">{card.name}</h4>
                      <p className="text-[10px] sm:text-[11px] font-mono text-white/50">Production Ready</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="marquee-fade-right"></div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between px-4 sm:px-12 max-w-7xl mx-auto mb-3">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-500 flex items-center gap-2">
              🏆 Deliverables & Architecture
            </span>
          </div>

          <div className="marquee-row-wrap">
            <div className="marquee-fade-left"></div>
            <div className="marquee-row-clip">
              <div className="py-2">
                <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] gap-4 sm:gap-5 px-4">
                  {[...deliverablesRow2, ...deliverablesRow2, ...deliverablesRow2].map((item, idx) => (
                    <div
                      key={`deliv-${idx}`}
                      className="skill-marquee-card w-[210px] sm:w-[250px] md:w-[280px] p-4 sm:p-5 shrink-0 cursor-pointer flex flex-col justify-between border-amber-500/30 hover:border-amber-500"
                    >
                      <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 mb-1.5 sm:mb-2 block">
                        // FEATURE 0{ (idx % deliverablesRow2.length) + 1 }
                      </span>
                      <h4 className="text-sm sm:text-base font-black font-heading text-white mb-1">{item.title}</h4>
                      <p className="text-[11px] sm:text-xs font-mono text-white/60">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="marquee-fade-right"></div>
          </div>
        </div>

      </div>

    </section>
  );
};

export default Skills;
