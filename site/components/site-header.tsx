import Link from 'next/link';
import ThemeToggle from './theme-toggle';
export default function SiteHeader(){return <header className="topbar container"><Link className="brand" href="/">MA<span className="brand-dot">.</span></Link><nav aria-label="Primary navigation"><Link href="/">Home</Link><Link href="/about">About</Link><Link href="/aviation">Aviation</Link><Link href="/projects">Projects</Link><Link href="/contact">Contact</Link></nav><div className="nav-actions"><ThemeToggle/><a className="nav-cv" href="/cv.pdf" download>Download CV ↗</a></div></header>}
