'use client';
import { useEffect, useRef } from 'react';

// The Library banner: the rendered picture shows straight away, then the real 3D shelf
// (three.js, self-hosted in /public/vendor/three) fades in on top once the page has loaded.
// If WebGL is unavailable or anything fails, the picture simply stays.
const ENGINE = '/vendor/three/shelf.js';
const MODEL = '/models/library-shelf.glb';

export default function LibraryShelf3D() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const probe = document.createElement('canvas');
    if (!(probe.getContext('webgl2') || probe.getContext('webgl'))) return;

    let cleanup: (() => void) | null = null;
    let cancelled = false;
    const start = async () => {
      try {
        const engine: string = ENGINE; // a plain URL at runtime, not bundled
        const mod = await import(/* webpackIgnore: true */ engine);
        if (cancelled) return;
        const dispose = await mod.mountShelf(el, MODEL);
        if (cancelled) dispose(); else cleanup = dispose;
      } catch { /* keep the picture */ }
    };
    // Wait until the page has finished loading so the 3D never slows the first view.
    const go = () => ('requestIdleCallback' in window ? window.requestIdleCallback(() => start(), { timeout: 2000 }) : setTimeout(start, 300));
    if (document.readyState === 'complete') go(); else window.addEventListener('load', go, { once: true });

    return () => { cancelled = true; window.removeEventListener('load', go); cleanup?.(); };
  }, []);

  return <figure ref={ref} className="lib-hero" tabIndex={0} aria-describedby="lib-hero-hint">
    <img src="/images/library-shelf.webp" width={2400} height={1000} decoding="async" fetchPriority="high"
      alt="A walnut shelf against a dark navy wall. The Holy Qur'an rests first, on a wooden stand, followed by eight books: Nahjul Balagha, Riyad as-Salihin, An-Nawawi's Forty Hadith, The Sealed Nectar, Purification of the Heart, Man's Search for Meaning, Deep Work and Meditations." />
    <span id="lib-hero-hint" className="lib-hint">Drag to turn ↔<span className="sr-only">, or use the left and right arrow keys</span></span>
  </figure>;
}
