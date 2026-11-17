import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { NocPulseStrip } from '@/components/NocPulseStrip';
import { companyStory, site } from '@/data/site';

export const metadata: Metadata = {
  title: 'História, Cultura e Engenharia',
  description:
    'Fundada em 2021 em Uberaba, MG, a Kirova combina engenharia elétrica de potência, desenvolvimento IoT e operações presenciais em 9 estados.',
};

export default function SobrePage() {
  return (
    <div data-page-theme="light">
      <div className="page-shell">
        <div className="container">
          <section className="sobre-hero">
            <div className="sobre-hero__left">
              <span className="mono-tag">DESDE 2021 · TRIÂNGULO MINEIRO</span>
              <h1 data-split="lines" data-intro>
                Engenharia nacional nascida no galpão de Uberaba para operar frotas sem pausas.
              </h1>
              <p data-reveal="fade" data-intro>
                {companyStory.intro}
              </p>
              <p style={{ color: 'var(--c-muted)' }}>{companyStory.origin}</p>
              <p style={{ color: 'var(--c-muted)' }}>{companyStory.etymology}</p>
            </div>

            <div className="sobre-hero__right">
              <figure className="sobre-lab-figure" data-gl data-gl-instant>
                <Image
                  src={companyStory.labImage.src}
                  alt={companyStory.labImage.alt}
                  width={1792}
                  height={1024}
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </figure>
              <div style={{ marginTop: '1.25rem', display: 'grid', gap: '1rem' }}>
                <div>
                  <span className="mono-tag">SEDE TÉCNICA E NOC 24/7</span>
                  <p style={{ marginTop: '0.35rem', fontSize: 'var(--t-s)', color: 'var(--c-muted)' }}>
                    {site.location.address}, {site.location.city}. Atuação em {site.statesCount} estados brasileiros com {site.employees} colaboradores diretos.
                  </p>
                </div>
                <NocPulseStrip variant="light" />
              </div>
            </div>
          </section>

          <section aria-labelledby="fundadores-title" className="sobre-ledger-sec">
            <span className="mono-tag">FUNDAÇÃO E LIDERANÇA TÉCNICA</span>
            <h2 id="fundadores-title" style={{ fontSize: 'var(--t-xl)', marginTop: '0.5rem' }}>
              Três disciplinas na mesma bancada
            </h2>
            <div className="founders-ledger">
              {companyStory.founders.map((f, i) => (
                <article key={f.name} className="founder-entry">
                  <span className="mono-tag">0{i + 1} · {f.role}</span>
                  <h3>{f.name}</h3>
                  <p>{f.bio}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <section
          aria-labelledby="diretrizes-title"
          className="band-dark-solid sobre-gov-band"
          data-chapter-theme="dark"
        >
          <div className="container">
            <span className="mono-tag" style={{ color: '#32e875' }}>
              GOVERNANÇA E DIRECIONAMENTO
            </span>
            <h2 id="diretrizes-title" style={{ fontSize: 'var(--t-xl)', marginTop: '0.5rem' }}>
              Propósito, missão e visão 2030
            </h2>
            <div className="gov-columns">
              <article className="gov-col">
                <span className="mono-tag">PROPÓSITO</span>
                <h3>Autonomia produtiva</h3>
                <p>{companyStory.purpose}</p>
              </article>
              <article className="gov-col">
                <span className="mono-tag">MISSÃO</span>
                <h3>Superar o diesel em confiabilidade</h3>
                <p>{companyStory.mission}</p>
              </article>
              <article className="gov-col">
                <span className="mono-tag">VISÃO 2030</span>
                <h3>Escala latino-americana</h3>
                <p>{companyStory.vision2030}</p>
              </article>
            </div>
          </div>
        </section>

        <div className="container">
          <section aria-labelledby="rituais-title" className="sobre-rituals-sec">
            <span className="mono-tag">RITUAIS DE CULTURA E MODELO DE TRABALHO</span>
            <h2 id="rituais-title" style={{ fontSize: 'var(--t-xl)', marginTop: '0.5rem' }}>
              Como nossas equipes trabalham em Uberaba e em campo
            </h2>
            <div className="rituals-ledger">
              {companyStory.rituals.map((r, i) => (
                <article key={r.name} className="ritual-row">
                  <span className="ritual-row__code mono-num">R-0{i + 1}</span>
                  <h3>{r.name}</h3>
                  <p>{r.detail}</p>
                </article>
              ))}
            </div>

            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/#hardware" className="btn btn--primary" data-fill>
                <span className="btn__fill" aria-hidden="true" />
                <span className="btn__text">Explorar portfólio de hardware</span>
              </Link>
              <a href="#viabilidade" className="btn" data-fill>
                <span className="btn__fill" aria-hidden="true" />
                <span className="btn__text">Solicitar estudo de viabilidade</span>
              </a>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
