import type { CSSProperties } from 'react';
import FlightIntro from '../components/flight-intro';
const experience = [
  { date: '2022 — Present', title: 'Air Traffic Controller', place: 'Berbera International Airport (HCMI)', detail: 'Aerodrome control, aircraft sequencing and safe, efficient runway operations.' },
  { date: '2022', title: 'Tower On-the-Job Training', place: 'Hargeisa Airport (HCMH)', detail: 'Practical tower training and operational familiarisation.' },
  { date: '2016 — 2021', title: 'Finance Officer', place: 'Sompower Electric Company', detail: 'Accounting and financial operations before transitioning into aviation.' },
];
const training = [
  'ICAO 052 — ATC simulation · Fujairah Aviation Academy',
  'ICAO 051 — ATS licensing',
  'ICAO 291 — Aviation English',
  'ICAO English Language Proficiency — Level 4',
  'MBA — Accounting · Amoud International University',
];
const projects = [
  { number: '01', name: 'Airport Operations Management System', type: 'AVIATION SOFTWARE', description: 'A web platform for the control tower: arrival and departure registers, a digital tower logbook, aircraft on ground and operational reporting.', status: 'Development complete' },
  { number: '02', name: 'Jareeye Moto Delivery', type: 'MOBILE APP', description: 'Partially developed prototype — market validation in progress.', status: 'Prototype' },
  { number: '03', name: 'Websites for businesses', type: 'WEB DEVELOPMENT', description: 'Building practical, responsive digital experiences for local businesses and organisations.', status: 'Selected work' },
];
export default function Home() {
  return <main>
    <section id="home" className="hero midnight-hero"><div className="midnight-stars" aria-hidden="true"/><FlightIntro/><div className="midnight-horizon" aria-hidden="true"><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/></div>
      <div className="hero-grid container">
        <div className="hero-content">
          <p className="eyebrow"><span className="signal"/> AIR TRAFFIC CONTROLLER AT BERBERA, HCMI</p>
          <p className="hello">AIR TRAFFIC CONTROLLER & SOFTWARE DEVELOPER</p>
          <h1>Mohamed Amiin<br/><em>Abdirahman Hassan.</em></h1>
          <p className="lead">Calm in the tower,<br/>curious at the keyboard.</p>
          <p className="hero-copy">I keep traffic safe and moving at Berbera International Airport, day and night, and I build software that makes tower work simpler.</p>
          <div className="actions"><a className="whatsapp-action" href="https://wa.me/252659740002" target="_blank" rel="noreferrer">WhatsApp ↗</a><a href="/cv.pdf" className="primary" download>Download CV ↗</a><a href="mailto:Mohamedjareeye@gmail.com" className="secondary">Email ↗</a></div>
        </div>
        <div className="visual-stack"><figure className="hero-portrait"><div className="hero-portrait-frame"><img src="/images/hero-midnight.jpg" alt="Mohamed Amiin in a navy suit" width={1024} height={1536} fetchPriority="high" /></div><figcaption className="photo-tag">MOHAMED AMIIN · PERSONAL PORTFOLIO</figcaption></figure><div className="radar-card midnight-radar" aria-label="Decorative radar showing the relative direction of Berbera and Hargeisa">
          <div className="card-top"><span>RADAR / PERSONAL SITE</span><span className="live"><span className="signal"/> ON FREQUENCY</span></div>
          <div className="radar" aria-hidden="true"><div className="sweep"/><div className="cross cross-v"/><div className="cross cross-h"/><div className="ring ring-one"/><div className="ring ring-two"/><div className="ring ring-three"/><div className="target t1"/><div className="target t2"/><span className="radar-label label1">HCMI</span><span className="radar-label label2">HCMH</span></div>
          <div className="radar-bottom"><span>BERBERA NE OF HARGEISA</span><span>NOT FOR NAVIGATION</span></div>
        </div></div>
      </div>
      <div className="hero-foot container"><span>BERBERA · SOMALILAND</span><span>SCROLL TO EXPLORE ↓</span></div>
    </section>
    <div className="glance-strip container" data-reveal><div><strong>2022</strong><span>CONTROLLING SINCE</span></div><div><strong>Day & night</strong><span>OPERATIONS AT HCMI</span></div><div><strong>3</strong><span>LANGUAGES SPOKEN</span></div><div><strong>ICAO 4</strong><span>ENGLISH PROFICIENCY</span></div></div>
    <section id="about" className="section container about" data-reveal>
      <p className="section-tag">01 / ABOUT</p><div><h2>Calm in the tower,<br/><em>curious at the keyboard.</em></h2><p>I'm Mohamed Amiin Abdirahman Hassan, an air traffic controller based in Somaliland and a developer of aviation and business software. Air traffic control taught me to think clearly under pressure; coding gives me a way to improve the systems people depend on.</p><figure className="story-photo"><img src="/images/tower.jpg" alt="Mohamed Amiin at the tower controller position" width={936} height={760} loading="lazy"/><figcaption>At the controller position</figcaption></figure></div>
    </section>
    <section id="experience" className="section container" data-reveal><p className="section-tag">02 / AVIATION</p><div><h2>Where I’ve <em>worked.</em></h2><p className="section-intro">Operational experience, professional training and the path that led me to the tower.</p><div className="timeline">{experience.map((item,i)=><article className="timeline-item" data-reveal style={{'--i':i} as CSSProperties} key={item.title}><span className="item-date">{item.date}</span><div><h3>{item.title}</h3><p className="muted">{item.place}</p><p>{item.detail}</p></div></article>)}</div><h3 className="minor-heading">Training & qualifications</h3><ul className="training">{training.map(item=><li key={item}>{item}</li>)}</ul></div></section>
    <section id="projects" className="section container" data-reveal><p className="section-tag">03 / BUILDING</p><div><h2>Software I <em>design and build.</em></h2><p className="section-intro">Tools and platforms inspired by real problems. Project status is presented as development progress, not public launch claims.</p><figure className="story-photo"><img src="/images/working.jpg" alt="Mohamed Amiin working on a laptop" width={1006} height={820} loading="lazy"/><figcaption>Building tools outside the tower</figcaption></figure><div className="projects">{projects.map((p,i)=><article className="project" data-reveal style={{'--i':i} as CSSProperties} key={p.number}><span className="project-no">{p.number}</span><div><p className="eyebrow">{p.type}</p><h3>{p.name}</h3><p>{p.description}</p><span className="status">{p.status}</span></div><span className="project-arrow" aria-hidden="true">↗</span></article>)}</div></div></section>
    <section className="section container" data-reveal><p className="section-tag">04 / OFF DUTY</p><div><h2>Beyond <em>work.</em></h2><p>When I’m away from the frequency and my editor, I enjoy chess and films — two very different ways to keep curiosity alive. <a href="/relax">Need a pause? Sit in the meadow ↗</a></p></div></section>
    <section id="contact" className="contact"><div className="container contact-inner" data-reveal><p className="section-tag">05 / CONTACT</p><h2>Let's make<br/><em>contact.</em></h2><p>For aviation opportunities, software projects or collaborations, find my contact details on the current website.</p><div className="actions"><a className="primary" href="/contact">Get in touch ↗</a><a className="secondary" href="/cv.pdf" download>Download CV ↓</a></div></div></section>

  </main>;
}
