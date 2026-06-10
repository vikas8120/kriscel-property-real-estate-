import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function useGSAPAnimations() {
  const location = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasAnimatedTargets =
      document.querySelector('[data-reveal]') || document.querySelector('[data-parallax]');

    if (prefersReducedMotion || !hasAnimatedTargets) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({
      ignoreMobileResize: true,
      limitCallbacks: true,
    });

    const ctx = gsap.context(() => {
      const revealTargets = gsap.utils.toArray('[data-reveal]');
      if (revealTargets.length) {
        ScrollTrigger.batch(revealTargets, {
          interval: 0.08,
          batchMax: 8,
          once: true,
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { y: 24, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: 'power3.out',
                stagger: 0.06,
                overwrite: true,
              },
            );
          },
        });
      }

      const parallaxTargets = gsap.utils.toArray('[data-parallax]');
      if (parallaxTargets.length) {
        parallaxTargets.forEach((el) => {
          gsap.to(el, {
            yPercent: -4,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.22,
            },
          });
        });
      }
    });

    return () => ctx.revert();
  }, [location.pathname]);
}
