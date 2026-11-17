'use client';

import * as React from 'react';
import { IsoFigure } from '@/components/iso/react/draw';
import { asksForStillness, spring, useLoop, useReadout, type Spring } from '@/components/iso/react/live';
import { frameOf, type GridFrame } from './frame';
import {
  PLANT_DEFAULT_KW,
  PLANT_MAX_KW,
  PLANT_MIN_KW,
  RESTING_GRID_READOUT,
  RESTING_GRID_STATE,
  formatGridReadout,
  solveGrid,
} from './model';
import { EX, HEIGHT, WIDTH } from './view';

interface Props {
  label: string;
  base: React.ReactNode;
  rail: React.ReactNode;
  rider: React.ReactNode;
  trafo: React.ReactNode;
  frameBack: React.ReactNode;
  rods: React.ReactNode;
  carriage: React.ReactNode;
  plunger: React.ReactNode;
  frameFront: React.ReactNode;
  dial: React.ReactNode;
  chargers: React.ReactNode;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function GridGuardLive(props: Props) {
  const { anchor, say } = useReadout<HTMLDivElement>();
  const root = React.useRef<HTMLDivElement | null>(null);
  const carriageRef = React.useRef<SVGGElement | null>(null);
  const plungerRef = React.useRef<SVGGElement | null>(null);
  const riderRef = React.useRef<SVGGElement | null>(null);
  const needleRef = React.useRef<SVGPathElement | null>(null);
  const coilsBackRef = React.useRef<SVGPathElement | null>(null);
  const coilsLeftRef = React.useRef<SVGPathElement | null>(null);
  const coilsRightBackRef = React.useRef<SVGPathElement | null>(null);
  const coilsRightFrontRef = React.useRef<SVGPathElement | null>(null);

  const loadSpring = React.useRef<Spring>({ at: PLANT_DEFAULT_KW, rate: 0 });
  const targetLoad = React.useRef<number>(PLANT_DEFAULT_KW);
  const clock = React.useRef(0);
  const userEngaged = React.useRef(false);
  const dragging = React.useRef(false);
  const [visible, setVisible] = React.useState(false);

  const rest = React.useMemo(() => frameOf(RESTING_GRID_STATE), []);

  const paint = React.useCallback(
    (frame: GridFrame, kw: number) => {
      carriageRef.current?.setAttribute('transform', frame.carriage);
      plungerRef.current?.setAttribute('transform', frame.carriage);
      riderRef.current?.setAttribute('transform', frame.rider);
      needleRef.current?.setAttribute('d', frame.needle);
      coilsBackRef.current?.setAttribute('d', frame.coilsBack);
      coilsLeftRef.current?.setAttribute('d', frame.coilsLeft);
      coilsRightBackRef.current?.setAttribute('d', frame.coilsRightBack);
      coilsRightFrontRef.current?.setAttribute('d', frame.coilsRightFront);

      const solved = solveGrid(kw);
      say(formatGridReadout(solved));
      const node = root.current;
      if (node) {
        const rounded = `${Math.round(solved.plantKw)}`;
        if (node.getAttribute('aria-valuenow') !== rounded) {
          node.setAttribute('aria-valuenow', rounded);
        }
        const text = `Planta industrial consumindo ${Math.round(solved.plantKw)} kW, liberando ${Math.round(solved.fleetAvailableKw)} kW para a frota elétrica (${solved.utilizationPct}% do transformador)`;
        if (node.getAttribute('aria-valuetext') !== text) {
          node.setAttribute('aria-valuetext', text);
        }
      }
    },
    [say],
  );

  const running = visible && !asksForStillness();

  const kick = useLoop((dt, calm) => {
    if (!userEngaged.current && !calm) {
      clock.current += dt;
      // Calm sinusoidal factory load cycle between 145 kW and 345 kW
      const wave = 0.5 + 0.5 * Math.sin(clock.current * 0.72 - Math.PI / 2);
      targetLoad.current = 145 + wave * 200;
    }
    const done = spring(loadSpring.current, targetLoad.current, dt, 180, 22, calm);
    const frame = frameOf(solveGrid(loadSpring.current.at));
    paint(frame, loadSpring.current.at);
    return !userEngaged.current || !done;
  }, running);

  React.useEffect(() => {
    const node = root.current;
    if (!node) return;
    const io = new IntersectionObserver((entries) => {
      setVisible(Boolean(entries.at(-1)?.isIntersecting));
    });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const kwFromPointer = (clientX: number) => {
    const svg = root.current?.querySelector('svg');
    const box = svg?.getBoundingClientRect();
    if (!box || !box.width) return null;
    const norm = clamp((clientX - box.left) / box.width, 0.1, 0.9);
    const t = (norm - 0.1) / 0.8;
    return PLANT_MIN_KW + t * (PLANT_MAX_KW - PLANT_MIN_KW);
  };

  const applyTarget = (kw: number) => {
    userEngaged.current = true;
    targetLoad.current = clamp(kw, PLANT_MIN_KW, PLANT_MAX_KW);
    if (asksForStillness()) {
      loadSpring.current.at = targetLoad.current;
      loadSpring.current.rate = 0;
      paint(frameOf(solveGrid(targetLoad.current)), targetLoad.current);
    } else {
      kick();
    }
  };

  const resumeIdle = () => {
    window.setTimeout(() => {
      if (!dragging.current) {
        userEngaged.current = false;
        kick();
      }
    }, 3200);
  };

  return (
    <div
      ref={(node) => {
        root.current = node;
        anchor.current = node;
      }}
      className="gg"
      role="slider"
      tabIndex={0}
      aria-label="Simulador isométrico GridGuard DLM: arraste ou use as setas para ajustar o consumo da planta industrial entre 110 e 410 kW"
      aria-valuemin={PLANT_MIN_KW}
      aria-valuemax={PLANT_MAX_KW}
      aria-valuenow={PLANT_DEFAULT_KW}
      aria-valuetext={RESTING_GRID_READOUT}
      onPointerDown={(e) => {
        const kw = kwFromPointer(e.clientX);
        if (kw === null) return;
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        applyTarget(kw);
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return;
        const kw = kwFromPointer(e.clientX);
        if (kw !== null) applyTarget(kw);
      }}
      onPointerUp={(e) => {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
        dragging.current = false;
        resumeIdle();
      }}
      onPointerCancel={() => {
        dragging.current = false;
        resumeIdle();
      }}
      onKeyDown={(e) => {
        const stepKw = e.shiftKey ? 45 : 20;
        let next: number | null = null;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = targetLoad.current - stepKw;
        else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = targetLoad.current + stepKw;
        else if (e.key === 'Home') next = PLANT_MIN_KW;
        else if (e.key === 'End') next = PLANT_MAX_KW;
        if (next === null) return;
        e.preventDefault();
        applyTarget(next);
      }}
    >
      <IsoFigure width={WIDTH} height={HEIGHT} label={props.label}>
        {props.base}
        <g>
          {props.rail}
          <g ref={riderRef} transform={rest.rider}>
            {props.rider}
          </g>
        </g>
        {props.trafo}
        {props.frameBack}
        <g>
          <path ref={coilsBackRef} className="iso-line gg-coil" data-tone="lo" d={rest.coilsBack} />
          {props.rods}
          <path ref={coilsLeftRef} className="iso-line gg-coil" data-tone="mid" d={rest.coilsLeft} />
          <g ref={carriageRef} transform={rest.carriage}>
            {props.carriage}
          </g>
        </g>
        <g>
          <path ref={coilsRightBackRef} className="iso-line gg-coil" data-tone="mid" d={rest.coilsRightBack} />
        </g>
        <g ref={plungerRef} transform={rest.carriage}>
          {props.plunger}
        </g>
        <g>
          <path ref={coilsRightFrontRef} className="iso-line gg-coil" data-tone="mid" d={rest.coilsRightFront} />
        </g>
        {props.frameFront}
        <g>
          {props.dial}
          <path ref={needleRef} className="iso-line gg-needle" data-tone="lit" d={rest.needle} />
        </g>
        {props.chargers}
      </IsoFigure>
    </div>
  );
}

// Keep unused EX ref cleanly avoided if unused
void EX;
