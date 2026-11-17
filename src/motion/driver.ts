import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, onScroll, prefersReducedMotion, setBackground } from '@/engine';
import { idle, startIdle } from './idle';

gsap.registerPlugin(ScrollTrigger);

// Fullscreen oscillographic busbar shader: subtle technical grid + damped three-phase wave
// smoothly shifting between Deep Graphite Green (#0F2922) and Technical Ice White (#F4F7F6).
const FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uTime, uScroll, uVelocity, uDark, uLoad;
uniform vec2 uMouse, uResolution;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  vec2 aspect = vec2(uResolution.x / max(1.0, uResolution.y), 1.0);
  vec2 uv = vUv * aspect;

  vec3 darkGround = vec3(0.0588, 0.1608, 0.1333);   // #0F2922
  vec3 lightGround = vec3(0.9569, 0.9686, 0.9647);  // #F4F7F6
  vec3 accentLime = vec3(0.1961, 0.9098, 0.4588);   // #32E875

  vec3 bg = mix(lightGround, darkGround, uDark);

  // Subtle architectural engineering coordinate grid (pure WebGL 1 safe)
  vec2 gridUv = uv * 9.0 + vec2(0.0, uScroll * 1.4);
  vec2 gridCell = abs(fract(gridUv) - 0.5);
  float gridDist = min(gridCell.x, gridCell.y);
  float line = 1.0 - smoothstep(0.0, 0.035, 0.5 - gridDist);
  float gridAlpha = mix(0.032, 0.055, uDark);
  bg = mix(bg, mix(darkGround, accentLime, uDark * 0.45), line * gridAlpha);

  // Oscillographic three-phase busbar pulse responding to uTime, uMouse, uLoad
  float freq = 3.2 + uLoad * 2.4;
  float waveA = sin(uv.x * freq - uTime * 0.55 + uMouse.x * 1.4) * 0.085;
  float waveB = sin(uv.x * freq - uTime * 0.55 + 2.094 + uMouse.y * 1.1) * 0.065;
  float yCenter = 0.52 + (uMouse.y - 0.5) * 0.06;

  float bandA = smoothstep(0.008, 0.0, abs(vUv.y - (yCenter + waveA)));
  float bandB = smoothstep(0.006, 0.0, abs(vUv.y - (yCenter - 0.12 + waveB)));
  float aura = smoothstep(0.45, 0.0, distance(uv, vec2(uMouse.x * aspect.x, uMouse.y)));

  vec3 traceColor = mix(vec3(0.0588, 0.1608, 0.1333), accentLime, uDark);
  float traceAlpha = mix(0.095, 0.16, uDark);
  bg = mix(bg, traceColor, (bandA + bandB * 0.6) * traceAlpha);
  bg += accentLime * aura * mix(0.015, 0.065, uDark);

  // Micro-texture film grain
  bg += (hash(vUv * uResolution + fract(uTime)) - 0.5) * 0.014;
  gl_FragColor = vec4(bg, 1.0);
}`;

const uniforms = {
  uDark: { value: 1 },
  uLoad: { value: 0.45 },
};

const TELEMETRY = [
  'FASE 01 · ENTRADA 13,8 kV · 99,94% UPTIME',
  'FASE 02 · GRIDGUARD DLM · 0% SOBRECARGA',
  'FASE 03 · KAIRÓS TARIFA VERDE · 1.800+ PONTOS',
];

let chapterTriggers: ScrollTrigger[] = [];
let manualLoad: number | null = null;
let currentDark: boolean | null = null;

export function setDriverLoad(ratio: number) {
  manualLoad = ratio;
  gsap.to(uniforms.uLoad, { value: ratio, duration: 0.5, ease: 'power3.out', overwrite: true });
}

function setDarkMode(dark: boolean, immediate = false) {
  if (currentDark === dark && !immediate) return;
  currentDark = dark;
  document.documentElement.classList.toggle('is-dark', dark);
  const target = dark ? 1 : 0;
  if (immediate || prefersReducedMotion()) {
    gsap.killTweensOf(uniforms.uDark);
    uniforms.uDark.value = target;
  } else {
    gsap.to(uniforms.uDark, { value: target, duration: 0.55, ease: 'power3.out', overwrite: true });
  }
}

function syncChapterTheme(immediate = false) {
  const path = location.pathname;
  if (path !== '/' && path !== '') return;
  const chapters = document.querySelectorAll<HTMLElement>('[data-chapter-theme]');
  if (!chapters.length) return;
  const mid = window.innerHeight * 0.45;
  let active: HTMLElement | null = null;
  for (const el of chapters) {
    const r = el.getBoundingClientRect();
    if (r.top <= mid && r.bottom >= mid) {
      active = el;
      break;
    }
  }
  if (!active) {
    const firstRect = chapters[0]!.getBoundingClientRect();
    active = firstRect.top > mid ? chapters[0]! : chapters[chapters.length - 1]!;
  }
  setDarkMode(active.dataset.chapterTheme === 'dark', immediate);
}

function updateTelemetry(progress: number) {
  const label = document.querySelector<HTMLElement>('[data-label]');
  if (!label) return;
  const idx = progress < 0.3 ? 0 : progress < 0.72 ? 1 : 2;
  const next = TELEMETRY[idx]!;
  if (label.textContent !== next) label.textContent = next;
}

export function startConcept() {
  startIdle();
  const bg = setBackground(FRAG, uniforms);
  if (!bg) {
    document.documentElement.style.background = 'var(--c-bg)';
  }

  onScroll(({ progress }) => {
    if (manualLoad === null) {
      uniforms.uLoad.value = 0.35 + progress * 0.5;
    }
    updateTelemetry(progress);
    syncChapterTheme();
  });

  onPage(({ path }) => {
    chapterTriggers.forEach((st) => st.kill());
    chapterTriggers = [];

    const pageRoot = document.querySelector<HTMLElement>('[data-page-theme]');
    const defaultDark = pageRoot?.dataset.pageTheme === 'dark';
    setDarkMode(defaultDark, true);
    updateTelemetry(0);

    const pulseDot = document.querySelector<HTMLElement>('[data-idle-pulse]');
    const onTick = () => {
      if (pulseDot && !prefersReducedMotion()) {
        const s = 0.75 + Math.sin(idle.t * 2.2) * 0.25;
        pulseDot.style.opacity = s.toFixed(2);
      }
    };
    gsap.ticker.add(onTick);

    const onRefresh = () => syncChapterTheme(true);
    if (path === '/' || path === '') {
      const chapters = gsap.utils.toArray<HTMLElement>('[data-chapter-theme]');
      chapters.forEach((el) => {
        const isDark = el.dataset.chapterTheme === 'dark';
        const st = ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => setDarkMode(isDark),
          onEnterBack: () => setDarkMode(isDark),
        });
        chapterTriggers.push(st);
      });

      ScrollTrigger.addEventListener('refresh', onRefresh);
      requestAnimationFrame(() => syncChapterTheme(true));
    }

    return () => {
      gsap.ticker.remove(onTick);
      ScrollTrigger.removeEventListener('refresh', onRefresh);
      chapterTriggers.forEach((st) => st.kill());
      chapterTriggers = [];
    };
  });
}
