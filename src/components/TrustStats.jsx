import React from 'react';
import { STATS_DATA } from '../data/portfolioData';
import { CheckCircle, Award, Clock, Headphones } from 'lucide-react';
import AnimatedCard from './AnimatedCard';

const icons = [CheckCircle, Award, Clock, Headphones];

const TrustStats = () => {
  return (
    <section className="py-14 bg-[#050505] border-y border-[#4B72E8]/20 relative z-10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS_DATA.map((stat, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={stat.label}
                data-aos="fade-up"
                data-aos-delay={idx * 80}
              >
                <AnimatedCard className="h-full">
                  <div aria-hidden="true" data-decoration={`0${idx + 1}`} className="absolute top-0 right-0 p-4 text-white/5 font-mono text-5xl font-black pointer-events-none" />

                  {/* Top Icon */}
                  <div className="p-3 rounded-xl bg-[#4B72E8]/10 text-brand-readable border border-[#4B72E8]/20 mb-4 group-hover:scale-110 group-hover:bg-[#4B72E8] group-hover:text-white transition-all duration-300 w-fit">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Big Metric */}
                  <span className="text-3xl sm:text-4xl font-black font-netflix text-white mb-1 group-hover:text-brand-readable transition-colors tracking-wider">
                    {stat.value}
                  </span>

                  {/* Title & Desc */}
                  <p className="text-xs font-mono uppercase tracking-widest text-white mb-1 font-bold">
                    {stat.label}
                  </p>
                  <p className="text-xs text-white/60 font-light leading-relaxed">
                    {stat.desc}
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

export default TrustStats;
