import './home.css';
import type { CSSProperties } from 'react';
import { projects, mainLink, type Project } from '../data/projects';
import { now } from '../data/now';
import { updates } from '../data/updates';
import { email, linkedIn, whatsApp, whatsAppNumber } from '../components/profiles';
import HomeHeader from '../components/home/home-header';
import HomeFx from '../components/home/home-fx';
import BoardingIntro from '../components/home/boarding-intro';
import { introScript } from '../components/home/intro-script';
import SplitFlap from '../components/home/split-flap';
import LiveClock from '../components/home/live-clock';
import ParticlePortrait from '../components/home/particle-portrait';
import SkillsTabs, { type SkillArea } from '../components/home/skills-tabs';
import CountUp from '../components/home/count-up';
import CopyEmailButton from '../components/home/copy-email-button';

// ─────────────────────────────────────────────────────────────────────────────
//  HOMEPAGE. Projects come from data/projects.ts, the top strip from data/updates.ts and the
//  "building" badge from data/now.ts. Styles live in app/home.css (all scoped under .h4).
// ─────────────────────────────────────────────────────────────────────────────

const experience = [
  { date: '2022 — NOW', title: 'Air Traffic Controller', place: 'Berbera International Airport (HCMI)', detail: 'Aerodrome control.', link: { href: '/aviation', label: 'Aviation page →' } },
  { date: '2016 — 2021', title: 'Finance Officer', place: 'Sompower Electric Company', detail: 'Accounting and financial operations.' },
  { date: 'PROJECT-BASED', title: 'Freelance Accountant', place: 'Small businesses', detail: 'Accounting support, QuickBooks Online and Desktop and Odoo setup, and customised Excel accounting forms.' },
];

