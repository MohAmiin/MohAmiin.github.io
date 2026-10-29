import type { Metadata } from 'next';import type { CSSProperties } from 'react';
import ScreenshotGallery, { ScreenFrame } from '../../../components/screenshot-gallery';
import { aomsDashboard, aomsWorkflows, aomsPlannedWorkflows, aomsWorkflowCaptions } from '../../../components/aoms-screens';
export const metadata:Metadata={title:'Airport Operations Management System | Mohamed Amiin',description:'Case study: a web platform for the control tower that replaces paper logbooks and movement registers.'};

// Every item below is confirmed by the AOMS repository (routes, migrations and feature commits, Jul–Oct 2026).
const facts=[['ROLE','Product design & full-stack development'],['TIMELINE','July – October 2026 (provisional)'],['STACK','Next.js · TypeScript · Supabase']];
const principles=[
  ['Database-enforced rules','Strip numbers are allocated inside PostgreSQL, records are archived rather than deleted, and audit history cannot be rewritten.'],
  ['Accountable by design','Controllers confirm their identity with their initials and a PIN, so every movement, correction and log entry is attributed to the controller who made it.'],
  ['Live across screens','Registers, the logbook and operational boards update in real time, so every position works from the same picture.'],
];
const features:[string,string[]][]=[
  ['Movement registers',['Arrival and departure registers with search and filters','Automatic, database-allocated traffic strip numbers','Time-limited editing with administrator override','Auditable corrections, recorded in the tower logbook','Departures created directly from aircraft on ground']],
  ['Tower logbook',['Digital tower logbook with operational activity types','Movements logged automatically','Controller duty roster with initials and attestation','Operational-day rollover in the airport’s locked time zone']],
  ['Traffic picture',['Live tower board','Aircraft-on-ground board with endurance tracking and night stops','Dashboard with expected arrivals predicted from recurring weekday traffic']],
  ['Runway & station',['Active runway control with confirmation','Configurable runway and airport settings','Station opening time and secure tower station password rotation']],
  ['Reports & data',['Reports and statistics, with arriving and departing POB','Operational reports linked to the tower logbook','Traffic import and developer-only historical movement import']],
  ['Access & security',['Administrator, controller and restricted demo controller roles','Staff administration with database-wide account deactivation','Token-based guest presentation access','Row-level security, hardened privileges and operational notifications']],
];
const layers=[
  ['CLIENT','Browser interface','Next.js App Router renders pages on the server; interactive workspaces run in the browser. Responsive, with dark and daylight themes.',['Next.js','React 19','TypeScript','Tailwind CSS','shadcn/ui']],
  ['APPLICATION','Server actions & session proxy','Input validation, role capability checks and session-aware routing sit on the server boundary.',['Server actions','Zod','React Hook Form']],
  ['DATA','Supabase','Authentication, PostgreSQL with row-level security, database functions for strip allocation and attribution, and realtime updates.',['Auth','PostgreSQL','RLS','RPC functions','Realtime']],
  ['PLATFORM','Vercel','Separate development, UAT and production environments, plus a scheduled server job.',['Vercel','Cron']],
];
const record=[['80','versioned SQL migrations'],['92','automated test files'],['v1.0.0','tagged release, with a rehearsed upgrade and rollback runbook']];
const challenges=[
  ['Strip numbers that never collide','Numbers are allocated by a database function with monthly uniqueness, and historical imports share the same numbering, so two entries can never receive the same strip.'],
  ['Attribution on a shared position','The tower station login is shared, so each controller verifies with initials and a PIN. Attribution was moved to verified sessions in stages, with each migration rehearsed first.'],
  ['The operational day','A tower day does not follow the browser’s clock. The airport time zone is locked, and an operational-day rollover replaced an earlier automatic station closure.'],
  ['Changing a live database safely','Ordered migrations across separate environments, verification scripts, and a release runbook with rehearsed rollback and re-entry paths.'],
];
const i=(n:number)=>({'--i':n} as CSSProperties);

