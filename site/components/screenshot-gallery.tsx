export type Screenshot = { src: string; alt: string; title: string; caption: string; width: number; height: number };

// A screenshot frame that always carries a visible demo-data badge, so no image can be read
// as live airport records. With no image it renders a labelled pending frame instead.
export function ScreenFrame({ shot, pendingLabel, priority = false }: { shot: Screenshot | null; pendingLabel: string; priority?: boolean }) {
  if (!shot) return <div className="shot-frame shot-frame-pending"><span className="shot-pending-label">{pendingLabel}</span></div>;
  return <a className="shot-frame" href={shot.src} target="_blank" rel="noreferrer" aria-label={`Open full-size demo screenshot: ${shot.title}`}>
    <img src={shot.src} alt={`${shot.alt} (demonstration data)`} width={shot.width} height={shot.height} {...(priority ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const, decoding: 'async' as const })}/>
    <span className="demo-badge" aria-hidden="true">Demo data</span>
  </a>;
}

// Workflow screenshots as editorial rows (image plus the workflow it shows). Views without an
// approved screenshot keep their caption and show a pending frame.
export default function ScreenshotGallery({ shots, planned, captions }: { shots: Screenshot[]; planned: string[]; captions: Record<string, string> }) {
  const rows = planned.map(title => ({ title, shot: shots.find(s => s.title === title) ?? null }));
  return <ol className="shot-rows">
    {rows.map(({ title, shot }, n) => <li className="shot-row" data-reveal key={title}>
      <ScreenFrame shot={shot} pendingLabel="Demo screenshot pending"/>
      <div className="shot-text"><span className="case-card-no">{String(n + 1).padStart(2, '0')} / WORKFLOW</span><h3>{title}</h3><p>{shot?.caption ?? captions[title]}</p></div>
    </li>)}
  </ol>;
}
