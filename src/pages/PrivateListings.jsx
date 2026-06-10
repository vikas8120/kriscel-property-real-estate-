import { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import MagneticButton from '../components/MagneticButton';
import { propertiesData } from '../data/propertiesData';
import { useApp } from '../context/AppContext';

export default function PrivateListings() {
  const { setPrivateRequests, showToast, setPropertyModal } = useApp();
  const initialForm = {
    name: '',
    email: '',
    phone: '',
    budget: '',
    location: '',
    interest: 'Buying',
  };
  const [form, setForm] = useState({
    ...initialForm,
  });
  const [success, setSuccess] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    setPrivateRequests((current) => [{ ...form, createdAt: new Date().toISOString() }, ...current]);
    setSuccess(true);
    showToast('Your private access request has been received.');
    setForm(initialForm);
  };

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-10 md:px-8">
      <SectionHeading
        eyebrow="Private Access"
        title="Blurred previews, private-client messaging, and a discreet request flow."
        description="This page leans into the off-market feel with softened imagery, limited reveals, and a simple request form that persists locally."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-5 md:grid-cols-2">
          {propertiesData
            .filter((property) => property.status === 'Private' || property.status === 'Coming Soon')
            .map((property) => (
              <button
                key={property.id}
                type="button"
                onClick={() => setPropertyModal(property)}
                className="group overflow-hidden rounded-[1.8rem] border border-charcoal/8 bg-white text-left shadow-luxe"
              >
                <div className="relative aspect-[4/3]">
                  <img src={property.imageGallery[0]} alt={property.address} className="h-full w-full object-cover blur-[2px] transition duration-700 group-hover:blur-0" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,41,51,0.08),rgba(31,41,51,0.52))]" />
                  <div className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-charcoal">
                    Private Preview
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="font-display text-3xl">{property.address}</div>
                    <div className="mt-2 text-sm text-white/72">{property.city}</div>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm leading-7 text-charcoal/70">
                    Access is limited to private-client inquiries. Preview the property and request a confidential introduction.
                  </p>
                </div>
              </button>
            ))}
        </div>

        <div className="rounded-[2rem] border border-charcoal/8 bg-white p-6 shadow-luxe md:p-8">
          <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold">Request Access</div>
          <h2 className="mt-3 font-display text-5xl text-charcoal">Private listing inquiry</h2>
          <p className="mt-4 text-sm leading-7 text-charcoal/70">
            Submit your details and preferences for a curated, discreet follow-up. Everything is frontend-only and stored locally.
          </p>

          <form onSubmit={submit} className="mt-8 grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ['Name', 'name', 'text'],
                ['Email', 'email', 'email'],
                ['Phone', 'phone', 'text'],
                ['Budget', 'budget', 'text'],
                ['Preferred Location', 'location', 'text'],
              ].map(([label, key, type]) => (
                <label key={key} className={key === 'location' ? 'md:col-span-2' : ''}>
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.32em] text-charcoal/50">{label}</span>
                  <input
                    type={type}
                    required
                    value={form[key]}
                    onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
                    className="w-full rounded-2xl border border-charcoal/10 bg-[var(--ivory)] px-4 py-3 outline-none focus:border-gold"
                  />
                </label>
              ))}
            </div>
            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.32em] text-charcoal/50">Buying / Selling Interest</span>
              <select
                value={form.interest}
                onChange={(event) => setForm((current) => ({ ...current, interest: event.target.value }))}
                className="w-full rounded-2xl border border-charcoal/10 bg-[var(--ivory)] px-4 py-3 outline-none focus:border-gold"
              >
                {['Buying', 'Selling', 'Both'].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <div className="rounded-[1.6rem] bg-[var(--ivory)] p-5 text-sm leading-7 text-charcoal/68">
              Kriscel Properties private access is designed to feel confidential, refined, and selective. Requests are saved locally for the demo.
            </div>
            <MagneticButton type="submit" className="bg-charcoal text-white">
              Request Private Access
            </MagneticButton>
          </form>

          {success ? (
            <div className="mt-5 rounded-[1.6rem] border border-gold/20 bg-gold/10 p-4 text-sm text-gold">
              Your private access request has been received.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
