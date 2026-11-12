import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free 4-Day Workout Plan | Mohamed Amiin',
  description: 'A free, printable 4-day workout plan by Mohamed Amiin: a 6-week lifting block with chest, back, legs and shoulders days, a picture guide for every machine and a progress tracker.',
};

const PDF = '/downloads/4-day-workout-plan.pdf';

const week: [string, string, string][] = [
  ['Mon', 'Chest + Triceps', 'Heavy push + accessories'],
  ['Tue', 'Back + Biceps', 'Pull volume, no heavy deadlift'],
  ['Wed', 'Legs + Core', 'Strength + controlled volume'],
  ['Thu', 'Shoulders + Arms', 'Upper-body top-ups + bike intervals'],
  ['Fri – Sun', 'Recovery', 'Easy walks, mobility and one full rest day'],
];

export default function Fitness() {
  return <main className="container detail-page fitness-page">
    <header className="fit-intro">
      <div>
        <p className="eyebrow">OFF DUTY · FITNESS</p>
        <h1 className="detail-title">Train with a <em>plan.</em></h1>
      </div>
      <p className="detail-lead">Training keeps me sharp for long shifts and long builds. This is the 4-day plan I follow, free to download, print and use.</p>
    </header>

    <section className="fit-plan" data-reveal aria-labelledby="plan-title">
      <div className="fit-pages" aria-hidden="true">
        <img src="/images/fitness/plan-machines.webp" alt="" width={640} height={906} loading="lazy" decoding="async" />
        <img src="/images/fitness/plan-monday.webp" alt="" width={640} height={906} loading="lazy" decoding="async" />
        <img src="/images/fitness/plan-cover.webp" alt="" width={640} height={906} decoding="async" />
      </div>
      <div className="fit-body">
        <p className="pill pill-done"><span className="pill-dot" aria-hidden="true" />Free · PDF · 9 pages</p>
        <h2 id="plan-title">4-Day Workout Plan <em>Intense Edition</em></h2>
        <p>A 6-week lifting block: hard training with real recovery built in. Every session lists sets, reps, rest and effort, with a picture of each machine so you know exactly what to use.</p>
        <ul className="fit-facts">
          <li><b>4</b> lift days</li><li><b>6</b> week block</li><li><b>23</b> exercises, all pictured</li><li><b>1</b> printable tracker</li>
        </ul>
        <div className="actions">
          <a className="primary" href={PDF} target="_blank" rel="noopener" download="Mohamed-Amiin-4-Day-Workout-Plan.pdf">Download the free plan ↓<span className="sr-only"> (PDF, 0.6 MB)</span></a>
          <a className="secondary" href={PDF} target="_blank" rel="noopener">Open in browser ↗<span className="sr-only"> (opens in a new tab)</span></a>
        </div>
        <p className="fit-size">PDF · 0.6 MB · A4, prints in colour or black and white</p>
      </div>
    </section>

    <section className="fit-week" data-reveal aria-labelledby="week-title">
      <h2 id="week-title">The week <em>at a glance.</em></h2>
      <ol>{week.map(([d, t, s]) => <li key={d}><span>{d}</span><b>{t}</b><small>{s}</small></li>)}</ol>
    </section>

    <p className="fit-note" data-reveal><b>Before you start:</b> this is general guidance, not medical advice. If you are new to lifting, returning from injury or have a health condition, check with a doctor or qualified coach first, and stop any exercise that causes sharp pain.</p>
  </main>;
}
