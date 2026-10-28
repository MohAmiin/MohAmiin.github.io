import type { Metadata } from 'next';
import Link from 'next/link';
export const metadata:Metadata={title:'Off Duty | Mohamed Amiin',description:'A quiet corner of the personal website of Mohamed Amiin.'};
export default function Relax(){return <main className="relax-scene"><div className="relax-stars" aria-hidden="true"/><div className="relax-content"><p className="eyebrow">OFF DUTY</p><h1>Stay a <em>while.</em></h1><p>No traffic, no frequency, no rush.</p><Link href="/" className="secondary inline-action">← Back to the website</Link></div><div className="relax-ground" aria-hidden="true"><div className="relax-hill far"/><div className="relax-hill near"/><div className="relax-lights">✦ · ✧ · ✦ · ✧ · ✦ · ✧ · ✦</div></div></main>}
