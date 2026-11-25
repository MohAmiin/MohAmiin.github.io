'use client';
import { useEffect, useState } from 'react';
import ThemeToggle from '../theme-toggle';

const links: [string, string][] = [['/projects', 'Projects'], ['/#skills', 'Skills'], ['/about', 'About'], ['/aviation', 'Aviation'], ['/#offduty', 'Off duty'], ['/contact', 'Contact']];
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ/<>*#';

// A nav link that scrambles into code-like characters on hover, then resolves.
function ScrambleLink({ href, label }: { href: string; label: string }) {
  const [text, setText] = useState(label);
  const [busy, setBusy] = useState(false);
  const run = () => {
    if (busy || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setBusy(true);
    let f = 0;
    const total = label.length * 3;
    const step = () => {
      setText(label.split('').map((ch, i) => (i < f / 3 ? label[i] : ch === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join(''));
      if (++f <= total) setTimeout(step, 22); else { setText(label); setBusy(false); }
    };
    step();
  };
  return <a href={href} onPointerEnter={run} aria-label={label}><span aria-hidden="true">{text}</span></a>;
}

export default function HomeHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open]);
  return <>
    <header className={scrolled ? 'h4-header scrolled' : 'h4-header'}>
      <div className="h4-wrap h4-nav">
        <a href="/" className="h4-brand" aria-label="Mohamed Amiin, home"><span className="h4-seal" aria-hidden="true">ma</span><span><b>Mohamed Amiin</b><small>IDEAS &amp; CREATIVE WORK</small></span></a>
        <nav className="h4-links" aria-label="Primary navigation">{links.map(([h, l]) => <ScrambleLink key={h} href={h} label={l} />)}</nav>
        <div className="h4-right">
          <ThemeToggle />
          <a href="https://cv.mohamedamiin.com" className="h4-btn h4-btn-ox">View full CV <span className="a" aria-hidden="true">↗</span></a>
          <button type="button" className="h4-burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="h4-mobile" onClick={() => setOpen(o => !o)}><span /><span /></button>
        </div>
      </div>
    </header>
    <nav id="h4-mobile" className={open ? 'h4-mobile open' : 'h4-mobile'} aria-label="Mobile navigation" aria-hidden={!open}>
      {links.map(([h, l], i) => <a key={h} href={h} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>{l} <small>{String(i + 1).padStart(2, '0')}</small></a>)}
      <a href="/library" tabIndex={open ? 0 : -1}>My Library <small>→</small></a>
      <a href="/films" tabIndex={open ? 0 : -1}>My Films <small>→</small></a>
      <a href="https://cv.mohamedamiin.com" tabIndex={open ? 0 : -1}>View full CV <small>↗</small></a>
    </nav>
  </>;
}
