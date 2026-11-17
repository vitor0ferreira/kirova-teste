import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/Footer';
import { caseStudies } from '@/data/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((x) => x.slug === slug);
  return cs
    ? {
        title: cs.title,
        description: cs.summary.slice(0, 158),
      }
    : {};
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const idx = caseStudies.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const cs = caseStudies[idx]!;
  const next = caseStudies[(idx + 1) % caseStudies.length]!;

  return (
    <div data-page-theme="light">
      <article className="page-shell">
        <div className="container">
          <header className="case-header">
            <div className="case-header__main">
              <span className="mono-tag">
                ESTUDO REFERENCIAL · {cs.sector} · {cs.year}
              </span>
              <h1 data-split="lines" data-intro>
                {cs.title}
              </h1>
              <p className="case-header__summary" data-reveal="fade" data-intro>
                {cs.summary}
              </p>
            </div>

            <dl className="case-meta" data-reveal="up" data-intro>
              <div className="case-meta__row">
                <dt>Operação modelo</dt>
                <dd>{cs.client}</dd>
              </div>
              <div className="case-meta__row">
                <dt>Localização e distribuidora</dt>
                <dd>
                  {cs.state} · {cs.utility}
                </dd>
              </div>
              <div className="case-meta__row">
                <dt>Potência instalada</dt>
                <dd className="mono-num">{cs.powerInstalled}</dd>
              </div>
            </dl>
          </header>

          <figure className="case-hero-media" data-gl data-gl-instant>
            <Image
              src={cs.cover.src}
              alt={cs.cover.alt}
              width={1792}
              height={1024}
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 90vw"
            />
          </figure>

          <div className="case-metrics-strip" aria-label="Métricas da implantação">
            {cs.metrics.map((m) => (
              <div key={m.label}>
                <div className="case-metric__label">{m.label}</div>
                <div className="case-metric__value">{m.value}</div>
              </div>
            ))}
          </div>

          <div className="case-body">
            <div className="case-body__content">
              {cs.sections.map((sec) => (
                <section key={sec.heading} className="case-chapter">
                  <h2>{sec.heading}</h2>
                  <p>{sec.text}</p>
                </section>
              ))}
            </div>

            <aside className="case-scope-box">
              <span className="mono-tag">ESCOPO ENTREGUE</span>
              <ul className="case-scope-list">
                {cs.scope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a href="#viabilidade" className="btn btn--primary" data-fill>
                <span className="btn__fill" aria-hidden="true" />
                <span className="btn__text">Solicitar estudo semelhante</span>
              </a>
            </aside>
          </div>

          <Link href={`/cases/${next.slug}/`} className="next-case">
            <div>
              <span className="mono-tag">PRÓXIMA ARQUITETURA</span>
              <h2 style={{ marginTop: '0.35rem', fontSize: 'var(--t-l)' }}>{next.title}</h2>
            </div>
            <span className="next-case__cta mono-num">
              {next.powerInstalled} · Abrir estudo
            </span>
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
}
