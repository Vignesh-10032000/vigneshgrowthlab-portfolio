import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQS, FAQ_META } from '../data/portfolioData';

const FaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section
      id="faq"
      className="py-28 bg-[#050505] relative z-10 border-t border-white/10 select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col items-start space-y-4 mb-12" data-aos="fade-up">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-[#4B72E8]/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#4B72E8] animate-ping" />
            <span className="text-[#4B72E8] font-bold">{FAQ_META.kicker.toUpperCase()}</span>
            <span className="text-white/40">|</span>
            <span>COMMON QUESTIONS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight max-w-4xl">
            {FAQ_META.title}
          </h2>
        </div>

        <div className="max-w-3xl" data-aos="fade-up" data-aos-delay="80">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="border-t border-white/10 last:border-b last:border-white/10"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left group cursor-pointer"
                >
                  <span
                    className={`font-heading font-medium text-base sm:text-lg transition-colors ${
                      isOpen ? 'text-[#4B72E8]' : 'text-white group-hover:text-blue-300'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span className="shrink-0 text-[#4B72E8]" aria-hidden="true">
                    {isOpen ? (
                      <Minus className="w-[18px] h-[18px]" />
                    ) : (
                      <Plus className="w-[18px] h-[18px]" />
                    )}
                  </span>
                </button>
                {isOpen && (
                  <p className="pb-5 pr-8 text-sm sm:text-[15px] text-white/65 font-light leading-relaxed max-w-[64ch]">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqAccordion;
