import React from 'react';
import { Check, X } from 'lucide-react';
import {
  COMPARISON_ROWS,
  COMPARISON_FOOTNOTE,
  COMPARISON_CAPTION,
  COMPARISON_META,
} from '../data/portfolioData';

const BoolCell = ({ value }) => {
  const isYes = value === 'Yes';
  return (
    <span
      className={`inline-flex items-center gap-1.5 ${
        isYes ? 'text-emerald-400' : 'text-white/45'
      }`}
    >
      {isYes ? (
        <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
      ) : (
        <X className="w-4 h-4 shrink-0" aria-hidden="true" />
      )}
      <span>{value}</span>
    </span>
  );
};

const CellValue = ({ row, value }) => {
  if (row.boolean && (value === 'Yes' || value === 'No')) {
    return <BoolCell value={value} />;
  }
  return <span className="tabular-nums">{value}</span>;
};

const ComparisonTable = () => {
  return (
    <section
      id="compare"
      className="py-28 bg-[#050505] relative z-10 border-t border-white/10 select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col items-start space-y-4 mb-12" data-aos="fade-up">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-[#4B72E8]/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#4B72E8] animate-ping" />
            <span className="text-[#4B72E8] font-bold">{COMPARISON_META.kicker.toUpperCase()}</span>
            <span className="text-white/40">|</span>
            <span>HONEST COMPARISON</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight max-w-4xl">
            {COMPARISON_META.title}
          </h2>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto rounded-2xl border border-white/10" data-aos="fade-up">
          <table className="w-full border-collapse text-sm">
            <caption className="caption-top text-left text-xs sm:text-sm text-white/50 px-4 pt-4 pb-3">
              {COMPARISON_CAPTION}
            </caption>
            <thead>
              <tr className="border-b border-white/10">
                <th
                  scope="col"
                  className="text-left font-heading font-medium text-white/70 px-4 py-3"
                >
                  Criteria
                </th>
                <th
                  scope="col"
                  className="text-left font-heading font-medium px-4 py-3 bg-[#4B72E8]/25 text-blue-200"
                >
                  Vignesh Growth Lab
                </th>
                <th
                  scope="col"
                  className="text-left font-heading font-medium text-white/70 px-4 py-3"
                >
                  DIY (Wix / Shopify)
                </th>
                <th
                  scope="col"
                  className="text-left font-heading font-medium text-white/70 px-4 py-3"
                >
                  Big Agency
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.criteria} className="border-b border-white/10 last:border-b-0">
                  <th
                    scope="row"
                    className="text-left font-normal text-white/60 px-4 py-3.5"
                  >
                    {row.criteria}
                  </th>
                  <td className="px-4 py-3.5 bg-[#4B72E8]/15 text-white font-medium">
                    <CellValue row={row} value={row.vgl} />
                  </td>
                  <td className="px-4 py-3.5 text-white/80">
                    <CellValue row={row} value={row.diy} />
                  </td>
                  <td className="px-4 py-3.5 text-white/80">
                    <CellValue row={row} value={row.agency} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked cards */}
        <div className="md:hidden flex flex-col gap-3" data-aos="fade-up">
          <p className="text-xs text-white/50 mb-1">{COMPARISON_CAPTION}</p>
          {COMPARISON_ROWS.map((row) => (
            <div
              key={row.criteria}
              className="rounded-xl border border-white/10 bg-[#141414]/80 p-4"
            >
              <p className="text-[11px] uppercase tracking-wider text-white/45 mb-2.5">
                {row.criteria}
              </p>
              <p className="text-sm text-blue-200 mb-1.5">
                <strong className="font-semibold text-[#4B72E8]">VGL:</strong>{' '}
                <CellValue row={row} value={row.vgl} />
              </p>
              <p className="text-sm text-white/65">
                DIY: <CellValue row={row} value={row.diy} />
                <span className="text-white/30"> · </span>
                Big agency: <CellValue row={row} value={row.agency} />
              </p>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs sm:text-sm text-white/45 leading-relaxed">
          {COMPARISON_FOOTNOTE}
        </p>
      </div>
    </section>
  );
};

export default ComparisonTable;
