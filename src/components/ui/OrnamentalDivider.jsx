'use client';

/**
 * Reusable ornamental SVG dividers.
 * variant: 'paisley' | 'lotus' | 'toran' | 'simple'
 */
export default function OrnamentalDivider({ variant = 'lotus', className = '' }) {
  return (
    <div className={`flex items-center justify-center py-6 ${className}`} aria-hidden="true">
      {variant === 'lotus' && <LotusDiv />}
      {variant === 'paisley' && <PaisleyDiv />}
      {variant === 'toran' && <ToranDiv />}
      {variant === 'simple' && <SimpleDiv />}
    </div>
  );
}

function LotusDiv() {
  return (
    <svg width="280" height="40" viewBox="0 0 280 40" fill="none">
      <line x1="0" y1="20" x2="95" y2="20" stroke="#C9A24B" strokeOpacity="0.5" strokeWidth="0.8"/>
      {/* Lotus center */}
      <g transform="translate(140,20)">
        {/* Petals */}
        <ellipse cx="0" cy="-8" rx="4" ry="10" fill="none" stroke="#C9A24B" strokeWidth="0.8" transform="rotate(-30 0 0)"/>
        <ellipse cx="0" cy="-8" rx="4" ry="10" fill="none" stroke="#C9A24B" strokeWidth="0.8"/>
        <ellipse cx="0" cy="-8" rx="4" ry="10" fill="none" stroke="#C9A24B" strokeWidth="0.8" transform="rotate(30 0 0)"/>
        {/* Lower petals */}
        <ellipse cx="0" cy="8" rx="3" ry="7" fill="none" stroke="#C9A24B" strokeWidth="0.6" transform="rotate(180 0 0)"/>
        <circle cx="0" cy="0" r="3" fill="#C9A24B" opacity="0.6"/>
        <circle cx="0" cy="0" r="1.5" fill="#F28C28"/>
      </g>
      {/* Dots */}
      {[-40,-20,20,40].map((x) => (
        <circle key={x} cx={140+x} cy="20" r="1.5" fill="#C9A24B" opacity="0.5"/>
      ))}
      <line x1="185" y1="20" x2="280" y2="20" stroke="#C9A24B" strokeOpacity="0.5" strokeWidth="0.8"/>
    </svg>
  );
}

function PaisleyDiv() {
  return (
    <svg width="300" height="50" viewBox="0 0 300 50" fill="none">
      <line x1="0" y1="25" x2="90" y2="25" stroke="#C9A24B" strokeOpacity="0.4" strokeWidth="0.8"/>
      {/* Left paisley */}
      <g transform="translate(100,25)">
        <path d="M0,0 C-10,-15 -20,-10 -15,0 C-10,10 0,12 5,8 C8,4 6,-4 0,0Z"
          fill="none" stroke="#C9A24B" strokeWidth="0.8"/>
        <circle cx="-5" cy="2" r="1.5" fill="#C9A24B" opacity="0.7"/>
      </g>
      {/* Center ornament */}
      <g transform="translate(150,25)">
        <path d="M0,-12 L3,-3 L12,0 L3,3 L0,12 L-3,3 L-12,0 L-3,-3 Z"
          fill="none" stroke="#C9A24B" strokeWidth="0.8"/>
        <circle cx="0" cy="0" r="2.5" fill="#C9A24B" opacity="0.7"/>
      </g>
      {/* Right paisley (mirrored) */}
      <g transform="translate(200,25) scale(-1,1)">
        <path d="M0,0 C-10,-15 -20,-10 -15,0 C-10,10 0,12 5,8 C8,4 6,-4 0,0Z"
          fill="none" stroke="#C9A24B" strokeWidth="0.8"/>
        <circle cx="-5" cy="2" r="1.5" fill="#C9A24B" opacity="0.7"/>
      </g>
      <line x1="210" y1="25" x2="300" y2="25" stroke="#C9A24B" strokeOpacity="0.4" strokeWidth="0.8"/>
    </svg>
  );
}

function ToranDiv() {
  return (
    <svg width="320" height="45" viewBox="0 0 320 45" fill="none">
      {/* Scalloped toran top */}
      <path d="M0,5 Q20,0 40,5 Q60,0 80,5 Q100,0 120,5 Q140,0 160,5 Q180,0 200,5 Q220,0 240,5 Q260,0 280,5 Q300,0 320,5"
        stroke="#C9A24B" strokeWidth="1" fill="none" strokeOpacity="0.7"/>
      {/* Hanging tassels */}
      {[20,60,100,140,180,220,260,300].map((x,i) => (
        <g key={i} transform={`translate(${x}, 8)`}>
          <circle cx="0" cy="0" r="2.5" fill="#F28C28" opacity="0.8"/>
          <line x1="0" y1="2.5" x2="0" y2="18" stroke="#C9A24B" strokeWidth="0.8"/>
          <ellipse cx="0" cy="22" rx="2.5" ry="4" fill="#C9A24B" opacity="0.7"/>
        </g>
      ))}
    </svg>
  );
}

function SimpleDiv() {
  return (
    <svg width="240" height="20" viewBox="0 0 240 20" fill="none">
      <line x1="0" y1="10" x2="104" y2="10" stroke="#C9A24B" strokeOpacity="0.4" strokeWidth="0.8"/>
      <path d="M112,10 L120,4 L128,10 L120,16 Z" fill="#C9A24B" opacity="0.6"/>
      <circle cx="120" cy="10" r="2" fill="#F28C28"/>
      <line x1="136" y1="10" x2="240" y2="10" stroke="#C9A24B" strokeOpacity="0.4" strokeWidth="0.8"/>
    </svg>
  );
}
