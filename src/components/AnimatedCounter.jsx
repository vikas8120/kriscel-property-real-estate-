import { useEffect, useState } from 'react';

export default function AnimatedCounter({ value, duration = 1400, prefix = '', suffix = '' }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let start = 0;
    let frame = 0;
    const startTime = performance.now();

    const step = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(value * eased);
      setCurrent(start);
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return (
    <span>
      {prefix}
      {current}
      {suffix}
    </span>
  );
}
