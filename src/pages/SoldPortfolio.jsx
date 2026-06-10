import { useMemo, useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import { soldData } from '../data/soldData';
import { motion } from 'framer-motion';
import AnimatedCounter from '../components/AnimatedCounter';

const counters = [
  [480, 'Closed Sales', '$', 'M+'],
  [46, 'Record Listings', '', '+'],
  [18, 'Markets Covered', '', '+'],
  [92, 'Repeat / Referral', '', '%'],
];

export default function SoldPortfolio() {
  const [filters, setFilters] = useState({ market: '', year: '', type: '' });
  const [active, setActive] = useState(null);
  const filtered = useMemo(
    () =>
      soldData.filter(
        (item) =>
          (!filters.market || item.market.includes(filters.market)) &&
          (!filters.year || String(item.year) === filters.year) &&
          (!filters.type || item.type === filters.type),
      ),
    [filters],
  );

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-10 md:px-8">
      <SectionHeading
        eyebrow="Sold Portfolio"
        title="A record-breaking sales archive with polished case-study energy."
        description="The section uses bold numbers, filters, and a horizontal gallery to make the portfolio feel editorial rather than transactional."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-4">
        {counters.map(([value, label, prefix, suffix]) => (
          <div key={label} className="rounded-[2rem] border border-charcoal/8 bg-white p-6 shadow-luxe">
            <div className="font-display text-5xl text-charcoal">
              <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
            </div>
            <div className="mt-2 text-xs font-bold uppercase tracking-[0.32em] text-gold">{label}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3 rounded-[2rem] bg-white p-5 shadow-luxe">
        <select value={filters.market} onChange={(e) => setFilters((current) => ({ ...current, market: e.target.value }))} className="rounded-2xl border border-charcoal/10 bg-[var(--ivory)] px-4 py-3 outline-none">
          <option value="">All Markets</option>
          {['Beverly Hills', 'Malibu', 'Montecito', 'London', 'Palm Springs'].map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select value={filters.year} onChange={(e) => setFilters((current) => ({ ...current, year: e.target.value }))} className="rounded-2xl border border-charcoal/10 bg-[var(--ivory)] px-4 py-3 outline-none">
          <option value="">All Years</option>
          {['2025', '2024', '2023'].map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select value={filters.type} onChange={(e) => setFilters((current) => ({ ...current, type: e.target.value }))} className="rounded-2xl border border-charcoal/10 bg-[var(--ivory)] px-4 py-3 outline-none">
          <option value="">All Types</option>
          {['Estate', 'Oceanfront', 'Family Estate', 'Penthouse', 'Modern Villa'].map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="mt-10 flex gap-5 overflow-x-auto pb-4">
        {filtered.map((item) => (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => setActive(item)}
            className="min-w-[360px] max-w-[360px] overflow-hidden rounded-[1.8rem] bg-white text-left shadow-luxe"
            whileHover={{ y: -6 }}
          >
            <img src={item.image} alt={item.name} className="h-60 w-full object-cover" />
            <div className="p-5">
              <div className="text-[11px] uppercase tracking-[0.35em] text-gold">
                {item.market} · {item.year}
              </div>
              <div className="mt-3 font-display text-4xl text-charcoal">{item.price}</div>
              <div className="mt-3 text-xl font-semibold text-charcoal">{item.name}</div>
              <p className="mt-3 text-sm leading-7 text-charcoal/70">{item.note}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {active ? (
        <div className="mt-12 rounded-[2rem] border border-charcoal/8 bg-charcoal p-8 text-white shadow-luxe">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-center">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold">Case Study</div>
              <h2 className="mt-3 font-display text-5xl">{active.name}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72">
                {active.note} The case-study panel is meant to feel like a premium post-sale overview with a narrative-first presentation.
              </p>
            </div>
            <div className="rounded-[1.6rem] bg-white/8 p-6">
              <div className="text-[11px] uppercase tracking-[0.35em] text-gold">Sale Price</div>
              <div className="mt-2 font-display text-5xl">{active.price}</div>
              <div className="mt-4 text-sm text-white/72">
                Market: {active.market} <br />
                Property Type: {active.type} <br />
                Year: {active.year}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
