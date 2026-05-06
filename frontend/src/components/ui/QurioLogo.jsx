import React from "react";

const QurioLogo = ({ className = "w-8 h-8", ...props }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className} 
      {...props}
    >
      <defs>
        <linearGradient id="qurio-left" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" /> {/* bright blue */}
          <stop offset="100%" stopColor="#4f46e5" /> {/* indigo */}
        </linearGradient>
        
        <linearGradient id="qurio-right" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" /> {/* violet */}
          <stop offset="100%" stopColor="#4c1d95" /> {/* dark purple */}
        </linearGradient>

        <linearGradient id="qurio-top" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563eb" /> {/* deeper blue */}
          <stop offset="100%" stopColor="#7c3aed" /> {/* violet */}
        </linearGradient>

        <linearGradient id="qurio-shadow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g strokeWidth="2" strokeLinejoin="round">
        {/* Left Face */}
        <path d="M35 15 L10 50 L35 85 L42 70 L25 50 L42 30 Z" fill="url(#qurio-left)" stroke="url(#qurio-left)" />
        
        {/* Right Face */}
        <path d="M65 15 L90 50 L65 85 L58 70 L75 50 L58 30 Z" fill="url(#qurio-right)" stroke="url(#qurio-right)" />
        
        {/* Shadows for depth (Top Folds) */}
        <path d="M35 15 L42 30 L25 50 Z" fill="url(#qurio-shadow)" opacity="0.7"/>
        <path d="M65 15 L58 30 L75 50 Z" fill="url(#qurio-shadow)" opacity="0.7"/>
        
        {/* Shadows for depth (Bottom Folds) */}
        <path d="M38 78 L42 70 L25 50 L35 85 Z" fill="#000000" opacity="0.3"/>
        <path d="M62 78 L58 70 L75 50 L65 85 Z" fill="#000000" opacity="0.5"/>
        
        {/* Top Face */}
        <path d="M34 15 L66 15 L58 30 L42 30 Z" fill="url(#qurio-top)" stroke="url(#qurio-top)" />
      </g>
    </svg>
  );
};

export default QurioLogo;
