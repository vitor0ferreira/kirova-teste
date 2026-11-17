'use client';

import * as React from 'react';
import { site } from '@/data/site';

type FormState = {
  name: string;
  company: string;
  profile: string;
  utility: string;
  vehicles: string;
  email: string;
};

export function ViabilityForm() {
  const [form, setForm] = React.useState<FormState>({
    name: '',
    company: '',
    profile: 'Frota urbana e distribuição',
    utility: 'CEMIG',
    vehicles: '12',
    email: '',
  });
  const [submitted, setSubmitted] = React.useState(false);

  const count = Math.max(1, parseInt(form.vehicles || '1', 10) || 1);
  const recommendedFastHub = Math.max(1, Math.ceil(count / 8));
  const recommendedWallbox = Math.max(2, Math.ceil(count * 0.6));
  const estimatedKva = Math.round(recommendedFastHub * 120 + recommendedWallbox * 18);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="viability-box">
      {submitted ? (
        <div className="viability-done" role="status" aria-live="polite">
          <span className="mono-tag">PRÉ-DIMENSIONAMENTO REGISTRADO</span>
          <h3>Protocolo preliminar de engenharia gerado para {form.company || form.name}.</h3>
          <p>
            Para {count} veículos na área de concessão {form.utility}, o arranjo inicial prevê{' '}
            <strong className="mono-num">{recommendedFastHub} FastHub 120kW</strong> e{' '}
            <strong className="mono-num">{recommendedWallbox} Wallbox Pro 22kW</strong>, exigindo cerca de{' '}
            <strong className="mono-num">{estimatedKva} kVA</strong> com balanceamento GridGuard.
          </p>
          <p className="viability-done__note">
            Observação transparente: este formulário realiza uma estimativa local no navegador sem envio automático a servidor externo. Para formalizar seu laudo junto à {form.utility}, fale direto com a engenharia em Uberaba pelo{' '}
            <a className="link" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>{' '}
            ou telefone{' '}
            <a className="link nowrap" href={site.contact.phoneHref}>
              {site.contact.phone}
            </a>
            .
          </p>
          <button
            type="button"
            className="btn"
            data-fill
            onClick={() => setSubmitted(false)}
          >
            <span className="btn__fill" aria-hidden="true" />
            <span className="btn__text">Ajustar parâmetros do pátio</span>
          </button>
        </div>
      ) : (
        <form className="viability-form" onSubmit={onSubmit}>
          <div className="viability-form__head">
            <span className="mono-tag">LAUDO DE VIABILIDADE ELÉTRICA</span>
            <h3>Dimensione sua planta com nossa engenharia</h3>
          </div>

          <div className="viability-fields">
            <div className="field">
              <label htmlFor="v-name">Nome e cargo</label>
              <input
                id="v-name"
                name="name"
                type="text"
                required
                aria-label="Nome e cargo"
                placeholder="Ex.: Ricardo Almeida"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="field">
              <label htmlFor="v-company">Empresa e cidade</label>
              <input
                id="v-company"
                name="company"
                type="text"
                aria-label="Empresa e cidade"
                placeholder="Ex.: Logística Uberaba MG"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
            </div>

            <div className="field">
              <label htmlFor="v-email">E-mail corporativo</label>
              <input
                id="v-email"
                name="email"
                type="email"
                required
                aria-label="E-mail corporativo"
                placeholder="engenharia@empresa.com.br"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="field">
              <label htmlFor="v-profile">Perfil operacional</label>
              <select
                id="v-profile"
                name="profile"
                aria-label="Perfil operacional"
                value={form.profile}
                onChange={(e) => setForm({ ...form, profile: e.target.value })}
              >
                <option value="Frota urbana e distribuição">Frota urbana e distribuição</option>
                <option value="Indústria ou agroindústria">Indústria ou agroindústria</option>
                <option value="Condomínio logístico LEED">Condomínio logístico LEED</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="v-utility">Concessionária local</label>
              <select
                id="v-utility"
                name="utility"
                aria-label="Concessionária local"
                value={form.utility}
                onChange={(e) => setForm({ ...form, utility: e.target.value })}
              >
                <option value="CEMIG">CEMIG (MG)</option>
                <option value="CPFL">CPFL (SP / RS)</option>
                <option value="Enel">Enel (SP / RJ / CE)</option>
                <option value="Outra distribuidora">Outra distribuidora</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="v-vehicles">Veículos elétricos previstos</label>
              <input
                id="v-vehicles"
                name="vehicles"
                type="number"
                min={1}
                max={500}
                aria-label="Veículos elétricos previstos"
                value={form.vehicles}
                onChange={(e) => setForm({ ...form, vehicles: e.target.value })}
              />
            </div>
          </div>

          <div className="viability-preview">
            <span className="mono-tag">PRÉVIA ESTIMADA</span>
            <p className="mono-num">
              {recommendedFastHub} FastHub 120kW + {recommendedWallbox} Wallbox Pro 22kW · Demanda estimada {estimatedKva} kVA com GridGuard DLM
            </p>
          </div>

          <button type="submit" className="btn btn--primary" data-fill>
            <span className="btn__fill" aria-hidden="true" />
            <span className="btn__text">Calcular pré-dimensionamento e registrar consulta</span>
          </button>
        </form>
      )}
    </div>
  );
}
