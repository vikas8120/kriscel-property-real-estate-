import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { useApp } from '../context/AppContext';
import { useState } from 'react';
import { contactData } from '../data/contactData';

export default function Footer() {
  const { setNewsletterSignups, showToast } = useApp();
  const [email, setEmail] = useState('');

  const subscribe = (event) => {
    event.preventDefault();
    if (!email) return;
    setNewsletterSignups((current) => [{ email, createdAt: new Date().toISOString() }, ...current]);
    showToast('You have been added to the private-client newsletter.');
    setEmail('');
  };

  return (
    <footer className="bg-charcoal text-white">
      <div className="mx-auto max-w-[1600px] px-4 py-10 md:px-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.8fr_0.8fr]">
          <div>
            <img
              src="/images/kriscel-logo.png"
              alt="Kriscel Properties logo"
              className="h-14 w-auto rounded-[1rem] object-contain shadow-[0_12px_35px_rgba(0,0,0,0.24)]"
            />
            <h2 className="mt-4 font-display text-4xl leading-none md:text-5xl">
              Private Luxury
              <br />
              Real Estate
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/70">
              Editorial presentation, private access tools, and a cinematic frontend experience inspired by the most
              refined brokerage brands.
            </p>
            <form onSubmit={subscribe} className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Private-client email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="min-w-0 flex-1 rounded-full border border-white/12 bg-white/8 px-5 py-2.5 text-sm text-white outline-none placeholder:text-white/38"
              />
              <MagneticButton type="submit" className="bg-gold text-white">
                Join Newsletter
              </MagneticButton>
            </form>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-[0.35em] text-gold">Navigate</div>
            <div className="grid gap-2 text-white/78">
              {[
                ['Listings', '/listings'],
                ['Private Access', '/private-listings'],
                ['Sold Portfolio', '/sold-portfolio'],
                ['Home Valuation', '/home-valuation'],
                ['Contact', '/contact'],
              ].map(([label, href]) => (
                <Link key={href} to={href} className="inline-flex items-center gap-2 transition hover:text-gold">
                  <ArrowUpRight size={16} />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-[0.35em] text-gold">Contact</div>
            <div className="space-y-2.5 text-sm text-white/75">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-gold" />
                <span>{contactData.address}</span>
              </div>
              <a href={contactData.phoneHref} className="flex items-start gap-3 transition hover:text-gold">
                <Phone size={16} className="mt-0.5 text-gold" />
                <span>{contactData.phone}</span>
              </a>
              <a href={contactData.emailHref} className="flex items-start gap-3 transition hover:text-gold">
                <Mail size={16} className="mt-0.5 text-gold" />
                <span>{contactData.email}</span>
              </a>
            </div>
            <div className="flex gap-3 pt-2">
              {[
                [MessageCircle, contactData.whatsappHref, 'WhatsApp'],
                [Mail, contactData.emailHref, 'Email'],
              ].map(([Icon, href, label]) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/6 text-white transition hover:border-gold hover:text-gold"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
