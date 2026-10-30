import type { Metadata } from 'next';
import Link from 'next/link';import type { CSSProperties } from 'react';import RelaxSoundscape from '../../components/relax-soundscape';
export const metadata:Metadata={title:'Off Duty | Mohamed Amiin',description:'A quiet corner of the personal website of Mohamed Amiin.'};
const files=['a','b','c','d','e','f','g','h'];
// Meadow layout, fixed so server and client render the same scene: [left %, stem px, colour, sway s, delay s].
const flowers:[number,number,number,number,number][]=[[3,30,0,5.2,0],[7,44,1,6.1,-1.2],[11,24,2,5.6,-2.8],[15,38,0,6.8,-.6],[19,28,3,5.1,-3.4],[23,46,1,6.4,-1.9],[27,22,2,5.9,-4.1],[31,34,0,6.2,-.9],[35,26,3,5.4,-2.2],[39,40,1,6.9,-3.7],[61,36,2,5.7,-1.4],[65,24,0,6.3,-2.9],[69,42,3,5.5,-.4],[73,30,1,6.6,-3.1],[77,20,2,5.3,-1.7],[81,38,0,6.1,-4.4],[85,26,3,5.8,-.2],[89,44,1,6.7,-2.5],[93,28,2,5.2,-3.9],[97,34,0,6.0,-1.1],[46,18,1,5.6,-2.6],[50,22,0,6.2,-.8],[54,18,3,5.9,-3.3]];
// Fireflies stay near the edges of the scene, clear of the text and controls: [left %, top %, cycle s, delay s].
const fireflies:[number,number,number,number][]=[[6,58,7,0],[13,34,9,-3],[19,72,8,-6],[80,46,10,-2],[87,28,7.5,-5],[94,64,9.5,-1],[9,84,11,-7],[91,82,8.5,-4]];
const v=(o:Record<string,string|number>)=>o as CSSProperties;
// Verified profile: the URL already published on the original site (index.html). Challenges are sent from the profile page.
const chessUsername='moeamiinalpha';
const chessProfile=`https://www.chess.com/member/${chessUsername}`;
export default function Relax(){return <main>
  <div className="relax-scene"><div className="relax-stars" aria-hidden="true"/><div className="relax-fireflies" aria-hidden="true">{fireflies.map(([x,y,d,delay],n)=><span key={n} style={v({left:`${x}%`,top:`${y}%`,'--d':`${d}s`,'--delay':`${delay}s`})}/>)}</div><div className="relax-content"><p className="eyebrow">OFF DUTY</p><h1>Stay a <em>while.</em></h1><p>No traffic, no frequency, no rush.</p><RelaxSoundscape/><Link href="/" className="relax-back">← Back to the website</Link></div><div className="relax-ground" aria-hidden="true"><div className="relax-hill far"/><div className="relax-hill near"/><div className="relax-meadow">{flowers.map(([x,h,c,d,delay],n)=><span key={n} className={`flower c${c}`} style={v({left:`${x}%`,'--h':`${h}px`,'--d':`${d}s`,'--delay':`${delay}s`})}/>)}</div></div></div>
  <section className="chess-challenge" aria-labelledby="challenge-heading"><div className="container challenge-grid">
    <figure className="challenge-portrait" data-reveal>{/* The frame trims the bottom edge, where an editing-app watermark sits. */}<div className="challenge-portrait-frame"><img src="/images/chess-portrait-bw.webp" alt="Black-and-white portrait of Mohamed Amiin behind a chessboard, a white king in the foreground" width={843} height={1264} fetchPriority="high"/></div></figure>
    <div className="challenge-copy" data-reveal style={{'--i':1} as CSSProperties}><p className="eyebrow">OFF DUTY · CHESS.COM</p><h2 id="challenge-heading">Challenge me to <em>a chess game.</em></h2><p className="challenge-lead">Fancy a game? Find me on Chess.com and send a challenge.</p>
      <dl className="challenge-facts"><div><dt>PLATFORM</dt><dd>Chess.com</dd></div><div><dt>USERNAME</dt><dd>{chessUsername}</dd></div></dl>
      <div className="actions"><a className="primary" href={chessProfile} target="_blank" rel="noopener noreferrer">Challenge Me on Chess.com ↗<span className="sr-only"> (opens Chess.com in a new tab)</span></a><a className="secondary" href={chessProfile} target="_blank" rel="noopener noreferrer">View My Profile ↗<span className="sr-only"> (opens Chess.com in a new tab)</span></a></div></div>
  </div></section>
  <section className="relax-chess" aria-labelledby="beyond-frequency"><div className="container chess-grid">
    <div className="chess-copy" data-reveal><p className="eyebrow">OFF DUTY · CHESS</p><h2 id="beyond-frequency">Beyond the <em>Frequency.</em></h2><p className="chess-lead">Chess keeps my mind sharp.</p><p>When I’m away from the frequency and my editor, chess is one of the ways I keep curiosity alive: a different kind of focus, one move at a time.</p><div className="chess-files" aria-hidden="true">{files.map(f=><span key={f}>{f}</span>)}</div></div>
    <figure className="framed-photo chess-photo" data-reveal style={{'--i':1} as CSSProperties}><img src="/images/off-duty-chess.webp" alt="Two players in the middle of a game of chess, with other boards set up in the background" width={1448} height={1086} loading="lazy" decoding="async"/><figcaption>Over the board · a personal interest</figcaption></figure>
  </div></section>
</main>}
