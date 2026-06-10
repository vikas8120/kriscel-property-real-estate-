import { ChevronUp, X } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../utils';

export default function CompareDrawer({ properties }) {
  const { compareIds, setCompareIds } = useApp();
  const [open, setOpen] = useState(true);
  const compareProperties = properties.filter((property) => compareIds.includes(property.id));

  if (!compareIds.length) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 w-[min(92vw,980px)]">
      <div className="overflow-hidden rounded-[1.8rem] border border-charcoal/10 bg-white shadow-luxe">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="flex w-full items-center justify-between bg-[var(--ivory)] px-4 py-3 text-left"
        >
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.35em] text-gold">Comparison Drawer</div>
            <div className="mt-1 text-sm text-charcoal/70">{compareProperties.length} properties selected</div>
          </div>
          <ChevronUp className={`transition ${open ? '' : 'rotate-180'}`} />
        </button>

        {open ? (
          <div className="lux-scrollbar max-h-[340px] overflow-auto p-4">
            <div className="grid gap-4 md:grid-cols-3">
              {compareProperties.map((property) => (
                <div key={property.id} className="rounded-[1.4rem] bg-[var(--ivory)] p-3">
                  <img src={property.imageGallery[0]} alt={property.address} className="h-32 w-full rounded-2xl object-cover" />
                  <div className="mt-3 flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs uppercase tracking-[0.32em] text-gold">{property.city}</div>
                      <div className="mt-1 font-display text-2xl text-charcoal">{property.address}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCompareIds((current) => current.filter((id) => id !== property.id))}
                      className="grid h-9 w-9 place-items-center rounded-full bg-white text-charcoal shadow"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="mt-3 text-sm text-charcoal/70">{formatPrice(property.price)}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.28em] text-charcoal/50">
                    {property.beds} Beds · {property.baths} Baths · {property.sqft.toLocaleString()} Sq.Ft.
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
