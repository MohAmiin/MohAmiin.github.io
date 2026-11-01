'use client';
import { useEffect, useRef, useState } from 'react';
import { createTrack, music, night, type Track } from './ambience';

type Kind = 'music' | 'night';
const tracks: { kind: Kind; label: string }[] = [{ kind: 'music', label: 'Calm music' }, { kind: 'night', label: 'Night sounds' }];

function Icon({ playing }: { playing: boolean }) {
  return <svg className="sound-icon" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
    {playing ? <path d="M4 2.5h2.6v11H4zM9.4 2.5H12v11H9.4z"/> : <path d="M4.5 2.2 13 8l-8.5 5.8z"/>}
  </svg>;
}

// Optional soundscape for the Off Duty page. The AudioContext is created inside the first
// play press (required by iPhone Safari), suspended when both tracks are paused and closed
// when the visitor leaves the page.
export default function RelaxSoundscape() {
  const ctxRef = useRef<AudioContext | null>(null);
  const trackRef = useRef<Record<Kind, Track> | null>(null);
  const suspendTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [playing, setPlaying] = useState<Record<Kind, boolean>>({ music: false, night: false });
  const [volume, setVolume] = useState<Record<Kind, number>>({ music: 55, night: 50 });
  const [supported, setSupported] = useState(true);

  useEffect(() => () => {
    clearTimeout(suspendTimer.current);
    if (trackRef.current) Object.values(trackRef.current).forEach(t => t.stop(true));
    void ctxRef.current?.close();
    ctxRef.current = null; trackRef.current = null;
  }, []);

  function setup() {
    if (ctxRef.current && trackRef.current) return { ctx: ctxRef.current, all: trackRef.current };
    const AudioCtx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) { setSupported(false); return null; }
    // iOS 17+: play through the silent switch, like media playback.
    const session = (navigator as Navigator & { audioSession?: { type: string } }).audioSession;
    if (session) try { session.type = 'playback'; } catch { /* unsupported */ }
    const ctx = new AudioCtx();
    const all = { music: createTrack(ctx, volume.music, music), night: createTrack(ctx, volume.night, night) };
    ctxRef.current = ctx; trackRef.current = all;
    return { ctx, all };
  }

  function toggle(kind: Kind) {
    const audio = setup();
    if (!audio) return;
    const next = { ...playing, [kind]: !playing[kind] };
    clearTimeout(suspendTimer.current);
    if (next[kind]) {
      void audio.ctx.resume();
      audio.all[kind].start();
    } else {
      audio.all[kind].stop();
      if (!next.music && !next.night) suspendTimer.current = setTimeout(() => void audio.ctx.suspend(), 800);
    }
    setPlaying(next);
  }

  function changeVolume(kind: Kind, value: number) {
    setVolume(v => ({ ...v, [kind]: value }));
    trackRef.current?.[kind].setVolume(value);
  }

  return <div className="soundscape" role="group" aria-labelledby="soundscape-title">
    <div className="soundscape-title" id="soundscape-title">SOUNDSCAPE <span>· optional, silent until you press play</span></div>
    <div className="soundscape-tracks">
      {tracks.map(({ kind, label }) => <div className="sound-track" key={kind}>
        <button type="button" className="sound-toggle" aria-pressed={playing[kind]} onClick={() => toggle(kind)} disabled={!supported}>
          <Icon playing={playing[kind]}/><span>{label}</span>
        </button>
        <label className="sound-volume">
          <span className="sr-only">{label} volume</span>
          <input type="range" min={0} max={100} step={5} value={volume[kind]} aria-valuetext={`${volume[kind]}%`} onChange={e => changeVolume(kind, Number(e.target.value))}/>
        </label>
      </div>)}
    </div>
    {!supported && <div className="soundscape-note" role="status">Audio is not supported in this browser.</div>}
  </div>;
}
