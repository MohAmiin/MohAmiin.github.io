'use client';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { films, groups, type Film, type FilmGroup } from '../data/films';

const keys = Object.keys(groups) as FilmGroup[];
const id = (f: Film) => `film-${f.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

// A typographic "poster" in the film's group colours (no copyrighted artwork).
function Poster({ f }: { f: Film }) {
  const g = groups[f.group];
  return <div className="fm-poster" style={{ '--p-bg': g.bg, '--p-ink': g.ink, '--p-ac': g.accent } as CSSProperties} aria-hidden="true">
    <span className="fm-p-group">{g.name}</span>
    <span className="fm-p-title">{f.title}</span>
    <span className="fm-p-year">{f.year}</span>
  </div>;
}

export default function FilmShelf() {
  const [g, setG] = useState<FilmGroup | 'all'>('all');
  const [picked, setPicked] = useState<string | null>(null);
  const [say, setSay] = useState('');
  const timer = useRef<number | undefined>(undefined);
  const shown = films.filter(f => g === 'all' || f.group === g);
  const top = films.find(f => f.pick);

  const pick = () => {
    const pool = shown.filter(f => id(f) !== picked);
    const f = pool[Math.floor(Math.random() * pool.length)];
    if (!f) return;
    setPicked(id(f));
    setSay(`Tonight's pick: ${f.title} (${f.year}).`);
    const el = document.getElementById(id(f));
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    el?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => el?.querySelector<HTMLElement>('.fm-watch')?.focus({ preventScroll: true }), reduce ? 0 : 600);
  };
  useEffect(() => () => window.clearTimeout(timer.current), []);

  return <>
    <div className="fm-tools">
      <div className="bk-filters" role="group" aria-label="Filter films">
        <button type="button" aria-pressed={g === 'all'} onClick={() => setG('all')}>All <span className="fm-count">{films.length}</span></button>
        {keys.map(k => <button type="button" key={k} aria-pressed={g === k} onClick={() => setG(k)}>{groups[k].name}</button>)}
      </div>
      <button type="button" className="primary fm-pick" onClick={pick}>Pick a film for me ↻</button>
    </div>
    <p className="sr-only" aria-live="polite">{say}</p>
    {say && <p className="fm-say" aria-hidden="true">{say}</p>}
    {top && g === 'all' && <p className="fm-top-label">My top pick</p>}
    <div className="fm-grid">
      {shown.slice().sort((a, b) => Number(!!b.pick && g === 'all') - Number(!!a.pick && g === 'all')).map(f =>
        <article className={`fm${picked === id(f) ? ' is-picked' : ''}${f.pick && g === 'all' ? ' is-top' : ''}`} id={id(f)} key={f.title}>
          <Poster f={f} />
          <div className="fm-body">
            <p className="fm-meta">{f.year} · {f.genre}{f.lang ? ` · ${f.lang}` : ''}</p>
            <h2>{f.title}</h2>
            <p className="fm-about">{f.about}</p>
            {f.mature && <p className="fm-mature"><span aria-hidden="true">!</span> {f.mature}</p>}
            <p className="fm-links">
              <a className="fm-watch" href={`https://www.google.com/search?q=${encodeURIComponent(`where to watch ${f.title} ${f.year}`)}`} target="_blank" rel="noopener noreferrer">Where to watch ↗<span className="sr-only"> {f.title} (opens in a new tab)</span></a>
              <a href={`https://www.imdb.com/find/?q=${encodeURIComponent(`${f.title} ${f.year}`)}`} target="_blank" rel="noopener noreferrer">IMDb ↗<span className="sr-only"> {f.title} (opens in a new tab)</span></a>
            </p>
          </div>
        </article>)}
    </div>
  </>;
}
