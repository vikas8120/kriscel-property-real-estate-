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
      <div className="mx-auto max-w-[1600px] px-4 py-7 md:px-8 md:py-12">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.8fr_0.8fr] lg:gap-8">
          <div>
            <img
              src="/images/kriscel-logo.png"
              alt="Kriscel Properties logo"
              className="h-11 w-auto rounded-[1rem] object-contain shadow-[0_12px_35px_rgba(0,0,0,0.24)] sm:h-14"
            />
            <h2 className="mt-2.5 font-display text-[1.65rem] leading-none sm:mt-4 sm:text-4xl md:text-5xl">
              Private Luxury
              <br />
              Real Estate
            </h2>
            <p className="mt-2.5 max-w-xl text-[12px] leading-[1.55] text-white/70 sm:mt-4 sm:text-sm">
              Editorial presentation, private access tools, and a cinematic frontend experience inspired by the most
              refined brokerage brands.
            </p>
            <form onSubmit={subscribe} className="mt-3.5 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:gap-3">
              <input
                type="email"
                placeholder="Private-client email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="min-w-0 flex-1 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-white outline-none placeholder:text-white/38"
              />
              <MagneticButton type="submit" className="bg-gold text-white">
                Join Newsletter
              </MagneticButton>
            </form>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-gold sm:text-xs">Navigate</div>
            <div className="grid gap-1 text-[13px] text-white/78 sm:gap-2 sm:text-sm">
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

          <div className="space-y-2 sm:space-y-3">
            <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-gold sm:text-xs">Contact</div>
            <div className="space-y-1.5 text-[13px] text-white/75 sm:space-y-2.5 sm:text-sm">
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
            <div className="flex gap-2.5 pt-1.5">
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
