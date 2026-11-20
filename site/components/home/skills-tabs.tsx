'use client';
import { useRef, useState, type KeyboardEvent } from 'react';

export type SkillArea = { key: string; title: string; em: string; detail: string; tools: string[] };

// Four disciplines as tabs; the panel shows the tools for the one selected.
export default function SkillsTabs({ areas }: { areas: SkillArea[] }) {
  const [i, setI] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const a = areas[i];
  const onKey = (e: KeyboardEvent) => {
    const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + areas.length) % areas.length;
    setI(n); tabs.current[n]?.focus();
  };
  return <div className="h4-skills">
    <div className="h4-tabs" role="tablist" aria-label="Skill areas" onKeyDown={onKey}>
      {areas.map((x, j) => <button key={x.key} ref={el => { tabs.current[j] = el; }} className="h4-tab" role="tab" id={`h4-tab-${j}`} aria-selected={j === i} aria-controls="h4-panel" tabIndex={j === i ? 0 : -1} onClick={() => setI(j)}>
        {x.title} {x.em}<span className="h4-mono">{String(j + 1).padStart(2, '0')}</span>
      </button>)}
    </div>
    <div className="h4-panel" role="tabpanel" id="h4-panel" aria-labelledby={`h4-tab-${i}`} key={a.key}>
      <h3>{a.title} <em>{a.em}</em></h3>
      <p>{a.detail}</p>
      <ul className="h4-chips" aria-label={`${a.title} ${a.em} tools`}>{a.tools.map((t, j) => <li key={t} style={{ animationDelay: `${j * 0.06}s` }}>{t}</li>)}</ul>
      <span className="big" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
    </div>
  </div>;
}
