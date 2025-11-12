"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import FormWrapper only when needed
const FormWrapper = dynamic(
  () =>
    import("@/app/components/molecules/FormWrapper").then(
      (mod) => mod.FormWrapper
    ),
  {
    ssr: false
  }
);

interface LazyFormWrapperProps {
  title?: string;
  color?: string;
  type?: "form-main" | "form-popup";
  showTitle?: boolean;
  rootMargin?: string;
}

/**
 * LazyFormWrapper - Only loads FormWrapper when it's about to be visible
 * This prevents loading heavy form scripts (formio, jquery, owl.js) until needed
 */
export const LazyFormWrapper = ({
  title,
  color,
  type = "form-main",
  showTitle = false,
  rootMargin = "200px" // Start loading 200px before the form becomes visible
}: LazyFormWrapperProps) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If type is form-popup, load immediately (popups are user-triggered)
    if (type === "form-popup") {
      setShouldLoad(true);
      setIsVisible(true);
      return;
    }

    // For form-main, use Intersection Observer to lazy load
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            setIsVisible(true);
            // Once loaded, we can disconnect the observer
            observer.disconnect();
          }
        });
      },
      {
        rootMargin,
        threshold: 0.01
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
  }, [type, rootMargin]);

  return (
    <div
      ref={containerRef}
      style={{ minHeight: shouldLoad ? "auto" : "200px" }}
    >
      {shouldLoad && isVisible ? (
        <FormWrapper
          title={title}
          color={color}
          type={type}
          showTitle={showTitle}
        />
      ) : (
        <div
          style={{
            minHeight: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#999"
          }}
        >
          {/* Placeholder while loading */}
        </div>
      )}
    </div>
  );
};
