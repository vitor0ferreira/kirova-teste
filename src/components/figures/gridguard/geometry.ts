import {
  circleRing,
  dotGrid,
  extrude,
  insetPlan,
  knurl,
  lineOnTop,
  onTop,
  pathOf,
  planOutline,
  radialTicks,
  ring,
  segment,
  sideArc,
  sideSeam,
  slabOf,
  topMatrix,
  topTicks,
  type Flat,
  type Plan,
  type Plane,
  type Point3,
} from '@/components/iso/iso-kit';
import {
  BAR,
  BAR_H,
  BASE,
  BASE_H,
  BUSH_D,
  BUSH_END,
  BUSH_W,
  CARRIAGE,
  CARRIAGE_H,
  CARRIAGE_Z,
  DIAL,
  DIAL_H,
  DIAL_R,
  DIAL_TOP,
  DIAL_Z,
  FASTHUB_PED,
  FOOT_H,
  FRAME_X0,
  FRAME_X1,
  FRAME_Y,
  MODULE_H,
  MODULE_Z,
  P,
  POST_L,
  POST_R,
  POST_W,
  RAIL_D,
  RAIL_H,
  RAIL_Y,
  RAIL_Z,
  ROD_HALF,
  ROD_Y,
  ROD_Z,
  TRAFO,
  TRAFO_H,
  WALLBOX_PED,
  at,
} from './view';

const solid = (plan: Plan, z: number, h: number, steps = 6, bevel = 0) => slabOf(plan, z, h, P, steps, bevel);
const cyl = (cx: number, cy: number, r: number, z: number, h: number, steps = 28, bevel = 0) =>
  extrude(circleRing(cx, cy, r, steps), z, h, P, { convex: true, bevel });
const join = (paths: string[]) => paths.join('');

function faceRing(x: number, cy: number, cz: number, r: number, steps = 16) {
  const points: Flat[] = [];
  for (let step = 0; step < steps; step++) {
    const angle = (step / steps) * Math.PI * 2;
    points.push(at([x, cy + r * Math.cos(angle), cz + r * Math.sin(angle)]));
  }
  return pathOf(points, true);
}

// 1. Base plate, 4 rubber feet, perimeter groove, screws, label plate & front ruler strip
const FEET: Plane[] = [
  [BASE.x + 22, BASE.y + 18],
  [BASE.x + BASE.w - 22, BASE.y + 18],
  [BASE.x + 22, BASE.y + BASE.d - 18],
  [BASE.x + BASE.w - 22, BASE.y + BASE.d - 18],
];

const BASE_SCREWS: Plane[] = [
  [BASE.x + 10, BASE.y + 10],
  [BASE.x + BASE.w - 10, BASE.y + 10],
  [BASE.x + 10, BASE.y + BASE.d - 10],
  [BASE.x + BASE.w - 10, BASE.y + BASE.d - 10],
];

const LABEL_PLATE: Plan = { x: BASE.x + 20, y: BASE.y + BASE.d - 22, w: 62, d: 12, r: 2 };
const RULER_STRIP: Plan = { x: -72, y: BASE.y + BASE.d - 18, w: 146, d: 7, r: 1 };
const RULER_TICKS = topTicks(RULER_STRIP.x + 5, RULER_STRIP.x + RULER_STRIP.w - 5, 4, 5, RULER_STRIP.y + 0.5, 0.7, [1.8, 3.4], P);

