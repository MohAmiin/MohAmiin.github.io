import Link from 'next/link';
import { mainLink, type Project } from '../data/projects';

// One project in the Projects grid. The title links to the main page for the project and
// covers the whole card; any extra links (live site, GitHub) sit above it and stay clickable.
// Without an image the card shows a typographic cover in the site's colours.
export default function ProjectCard({ p, index }: { p: Project; index: number }) {
  const href = mainLink(p);
  const no = String(index).padStart(2, '0');
  const external = (u: string) => /^https?:/.test(u);
  const extra = [
    p.links.live && p.links.live !== href ? { href: p.links.live, label: 'Live site' } : null,
    p.links.github && p.links.github !== href ? { href: p.links.github, label: 'GitHub' } : null,
  ].filter(Boolean) as { href: string; label: string }[];

  return <article className="pcard" data-reveal>
    <div className="pcard-media">
      {p.image
        ? <img src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} loading="lazy" decoding="async" />
        : <div className="pcard-cover" aria-hidden="true"><span className="pcard-cover-no">{no}</span><span className="pcard-cover-cat">{p.category}</span></div>}
    </div>
    <div className="pcard-body">
      <p className="pcard-type">{p.type}</p>
      <h2 className="pcard-title">{href
        ? (external(href) ? <a className="pcard-main" href={href} target="_blank" rel="noopener noreferrer">{p.name}</a> : <Link className="pcard-main" href={href}>{p.name}</Link>)
        : p.name}</h2>
      <p className="pcard-desc">{p.description}</p>
      <p className={`pill pill-${p.status.tone}`}><span className="pill-dot" aria-hidden="true" />{p.status.label}</p>
      {p.stack.length > 0 && <ul className="tags" aria-label="Tools and technologies">{p.stack.map(s => <li key={s}>{s}</li>)}</ul>}
      {(href || extra.length > 0) && <p className="pcard-links">
        {href && <span className="pcard-go" aria-hidden="true">{p.links.caseStudy?.startsWith('/projects/') ? 'Case study' : p.links.caseStudy ? 'Read more' : 'Open'} ↗</span>}
        {extra.map(l => <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>)}
      </p>}
    </div>
  </article>;
}
