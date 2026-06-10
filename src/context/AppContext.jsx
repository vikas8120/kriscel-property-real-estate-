import { createContext, useContext, useMemo, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [savedIds, setSavedIds] = useLocalStorage('aureva-saved', []);
  const [compareIds, setCompareIds] = useLocalStorage('aureva-compare', []);
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('aureva-recent', []);
  const [privateRequests, setPrivateRequests] = useLocalStorage('aureva-private-requests', []);
  const [valuationRequests, setValuationRequests] = useLocalStorage('aureva-valuation-requests', []);
  const [leads, setLeads] = useLocalStorage('aureva-leads', []);
  const [newsletterSignups, setNewsletterSignups] = useLocalStorage('aureva-newsletter', []);
  const [tourRequests, setTourRequests] = useLocalStorage('aureva-tour-requests', []);
  const [propertyModal, setPropertyModal] = useState(null);
  const [tourModal, setTourModal] = useState(null);
  const [globalToast, setGlobalToast] = useState(null);

  const toggleSaved = (propertyId) => {
    setSavedIds((current) =>
      current.includes(propertyId)
        ? current.filter((id) => id !== propertyId)
        : [...current, propertyId],
    );
  };

  const toggleCompare = (propertyId) => {
    setCompareIds((current) => {
      if (current.includes(propertyId)) return current.filter((id) => id !== propertyId);
      if (current.length >= 3) return [...current.slice(1), propertyId];
      return [...current, propertyId];
    });
  };

  const markViewed = (property) => {
    setRecentlyViewed((current) => {
      const next = [property.id, ...current.filter((id) => id !== property.id)];
      return next.slice(0, 8);
    });
  };

  const showToast = (message, tone = 'success') => {
    setGlobalToast({ message, tone, id: Date.now() });
    window.clearTimeout(window.__aurevaToastTimer);
    window.__aurevaToastTimer = window.setTimeout(() => setGlobalToast(null), 3200);
  };

  const value = useMemo(
    () => ({
      savedIds,
      setSavedIds,
      toggleSaved,
      compareIds,
      setCompareIds,
      toggleCompare,
      recentlyViewed,
      markViewed,
      privateRequests,
      setPrivateRequests,
      valuationRequests,
      setValuationRequests,
      leads,
      setLeads,
      newsletterSignups,
      setNewsletterSignups,
      tourRequests,
      setTourRequests,
      propertyModal,
      setPropertyModal,
      tourModal,
      setTourModal,
      globalToast,
      showToast,
    }),
    [
      savedIds,
      compareIds,
      recentlyViewed,
      privateRequests,
      valuationRequests,
      leads,
      newsletterSignups,
      tourRequests,
      propertyModal,
      tourModal,
      globalToast,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};
