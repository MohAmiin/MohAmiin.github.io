'use client';
import { useEffect, useRef, useState } from 'react';

// Fallback for browsers without the async Clipboard API (or outside a secure context).
function legacyCopy(text: string) {
  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.appendChild(field);
  field.select();
  field.setSelectionRange(0, text.length); // iOS Safari ignores select() alone
  let ok = false;
  try { ok = document.execCommand('copy'); } catch { ok = false; }
  field.remove();
  return ok;
}

export default function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    let ok: boolean;
    try { await navigator.clipboard.writeText(email); ok = true; } catch { ok = legacyCopy(email); }
    setStatus(ok ? 'copied' : 'failed');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus('idle'), 3000);
  }
  return <span className="copy-email">
    <button type="button" className="secondary copy-email-button" onClick={copy}>{status === 'copied' ? 'Copied' : 'Copy email'}</button>
    <span className="copy-email-status" role="status">{status === 'copied' ? 'Email address copied.' : status === 'failed' ? 'Could not copy. Please select the address above.' : ''}</span>
  </span>;
}
