import ThemeToggle from '../components/theme-toggle';

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
  { number: '01', name: 'Airport Operations Management System', type: 'AVIATION SOFTWARE', description: 'Digitising airfield and tower workflows: traffic logs, shift activity, checklists and operational reporting.', status: 'In development' },
  { number: '02', name: 'Jareeye Moto Delivery', type: 'MOBILE APP', description: 'A rider-to-customer delivery platform for Hargeisa, with live availability, rider approval and simple calling.', status: 'Pilot / staging' },
  { number: '03', name: 'Websites for businesses', type: 'WEB DEVELOPMENT', description: 'Building practical, responsive digital experiences for local businesses and organisations.', status: 'Selected work' },
];
export default function Home() {
  return <main>
    <header className="topbar container">
      <a className="brand" href="#home">MA<span className="brand-dot">.</span></a>
      <nav aria-label="Primary navigation"><a href="#about">About</a><a href="#experience">Aviation</a><a href="#projects">Projects</a><a href="#contact">Contact</a></nav>
      <div className="nav-actions"><ThemeToggle/><a className="nav-cv" href="/cv.pdf" download>Download CV ↗</a></div>
    </header>
    <section id="home" className="hero">
      <div className="hero-grid container">
        <div className="hero-content">
          <p className="eyebrow"><span className="signal"/> HCMI / BERBERA · AVIATION × TECHNOLOGY</p>
          <p className="hello">AIR TRAFFIC CONTROLLER & SOFTWARE DEVELOPER</p>
          <h1>Mohamed<br/><em>Amiin.</em></h1>
          <p className="lead">Calm in the tower,<br/>curious at the keyboard.</p>
          <p className="hero-copy">I work where precision matters — guiding aircraft safely and building software that solves everyday operational problems.</p>
          <div className="actions"><a href="#projects" className="primary">Explore my work <span>↗</span></a><a href="#experience" className="secondary">My aviation journey ↓</a></div>
        </div>
        <div className="visual-stack"><div className="portrait-hero"><img src="/images/portrait.jpg" alt="Mohamed Amiin in a navy suit" /><span className="photo-tag">MOHAMED AMIIN · PERSONAL PORTFOLIO</span></div><div className="radar-card" aria-label="Decorative radar showing the relative direction of Berbera and Hargeisa">
          <div className="card-top"><span>RADAR / PERSONAL SITE</span><span className="live"><span className="signal"/> ON FREQUENCY</span></div>
          <div className="radar" aria-hidden="true"><div className="sweep"/><div className="cross cross-v"/><div className="cross cross-h"/><div className="ring ring-one"/><div className="ring ring-two"/><div className="ring ring-three"/><div className="target t1"/><div className="target t2"/><span className="radar-label label1">HCMI</span><span className="radar-label label2">HCMH</span></div>
          <div className="radar-bottom"><span>BERBERA NE OF HARGEISA</span><span>NOT FOR NAVIGATION</span></div>
        </div></div>
      </div>
      <div className="hero-foot container"><span>BASED IN SOMALILAND</span><span>SCROLL TO EXPLORE ↓</span></div>
    </section>
    <section id="about" className="section container about">
      <p className="section-tag">01 / ABOUT</p><div><h2>Two disciplines.<br/><em>One mindset.</em></h2><p>I'm Mohamed Amiin Abdirahman Hassan, an air traffic controller based in Somaliland and a developer of aviation and business software. Air traffic control taught me to think clearly under pressure; coding gives me a way to improve the systems people depend on.</p><figure className="story-photo"><img src="/images/tower.jpg" alt="Mohamed Amiin at the tower controller position" loading="lazy"/><figcaption>At the controller position</figcaption></figure></div>
    </section>
    <section id="experience" className="section container"><p className="section-tag">02 / AVIATION</p><div><h2>Behind the <em>frequency.</em></h2><p className="section-intro">Operational experience, professional training and the path that led me to the tower.</p><div className="timeline">{experience.map(item=><article className="timeline-item" key={item.title}><span className="item-date">{item.date}</span><div><h3>{item.title}</h3><p className="muted">{item.place}</p><p>{item.detail}</p></div></article>)}</div><h3 className="minor-heading">Training & qualifications</h3><ul className="training">{training.map(item=><li key={item}>{item}</li>)}</ul></div></section>
    <section id="projects" className="section container"><p className="section-tag">03 / BUILDING</p><div><h2>Beyond the <em>tower.</em></h2><p className="section-intro">Tools and platforms inspired by real problems. Project status is presented as development progress, not public launch claims.</p><figure className="story-photo"><img src="/images/working.jpg" alt="Mohamed Amiin working on a laptop" loading="lazy"/><figcaption>Building tools outside the tower</figcaption></figure><div className="projects">{projects.map(p=><article className="project" key={p.number}><span className="project-no">{p.number}</span><div><p className="eyebrow">{p.type}</p><h3>{p.name}</h3><p>{p.description}</p><span className="status">{p.status}</span></div><span className="project-arrow" aria-hidden="true">↗</span></article>)}</div></div></section>
    <section className="section container"><p className="section-tag">04 / OFF DUTY</p><div><h2>Beyond <em>work.</em></h2><p>When I'm away from the frequency and my editor, I enjoy chess and movies — two very different ways to keep curiosity alive.</p></div></section>
    <section id="contact" className="contact"><div className="container contact-inner"><p className="section-tag">05 / CONTACT</p><h2>Let's make<br/><em>contact.</em></h2><p>For aviation opportunities, software projects or collaborations, find my contact details on the current website.</p><div className="actions"><a className="primary" href="https://mohamedamiin.com/#contact">Get in touch ↗</a><a className="secondary" href="/cv.pdf" download>Download CV ↓</a></div></div></section>
    <footer className="container footer"><span>© {new Date().getFullYear()} Mohamed Amiin</span><span>BUILT WITH PRECISION · AVIATION × TECHNOLOGY</span></footer>
  </main>;
}
