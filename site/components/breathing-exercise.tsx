'use client';
import { useEffect, useRef, useState } from 'react';

// Guided 4–4–6 breathing. Timing runs off the clock (not the tick count), so pausing and
// resuming keeps the exact place in the cycle.
const phases = [
  { name: 'Breathe in', seconds: 4, cue: 'Breathe in slowly through your nose' },
  { name: 'Hold', seconds: 4, cue: 'Hold your breath gently' },
  { name: 'Breathe out', seconds: 6, cue: 'Breathe out slowly through your mouth' },
];
const cycleMs = phases.reduce((sum, p) => sum + p.seconds * 1000, 0);
type Status = 'idle' | 'running' | 'paused';

function locate(elapsed: number) {
  let t = elapsed % cycleMs;
  for (let i = 0; i < phases.length; i++) {
    const length = phases[i].seconds * 1000;
    if (t < length) return { index: i, progress: t / length, left: Math.ceil((length - t) / 1000) };
    t -= length;
  }
  return { index: 0, progress: 0, left: phases[0].seconds };
}

// Orb size through the cycle: grows on the in-breath, rests on the hold, shrinks on the out-breath.
const scaleFor = (index: number, progress: number) => index === 0 ? 0.55 + 0.45 * progress : index === 1 ? 1 : 1 - 0.45 * progress;

export default function BreathingExercise() {
  const [status, setStatus] = useState<Status>('idle');
  const [elapsed, setElapsed] = useState(0);
  const last = useRef(0);

  useEffect(() => {
    if (status !== 'running') return;
    last.current = performance.now();
    const timer = setInterval(() => {
      const now = performance.now(), delta = now - last.current;
      last.current = now;
      setElapsed(e => e + delta);
    }, 100);
    return () => clearInterval(timer);
  }, [status]);

  const { index, progress, left } = locate(elapsed);
  const phase = phases[index];
  const cycle = Math.floor(elapsed / cycleMs) + 1;
  const active = status !== 'idle';
  const scale = active ? scaleFor(index, progress) : 0.55;

  return <div className="breathe" role="group" aria-labelledby="breathe-heading">
    <div className="breathe-visual" aria-hidden="true">
      <div className="breath-orb" style={{ transform: `scale(${scale})` }}/>
      <div className="breath-readout">
        <span className="breath-phase">{active ? phase.name : 'Ready'}</span>
        <span className="breath-count">{active ? left : '4 · 4 · 6'}</span>
      </div>
    </div>
    <div className="breathe-panel">
      <ol className="breath-steps">
        {phases.map((p, i) => <li key={p.name} className={active && i === index ? 'current' : undefined} aria-current={active && i === index ? 'step' : undefined}>
          <strong>{p.name}</strong><span>{p.seconds} seconds</span>
        </li>)}
      </ol>
      <p className="breath-instruction" role="status">
        {status === 'idle' ? 'Press Start, then follow the words or the circle.'
          : status === 'paused' ? `Paused during “${phase.name}”. Press Resume to continue.`
          : `${phase.cue} for ${phase.seconds} seconds.`}
      </p>
      <div className="breath-controls">
        {status === 'running'
          ? <button type="button" className="breath-button" onClick={() => setStatus('paused')}>Pause</button>
          : <button type="button" className="breath-button primary-like" onClick={() => setStatus('running')}>{status === 'paused' ? 'Resume' : 'Start'}</button>}
        <button type="button" className="breath-button" onClick={() => { setStatus('idle'); setElapsed(0); }} disabled={!active}>Reset</button>
        {active && <span className="breath-cycle">Cycle {cycle}</span>}
      </div>
    </div>
  </div>;
}
