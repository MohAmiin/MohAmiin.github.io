'use client';
import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');
  useEffect(() => {
    const saved = window.localStorage.getItem('portfolio-theme');
    const initial: Theme = saved === 'light' || saved === 'dark'
      ? saved : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);
  function switchTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem('portfolio-theme', next);
  }
  return <button className="theme-toggle" type="button" aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={theme === 'light'} onClick={switchTheme}>
    {theme === 'dark' ? '☀ Light mode' : '☾ Dark mode'}
  </button>;
}
