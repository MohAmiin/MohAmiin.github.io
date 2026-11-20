'use client';
import { useEffect, useRef, useState } from 'react';

// Counts up to `to` the first time it scrolls into view.
export default function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLElement>(null);
  const [v, setV] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    setV(0);
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let t0 = 0;
      const step = (t: number) => { t0 = t0 || t; const k = Math.min((t - t0) / 1400, 1); setV(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) raf = requestAnimationFrame(step); };
      raf = requestAnimationFrame(step);
    }, { threshold: .3 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <b ref={ref}>{v}</b>;
}
