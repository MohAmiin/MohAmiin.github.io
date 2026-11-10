import type { CSSProperties } from 'react';
import ThemeToggle from '../components/theme-toggle';
import OffDutyMenu from '../components/off-duty-menu';
import { whatsApp } from '../components/profiles';
const experience = [
  { date: '2022 — Present', title: 'Air Traffic Controller', place: 'Berbera International Airport (HCMI)', detail: 'My profession: aerodrome control at Berbera International Airport.' },
  { date: '2016 — 2021', title: 'Finance Officer', place: 'Sompower Electric Company', detail: 'Accounting and financial operations before transitioning into aviation.' },
  { date: 'Project-based', title: 'Freelance Accountant', place: 'Small businesses', detail: 'Accounting support, QuickBooks Online and Desktop and Odoo setup, and customized Excel accounting forms.' },
];
const projects = [
  { number: '01', name: 'Airport Operations Management System', type: 'DIGITAL PRODUCT', description: 'A web platform that replaces paper tower logbooks and movement registers with one accountable, real-time record.', status: 'Development complete for current scope', href: '/projects/aoms' },
  { number: '02', name: 'Jareeye Moto Delivery', type: 'MOBILE APP', description: 'A delivery platform prototype connecting customers with local motorcycle riders.', status: 'Prototype · market validation', href: '/projects/jareeye' },
  { number: '03', name: 'Websites for businesses', type: 'WEB DEVELOPMENT', description: 'Practical, responsive digital experiences for businesses and organisations.', status: 'Selected work', href: '/projects' },
  { number: '04', name: 'Excel business & budget tools', type: 'PRACTICAL TOOLS', description: 'Custom spreadsheets for small-business records and personal finance. Free templates are being prepared.', status: 'Free templates in preparation', href: '/about#finance' },
  { number: '05', name: 'Graphic design', type: 'VISUAL DESIGN', description: 'Graphic design and visual communication. Selected pieces will be added to the portfolio.', status: 'Portfolio selection in progress', href: '/about#design' },
];
const skillAreas = [
  { area: 'SOFTWARE DEVELOPMENT', name: 'Build digital products', detail: 'Web applications, mobile app prototypes, databases and workflow tools.', tools: ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Git & GitHub'] },
  { area: 'GRAPHIC DESIGN', name: 'Communicate visually', detail: 'Graphic design, visual concepts and creative presentation.', tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Figma', 'Canva'] },
  { area: 'BUSINESS & FINANCE', name: 'Make numbers useful', detail: 'Accounting, customised Excel systems, budgets and small-business tools.', tools: ['Advanced Excel', 'QuickBooks Online', 'QuickBooks Desktop', 'Odoo', 'Financial reporting'] },
  { area: 'PRODUCT THINKING', name: 'Turn problems into ideas', detail: 'Connecting real needs with clear interfaces and practical solutions.', tools: [] as string[] },
];
export default function Home() {
  return <main>
    <section id="home" className="magazine-hero">
      <header className="magazine-topbar">
        <span className="magazine-volume">VOL. 01<span className="vol-more"> · IDEAS & CREATIVE WORK</span></span>
        <div className="magazine-header-actions">
          <nav className="magazine-nav" aria-label="Primary navigation">
            <a href="/projects">Projects</a><a href="/#skills">Skills</a><a href="/about">About</a><a href="/aviation">Aviation</a><OffDutyMenu variant="magazine"/><a href="/contact">Contact</a>
          </nav>
          <a className="magazine-top-cv" href="/cv.pdf" download>CV ↓</a>
          <ThemeToggle/>
          <details className="magazine-mobile-menu">
            <summary>Menu</summary>
            <nav aria-label="Mobile primary navigation">
              <a href="/projects">Projects</a><a href="/#skills">Skills</a><a href="/about">About</a><a href="/aviation">Aviation</a><span className="mm-group">Off duty</span><a className="mm-sub" href="/library">My Library</a><a className="mm-sub" href="/relax">The meadow</a><a className="mm-sub" href="/relax#challenge-heading">Chess</a><a href="/contact">Contact</a>
              <a href="/cv.pdf" download>Download CV ↓</a>
            </nav>
          </details>
        </div>
      </header>
      <div className="magazine-word" aria-hidden="true">{'AMIIN'.split('').map((l,i)=><span key={i} style={{'--l':i} as CSSProperties}>{l}</span>)}</div>
      <figure className="magazine-photo">
        <picture>
          <source media="(max-width: 700px)" srcSet="/images/portrait-landing-hero-brown-720.webp"/>
          <img src="/images/portrait-landing-hero-brown.webp" alt="Mohamed Amiin in a brown suit, white shirt, brown tie and glasses" width={1254} height={1254} fetchPriority="high"/>
        </picture>
      </figure>
      <div className="magazine-columns">
        <div className="magazine-identity">
          <h1>Mohamed Amiin<br/><em>Abdirahman Hassan.</em></h1>
          <div className="magazine-rule" aria-hidden="true"/>
          <p>I design visuals, develop software and create practical tools for everyday problems.</p>
        </div>
        <div className="magazine-right">
          <p className="magazine-quote">Ideas become designs. Designs become useful products.</p>
          <div className="magazine-actions">
            <a className="magazine-whatsapp" href="/#skills">Explore my skills ↗</a>
            <a className="magazine-download" href="/projects">Explore projects ↗</a>
          </div>
          <a className="magazine-email" href="mailto:Mohamedjareeye@gmail.com">Email ↗</a>
        </div>
      </div>
      <p className="magazine-credential">CREATOR · DESIGNER · DEVELOPER</p>
    </section>
    <div className="glance-strip container" data-reveal><div><strong>Software</strong><span>DIGITAL PRODUCTS</span></div><div><strong>Design</strong><span>VISUAL WORK</span></div><div><strong>Finance</strong><span>BUSINESS TOOLS</span></div><div><strong>Aviation</strong><span>PROFESSIONAL EXPERIENCE</span></div></div>
    <section id="projects" className="section container" data-reveal><p className="section-tag">01 / PROJECTS</p><div><h2>Projects, designs & <em>practical tools.</em></h2><p className="section-intro">Software systems, a mobile app prototype, websites, practical Excel tools and graphic design. Each project shows its actual stage of development.</p><figure className="story-photo"><img src="/images/working.webp" alt="Mohamed Amiin working on a laptop" width={1006} height={820} loading="lazy"/><figcaption>Building software and exploring new ideas</figcaption></figure><div className="projects">{projects.map((p,i)=><a className="project" href={p.href} data-reveal style={{'--i':i} as CSSProperties} key={p.number}><span className="project-no">{p.number}</span><div><p className="eyebrow">{p.type}</p><h3>{p.name}</h3><p>{p.description}</p><span className="status">{p.status}</span></div><span className="project-arrow" aria-hidden="true">↗</span></a>)}</div></div></section>
    <section id="skills" className="section container" data-reveal><p className="section-tag">02 / SKILLS</p><div><h2>Skills I <em>put to work.</em></h2><p className="section-intro">I combine creativity, technology and financial experience to make ideas clearer and everyday work simpler.</p><div className="timeline">{skillAreas.map((item,i)=><article className="timeline-item" data-reveal style={{'--i':i} as CSSProperties} key={item.area}><span className="item-date">{item.area}</span><div><h3>{item.name}</h3><p>{item.detail}</p>{item.tools.length>0&&<ul className="skill-tags" aria-label={`${item.area} tools`}>{item.tools.map(t=><li key={t}>{t}</li>)}</ul>}</div></article>)}</div><p className="section-intro"><a href="/about">More about my background ↗</a></p></div></section>
    <section id="about" className="section container about" data-reveal>
      <p className="section-tag">03 / ABOUT</p><div><h2>The person <em>behind the projects.</em></h2><p>I'm Mohamed Amiin Abdirahman Hassan, a developer, graphic designer and problem-solver based in Somaliland. I build software, create visual work and make practical tools, drawing on my background in accounting. By profession I am an air traffic controller.</p><figure className="story-photo home-about-photo"><img src="/images/projects-office.webp" alt="Mohamed Amiin at a desk with a laptop and notebook" width={896} height={1195} loading="lazy"/><figcaption>Planning and building new projects</figcaption></figure></div>
    </section>
    <section id="experience" className="section container" data-reveal><p className="section-tag">04 / EXPERIENCE</p><div><h2>Experience behind <em>the ideas.</em></h2><p className="section-intro">My work spans finance and air traffic control. Both shape how I approach problems, people and systems.</p><div className="timeline">{experience.map((item,i)=><article className="timeline-item" data-reveal style={{'--i':i} as CSSProperties} key={item.title}><span className="item-date">{item.date}</span><div><h3>{item.title}</h3><p className="muted">{item.place}</p><p>{item.detail}</p></div></article>)}</div><p className="section-intro"><a href="/aviation">My aviation career, training and qualifications ↗</a></p></div></section>
    <section className="section container" data-reveal><p className="section-tag">05 / OFF DUTY</p><div><h2>Beyond <em>work.</em></h2><p>Away from projects and work, I enjoy chess, films and books — different ways to keep curiosity alive.</p><div className="actions"><a className="primary" href="/library">My Library ↗</a><a className="secondary" href="/relax">Sit in the meadow ↗</a></div></div></section>
    <section id="contact" className="contact"><div className="container contact-inner" data-reveal><p className="section-tag">06 / CONTACT</p><h2>Let's make<br/><em>contact.</em></h2><p>For development, design, business tools or professional collaborations, get in touch.</p><div className="actions"><a className="primary" href="/contact">Get in touch ↗</a><a className="secondary" href={whatsApp} target="_blank" rel="noopener noreferrer">WhatsApp ↗<span className="sr-only"> (opens WhatsApp in a new tab)</span></a><a className="secondary" href="/cv.pdf" download>Download CV ↓</a></div></div></section>

  </main>;
}
