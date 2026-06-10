import { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import MagneticButton from '../components/MagneticButton';
import { useApp } from '../context/AppContext';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { contactData } from '../data/contactData';

export default function Contact() {
  const { setLeads, showToast } = useApp();
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: 'Buying', message: '' });

  const submit = (event) => {
    event.preventDefault();
    setLeads((current) => [{ ...form, createdAt: new Date().toISOString() }, ...current]);
    showToast('Your contact request has been received.');
    setForm({ name: '', email: '', phone: '', interest: 'Buying', message: '' });
  };

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-10 md:px-8">
      <SectionHeading
        eyebrow="Contact"
        title="Contact Kriscel Tech"
        description="A concise contact experience modeled on the official KriscelTech site: direct communication, office details, and one clear call to action."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <form onSubmit={submit} className="rounded-[2rem] border border-charcoal/8 bg-white p-6 shadow-luxe md:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ['Name', 'name', 'text'],
              ['Email', 'email', 'email'],
              ['Phone', 'phone', 'text'],
            ].map(([label, key, type]) => (
              <label key={key}>
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
            <label className="md:col-span-2">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.32em] text-charcoal/50">Interest</span>
              <select
                value={form.interest}
                onChange={(event) => setForm((current) => ({ ...current, interest: event.target.value }))}
                className="w-full rounded-2xl border border-charcoal/10 bg-[var(--ivory)] px-4 py-3 outline-none focus:border-gold"
              >
                {['Buying', 'Selling', 'Renting', 'Private Listing', 'Valuation'].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="md:col-span-2">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.32em] text-charcoal/50">Message</span>
              <textarea
                rows="6"
                required
                value={form.message}
                onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                className="w-full rounded-[1.6rem] border border-charcoal/10 bg-[var(--ivory)] px-4 py-3 outline-none focus:border-gold"
              />
            </label>
          </div>
          <div className="mt-6 flex justify-end">
            <MagneticButton type="submit" className="bg-charcoal text-white">
              Send Message
            </MagneticButton>
          </div>
        </form>

        <div className="space-y-6">
          <div className="rounded-[2rem] bg-charcoal p-6 text-white shadow-luxe">
            <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold">
              {contactData.sectionLabel}
            </div>
            <h2 className="mt-4 font-display text-4xl leading-none md:text-5xl">Kriscel Tech Pvt. Ltd.</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/75">{contactData.blurb}</p>
            <div className="mt-5 space-y-4 text-sm text-white/75">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 shrink-0 text-gold" size={18} />
                <span>{contactData.address}</span>
              </div>
            </div>
            <div className="mt-6 space-y-3 text-sm text-white/75">
              <a href={contactData.phoneHref} className="flex gap-3 transition hover:text-gold">
                <Phone className="text-gold" size={18} /> {contactData.phone}
              </a>
              <a href={contactData.emailHref} className="flex gap-3 transition hover:text-gold">
                <Mail className="text-gold" size={18} /> {contactData.email}
              </a>
              <a
                href={contactData.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex gap-3 transition hover:text-gold"
              >
                <MessageCircle className="text-gold" size={18} /> WhatsApp
              </a>
            </div>
            <div className="mt-6">
              <MagneticButton as="a" href={contactData.emailHref} className="bg-gold text-white">
                Talk to Our Experts
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
