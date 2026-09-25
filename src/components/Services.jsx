import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES_DATA } from '../data/portfolioData';
import { Globe, ShoppingCart, LayoutTemplate, TrendingUp, Target, Rocket, Search, Cpu, ArrowUpRight } from 'lucide-react';
import AnimatedCard from './AnimatedCard';

const iconMap = {
  Globe: Globe,
  ShoppingCart: ShoppingCart,
  LayoutTemplate: LayoutTemplate,
  TrendingUp: TrendingUp,
  Target: Target,
  Rocket: Rocket,
  Search: Search,
  Cpu: Cpu
};

const matchPercentages = ["99%", "98%", "97%", "99%", "96%", "99%", "98%", "97%"];

const Services = () => {
  return (
    <section id="services" className="py-28 bg-[#050505] relative z-10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* Header */}
        <div className="flex flex-col items-start space-y-4 mb-16" data-aos="fade-up">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-[#4B72E8]/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#4B72E8] animate-ping"></span>
            <span className="text-[#4B72E8] font-bold">EPISODE 02</span>
            <span className="text-white/40">|</span>
            <span>DIGITAL SERVICES & SOLUTIONS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            HIGH-IMPACT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4B72E8] via-blue-500 to-cyan-400 drop-shadow-[0_0_30px_rgba(75,114,232,0.4)]">
              DIGITAL SERVICES BUILT FOR GROWTH.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-3xl">
            End-to-end solutions combining engineering precision, high-converting design, and revenue-focused marketing campaigns.
          </p>
        </div>

        {/* 8 Cards Grid with AOS stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service, idx) => {
            const Icon = iconMap[service.icon] || Globe;
            const matchScore = matchPercentages[idx % matchPercentages.length];
            return (
              <div
                key={service.id}
                data-aos="fade-up"
                data-aos-delay={idx * 60}
              >
                <AnimatedCard className="h-full cursor-pointer">
                  {/* Top Row */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#4B72E8] bg-[#4B72E8]/10 px-2.5 py-1 rounded border border-[#4B72E8]/20">
                        S01 E0{idx + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-emerald-400 font-bold">{matchScore} Match</span>
                        <span className="text-[10px] font-mono border border-white/30 px-1 text-white/70">4K</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-xl bg-[#4B72E8]/10 text-[#4B72E8] border border-[#4B72E8]/20 group-hover:bg-[#4B72E8] group-hover:text-white transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#4B72E8]">
                        {service.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-black font-heading text-white mb-2 group-hover:text-[#4B72E8] transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-xs text-white/70 font-light leading-relaxed mb-5">
                      {service.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                    <span className="text-[10px] font-mono text-white/50">
                      {service.deliverables.length} Deliverables
                    </span>
                    <a
                      href="#contact"
                      className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#4B72E8] text-white flex items-center justify-center transition-all shadow-lg"
                      aria-label={`Enquire about ${service.title}`}
                    >
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
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

export default Services;
