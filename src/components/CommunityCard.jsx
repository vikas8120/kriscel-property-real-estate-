import { ArrowRight } from 'lucide-react';

export default function CommunityCard({ community, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(community)}
      className="community-zoom-card group overflow-hidden rounded-[1.8rem] border border-charcoal/8 bg-white text-left shadow-[0_18px_60px_rgba(31,41,51,0.08)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={community.image}
          alt={community.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,41,51,0.03)_25%,rgba(31,41,51,0.52)_100%)]" />
        <div className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-charcoal">
          {community.lifestyle}
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <div className="text-[11px] uppercase tracking-[0.35em] text-white/75">Average Price</div>
          <div className="mt-1 font-display text-4xl">{community.avgPrice}</div>
        </div>
      </div>
      <div className="space-y-4 p-6">
        <div>
          <div className="text-xs uppercase tracking-[0.35em] text-gold">Community</div>
          <h3 className="mt-2 font-display text-3xl text-charcoal">{community.name}</h3>
          <p className="mt-3 text-sm leading-7 text-charcoal/70">{community.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {community.featured.map((item) => (
            <span key={item} className="rounded-full bg-[var(--ivory)] px-3 py-1 text-xs font-medium text-charcoal/70">
              {item}
            </span>
          ))}
        </div>
        <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.28em] text-gold">
          Explore market <ArrowRight size={16} />
        </div>
      </div>
    </button>
  );
}
