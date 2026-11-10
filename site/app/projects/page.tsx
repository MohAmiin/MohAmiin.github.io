import Link from 'next/link';
import { ScreenFrame } from '../../components/screenshot-gallery';
import { aomsDashboard } from '../../components/aoms-screens';
import ProjectCard from '../../components/project-card';
import { projects, mainLink } from '../../data/projects';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Mohamed Amiin',
  description: 'Software, design and practical tools by Mohamed Amiin: the Airport Operations Management System, the Jareeye delivery app, websites, Excel tools and graphic design.',
};

// Project content lives in site/data/projects.ts.
export default function Projects() {
  const featured = projects.find(p => p.featured);
  const rest = projects.filter(p => p !== featured);
  return <main className="container detail-page projects-page">
    <header className="projects-intro"><div><p className="eyebrow">PROJECTS</p><h1 className="detail-title">What I <em>create.</em></h1></div><p className="detail-lead">Software, design and practical tools inspired by real needs — a portfolio of what I build and create.</p></header>
    <figure className="framed-photo photo-wide projects-hero-photo"><img src="/images/projects-sunset.webp" alt="Mohamed Amiin developing software at a laptop" width={1672} height={941} fetchPriority="high"/><figcaption>Working on digital products</figcaption></figure>

    {featured && <section className={aomsDashboard ? 'featured-case' : 'featured-case featured-solo'} data-reveal aria-labelledby="featured-case-title">
      <div className="featured-body">
        <p className="item-date">FEATURED CASE STUDY · 01 / {featured.type}</p>
        <h2 id="featured-case-title">{featured.name}</h2>
        <p>{featured.description}</p>
        {featured.highlights && <ul className="chips" aria-label="Key features">{featured.highlights.map(h => <li key={h}>{h}</li>)}</ul>}
        {featured.stack.length > 0 && <ul className="tags" aria-label="Tools and technologies">{featured.stack.map(s => <li key={s}>{s}</li>)}</ul>}
        <div className="featured-foot">
          <p className={`pill pill-${featured.status.tone}`}><span className="pill-dot" aria-hidden="true"/>{featured.status.label}</p>
          {mainLink(featured) && <Link className="primary" href={mainLink(featured)}>Read the case study ↗</Link>}
        </div>
      </div>
      {aomsDashboard && <figure className="featured-visual"><ScreenFrame shot={aomsDashboard} pendingLabel=""/><figcaption>Tower dashboard · demo data</figcaption></figure>}
    </section>}

    <section aria-label="More projects" className="pgrid">
      {rest.map((p, i) => <ProjectCard key={p.slug} p={p} index={i + 2} />)}
    </section>
  </main>;
}
