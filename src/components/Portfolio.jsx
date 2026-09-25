import React, { useState } from 'react';
import { PROJECTS_DATA, PROJECT_CATEGORIES, MORE_PROJECTS } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import { ExternalLink, Eye, ArrowUpRight, ShoppingBag, Gift, UtensilsCrossed, Dumbbell, MapPin, Sparkles } from 'lucide-react';
import AnimatedCard from './AnimatedCard';
import { waLink } from '../utils/whatsapp';

const iconMap = {
  ShoppingBag,
  Gift,
  UtensilsCrossed,
  Dumbbell,
};

const categories = PROJECT_CATEGORIES;

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === "All"
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) =>
        p.category.toLowerCase().includes(activeCategory.toLowerCase())
      );

  return (
    <section id="work" className="bg-[#050505] relative font-sans text-white w-full py-28 select-none border-t border-white/10">
      
      <div className="absolute top-12 left-0 w-full flex items-start justify-center pointer-events-none z-0 overflow-hidden opacity-[0.03]">
        <h1 className="text-[18vw] font-black font-netflix text-white tracking-tighter leading-none whitespace-nowrap uppercase">
          CLIENT WORK
        </h1>
      </div>

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#4B72E8]/15 rounded-full blur-[180px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="flex flex-col items-start space-y-4 mb-12" data-aos="fade-up">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-[#4B72E8]/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#4B72E8] animate-ping"></span>
            <span className="text-[#4B72E8] font-bold">EPISODE 03</span>
            <span className="text-white/40">|</span>
            <span>VERIFIED CLIENT CASE STUDIES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            RECENT CLIENT WORK & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4B72E8] via-blue-500 to-cyan-400 drop-shadow-[0_0_30px_rgba(75,114,232,0.4)]">
              FEATURED DIGITAL ORIGINALS.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-3xl">
            Explore live e-commerce stores, retail POS, WhatsApp AI automation, and custom web apps delivered for Tamil Nadu businesses.
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 sm:pb-0 sm:flex-wrap mb-10 sm:mb-14 -mx-4 px-4 sm:mx-0 sm:px-0" data-aos="fade-up" data-aos-delay="100">
          {categories.map((cat) => {
            const count = cat === "All"
              ? PROJECTS_DATA.length
              : PROJECTS_DATA.filter((p) => p.category.toLowerCase().includes(cat.toLowerCase())).length;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-2 shrink-0 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#4B72E8] text-white shadow-[0_0_20px_rgba(75,114,232,0.6)] font-bold scale-105'
                    : 'bg-[#141414] border border-white/10 text-white/70 hover:text-white hover:border-white/30'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeCategory === cat ? 'bg-black/30 text-white' : 'bg-white/10 text-white/50'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              data-aos="fade-up"
              data-aos-delay={(idx % 3) * 100}
            >
              <AnimatedCard className="h-full flex flex-col justify-between group cursor-pointer">
                <div>
                  
                  <div 
                    onClick={() => setSelectedProject(project)}
                    className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-black border border-white/10 group-hover:border-[#4B72E8]/50 transition-colors"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-95"
                      loading="lazy"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white bg-black/80 backdrop-blur-md px-2.5 py-1 rounded border border-[#4B72E8]/40">
                        S01 E0{idx + 1}
                      </span>
                      {project.resultBadge && (
                        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded border border-emerald-500/30">
                          {project.resultBadge}
                        </span>
                      )}
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-black/40 backdrop-blur-xs">
                      <span className="px-4 py-2 rounded-full bg-[#4B72E8] text-white font-mono text-xs uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(75,114,232,0.8)] flex items-center gap-1.5 transform scale-90 group-hover:scale-100 transition-transform">
                        <Eye className="w-3.5 h-3.5" /> View Details
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-[#4B72E8] font-bold uppercase tracking-wider mb-2">
                    <span>{project.category}</span>
                    <span className="text-white/40">{project.platform}</span>
                  </div>

                  <h3 
                    onClick={() => setSelectedProject(project)}
                    className="text-xl font-black font-heading text-white mb-2.5 group-hover:text-[#4B72E8] transition-colors leading-tight"
                  >
                    {project.title}
                  </h3>

                  <p className="text-xs text-white/70 font-light leading-relaxed mb-6 line-clamp-2">
                    {project.shortDesc}
                  </p>

                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                  <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                    {project.technologies.slice(0, 3).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono text-white/60 bg-white/5 px-2 py-0.5 rounded border border-white/10 group-hover:border-[#4B72E8]/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    {project.url && project.url !== "#" && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#4B72E8] text-white flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-[#4B72E8] shadow-md"
                        aria-label={`Visit live site for ${project.title}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-300 border border-white/10"
                      aria-label={`Open details modal for ${project.title}`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </AnimatedCard>
            </div>
          ))}
        </div>

        {/* More delivered work (no full case studies) */}
        <div className="mt-20 pt-16 border-t border-white/10" data-aos="fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4B72E8]/10 border border-[#4B72E8]/30 text-[11px] font-mono uppercase tracking-widest text-[#4B72E8] mb-3 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4B72E8] animate-ping"></span>
                <span>ADDITIONAL PRODUCTION BUILDS</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-white">
                MORE PROJECTS{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4B72E8] via-blue-500 to-cyan-400">
                  DELIVERED.
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-white/60 font-light mt-1">
                Regional e-commerce stores, custom retail catalogues, and local high-converting landing pages.
              </p>
            </div>
            <div className="text-xs font-mono text-white/40 uppercase tracking-widest shrink-0">
              04 Live Deployments
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MORE_PROJECTS.map((p, idx) => {
              const IconComponent = iconMap[p.icon] || Sparkles;
              const hasLiveUrl = Boolean(p.liveUrl && p.liveUrl.length > 0);
              const cardHref = hasLiveUrl
                ? p.liveUrl
                : waLink(`Hi Vignesh, I saw ${p.name} in your portfolio and would like to learn more.`);

              return (
                <a
                  key={p.name}
                  href={cardHref}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-b from-[#141414] via-[#101010] to-[#0a0a0a] border border-white/10 hover:border-[#4B72E8]/60 focus:border-[#4B72E8]/80 focus:outline-none focus:ring-2 focus:ring-[#4B72E8]/50 transition-all duration-300 ease-out cursor-pointer transform hover:-translate-y-2.5 hover:scale-[1.025] hover:shadow-[0_20px_45px_rgba(75,114,232,0.25)] will-change-transform overflow-hidden"
                >
                  {/* Top glowing ambient line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4B72E8]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Lower background subtle watermark */}
                  <span className="absolute bottom-16 right-4 text-white/[0.02] font-mono text-6xl font-black group-hover:text-[#4B72E8]/[0.08] transition-colors pointer-events-none select-none">
                    0{idx + 1}
                  </span>

                  <div>
                    {/* Header: Icon + Index + Category + Location */}
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div className="w-11 h-11 rounded-xl bg-[#4B72E8]/10 text-[#4B72E8] border border-[#4B72E8]/20 flex items-center justify-center group-hover:bg-[#4B72E8] group-hover:text-white group-hover:border-[#4B72E8] group-hover:shadow-[0_0_20px_rgba(75,114,232,0.5)] group-hover:scale-110 transition-all duration-300 shrink-0">
                        <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" />
                      </div>
                      <div className="flex flex-col items-end text-right">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-white/50 bg-white/5 px-2 py-0.5 rounded border border-white/10 group-hover:border-[#4B72E8]/40 group-hover:text-[#4B72E8] group-hover:bg-[#4B72E8]/10 transition-colors">
                            #0{idx + 1}
                          </span>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#4B72E8] group-hover:text-blue-300 transition-colors">
                            {p.type}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-white/40 flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5 text-[#4B72E8]/80" />
                          {p.location}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="text-lg font-black font-heading text-white group-hover:text-[#4B72E8] transition-colors leading-snug mb-2 flex items-center justify-between">
                      <span>{p.name}</span>
                      <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-[#4B72E8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </h4>

                    {/* Copy */}
                    <p className="text-xs text-white/60 font-light leading-relaxed mb-4 min-h-[58px]">
                      {p.copy}
                    </p>

                    {/* Feature tags */}
                    {p.tags && p.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {p.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-mono text-white/50 bg-white/5 px-2 py-0.5 rounded border border-white/10 group-hover:border-[#4B72E8]/30 group-hover:text-white/80 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action link button */}
                  <div className="pt-4 border-t border-white/10 mt-auto">
                    {hasLiveUrl ? (
                      <div className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 group-hover:bg-[#4B72E8] border border-white/10 group-hover:border-[#4B72E8] text-xs font-mono font-bold text-white transition-all duration-300 shadow-sm">
                        <span className="flex items-center gap-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                          </span>
                          <span className="text-[11px] tracking-wider uppercase group-hover:text-white text-white/90">
                            Visit Live Site
                          </span>
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors" />
                      </div>
                    ) : (
                      <div className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-[#4B72E8]/10 group-hover:bg-[#4B72E8] border border-[#4B72E8]/30 group-hover:border-[#4B72E8] text-xs font-mono font-bold text-white transition-all duration-300 shadow-sm">
                        <span className="flex items-center gap-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                          </span>
                          <span className="text-[11px] tracking-wider uppercase text-amber-300 group-hover:text-white">
                            Client Store · Live
                          </span>
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-amber-400/80 group-hover:text-white transition-colors" />
                      </div>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        </div>

      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

    </section>
  );
};

export default Portfolio;
