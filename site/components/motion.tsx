'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// Site-wide motion: Lenis smooth scrolling (mouse wheel and trackpad only; touch keeps native
// scrolling), a gold reading-progress bar, and GSAP + ScrollTrigger animations for the homepage
// hero, section headings, project and skill rows, and the library shelf.
//
// The libraries are loaded from cdnjs/unpkg at fixed versions, so the site needs no new npm
// packages. If they fail to load, the existing CSS animations and ScrollReveal still run.
// Nothing animates and smooth scrolling stays off when the visitor prefers reduced motion.

const GSAP = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
const SCROLLTRIGGER = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
const LENIS = 'https://unpkg.com/lenis@1.1.13/dist/lenis.min.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
type Win = Window & { gsap?: any; ScrollTrigger?: any; Lenis?: any };

const loaded = new Map<string, Promise<void>>();
function loadScript(src: string): Promise<void> {
  let p = loaded.get(src);
  if (!p) {
    p = new Promise<void>((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.crossOrigin = 'anonymous';
      s.onload = () => resolve();
      s.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(s);
    });
    loaded.set(src, p);
  }
  return p;
}

let libs: Promise<boolean> | null = null;
function loadLibs(): Promise<boolean> {
  if (!libs) {
    libs = Promise.all([
      loadScript(GSAP).then(() => loadScript(SCROLLTRIGGER)),
      loadScript(LENIS).catch(() => undefined), // smooth scroll is optional
    ]).then(() => {
      const w = window as Win;
      if (!w.gsap || !w.ScrollTrigger) return false;
      w.gsap.registerPlugin(w.ScrollTrigger);
      return true;
    }).catch(() => false);
  }
  return libs;
}

// Clears GSAP's inline styles once an entrance finishes, so CSS hover effects work again.
const done = (els: Element | Element[]) => () => {
  const list = Array.isArray(els) ? els : [els];
  for (const el of list) el.classList.remove('motion-in');
  (window as Win).gsap.set(list, { clearProps: 'transform,opacity,visibility' });
};

