import { useState, useEffect } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlitchTextProps {
  text: string;
  className?: string;
  isAlwaysActive?: boolean;
}

export function GlitchText({ text, className, isAlwaysActive = false }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(isAlwaysActive);

  useEffect(() => {
    if (isAlwaysActive) return;

    const triggerGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200 + Math.random() * 500);
      
      // Schedule next glitch
      const nextTime = 3000 + Math.random() * 10000;
      timeoutId = setTimeout(triggerGlitch, nextTime);
    };

    let timeoutId = setTimeout(triggerGlitch, Math.random() * 5000);
    return () => clearTimeout(timeoutId);
  }, [isAlwaysActive]);

  return (
    <span className={cn("relative inline-block", className)}>
      {isGlitching && (
        <>
          <span 
            className="absolute top-0 left-[-2px] text-destructive glitch-layer-1 opacity-80"
            aria-hidden="true"
          >
            {text}
          </span>
          <span 
            className="absolute top-0 left-[2px] text-blue-500 glitch-layer-2 opacity-80"
            aria-hidden="true"
          >
            {text}
          </span>
        </>
      )}
      <span className={cn("relative", isGlitching && "opacity-90")}>
        {text}
      </span>
    </span>
  );
}
