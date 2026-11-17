import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { LogoMark } from '@/components/Logo';
import { Motion } from '@/components/Motion';
import { site } from '@/data/site';
import { display, mono, text } from './fonts';
import '@/components/iso/iso.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: './' },
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: site.legalName,
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

const flags = `document.documentElement.classList.add('js');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion');if(location.pathname==='/'||location.pathname===''){document.documentElement.classList.add('is-dark')}`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  email: site.contact.email,
  telephone: site.contact.phone,
  foundingDate: '2021',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.location.address,
    addressLocality: 'Uberaba',
    addressRegion: 'MG',
    postalCode: '38022-200',
    addressCountry: 'BR',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${text.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: flags }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Pular para o conteúdo principal<span className="sr-only"> (#main)</span>
        </a>
        <div id="gl" aria-hidden="true" />
        <div id="curtain" aria-hidden="true">
          <div className="curtain__panel" />
        </div>
        <div id="cursor" aria-hidden="true">
          <span data-cursor-label />
        </div>
        <div id="loader" role="status" aria-label="Calibrando sistema elétrico">
          <div className="loader__inner">
            <div className="loader__brand" data-loader-out>
              <LogoMark size={32} />
              <span className="loader__name">KIROVA</span>
            </div>
            <span className="loader__count" data-loader-out data-loader-count>
              000 V
            </span>
          </div>
          <div className="loader__bar" data-loader-bar />
        </div>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <Motion />
      </body>
    </html>
  );
}
