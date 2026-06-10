import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CalendarDays, MapPin, X } from 'lucide-react';
import { formatPrice } from '../utils';
import MagneticButton from './MagneticButton';
import { useApp } from '../context/AppContext';

export default function PropertyModal() {
  const { propertyModal, setPropertyModal, markViewed, setTourModal, savedIds, toggleSaved } = useApp();

  if (!propertyModal) return null;
  const property = propertyModal;
  const isSaved = savedIds.includes(property.id);

  const handleClose = () => setPropertyModal(null);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[70] flex items-end justify-center bg-charcoal/30 p-3 backdrop-blur-sm md:items-center md:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          className="lux-scrollbar relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] bg-[var(--ivory)] shadow-luxe"
          initial={{ y: 50, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 30, opacity: 0, scale: 0.98 }}
          onClick={(event) => event.stopPropagation()}
          onAnimationComplete={() => markViewed(property)}
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/85 text-charcoal shadow-lg"
          >
            <X size={18} />
          </button>
          <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative min-h-[360px]">
              <img src={property.imageGallery[0]} alt={property.address} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,41,51,0.02)_5%,rgba(31,41,51,0.4)_100%)]" />
              <div className="absolute left-6 top-6 flex gap-2">
                <span className="rounded-full bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-charcoal">
                  {property.status}
                </span>
                <span className="rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-white">
                  {property.type}
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4 text-white">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-white/72">
                    <MapPin size={14} /> {property.city}
                  </div>
                  <h3 className="font-display text-4xl leading-none md:text-6xl">{property.address}</h3>
                </div>
                <div className="rounded-[1.4rem] border border-white/20 bg-white/12 px-5 py-4 backdrop-blur-md">
                  <div className="text-[11px] uppercase tracking-[0.35em] text-white/70">Asking Price</div>
                  <div className="font-display text-4xl">{formatPrice(property.price)}</div>
                </div>
              </div>
            </div>

            <div className="space-y-6 bg-white p-6 md:p-8">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold">Private Estate Overview</div>
                <p className="mt-4 text-sm leading-7 text-charcoal/70">{property.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <DetailItem label="Beds" value={property.beds} />
                <DetailItem label="Baths" value={property.baths} />
                <DetailItem label="Sq.Ft." value={property.sqft.toLocaleString()} />
                <DetailItem label="Lot Size" value={property.lotSize} />
                <DetailItem label="Agent" value={property.agent} />
                <DetailItem label="Built" value={property.yearBuilt} />
              </div>
              <div className="rounded-[1.6rem] bg-sand/50 p-5">
                <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.38em] text-gold">Gallery Notes</div>
                <div className="grid grid-cols-3 gap-3">
                  {property.imageGallery.map((src) => (
                    <img key={src} src={src} alt="" className="h-24 w-full rounded-2xl object-cover" />
                  ))}
                </div>
              </div>
              <div className="rounded-[1.6rem] border border-charcoal/8 bg-[linear-gradient(135deg,rgba(248,245,239,0.85),rgba(255,255,255,0.95))] p-5">
                <div className="text-[11px] font-bold uppercase tracking-[0.38em] text-charcoal/55">Next Step</div>
                <p className="mt-2 text-sm leading-7 text-charcoal/70">
                  Request a private tour or save this estate to your shortlist for a more discreet consultation.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <MagneticButton
                    type="button"
                    onClick={() => setTourModal(property)}
                    className="bg-charcoal text-white hover:bg-charcoal/90"
                  >
                    <CalendarDays size={16} /> Schedule Tour
                  </MagneticButton>
                  <MagneticButton
                    type="button"
                    onClick={() => toggleSaved(property.id)}
                    className="border border-charcoal/10 bg-white text-charcoal"
                  >
                    {isSaved ? 'Remove from Saved' : 'Save Listing'}
                  </MagneticButton>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setTourModal(property)}
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.3em] text-gold"
              >
                Request Private Tour <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="rounded-2xl bg-[var(--ivory)] px-4 py-3">
      <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-charcoal/45">{label}</div>
      <div className="mt-2 font-semibold text-charcoal">{value}</div>
    </div>
  );
}
