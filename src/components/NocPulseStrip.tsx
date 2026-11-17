'use client';

import * as React from 'react';
import { gsap } from 'gsap';
import { prefersReducedMotion } from '@/engine';

export function NocPulseStrip({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const barRef = React.useRef<HTMLDivElement | null>(null);
  const hzRef = React.useRef<HTMLSpanElement | null>(null);

  React.useEffect(() => {
    if (prefersReducedMotion()) return;
    let phase = 0;
    const onTick = () => {
      phase += gsap.ticker.deltaRatio() * 0.045;
      const pct = 64 + Math.sin(phase) * 28;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${(pct / 100).toFixed(3)})`;
      }
      if (hzRef.current) {
        const hz = (60 + Math.sin(phase * 1.3) * 0.04).toFixed(2).replace('.', ',');
        if (hzRef.current.textContent !== `${hz} Hz`) hzRef.current.textContent = `${hz} Hz`;
      }
    };
    gsap.ticker.add(onTick);
    return () => gsap.ticker.remove(onTick);
  }, []);

  return (
    <div className={`noc-strip noc-strip--${variant}`} aria-hidden="true">
      <div className="noc-strip__top">
        <span className="mono-tag">
          {variant === 'dark' ? 'LEITURA NOC · BARRAMENTO ABERTO' : 'TELEMETRIA NOC UBERABA · TEMPO REAL'}
        </span>
        <span ref={hzRef} className="mono-num noc-strip__hz">
          60,00 Hz
        </span>
      </div>
      <div className="noc-strip__track">
        <div ref={barRef} className="noc-strip__fill" />
      </div>
    </div>
  );
}
