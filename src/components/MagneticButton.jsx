import { useRef } from 'react';

export default function MagneticButton({ as: Component = 'button', className = '', children, ...props }) {
  const ref = useRef(null);

  const handleMove = (event) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) * 0.14;
    const dy = (event.clientY - (rect.top + rect.height / 2)) * 0.18;
    el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate3d(0, 0, 0)';
  };

  return (
    <Component
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform duration-200 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
