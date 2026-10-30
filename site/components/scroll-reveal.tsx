'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Fades [data-reveal] elements in as they enter the viewport. Content is only hidden once
// this runs, so it stays visible without JavaScript, and nothing hides for reduced motion.
export default function ScrollReveal() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      root.classList.remove('reveal-ready');
      return;
    }
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -8% 0px' });
    for (const el of document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)')) {
      // Anything already on screen at load is shown immediately, so nothing flickers.
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-visible');
      else observer.observe(el);
    }
    root.classList.add('reveal-ready');
    return () => observer.disconnect();
  }, [pathname]);
  return null;
}
