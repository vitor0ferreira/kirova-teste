import { iso, type Flat, type Plan, type Point3, type Projection } from '@/components/iso/iso-kit';

export const WIDTH = 640;
export const HEIGHT = 360;
const PAD = 28;
export const AZIMUTH = 52;

export const BASE: Plan = { x: -165, y: -88, w: 330, d: 176, r: 9 };
export const BASE_H = 10;
export const FOOT_H = 5;

// Overhead calibration rail at back
export const RAIL_Y = -72;
export const RAIL_D = 7;
export const RAIL_Z = 48;
export const RAIL_H = 7;
export const POST_L = -142;
export const POST_R = 114;
export const POST_W = 11;
export const RIDER_MIN_X = -110;
export const RIDER_MAX_X = 92;

// 500 kVA Industrial Transformer (left-back)
export const TRAFO: Plan = { x: -146, y: -42, w: 54, d: 62, r: 4 };
export const TRAFO_H = 42;

// Dynamic Load Management Busbar Frame (center)
export const FRAME_X0 = -62;
export const FRAME_X1 = 68;
export const FRAME_Y = 26;
export const BAR = 7;
export const BAR_H = 10;

export const ROD_Y = 14;
export const ROD_Z = 5;
export const ROD_HALF = 1.8;
export const COIL_R = 3.8;
export const COIL_TURNS = 6;

// GridGuard Carriage centered at x = 0
export const CARRIAGE: Plan = { x: -23, y: -19, w: 46, d: 38, r: 3 };
export const CARRIAGE_Z = 3;
export const CARRIAGE_H = 4;
export const BUSH_END = 27;
export const BUSH_W = 10;
export const BUSH_D = 9;
export const MODULE_Z = CARRIAGE_Z + CARRIAGE_H;
export const MODULE_H = 8;

// Dial gauge (back-right)
export const DIAL: Flat = [118, -42];
export const DIAL_R = 14;
export const DIAL_Z = 3;
export const DIAL_H = 8;
export const DIAL_TOP = DIAL_Z + DIAL_H;

// Fleet Chargers (front-right)
export const WALLBOX_PED: Plan = { x: 84, y: 36, w: 22, d: 18, r: 2 };
export const FASTHUB_PED: Plan = { x: 118, y: 8, w: 30, d: 24, r: 2.5 };

function fit(points: Point3[]): Projection {
  const unit: Projection = { origin: [0, 0], scale: 1, azimuth: AZIMUTH };
  const flat = points.map((point) => iso(point, unit));
  const xs = flat.map(([x]) => x);
  const ys = flat.map(([, y]) => y);
  const left = Math.min(...xs);
  const right = Math.max(...xs);
  const up = Math.min(...ys);
  const down = Math.max(...ys);
  const scale = Math.min((WIDTH - PAD * 2) / (right - left), (HEIGHT - PAD * 2) / (down - up));
  return {
    origin: [widthCenter(left, right, scale), heightCenter(up, down, scale)],
    scale,
    azimuth: AZIMUTH,
  };
}

function widthCenter(left: number, right: number, scale: number) {
  return WIDTH / 2 - ((left + right) / 2) * scale;
}
function heightCenter(up: number, down: number, scale: number) {
  return HEIGHT / 2 - ((up + down) / 2) * scale;
}

const corners = ({ x, y, w, d }: Plan, z0: number, z1: number): Point3[] => {
  const out: Point3[] = [];
  for (const px of [x, x + w]) for (const py of [y, y + d]) for (const z of [z0, z1]) out.push([px, py, z]);
  return out;
};

export const P = fit([
  ...corners(BASE, -BASE_H - FOOT_H, 0),
  ...corners({ x: POST_L, y: RAIL_Y - RAIL_D / 2, w: POST_R + POST_W - POST_L, d: RAIL_D, r: 0 }, RAIL_Z, RAIL_Z + RAIL_H + 8),
  ...corners(FASTHUB_PED, 0, 52),
]);

export const at = (point: Point3) => iso(point, P);

const ORIGIN = at([0, 0, 0]);
const minus = (a: Flat, b: Flat): Flat => [a[0] - b[0], a[1] - b[1]];
export const EX = minus(at([1, 0, 0]), ORIGIN);
export const EZ = minus(at([0, 0, 1]), ORIGIN);

const fine = (value: number) => Math.round(value * 100) / 100;
export const shiftX = (x: number) => `translate(${fine(EX[0] * x)} ${fine(EX[1] * x)})`;
