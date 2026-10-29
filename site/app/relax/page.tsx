import type { Metadata } from 'next';
import Link from 'next/link';import type { CSSProperties } from 'react';
export const metadata:Metadata={title:'Off Duty | Mohamed Amiin',description:'A quiet corner of the personal website of Mohamed Amiin.'};
const files=['a','b','c','d','e','f','g','h'];
export default function Relax(){return <main>
  <div className="relax-scene"><div className="relax-stars" aria-hidden="true"/><div className="relax-content"><p className="eyebrow">OFF DUTY</p><h1>Stay a <em>while.</em></h1><p>No traffic, no frequency, no rush.</p><Link href="/" className="secondary inline-action">← Back to the website</Link></div><div className="relax-ground" aria-hidden="true"><div className="relax-hill far"/><div className="relax-hill near"/><div className="relax-lights">✦ · ✧ · ✦ · ✧ · ✦ · ✧ · ✦</div></div></div>
  <section className="relax-chess" aria-labelledby="beyond-frequency"><div className="container chess-grid">
    <div className="chess-copy" data-reveal><p className="eyebrow">OFF DUTY · CHESS</p><h2 id="beyond-frequency">Beyond the <em>Frequency.</em></h2><p className="chess-lead">Chess keeps my mind sharp.</p><p>When I’m away from the frequency and my editor, chess is one of the ways I keep curiosity alive: a different kind of focus, one move at a time.</p><div className="chess-files" aria-hidden="true">{files.map(f=><span key={f}>{f}</span>)}</div></div>
    <figure className="framed-photo chess-photo" data-reveal style={{'--i':1} as CSSProperties}><img src="/images/off-duty-chess.webp" alt="Two players in the middle of a game of chess, with other boards set up in the background" width={1448} height={1086} loading="lazy" decoding="async"/><figcaption>Over the board · a personal interest</figcaption></figure>
  </div></section>
</main>}
