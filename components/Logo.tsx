
import React from 'react';

interface LogoProps {
  className?: string;
  mode?: 'full' | 'icon';
}

const Logo: React.FC<LogoProps> = ({ className = "h-12", mode = 'full' }) => {
  // Full mode uses the original wide dimensions
  // Icon mode focuses on the "A" shape with a centered square perspective
  const viewBox = mode === 'full' ? "0 0 550 150" : "35 20 140 110";

  return (
    <svg 
      viewBox={viewBox} 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ultraMetal" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
        <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* The Iconic 'A' Shapes */}
      <g filter="url(#logoGlow)">
        <path d="M40 125L95 25H110L110 80L90 125H40Z" fill="url(#ultraMetal)" />
        <path d="M125 25L170 125H145L115 55L125 25Z" fill="url(#ultraMetal)" />
        <path d="M92 90H125L132 105H100L92 90Z" fill="#020617" />
      </g>

      {/* Corporate Text - Only rendered in full mode */}
      {mode === 'full' && (
        <>
          <text x="190" y="88" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="68" letterSpacing="1" fill="#FFFFFF" filter="url(#logoGlow)" style={{ fontStyle: 'italic' }}>AKMUT</text>
          <rect x="190" y="112" width="45" height="3" fill="#FFFFFF" opacity="0.9" />
          <text x="245" y="122" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="22" letterSpacing="10" fill="#FFFFFF" filter="url(#logoGlow)">GROUP</text>
          <rect x="385" y="112" width="45" height="3" fill="#FFFFFF" opacity="0.9" />
        </>
      )}
    </svg>
  );
};

export default Logo;
