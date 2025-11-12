"use client";

import { useEffect, useState, useRef } from "react";

export const useSizeWindow = () => {
  const hasWindow = typeof window !== "undefined";
  const [size, setSize] = useState({
    width: hasWindow ? window.innerWidth : 0,
    height: hasWindow ? window.scrollY : 0
  });
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!hasWindow) return;

    // Throttle function to limit updates
    const throttle = (func: () => void, limit: number) => {
      let inThrottle: boolean;
      return () => {
        if (!inThrottle) {
          func();
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    };

    const setHeight = () => {
      // Cancel previous RAF if exists
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      // Use requestAnimationFrame to batch DOM reads
      rafIdRef.current = requestAnimationFrame(() => {
        const newHeight = window.scrollY;
        setSize((prev) => {
          // Only update if value changed to avoid unnecessary re-renders
          if (prev.height !== newHeight) {
            return { ...prev, height: newHeight };
          }
          return prev;
        });
      });
    };

    const setWidth = () => {
      // Cancel previous RAF if exists
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      // Use requestAnimationFrame to batch DOM reads
      rafIdRef.current = requestAnimationFrame(() => {
        const newWidth = window.innerWidth;
        setSize((prev) => {
          // Only update if value changed to avoid unnecessary re-renders
          if (prev.width !== newWidth) {
            return { ...prev, width: newWidth };
          }
          return prev;
        });
      });
    };

    // Throttle scroll events (16ms = ~60fps)
    const throttledSetHeight = throttle(setHeight, 16);
    // Throttle resize events (100ms to avoid too many updates)
    const throttledSetWidth = throttle(setWidth, 100);

    window.addEventListener("scroll", throttledSetHeight, { passive: true });
    window.addEventListener("resize", throttledSetWidth, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledSetHeight);
      window.removeEventListener("resize", throttledSetWidth);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [hasWindow]);

  return { size };
};
