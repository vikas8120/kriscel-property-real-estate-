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
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);

    if (location.pathname !== '/') {
      setOverHero(false);
      return undefined;
    }

    const updateHeroState = () => {
      const heroStack = document.getElementById('home-hero-stack');
      if (!heroStack) {
        setOverHero(false);
        return;
      }

      const heroBottom = heroStack.offsetTop + heroStack.offsetHeight;
      setOverHero(window.scrollY < heroBottom - 1);
    };

    updateHeroState();
    window.addEventListener('scroll', updateHeroState, { passive: true });
    window.addEventListener('resize', updateHeroState);

    return () => {
      window.removeEventListener('scroll', updateHeroState);
      window.removeEventListener('resize', updateHeroState);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition ${
        overHero
          ? 'border-b border-white/10 bg-[linear-gradient(180deg,rgba(15,20,26,0.86)_0%,rgba(15,20,26,0.58)_100%)] shadow-[0_14px_40px_rgba(0,0,0,0.24)] backdrop-blur-xl'
          : scrolled
            ? 'bg-white/75 shadow-[0_10px_40px_rgba(31,41,51,0.08)] backdrop-blur-xl'
            : 'bg-white/75 shadow-[0_10px_40px_rgba(31,41,51,0.08)] backdrop-blur-xl'
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-3 md:px-8 md:py-4">
        <Link to="/" className="group flex min-w-0 items-center gap-3">
          <img
            src="/images/kriscel-logo.png"
            alt="Kriscel Properties logo"
            className={`h-11 w-11 rounded-[0.9rem] object-cover shadow-[0_10px_30px_rgba(31,41,51,0.12)] ring-1 md:h-12 md:w-12 md:rounded-[1rem] ${
              overHero ? 'ring-white/20' : 'ring-charcoal/5'
            }`}
          />
          <div className="min-w-0">
            <div
              className={`truncate font-display text-lg leading-none md:text-2xl ${
                overHero ? '!text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]' : 'text-charcoal'
              }`}
            >
              Kriscel Properties
            </div>
          </div>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-2 lg:flex lg:flex-wrap">
          {links.map(([label, href]) => {
            const isActive = location.pathname === href;

            return (
              <Link
                key={href}
                to={href}
                className={`rounded-full border px-3 py-1.5 text-[13px] font-medium transition ${
                  isActive
                    ? 'border-gold bg-gold/10 !text-gold'
                    : overHero
                      ? 'border-transparent !text-white/95 hover:border-white/18 hover:bg-white/12 hover:!text-white'
                      : 'border-transparent text-charcoal/72 hover:border-charcoal/10 hover:bg-white hover:text-charcoal'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className={`${overHero ? 'hidden' : 'hidden 2xl:flex'} items-center gap-3`}>
          <MagneticButton as={Link} to="/private-listings" className="border border-charcoal/10 bg-white text-charcoal">
            Private Access
          </MagneticButton>
          <MagneticButton as={Link} to="/contact" className="bg-charcoal text-white">
            Contact
          </MagneticButton>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((current) => !current)}
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border shadow-[0_12px_35px_rgba(31,41,51,0.12)] backdrop-blur-md transition hover:border-gold hover:text-gold lg:hidden ${
            overHero ? 'border-white/20 bg-white/10 !text-white' : 'border-charcoal/10 bg-white/88 text-charcoal'
          }`}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-x-0 top-[68px] z-50 max-h-[calc(100vh-68px)] overflow-y-auto border-t border-charcoal/8 bg-white/96 px-4 py-4 shadow-[0_24px_70px_rgba(31,41,51,0.16)] backdrop-blur-xl lg:hidden">
          <nav className="grid gap-2">
            {links.map(([label, href]) => {
              const isActive = location.pathname === href;

              return (
                <Link
                  key={href}
                  to={href}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? 'border-gold bg-gold/10 text-gold'
                      : 'border-charcoal/8 bg-[var(--ivory)] text-charcoal hover:border-gold hover:text-gold'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {label}
                  <span className="text-xs text-charcoal/35">/</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <MagneticButton as={Link} to="/private-listings" className="bg-charcoal text-white">
              Private Access
            </MagneticButton>
            <MagneticButton as={Link} to="/contact" className="border border-charcoal/10 bg-white text-charcoal">
              Contact
            </MagneticButton>
          </div>
        </div>
      ) : null}
    </header>
  );
}
