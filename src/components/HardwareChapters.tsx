'use client';

import * as React from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePage } from '@/engine/next';
import { hardwareLineup } from '@/data/site';

gsap.registerPlugin(ScrollTrigger);

export function HardwareChapters() {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  usePage(() => {
    const root = rootRef.current;
    if (!root) return;
    const chapters = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('[data-hw-chapter]'));
    const triggers = chapters.map((el, idx) =>
      ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: () => setActiveIdx(idx),
        onEnterBack: () => setActiveIdx(idx),
      }),
    );
    return () => triggers.forEach((st) => st.kill());
  });

  const current = hardwareLineup[activeIdx] ?? hardwareLineup[0]!;

  return (
    <div ref={rootRef} className="hw-grid">
      <div className="hw-sticky">
        <figure className="hw-media">
          <Image
            src="/images/hardware-lineup.jpg"
            alt="Linha de hardware proprietário Kairova: Wallbox Pro 22kW, estação ultrarrápida FastHub 120kW e controlador GridGuard montados em concreto e aço"
            width={1792}
            height={1024}
            sizes="(max-width: 900px) 100vw, 52vw"
            className="hw-media__img"
          />
          <div className="media-scrim" aria-hidden="true" />
        </figure>
        <div className="hw-hud" aria-live="polite">
          <div className="hw-hud__row">
            <span className="mono-tag">{current.code}</span>
            <span className="hw-hud__power mono-num">{current.power}</span>
          </div>
          <p className="hw-hud__meta">
            {current.protection} · {current.connectivity}
          </p>
        </div>
      </div>

      <div className="hw-chapters">
        {hardwareLineup.map((item, idx) => {
          const isCurrent = idx === activeIdx;
          return (
            <article
              key={item.id}
              id={item.id}
              data-hw-chapter
              className={`hw-card${isCurrent ? ' is-current' : ''}`}
            >
              <div className="hw-card__top">
                <span className="mono-tag">{item.code}</span>
                <span className="hw-card__led" aria-hidden="true" />
              </div>
              <h3 className="hw-card__title">{item.name}</h3>
              <p className="hw-card__cat">{item.category}</p>
              <p className="hw-card__summary">{item.summary}</p>
              <dl className="hw-specs">
                {item.specs.map((sp) => (
                  <div key={sp.label} className="hw-specs__row">
                    <dt>{sp.label}</dt>
                    <dd className="mono-num">{sp.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="hw-card__actions">
                <button
                  type="button"
                  className={`hw-select-btn${isCurrent ? ' is-current' : ''}`}
                  aria-pressed={isCurrent}
                  onClick={() => setActiveIdx(idx)}
                >
                  <span className="hw-select-btn__dot" aria-hidden="true" />
                  <span>{isCurrent ? 'Equipamento em foco no painel' : 'Destacar especificações no painel'}</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
