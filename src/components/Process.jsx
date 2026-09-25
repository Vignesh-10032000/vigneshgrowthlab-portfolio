import React from 'react';
import { PROCESS_STEPS } from '../data/portfolioData';
import { Phone, FileText, Hammer, KeyRound } from 'lucide-react';
import AnimatedCard from './AnimatedCard';

const processIcons = [Phone, FileText, Hammer, KeyRound];

const Process = () => {
  return (
    <section id="process" className="py-28 bg-[#050505] relative z-10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        <div className="flex flex-col items-start space-y-4 mb-16" data-aos="fade-up">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-[#4B72E8]/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#4B72E8] animate-ping"></span>
            <span className="text-[#4B72E8] font-bold">EPISODE 05</span>
            <span className="text-white/40">|</span>
            <span>HOW WE EXECUTE & LAUNCH</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            A 4-STEP <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4B72E8] via-blue-500 to-cyan-400 drop-shadow-[0_0_30px_rgba(75,114,232,0.4)]">
              PROVEN WORK PROCESS.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-3xl">
            Free strategy call → proposal in 24 hours → build within a week → you own everything.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = processIcons[idx % processIcons.length];
            const aosDir = idx % 2 === 0 ? "fade-up" : "zoom-in";
            return (
              <div
                key={step.step}
                data-aos={aosDir}
                data-aos-delay={idx * 80}
              >
                <AnimatedCard className="h-full">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl font-black font-netflix text-[#4B72E8] group-hover:scale-110 transition-transform tracking-widest">
                        {step.step}
                      </span>
                      <div className="p-2.5 rounded-xl bg-[#4B72E8]/10 text-[#4B72E8] border border-[#4B72E8]/20 group-hover:bg-[#4B72E8] group-hover:text-white transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-lg font-black font-heading text-white mb-1 group-hover:text-[#4B72E8] transition-colors">
                      {step.title}
                    </h3>
                    <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-[#4B72E8] mb-3">
                      {step.subtitle}
                    </span>

                    <p className="text-xs text-white/70 font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </AnimatedCard>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Process;
