import { useState, useEffect } from "react";

export function Mascot({ className }: { className?: string }) {
  const [clickCount, setClickCount] = useState(0);
  const [isAngry, setIsAngry] = useState(false);

  useEffect(() => {
    if (clickCount > 5) {
      setIsAngry(true);
      const t = setTimeout(() => {
        setIsAngry(false);
        setClickCount(0);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [clickCount]);

  return (
    <div 
      className={`relative w-24 h-24 transition-transform hover:scale-110 ${className}`}
      onClick={() => setClickCount(c => c + 1)}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Left Ear */}
        <path d="M 35 45 Q 20 10 35 15 Q 45 20 45 40" fill="#fff" stroke="#ffb6c1" strokeWidth="2" />
        {/* Right Ear */}
        <path d="M 65 45 Q 80 10 65 15 Q 55 20 55 40" fill="#fff" stroke="#ffb6c1" strokeWidth="2" />
        
        {/* Body */}
        <circle cx="50" cy="65" r="30" fill="#fff" stroke="#ffb6c1" strokeWidth="2" />
        
        {/* Eyes group with slow blink animation */}
        <g className="animate-slow-blink">
          <circle cx="40" cy="60" r={isAngry ? "3" : "4"} fill={isAngry ? "#8b0000" : "#333"} />
          <circle cx="60" cy="60" r={isAngry ? "3" : "4"} fill={isAngry ? "#8b0000" : "#333"} />
          
          {/* Eye highlights */}
          {!isAngry && (
            <>
              <circle cx="41" cy="59" r="1.5" fill="#fff" />
              <circle cx="61" cy="59" r="1.5" fill="#fff" />
            </>
          )}
        </g>
        
        {/* Blush */}
        <ellipse cx="32" cy="65" rx="5" ry="3" fill="#ffb6c1" opacity={isAngry ? "0" : "0.6"} />
        <ellipse cx="68" cy="65" rx="5" ry="3" fill="#ffb6c1" opacity={isAngry ? "0" : "0.6"} />
        
        {/* Mouth */}
        {!isAngry ? (
          <path d="M 47 67 Q 50 70 53 67" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" />
        ) : (
          <path d="M 45 70 Q 50 65 55 70" fill="none" stroke="#8b0000" strokeWidth="2" strokeLinecap="round" />
        )}
      </svg>
    </div>
  );
}
