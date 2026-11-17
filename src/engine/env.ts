export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
export const isTouch = () => matchMedia('(hover: none), (pointer: coarse)').matches;
export const isMobile = () => matchMedia('(max-width: 767px)').matches;

// Shared easing vocabulary for Kairova: crisp contactor snap + damped voltage stabilization.
export const ease = {
  out: 'expo.out', // default entrance
  inOut: 'expo.inOut', // curtains, page transitions
  soft: 'power3.out', // small UI & contactor snaps
  spring: 'back.out(1.4)', // subtle mechanical latch
} as const;
