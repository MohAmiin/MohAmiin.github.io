// A large, original airliner silhouette (no airline branding) that climbs slowly across the
// homepage hero behind the name and portrait. Pure SVG + CSS animation: no JavaScript, cheap to
// run, still for visitors who prefer reduced motion. Colours come from CSS variables so it
// suits both the dark and the light hero.
const windows = Array.from({ length: 29 }, (_, i) => 250 + i * 19);

export default function HeroFlight() {
  return <div className="mag-sky" aria-hidden="true">
    <div className="mag-flight">
      <div className="mag-trail" />
      <svg className="mag-plane" viewBox="0 0 1000 300" focusable="false">
        <defs>
          <linearGradient id="mag-plane-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--pl-top)' }} />
            <stop offset=".55" style={{ stopColor: 'var(--pl-mid)' }} />
            <stop offset="1" style={{ stopColor: 'var(--pl-bot)' }} />
          </linearGradient>
          <linearGradient id="mag-plane-edge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" style={{ stopColor: 'var(--pl-glint)', stopOpacity: 0 }} />
            <stop offset=".6" style={{ stopColor: 'var(--pl-glint)', stopOpacity: .55 }} />
            <stop offset="1" style={{ stopColor: 'var(--pl-glint2)', stopOpacity: .8 }} />
          </linearGradient>
        </defs>
        <path className="pl-far" d="M545,128 L700,70 L735,72 L610,132 Z" />
        <path d="M118,124 L58,26 L112,24 L248,124 Z" fill="url(#mag-plane-body)" />
        <path className="pl-stab" d="M150,160 L70,206 L114,208 L248,166 Z" />
        <path d="M62,150 C62,132 82,122 116,122 L810,122 C880,122 942,134 968,150 C942,166 880,178 810,178 L116,178 C82,178 62,168 62,150 Z" fill="url(#mag-plane-body)" />
        <path d="M116,123 L810,123 C880,123 942,135 966,149" fill="none" stroke="url(#mag-plane-edge)" strokeWidth="2.2" />
        <g className="pl-win">{windows.map(x => <rect key={x} x={x} y="138" width="7" height="9" rx="3" />)}</g>
        <path className="pl-cockpit" d="M900,140 L928,140 L944,148 L906,148 Z" />
        <path className="pl-wing" d="M560,168 L360,262 L410,266 L640,172 Z" />
        <path className="pl-eng" d="M410,214 C410,198 430,190 470,190 L548,190 C566,190 574,200 574,212 C574,224 566,232 548,232 L470,232 C430,232 410,226 410,214 Z" />
        <path className="pl-lip" d="M548,190 C566,190 574,200 574,212 C574,224 566,232 548,232" fill="none" strokeWidth="2" />
        <circle className="pl-beacon" cx="560" cy="120" r="5" />
        <circle className="pl-strobe" cx="364" cy="262" r="4.5" />
        <circle className="pl-strobe" cx="60" cy="28" r="4" />
      </svg>
    </div>
  </div>;
}
