import Image from 'next/image';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { GridGuardFigure } from '@/components/figures/gridguard/figure';
import { HardwareChapters } from '@/components/HardwareChapters';
import { HeroSimulator } from '@/components/HeroSimulator';
import {
  caseStudies,
  companyStory,
  heroData,
  icpProfiles,
  keyStats,
  softwareModules,
  specializedServices,
} from '@/data/site';

export default function HomePage() {
  return (
    <div data-page-theme="dark">
      {/* 1. SPLIT-FRAME HERO */}
      <section className="hero-band" data-chapter-theme="dark">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="mono-tag hero-eyebrow" data-intro data-reveal="fade">
              {heroData.eyebrow}
            </span>
            <h1 className="hero-title" data-split="lines" data-intro>
              {heroData.headline}
            </h1>
            <p className="hero-lead" data-reveal="up" data-intro data-delay="0.15">
              {heroData.lead}
            </p>
            <div className="hero-actions" data-reveal="up" data-intro data-delay="0.25">
              <a href="#viabilidade" className="btn btn--primary" data-fill>
                <span className="btn__fill" aria-hidden="true" />
                <span className="btn__text">{heroData.ctaPrimary}</span>
              </a>
              <a href="#barramento" className="btn-ghost">
                {heroData.ctaSecondary}
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <figure className="hero-figure" data-gl data-gl-instant>
              <Image
                src={heroData.image.src}
                alt={heroData.image.alt}
                width={1792}
                height={1024}
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
              <div className="media-scrim" aria-hidden="true" />
            </figure>
            <HeroSimulator />
          </div>
        </div>
      </section>

      {/* 2. TABULAR DATA STRIP */}
      <section className="stats-band" data-chapter-theme="light" aria-label="Indicadores operacionais da Kairova">
        <div className="container stats-grid">
          {keyStats.map((stat) => (
            <div key={stat.label} className="stat-cell" data-reveal="up">
              <span className="stat-cell__value mono-num">{stat.value}</span>
              <span className="stat-cell__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ISOMETRIC ANATOMY EXPLAINER FIGURE */}
      <section id="barramento" className="anatomy-band" data-chapter-theme="light">
        <div className="container">
          <div className="section-head">
            <div className="section-head__main">
              <span className="mono-tag">BALANCEAMENTO DINÂMICO DE CARGA · DLM</span>
              <h2 data-split="lines">Como a Kairova protege o transformador sem travar a frota</h2>
            </div>
            <p className="section-head__side" data-reveal="fade">
              Operar vans e caminhões elétricos exige previsibilidade na entrada de energia. Quando a fábrica acelera o turno, o controlador físico GridGuard mede a corrente no barramento e ajusta em segundos a potência entregue às baias de recarga.
            </p>
          </div>

          <div className="anatomy-stage">
            <div className="anatomy-stage__figure" data-reveal="up">
              <GridGuardFigure />
            </div>
            <aside className="anatomy-stage__notes">
              <div className="tech-note">
                <span className="mono-tag">01 · LEITURA NA SUBESTAÇÃO</span>
                <h3>Transformador 500 kVA preservado</h3>
                <p>
                  Transformadores de corrente no quadro geral informam o consumo instantâneo da planta industrial em intervalos contínuos, sem intervenção manual.
                </p>
              </div>
              <div className="tech-note">
                <span className="mono-tag">02 · CONTROLE OCPP 2.0.1</span>
                <h3>Priorização por janela operacional</h3>
                <p>
                  As estações FastHub 120 kW e Wallbox Pro 22 kW recebem tetos dinâmicos de corrente, evitando multas de ultrapassagem de demanda contratada.
                </p>
              </div>
              <div className="tech-note">
                <span className="mono-tag">03 · RETORNO AUDITÁVEL</span>
                <h3>Menor Capex na adequação elétrica</h3>
                <p>
                  Frotas entram em operação na infraestrutura existente antes de investir em ampliação de média tensão junto à concessionária regional.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 4. STICKY NARRATIVE HARDWARE CHAPTERS */}
      <section id="hardware" className="hardware-band" data-chapter-theme="light">
        <div className="container">
          <div className="section-head">
            <div className="section-head__main">
              <span className="mono-tag">PORTFÓLIO DE HARDWARE · HaaS E AQUISIÇÃO</span>
              <h2 data-split="lines">Chassi galvanizado para o pátio brasileiro</h2>
            </div>
            <p className="section-head__side" data-reveal="fade">
              Todos os equipamentos utilizam carcaça em aço galvanizado com pintura microtexturizada Verde Grafite, barra de LED frontal visível a 50 metros sob sol forte e proteção contra poeira, chuva e vandalismo.
            </p>
          </div>

          <HardwareChapters />
        </div>
      </section>

      {/* 5. ASYMMETRIC CONSOLE (KAIROVA OS & PAY) & TURNKEY SERVICES */}
      <section id="software" className="software-band" data-chapter-theme="light">
        <div className="container">
          <div className="section-head">
            <div className="section-head__main">
              <span className="mono-tag">ECOSSISTEMA CLOUD E SERVIÇOS DE CAMPO</span>
              <h2 data-split="lines">Do laudo na concessionária à cobrança por kWh</h2>
            </div>
            <p className="section-head__side" data-reveal="fade">
              Enquanto carregadores importados genéricos deixam o gestor sem pós-venda e multinacionais operam com contratos engessados em dólar, a Kairova entrega software nativo e equipe própria certificada.
            </p>
          </div>

          <div className="software-layout">
            <div className="console-panel" data-reveal="up">
              <div className="console-panel__header">
                <span className="mono-tag">KAIROVA OS · MODO TELEMETRIA</span>
                <span className="console-badge">ALERTA ÂMBAR ATIVO · OCPP 2.0.1</span>
              </div>
              {softwareModules.map((mod) => (
                <article key={mod.id} className="console-module">
                  <span className="mono-tag">{mod.badge}</span>
                  <h3>{mod.name}</h3>
                  <p>{mod.summary}</p>
                  <ul className="console-list">
                    {mod.capabilities.map((cap) => (
                      <li key={cap}>{cap}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="services-col">
              {specializedServices.map((srv) => (
                <article key={srv.code} className="service-item" data-reveal="up">
                  <div className="service-item__head">
                    <span className="mono-tag">{srv.code}</span>
                    <span className="service-item__sla">{srv.sla}</span>
                  </div>
                  <h3>{srv.name}</h3>
                  <p>{srv.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. CASE STUDY INDEX LIST + FLOATING PREVIEW */}
      <section id="casos" className="cases-band" data-chapter-theme="light">
        <div className="container">
          <div className="section-head">
            <div className="section-head__main">
              <span className="mono-tag">ARQUITETURAS DE REFERÊNCIA B2B</span>
              <h2 data-split="lines">Aplicações dimensionadas por perfil operacional</h2>
            </div>
            <p className="section-head__side" data-reveal="fade">
              Estudos referenciais construídos a partir da experiência em cooperativas agroindustriais, distribuição urbana e galpões logísticos certificados.
            </p>
          </div>

          <ul className="case-list" data-index>
            {caseStudies.map((cs) => (
              <li key={cs.slug}>
                <Link
                  href={`/cases/${cs.slug}/`}
                  className="case-row"
                  data-preview={cs.cover.src}
                  data-cursor="Abrir caso"
                >
                  <span className="case-row__thumb">
                    <Image
                      src={cs.cover.src}
                      alt={cs.cover.alt}
                      width={896}
                      height={512}
                      sizes="100vw"
                    />
                  </span>
                  <span className="case-row__title">{cs.title}</span>
                  <span className="case-row__sector">
                    {cs.sector} · {cs.state}
                  </span>
                  <span className="case-row__power">{cs.powerInstalled}</span>
                  <span className="case-row__arrow">Ver dossiê</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="case-preview" aria-hidden="true">
            <img
              src={caseStudies[0]!.cover.src}
              alt=""
              width={720}
              height={450}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* 7. STATEMENT / MANIFESTO & 4 NUCLEAR PILLARS (DARK BAND) */}
      <section className="pillars-band band-dark-solid" data-chapter-theme="dark">
        <div className="container">
          <div className="manifesto-grid">
            <h2 className="manifesto-statement" data-split="lines">
              {companyStory.vision2030}
            </h2>
            <div className="manifesto-aside" data-reveal="fade">
              <span className="mono-tag">PROPÓSITO E CULTURA</span>
              <p>{companyStory.uvp}</p>
              <div>
                <Link href="/sobre/" className="btn" data-fill>
                  <span className="btn__fill" aria-hidden="true" />
                  <span className="btn__text">Conhecer história e cultura técnica</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="pillars-list">
            {companyStory.pillars.map((pillar) => (
              <article key={pillar.index} className="pillar-item" data-reveal="up">
                <span className="pillar-item__idx">{pillar.index}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </article>
            ))}
          </div>

          <div className="icp-strip" aria-label="Segmentos atendidos">
            {icpProfiles.map((icp) => (
              <article key={icp.title} className="icp-card" data-reveal="up">
                <h3>{icp.title}</h3>
                <p>{icp.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINALE FOOTER */}
      <Footer />
    </div>
  );
}
