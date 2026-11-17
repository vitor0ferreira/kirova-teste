export interface GridState {
  plantKw: number;       // 110 .. 410 kW industrial plant load
  trafoLimitKw: number;  // 460 kW active capacity (500 kVA @ 0.92 FP)
  fleetAvailableKw: number;
  fasthubKw: number;     // allocated to FastHub 120kW DC bays
  wallboxKw: number;     // allocated to Wallbox Pro 22kW AC bays
  utilizationPct: number;
  carriageOffset: number; // -18 .. +18 world units
  needleAngleRad: number; // -2.1 .. +2.1 rad on dial gauge
  overloadRisk: boolean;
}

export const TRAFO_KVA = 500;
export const POWER_FACTOR = 0.92;
export const TRAFO_LIMIT_KW = Math.round(TRAFO_KVA * POWER_FACTOR); // 460 kW
export const PLANT_MIN_KW = 110;
export const PLANT_MAX_KW = 410;
export const PLANT_DEFAULT_KW = 220;

export function solveGrid(plantKw: number): GridState {
  const clamped = Math.min(PLANT_MAX_KW, Math.max(PLANT_MIN_KW, plantKw));
  const headroom = Math.max(40, TRAFO_LIMIT_KW - clamped);
  const fleetAvailableKw = Math.min(340, headroom);
  // Priority dispatch: FastHub 120kW DC bays take up to 240 kW, Wallbox Pro 22kW takes remaining headroom up to 88 kW
  const fasthubKw = Math.min(240, Math.round(fleetAvailableKw * 0.72));
  const wallboxKw = Math.min(88, Math.max(22, fleetAvailableKw - fasthubKw));
  const totalDemand = clamped + fasthubKw + wallboxKw;
  const utilizationPct = Math.min(96, Math.round((totalDemand / TRAFO_LIMIT_KW) * 100));

  // Normalize plant load 0..1 across [110..410]
  const ratio = (clamped - PLANT_MIN_KW) / (PLANT_MAX_KW - PLANT_MIN_KW);
  // Carriage shifts right (+18) as plant consumes more, compressing right springs to throttle fleet draw
  const carriageOffset = -18 + ratio * 36;
  const needleAngleRad = -1.9 + ratio * 3.8;
  const overloadRisk = clamped >= 350;

  return {
    plantKw: clamped,
    trafoLimitKw: TRAFO_LIMIT_KW,
    fleetAvailableKw,
    fasthubKw,
    wallboxKw,
    utilizationPct,
    carriageOffset,
    needleAngleRad,
    overloadRisk,
  };
}

export function formatGridReadout(state: GridState): string {
  return `PLANTA ${Math.round(state.plantKw)} kW · FROTA ${Math.round(state.fleetAvailableKw)} kW · TRAFO ${state.utilizationPct}%`;
}

export const RESTING_GRID_STATE = solveGrid(PLANT_DEFAULT_KW);
export const RESTING_GRID_READOUT = formatGridReadout(RESTING_GRID_STATE);
