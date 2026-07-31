"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AnimateInProps = {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
};

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AnimateIn({ children, className, delayMs = 0 }: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [reduceMotion] = useState(prefersReducedMotion);
  const [visible, setVisible] = useState(reduceMotion);

  useEffect(() => {
    if (reduceMotion) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <div
      ref={ref}
      style={reduceMotion ? undefined : { transitionDelay: `${delayMs}ms` }}
      className={cn(
        !reduceMotion && "transition-all duration-700 ease-out",
        !reduceMotion &&
          (visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"),
        className,
      )}
    >
      {children}
    </div>
  );
}