export const BASE_ART = {
  halo: solid(BASE, -BASE_H - FOOT_H, BASE_H).fill,
  feet: FEET.map(([x, y]) => [cyl(x, y, 7.5, -BASE_H - FOOT_H, 1.8), cyl(x, y, 5.8, -BASE_H - FOOT_H + 1.8, FOOT_H - 1.8)]),
  slab: solid(BASE, -BASE_H, BASE_H, 8, 1.6),
  groove: planOutline(insetPlan(BASE, 5), 0, P),
  screws: BASE_SCREWS.map(([x, y]) => at([x, y, 0])),
  screwRings: join(BASE_SCREWS.map(([x, y]) => ring(x, y, 2.3, 0, P, 16))),
  plate: solid(LABEL_PLATE, 0, 0.8, 4),
  plateLine: planOutline(insetPlan(LABEL_PLATE, 1.6), 0.8, P),
  plateScrews: [
    at([LABEL_PLATE.x + 4, LABEL_PLATE.y + LABEL_PLATE.d / 2, 0.8]),
    at([LABEL_PLATE.x + LABEL_PLATE.w - 4, LABEL_PLATE.y + LABEL_PLATE.d / 2, 0.8]),
  ],
  plateRule: join(
    [0, 1, 2].map((row) =>
      onTop(
        [
          [LABEL_PLATE.x + 9, LABEL_PLATE.y + 3.4 + row * 2.4],
          [LABEL_PLATE.x + (row === 1 ? 38 : 49), LABEL_PLATE.y + 3.4 + row * 2.4],
        ],
        0.8,
        P,
      ),
    ),
  ),
  ruler: solid(RULER_STRIP, 0, 0.7, 3),
  rulerMinor: RULER_TICKS.minor,
  rulerMajor: RULER_TICKS.major,
};

// 2. Calibration Rail & Demand Rider (back)
const POST_PLANS: Plan[] = [POST_L, POST_R].map((x) => ({ x, y: RAIL_Y - POST_W / 2, w: POST_W, d: POST_W, r: 2 }));
const RAIL: Plan = { x: POST_L - 4, y: RAIL_Y - RAIL_D / 2, w: POST_R + POST_W - POST_L + 8, d: RAIL_D, r: 2 };
const RAIL_FACE = RAIL_Y + RAIL_D / 2;
const RAIL_TOP = RAIL_Z + RAIL_H;
const RULE_FROM = POST_L + POST_W + 6;
const RULE_TO = POST_R - 6;

function railRule() {
  const minor: string[] = [];
  const major: string[] = [];
  for (let x = Math.ceil(RULE_FROM / 5) * 5; x <= RULE_TO; x += 5) {
    const big = x % 25 === 0;
    (big ? major : minor).push(segment([x, RAIL_FACE, RAIL_TOP - 1], [x, RAIL_FACE, RAIL_TOP - (big ? 4.4 : 2.6)], P));
  }
  return { minor: join(minor), major: join(major) };
}
const RAIL_TICKS = railRule();

export const RAIL_ART = {
  feet: POST_PLANS.map((plan) => solid(insetPlan(plan, -3), 0, 2, 4)),
  footScrews: POST_PLANS.flatMap((plan) => [at([plan.x - 1, plan.y + POST_W / 2, 2]), at([plan.x + POST_W + 1, plan.y + POST_W / 2, 2])]),
  posts: POST_PLANS.map((plan) => solid(plan, 2, RAIL_Z - 2, 4)),
  postLines: join(POST_PLANS.map((plan) => segment([plan.x + POST_W, plan.y + POST_W, 2], [plan.x + POST_W, plan.y + POST_W, RAIL_Z], P))),
  rail: solid(RAIL, RAIL_Z, RAIL_H, 4, 0.7),
  railScrews: POST_PLANS.map((plan) => at([plan.x + POST_W / 2, RAIL_Y, RAIL_TOP])),
  ruleBase: segment([RULE_FROM, RAIL_FACE, RAIL_TOP - 1], [RULE_TO, RAIL_FACE, RAIL_TOP - 1], P),
  ruleMinor: RAIL_TICKS.minor,
  ruleMajor: RAIL_TICKS.major,
  stops: [RULE_FROM - 2, RULE_TO + 2].map((x) => solid({ x: x - 1.5, y: RAIL_Y - RAIL_D / 2 - 0.5, w: 3, d: RAIL_D + 1, r: 0.8 }, RAIL_TOP, 2.2, 3)),
};

export const RIDER_ART = {
  body: solid({ x: -7, y: RAIL_Y - RAIL_D / 2 - 1.5, w: 14, d: RAIL_D + 3, r: 1.5 }, RAIL_TOP, 5, 4, 0.5),
  knob: cyl(0, RAIL_Y, 2.4, RAIL_TOP + 5, 2.8, 20),
  knobKnurl: knurl(0, RAIL_Y, 2.4, RAIL_TOP + 5, RAIL_TOP + 7.8, 16, P),
  tick: segment([0, RAIL_FACE + 1.5, RAIL_TOP + 4], [0, RAIL_FACE + 1.5, RAIL_TOP - 3.5], P),
};

