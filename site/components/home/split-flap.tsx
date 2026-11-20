'use client';
import { useEffect, useRef } from 'react';

const WORDS = ['DESIGNER', 'DEVELOPER', 'CREATOR', 'SOLVER'];
const N = 9;
const CH = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Airport departure-board letters that flip between the four things I do.
export default function SplitFlap() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cells = Array.from(el.children) as HTMLElement[];
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const show = (word: string) => {
      const w = word.padEnd(N, ' ');
      cells.forEach((c, i) => {
        if (reduce) { c.textContent = w[i]; return; }
        let k = 0;
        const steps = 6 + i * 2;
        const step = () => {
          if (k++ < steps) {
            c.textContent = CH[Math.floor(Math.random() * CH.length)];
            c.classList.remove('flip'); void c.offsetWidth; c.classList.add('flip');
            timers.push(setTimeout(step, 55));
          } else c.textContent = w[i];
        };
        step();
      });
    };
    let wi = 0;
    show(WORDS[0]);
    const iv = reduce ? undefined : setInterval(() => { wi = (wi + 1) % WORDS.length; show(WORDS[wi]); }, 3200);
    return () => { clearInterval(iv); timers.forEach(clearTimeout); };
  }, []);
  return <div className="h4-board">
    <span className="h4-mono lbl">Now boarding —</span>
    <div className="h4-flaps" ref={ref} role="img" aria-label="Designer, developer, creator, problem-solver">
      {Array.from({ length: N }, (_, i) => <span className="h4-flap" key={i} aria-hidden="true">{WORDS[0].padEnd(N, ' ')[i]}</span>)}
    </div>
  </div>;
}
