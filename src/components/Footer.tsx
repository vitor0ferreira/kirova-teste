import Link from 'next/link';
import { site } from '@/data/site';
import { LogoMark } from './Logo';
import { ViabilityForm } from './ViabilityForm';

export function Footer() {
  return (
    <footer id="viabilidade" className="site-footer" data-chapter-theme="dark">
      <div className="container footer-grid">
        <div className="footer-left">
          <ViabilityForm />
        </div>

        <div className="footer-right">
          <div className="footer-block">
            <span className="mono-tag">CENTRO DE OPERAÇÕES E ENGENHARIA</span>
            <p className="footer-address">
              {site.legalName}
              <br />
              {site.location.address}
              <br />
              {site.location.city}, {site.location.cep}
              <br />
              {site.location.region}
            </p>
          </div>

          <div className="footer-block">
            <span className="mono-tag">ATENDIMENTO TÉCNICO E COMERCIAL</span>
            <ul className="footer-links">
              <li>
                <a className="util-link mono-num nowrap" href={site.contact.phoneHref}>
                  Telefone: {site.contact.phone}
                </a>
              </li>
              <li>
                <a
                  className="util-link mono-num nowrap"
                  href={site.contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp: {site.contact.whatsapp}
                </a>
              </li>
              <li>
                <a className="util-link" href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-block">
            <span className="mono-tag">NAVEGAÇÃO</span>
            <ul className="footer-nav">
              <li>
                <Link className="util-link" href="/">
                  Início
                </Link>
              </li>
              <li>
                <Link className="util-link" href="/#hardware">
                  Hardware proprietário
                </Link>
              </li>
              <li>
                <Link className="util-link" href="/#software">
                  Kairova OS &amp; Pay
                </Link>
              </li>
              <li>
                <Link className="util-link" href="/sobre/">
                  Cultura e história
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container footer-wordmark-wrap">
        <div className="footer-wordmark-row">
          <LogoMark size={48} className="footer-mark" />
          <span className="footer-wordmark" aria-hidden="true">
            KAIROVA
          </span>
        </div>
        <div className="footer-colophon">
          <span>
            &copy; 2021 a 2026 {site.legalName} Todos os direitos reservados.
          </span>
          <span>
            NOC 24/7 Uberaba · SLA presencial de até 6 horas em 9 estados brasileiros
          </span>
        </div>
      </div>
    </footer>
  );
}