// 3. 500 kVA Industrial Transformer (left-back) + feeder busbars into Frame
const TRAFO_FINS: Plan[] = [0, 1, 2, 3, 4].map((i) => ({
  x: TRAFO.x + 6 + i * 9.5,
  y: TRAFO.y + TRAFO.d,
  w: 4.5,
  d: 4.2,
  r: 1,
}));
const TRAFO_BUSHINGS_X = [TRAFO.x + 14, TRAFO.x + 27, TRAFO.x + 40];

export const TRAFO_ART = {
  pad: solid(insetPlan(TRAFO, -3), 0, 2.5, 4),
  body: solid(TRAFO, 2.5, TRAFO_H, 5, 1.2),
  seam: sideSeam(TRAFO, 26, P, 5),
  lid: solid(insetPlan(TRAFO, 2), 2.5 + TRAFO_H, 2.4, 4, 0.6),
  fins: TRAFO_FINS.map((f) => solid(f, 5, TRAFO_H - 6, 3, 0.4)),
  bushings: TRAFO_BUSHINGS_X.flatMap((bx) => [
    cyl(bx, TRAFO.y + 18, 4, 2.5 + TRAFO_H + 2.4, 4, 20),
    cyl(bx, TRAFO.y + 18, 2.6, 2.5 + TRAFO_H + 6.4, 7, 18),
    cyl(bx, TRAFO.y + 18, 1.4, 2.5 + TRAFO_H + 13.4, 3, 16),
  ]),
  bushingRings: join(
    TRAFO_BUSHINGS_X.flatMap((bx) => [
      sideArc(bx, TRAFO.y + 18, 2.6, 2.5 + TRAFO_H + 8.6, P, 16),
      sideArc(bx, TRAFO.y + 18, 2.6, 2.5 + TRAFO_H + 11.2, P, 16),
    ]),
  ),
  feeders: [-14, 14].map((y) =>
    solid({ x: TRAFO.x + TRAFO.w, y: y - 2, w: FRAME_X0 - BAR - (TRAFO.x + TRAFO.w), d: 4, r: 1 }, 4, 3.2, 3),
  ),
  feederFlanges: [-14, 14].map((y) => solid({ x: TRAFO.x + TRAFO.w, y: y - 3.5, w: 3, d: 7, r: 1 }, 2.6, 6, 3)),
  label: topMatrix([TRAFO.x + 12, TRAFO.y + 38], 2.5 + TRAFO_H + 2.4, P, 'x'),
};

// 4. Busbar Frame & Guide Rods (center)
const BARS: Plan[] = [
  { x: FRAME_X0 - BAR, y: -FRAME_Y - BAR, w: FRAME_X1 - FRAME_X0 + BAR * 2, d: BAR, r: 1.4 },
  { x: FRAME_X0 - BAR, y: -FRAME_Y, w: BAR, d: FRAME_Y * 2, r: 0.6 },
  { x: FRAME_X1, y: -FRAME_Y, w: BAR, d: FRAME_Y * 2, r: 0.6 },
  { x: FRAME_X0 - BAR, y: FRAME_Y, w: FRAME_X1 - FRAME_X0 + BAR * 2, d: BAR, r: 1.4 },
];
const FLOOR_PLAN: Plan = { x: FRAME_X0, y: -FRAME_Y, w: FRAME_X1 - FRAME_X0, d: FRAME_Y * 2, r: 0 };

function floorGrid() {
  const lines: string[] = [];
  for (let x = FRAME_X0 + 10; x < FRAME_X1; x += 10) lines.push(onTop([[x, -FRAME_Y], [x, FRAME_Y]], 0.8, P));
  for (let y = -FRAME_Y + 8; y < FRAME_Y; y += 8) lines.push(onTop([[FRAME_X0, y], [FRAME_X1, y]], 0.8, P));
  return join(lines);
}

const FRAME_TICKS = topTicks(-32, 32, 4, 4, FRAME_Y + 1, BAR_H, [1.6, 3.0], P);

