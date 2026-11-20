'use client';
import { useEffect } from 'react';

// Page-wide effects for the homepage, set up after load and fully removed on unmount:
// reveals, the custom cursor, magnetic buttons, the stacking project cards, 3D tilt on the
// off-duty cards, the experience timeline line, photo parallax and the portrait drift.
// Nothing here runs for visitors who prefer reduced motion (content then stays visible).
export default function HomeFx() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const page = document.querySelector<HTMLElement>('.h4');
    if (!page) return;
    requestAnimationFrame(() => page.classList.add('h4-loaded'));
    if (reduce) return;
    const off: (() => void)[] = [];
    const on = <K extends keyof WindowEventMap>(t: Window, ev: K, fn: (e: WindowEventMap[K]) => void) => { t.addEventListener(ev, fn as EventListener, { passive: true }); off.push(() => t.removeEventListener(ev, fn as EventListener)); };
    const onEl = (el: Element, ev: string, fn: (e: PointerEvent) => void) => { el.addEventListener(ev, fn as EventListener); off.push(() => el.removeEventListener(ev, fn as EventListener)); };

    // Reveals (content is only hidden once this class is set).
    page.classList.add('h4-js');
    const rv = Array.from(page.querySelectorAll<HTMLElement>('.h4-rv'));
    const groups = new Map<Element | null, number>();
    rv.forEach(el => { const p = el.parentElement, i = groups.get(p) ?? 0; groups.set(p, i + 1); el.style.transitionDelay = `${Math.min(i * .08, .5)}s`; });
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    rv.forEach(el => io.observe(el));
    off.push(() => io.disconnect());

    // Scroll-driven pieces, batched into one frame.
    const cards = Array.from(page.querySelectorAll<HTMLElement>('.h4-card'));
    const exp = page.querySelector<HTMLElement>('.h4-exp'), line = page.querySelector<HTMLElement>('.h4-exp .line');
    const pars = Array.from(page.querySelectorAll<HTMLElement>('.h4-par'));
    const portrait = page.querySelector<HTMLElement>('#h4-portrait');
    let ticking = false;
    const update = () => {
      ticking = false;
      cards.forEach((c, i) => {
        const n = cards[i + 1];
        if (!n) return;
        const r = c.getBoundingClientRect(), nr = n.getBoundingClientRect();
        const k = Math.max(0, Math.min(1, (r.bottom - nr.top) / r.height));
        c.style.transform = k ? `scale(${1 - k * .06})` : '';
        c.style.filter = k ? `brightness(${1 - k * .35})` : '';
      });
      if (exp && line) { const r = exp.getBoundingClientRect(); line.style.height = `${Math.max(0, Math.min(1, (innerHeight * .7 - r.top) / r.height)) * 100}%`; }
      pars.forEach(im => { const r = im.parentElement!.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return; const k = (r.top + r.height / 2 - innerHeight / 2) / innerHeight; im.style.transform = `translateY(${-7 - k * 8}%)`; });
      if (portrait && scrollY < 900) portrait.style.transform = `translateY(${-scrollY * .08}px)`;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    on(window, 'scroll', onScroll); on(window, 'resize', onScroll); update();

    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (fine) {
      // Custom cursor: a dot plus a ring that trails it and grows over things you can open.
      const dot = document.createElement('div'), ring = document.createElement('div');
      dot.className = 'h4-cur'; ring.className = 'h4-ring';
      dot.setAttribute('aria-hidden', 'true'); ring.setAttribute('aria-hidden', 'true');
      page.append(dot, ring);
      let mx = -100, my = -100, rx = -100, ry = -100, raf = 0;
      on(window, 'pointermove', e => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx - 3}px,${my - 3}px)`; });
      const loop = () => { rx += (mx - rx) * .18; ry += (my - ry) * .18; ring.style.left = `${rx}px`; ring.style.top = `${ry}px`; raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
      off.push(() => { cancelAnimationFrame(raf); dot.remove(); ring.remove(); });
      const bind = (sel: string, cls: string, label = '') => page.querySelectorAll(sel).forEach(el => {
        onEl(el, 'pointerenter', () => { ring.className = `h4-ring ${cls}`; ring.textContent = label; });
        onEl(el, 'pointerleave', () => { ring.className = 'h4-ring'; ring.textContent = ''; });
      });
      bind('a,button', 'link'); bind('.h4-vis', 'big', 'View'); bind('.h4-photo,.h4-portrait', 'big', 'Hi');

      // Buttons lean toward the cursor.
      page.querySelectorAll<HTMLElement>('.h4-btn').forEach(b => {
        onEl(b, 'pointermove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px,${(e.clientY - r.top - r.height / 2) * .28}px)`; });
        onEl(b, 'pointerleave', () => { b.style.transform = ''; });
      });
      // Off-duty cards tilt in 3D.
      page.querySelectorAll<HTMLElement>('.h4-od').forEach(c => {
        onEl(c, 'pointermove', e => { const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; c.style.transition = 'background .4s,color .4s'; c.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 16}deg) translateY(-6px)`; });
        onEl(c, 'pointerleave', () => { c.style.transition = ''; c.style.transform = ''; });
      });
    }
    return () => { off.forEach(f => f()); page.classList.remove('h4-js'); root.classList.remove('h4-intro'); };
  }, []);
  return null;
}
