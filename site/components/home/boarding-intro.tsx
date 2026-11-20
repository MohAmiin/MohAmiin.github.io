'use client';
import { useEffect, useState } from 'react';

// Shown once per visit: a boarding pass counts to 100, then lifts away. The inline script in
// app/page.tsx decides before first paint whether it shows (never for reduced motion), so the
// page never flashes. This component only runs the counter and removes it.
export default function BoardingIntro() {
  const [n, setN] = useState(0);
  const [out, setOut] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains('h4-intro')) return;
    try { sessionStorage.setItem('ma-intro', '1'); } catch { /* storage may be blocked */ }
    let v = 0;
    let t1: ReturnType<typeof setTimeout> | undefined, t2: ReturnType<typeof setTimeout> | undefined;
    const iv = setInterval(() => {
      v = Math.min(100, v + Math.ceil(Math.random() * 9));
      setN(v);
      if (v >= 100) {
        clearInterval(iv);
        t1 = setTimeout(() => { setOut(true); t2 = setTimeout(() => root.classList.remove('h4-intro'), 1000); }, 250);
      }
    }, 45);
    return () => { clearInterval(iv); clearTimeout(t1); clearTimeout(t2); root.classList.remove('h4-intro'); };
  }, []);
  return <div className={out ? 'h4-intro out' : 'h4-intro'} aria-hidden="true">
    <div className="h4-ipass">
      <div className="l">
        <span className="h4-mono" style={{ color: '#6E5E58' }}>MA Airlines · Boarding pass</span>
        <div className="rt">HGA<i />WEB</div>
        <div className="f"><div><span>Passenger</span>Visitor</div><div><span>Flight</span>MA001</div><div><span>Seat</span>01A</div></div>
      </div>
      <div className="r"><span className="h4-mono" style={{ color: '#6E5E58' }}>Boarding</span><span className="cnt">{String(n).padStart(2, '0')}</span><div className="bc" /></div>
    </div>
  </div>;
}
