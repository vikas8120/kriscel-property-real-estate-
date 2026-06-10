import { useEffect, useRef, useState } from 'react';
import { Bath, Bed, Bookmark, CalendarDays, ChevronLeft, ChevronRight, SquareStack } from 'lucide-react';
import { formatPrice } from '../utils';
import MagneticButton from './MagneticButton';

export default function PropertyCard({
  property,
  isSaved,
  isCompared,
  onView,
  onSave,
  onCompare,
  onTour,
}) {
  const [index, setIndex] = useState(0);
  const cardRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % property.imageGallery.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [property.imageGallery.length]);

  const move = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = -((event.clientY - rect.top) / rect.height - 0.5) * 8;

    if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    rafRef.current = window.requestAnimationFrame(() => {
      const el = cardRef.current;
      if (!el) return;
      el.style.transform = `perspective(1400px) rotateX(${y}deg) rotateY(${x}deg) translate3d(0,0,0)`;
    });
  };

  const resetTilt = () => {
    if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    if (cardRef.current) cardRef.current.style.transform = 'perspective(1400px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0)';
  };

  return (
    <article
      ref={cardRef}
      className="card-tilt group overflow-hidden rounded-[1.8rem] border border-charcoal/8 bg-white shadow-[0_18px_60px_rgba(31,41,51,0.08)]"
      onMouseMove={move}
      onMouseLeave={resetTilt}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.imageGallery[index]}
          alt={property.address}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,41,51,0)_25%,rgba(31,41,51,0.38)_100%)]" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-charcoal">
            {property.status}
          </span>
          <span className="rounded-full bg-gold/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-white">
            {property.type}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-white">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/70">{property.city}</p>
            <h3 className="mt-2 font-display text-2xl leading-none">{property.address}</h3>
          </div>
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-[0.32em] text-white/70">Asking</div>
            <div className="font-display text-3xl">{formatPrice(property.price)}</div>
          </div>
        </div>
        <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2">
          <button
            type="button"
            onClick={() => setIndex((current) => (current - 1 + property.imageGallery.length) % property.imageGallery.length)}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/75 text-charcoal backdrop-blur-md transition hover:bg-white"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => setIndex((current) => (current + 1) % property.imageGallery.length)}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/75 text-charcoal backdrop-blur-md transition hover:bg-white"
            aria-label="Next image"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="absolute bottom-4 right-4 flex gap-1.5">
          {property.imageGallery.map((_, dotIndex) => (
            <span
              key={dotIndex}
              className={`h-1.5 rounded-full transition-all ${dotIndex === index ? 'w-6 bg-gold' : 'w-1.5 bg-white/80'}`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4 p-6">
        <p className="text-sm leading-6 text-charcoal/70">{property.description}</p>
        <div className="grid grid-cols-2 gap-3 text-sm text-charcoal/75 sm:grid-cols-4">
          <div className="flex items-center gap-2 rounded-2xl bg-sand/50 px-3 py-2">
            <Bed size={16} className="text-gold" /> {property.beds} Beds
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-sand/50 px-3 py-2">
            <Bath size={16} className="text-gold" /> {property.baths} Baths
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-sand/50 px-3 py-2">
            <SquareStack size={16} className="text-gold" /> {property.sqft.toLocaleString()} Sq.Ft.
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-sand/50 px-3 py-2">
            <CalendarDays size={16} className="text-gold" /> {property.lotSize}
          </div>
        </div>
        <div className="flex flex-wrap gap-3 pt-1">
          <MagneticButton
            type="button"
            onClick={() => onView?.(property)}
            className="bg-charcoal text-white hover:bg-charcoal/90"
          >
            View Details
          </MagneticButton>
          <MagneticButton
            type="button"
            onClick={() => onTour?.(property)}
            className="border border-charcoal/12 bg-white text-charcoal hover:border-gold hover:text-gold"
          >
            Schedule Private Tour
          </MagneticButton>
          <button
            type="button"
            onClick={() => onSave?.(property)}
            className={`ml-auto inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold transition ${
              isSaved ? 'border-gold bg-gold/10 text-gold' : 'border-charcoal/12 text-charcoal hover:border-gold hover:text-gold'
            }`}
          >
            <Bookmark size={16} /> {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
        <button
          type="button"
          onClick={() => onCompare?.(property)}
          className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] transition ${
            isCompared ? 'text-gold' : 'text-charcoal/55 hover:text-gold'
          }`}
        >
          <SquareStack size={14} /> {isCompared ? 'Added to compare' : 'Add to compare'}
        </button>
      </div>
    </article>
  );
}
