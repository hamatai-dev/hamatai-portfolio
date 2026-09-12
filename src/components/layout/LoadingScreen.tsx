'use client';

import { useEffect, useState } from 'react';

const LOADING_DURATION_MS = 1600;
const FADE_OUT_DELAY_MS = 200;
const FADE_OUT_DURATION_MS = 500;

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / LOADING_DURATION_MS) * 100));
      setProgress(pct);

      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setFadingOut(true), FADE_OUT_DELAY_MS);
        setTimeout(() => setVisible(false), FADE_OUT_DELAY_MS + FADE_OUT_DURATION_MS);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-surface transition-opacity ease-out ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ transitionDuration: `${FADE_OUT_DURATION_MS}ms` }}
    >
      <div className="text-primary font-bold text-3xl tracking-tight">
        hamatai
        <span className="text-accent">.</span>
      </div>

      <div className="w-56 h-1 rounded-full bg-surface-raised overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="text-secondary text-xs font-mono tabular-nums">{progress}%</div>
    </div>
  );
}
