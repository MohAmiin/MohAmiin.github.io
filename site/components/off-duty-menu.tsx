'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

// "Off duty" groups the personal pages so the main menu stays at five items.
export const offDutyLinks: [string, string][] = [['/library', 'My Library'], ['/films', 'My Films'], ['/relax', 'The meadow'], ['/relax#challenge-heading', 'Chess'], ['/fitness', 'Fitness']];
export const isOffDuty = (p: string | null) => !!p && (p.startsWith('/library') || p.startsWith('/films') || p.startsWith('/relax') || p.startsWith('/fitness'));

export default function OffDutyMenu({ variant }: { variant: 'topbar' | 'magazine' }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  useEffect(() => { ref.current?.removeAttribute('open'); }, [pathname]);
  useEffect(() => {
    const close = (e: MouseEvent | KeyboardEvent) => {
      const d = ref.current; if (!d?.open) return;
      if (e instanceof KeyboardEvent) { if (e.key === 'Escape') { d.removeAttribute('open'); d.querySelector('summary')?.focus(); } return; }
      if (!d.contains(e.target as Node)) d.removeAttribute('open');
    };
    document.addEventListener('click', close); document.addEventListener('keydown', close);
    return () => { document.removeEventListener('click', close); document.removeEventListener('keydown', close); };
  }, []);
  const current = isOffDuty(pathname);
  return <details ref={ref} className={`offduty offduty-${variant}`}>
    <summary className={current ? 'is-current' : undefined}>Off duty<span aria-hidden="true" className="offduty-caret">▾</span></summary>
    <div className="offduty-panel">
      {offDutyLinks.map(([href, name]) => <Link key={name} href={href} aria-current={pathname?.startsWith(href) && href !== '/relax#challenge-heading' ? 'page' : undefined}>{name}</Link>)}
    </div>
  </details>;
}
