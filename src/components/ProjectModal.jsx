import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Globe, Layers, Play } from 'lucide-react';
import { waLink } from '../utils/whatsapp';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  const hasUrl = project.url && project.url !== '#';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto select-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl z-40"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative z-50 w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card bg-[#141414] border-[#4B72E8]/40 rounded-3xl p-6 sm:p-10 shadow-[0_40px_100px_rgba(0,0,0,0.95)] my-auto text-white"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-black/60 border border-white/20 text-white hover:text-[#4B72E8] hover:bg-black transition-all z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="px-3 py-1 rounded bg-[#4B72E8] text-white text-xs font-mono font-bold uppercase tracking-widest shadow-md">
                CASE STUDY
              </span>
              {project.resultBadge && (
                <span className="text-xs font-mono text-emerald-400 font-bold">{project.resultBadge}</span>
              )}
              {project.location && (
                <span className="text-[10px] font-mono border border-white/30 px-1.5 py-0.5 text-white/70">{project.location}</span>
              )}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-heading text-white mb-2">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-white/60 font-mono">
              Client: <strong className="text-white font-bold">{project.client}</strong> &bull; Category: <span className="text-[#4B72E8]">{project.category}</span>
            </p>
          </div>

          <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden border border-white/10 mb-8 bg-black group">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
              {hasUrl ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="netflix-red-btn px-6 py-3 rounded-lg text-xs font-mono uppercase tracking-widest flex items-center gap-2 shadow-[0_0_25px_rgba(75,114,232,0.8)]"
                >
                  <Play className="w-4 h-4 fill-current" /> Visit Live Website
                </a>
              ) : (
                <a
                  href={waLink(`Hi Vignesh, I saw the ${project.title} case study.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="netflix-red-btn px-6 py-3 rounded-lg text-xs font-mono uppercase tracking-widest flex items-center gap-2 shadow-[0_0_25px_rgba(75,114,232,0.8)]"
                >
                  <Play className="w-4 h-4 fill-current" /> Discuss Similar Project
                </a>
              )}
              <span className="text-xs font-mono text-white/70 bg-black/60 px-3 py-1.5 rounded border border-white/10">
                {project.platform}
              </span>
            </div>
          </div>

          {project.results && project.results.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mb-8">
              {project.results.map((r) => (
                <div key={r.label} className="p-4 rounded-xl bg-black/60 border border-white/10 text-center">
                  <div className="text-xl sm:text-2xl font-black text-[#4B72E8] font-heading">{r.value}</div>
                  <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider mt-1">{r.label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-2xl bg-black/60 border border-white/10">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#4B72E8] font-bold mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#4B72E8]" /> Project Objective
              </h4>
              <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                {project.objective}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black/60 border border-white/10">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#4B72E8] font-bold mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#4B72E8]" /> Core Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded text-xs font-mono bg-white/5 border border-white/10 text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8 p-6 sm:p-8 rounded-2xl bg-black/80 border border-white/10">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#4B72E8] font-bold mb-4">
              What Was Delivered
            </h4>
            <ul className="grid sm:grid-cols-2 gap-3">
              {project.workPerformed.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80 font-light">
                  <CheckCircle2 className="w-4 h-4 text-[#4B72E8] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.videoSrc && (
            <div className="mb-8 rounded-2xl overflow-hidden border border-white/10 bg-black">
              <video
                controls
                poster={project.videoPoster}
                className="w-full"
                src={project.videoSrc}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
            {hasUrl ? (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="netflix-red-btn w-full sm:w-auto px-8 py-3.5 rounded text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(75,114,232,0.6)]"
              >
                Open Live Site in New Tab <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <a
                href={waLink(`Hi Vignesh, I saw the ${project.title} case study.`)}
                target="_blank"
                rel="noreferrer"
                className="netflix-red-btn w-full sm:w-auto px-8 py-3.5 rounded text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(75,114,232,0.6)]"
              >
                Discuss on WhatsApp
              </a>
            )}

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3.5 rounded text-xs font-mono uppercase tracking-widest text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              Close Overview
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
