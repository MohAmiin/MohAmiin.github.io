// Original ambience synthesised in the browser with the Web Audio API: no recordings or
// third-party music are downloaded, and nothing is created until a visitor presses play.

export type Track = { start(): void; stop(immediate?: boolean): void; setVolume(level: number): void };
type Build = (ctx: AudioContext, out: AudioNode) => () => void;

// Slider position (0–100) to gain, on a gentle curve so low settings stay quiet.
export const gainFor = (volume: number) => (volume / 100) ** 2;

export function createTrack(ctx: AudioContext, volume: number, build: Build): Track {
  const level = ctx.createGain();
  level.gain.value = gainFor(volume);
  level.connect(ctx.destination);
  let fade: GainNode | null = null;
  let teardown: (() => void) | null = null;
  return {
    start() {
      if (fade) return;
      const now = ctx.currentTime;
      fade = ctx.createGain();
      fade.gain.setValueAtTime(0, now);
      fade.gain.linearRampToValueAtTime(1, now + 2.5);
      fade.connect(level);
      teardown = build(ctx, fade);
    },
    stop(immediate = false) {
      if (!fade) return;
      const node = fade, end = teardown;
      fade = null; teardown = null;
      const finish = () => { try { end?.(); } catch { /* context already closed */ } node.disconnect(); };
      if (immediate) return finish();
      const now = ctx.currentTime;
      node.gain.cancelScheduledValues(now);
      node.gain.setValueAtTime(node.gain.value, now);
      node.gain.linearRampToValueAtTime(0, now + 0.6);
      setTimeout(finish, 700);
    },
    setVolume(volume) { level.gain.setTargetAtTime(gainFor(volume), ctx.currentTime, 0.05); },
  };
}

// Calm music: a slow, softly filtered pad moving through four chords in D major, with
// occasional bell notes from the pentatonic scale and a light echo.
const chords = [[146.83, 220, 329.63, 369.99], [123.47, 185, 293.66, 369.99], [98, 196, 293.66, 369.99], [110, 220, 277.18, 329.63]];
const bells = [587.33, 659.25, 739.99, 880, 987.77];

export const music: Build = (ctx, out) => {
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass'; filter.frequency.value = 850; filter.Q.value = 0.5;
  const echo = ctx.createDelay(2); echo.delayTime.value = 0.52;
  const feedback = ctx.createGain(); feedback.gain.value = 0.35;
  const wet = ctx.createGain(); wet.gain.value = 0.28;
  echo.connect(feedback); feedback.connect(echo); echo.connect(wet); wet.connect(out);
  filter.connect(out); filter.connect(echo);

  const pad = ctx.createGain(); pad.gain.value = 0.06; pad.connect(filter);
  const sweep = ctx.createOscillator(); sweep.frequency.value = 0.05;
  const sweepDepth = ctx.createGain(); sweepDepth.gain.value = 300;
  sweep.connect(sweepDepth); sweepDepth.connect(filter.frequency);
  const voices = chords[0].flatMap(freq => [-5, 5].map(cents => {
    const osc = ctx.createOscillator();
    osc.type = 'triangle'; osc.frequency.value = freq; osc.detune.value = cents;
    osc.connect(pad);
    return osc;
  }));
  [...voices, sweep].forEach(osc => osc.start());

  let step = 0;
  const chordTimer = setInterval(() => {
    step = (step + 1) % chords.length;
    voices.forEach((osc, i) => osc.frequency.setTargetAtTime(chords[step][i >> 1], ctx.currentTime, 1.4));
  }, 9000);

  let bellTimer: ReturnType<typeof setTimeout>;
  const bell = () => {
    const t = ctx.currentTime;
    const osc = ctx.createOscillator(), env = ctx.createGain();
    osc.type = 'sine'; osc.frequency.value = bells[Math.floor(Math.random() * bells.length)];
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(0.035, t + 0.03);
    env.gain.exponentialRampToValueAtTime(0.0001, t + 4);
    osc.connect(env); env.connect(out); env.connect(echo);
    osc.start(t); osc.stop(t + 4.1);
    bellTimer = setTimeout(bell, 3000 + Math.random() * 5000);
  };
  bellTimer = setTimeout(bell, 2000);

  return () => {
    clearInterval(chordTimer); clearTimeout(bellTimer);
    [...voices, sweep].forEach(osc => osc.stop());
    [filter, echo, feedback, wet, pad, sweepDepth].forEach(node => node.disconnect());
  };
};

// Night ambience: a soft breeze (filtered brown noise that slowly swells) and two distant
// crickets chirping at their own pace, one on each side.
function brownNoise(ctx: AudioContext, seconds: number) {
  const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < data.length; i++) {
    last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
    data[i] = last * 3.5;
  }
  return buffer;
}

export const night: Build = (ctx, out) => {
  const noise = ctx.createBufferSource();
  noise.buffer = brownNoise(ctx, 6); noise.loop = true;
  const lowpass = ctx.createBiquadFilter(); lowpass.type = 'lowpass'; lowpass.frequency.value = 480;
  const breeze = ctx.createGain(); breeze.gain.value = 0.22;
  const swell = ctx.createOscillator(); swell.frequency.value = 0.07;
  const swellDepth = ctx.createGain(); swellDepth.gain.value = 0.12;
  swell.connect(swellDepth); swellDepth.connect(breeze.gain);
  noise.connect(lowpass); lowpass.connect(breeze); breeze.connect(out);
  noise.start(); swell.start();

  const crickets = [{ freq: 4400, pan: -0.55, period: 1.1 }, { freq: 4950, pan: 0.5, period: 1.5 }].map(c => {
    const osc = ctx.createOscillator(); osc.frequency.value = c.freq;
    const env = ctx.createGain(); env.gain.value = 0;
    osc.connect(env);
    if (typeof ctx.createStereoPanner === 'function') {
      const pan = ctx.createStereoPanner(); pan.pan.value = c.pan;
      env.connect(pan); pan.connect(out);
    } else env.connect(out);
    osc.start();
    return { ...c, osc, env, next: ctx.currentTime + 1 + Math.random() };
  });
  // Look-ahead scheduler: books each chirp (three short pulses) slightly ahead of time.
  const scheduler = setInterval(() => {
    for (const c of crickets) {
      while (c.next < ctx.currentTime + 0.5) {
        for (let p = 0; p < 3; p++) {
          const t = c.next + p * 0.055;
          c.env.gain.setValueAtTime(0, t);
          c.env.gain.linearRampToValueAtTime(0.01, t + 0.008);
          c.env.gain.linearRampToValueAtTime(0, t + 0.032);
        }
        c.next += c.period * (0.85 + Math.random() * 0.3) + (Math.random() < 0.12 ? 3 + Math.random() * 4 : 0);
      }
    }
  }, 200);

  return () => {
    clearInterval(scheduler);
    [noise, swell, ...crickets.map(c => c.osc)].forEach(src => src.stop());
    [lowpass, breeze, swellDepth, ...crickets.map(c => c.env)].forEach(node => node.disconnect());
  };
};
