import { useEffect, useRef } from 'react';

export default function CursorFollower() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const visible = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return undefined;
    const reduceMotionOnHiddenTabs = () => {
      if (document.hidden) {
        if (dotRef.current) dotRef.current.style.opacity = '0';
        if (ringRef.current) ringRef.current.style.opacity = '0';
      }
    };

    const render = () => {
      const { x, y } = lastPos.current;
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (dot) dot.style.transform = `translate3d(${x - 6}px, ${y - 6}px, 0)`;
      if (ring) ring.style.transform = `translate3d(${x - 20}px, ${y - 20}px, 0)`;
      rafRef.current = 0;
    };

    const move = (event) => {
      lastPos.current = { x: event.clientX, y: event.clientY };
      visible.current = true;
      if (!rafRef.current) rafRef.current = window.requestAnimationFrame(render);
    };

    const leave = () => {
      visible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const enter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseenter', enter);
    window.addEventListener('mouseleave', leave);
    window.addEventListener('visibilitychange', reduceMotionOnHiddenTabs);
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseenter', enter);
      window.removeEventListener('mouseleave', leave);
      window.removeEventListener('visibilitychange', reduceMotionOnHiddenTabs);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[60] h-3 w-3 rounded-full bg-gold/90 opacity-0 shadow-glow transition-opacity duration-300"
        style={{ transform: 'translate3d(-999px, -999px, 0)' }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[59] h-10 w-10 rounded-full border border-gold/25 bg-gold/5 opacity-0 transition-opacity duration-300"
        style={{ transform: 'translate3d(-999px, -999px, 0)' }}
      />
    </>
  );
}
