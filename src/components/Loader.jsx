import { useEffect, useState } from 'react';

const messages = [
  'Curating Private Estates...',
  'Preparing Luxury Listings...',
  'Opening Exclusive Access...',
  'Welcome to Kriscel Properties...',
];

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const progressTimer = window.setInterval(() => {
      setProgress((current) => Math.min(current + 2, 100));
    }, 60);
    const messageTimer = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % messages.length);
    }, 900);

    const finishTimer = window.setTimeout(() => onComplete?.(), 4100);

    return () => {
      window.clearInterval(progressTimer);
      window.clearInterval(messageTimer);
      window.clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[80] overflow-hidden bg-[var(--ivory)]">
      <div className="absolute inset-0 grid-soft opacity-40" />
      <div className="absolute inset-x-0 top-1/3 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <div className="relative mb-10 w-full max-w-md">
          <img
            src="/images/kriscel-logo.png"
            alt="Kriscel Properties logo"
            className="mx-auto w-full rounded-[1.75rem] object-contain shadow-[0_25px_80px_rgba(31,41,51,0.15)]"
          />
          <div className="absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(circle,rgba(176,141,87,0.22),transparent_62%)] blur-2xl" />
        </div>
        <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.45em] text-gold">
          Kriscel Properties
        </div>
        <h1 className="font-display text-4xl leading-none text-charcoal md:text-6xl">
          Private Luxury Representation
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-charcoal/70 md:text-base">
          A cinematic frontend experience for exclusive listings, private access, sold portfolios, and bespoke marketing.
        </p>
        <div className="mt-10 h-1.5 w-full max-w-lg overflow-hidden rounded-full bg-charcoal/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold via-champagne to-gold transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-4 text-sm font-medium text-charcoal/70">{messages[messageIndex]}</div>
        <div className="mt-2 text-xs font-semibold tracking-[0.35em] text-gold">{progress}%</div>
      </div>
    </div>
  );
}