export default function Aoms(){return <main className="container detail-page case-study">
  <header className="case-hero"><p className="eyebrow">CASE STUDY · PROJECT 01 / AVIATION SOFTWARE</p><h1 className="detail-title">Airport Operations <em>Management System.</em></h1><p className="detail-lead">A web platform for the control tower that replaces paper logbooks and movement registers with one accountable, real-time record of tower operations.</p>
    <p className="case-status-pill"><span className="signal"/>Development complete for current scope.</p>
    <dl className="case-facts">{facts.map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
    <figure className="case-visual"><ScreenFrame shot={aomsDashboard} pendingLabel="Demo screenshot pending · Tower dashboard" priority/><figcaption>Tower dashboard — today’s arrivals and departures, aircraft on ground, recent movements and predicted inbound traffic in one view. Demonstration environment, synthetic data.</figcaption></figure></header>

  <section className="case-section" data-reveal aria-labelledby="problem"><p className="section-tag">01 / THE PROBLEM</p><div><h2 id="problem">Paper records, <em>scattered context.</em></h2><div className="case-cards">
    <article className="case-card" data-reveal style={i(0)}><h3>Manual registers</h3><p>Tower workflows are traditionally handled through paper logbooks and disconnected records.</p></article>
    <article className="case-card" data-reveal style={i(1)}><h3>Scattered information</h3><p>Traffic movements and operational updates are often spread across separate manual records.</p></article>
    <article className="case-card" data-reveal style={i(2)}><h3>Accountability</h3><p>On a shared tower position, it must always be clear which controller made each entry and each correction.</p></article>
  </div></div></section>

  <section className="case-section" data-reveal aria-labelledby="solution"><p className="section-tag">02 / THE SOLUTION</p><div><h2 id="solution">One record of <em>the tower’s day.</em></h2><p className="case-text">AOMS brings the records a tower keeps by hand — arrivals, departures, the logbook, aircraft on the ground — into a single authenticated web application, designed from the controller’s position: quick entry during busy traffic, clear attribution of every entry, and no record that can quietly disappear.</p><p className="case-text case-context"><span className="case-card-no">OPERATIONAL CONTEXT</span>The design was informed by the day-to-day operations of Hargeisa Tower (HCMH), where I completed my tower on-the-job training. This describes the context the software was designed around; it is not a claim of official adoption or deployment.</p><div className="case-cards">{principles.map(([t,d],n)=><article className="case-card" data-reveal style={i(n)} key={t}><span className="case-card-no">0{n+1}</span><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>

  <section className="case-section" data-reveal aria-labelledby="screens"><p className="section-tag">03 / WORKFLOWS</p><div><h2 id="screens">Inside <em>the interface.</em></h2><ScreenshotGallery shots={aomsWorkflows} planned={aomsPlannedWorkflows} captions={aomsWorkflowCaptions}/><p className="case-note demo-note">All screenshots are taken from a demonstration environment containing only synthetic flight and movement data. They are not live airport records.</p></div></section>

  <section className="case-section" data-reveal aria-labelledby="features"><p className="section-tag">04 / FOR CONTROLLERS</p><div><h2 id="features">Controller-focused <em>features.</em></h2><div className="feature-groups">{features.map(([group,items],n)=><article className="feature-group" data-reveal style={i(n%2)} key={group}><h3><span>0{n+1}</span>{group}</h3><ul>{items.map(f=><li key={f}>{f}</li>)}</ul></article>)}</div></div></section>

  <section className="case-section" data-reveal aria-labelledby="architecture"><p className="section-tag">05 / ARCHITECTURE</p><div><h2 id="architecture">Rules live <em>in the database.</em></h2><ol className="arch">{layers.map(([tag,title,desc,tech],n)=><li className="arch-layer" data-reveal style={i(n)} key={tag as string}><span className="arch-tag">{tag}</span><div><h3>{title}</h3><p>{desc}</p><ul className="chips" aria-label="Technologies">{(tech as string[]).map(t=><li key={t}>{t}</li>)}</ul></div></li>)}</ol>
    <dl className="case-record">{record.map(([n,l])=><div key={l}><dt>{n}</dt><dd>{l}</dd></div>)}</dl><p className="case-note">Engineering record taken from the project repository, October 2026.</p></div></section>


  <section className="case-section" data-reveal aria-labelledby="challenges"><p className="section-tag">06 / CHALLENGES</p><div><h2 id="challenges">Hard problems, <em>solved carefully.</em></h2><ol className="challenges">{challenges.map(([t,d],n)=><li data-reveal style={i(n)} key={t}><span className="case-card-no">0{n+1}</span><h3>{t}</h3><p>{d}</p></li>)}</ol></div></section>

  <section className="case-section" data-reveal aria-labelledby="status"><p className="section-tag">07 / STATUS</p><div className="case-status"><h2 id="status">Development <em>complete</em> for current scope.</h2><p className="status">Case study of the software as built — not a claim of airport deployment or adoption</p><div className="actions"><a className="primary" href="/contact">Discuss AOMS ↗</a><a className="secondary" href="/projects">← All projects</a></div></div></section>
</main>}
