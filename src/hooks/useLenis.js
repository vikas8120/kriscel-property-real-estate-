import { useEffect } from 'react';
import Lenis from 'lenis';

export default function useLenis(active = true) {
  useEffect(() => {
    if (!active) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const lenis = new Lenis({
      duration: 0.72,
      smoothWheel: true,
      lerp: 0.16,
      smoothTouch: false,
      syncTouch: false,
      wheelMultiplier: 0.8,
      touchMultiplier: 1,
    });
    window.__aurevaLenis = lenis;

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);
    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      if (window.__aurevaLenis === lenis) {
        delete window.__aurevaLenis;
      }
    };
  }, [active]);
}
