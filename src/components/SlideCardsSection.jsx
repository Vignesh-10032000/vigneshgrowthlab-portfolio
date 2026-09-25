import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import AnimatedCard from './AnimatedCard';
import { CLIENT_PROOF, TESTIMONIALS } from '../data/portfolioData';

const SlideCardsSection = () => {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scrollLeft = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    setTimeout(checkScroll, 350);
  };

  const scrollRight = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    setTimeout(checkScroll, 350);
  };

  return (
    <section id="clients" className="py-28 bg-[#050505] relative z-10 select-none overflow-hidden border-t border-[#4B72E8]/20">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-[#4B72E8]/15 rounded-full blur-[190px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">

        <div className="flex flex-col items-start space-y-4" data-aos="fade-right">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-[#4B72E8]/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#4B72E8] animate-ping"></span>
            <span className="text-[#4B72E8] font-bold">EPISODE 07</span>
            <span className="text-white/40">|</span>
            <span>CLIENT PROOF & CASE RESULTS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            CLIENT REVIEWS & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4B72E8] via-blue-500 to-cyan-400 drop-shadow-[0_0_30px_rgba(75,114,232,0.4)]">
              VERIFIED PROJECT OUTCOMES.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-2xl">
            Real Tamil Nadu businesses — Rani Sarees video, NextGen Toys WhatsApp screenshot, and the n8n automation demo, plus verified case results.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0" data-aos="fade-left">
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
              canScrollLeft
                ? 'bg-[#141414] border-white/20 text-white hover:bg-[#4B72E8] hover:border-[#4B72E8] hover:shadow-[0_0_20px_rgba(75,114,232,0.6)] cursor-pointer'
                : 'bg-black/40 border-white/10 text-white/20 cursor-not-allowed'
            }`}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
              canScrollRight
                ? 'bg-[#141414] border-white/20 text-white hover:bg-[#4B72E8] hover:border-[#4B72E8] hover:shadow-[0_0_20px_rgba(75,114,232,0.6)] cursor-pointer'
                : 'bg-black/40 border-white/10 text-white/20 cursor-not-allowed'
            }`}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

      </div>

      {/* Real proof: Rani video + NextGen screenshot + n8n demo */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-8 mb-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        data-aos="fade-up"
      >
        {CLIENT_PROOF.map((proof) => (
          <figure
            key={proof.id}
            className="rounded-2xl border border-white/10 bg-[#141414]/80 overflow-hidden shadow-[0_0_40px_rgba(75,114,232,0.12)]"
          >
            {proof.variant === 'video' ? (
              <video
                controls
                playsInline
                preload="metadata"
                src={proof.videoSrc}
                poster={proof.videoPoster}
                aria-label={proof.videoLabel}
                className="w-full aspect-video object-cover bg-black"
              />
            ) : (
              <div className="bg-black/60 flex items-center justify-center p-4 sm:p-6">
                <img
                  src={proof.imageSrc}
                  alt={proof.imageAlt}
                  className="w-full max-w-md mx-auto rounded-xl border border-white/10 object-contain max-h-[520px]"
                  loading="lazy"
                />
              </div>
            )}
            <figcaption className="p-5 sm:p-6 border-t border-white/10">
              <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed">
                {proof.caption}
              </p>
              <p className="mt-2 text-xs font-mono text-[#4B72E8] uppercase tracking-wider">
                {proof.captionMeta}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div
        ref={sliderRef}
        onScroll={checkScroll}
        className="flex items-stretch gap-6 px-4 sm:px-8 max-w-7xl mx-auto overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar py-4 touch-pan-x"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {TESTIMONIALS.map((card) => (
          <div
            key={card.id}
            className="w-[85vw] sm:w-[360px] md:w-[400px] shrink-0 snap-center"
          >
            <AnimatedCard className="h-full">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <img
                    src={card.avatar}
                    alt={card.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#4B72E8]/40 shadow-lg"
                  />
                  <div>
                    <h4 className="font-bold text-base font-heading text-white group-hover:text-[#4B72E8] transition-colors">
                      {card.name}
                    </h4>
                    <p className="text-xs font-mono text-white/60">
                      {card.role} &bull; <span className="text-[#4B72E8] font-semibold">{card.client}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 mb-1">
                    {card.match}
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(card.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative mb-6">
                <Quote className="w-6 h-6 text-[#4B72E8]/40 absolute -top-2 -left-2 pointer-events-none" />
                <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed pl-4 italic">
                  &ldquo;{card.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2 mt-auto">
                {card.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono text-white/70 bg-white/5 border border-white/10 px-2.5 py-1 rounded group-hover:border-[#4B72E8]/40 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </AnimatedCard>
          </div>
        ))}
      </div>

    </section>
  );
};

export default SlideCardsSection;