export default function Motion() {
  const pathname = usePathname();
  const bar = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<any>(null);

  // Smooth scrolling, set up once for the whole visit.
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) { root.classList.remove('motion-pending'); return; }
    let cancelled = false;
    let tick: ((t: number) => void) | null = null;
    let onClick: ((e: MouseEvent) => void) | null = null;

    loadLibs().then(ok => {
      const w = window as Win;
      if (cancelled || !ok) { root.classList.remove('motion-pending'); return; }
      root.classList.add('gsap-on');
      if (!w.Lenis) return;
      const lenis = new w.Lenis({
        lerp: 0.1,
        // Leave scrolling inside dialogs and menus to the browser.
        prevent: (node: Element) => node.classList?.contains('bk-zoom') || node.hasAttribute?.('data-lenis-prevent'),
      });
      lenisRef.current = lenis;
      lenis.on('scroll', w.ScrollTrigger.update);
      tick = (t: number) => lenis.raf(t * 1000);
      w.gsap.ticker.add(tick);
      w.gsap.ticker.lagSmoothing(0);

      // Same-page links (#projects, the skip link) glide, then move keyboard focus to the target.
      onClick = (e: MouseEvent) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const a = (e.target as Element | null)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null;
        if (!a || a.target === '_blank') return;
        const url = new URL(a.href, location.href);
        if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
        const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
        if (!target) return;
        e.preventDefault();
        history.pushState(null, '', url.hash);
        lenis.scrollTo(target, { onComplete: () => target.focus({ preventScroll: true }) });
      };
      document.addEventListener('click', onClick);
    });

    const onReduce = () => { if (reduce.matches && lenisRef.current) { lenisRef.current.destroy(); lenisRef.current = null; } };
    reduce.addEventListener('change', onReduce);
    return () => {
      cancelled = true;
      reduce.removeEventListener('change', onReduce);
      if (onClick) document.removeEventListener('click', onClick);
      const w = window as Win;
      if (tick && w.gsap) w.gsap.ticker.remove(tick);
      if (lenisRef.current) { lenisRef.current.destroy(); lenisRef.current = null; }
    };
  }, []);

  // Page animations, rebuilt on every route change and reverted when leaving.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ctx: any = null;
    let cancelled = false;

    loadLibs().then(ok => {
      if (cancelled || !ok) return;
      const w = window as Win;
      const gsap = w.gsap, ST = w.ScrollTrigger;
      const root = document.documentElement;
      // Only run the hero intro if the hero is still waiting for it (it gives up after 3s).
      let playIntro = root.classList.contains('motion-pending');

      ctx = gsap.context(() => {
        // Gold reading-progress bar.
        if (bar.current) gsap.fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });

        const mm = gsap.matchMedia();
        mm.add({ wide: '(min-width: 701px)' }, (c: any) => {
          // 1. Hero intro: AMIIN rises letter by letter, then the portrait, then the text.
          const hero = document.querySelector('.magazine-hero');
          if (hero && playIntro) {
            playIntro = false; // play once, not again when the window crosses a breakpoint
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.from('.magazine-word span', { yPercent: 100, autoAlpha: 0, duration: 1, stagger: 0.08 })
              .from('.magazine-photo img', { y: 70, autoAlpha: 0, duration: 1.1 }, '-=0.6')
              .from('.magazine-rule', { scaleX: 0, transformOrigin: '0 50%', duration: 0.6 }, '-=0.6')
              .from('.magazine-identity h1, .magazine-identity p, .magazine-quote, .magazine-actions a, .magazine-email', { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.07 }, '-=0.6')
              .from('.magazine-credential, .magazine-topbar', { autoAlpha: 0, duration: 0.6 }, '-=0.4');
          }
          root.classList.remove('motion-pending');

          // 2. Depth on scroll (desktop): the name drifts down while the portrait drifts up.
          if (hero && c.conditions.wide) {
            const st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
            gsap.to('.magazine-word', { yPercent: 30, ease: 'none', scrollTrigger: st });
            gsap.to('.magazine-photo img', { yPercent: -8, ease: 'none', scrollTrigger: { ...st } });
          }
        });

        // 3. Section headings slide up from behind a clean edge.
        gsap.utils.toArray('.section h2, .contact h2').forEach((h: Element) => {
          gsap.fromTo(h,
            { clipPath: 'inset(-10% -5% 100% -5%)', y: 40 },
            { clipPath: 'inset(-10% -5% -15% -5%)', y: 0, duration: 1, ease: 'power4.out',
              scrollTrigger: { trigger: h, start: 'top 88%', once: true },
              onComplete: () => gsap.set(h, { clearProps: 'clipPath,transform' }) });
        });

        // 4. Rows and cards arrive in a short cascade.
        const cascade = (selector: string, from: object) => {
          const items = gsap.utils.toArray(selector) as Element[];
          if (!items.length) return;
          gsap.set(items, from);
          ST.batch(items, {
            start: 'top 90%', once: true,
            onEnter: (batch: Element[]) => {
              batch.forEach(el => el.classList.add('motion-in'));
              gsap.to(batch, { x: 0, y: 0, rotationY: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out', stagger: 0.09, overwrite: true, onComplete: done(batch) });
            },
          });
        };
        cascade('.glance-strip > div', { y: 24, autoAlpha: 0 });
        cascade('.project, .timeline-item', { y: 36, autoAlpha: 0 });
        // 5. Library: books slide onto the shelf.
        cascade('.bk-holy', { y: 30, autoAlpha: 0 });
        cascade('.bk', { x: -36, rotationY: -30, transformPerspective: 800, autoAlpha: 0 });

        // Filtering the shelf moves books around, so show any still waiting to slide in.
        const filters = document.querySelector('.bk-filters');
        const showAll = () => requestAnimationFrame(() => {
          const waiting = (gsap.utils.toArray('.bk') as HTMLElement[]).filter(el => el.style.visibility === 'hidden');
          if (waiting.length) done(waiting)();
          ST.refresh();
        });
        filters?.addEventListener('click', showAll);
        return () => filters?.removeEventListener('click', showAll);
      });

      requestAnimationFrame(() => ST.refresh());
    });

    return () => { cancelled = true; if (ctx) ctx.revert(); };
  }, [pathname]);

  return <div ref={bar} className="scroll-progress" aria-hidden="true" />;
}
