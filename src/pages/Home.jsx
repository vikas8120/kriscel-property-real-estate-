import { ShieldCheck } from 'lucide-react';
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

const lifestyleTiles = ['Waterfront', 'City Penthouse', 'Golf Estates', 'Mountain Homes', 'Modern Villas', 'Investment Properties'];
const stats = [
  ['$2B+', 'Sales Volume'],
  ['$500M+', 'Private Inventory'],
  ['300+', 'Luxury Transactions'],
  ['20+', 'Global Markets'],
];

const heroVideoOne = {
  src: '/videos/hero-video-1.mp4',
  label: 'Luxury real estate hero video',
};

const heroVideoThree = {
  src: '/videos/hero-video-3.mp4',
  label: 'Luxury interior hero video',
};

const heroImageFour = {
  src: '/images/hero-image-3.jpg',
  label: 'Luxury living room hero image',
};

const heroVideoFive = {
  src: '/videos/hero-video-4.mp4',
  label: 'Luxury property walkthrough video',
};

const heroShowcaseSlides = [
  { type: 'image', src: '/images/hero-showcase-1.jpg', label: 'Luxury classic living room' },
  { type: 'image', src: '/images/hero-showcase-2.jpg', label: 'Luxury blue lounge interior' },
  { type: 'image', src: '/images/hero-showcase-3.jpg', label: 'Modern luxury living room' },
];

const bespokeMarketingBg = {
  src: '/images/bespoke-marketing-bg.png',
  label: 'Bespoke marketing kitchen background',
};

