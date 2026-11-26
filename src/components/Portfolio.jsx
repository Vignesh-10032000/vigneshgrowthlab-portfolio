import React, { useState } from 'react';
import { PROJECTS_DATA, PROJECT_CATEGORIES } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import { ExternalLink, Eye, ArrowUpRight } from 'lucide-react';
import AnimatedCard from './AnimatedCard';
import ProjectImage from './ProjectImage';
import { emitConversion } from '../utils/conversions';
import { portfolioCategoryId } from '../utils/analytics';


const categories = PROJECT_CATEGORIES;

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  function selectCategory(category) {
    if (category === activeCategory) return;
    setActiveCategory(category);
    emitConversion('portfolio_filter', portfolioCategoryId(category));
  }

  function openProject(project) {
    setSelectedProject(project);
    emitConversion('project_open', project.id);
  }

  const filteredProjects = activeCategory === "All"
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) =>
        p.category.toLowerCase().includes(activeCategory.toLowerCase())
      );

  return (
    <section id="work" className="bg-[#050505] relative font-sans text-white w-full py-28 select-none border-t border-white/10">
      
      <div className="absolute top-12 left-0 w-full flex items-start justify-center pointer-events-none z-0 overflow-hidden opacity-[0.03]">
        <div aria-hidden="true" data-decoration="CLIENT WORK" className="text-[18vw] font-black font-netflix text-white tracking-tighter leading-none whitespace-nowrap uppercase" />
      </div>

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#4B72E8]/15 rounded-full blur-[180px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="flex flex-col items-start space-y-4 mb-12" data-aos="fade-up">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-[#4B72E8]/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#4B72E8] animate-ping"></span>
            <span className="text-brand-readable font-bold">EPISODE 03</span>
            <span aria-hidden="true" className="text-readable-muted">|</span>
            <span>PROJECT PORTFOLIO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            CLIENT WORK & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4B72E8] via-blue-500 to-cyan-400 drop-shadow-[0_0_30px_rgba(75,114,232,0.4)]">
              VGL PROJECTS.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-3xl">
            Explore storefronts, billing counters and custom software. Each case study identifies the client, family or product context.
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
                onClick={() => selectCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-2 shrink-0 cursor-pointer border focus-visible:outline-offset-[-3px] ${
                  activeCategory === cat
                    ? 'bg-brand-action border-brand-readable text-white shadow-[0_0_20px_rgba(75,114,232,0.6)] font-bold scale-105'
                    : 'bg-[#141414] border-control-edge text-white/70 hover:text-white hover:border-brand-readable'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeCategory === cat ? 'bg-black/30 text-white' : 'bg-white/10 text-readable-muted'
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
                    onClick={() => openProject(project)}
                    className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-black border border-white/10 group-hover:border-[#4B72E8]/50 transition-colors"
                  >
                    <ProjectImage project={project} />
                    
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
                      <span className="px-4 py-2 rounded-full bg-brand-action text-white font-mono text-xs uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(75,114,232,0.8)] flex items-center gap-1.5 transform scale-90 group-hover:scale-100 transition-transform">
                        <Eye className="w-3.5 h-3.5" /> View Details
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] font-mono text-brand-readable font-bold uppercase tracking-wider mb-2">
                    <span>{project.category}</span>
                    <span className="text-readable-muted">{project.classification}</span>
                  </div>

                  <h3 
                    onClick={() => openProject(project)}
                    className="text-xl font-black font-heading text-white mb-2.5 group-hover:text-brand-readable transition-colors leading-tight"
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
                        onClick={(event) => {
                          event.stopPropagation();
                          emitConversion('project_link_click', project.id);
                        }}
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-action text-white flex items-center justify-center transition-all duration-300 border border-control-edge hover:border-brand-readable shadow-md"
                        aria-label={`Visit live site for ${project.title}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button
                      onClick={() => openProject(project)}
                      className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-300 border border-control-edge"
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

        <a className="mt-8 inline-block underline" href="/projects/">Browse all project case studies</a>
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
