import { pathOf } from '@/components/iso/iso-kit';
import { PLANT_MAX_KW, PLANT_MIN_KW, type GridState } from './model';
import {
  AZIMUTH,
  BUSH_END,
  COIL_R,
  COIL_TURNS,
  DIAL,
  DIAL_R,
  DIAL_TOP,
  FRAME_X0,
  FRAME_X1,
  RIDER_MAX_X,
  RIDER_MIN_X,
  ROD_Y,
  ROD_Z,
  at,
  shiftX,
} from './view';

export interface GridFrame {
  coilsBack: string;
  coilsLeft: string;
  coilsRightBack: string;
  coilsRightFront: string;
  carriage: string;
  needle: string;
  rider: string;
}

const RADIANS = Math.PI / 180;
const SIN_A = Math.sin(AZIMUTH * RADIANS);
const COS_E = Math.cos(30 * RADIANS);
const SIN_E = Math.sin(30 * RADIANS);
const PER_TURN = 14;

function coil(from: number, to: number, y: number) {
  const count = COIL_TURNS * PER_TURN;
  const back: [number, number][][] = [];
  const front: [number, number][][] = [];
  let run: [number, number][] = [];
  let facing: boolean | null = null;
  for (let index = 0; index <= count; index++) {
    const share = index / count;
    const angle = share * COIL_TURNS * Math.PI * 2;
    const cy = Math.cos(angle);
    const cz = Math.sin(angle);
    const point = at([from + (to - from) * share, y + COIL_R * cy, ROD_Z + COIL_R * cz]);
    const near = cy * SIN_A * COS_E + cz * SIN_E > 0;
    if (facing === null) facing = near;
    if (near !== facing) {
      run.push(point);
      (facing ? front : back).push(run);
      run = [point];
      facing = near;
      continue;
    }
    run.push(point);
  }
  if (run.length > 1) (facing ? front : back).push(run);
  return {
    back: back.map((pts) => pathOf(pts)).join(''),
    front: front.map((pts) => pathOf(pts)).join(''),
  };
}

function needleOf(angle: number) {
  const ux = Math.sin(angle);
  const uy = -Math.cos(angle);
  const [cx, cy] = DIAL;
  const pt = (along: number, across: number) =>
    at([cx + ux * along - uy * across, cy + uy * along + ux * across, DIAL_TOP + 0.15]);
  return pathOf([pt(DIAL_R - 3.2, 0), pt(0, 0.8), pt(-3, 0.35), pt(-3, -0.35), pt(0, -0.8)], true);
}

export function frameOf(state: GridState): GridFrame {
  const shift = state.carriageOffset;
  const coils = [
    coil(FRAME_X0, -BUSH_END + shift, -ROD_Y),
    coil(FRAME_X0, -BUSH_END + shift, ROD_Y),
    coil(BUSH_END + shift, FRAME_X1, -ROD_Y),
    coil(BUSH_END + shift, FRAME_X1, ROD_Y),
  ];
  const ratio = (state.plantKw - PLANT_MIN_KW) / (PLANT_MAX_KW - PLANT_MIN_KW);
  const riderX = RIDER_MIN_X + ratio * (RIDER_MAX_X - RIDER_MIN_X);
  return {
    coilsBack: coils.map((c) => c.back).join(''),
    coilsLeft: coils[0]!.front + coils[1]!.front,
    coilsRightBack: coils[2]!.front,
    coilsRightFront: coils[3]!.front,
    carriage: shiftX(shift),
    needle: needleOf(state.needleAngleRad),
    rider: shiftX(riderX),
  };
}
