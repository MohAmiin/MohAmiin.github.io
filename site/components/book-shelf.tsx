'use client';
import { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

export type Book = {
  title: string; author: string; group: 'islam' | 'build' | 'mind' | 'money' | 'think' | 'free';
  label: string; about: string; bg: string; ink: string;
  cover?: string; pdf?: string; read?: string;
};

const filters: [Book['group'] | 'all', string][] = [['all', 'All'], ['islam', 'Islamic'], ['build', 'Building'], ['mind', 'Mindset'], ['money', 'Money'], ['think', 'Thinking'], ['free', 'Free classics']];

// Books with an approved cover photo show it; the rest get a typographic cover in the book's colours.
function Cover({ b }: { b: Book }) {
  if (b.cover) return <div className="bk-cover bk-cover-img" aria-hidden="true">{b.pdf && <span className="bk-free">Free</span>}<img src={b.cover} alt="" loading="lazy" decoding="async" /></div>;
  return <div className="bk-cover" style={{ '--c-bg': b.bg, '--c-ink': b.ink } as CSSProperties} aria-hidden="true">
    {b.pdf && <span className="bk-free">Free</span>}
    <span className="bk-t">{b.title}</span><span className="bk-mark" /><span className="bk-a">{b.author}</span>
  </div>;
}

function Action({ b }: { b: Book }) {
  if (b.pdf) return <a className="bk-act bk-dl" href={b.pdf} download>Download free PDF ↓</a>;
  if (b.read) return <a className="bk-act" href={b.read} target="_blank" rel="noopener noreferrer">Read free online ↗<span className="sr-only"> (opens in a new tab)</span></a>;
  const find = `https://www.google.com/search?tbm=bks&q=${encodeURIComponent(`${b.title} ${b.author}`)}`;
  return <a className="bk-act" href={find} target="_blank" rel="noopener noreferrer">Find the book ↗<span className="sr-only"> (opens in a new tab)</span></a>;
}

export default function BookShelf({ books, holy }: { books: Book[]; holy: ReactNode }) {
  const [f, setF] = useState<Book['group'] | 'all'>('all');
  const shown = books.filter(b => f === 'all' || b.group === f);
  return <>
    <div className="bk-filters" role="group" aria-label="Filter books">
      {filters.map(([key, name]) => <button type="button" key={key} aria-pressed={f === key} onClick={() => setF(key)}>{name}</button>)}
    </div>
    {(f === 'all' || f === 'islam') && holy}
    <div className="bk-shelf">
      {shown.map(b => <article className="bk" key={b.title}>
        <div className="bk-stand"><Cover b={b} /></div>
        <span className="bk-cat">{b.label}</span>
        <h2>{b.title}</h2>
        <p className="bk-by">{b.author}</p>
        <p className="bk-about">{b.about}</p>
        <Action b={b} />
      </article>)}
    </div>
  </>;
}