export const FRAME_ART = {
  back: solid(BARS[0]!, 0, BAR_H, 4, 0.7),
  left: solid(BARS[1]!, 0, BAR_H, 3, 0.7),
  right: solid(BARS[2]!, 0, BAR_H, 3, 0.7),
  front: solid(BARS[3]!, 0, BAR_H, 4, 0.7),
  floor: solid(FLOOR_PLAN, 0, 0.8, 2),
  grid: floorGrid(),
  ticksMinor: FRAME_TICKS.minor,
  ticksMajor: FRAME_TICKS.major,
  zero: onTop([[3, FRAME_Y + 0.5], [3, FRAME_Y + BAR - 0.5]], BAR_H, P),
  leftBores: join([-ROD_Y, ROD_Y].map((y) => faceRing(FRAME_X0, y, ROD_Z, 2.6, 14))),
  rightBores: join([-ROD_Y, ROD_Y].map((y) => faceRing(FRAME_X1 + BAR, y, ROD_Z, 2.6, 14))),
  rightNuts: [-ROD_Y, ROD_Y].map((y) => at([FRAME_X1 + BAR, y, ROD_Z])),
};

export const RODS = [-ROD_Y, ROD_Y].map((y) =>
  solid({ x: FRAME_X0, y: y - ROD_HALF, w: FRAME_X1 - FRAME_X0, d: ROD_HALF * 2, r: ROD_HALF - 0.2 }, ROD_Z - ROD_HALF, ROD_HALF * 2, 3),
);

// 5. GridGuard Dynamic Load Management Carriage (the lit moving subject)
const BUSHES: Plan[] = [-1, 1].flatMap((side) =>
  [-ROD_Y, ROD_Y].map((y) => ({
    x: side < 0 ? -BUSH_END : BUSH_END - BUSH_W,
    y: y - BUSH_D / 2,
    w: BUSH_W,
    d: BUSH_D,
    r: 1.6,
  })),
);
const MODULE_PLAN: Plan = { x: -18, y: -13, w: 36, d: 26, r: 2.5 };

export const CARRIAGE_ART = {
  halo: solid(insetPlan(CARRIAGE, 2), 0.8, 0.1).fill,
  plate: solid(CARRIAGE, CARRIAGE_Z, CARRIAGE_H, 5, 0.7),
  bushes: BUSHES.map((plan) => solid(plan, CARRIAGE_Z - 1, CARRIAGE_H + 3, 3, 0.5)),
  bushScrews: BUSHES.flatMap((plan) => [
    at([plan.x + 2.5, plan.y + plan.d / 2, CARRIAGE_Z + CARRIAGE_H + 2]),
    at([plan.x + plan.w - 2.5, plan.y + plan.d / 2, CARRIAGE_Z + CARRIAGE_H + 2]),
  ]),
  module: solid(MODULE_PLAN, MODULE_Z, MODULE_H, 5, 1.0),
  moduleSeam: sideSeam(MODULE_PLAN, MODULE_Z + 4, P, 5),
  moduleRim: planOutline(insetPlan(MODULE_PLAN, 2.5), MODULE_Z + MODULE_H, P, 4),
  moduleLed: solid({ x: -12, y: MODULE_PLAN.y + MODULE_PLAN.d - 2, w: 24, d: 2.4, r: 0.6 }, MODULE_Z + 2.5, 2.5, 2),
  moduleDots: dotGrid(MODULE_PLAN.x + 7, MODULE_PLAN.y + 7, 5, 2, 5.2, MODULE_Z + MODULE_H, P),
};

export const PLUNGER_ART = {
  rod: solid({ x: BUSH_END, y: -1, w: 34, d: 2, r: 0.8 }, ROD_Z - 1, 2, 3),
  collar: solid({ x: BUSH_END + 0.5, y: -2, w: 2.4, d: 4, r: 0.8 }, ROD_Z - 2, 4, 3, 0.3),
};

// 6. Dial Gauge (back-right, connected via telemetry linkage)
const [DX, DY] = DIAL;
const DIAL_STAND: Plan = { x: DX - 14, y: DY - 14, w: 28, d: 28, r: 3 };
const DIAL_TICKS = radialTicks(DX, DY, DIAL_R - 2.2, 20, 5, DIAL_TOP, [1.4, 2.6], P);

