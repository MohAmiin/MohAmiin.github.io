import type { Metadata } from 'next';import type { CSSProperties } from 'react';
export const metadata: Metadata={title:'Graphic design | Mohamed Amiin',description:'Graphic design by Mohamed Amiin: a campaign for Somaliland Recognition Day, 26 December 2025.'};
// Each piece is shown whole (no cropping), so the layout and type read exactly as designed.
const pieces=[
  {src:'/images/design/recognition-day-map.webp',title:'The land, the flag',alt:'Poster: a man in a suit holds the Somaliland flag on a floating, map-shaped landscape at sunrise, with the text "Somaliland Recognition Day, 26 Dec"'},
  {src:'/images/design/recognition-day-crowd.webp',title:'A nation celebrates',alt:'Poster: green silhouettes of a cheering crowd beneath waving Somaliland flags, with the text "26 December, Recognition Day, Somaliland"'},
  {src:'/images/design/recognition-day-ribbon.webp',title:'Leadership & the flag',alt:'Poster: portrait of the President of Somaliland beside a flowing Somaliland flag ribbon, with the text "26 December, Recognition Day, Somaliland"'},
];
export default function Design(){return <main className="container detail-page design-page">
  <header className="projects-intro"><div><p className="eyebrow">GRAPHIC DESIGN</p><h1 className="detail-title">Ideas, <em>made visual.</em></h1></div><p className="detail-lead">Concept, composition and typography for posters and social media. More work will be added over time.</p></header>
  <section className="page-section" data-reveal aria-labelledby="campaign-recognition">
    <p className="item-date">CAMPAIGN · DECEMBER 2025</p>
    <h2 id="campaign-recognition">Somaliland <em>Recognition Day.</em></h2>
    <p className="section-intro">A poster series celebrating 26 December 2025, the day Israel became the first country to recognise Somaliland. Each design carries my M mark.</p>
    <div className="design-grid">{pieces.map((p,i)=><figure className="design-piece" data-reveal style={{'--i':i} as CSSProperties} key={p.src}><a href={p.src} target="_blank" rel="noreferrer" aria-label={`Open full-size design: ${p.title}`}><img src={p.src} alt={p.alt} width={1536} height={1024} loading={i===0?'eager':'lazy'} decoding="async"/></a><figcaption>{p.title}</figcaption></figure>)}</div>
  </section>
  <a className="secondary inline-action" href="/projects">← All projects</a>
</main>}