export default function Home() {
  const navigate = useNavigate();
  const { setPropertyModal, toggleSaved, savedIds, toggleCompare, compareIds, setTourModal } = useApp();
  const featured = propertiesData.filter((property) => property.featured);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % heroShowcaseSlides.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

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
      <div id="home-hero-stack">
        <section className="relative h-[68vh] overflow-hidden bg-black sm:h-[74vh] md:h-[86vh] lg:h-[92vh]">
          <div className="absolute inset-0 grid-soft opacity-30" />
          <video
            src={heroVideoOne.src}
            aria-label={heroVideoOne.label}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="relative z-10 flex h-full items-center justify-center px-4">
            <div className="max-w-3xl text-center text-white">
              <img
                src="/images/kriscel-logo-hero.png"
                alt="Kriscel Properties logo"
                className="mx-auto w-32 object-contain drop-shadow-[0_14px_28px_rgba(0,0,0,0.45)] sm:w-40 md:w-48 lg:w-56"
              />
              <h1 className="mt-5 font-display text-lg uppercase leading-[1.1] tracking-[0.12em] text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.5)] sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl">
                Every Great Story Begins
                <span className="mt-2 block">With an Extraordinary Address</span>
              </h1>
            </div>
          </div>
        </section>

        <section className="relative h-[74vh] overflow-hidden bg-black sm:h-[78vh] md:h-[90vh] lg:h-[96vh]">
          {heroShowcaseSlides.map((slide, index) => {
            const isActive = index === activeHeroSlide;

            return (
              <div
                key={`${slide.type}-${slide.src}`}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {slide.type === 'image' ? (
                  <img src={slide.src} alt={slide.label} className="h-full w-full object-cover" />
                ) : (
                  <video
                    src={slide.src}
                    aria-label={slide.label}
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                  />
                )}
              </div>
            );
          })}
          <div className="relative mx-auto flex h-full max-w-[1600px] items-end px-4 pb-8 sm:pb-10 md:px-8 md:pb-14 lg:pb-16">
            <div className="relative z-10 max-w-2xl pb-1">
              <form
                onSubmit={submitSearch}
                className="grid gap-1.5 rounded-[1.3rem] border border-charcoal/8 bg-white/84 p-2 shadow-luxe backdrop-blur-sm sm:grid-cols-2 md:grid-cols-4"
              >
                <input name="location" placeholder="Location" className="rounded-2xl border border-paletteNavy/20 bg-white/92 px-3 py-2 text-sm font-semibold text-paletteNavy outline-none placeholder:text-paletteSlate" />
                <input name="budget" placeholder="Budget" className="rounded-2xl border border-paletteNavy/20 bg-white/92 px-3 py-2 text-sm font-semibold text-paletteNavy outline-none placeholder:text-paletteSlate" />
                <select name="type" className="rounded-2xl border border-paletteNavy/20 bg-white/92 px-3 py-2 text-sm font-semibold text-paletteNavy outline-none">
                  <option value="">Property type</option>
                  <option>Estate</option>
                  <option>Villa</option>
                  <option>Penthouse</option>
                  <option>Townhouse</option>
                </select>
                <MagneticButton type="submit" className="bg-charcoal px-4 py-2 text-sm text-white">
                  Explore Listings
                </MagneticButton>
              </form>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <MagneticButton as={Link} to="/private-listings" className="w-full bg-gold px-4 py-2 text-sm text-white sm:w-auto">
                  Request Private Access
                </MagneticButton>
                <MagneticButton as={Link} to="/home-valuation" className="w-full border border-charcoal/10 bg-white px-4 py-2 text-sm text-charcoal sm:w-auto">
                  Get Home Valuation
                </MagneticButton>
              </div>

              <div className="mt-5 grid gap-2 grid-cols-2 xl:grid-cols-4">
                {stats.map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-[1.25rem] border border-white/20 bg-white/12 p-2.5 shadow-[0_12px_40px_rgba(31,41,51,0.08)] backdrop-blur-sm sm:p-3"
                  >
                    <div className="font-display text-xl text-white sm:text-2xl md:text-[2.1rem]">{value}</div>
                    <div className="mt-1 text-[8px] font-bold uppercase tracking-[0.26em] text-white/65 sm:text-[9px]">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>

      <section className="mx-auto max-w-[1600px] px-4 py-20 md:px-8">
        <SectionHeading
          eyebrow="Exclusive Listings"
          title="Carefully curated homes with a private-client presentation."
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

      <section className="relative overflow-hidden px-4 py-20 md:px-8">
        <img
          src="/images/private-access-bg.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(48,71,94,0.72),rgba(231,222,200,0.72))]" />
        <div className="relative mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
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
              <div
                key={tile}
                className={`lifestyle-zoom-card rounded-[1.8rem] p-6 shadow-luxe ${index % 2 ? 'bg-white' : 'bg-[var(--ivory)]'}`}
              >
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
            titleClassName="text-3xl md:text-5xl"
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
        <div className="sold-portfolio-rail mt-10 overflow-hidden px-3 py-6">
          <div className="sold-portfolio-track flex w-max gap-5">
            {[...soldData, ...soldData].map((item, index) => (
             <div key={`${item.id}-${index}`} className="sold-portfolio-card-shell group relative z-0 min-w-[320px] max-w-[320px] flex-none overflow-hidden rounded-[1.8rem]">
              <div className="sold-portfolio-card overflow-hidden rounded-[1.8rem] bg-white shadow-luxe">
                <div className="overflow-hidden rounded-t-[1.8rem]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-56 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                />
              </div>
              <div className="p-5">
                <div className="text-[11px] uppercase tracking-[0.35em] text-gold">{item.market} · {item.year}</div>
                <div className="mt-2 font-display text-3xl text-charcoal">{item.price}</div>
                <div className="mt-2 font-semibold text-charcoal">{item.name}</div>
                <p className="mt-3 text-sm leading-7 text-charcoal/70">{item.note}</p>
              </div>
            </div>
            </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <img
          src={bespokeMarketingBg.src}
          alt={bespokeMarketingBg.label}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,41,51,0.56)_0%,rgba(31,41,51,0.68)_100%)]" />
        <div className="relative mx-auto max-w-[1600px] px-4 py-14 md:px-8 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] border border-white/15 bg-white/12 p-6 shadow-[0_24px_80px_rgba(31,41,51,0.18)] backdrop-blur-md md:p-8">
              <SectionHeading
                eyebrow="Bespoke Marketing"
                title="A premium presentation system for every listing."
                description="From drone footage and 3D walkthroughs to print-ready editorial layouts, every campaign is built to feel singular."
                align="left"
                eyebrowClassName="text-white/75"
                titleClassName="text-white"
                descriptionClassName="text-white/78"
              />
              <div className="mt-6 space-y-3">
                {[
                  'Professional photography and cinematic video',
                  'Drone tours, 3D walkthroughs, and floor-plan storytelling',
                  'Private buyer network and global syndication',
                  'Print, editorial, and social media campaigns',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-white shadow-[0_10px_30px_rgba(31,41,51,0.15)] backdrop-blur-sm">
                    <ShieldCheck className="text-gold" size={18} /> {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {testimonialsData.map((item) => (
                <div key={item.quote} className="rounded-[1.8rem] border border-white/15 bg-white/14 p-5 text-white shadow-[0_24px_80px_rgba(31,41,51,0.16)] backdrop-blur-md">
                  <div className="text-[11px] uppercase tracking-[0.35em] text-gold">{item.role}</div>
                  <p className="mt-3 text-sm leading-6 text-white/82">"{item.quote}"</p>
                  <div className="mt-4 font-semibold text-white">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 py-12 md:px-8 md:py-14">
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

      <section className="mx-auto max-w-[1600px] px-4 py-12 md:px-8 md:py-14">
        <div className="rounded-[2.2rem] border border-charcoal/8 bg-white p-6 shadow-luxe md:p-7">
          <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
            <SectionHeading
              eyebrow="Private Client Newsletter"
              title="Receive exclusive updates, listings, and portfolio announcements."
              description="Kriscel Properties uses localStorage for the demo signup, keeping the experience self-contained and frontend only."
              className="max-w-[56rem]"
              titleClassName="text-3xl md:text-5xl"
              descriptionClassName="leading-6"
            />
            <MagneticButton as={Link} to="/contact" className="bg-charcoal text-white">
              Subscribe / Contact
            </MagneticButton>
          </div>
        </div>
      </section>

      <section className="relative h-[58vh] overflow-hidden bg-black md:h-[64vh] lg:h-[70vh]">
        <video
          src={heroVideoFive.src}
          aria-label={heroVideoFive.label}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.5)_100%)]" />
      </section>
    </div>
  );
}
