import { useMemo, useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import CommunityCard from '../components/CommunityCard';
import { communitiesData } from '../data/communitiesData';

export default function Communities() {
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState(communitiesData[0]);

  const filtered = useMemo(
    () => communitiesData.filter((community) => !filter || community.lifestyle === filter),
    [filter],
  );

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-10 md:px-8">
      <SectionHeading
        eyebrow="Communities"
        title="Interactive market explorer with luxury lifestyle filters."
        description="The community pages blend market intelligence, visual cards, and a map-style orientation panel to feel premium and useful."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[2rem] border border-charcoal/8 bg-white p-6 shadow-luxe">
          <div className="text-[11px] font-bold uppercase tracking-[0.35em] text-gold">Lifestyle Filter</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {['', 'Beach', 'Urban', 'Hillside', 'Golf', 'Family', 'Investment'].map((item) => (
              <button
                key={item || 'all'}
                type="button"
                onClick={() => setFilter(item)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  filter === item ? 'bg-charcoal text-white' : 'bg-[var(--ivory)] text-charcoal/70'
                }`}
              >
                {item || 'All'}
              </button>
            ))}
          </div>
          <div className="mt-8 rounded-[1.6rem] bg-[linear-gradient(180deg,rgba(248,245,239,0.8),rgba(255,255,255,0.96))] p-5">
            <div className="text-[11px] font-bold uppercase tracking-[0.35em] text-gold">Interactive Map Placeholder</div>
            <div className="mt-4 grid h-[360px] place-items-center rounded-[1.6rem] border border-dashed border-gold/20 bg-[radial-gradient(circle_at_30%_30%,rgba(176,141,87,0.16),transparent_25%),radial-gradient(circle_at_70%_65%,rgba(31,41,51,0.08),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.85),rgba(238,231,220,0.75))]">
              <div className="text-center">
                <div className="font-display text-5xl text-charcoal">Map</div>
                <div className="mt-2 text-sm text-charcoal/60">Interactive market geography placeholder for a future map integration.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((community) => (
            <CommunityCard key={community.name} community={community} onSelect={setSelected} />
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-[2rem] bg-charcoal p-8 text-white shadow-luxe">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-center">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold">Selected Market</div>
            <h2 className="mt-3 font-display text-5xl">{selected.name}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72">{selected.description}</p>
          </div>
          <div className="rounded-[1.6rem] bg-white/8 p-6">
            <div className="text-[11px] uppercase tracking-[0.35em] text-gold">Featured Property Types</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {selected.featured.map((item) => (
                <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-sm text-white">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
