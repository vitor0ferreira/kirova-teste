import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initScroll, resetScroll, startScroll, stopScroll } from './scroll';
import { initReveals } from './reveal';
import { initGL, mountGL, unmountGL } from './gl';
import { initCursor, initMagnetic } from './interactions';
import { runLoader } from './loader';
import { playEnter, playLeave } from './transition';
import { prefersReducedMotion } from './env';

export { onScroll, scrollState, scrollToTarget, stopScroll, startScroll } from './scroll';
export { setTransition } from './transition';
export { setLoaderFormat, setLoaderExit } from './loader';
export { hideGL, setBackground, clearBackground, glSupported } from './gl';
export { ease, isTouch, isMobile, prefersReducedMotion } from './env';

export type PageFn = (page: { intro: gsap.core.Timeline; path: string }) => void | (() => void);
const pageFns = new Set<PageFn>();
const cleanups = new Map<PageFn, () => void>();
let ctx: gsap.Context | null = null;
let intro: gsap.core.Timeline | null = null;
let ready = false;
let booted = false;

export function onPage(fn: PageFn) {
  pageFns.add(fn);
  if (ready) runPageFn(fn);
  return () => {
    pageFns.delete(fn);
    const c = cleanups.get(fn);
    if (c) {
      cleanups.delete(fn);
      c();
    }
  };
}

function runPageFn(fn: PageFn) {
  cleanups.get(fn)?.();
  cleanups.delete(fn);
  ctx?.add(() => {
    const c = fn({ intro: intro!, path: location.pathname });
    if (typeof c === 'function') cleanups.set(fn, c);
  });
}

export function syncFlags() {
  const h = document.documentElement.classList;
  h.add('js', 'is-booted');
  h.toggle('motion', !prefersReducedMotion());
  if (document.querySelector('.gl-canvas')) h.add('gl-on');
}

function initPage() {
  syncFlags();
  document.getElementById('cursor')?.classList.remove('is-active');
  ctx = gsap.context(() => {
    intro = initReveals(document);
    initMagnetic(document);
  });
  try {
    mountGL(document);
  } catch (err) {
    console.error('GL mount error:', err);
  }
  ready = true;
  pageFns.forEach(runPageFn);
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

export async function boot(setup?: () => void) {
  if (booted) return;
  booted = true;
  syncFlags();
  initScroll();
  try {
    initGL();
  } catch (err) {
    console.error('GL init skipped:', err);
  }
  initCursor();
  try {
    setup?.();
  } catch (err) {
    console.error('Setup error:', err);
  }
  stopScroll();
  initPage();
  await runLoader();
  startScroll();
  ScrollTrigger.refresh();
  intro?.play();
}

export async function leave() {
  stopScroll();
  await playLeave();
}

export function cleanup() {
  if (!ready) return;
  ready = false;
  Array.from(cleanups.values()).forEach((c) => c());
  cleanups.clear();
  ctx?.revert();
  ctx = null;
  unmountGL();
}

export async function enter({ transition = true, scrollTop = true } = {}) {
  if (!booted) return;
  cleanup();
  if (scrollTop) resetScroll();
  initPage();
  if (transition) {
    const p = playEnter();
    setTimeout(() => intro?.play(), 160);
    await p;
  } else {
    intro?.play();
  }
  startScroll();
}