export const DIAL_ART = {
  conduit: solid({ x: FRAME_X1 + BAR, y: DY - 1.8, w: DX - DIAL_R - (FRAME_X1 + BAR) + 2, d: 3.6, r: 1 }, DIAL_Z, 3, 3),
  stand: solid(DIAL_STAND, 0, DIAL_Z, 4, 0.5),
  standScrews: [
    at([DIAL_STAND.x + 3.2, DIAL_STAND.y + 3.2, DIAL_Z]),
    at([DIAL_STAND.x + DIAL_STAND.w - 3.2, DIAL_STAND.y + 3.2, DIAL_Z]),
    at([DIAL_STAND.x + 3.2, DIAL_STAND.y + DIAL_STAND.d - 3.2, DIAL_Z]),
    at([DIAL_STAND.x + DIAL_STAND.w - 3.2, DIAL_STAND.y + DIAL_STAND.d - 3.2, DIAL_Z]),
  ],
  puck: cyl(DX, DY, DIAL_R, DIAL_Z, DIAL_H, 48),
  knurl: knurl(DX, DY, DIAL_R, DIAL_Z + DIAL_H - 2.8, DIAL_Z + DIAL_H, 48, P),
  band: sideArc(DX, DY, DIAL_R, DIAL_Z + DIAL_H - 2.8, P, 32),
  bezel: ring(DX, DY, DIAL_R - 1, DIAL_TOP, P, 48),
  face: ring(DX, DY, DIAL_R - 2.2, DIAL_TOP, P, 48),
  minor: DIAL_TICKS.minor,
  major: DIAL_TICKS.major,
  label: topMatrix([DX, DY + 5], DIAL_TOP, P, 'x'),
  crown: solid({ x: DX + DIAL_R - 0.6, y: -2 + DY, w: 4, d: 4, r: 1 }, DIAL_Z + 2, 3.6, 3),
};

// 7. Fleet Chargers on Pedestals (front-right: FastHub 120kW DC & Wallbox Pro 22kW AC)
const FASTHUB_BODY: Plan = insetPlan(FASTHUB_PED, 3);
const WALLBOX_BODY: Plan = { x: WALLBOX_PED.x + 4, y: WALLBOX_PED.y + 3, w: 14, d: 10, r: 2 };

export const CHARGERS_ART = {
  // Floor busbar wires from GridGuard right face into chargers
  busbarFasthub: {
    from: at([FRAME_X1 + BAR, 8, 2]),
    via: [at([94, 8, 2]), at([94, 20, 2])],
    to: at([FASTHUB_PED.x, 20, 2]),
  },
  busbarWallbox: {
    from: at([FRAME_X1 + BAR, 20, 2]),
    via: [at([76, 45, 2])],
    to: at([WALLBOX_PED.x, 45, 2]),
  },
  fasthubPed: solid(FASTHUB_PED, 0, 3, 4, 0.4),
  fasthubBody: solid(FASTHUB_BODY, 3, 42, 5, 1.0),
  fasthubSeam: sideSeam(FASTHUB_BODY, 28, P, 5),
  fasthubCap: solid(insetPlan(FASTHUB_BODY, 1.5), 45, 3, 4, 0.5),
  fasthubLed: solid({ x: FASTHUB_BODY.x + 8, y: FASTHUB_BODY.y + FASTHUB_BODY.d - 0.5, w: 8, d: 1.6, r: 0.4 }, 14, 22, 2),
  fasthubDots: dotGrid(FASTHUB_BODY.x + 6, FASTHUB_BODY.y + 6, 3, 2, 5.2, 48, P),
  wallboxPed: solid(WALLBOX_PED, 0, 2.5, 4, 0.4),
  wallboxPost: solid({ x: WALLBOX_PED.x + 8, y: WALLBOX_PED.y + 5, w: 6, d: 6, r: 1.2 }, 2.5, 17, 3),
  wallboxBody: solid(WALLBOX_BODY, 19.5, 14, 4, 0.8),
  wallboxSeam: sideSeam(WALLBOX_BODY, 27, P, 4),
  wallboxLed: solid({ x: WALLBOX_BODY.x + 3.5, y: WALLBOX_BODY.y + WALLBOX_BODY.d - 0.4, w: 7, d: 1.2, r: 0.3 }, 23, 7, 2),
  wallboxDots: dotGrid(WALLBOX_BODY.x + 4, WALLBOX_BODY.y + 3.5, 2, 1, 5.5, 33.5, P),
};
