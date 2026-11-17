import * as React from 'react';
import { Dots, FaceText, Line, Solid, Wire } from '@/components/iso/react/draw';
import {
  BASE_ART,
  CARRIAGE_ART,
  CHARGERS_ART,
  DIAL_ART,
  FRAME_ART,
  PLUNGER_ART,
  RAIL_ART,
  RIDER_ART,
  RODS,
  TRAFO_ART,
} from './geometry';
import { GridGuardLive } from './live';

const BASE = (
  <g key="base">
    <path className="iso-halo" d={BASE_ART.halo} />
    {BASE_ART.feet.map((parts, idx) => (
      <g key={idx}>
        {parts.map((paths, pIdx) => (
          <Solid key={pIdx} paths={paths} tone={pIdx ? 'mid' : 'lo'} crease="faint" />
        ))}
      </g>
    ))}
    <Solid paths={BASE_ART.slab} tone="mid" crease="faint" />
    <Line d={BASE_ART.groove} tone="lo" />
    <Line d={BASE_ART.screwRings} tone="lo" />
    <Dots points={BASE_ART.screws} size={0.5} tone="mid" />
    <Solid paths={BASE_ART.plate} tone="lo" crease="none" />
    <Line d={BASE_ART.plateLine} tone="faint" />
    <Line d={BASE_ART.plateRule} tone="lo" free />
    <Dots points={BASE_ART.plateScrews} size={0.45} tone="mid" />
    <Solid paths={BASE_ART.ruler} tone="lo" crease="none" />
    <Line d={BASE_ART.rulerMinor} tone="lo" />
    <Line d={BASE_ART.rulerMajor} tone="mid" />
  </g>
);

const RAIL = (
  <g key="rail">
    {RAIL_ART.feet.map((paths, idx) => (
      <Solid key={idx} paths={paths} tone="lo" crease="faint" />
    ))}
    <Dots points={RAIL_ART.footScrews} size={0.45} tone="mid" />
    {RAIL_ART.posts.map((paths, idx) => (
      <Solid key={idx} paths={paths} tone="mid" crease="faint" />
    ))}
    <Line d={RAIL_ART.postLines} tone="faint" />
    <Solid paths={RAIL_ART.rail} tone="mid" crease="faint" />
    <Line d={RAIL_ART.ruleBase} tone="faint" />
    <Line d={RAIL_ART.ruleMinor} tone="lo" />
    <Line d={RAIL_ART.ruleMajor} tone="mid" />
    <Dots points={RAIL_ART.railScrews} size={0.5} tone="mid" />
    {RAIL_ART.stops.map((paths, idx) => (
      <Solid key={idx} paths={paths} tone="mid" crease="faint" />
    ))}
  </g>
);

const RIDER = (
  <g key="rider">
    <Solid paths={RIDER_ART.body} tone="hi" crease="faint" />
    <Solid paths={RIDER_ART.knob} tone="mid" crease="faint" />
    <Line d={RIDER_ART.knobKnurl} tone="lo" />
    <Line d={RIDER_ART.tick} tone="lit" />
  </g>
);

const TRAFO = (
  <g key="trafo">
    <Solid paths={TRAFO_ART.pad} tone="lo" crease="faint" />
    <Solid paths={TRAFO_ART.body} tone="mid" crease="faint" inner={<Line d={TRAFO_ART.seam} tone="faint" />} />
    <Solid paths={TRAFO_ART.lid} tone="mid" crease="faint" />
    {TRAFO_ART.fins.map((paths, idx) => (
      <Solid key={idx} paths={paths} tone="lo" crease="faint" />
    ))}
    {TRAFO_ART.bushings.map((paths, idx) => (
      <Solid key={idx} paths={paths} tone="hi" crease="faint" />
    ))}
    <Line d={TRAFO_ART.bushingRings} tone="lo" />
    {TRAFO_ART.feeders.map((paths, idx) => (
      <Solid key={idx} paths={paths} tone="mid" crease="none" />
    ))}
    {TRAFO_ART.feederFlanges.map((paths, idx) => (
      <Solid key={idx} paths={paths} tone="lo" crease="faint" />
    ))}
    <FaceText transform={TRAFO_ART.label} size={2.7} tone="lo">
      500 kVA
    </FaceText>
  </g>
);

const FRAME_BACK = (
  <g key="frame-back">
    <Solid paths={FRAME_ART.back} tone="mid" crease="faint" />
    <Solid paths={FRAME_ART.left} tone="mid" crease="faint" />
    <Solid paths={FRAME_ART.floor} tone="lo" crease="none" flat />
    <Line d={FRAME_ART.grid} tone="faint" />
    <Line d={FRAME_ART.leftBores} tone="lo" />
  </g>
);

const RODS_ART = (
  <g key="rods">
    {RODS.map((paths, idx) => (
      <Solid key={idx} paths={paths} tone="mid" crease="none" />
    ))}
  </g>
);

