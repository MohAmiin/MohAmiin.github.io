import type { CSSProperties } from 'react';
import ThemeToggle from '../components/theme-toggle';
const experience = [
  { date: '2022 — Present', title: 'Air Traffic Controller', place: 'Berbera International Airport (HCMI)', detail: 'Aerodrome control, aircraft sequencing and safe, efficient runway operations.' },
  { date: '2022', title: 'Tower On-the-Job Training', place: 'Hargeisa Airport (HCMH)', detail: 'Practical tower training and operational familiarisation.' },
  { date: '2016 — 2021', title: 'Finance Officer', place: 'Sompower Electric Company', detail: 'Accounting and financial operations before transitioning into aviation.' },
  { date: 'Project-based', title: 'Freelance Accountant', place: 'Small businesses', detail: 'Accounting support, QuickBooks Online and Desktop and Odoo setup, and customized Excel accounting forms.' },
];
const training = [
  'ICAO 052 — ATC simulation · Fujairah Aviation Academy',
  'ICAO 051 — ATS licensing',
  'ICAO 291 — Aviation English',
  'ICAO English Language Proficiency — Level 4',
  'MBA (Accounting and Finance) · Amoud International University',
];
const projects = [
  { number: '01', name: 'Airport Operations Management System', type: 'AVIATION SOFTWARE', description: 'A web platform for the control tower: arrival and departure registers, a digital tower logbook, aircraft on ground and operational reporting.', status: 'Development complete' },
  { number: '02', name: 'Jareeye Moto Delivery', type: 'MOBILE APP', description: 'Partially developed prototype — market validation in progress.', status: 'Prototype' },
  { number: '03', name: 'Websites for businesses', type: 'WEB DEVELOPMENT', description: 'Building practical, responsive digital experiences for local businesses and organisations.', status: 'Selected work' },
];
export default function Home() {
  return <main>
    <section id="home" className="magazine-hero">
      <header className="magazine-topbar">
        <span className="magazine-volume">VOL. 01 · BERBERA · HCMI</span>
        <div className="magazine-header-actions">
          <nav className="magazine-nav" aria-label="Primary navigation">
            <a href="/about">About</a><a href="/aviation">Experience</a><a href="/projects">Projects</a><a href="/relax">Off duty</a><a href="/contact">Contact</a>
          </nav>
          <a className="magazine-top-cv" href="/cv.pdf" download>CV ↓</a>
          <ThemeToggle/>
          <details className="magazine-mobile-menu">
            <summary>Menu</summary>
            <nav aria-label="Mobile primary navigation">
              <a href="/about">About</a><a href="/aviation">Experience</a><a href="/projects">Projects</a><a href="/relax">Off duty</a><a href="/contact">Contact</a>
              <a href="/cv.pdf" download>Download CV ↓</a>
            </nav>
          </details>
        </div>
      </header>
      <div className="magazine-word" aria-hidden="true">AMIIN</div>
      <figure className="magazine-photo">
        <img src="/images/portrait-landing-hero.webp" alt="Mohamed Amiin in a navy suit, white shirt, navy tie and glasses" width={1254} height={1254} fetchPriority="high"/>
      </figure>
      <div className="magazine-columns">
        <div className="magazine-identity">
          <h1>Mohamed Amiin<br/><em>Abdirahman Hassan.</em></h1>
          <div className="magazine-rule" aria-hidden="true"/>
          <p>Air traffic controller at Berbera International Airport. Developer of software that makes tower work simpler.</p>
        </div>
        <div className="magazine-right">
          <p className="magazine-quote">Calm in the tower, curious at the keyboard.</p>
          <div className="magazine-actions">
            <a className="magazine-whatsapp" href="https://wa.me/252659740002" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a className="magazine-download" href="/cv.pdf" download>Download CV</a>
          </div>
          <a className="magazine-email" href="mailto:Mohamedjareeye@gmail.com">Email ↗</a>
        </div>
      </div>
      <p className="magazine-credential">LICENSED ATCO · ICAO ELP 4 · SINCE 2022</p>
    </section>
    <div className="glance-strip container" data-reveal><div><strong>2022</strong><span>CONTROLLING SINCE</span></div><div><strong>Day & night</strong><span>OPERATIONS AT HCMI</span></div><div><strong>3</strong><span>LANGUAGES SPOKEN</span></div><div><strong>ICAO 4</strong><span>ENGLISH PROFICIENCY</span></div></div>
    <section id="about" className="section container about" data-reveal>
      <p className="section-tag">01 / ABOUT</p><div><h2>Calm in the tower,<br/><em>curious at the keyboard.</em></h2><p>I'm Mohamed Amiin Abdirahman Hassan, an air traffic controller based in Somaliland and a developer of aviation and business software. Air traffic control taught me to think clearly under pressure; coding gives me a way to improve the systems people depend on.</p><figure className="story-photo home-about-photo"><img src="/images/hargeisa-vip-tower.webp" alt="Mohamed Amiin wearing an ATC headset in Hargeisa Tower, with an aircraft visible outside" width={1400} height={1050} loading="lazy"/><figcaption>On frequency at Hargeisa Airport Tower (HCMH), providing air traffic control services during a VIP flight.</figcaption></figure></div>
    </section>
    <section id="experience" className="section container" data-reveal><p className="section-tag">02 / AVIATION</p><div><h2>Where I’ve <em>worked.</em></h2><p className="section-intro">Operational experience, professional training and the path that led me to the tower.</p><div className="timeline">{experience.map((item,i)=><article className="timeline-item" data-reveal style={{'--i':i} as CSSProperties} key={item.title}><span className="item-date">{item.date}</span><div><h3>{item.title}</h3><p className="muted">{item.place}</p><p>{item.detail}</p></div></article>)}</div><h3 className="minor-heading">Training & qualifications</h3><ul className="training">{training.map(item=><li key={item}>{item}</li>)}</ul></div></section>
    <section id="projects" className="section container" data-reveal><p className="section-tag">03 / BUILDING</p><div><h2>Software I <em>design and build.</em></h2><p className="section-intro">Tools and platforms inspired by real problems. Project status is presented as development progress, not public launch claims.</p><figure className="story-photo"><img src="/images/working.jpg" alt="Mohamed Amiin working on a laptop" width={1006} height={820} loading="lazy"/><figcaption>Building tools outside the tower</figcaption></figure><div className="projects">{projects.map((p,i)=><article className="project" data-reveal style={{'--i':i} as CSSProperties} key={p.number}><span className="project-no">{p.number}</span><div><p className="eyebrow">{p.type}</p><h3>{p.name}</h3><p>{p.description}</p><span className="status">{p.status}</span></div><span className="project-arrow" aria-hidden="true">↗</span></article>)}</div></div></section>
    <section className="section container" data-reveal><p className="section-tag">04 / OFF DUTY</p><div><h2>Beyond <em>work.</em></h2><p>When I’m away from the frequency and my editor, I enjoy chess and films — two very different ways to keep curiosity alive. <a href="/relax">Need a pause? Sit in the meadow ↗</a></p></div></section>
    <section id="contact" className="contact"><div className="container contact-inner" data-reveal><p className="section-tag">05 / CONTACT</p><h2>Let's make<br/><em>contact.</em></h2><p>For aviation opportunities, software projects or collaborations, find my contact details on the current website.</p><div className="actions"><a className="primary" href="/contact">Get in touch ↗</a><a className="secondary" href="/cv.pdf" download>Download CV ↓</a></div></div></section>

  </main>;
}
