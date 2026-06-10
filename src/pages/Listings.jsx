import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import PropertyCard from '../components/PropertyCard';
import { useApp } from '../context/AppContext';
import { propertiesData } from '../data/propertiesData';

const sorters = {
  newest: (a, b) => b.yearBuilt - a.yearBuilt,
  priceAsc: (a, b) => a.price - b.price,
  priceDesc: (a, b) => b.price - a.price,
  largest: (a, b) => b.sqft - a.sqft,
};

export default function Listings({ properties }) {
  const { setPropertyModal, toggleSaved, savedIds, toggleCompare, compareIds, setTourModal, recentlyViewed } = useApp();
  const [params] = useSearchParams();
  const [filters, setFilters] = useState({
    search: params.get('q') || '',
    location: '',
    price: '',
    beds: '',
    baths: '',
    type: params.get('type') || '',
    lifestyle: '',
    status: '',
    sort: 'newest',
  });

  const filtered = useMemo(() => {
    const budget = params.get('budget');
    return properties
      .filter((property) => {
        const searchMatch =
          !filters.search ||
          `${property.address} ${property.city} ${property.description}`.toLowerCase().includes(filters.search.toLowerCase());
        const locationMatch = !filters.location || property.city.toLowerCase().includes(filters.location.toLowerCase());
        const typeMatch = !filters.type || property.type === filters.type;
        const lifestyleMatch = !filters.lifestyle || property.lifestyle === filters.lifestyle;
        const statusMatch = !filters.status || property.status === filters.status;
        const bedsMatch = !filters.beds || property.beds >= Number(filters.beds);
        const bathsMatch = !filters.baths || property.baths >= Number(filters.baths);
        const priceMatch =
          !filters.price ||
          (filters.price === 'under10' && property.price < 10000000) ||
          (filters.price === '10to20' && property.price >= 10000000 && property.price < 20000000) ||
          (filters.price === '20plus' && property.price >= 20000000);
        const budgetMatch = !budget || property.price <= Number(String(budget).replace(/[^0-9]/g, '')) || Number.isNaN(Number(budget));
        return searchMatch && locationMatch && typeMatch && lifestyleMatch && statusMatch && bedsMatch && bathsMatch && priceMatch && budgetMatch;
      })
      .sort(sorters[filters.sort] || sorters.newest);
  }, [filters, params, properties]);

  const recently = propertiesData.filter((property) => recentlyViewed.includes(property.id));

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-10 md:px-8">
      <SectionHeading
        eyebrow="Exclusive Listings"
        title="Premium property grid with filters, search, compare, and private access tools."
        description="The layout stays editorial and high-end while still supporting full frontend-only interactions and localStorage persistence."
      />

      <div className="mt-10 grid gap-4 rounded-[2rem] border border-charcoal/8 bg-white p-5 shadow-luxe xl:grid-cols-7">
        <input
          value={filters.search}
          onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))}
          placeholder="Search address or location"
          className="rounded-2xl border border-charcoal/8 bg-[var(--ivory)] px-4 py-3 outline-none xl:col-span-2"
        />
        <input
          value={filters.location}
          onChange={(event) => setFilters((current) => ({ ...current, location: event.target.value }))}
          placeholder="Location"
          className="rounded-2xl border border-charcoal/8 bg-[var(--ivory)] px-4 py-3 outline-none"
        />
        <select value={filters.price} onChange={(e) => setFilters((current) => ({ ...current, price: e.target.value }))} className="rounded-2xl border border-charcoal/8 bg-[var(--ivory)] px-4 py-3 outline-none">
          <option value="">Price range</option>
          <option value="under10">Under $10M</option>
          <option value="10to20">$10M - $20M</option>
          <option value="20plus">$20M+</option>
        </select>
        <select value={filters.beds} onChange={(e) => setFilters((current) => ({ ...current, beds: e.target.value }))} className="rounded-2xl border border-charcoal/8 bg-[var(--ivory)] px-4 py-3 outline-none">
          <option value="">Beds</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
        </select>
        <select value={filters.type} onChange={(e) => setFilters((current) => ({ ...current, type: e.target.value }))} className="rounded-2xl border border-charcoal/8 bg-[var(--ivory)] px-4 py-3 outline-none">
          <option value="">Type</option>
          {['Estate', 'Oceanfront Villa', 'Modern Ranch', 'Modern Villa', 'Penthouse', 'Golf Estate', 'Townhouse', 'Signature Villa'].map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <select value={filters.sort} onChange={(e) => setFilters((current) => ({ ...current, sort: e.target.value }))} className="rounded-2xl border border-charcoal/8 bg-[var(--ivory)] px-4 py-3 outline-none">
          <option value="newest">Newest</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="largest">Largest</option>
        </select>
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-[1fr_280px]">
        <div className="grid gap-6 lg:grid-cols-2">
          {filtered.map((property) => (
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

        <aside className="space-y-6">
          <div className="rounded-[2rem] bg-charcoal p-6 text-white shadow-luxe">
            <div className="text-[11px] font-bold uppercase tracking-[0.35em] text-gold">Search Results</div>
            <div className="mt-4 font-display text-5xl">{filtered.length}</div>
            <div className="mt-2 text-sm text-white/72">Properties matched your current filters.</div>
          </div>
          <div className="rounded-[2rem] border border-charcoal/8 bg-white p-6 shadow-luxe">
            <div className="text-[11px] font-bold uppercase tracking-[0.35em] text-gold">Recently Viewed</div>
            <div className="mt-4 space-y-3">
              {recently.length ? (
                recently.map((property) => (
                  <button key={property.id} type="button" onClick={() => setPropertyModal(property)} className="flex w-full items-center gap-3 rounded-2xl bg-[var(--ivory)] p-2 text-left">
                    <img src={property.imageGallery[0]} alt="" className="h-16 w-16 rounded-2xl object-cover" />
                    <div>
                      <div className="font-semibold text-charcoal">{property.address}</div>
                      <div className="text-xs uppercase tracking-[0.28em] text-gold">{property.city}</div>
                    </div>
                  </button>
                ))
              ) : (
                <p className="text-sm leading-7 text-charcoal/60">Open a property to build your recently viewed list.</p>
              )}
            </div>
          </div>
          <div className="rounded-[2rem] border border-charcoal/8 bg-white p-6 shadow-luxe">
            <div className="text-[11px] font-bold uppercase tracking-[0.35em] text-gold">Lifestyle</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Beach', 'Urban', 'Hillside', 'Golf', 'Family', 'Investment'].map((item) => (
                <button key={item} type="button" onClick={() => setFilters((current) => ({ ...current, lifestyle: current.lifestyle === item ? '' : item }))} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${filters.lifestyle === item ? 'bg-charcoal text-white' : 'bg-[var(--ivory)] text-charcoal/70'}`}>
                  {item}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
