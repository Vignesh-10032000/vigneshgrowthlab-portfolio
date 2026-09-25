import React from 'react';
import { WHY_WORK_WITH_ME } from '../data/portfolioData';
import { ShieldCheck, Zap, Smartphone, Gauge, Target, MessageSquare } from 'lucide-react';
import AnimatedCard from './AnimatedCard';

const icons = [ShieldCheck, Zap, Smartphone, Gauge, Target, MessageSquare];

const WhyWorkWithMe = () => {
  return (
    <section id="why-vgl" className="py-28 bg-[#050505] relative z-10 border-t border-white/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        <div className="flex flex-col items-start space-y-4 mb-16" data-aos="fade-up">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-[#4B72E8]/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#4B72E8] animate-ping"></span>
            <span className="text-[#4B72E8] font-bold">EPISODE 06</span>
            <span className="text-white/40">|</span>
            <span>WHY CHOOSE VIGNESH GROWTH LAB</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            BUILT FOR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4B72E8] via-blue-500 to-cyan-400 drop-shadow-[0_0_30px_rgba(75,114,232,0.4)]">
              TRUST, SPEED & MEASURABLE RESULTS.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-3xl">
            Pollachi-based MSME. Direct founder WhatsApp. 100% ownership. Fixed price. Average delivery around 2 weeks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_WORK_WITH_ME.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={item.title}
                data-aos="zoom-in"
                data-aos-delay={idx * 80}
              >
                <AnimatedCard className="h-full">
                  <div className="p-3 rounded-xl bg-[#4B72E8]/10 text-[#4B72E8] border border-[#4B72E8]/20 mb-5 group-hover:scale-110 group-hover:bg-[#4B72E8] group-hover:text-white transition-all duration-300 w-fit">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black font-heading text-white mb-2 group-hover:text-[#4B72E8] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </AnimatedCard>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyWorkWithMe;
