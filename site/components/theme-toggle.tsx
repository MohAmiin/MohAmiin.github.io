'use client';
import { useEffect, useState } from 'react';

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
  function switchTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
    window.localStorage.setItem('portfolio-theme', next);
  }
  return <button className="theme-toggle" type="button" aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={theme === 'light'} onClick={switchTheme}>
    <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span><span className="tt-label">{theme === 'dark' ? ' Light mode' : ' Dark mode'}</span>
  </button>;
}
