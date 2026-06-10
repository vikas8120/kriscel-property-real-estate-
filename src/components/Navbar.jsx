import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import MagneticButton from './MagneticButton';

const links = [
  ['Home', '/'],
  ['Listings', '/listings'],
  ['Private Access', '/private-listings'],
  ['Sold', '/sold-portfolio'],
  ['Communities', '/communities'],
  ['Developments', '/new-developments'],
  ['Valuation', '/home-valuation'],
  ['About', '/about'],
  ['Contact', '/contact'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition ${
        scrolled ? 'bg-white/75 shadow-[0_10px_40px_rgba(31,41,51,0.08)] backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 md:px-8">
        <Link to="/" className="group flex min-w-0 items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-charcoal text-[11px] font-bold tracking-[0.4em] text-white">
            A
          </div>
          <div className="min-w-0">
            <div className="font-display text-xl leading-none text-charcoal md:text-2xl">Kriscel Properties</div>
          </div>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-4 overflow-x-auto whitespace-nowrap px-4 2xl:flex">
          {links.map(([label, href]) => (
            <Link key={href} to={href} className="shrink-0 text-[13px] font-medium text-charcoal/72 transition hover:text-gold">
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 2xl:flex">
          <MagneticButton as={Link} to="/private-listings" className="border border-charcoal/10 bg-white text-charcoal">
            Private Access
          </MagneticButton>
          <MagneticButton as={Link} to="/contact" className="bg-charcoal text-white">
            Contact
          </MagneticButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="grid h-11 w-11 place-items-center rounded-full border border-charcoal/10 bg-white text-charcoal 2xl:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-charcoal/8 bg-white/95 px-4 pb-5 pt-3 backdrop-blur-xl 2xl:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {links.map(([label, href]) => (
              <Link
                key={href}
                to={href}
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-charcoal/78 hover:bg-[var(--ivory)] hover:text-gold"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
