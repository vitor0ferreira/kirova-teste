import * as React from 'react';

// "O Pulso Preciso": Isometric hexagon interrupted by an ascending 45-degree vector
// forming both the letter "K" and a continuous circuit flow.
export function LogoMark({ size = 26, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Left/bottom isometric hexagon circuit shell */}
      <path
        d="M16 2.5L27.5 9.15V14.2M27.5 19.6V22.85L16 29.5L4.5 22.85V9.15L12.6 4.46"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Vertical K spine */}
      <path d="M11.5 9.2V22.8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      {/* Ascending 45-degree K vector + kinetic circuit pulse */}
      <path
        d="M11.5 16.4L22.5 8.5M14.8 14.2L22.8 22.6"
        stroke="#32E875"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="22.8" cy="8.4" r="1.7" fill="#32E875" />
    </svg>
  );
}
