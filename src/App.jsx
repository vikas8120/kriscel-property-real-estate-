import { AnimatePresence, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import useLenis from './hooks/useLenis';
import useGSAPAnimations from './hooks/useGSAPAnimations';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import CursorFollower from './components/CursorFollower';
import PropertyModal from './components/PropertyModal';
import TourModal from './components/TourModal';
import CompareDrawer from './components/CompareDrawer';
import { propertiesData } from './data/propertiesData';
import Home from './pages/Home';
import Listings from './pages/Listings';
import PrivateListings from './pages/PrivateListings';
import SoldPortfolio from './pages/SoldPortfolio';
import Communities from './pages/Communities';
import NewDevelopments from './pages/NewDevelopments';
import HomeValuation from './pages/HomeValuation';
import About from './pages/About';
import Marketing from './pages/Marketing';
import Contact from './pages/Contact';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

function Shell() {
  useLenis(true);
  useGSAPAnimations();
  const location = useLocation();
  const scrollPositionsRef = useRef({});
  const previousPathRef = useRef(location.pathname);
  const [loading, setLoading] = useState(() => {
    if (typeof window === 'undefined') {
      return true;
    }

    return window.sessionStorage.getItem('aureva-loader-seen') !== '1';
  });
  const { globalToast } = useApp();

  useEffect(() => {
    if (!loading || typeof window === 'undefined') {
      return;
    }

    window.sessionStorage.setItem('aureva-loader-seen', '1');
  }, [loading]);

  useLayoutEffect(() => {
    const previousPath = previousPathRef.current;
    scrollPositionsRef.current[previousPath] = window.scrollY;

    const savedPosition = scrollPositionsRef.current[location.pathname];
    const nextPosition = Number.isFinite(savedPosition) ? savedPosition : 0;

    window.requestAnimationFrame(() => {
      if (window.__aurevaLenis?.scrollTo) {
        window.__aurevaLenis.scrollTo(nextPosition, { immediate: true });
      } else {
        window.scrollTo(0, nextPosition);
      }
    });

    previousPathRef.current = location.pathname;
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[var(--ivory)] text-charcoal">
      {loading ? <Loader onComplete={() => setLoading(false)} /> : null}
      <CursorFollower />
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listings" element={<Listings properties={propertiesData} />} />
              <Route path="/private-listings" element={<PrivateListings />} />
              <Route path="/sold-portfolio" element={<SoldPortfolio />} />
              <Route path="/communities" element={<Communities />} />
              <Route path="/new-developments" element={<NewDevelopments />} />
              <Route path="/home-valuation" element={<HomeValuation />} />
              <Route path="/about" element={<About />} />
              <Route path="/marketing" element={<Marketing />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <PropertyModal />
      <TourModal />
      <CompareDrawer properties={propertiesData} />
      {globalToast ? <Toast message={globalToast.message} tone={globalToast.tone} /> : null}
    </div>
  );
}

function Toast({ message, tone }) {
  return (
    <div className="fixed bottom-5 left-1/2 z-[90] -translate-x-1/2 rounded-full border border-charcoal/8 bg-white px-5 py-3 shadow-luxe">
      <span className={`text-sm font-semibold ${tone === 'success' ? 'text-gold' : 'text-charcoal'}`}>{message}</span>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
