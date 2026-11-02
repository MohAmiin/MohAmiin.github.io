import type { CSSProperties } from 'react';
import ThemeToggle from '../components/theme-toggle';
const experience = [
  { date: '2022 — Present', title: 'Air Traffic Controller', place: 'Berbera International Airport (HCMI)', detail: 'Aerodrome control, aircraft sequencing and safe, efficient runway operations.' },
  { date: '2022', title: 'Tower On-the-Job Training', place: 'Hargeisa Airport (HCMH)', detail: 'Practical tower training and operational familiarisation.' },
  { date: '2016 — 2021', title: 'Finance Officer', place: 'Sompower Electric Company', detail: 'Accounting and financial operations before transitioning into aviation.' },
  { date: 'Project-based', title: 'Freelance Accountant', place: 'Small businesses', detail: 'Accounting support, QuickBooks Online and Desktop and Odoo setup, and customized Excel accounting forms.' },
];
const projects = [
  { number: '01', name: 'Airport Operations Management System', type: 'DIGITAL PRODUCT', description: 'A web platform for managing tower movements, logbooks and operational records.', status: 'Development complete for current scope' },
  { number: '02', name: 'Jareeye Moto Delivery', type: 'MOBILE APP', description: 'A delivery platform prototype connecting customers with local motorcycle riders.', status: 'Prototype · market validation' },
  { number: '03', name: 'Graphic design', type: 'VISUAL DESIGN', description: 'Graphic design and visual communication. Selected pieces will be added to the portfolio.', status: 'Portfolio selection in progress' },
  { number: '04', name: 'Excel business & budget tools', type: 'PRACTICAL TOOLS', description: 'Custom spreadsheets for small-business records and personal finance. Free templates are being prepared.', status: 'Free templates in preparation' },
  { number: '05', name: 'Websites for businesses', type: 'WEB DEVELOPMENT', description: 'Practical, responsive digital experiences for businesses and organisations.', status: 'Selected work' },
];
const skillAreas = [
  { area: 'SOFTWARE DEVELOPMENT', name: 'Build digital products', detail: 'Web applications, mobile app prototypes, databases and workflow tools.' },
  { area: 'GRAPHIC DESIGN', name: 'Communicate visually', detail: 'Graphic design, visual concepts and creative presentation.' },
  { area: 'BUSINESS & FINANCE', name: 'Make numbers useful', detail: 'Accounting, customised Excel systems, budgets and small-business tools.' },
  { area: 'PRODUCT THINKING', name: 'Turn problems into ideas', detail: 'Connecting real needs with clear interfaces and practical solutions.' },
];
export default function Home() {
  return <main>
    <section id="home" className="magazine-hero">
      <header className="magazine-topbar">
        <span className="magazine-volume">VOL. 01 · IDEAS & CREATIVE WORK</span>
        <div className="magazine-header-actions">
          <nav className="magazine-nav" aria-label="Primary navigation">
            <a href="/projects">Projects</a><a href="/#skills">Skills</a><a href="/about">About</a><a href="/relax">Off duty</a><a href="/contact">Contact</a>
          </nav>
          <a className="magazine-top-cv" href="/cv.pdf" download>CV ↓</a>
          <ThemeToggle/>
          <details className="magazine-mobile-menu">
            <summary>Menu</summary>
            <nav aria-label="Mobile primary navigation">
              <a href="/projects">Projects</a><a href="/#skills">Skills</a><a href="/about">About</a><a href="/relax">Off duty</a><a href="/contact">Contact</a>
              <a href="/cv.pdf" download>Download CV ↓</a>
            </nav>
          </details>
        </div>
      </header>
      <div className="magazine-word" aria-hidden="true">AMIIN</div>
      <figure className="magazine-photo">
        <img src="/images/portrait-landing-hero-brown.webp" alt="Mohamed Amiin in a brown suit, white shirt, brown tie and glasses" width={1254} height={1254} fetchPriority="high"/>
      </figure>
      <div className="magazine-columns">
        <div className="magazine-identity">
          <h1>Mohamed Amiin<br/><em>Abdirahman Hassan.</em></h1>
          <div className="magazine-rule" aria-hidden="true"/>
          <p>Developer, graphic designer and business-minded maker. I create digital products, visual work and practical tools.</p>
        </div>
        <div className="magazine-right">
          <p className="magazine-quote">I create, design and build.</p>
          <div className="magazine-actions">
            <a className="magazine-whatsapp" href="https://wa.me/252659740002" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a className="magazine-download" href="/projects">Explore projects ↗</a>
          </div>
          <a className="magazine-email" href="mailto:Mohamedjareeye@gmail.com">Email ↗</a>
        </div>
      </div>
      <p className="magazine-credential">SOFTWARE · GRAPHIC DESIGN · BUSINESS TOOLS</p>
    </section>
    <div className="glance-strip container" data-reveal><div><strong>Software</strong><span>DIGITAL PRODUCTS</span></div><div><strong>Design</strong><span>VISUAL WORK</span></div><div><strong>Finance</strong><span>BUSINESS TOOLS</span></div><div><strong>Aviation</strong><span>PROFESSIONAL EXPERIENCE</span></div></div>
    <section id="about" className="section container about" data-reveal>
      <p className="section-tag">01 / ABOUT</p><div><h2>Calm in the tower,<br/><em>curious at the keyboard.</em></h2><p>I'm Mohamed Amiin Abdirahman Hassan, an air traffic controller based in Somaliland and a developer of aviation and business software. Air traffic control taught me to think clearly under pressure; coding gives me a way to improve the systems people depend on.</p><figure className="story-photo home-about-photo"><img src="/images/hargeisa-vip-tower.webp" alt="Mohamed Amiin wearing an ATC headset in Hargeisa Tower, with an aircraft visible outside" width={1400} height={1050} loading="lazy"/><figcaption>On frequency at Hargeisa Airport Tower (HCMH), providing air traffic control services during a VIP flight.</figcaption></figure></div>
    </section>
    <section id="experience" className="section container" data-reveal><p className="section-tag">02 / AVIATION</p><div><h2>Where I’ve <em>worked.</em></h2><p className="section-intro">Operational experience, professional training and the path that led me to the tower.</p><div className="timeline">{experience.map((item,i)=><article className="timeline-item" data-reveal style={{'--i':i} as CSSProperties} key={item.title}><span className="item-date">{item.date}</span><div><h3>{item.title}</h3><p className="muted">{item.place}</p><p>{item.detail}</p></div></article>)}</div><h3 className="minor-heading">Training & qualifications</h3><ul className="training">{training.map(item=><li key={item}>{item}</li>)}</ul></div></section>
    <section id="projects" className="section container" data-reveal><p className="section-tag">03 / BUILDING</p><div><h2>Software I <em>design and build.</em></h2><p className="section-intro">Tools and platforms inspired by real problems. Project status is presented as development progress, not public launch claims.</p><figure className="story-photo"><img src="/images/working.jpg" alt="Mohamed Amiin working on a laptop" width={1006} height={820} loading="lazy"/><figcaption>Building tools outside the tower</figcaption></figure><div className="projects">{projects.map((p,i)=><article className="project" data-reveal style={{'--i':i} as CSSProperties} key={p.number}><span className="project-no">{p.number}</span><div><p className="eyebrow">{p.type}</p><h3>{p.name}</h3><p>{p.description}</p><span className="status">{p.status}</span></div><span className="project-arrow" aria-hidden="true">↗</span></article>)}</div></div></section>
    <section className="section container" data-reveal><p className="section-tag">04 / OFF DUTY</p><div><h2>Beyond <em>work.</em></h2><p>When I’m away from the frequency and my editor, I enjoy chess and films — two very different ways to keep curiosity alive. <a href="/relax">Need a pause? Sit in the meadow ↗</a></p></div></section>
    <section id="contact" className="contact"><div className="container contact-inner" data-reveal><p className="section-tag">05 / CONTACT</p><h2>Let's make<br/><em>contact.</em></h2><p>For aviation opportunities, software projects or collaborations, find my contact details on the current website.</p><div className="actions"><a className="primary" href="/contact">Get in touch ↗</a><a className="secondary" href="/cv.pdf" download>Download CV ↓</a></div></div></section>

  </main>;
}
