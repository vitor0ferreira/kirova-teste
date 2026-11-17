import { gsap } from 'gsap';
import {
  ease,
  isTouch,
  onPage,
  onScroll,
  prefersReducedMotion,
  setLoaderExit,
  setLoaderFormat,
  setTransition,
} from '@/engine';
import { startConcept } from './driver';

// 1. Directional pointer-entry flood on primary CTAs ([data-fill])
function initButtonFill() {
  return onPage(() => {
    if (isTouch() || prefersReducedMotion()) return;
    const off: (() => void)[] = [];
    document.querySelectorAll<HTMLElement>('[data-fill]').forEach((btn) => {
      const fill = btn.querySelector<HTMLElement>('.btn__fill');
      if (!fill) return;
      const from = (e: PointerEvent) => {
        const r = btn.getBoundingClientRect();
        return `${e.clientX - r.left}px ${e.clientY - r.top}px`;
      };
      let closed = true;
      const open = (at: string) => {
        if (closed) gsap.set(fill, { clipPath: `circle(0% at ${at})` });
        closed = false;
        btn.classList.add('is-filled');
        gsap.to(fill, { clipPath: `circle(150% at ${at})`, duration: 0.55, ease: ease.soft, overwrite: true });
      };
      const close = (at: string) => {
        btn.classList.remove('is-filled');
        gsap.to(fill, {
          clipPath: `circle(0% at ${at})`,
          duration: 0.45,
          ease: ease.soft,
          overwrite: true,
          onComplete: () => { closed = true; },
        });
      };
      const enter = (e: PointerEvent) => open(from(e));
      const leave = (e: PointerEvent) => close(from(e));
      const focus = () => btn.matches(':focus-visible') && open('50% 50%');
      const blur = () => close('50% 50%');
      btn.addEventListener('pointerenter', enter);
      btn.addEventListener('pointerleave', leave);
      btn.addEventListener('focus', focus);
      btn.addEventListener('blur', blur);
      off.push(() => {
        btn.removeEventListener('pointerenter', enter);
        btn.removeEventListener('pointerleave', leave);
        btn.removeEventListener('focus', focus);
        btn.removeEventListener('blur', blur);
      });
    });
    return () => off.forEach((f) => f());
  });
}

// 2. Index list floating image preview (desktop) + scroll safety check
function initIndexPreview() {
  return onPage(() => {
    const list = document.querySelector<HTMLElement>('[data-index]');
    const box = document.querySelector<HTMLElement>('.case-preview');
    if (!list || !box || isTouch() || prefersReducedMotion()) return;
    const img = box.querySelector('img');
    if (!img) return;
    const y = gsap.quickTo(box, 'y', { duration: 0.5, ease: 'power3.out' });
    const rot = gsap.quickTo(box, 'rotation', { duration: 0.7, ease: 'power3.out' });
    let lastX = 0;
    let px = 0;
    let py = 0;
    let active = false;

    const move = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      y(py);
      rot(gsap.utils.clamp(-4, 4, (px - lastX) * 0.25));
      lastX = px;
    };
    const show = (e: Event) => {
      const src = (e.currentTarget as HTMLElement).dataset.preview;
      if (src && img.getAttribute('src') !== src) img.src = src;
      active = true;
      gsap.to(box, { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'expo.out', overwrite: true });
    };
    const hide = () => {
      if (!active) return;
      active = false;
      gsap.to(box, { autoAlpha: 0, scale: 0.88, duration: 0.35, ease: 'expo.out', overwrite: true });
    };

    const links = list.querySelectorAll<HTMLAnchorElement>('a[data-preview]');
    links.forEach((a) => {
      a.addEventListener('pointerenter', show);
      a.addEventListener('focus', show);
    });
    list.addEventListener('pointerleave', hide);
    addEventListener('pointermove', move);
    const offScroll = onScroll(() => {
      if (active && !list.contains(document.elementFromPoint(px, py))) hide();
    });

    return () => {
      links.forEach((a) => {
        a.removeEventListener('pointerenter', show);
        a.removeEventListener('focus', show);
      });
      list.removeEventListener('pointerleave', hide);
      removeEventListener('pointermove', move);
      offScroll();
    };
  });
}

// 3. Persistent corner frame steps aside when scrolling down
function initFrameStepAside() {
  let last = 0;
  onScroll(({ y }) => {
    if (Math.abs(y - last) < 4) return;
    document.documentElement.classList.toggle('frame-away', y > 180 && y > last);
    last = y;
  });
}

export function setupMotion() {
  // Voltage calibration loader counter: 000 V -> 380 V
  setLoaderFormat((p) => `${Math.round(p * 3.8).toString().padStart(3, '0')} V`);

  setLoaderExit((root) =>
    gsap
      .timeline()
      .to(root.querySelectorAll('[data-loader-out]'), {
        yPercent: -115,
        duration: 0.18,
        ease: ease.inOut,
        stagger: 0.02,
      })
      .to(
        root,
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          duration: 0.28,
          ease: ease.inOut,
        },
        '-=0.1',
      ),
  );

  // 45-degree diagonal circuit wipe transition ("O Pulso Preciso")
  setTransition({
    leave: (c) => {
      const panel = c.querySelector<HTMLElement>('.curtain__panel')!;
      return gsap
        .timeline()
        .set(c, { autoAlpha: 1 })
        .set(panel, { yPercent: 0 })
        .fromTo(
          panel,
          { clipPath: 'polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%)' },
          { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 0.48, ease: ease.inOut },
        );
    },
    enter: (c) => {
      const panel = c.querySelector<HTMLElement>('.curtain__panel')!;
      return gsap
        .timeline()
        .to(panel, {
          clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
          duration: 0.55,
          ease: ease.inOut,
        })
        .set(c, { autoAlpha: 0 });
    },
  });

  startConcept();
  initButtonFill();
  initIndexPreview();
  initFrameStepAside();
}
