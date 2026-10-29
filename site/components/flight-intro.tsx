'use client';
import { useEffect, useRef, useState } from 'react';

const route = 'M -80 260 C 170 230, 290 120, 520 145 S 910 45, 1390 78';
export default function FlightIntro() {
  const pathRef = useRef<SVGPathElement>(null);
  const jetRef = useRef<SVGGElement>(null);
  const frameRef = useRef<number | null>(null);
  const [run, setRun] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const path = pathRef.current;
    if (!path || reduced) return;
    const jet = jetRef.current;
    const length = path.getTotalLength();
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length);
    setPlaying(true);
    let start: number | undefined;
    const duration = 4800;
    const animate = (time: number) => {
      if (start === undefined) start = time;
      const t = Math.min((time - start) / duration, 1);
      const eased = t * t * (3 - 2 * t);
      const distance = eased * length;
      path.style.strokeDashoffset = String(length - distance);
      const point = path.getPointAtLength(distance);
      const nearby = path.getPointAtLength(Math.min(length, distance + 1));
      const angle = Math.atan2(nearby.y - point.y, nearby.x - point.x) * 180 / Math.PI;
      jet?.setAttribute('transform', 'translate(' + point.x + ' ' + point.y + ') rotate(' + angle + ')');
      if (t < 1) frameRef.current = requestAnimationFrame(animate);
      else setPlaying(false);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => { if (frameRef.current !== null) cancelAnimationFrame(frameRef.current); };
  }, [run]);
  return <div className="flight-intro" aria-hidden="true">
    <svg viewBox="0 0 1300 350" preserveAspectRatio="none" className="flight-svg">
      <path d={route} ref={pathRef} className="flight-contrail" />
      <g ref={jetRef} className={playing ? 'flight-plane' : 'flight-plane flight-finished'}>
        <path d="M 23 0 L 1 -4 L -12 -21 L -18 -20 L -10 -3 L -28 -5 L -36 -12 L -40 -11 L -35 0 L -40 11 L -36 12 L -28 5 L -10 3 L -18 20 L -12 21 L 1 4 Z" />
      </g>
    </svg>
    <button className="flight-replay" type="button" aria-label="Replay airplane fly-by animation" onClick={() => setRun(v => v + 1)}>↻ Replay fly-by</button>
  </div>;
}
