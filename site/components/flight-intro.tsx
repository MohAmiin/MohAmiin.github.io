'use client';
import { useEffect, useRef, useState } from 'react';

const route = 'M -80 260 C 170 230, 290 120, 520 145 S 910 45, 1390 78';
const viewWidth = 1300;
const viewHeight = 350;
const duration = 4800;

export default function FlightIntro() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const jetRef = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const svg = svgRef.current, path = pathRef.current, jet = jetRef.current;
    if (!svg || !path || !jet || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // The route stretches with the hero (preserveAspectRatio="none"), but the plane is
    // positioned in screen pixels so it keeps its true shape at every width.
    const sx = svg.clientWidth / viewWidth, sy = svg.clientHeight / viewHeight;
    const length = path.getTotalLength();
    let frame = 0, start: number | undefined;
    setPlaying(true);
    const animate = (time: number) => {
      if (start === undefined) start = time;
      const t = Math.min((time - start) / duration, 1);
      const eased = t * t * (3 - 2 * t);
      const distance = eased * length;
      path.style.strokeDashoffset = String(1 - eased);
      const point = path.getPointAtLength(distance);
      const ahead = path.getPointAtLength(Math.min(length, distance + 1));
      const angle = Math.atan2((ahead.y - point.y) * sy, (ahead.x - point.x) * sx) * 180 / Math.PI;
      jet.style.transform = `translate3d(${point.x * sx}px,${point.y * sy}px,0) rotate(${angle}deg)`;
      if (t < 1) frame = requestAnimationFrame(animate);
      else setPlaying(false);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [run]);
  return <>
    <div className="flight-intro" aria-hidden="true">
      <svg ref={svgRef} viewBox={`0 0 ${viewWidth} ${viewHeight}`} preserveAspectRatio="none" className="flight-svg">
        <path d={route} ref={pathRef} pathLength={1} className="flight-contrail" />
      </svg>
      <div ref={jetRef} className={playing ? 'flight-plane' : 'flight-plane flight-finished'}>
        <svg viewBox="-42 -24 68 48"><path d="M 23 0 L 1 -4 L -12 -21 L -18 -20 L -10 -3 L -28 -5 L -36 -12 L -40 -11 L -35 0 L -40 11 L -36 12 L -28 5 L -10 3 L -18 20 L -12 21 L 1 4 Z" /></svg>
      </div>
    </div>
    <button className="flight-replay" type="button" onClick={() => setRun(v => v + 1)}><span aria-hidden="true">↻ </span>Replay fly-by</button>
  </>;
}
