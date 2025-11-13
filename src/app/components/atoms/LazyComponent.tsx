"use client";

import { useEffect, useRef, useState, Suspense, ReactNode } from "react";

interface LazyComponentProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
}

/**
 * LazyComponent - Chỉ render children khi component sắp visible
 * Giúp giảm Script Evaluation và Parsing time bằng cách defer non-critical components
 */
export const LazyComponent = ({
  children,
  fallback = <div className="min-h-[200px]" />,
  rootMargin = "100px",
  threshold = 0.01
}: LazyComponentProps) => {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Nếu đã render rồi thì không cần observer nữa
    if (shouldRender) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldRender(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin,
        threshold
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [shouldRender, rootMargin, threshold]);

  return (
    <div ref={containerRef}>
      {shouldRender ? (
        <Suspense fallback={fallback}>{children}</Suspense>
      ) : (
        fallback
      )}
    </div>
  );
};
