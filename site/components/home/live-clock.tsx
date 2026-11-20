'use client';
import { useEffect, useState } from 'react';

const pad = (x: number) => String(x).padStart(2, '0');

// Hargeisa local time (UTC+3, no daylight saving) and Zulu time, like a tower clock.
export default function LiveClock() {
  const [t, setT] = useState<{ l: string; z: string } | null>(null);
  useEffect(() => {
    const tick = () => { const d = new Date(), u = d.getUTCHours(), m = d.getUTCMinutes(); setT({ l: `${pad((u + 3) % 24)}:${pad(m)}`, z: `${pad(u)}${pad(m)}Z` }); };
    tick();
    const iv = setInterval(tick, 15000);
    return () => clearInterval(iv);
  }, []);
  return <span className="meta h4-clock">HARGEISA <b>{t?.l ?? '--:--'}</b><span className="z">· <b>{t?.z ?? '----Z'}</b></span></span>;
}