const skillAreas: SkillArea[] = [
  { key: 'dev', title: 'Software', em: 'development', detail: 'Web applications, mobile app prototypes, databases and workflow tools — from database to interface.', tools: ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Git & GitHub'] },
  { key: 'design', title: 'Graphic', em: 'design', detail: 'Graphic design, visual concepts and creative presentation.', tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Figma', 'Canva'] },
  { key: 'finance', title: 'Business &', em: 'finance', detail: 'Accounting, customised Excel systems, budgets and small-business tools.', tools: ['Advanced Excel', 'QuickBooks Online', 'QuickBooks Desktop', 'Odoo', 'Financial reporting'] },
  { key: 'product', title: 'Product', em: 'thinking', detail: 'Connecting real needs with clear interfaces and practical solutions — the thread through everything above.', tools: ['Problem framing', 'User flows', 'Clear interfaces', 'Shipping in stages'] },
];

const tools = ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Figma', 'Illustrator', 'Photoshop', 'Canva', 'Excel', 'QuickBooks', 'Odoo'];

const offDuty = [
  { href: '/library', ic: '❦', title: 'My Library', detail: 'The shelf, book by book.' },
  { href: '/films', ic: '◐', title: 'My Films', detail: '35 recommendations.' },
  { href: '/relax', ic: '✿', title: 'The Meadow', detail: 'A quieter corner.' },
  { href: '/relax#challenge-heading', ic: '♞', title: 'Chess', detail: 'A game against the computer.' },
  { href: '/fitness', ic: '◆', title: 'Fitness', detail: 'Free 4-day workout plan (PDF).' },
];

// Per-project card look: code, colour, preview and short points. Unknown slugs get a default.
const cardLook: Record<string, { code: string; tone: string; vis: string; points: string[] }> = {
  aoms: { code: 'AOMS', tone: 'c-ox', vis: 'aoms', points: ['Built for a real control tower, by a controller', 'Arrival & departure registers, digital tower logbook', 'Next.js and Supabase', 'Awaiting ministry approval before operational use'] },
  jareeye: { code: 'JRY', tone: 'c-ink', vis: 'jry', points: ['Customers find nearby approved riders', 'Mobile app prototype', 'Testing the market in Hargeisa'] },
  websites: { code: 'WEB', tone: 'c-cream', vis: 'web', points: ['Delivered through Kodaro', 'Fast, accessible, built to be found', 'Portfolios, company sites, landing pages'] },
  'excel-tools': { code: 'XLS', tone: 'c-deep', vis: 'xl', points: ['Business and personal finance managers', 'Somali instructions, English labels', 'Built on an accounting background'] },
  'graphic-design': { code: 'GFX', tone: 'c-rose', vis: 'gd', points: ['Photoshop, Illustrator, Figma, Canva', 'Logos, social posts, print', 'Full showcase coming to this site'] },
};
const tones = ['c-ox', 'c-ink', 'c-cream', 'c-deep', 'c-rose'];

function Vis({ kind }: { kind: string }) {
  if (kind === 'aoms') return <div className="h4-vis v-shot" aria-hidden="true"><img src="/images/aoms-demo/dashboard.webp" alt="" width={2000} height={837} loading="lazy" decoding="async" /><span className="v-note">Demo build · synthetic data</span></div>;
  if (kind === 'aoms-strips') return <div className="h4-vis v-aoms" aria-hidden="true">
    {[['FDB123', 'B738', 'HCMI → OMDB', 'ARR'], ['ETH456', 'DH8D', 'HCMI → HAAB', 'DEP'], ['UNO789', 'C130', 'HCMH → HCMI', 'ARR'], ['JET012', 'C208', 'HCMI → HCMH', 'DEP']].map(r => <div key={r[0]}>{r.map(c => <span key={c}>{c}</span>)}</div>)}
  </div>;
  if (kind === 'jry') return <div className="h4-vis v-phones" aria-hidden="true">
    <img className="ph side" src="/images/jareeye/customer-home-light.webp" alt="" width={780} height={1688} loading="lazy" decoding="async" />
    <img className="ph mid" src="/images/jareeye/tracker-dark.webp" alt="" width={780} height={1688} loading="lazy" decoding="async" />
    <img className="ph side" src="/images/jareeye/rider-online-light.webp" alt="" width={780} height={1688} loading="lazy" decoding="async" />
    <span className="v-note">Prototype · sample data</span>
  </div>;
  if (kind === 'moto') return <div className="h4-vis v-moto" aria-hidden="true"><svg viewBox="0 0 320 220" fill="none" preserveAspectRatio="xMidYMid slice"><path d="M0 70h320M0 150h320M90 0v220M220 0v220" stroke="rgba(245,239,227,.08)" /><path className="r" d="M40 180 C 90 180, 90 90, 160 100 S 250 50, 280 40" stroke="#F5EFE3" strokeWidth="2" /><circle cx="40" cy="180" r="7" fill="#C9958A" /><circle cx="280" cy="40" r="10" stroke="#F5EFE3" strokeWidth="2" /></svg></div>;
  if (kind === 'web') return <div className="h4-vis v-web" aria-hidden="true">{Array.from({ length: 6 }, (_, i) => <i key={i} />)}</div>;
  if (kind === 'xl') return <div className="h4-vis v-xl" aria-hidden="true">{['ITEM', 'QTY', 'COST', 'SALE', 'MARGIN', 'Rice', '40', '$22', '$28', '21%', 'Oil', '25', '$15', '$19', '21%', 'Sugar', '60', '$18', '$23', '22%'].map((c, i) => <span key={i}>{c}</span>)}</div>;
  return <div className="h4-vis v-gd" aria-hidden="true"><div /><div /><div /></div>;
}

// A heading whose words slide up one by one. `em` words are italic.
function H2({ words, id }: { words: [string, boolean?][]; id?: string }) {
  return <h2 className="h4-h2" id={id} aria-label={words.map(w => w[0]).join(' ')}>
    {words.map(([w, em], i) => <span key={i}><span className="wd" aria-hidden="true"><span style={{ transitionDelay: `${i * .07}s` }}>{em ? <em>{w}</em> : w}</span></span>{i < words.length - 1 ? ' ' : ''}</span>)}
  </h2>;
}

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const look = cardLook[p.slug] ?? { code: p.slug.slice(0, 3).toUpperCase(), tone: tones[i % tones.length], vis: 'gd', points: p.highlights ?? [] };
  const href = mainLink(p);
  const no = String(i + 1).padStart(2, '0');
  return <article className={`h4-card ${look.tone}`} style={{ '--i': i } as CSSProperties}>
    <div className="h4-card-top h4-mono"><span>{look.code} · Flight {no}</span><span className="h4-st">{p.status.label}</span></div>
    <div className="h4-card-body">
      <div>
        <span className="no">{no}</span>
        <h3>{href ? <a href={href}>{p.name}</a> : p.name}</h3>
        <p>{p.summary}</p>
        {look.points.length > 0 && <ul>{look.points.map(x => <li key={x}>{x}</li>)}</ul>}
        {href && <a className="open" href={href}>{href.startsWith('/projects/') ? 'Case study' : 'Read more'} ↗</a>}
      </div>
      <Vis kind={look.vis} />
    </div>
  </article>;
}

export default function Home() {
  return <main className="h4" id="top">
    <script dangerouslySetInnerHTML={{ __html: introScript }} />
    <BoardingIntro />
    <HomeFx />

    <div className="h4-topline"><div className="h4-wrap">
      <span className="meta">MA AIRLINES · VOL. 01</span>
      <div className="h4-ticker" role="region" aria-label="Latest updates"><div>
        {[0, 1].map(copy => updates.map(u => <a key={`${copy}-${u.href}`} href={u.href} aria-hidden={copy ? true : undefined} tabIndex={copy ? -1 : undefined}>{u.tag} — <b>{u.title}</b> · {u.detail} ✦</a>))}
      </div></div>
      <LiveClock />
    </div></div>
    <HomeHeader />

    {/* HERO */}
    <section className="h4-hero" aria-labelledby="h4-title">
      <div className="h4-wrap h4-hero-grid">
        <div>
          {now.text && <div className="h4-kicker h4-mono"><a className="h4-live" href={now.href || '/projects'}><i aria-hidden="true" />Building: {now.text}</a></div>}
          <h1 className="h4-h1" id="h4-title" aria-label="Ideas become designs. Designs become useful products.">
            <span className="ln" aria-hidden="true"><span>Ideas become</span></span>
            <span className="ln" aria-hidden="true"><span><em>designs.</em> Designs</span></span>
            <span className="ln" aria-hidden="true"><span>become <em>useful</em> products.</span></span>
          </h1>
          <SplitFlap />
          <p className="h4-lede h4-rv">I&apos;m <b>Mohamed Amiin Abdirahman Hassan</b>. I design visuals, develop software and create practical tools for everyday problems.</p>
          <div className="h4-ctas h4-rv">
            <a href="#projects" className="h4-btn h4-btn-ox">Explore projects <span className="a" aria-hidden="true">→</span></a>
            <a href="#skills" className="h4-btn h4-btn-line">Explore my skills</a>
            <a href="#contact" className="h4-btn h4-btn-line">Email</a>
          </div>
        </div>
        <div className="h4-pwrap h4-rv">
          <ParticlePortrait src="/images/portrait-landing-hero-brown.webp" srcSmall="/images/portrait-landing-hero-brown-720.webp" alt="Mohamed Amiin in a brown suit, white shirt, brown tie and glasses" />
          <span className="h4-chip c1" aria-hidden="true"><b>{'{}'}</b>Next.js &amp; Supabase</span>
          <span className="h4-chip c2" aria-hidden="true"><b>Ai</b>Figma · Illustrator</span>
          <span className="h4-chip c3" aria-hidden="true"><b>✈</b>HCMI tower</span>
          <div className="h4-stamp" aria-hidden="true">
            <svg viewBox="0 0 110 110"><defs><path id="h4-c" d="M55 55 m-40 0 a40 40 0 1 1 80 0 a40 40 0 1 1 -80 0" /></defs>{/* textLength stretches the phrase to exactly one lap of the circle (2π × 40 ≈ 251). */}
            <text fontFamily="DM Mono, monospace" fontSize="9" fill="#5C1A22"><textPath href="#h4-c" textLength="249" lengthAdjust="spacing">{'SOFTWARE · DESIGN · TOOLS · S/LAND ·\u00A0'}</textPath></text></svg>
          </div>
        </div>
      </div>
    </section>

    {/* 01 PROJECTS */}
    <section id="projects" className="h4-sec" aria-labelledby="h4-projects">
      <div className="h4-wrap">
        <div className="h4-sh h4-rv"><div><span className="no">01 —</span><H2 id="h4-projects" words={[['Things'], ["I'm"], ['building.', true]]} /></div><p>Software systems, a mobile app prototype, websites, Excel tools and design work — each with its actual stage of development.</p></div>
        <div className="h4-stack">{projects.map((p, i) => <ProjectCard key={p.slug} p={p} i={i} />)}</div>
        <p className="h4-rv" style={{ marginTop: 40 }}><a className="h4-btn h4-btn-line" href="/projects">All projects <span className="a" aria-hidden="true">→</span></a></p>
      </div>
    </section>

    {/* 02 SKILLS */}
    <section id="skills" className="h4-sec tight" aria-labelledby="h4-skills">
      <div className="h4-wrap">
        <div className="h4-sh h4-rv"><div><span className="no">02 —</span><H2 id="h4-skills" words={[['What'], ['I'], ['work', true], ['with.', true]]} /></div><p>Four disciplines that feed each other.</p></div>
        <div className="h4-rv"><SkillsTabs areas={skillAreas} /></div>
      </div>
    </section>

    <div className="h4-tools" aria-label="Tools I use"><div className="tr">
      {[0, 1].map(c => tools.map(t => <span key={`${c}-${t}`} aria-hidden={c ? true : undefined}>{t}</span>))}
    </div></div>

    {/* 03 ABOUT */}
    <section id="about" className="h4-sec" aria-labelledby="h4-about">
      <div className="h4-wrap">
        <div className="h4-sh h4-rv"><div><span className="no">03 —</span><H2 id="h4-about" words={[['A'], ['bit'], ['about', true], ['me.', true]]} /></div></div>
        <div className="h4-about">
          <div className="h4-rv">
            <p className="h4-quote">I connect real needs with <em>clear interfaces</em> — whether that&apos;s a tower log, a delivery app or a spreadsheet.</p>
            <figure className="h4-photo"><img className="h4-par" src="/images/about-sunglasses-grey.webp" alt="Mohamed Amiin in a navy suit and sunglasses" width={1136} height={1408} loading="lazy" decoding="async" /><figcaption>Hargeisa · Somaliland</figcaption></figure>
          </div>
          <div className="h4-about-body h4-rv">
            <p>I&apos;m a developer, graphic designer and problem-solver based in <b>Somaliland</b>. I build software, create visual work and make practical tools — and my <b>accounting background</b> shapes how I think about every one of them.</p>
            <p>By profession I&apos;m an <b>air traffic controller</b>. That job taught me to value systems that are clear, calm and hard to get wrong.</p>
            <a className="more" href="/about">More about my background ↗</a>
            <div className="h4-facts">
              <div><CountUp to={projects.length} /><span>projects on the board</span></div>
              <div><CountUp to={4} /><span>disciplines</span></div>
              <div><CountUp to={2016} /><span>working since</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* 04 EXPERIENCE */}
    <section id="experience" className="h4-sec tight" aria-labelledby="h4-exp">
      <div className="h4-wrap">
        <div className="h4-sh h4-rv"><div><span className="no">04 —</span><H2 id="h4-exp" words={[["Where"], ["I've"], ['worked.', true]]} /></div><p>Training and qualifications live on the Aviation page.</p></div>
        <div className="h4-exp-grid">
          <div className="h4-exp"><div className="line" aria-hidden="true" />
            {experience.map(j => <article className="h4-job h4-rv" key={j.title}><span className="yr">{j.date}</span><div className="body"><h3>{j.title}</h3><div className="org">{j.place}</div><p>{j.detail}</p>{j.link && <a href={j.link.href}>{j.link.label}</a>}</div></article>)}
          </div>
          <figure className="h4-photo h4-rv"><img className="h4-par" src="/images/aviation-tower.webp" alt="Mohamed Amiin at work in the control tower" width={1086} height={1448} loading="lazy" decoding="async" /><figcaption>On position · tower cab</figcaption></figure>
        </div>
      </div>
    </section>

    {/* 05 OFF DUTY */}
    <section id="offduty" className="h4-sec tight" aria-labelledby="h4-off">
      <div className="h4-wrap">
        <div className="h4-sh h4-rv"><div><span className="no">05 —</span><H2 id="h4-off" words={[['Off', true], ['duty.']]} /></div><p>Chess, films, books and training.</p></div>
        <div className="h4-off">{offDuty.map(o => <a key={o.href} href={o.href} className="h4-od h4-rv"><span className="ic" aria-hidden="true">{o.ic}</span><div><h3>{o.title}</h3><p>{o.detail}</p></div></a>)}</div>
      </div>
    </section>

    {/* 06 CONTACT */}
    <section id="contact" className="h4-sec tight" aria-labelledby="h4-contact">
      <div className="h4-wrap">
        <div className="h4-pass h4-rv">
          <div className="main">
            <span className="h4-mono" style={{ opacity: .7 }}>06 — Boarding pass · Contact</span>
            <div style={{ marginTop: 18 }}><H2 id="h4-contact" words={[["Let's"], ['build'], ['something.', true]]} /></div>
            <div className="h4-route" aria-hidden="true"><b>YOU</b><span className="pl" /><b>MA</b></div>
            <div className="h4-fields">
              <div><span className="h4-mono">Email</span><a href={`mailto:${email}`}>{email}</a></div>
              <div><span className="h4-mono">WhatsApp</span>{whatsAppNumber}</div>
              <div><span className="h4-mono">Open to</span>Development, design, business tools, collaboration</div>
            </div>
          </div>
          <div className="h4-stub">
            <CopyEmailButton email={email} />
            <a className="h4-btn ghost" href={whatsApp} target="_blank" rel="noopener noreferrer">WhatsApp <span className="a" aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
            <a className="h4-btn ghost" href={linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn <span className="a" aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
            <a className="h4-btn ghost" href="/contact">Contact form <span className="a" aria-hidden="true">→</span></a>
            <a className="h4-btn ghost" href="https://cv.mohamedamiin.com">View full CV <span className="a" aria-hidden="true">↗</span></a>
            <div className="h4-barcode" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>

    <div className="h4-wrap"><p className="h4-fbig" aria-hidden="true">Mohamed <em>Amiin.</em></p></div>
  </main>;
}
