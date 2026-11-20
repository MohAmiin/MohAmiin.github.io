'use client';
import { useEffect, useState, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';

type Theme = 'dark' | 'light';

// Browser UI colour (address bar, task switcher) for each theme; keep in step with --bg in globals.css.
const themeColor: Record<Theme, string> = { dark: '#2A1215', light: '#F5EFE3' };

// Apply the theme and point every theme-color meta at it, so a manual choice overrides the OS-based default.
function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll('meta[name="theme-color"]').forEach(m => m.setAttribute('content', themeColor[theme]));
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');
  useEffect(() => {
    const saved = window.localStorage.getItem('portfolio-theme');
    const initial: Theme = saved === 'light' || saved === 'dark'
      ? saved : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    setTheme(initial);
    applyTheme(initial);
  }, []);
  function switchTheme(e: MouseEvent<HTMLButtonElement>) {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    const apply = () => {
      flushSync(() => setTheme(next));
      applyTheme(next);
      try { window.localStorage.setItem('portfolio-theme', next); } catch { /* storage may be blocked */ }
    };
    // Where supported, the new theme spreads out in a circle from the button.
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    if (!doc.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { apply(); return; }
    const x = e.clientX || window.innerWidth - 60, y = e.clientY || 60;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    doc.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 800, easing: 'cubic-bezier(.2,.7,.1,1)', pseudoElement: '::view-transition-new(root)' },
      );
    }).catch(() => undefined);
  }
  return <button className="theme-toggle" type="button" aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={theme === 'light'} onClick={switchTheme}>
    <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span><span className="tt-label">{theme === 'dark' ? ' Light mode' : ' Dark mode'}</span>
  </button>;
}
