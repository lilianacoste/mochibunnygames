import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useRoute } from "wouter";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function NavButton({ href, children }: { href: string; children: React.ReactNode }) {
  const [isActive] = useRoute(href);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        setOffset({
          x: (Math.random() - 0.5) * 3,
          y: (Math.random() - 0.5) * 3,
        });

        setTimeout(() => setOffset({ x: 0, y: 0 }), 150);
      }
    }, 2000 + Math.random() * 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div animate={{ x: offset.x, y: offset.y }} transition={{ duration: 0.1 }}>
      <Link
        href={href}
        className={cn(
          "min-h-11 rounded-full px-4 py-2 text-center text-sm font-bold transition-all duration-300 sm:px-5 sm:text-base md:px-6 md:text-lg",
          "border-4 border-transparent hover:border-primary/20",
          isActive
            ? "bg-white text-primary shadow-kawaii"
            : "text-foreground hover:-translate-y-1 hover:bg-white/50",
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
}
