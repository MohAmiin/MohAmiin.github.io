// A large, original airliner in the fictional "MA Airlines" livery (Mohamed Amiin's own brand) that climbs slowly across the
// homepage hero behind the name and portrait. Pure SVG + CSS animation: no JavaScript, cheap to
// run, still for visitors who prefer reduced motion. Colours come from CSS variables so it
// suits both the dark and the light hero.
const windows = [262, 278, 294, 310, 326, 342, 358, 374, 390, 406, 422, 438, 454, 470, 486, 502, 518, 534, 550, 596, 612, 628, 644, 660, 676, 692, 708, 724, 740, 756, 772, 788, 804];

export default function HeroFlight() {
  return <div className="mag-sky" aria-hidden="true">
    <div className="mag-flight">
      <div className="mag-trail" />
      <svg className="mag-plane" viewBox="0 0 1000 300" focusable="false">
        <defs>
          <linearGradient id="mag-pl-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--pl-top)' }} />
            <stop offset=".45" style={{ stopColor: 'var(--pl-mid)' }} />
            <stop offset="1" style={{ stopColor: 'var(--pl-bot)' }} />
          </linearGradient>
          <linearGradient id="mag-pl-fin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--pl-top)' }} />
            <stop offset="1" style={{ stopColor: 'var(--pl-bot)' }} />
          </linearGradient>
          <linearGradient id="mag-pl-eng" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--pl-eng-top)' }} />
            <stop offset="1" style={{ stopColor: 'var(--pl-eng-bot)' }} />
          </linearGradient>
          <linearGradient id="mag-pl-glint" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" style={{ stopColor: 'var(--pl-glint)', stopOpacity: 0 }} />
            <stop offset=".55" style={{ stopColor: 'var(--pl-glint)', stopOpacity: .5 }} />
            <stop offset="1" style={{ stopColor: 'var(--pl-glint2)', stopOpacity: .85 }} />
          </linearGradient>
        </defs>
        <path className="pl-far" d="M600,121 L512,92 C506,90 498,91 496,94 L548,121 Z" />
        <path d="M262,121 L132,22 C124,15 108,13 96,16 L84,121 Z" fill="url(#mag-pl-fin)" />
        <path d="M262,121 L132,22" stroke="url(#mag-pl-glint)" strokeWidth="1.6" opacity=".7" />
        <path className="pl-stab" d="M196,152 L108,182 C102,184 100,188 106,189 L128,189 L226,160 Z" />
        <path d="M150,120 L820,120 C900,120 958,128 979,146 C983,150 981,154 976,158 C950,170 906,176 858,176 L330,176 C240,176 150,162 72,131 C60,126 60,121 72,120 Z" fill="url(#mag-pl-body)" />
        <path d="M150,121 L820,121 C900,121 958,129 978,146" fill="none" stroke="url(#mag-pl-glint)" strokeWidth="2" />
        <path className="pl-belly" d="M470,176 C520,186 640,186 690,176 Z" />
        <g className="pl-win">{windows.map(x => <rect key={x} x={x} y="133" width="6" height="8" rx="3" />)}</g>
        <path className="pl-cheat" d="M160,147 L880,147 C915,148 945,150 968,154" />
        <text className="pl-title" x="704" y="168">MA AIRLINES</text>
        <text className="pl-tail" x="160" y="98" textAnchor="middle">MA</text>
        <rect className="pl-door" x="842" y="128" width="12" height="22" rx="3" />
        <rect className="pl-door" x="572" y="128" width="12" height="22" rx="3" />
        <path className="pl-cockpit" d="M906,131 L934,131 C944,132 952,136 956,141 L914,141 Z" />
        <path className="pl-wing" d="M664,166 L470,222 C462,225 446,226 436,223 L548,170 Z" />
        <path d="M664,166 L470,222" stroke="url(#mag-pl-glint)" strokeWidth="1.4" opacity=".6" />
        <path className="pl-far" d="M606,176 L628,166 L662,166 L650,182 Z" />
        <path d="M566,184 L668,182 C684,182 694,190 694,199 C694,208 684,216 668,216 L566,214 C556,214 550,207 550,199 C550,191 556,184 566,184 Z" fill="url(#mag-pl-eng)" />
        <path className="pl-lip" d="M668,182 C684,182 694,190 694,199 C694,208 684,216 668,216" fill="none" strokeWidth="2" />
        <path className="pl-exhaust" d="M550,199 L526,199" strokeWidth="10" strokeLinecap="round" />
        <circle className="pl-beacon" cx="520" cy="119" r="4.5" />
        <circle className="pl-strobe" cx="438" cy="223" r="4" />
        <circle className="pl-strobe" cx="70" cy="125" r="3.5" />
      </svg>
    </div>
  </div>;
}
