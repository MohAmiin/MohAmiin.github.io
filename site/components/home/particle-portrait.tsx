'use client';
import { useEffect, useRef } from 'react';

type Pt = { tx: number; ty: number; x: number; y: number; vx: number; vy: number; c: string; s: number; dl: number };

// The hero portrait forms out of particles sampled from the photo's own pixels, then the sharp
// photo fades in. Hovering breaks it back into particles that scatter from the cursor.
// Without JavaScript, or with reduced motion, it is just the photo.
export default function ParticlePortrait({ src, srcSmall, alt }: { src: string; srcSmall: string; alt: string }) {
  const box = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const P = box.current, canvas = cv.current, im = img.current;
    if (!P || !canvas || !im || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    let pts: Pt[] = [], W = 0, H = 0, mx = -9999, my = -9999, hover = false, running = false, raf = 0;
    let startTimer: ReturnType<typeof setTimeout> | undefined, rt: ReturnType<typeof setTimeout> | undefined;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const build = () => {
      const pr = P.getBoundingClientRect(), ir = im.getBoundingClientRect();
      W = pr.width; H = pr.height;
      canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const off = document.createElement('canvas');
      off.width = Math.round(W); off.height = Math.round(H);
      const o = off.getContext('2d');
      if (!o) return;
      o.drawImage(im, ir.left - pr.left, ir.top - pr.top, ir.width, ir.height);
      const d = o.getImageData(0, 0, off.width, off.height).data, gap = W < 380 ? 5 : 4;
      pts = [];
      for (let y = 0; y < off.height; y += gap) for (let x = 0; x < off.width; x += gap) {
        const k = (y * off.width + x) * 4;
        if (d[k + 3] > 140) {
          const ang = Math.random() * 6.283, rad = Math.max(W, H) * (.7 + Math.random() * .6);
          pts.push({ tx: x, ty: y, x: W / 2 + Math.cos(ang) * rad, y: H / 2 + Math.sin(ang) * rad, vx: 0, vy: 0, c: `rgb(${d[k]},${d[k + 1]},${d[k + 2]})`, s: gap * .82, dl: Math.random() * 40 });
        }
      }
    };
    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      let moving = 0;
      for (const p of pts) {
        if (p.dl > 0) { p.dl--; moving++; continue; }
        let ax = (p.tx - p.x) * .06, ay = (p.ty - p.y) * .06;
        if (hover) {
          const dx = p.x - mx, dy = p.y - my, dd = dx * dx + dy * dy;
          if (dd < 9000) { const f = (9000 - dd) / 9000 * 7, di = Math.sqrt(dd) || 1; ax += dx / di * f; ay += dy / di * f; }
        }
        p.vx = (p.vx + ax) * .78; p.vy = (p.vy + ay) * .78; p.x += p.vx; p.y += p.vy;
        if (Math.abs(p.vx) + Math.abs(p.vy) > .05 || Math.abs(p.tx - p.x) > .6) moving++;
        ctx.fillStyle = p.c; ctx.fillRect(p.x, p.y, p.s, p.s);
      }
      if (moving > 0 || hover) raf = requestAnimationFrame(frame);
      else { running = false; if (!hover) P.classList.remove('particles'); }
    };
    const run = () => { if (!running) { running = true; raf = requestAnimationFrame(frame); } };
    const start = () => {
      try { build(); } catch { return; }
      if (!pts.length) return;
      P.classList.add('particles'); run();
    };
    const go = () => { startTimer = setTimeout(start, document.documentElement.classList.contains('h4-intro') ? 1700 : 150); };
    if (im.complete && im.naturalWidth) go(); else im.addEventListener('load', go, { once: true });

    const enter = () => { if (!pts.length || !fine) return; hover = true; P.classList.add('particles'); run(); };
    const move = (e: PointerEvent) => { const r = P.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; };
    const leave = () => { hover = false; mx = my = -9999; if (pts.length) run(); };
    const resize = () => { clearTimeout(rt); rt = setTimeout(() => { if (pts.length) build(); }, 300); };
    P.addEventListener('pointerenter', enter); P.addEventListener('pointermove', move); P.addEventListener('pointerleave', leave);
    window.addEventListener('resize', resize);
    return () => {
      clearTimeout(startTimer); clearTimeout(rt); cancelAnimationFrame(raf);
      im.removeEventListener('load', go);
      P.removeEventListener('pointerenter', enter); P.removeEventListener('pointermove', move); P.removeEventListener('pointerleave', leave);
      window.removeEventListener('resize', resize);
      P.classList.remove('particles');
    };
  }, []);

  return <div className="h4-portrait" id="h4-portrait" ref={box} role="img" aria-label={alt}>
    <canvas ref={cv} aria-hidden="true" />
    <picture>
      <source media="(max-width: 700px)" srcSet={srcSmall} />
      <img ref={img} src={src} alt="" width={1254} height={1254} fetchPriority="high" />
    </picture>
    <div className="ring" />
    <div className="cap"><span lang="ar" dir="rtl">محمد أمين</span><span>HCMI · HGA</span></div>
  </div>;
}
