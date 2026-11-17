'use client';

import * as React from 'react';
import { solveGrid, TRAFO_LIMIT_KW } from '@/components/figures/gridguard/model';
import { heroData } from '@/data/site';
import { setDriverLoad } from '@/motion/driver';

export function HeroSimulator() {
  const [selectedId, setSelectedId] = React.useState(heroData.presets[1]!.id);
  const activePreset = heroData.presets.find((p) => p.id === selectedId) ?? heroData.presets[1]!;
  const solved = solveGrid(activePreset.plantKw);

  const selectPreset = (id: string, kw: number) => {
    setSelectedId(id);
    setDriverLoad((kw - 110) / 300);
  };

  return (
    <div className="hero-sim" aria-label="Simulador de carga na subestação GridGuard">
      <div className="hero-sim__header">
        <span className="mono-tag">SIMULADOR DE BARRAMENTO · TRAFO 500 kVA ({TRAFO_LIMIT_KW} kW ATIVOS)</span>
        <span className="hero-sim__status" data-alert={solved.overloadRisk ? 'amber' : 'lime'}>
          <span className="led-bar-mini" aria-hidden="true" />
          <span>{solved.overloadRisk ? 'LIMITE PROTEGIDO' : 'DESPACHO NOMINAL'}</span>
        </span>
      </div>

      <div className="hero-sim__presets" role="group" aria-label="Cenários de consumo industrial">
        {heroData.presets.map((preset) => {
          const isActive = preset.id === selectedId;
          return (
            <button
              key={preset.id}
              type="button"
              className={`sim-btn${isActive ? ' is-active' : ''}`}
              aria-pressed={isActive}
              onClick={() => selectPreset(preset.id, preset.plantKw)}
            >
              <span className="sim-btn__led" aria-hidden="true" />
              <span className="sim-btn__label">{preset.label}</span>
            </button>
          );
        })}
      </div>

      <dl className="hero-sim__readout">
        <div className="sim-metric">
          <dt>Planta industrial</dt>
          <dd className="mono-num">{solved.plantKw}&nbsp;kW</dd>
        </div>
        <div className="sim-metric">
          <dt>Disponível p/ frota</dt>
          <dd className="mono-num sim-metric--accent">{solved.fleetAvailableKw}&nbsp;kW</dd>
        </div>
        <div className="sim-metric">
          <dt>FastHub 120kW DC</dt>
          <dd className="mono-num">{solved.fasthubKw}&nbsp;kW</dd>
        </div>
        <div className="sim-metric">
          <dt>Uso do trafo</dt>
          <dd className="mono-num">{solved.utilizationPct}%</dd>
        </div>
      </dl>

      <div className="hero-sim__bar" aria-hidden="true">
        <div
          className="hero-sim__fill-plant"
          style={{ width: `${Math.round((solved.plantKw / TRAFO_LIMIT_KW) * 100)}%` }}
        />
        <div
          className="hero-sim__fill-fleet"
          style={{ width: `${Math.round((solved.fleetAvailableKw / TRAFO_LIMIT_KW) * 100)}%` }}
        />
      </div>
      <p className="hero-sim__note">{activePreset.note}</p>
    </div>
  );
}
