'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { startScroll, stopScroll } from '@/engine';
import { site } from '@/data/site';
import { LogoMark } from './Logo';

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const menuRef = React.useRef<HTMLElement | null>(null);

  const closeMenu = React.useCallback((restoreFocus = true) => {
    setMenuOpen(false);
    startScroll();
    if (restoreFocus) {
      requestAnimationFrame(() => buttonRef.current?.focus());
    }
  }, []);

  React.useEffect(() => {
    setMenuOpen(false);
    startScroll();
  }, [pathname]);

  React.useEffect(() => {
    if (!menuOpen) return;
    stopScroll();
    const nav = menuRef.current;
    const focusables = nav ? Array.from(nav.querySelectorAll<HTMLElement>('a[href], button')) : [];
    focusables[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu(true);
        return;
      }
      if (e.key === 'Tab' && focusables.length > 0) {
        const first = focusables[0]!;
        const last = focusables[focusables.length - 1]!;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, closeMenu]);

  return (
    <>
      <header className="site-header">
        <div className="site-header__bar frame__tl">
          <Link href="/" className="brand-link">
            <LogoMark size={24} className="brand-link__mark" />
            <span className="brand-link__name">KIROVA</span>
            <span className="brand-link__city">UBERABA · MG</span>
            <span className="sr-only"> (Página inicial)</span>
          </Link>

          <div className="header-telemetry" aria-hidden="true">
            <span className="led-dot" data-idle-pulse />
            <span className="mono-tag" data-label>
              FASE 01 · ENTRADA 13,8 kV · 99,94% UPTIME
            </span>
          </div>

          <nav className="site-nav frame__tr" aria-label="Navegação principal">
            {site.nav.map((item) => {
              const isCurrent = item.href === '/sobre/' && pathname.startsWith('/sobre');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link roll-pseudo"
                  data-roll={item.label}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <a href="/#viabilidade" className="btn btn--sm" data-fill>
              <span className="btn__fill" aria-hidden="true" />
              <span className="btn__text">Viabilidade</span>
            </a>
          </nav>

          <button
            ref={buttonRef}
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => (menuOpen ? closeMenu(true) : setMenuOpen(true))}
          >
            <span>{menuOpen ? 'Fechar' : 'Menu'}</span>
          </button>
        </div>
      </header>

      <nav
        id="mobile-menu"
        ref={menuRef}
        className="mobile-menu"
        hidden={!menuOpen}
        aria-label="Menu mobile"
      >
        <div className="mobile-menu__head">
          <span className="mono-tag">KIROVA · UBERABA, MG</span>
          <button
            type="button"
            className="menu-close"
            onClick={() => closeMenu(true)}
            aria-label="Fechar menu de navegação"
          >
            Fechar
          </button>
        </div>
        <ul className="mobile-menu__list">
          <li>
            <Link href="/" onClick={() => closeMenu(false)}>
              Início
            </Link>
          </li>
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={() => closeMenu(false)}>
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <a href="/#viabilidade" onClick={() => closeMenu(false)}>
              Estudo de Viabilidade
            </a>
          </li>
        </ul>
        <div className="mobile-menu__meta">
          <p>{site.location.address}</p>
          <p>
            {site.location.city} · {site.contact.phone}
          </p>
        </div>
      </nav>
    </>
  );
}
