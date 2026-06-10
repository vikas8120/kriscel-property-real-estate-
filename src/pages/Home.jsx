import { ArrowRight, BadgeDollarSign, Globe2, ShieldCheck, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import MagneticButton from '../components/MagneticButton';
import PropertyCard from '../components/PropertyCard';
import CommunityCard from '../components/CommunityCard';
import { propertiesData } from '../data/propertiesData';
import { communitiesData } from '../data/communitiesData';
import { soldData } from '../data/soldData';
import { testimonialsData } from '../data/testimonialsData';
import { formatCompact, formatPrice } from '../utils';
import { useApp } from '../context/AppContext';

const stats = [
  ['$2B+', 'Sales Volume'],
  ['$500M+', 'Private Inventory'],
  ['300+', 'Luxury Transactions'],
  ['20+', 'Global Markets'],
];

const lifestyleTiles = ['Waterfront', 'City Penthouse', 'Golf Estates', 'Mountain Homes', 'Modern Villas', 'Investment Properties'];
const heroVideos = [
  {
    src: '/videos/hero-video-1.mp4',
    label: 'Luxury real estate hero video',
  },
  {
    src: '/videos/hero-video-2.mp4',
    label: 'Luxury architecture hero video',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const { setPropertyModal, toggleSaved, savedIds, toggleCompare, compareIds, setTourModal } = useApp();
  const featured = propertiesData.filter((property) => property.featured);
  const [heroVideoIndex, setHeroVideoIndex] = useState(() => {
    if (typeof window === 'undefined') {
      return 0;
    }

    const savedIndex = Number(window.localStorage.getItem('aureva-hero-video-index'));
    return Number.isInteger(savedIndex) && savedIndex >= 0 && savedIndex < heroVideos.length ? savedIndex : 0;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const nextIndex = (heroVideoIndex + 1) % heroVideos.length;
    window.localStorage.setItem('aureva-hero-video-index', String(nextIndex));
  }, [heroVideoIndex]);

  const submitSearch = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    const location = form.get('location');
    const budget = form.get('budget');
    const propertyType = form.get('type');
    if (location) params.set('q', location);
    if (budget) params.set('budget', budget);
    if (propertyType) params.set('type', propertyType);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <div>
      <section className="relative overflow-hidden bg-hero-ivory">
        <div className="absolute inset-0 grid-soft opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),rgba(31,41,51,0.14)_45%,rgba(31,41,51,0.42)_100%)]" />
        <video
          key={heroVideos[heroVideoIndex].src}
          src={heroVideos[heroVideoIndex].src}
          aria-label={heroVideos[heroVideoIndex].label}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(31,41,51,0.18)_42%,rgba(31,41,51,0.42)_100%)]" />
        <div className="absolute left-0 top-0 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(201,183,156,0.28),transparent_65%)] blur-3xl" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-[1600px] items-center px-4 py-10 md:px-8 md:py-14 lg:min-h-[82vh] lg:py-16">
          <div className="relative z-10 max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-charcoal/10 bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.35em] text-gold">
              <Sparkles size={14} /> Private Luxury Real Estate Representation
            </div>
            <h1 className="font-display text-5xl leading-[0.92] text-white md:text-7xl xl:text-[7.4rem]">
              Private Estates. Global Reach. Discreet Representation.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/95 md:text-lg">
              Luxury real estate advisory for exceptional homes, private listings, and landmark properties.
            </p>

            <form
              onSubmit={submitSearch}
              className="mt-8 grid gap-3 rounded-[2rem] border border-charcoal/8 bg-white/84 p-4 shadow-luxe backdrop-blur-sm md:grid-cols-4"
            >
              <input name="location" placeholder="Location" className="rounded-2xl border border-charcoal/8 bg-[var(--ivory)] px-4 py-3 outline-none" />
              <input name="budget" placeholder="Budget" className="rounded-2xl border border-charcoal/8 bg-[var(--ivory)] px-4 py-3 outline-none" />
              <select name="type" className="rounded-2xl border border-charcoal/8 bg-[var(--ivory)] px-4 py-3 outline-none">
                <option value="">Property type</option>
                <option>Estate</option>
                <option>Villa</option>
                <option>Penthouse</option>
                <option>Townhouse</option>
              </select>
              <MagneticButton type="submit" className="bg-charcoal text-white">
                Explore Listings
              </MagneticButton>
            </form>

            <div className="mt-7 flex flex-wrap gap-3">
              <MagneticButton as={Link} to="/private-listings" className="bg-gold text-white">
                Request Private Access
              </MagneticButton>
              <MagneticButton as={Link} to="/home-valuation" className="border border-charcoal/10 bg-white text-charcoal">
                Get Home Valuation
              </MagneticButton>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-[1.6rem] border border-white/20 bg-white/12 p-5 shadow-[0_12px_40px_rgba(31,41,51,0.08)] backdrop-blur-sm"
                >
                  <div className="font-display text-4xl text-white">{value}</div>
                  <div className="mt-2 text-xs font-bold uppercase tracking-[0.3em] text-white/65">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 py-20 md:px-8">
        <SectionHeading
          eyebrow="Exclusive Listings"
          title="Carefully curated homes with a private-client presentation."
          description="Every property card is designed like an editorial story, with premium data, gallery motion, and discreet access tools."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {featured.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isSaved={savedIds.includes(property.id)}
              isCompared={compareIds.includes(property.id)}
              onView={(item) => setPropertyModal(item)}
              onSave={toggleSaved}
              onCompare={toggleCompare}
              onTour={setTourModal}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 py-20 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="rounded-[2rem] bg-charcoal p-8 text-white shadow-luxe">
            <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold">Private Off-Market Access</div>
            <h2 className="mt-4 font-display text-5xl leading-none">Discreet representation for exceptional buyers.</h2>
            <p className="mt-5 text-sm leading-7 text-white/72">
              We present limited inventory with a restrained, client-first experience that mirrors a luxury private office.
            </p>
            <div className="mt-8 flex gap-3">
              <MagneticButton as={Link} to="/private-listings" className="bg-gold text-white">
                Request Access
              </MagneticButton>
              <MagneticButton as={Link} to="/contact" className="border border-white/12 bg-white/8 text-white">
                Speak With Broker
              </MagneticButton>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {lifestyleTiles.map((tile, index) => (
              <div key={tile} className={`rounded-[1.8rem] p-6 shadow-luxe ${index % 2 ? 'bg-white' : 'bg-[var(--ivory)]'}`}>
                <div className="text-[11px] font-bold uppercase tracking-[0.35em] text-gold">Browse by lifestyle</div>
                <div className="mt-10 font-display text-3xl text-charcoal">{tile}</div>
                <div className="mt-4 text-sm leading-7 text-charcoal/70">
                  Elegant properties filtered by the way clients want to live, entertain, and invest.
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1600px] px-4 py-20 md:px-8">
          <SectionHeading
            eyebrow="Communities"
            title="Market intelligence by the worlds most desirable neighborhoods."
            description="Kriscel Properties previews each market like a curated editorial spread with average price, ambiance, and featured home types."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {communitiesData.slice(0, 4).map((community) => (
              <CommunityCard key={community.name} community={community} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 py-20 md:px-8">
        <SectionHeading
          eyebrow="Sold Portfolio"
          title="Record-breaking sales, presented like a premium case study."
          description="Horizontal galleries, transparent metrics, and a polished chronology emphasize results without losing the luxury feel."
        />
        <div className="mt-10 flex gap-5 overflow-x-auto pb-4">
          {soldData.map((item) => (
            <div key={item.id} className="min-w-[320px] max-w-[320px] rounded-[1.8rem] bg-white shadow-luxe">
              <img src={item.image} alt={item.name} className="h-56 w-full rounded-t-[1.8rem] object-cover" />
              <div className="p-5">
                <div className="text-[11px] uppercase tracking-[0.35em] text-gold">{item.market} · {item.year}</div>
                <div className="mt-2 font-display text-3xl text-charcoal">{item.price}</div>
                <div className="mt-2 font-semibold text-charcoal">{item.name}</div>
                <p className="mt-3 text-sm leading-7 text-charcoal/70">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#f8f5ef,#ffffff)]">
        <div className="mx-auto max-w-[1600px] px-4 py-20 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading
                eyebrow="Bespoke Marketing"
                title="A premium presentation system for every listing."
                description="From drone footage and 3D walkthroughs to print-ready editorial layouts, every campaign is built to feel singular."
              />
              <div className="mt-8 space-y-4">
                {[
                  'Professional photography and cinematic video',
                  'Drone tours, 3D walkthroughs, and floor-plan storytelling',
                  'Private buyer network and global syndication',
                  'Print, editorial, and social media campaigns',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(31,41,51,0.05)]">
                    <ShieldCheck className="text-gold" size={18} /> {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {testimonialsData.map((item) => (
                <div key={item.quote} className="rounded-[1.8rem] border border-charcoal/8 bg-white p-6 shadow-luxe">
                  <div className="text-[11px] uppercase tracking-[0.35em] text-gold">{item.role}</div>
                  <p className="mt-4 text-sm leading-7 text-charcoal/78">"{item.quote}"</p>
                  <div className="mt-6 font-semibold text-charcoal">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 py-20 md:px-8">
        <div className="grid gap-8 rounded-[2.4rem] bg-charcoal p-8 text-white shadow-luxe lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold">Home Valuation</div>
            <h2 className="mt-4 font-display text-5xl leading-none">A discreet estimate for your property.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72">
              Submit a premium multi-step valuation flow and receive a polished frontend estimate that feels like a private
              advisory experience.
            </p>
          </div>
          <MagneticButton as={Link} to="/home-valuation" className="bg-gold text-white">
            Start Valuation
          </MagneticButton>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 py-20 md:px-8">
        <div className="rounded-[2.5rem] border border-charcoal/8 bg-white p-8 shadow-luxe">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <SectionHeading
              eyebrow="Private Client Newsletter"
              title="Receive exclusive updates, listings, and portfolio announcements."
              description="Kriscel Properties uses localStorage for the demo signup, keeping the experience self-contained and frontend only."
            />
            <MagneticButton as={Link} to="/contact" className="bg-charcoal text-white">
              Subscribe / Contact
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
