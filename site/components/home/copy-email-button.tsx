'use client';
import { useRef, useState } from 'react';

export default function CopyEmailButton({ email }: { email: string }) {
  const [msg, setMsg] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  async function copy() {
    let ok = false;
    try { await navigator.clipboard.writeText(email); ok = true; } catch { ok = false; }
    setMsg(ok ? 'Email address copied.' : `Email: ${email}`);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(''), 3500);
  }
  return <>
    <button type="button" className="h4-btn" onClick={copy}>{msg.startsWith('Email address') ? 'Copied' : 'Copy email'} <span className="a" aria-hidden="true">⧉</span></button>
    <span className="status" role="status">{msg}</span>
  </>;
}
