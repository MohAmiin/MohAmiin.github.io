import Link from 'next/link';
import ThemeToggle from './theme-toggle';
export default function SiteHeader(){return <header className="topbar container"><Link className="brand" href="/">M.AMIIN</Link><nav aria-label="Primary navigation"><Link href="/about">About</Link><Link href="/aviation">Experience</Link><Link href="/projects">Projects</Link><Link href="/relax">Off duty</Link><Link href="/contact">Contact</Link></nav><div className="nav-actions"><ThemeToggle/><a className="nav-cv" href="/cv.pdf" download>Download CV ↗</a></div></header>}
