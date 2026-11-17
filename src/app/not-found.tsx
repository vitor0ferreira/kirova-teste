import type { Metadata } from 'next';
import Link from 'next/link';
import { NocPulseStrip } from '@/components/NocPulseStrip';

export const metadata: Metadata = {
  title: '404 · Estação não localizada',
  description: 'Circuito aberto no barramento de rotas da Kairova. Retorne ao painel principal.',
};

export default function NotFound() {
  return (
    <div data-page-theme="dark" data-state="0" className="notfound-shell">
      <div className="container notfound-grid">
        <div className="notfound-panel">
          <span className="notfound-alert">NOC 24/7 · FALHA DE ROTEAMENTO · CIRCUITO ABERTO</span>
          <h1>Estação não localizada neste barramento.</h1>
          <p style={{ color: 'var(--c-muted)', maxWidth: '48ch' }}>
            O endereço solicitado não corresponde a nenhum ponto ativo na rede da Kairova. Nenhum transformador foi sobrecarregado durante esta leitura.
          </p>
          <div className="notfound-readout">
            STATUS 404 · TENSÃO DE BARRAMENTO 000 V · DISJUNTOR ABERTO
          </div>
          <div>
            <Link href="/" className="btn btn--primary" data-fill>
              <span className="btn__fill" aria-hidden="true" />
              <span className="btn__text">Rearmar circuito e voltar ao início</span>
            </Link>
          </div>
        </div>

        <aside className="notfound-diag" aria-label="Quadro de diagnóstico do barramento">
          <div className="notfound-diag__head">
            <span className="mono-tag">QUADRO DE DIAGNÓSTICO</span>
            <span className="console-badge">ROTA INATIVA</span>
          </div>
          <dl className="notfound-diag__list">
            <div>
              <dt>Seccionadora</dt>
              <dd className="mono-num">CIRCUITO ABERTO</dd>
            </div>
            <div>
              <dt>Tensão medida</dt>
              <dd className="mono-num">000 V</dd>
            </div>
            <div>
              <dt>Potência ativa</dt>
              <dd className="mono-num">0,0 kW</dd>
            </div>
            <div>
              <dt>NOC Uberaba</dt>
              <dd className="mono-num" style={{ color: '#32e875' }}>
                ONLINE · 9 ESTADOS
              </dd>
            </div>
          </dl>
          <p className="notfound-diag__note">
            O protocolo OCPP 2.0.1 manteve as demais estações da malha isoladas e estáveis durante este desvio de rota.
          </p>
          <NocPulseStrip variant="dark" />
        </aside>
      </div>
    </div>
  );
}
