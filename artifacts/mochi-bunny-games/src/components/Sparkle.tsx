import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Sparkle({ delay = 0, size = 20, style }: { delay?: number, size?: number, style?: React.CSSProperties }) {
  const [isWrong, setIsWrong] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        if (Math.random() > 0.8) {
          setIsWrong(true);
          setTimeout(() => setIsWrong(false), 150);
        }
      }, 2000 + Math.random() * 5000);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <motion.div
      animate={{ 
        scale: [1, 1.2, 1],
        rotate: [0, 90, 180]
      }}
      transition={{ 
        duration: 3, 
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        ...style,
        width: size,
        height: size,
      }}
      className="absolute"
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M50 0C50 0 55 40 100 50C100 50 55 60 50 100C50 100 45 60 0 50C0 50 45 40 50 0Z" 
          fill={isWrong ? "currentColor" : "#ffb6c1"}
          className={isWrong ? "text-destructive" : ""}
        />
      </svg>
    </motion.div>
  );
}
