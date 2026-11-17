import { Plate } from '@/components/iso/react/draw';
import { GridGuardArt } from './art';
import { RESTING_GRID_READOUT } from './model';
import './gridguard.css';

export function GridGuardFigure() {
  return (
    <div className="gridguard-wrap iso" data-theme="light">
      <Plate
        fig="FIG 01"
        title="Malha GridGuard DLM · 500 kVA"
        hint="Arraste ou use as setas para simular carga industrial"
        readout={RESTING_GRID_READOUT}
        keys={[
          { mark: 'lit', label: 'Módulo GridGuard e barras LED cinéticas' },
          { mark: 'raised', label: 'Transformador 500 kVA e estações de recarga' },
          { mark: 'dotted', label: 'Fluxo de potência ativa para frota' },
        ]}
        caption="Quando a fábrica eleva o consumo instantâneo, o controlador GridGuard comprime o despacho das estações FastHub 120 kW e Wallbox Pro 22 kW para impedir multa de ultrapassagem de demanda junto à concessionária."
      >
        <GridGuardArt />
      </Plate>
    </div>
  );
}
