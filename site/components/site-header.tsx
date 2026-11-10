'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './theme-toggle';
import OffDutyMenu from './off-duty-menu';

const before: [string, string][] = [['/projects', 'Projects'], ['/#skills', 'Skills'], ['/about', 'About'], ['/aviation', 'Aviation']];

export default function SiteHeader() {
  const pathname = usePathname() ?? '';
  // Mark the page the visitor is on, so the menu shows where they are.
  const cur = (href: string) => (!href.startsWith('/#') && pathname.startsWith(href) ? 'page' as const : undefined);
  return <header className="topbar container">
    <Link className="brand" href="/" aria-label="M.Amiin, back to the homepage">
      <span className="brand-mark" aria-hidden="true">M<span className="brand-dot"/><i>Amiin</i></span>
      <span className="brand-rule" aria-hidden="true"/>
      <span className="brand-home" aria-hidden="true"><span className="brand-arrow">←</span> Home</span>
    </Link>
    <nav aria-label="Primary navigation">
      {before.map(([href, name]) => <Link key={href} href={href} aria-current={cur(href)}>{name}</Link>)}
      <OffDutyMenu variant="topbar" />
      <Link href="/contact" aria-current={cur('/contact')}>Contact</Link>
    </nav>
    <div className="nav-actions"><ThemeToggle /><a className="nav-cv" href="/cv.pdf" download>Download CV ↗</a></div>
  </header>;
}
