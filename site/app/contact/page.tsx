import type { Metadata } from 'next';import CopyEmail from '../../components/copy-email';import { email, gitHub, linkedIn } from '../../components/profiles';
export const metadata:Metadata={title:'Contact | Mohamed Amiin',description:'Contact Mohamed Amiin by email or LinkedIn for aviation opportunities, software development and collaboration.'};
export default function Contact(){return <main className="container detail-page contact-page"><p className="eyebrow">04 / CONTACT</p><h1 className="detail-title">Let's make <em>contact.</em></h1><p className="detail-lead">For aviation opportunities, software development and collaboration.</p>
  <div className="info-grid contact-grid">
    <article className="contact-card"><h2>Email</h2><p className="contact-address"><a href={`mailto:${email}`}>{email}</a></p><div className="contact-actions"><a className="primary" href={`mailto:${email}`}>Send an email ↗</a><CopyEmail email={email}/></div></article>
    <article className="contact-card contact-card-linkedin"><h2>LinkedIn</h2><p className="muted">Professional profile, experience and updates.</p><div className="contact-actions"><a className="primary" href={linkedIn} target="_blank" rel="noopener noreferrer">Connect on LinkedIn ↗<span className="sr-only"> (opens LinkedIn in a new tab)</span></a></div><p className="contact-also">Code: <a href={gitHub} target="_blank" rel="noopener noreferrer">GitHub ↗<span className="sr-only"> (opens GitHub in a new tab)</span></a></p></article>
  </div>
  <a className="secondary inline-action" href="/cv.pdf" download>Download CV ↓</a></main>}