const CARRIAGE = (
  <g key="carriage">
    <path className="iso-halo gg-shadow" d={CARRIAGE_ART.halo} />
    <Solid paths={CARRIAGE_ART.plate} tone="mid" crease="faint" />
    {CARRIAGE_ART.bushes.map((paths, idx) => (
      <Solid key={idx} paths={paths} tone="mid" crease="faint" />
    ))}
    <Dots points={CARRIAGE_ART.bushScrews} size={0.45} tone="mid" />
    <Solid paths={CARRIAGE_ART.module} tone="hi" crease="lo" lit inner={<Line d={CARRIAGE_ART.moduleSeam} tone="lo" />} />
    <Line d={CARRIAGE_ART.moduleRim} tone="lit" />
    <Solid paths={CARRIAGE_ART.moduleLed} tone="hi" crease="none" lit />
    <Dots points={CARRIAGE_ART.moduleDots} size={0.55} tone="hi" pulse />
  </g>
);

const PLUNGER = (
  <g key="plunger">
    <Solid paths={PLUNGER_ART.rod} tone="mid" crease="none" />
    <Solid paths={PLUNGER_ART.collar} tone="mid" crease="faint" />
  </g>
);

const FRAME_FRONT = (
  <g key="frame-front">
    <Solid paths={FRAME_ART.right} tone="mid" crease="faint" />
    <Line d={FRAME_ART.rightBores} tone="lo" />
    <Dots points={FRAME_ART.rightNuts} size={0.5} tone="mid" />
    <Solid paths={FRAME_ART.front} tone="mid" crease="faint" />
    <Line d={FRAME_ART.ticksMinor} tone="lo" />
    <Line d={FRAME_ART.ticksMajor} tone="mid" />
    <Line d={FRAME_ART.zero} tone="lit" />
  </g>
);

const DIAL = (
  <g key="dial">
    <Solid paths={DIAL_ART.conduit} tone="mid" crease="none" />
    <Solid paths={DIAL_ART.stand} tone="lo" crease="faint" />
    <Dots points={DIAL_ART.standScrews} size={0.45} tone="mid" />
    <Solid paths={DIAL_ART.puck} tone="hi" crease="faint" />
    <Line d={DIAL_ART.band} tone="faint" />
    <Line d={DIAL_ART.knurl} tone="lo" />
    <Line d={DIAL_ART.bezel} tone="lo" />
    <Line d={DIAL_ART.face} tone="faint" />
    <Line d={DIAL_ART.minor} tone="lo" />
    <Line d={DIAL_ART.major} tone="mid" />
    <FaceText transform={DIAL_ART.label} size={2.5} tone="lo" anchor="middle">
      %
    </FaceText>
    <Solid paths={DIAL_ART.crown} tone="mid" crease="faint" />
  </g>
);

const CHARGERS = (
  <g key="chargers">
    <Wire from={CHARGERS_ART.busbarFasthub.from} via={CHARGERS_ART.busbarFasthub.via} to={CHARGERS_ART.busbarFasthub.to} tone="lit" flow />
    <Wire from={CHARGERS_ART.busbarWallbox.from} via={CHARGERS_ART.busbarWallbox.via} to={CHARGERS_ART.busbarWallbox.to} tone="mid" />
    <Solid paths={CHARGERS_ART.fasthubPed} tone="lo" crease="faint" />
    <Solid paths={CHARGERS_ART.fasthubBody} tone="hi" crease="faint" inner={<Line d={CHARGERS_ART.fasthubSeam} tone="lo" />} />
    <Solid paths={CHARGERS_ART.fasthubCap} tone="mid" crease="faint" />
    <Solid paths={CHARGERS_ART.fasthubLed} tone="hi" crease="none" lit />
    <Dots points={CHARGERS_ART.fasthubDots} size={0.45} tone="hi" pulse />
    <Solid paths={CHARGERS_ART.wallboxPed} tone="lo" crease="faint" />
    <Solid paths={CHARGERS_ART.wallboxPost} tone="mid" crease="faint" />
    <Solid paths={CHARGERS_ART.wallboxBody} tone="hi" crease="faint" inner={<Line d={CHARGERS_ART.wallboxSeam} tone="lo" />} />
    <Solid paths={CHARGERS_ART.wallboxLed} tone="hi" crease="none" lit />
    <Dots points={CHARGERS_ART.wallboxDots} size={0.45} tone="hi" pulse />
  </g>
);

const LABEL =
  'Bancada isométrica do controlador Kirova GridGuard DLM. Um transformador industrial de 500 kVA alimenta o barramento central; o carro móvel desliza sobre guias entre molas helicoidais para redistribuir potência disponível às estações FastHub 120 kW e Wallbox Pro 22 kW sem ultrapassar a demanda contratada.';

export function GridGuardArt() {
  return (
    <GridGuardLive
      label={LABEL}
      base={BASE}
      rail={RAIL}
      rider={RIDER}
      trafo={TRAFO}
      frameBack={FRAME_BACK}
      rods={RODS_ART}
      carriage={CARRIAGE}
      plunger={PLUNGER}
      frameFront={FRAME_FRONT}
      dial={DIAL}
      chargers={CHARGERS}
    />
  );
}
