"use client";

import { RefObject, useEffect, useRef } from "react";

interface UseSidebarScrollProps {
  currentSlide: number;
  totalSlides: number;
}

export const useSidebarScroll = ({
  currentSlide,
  totalSlides
}: UseSidebarScrollProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const activeItemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (activeItemRefs.current.length === 0) {
      activeItemRefs.current = new Array(totalSlides).fill(null);
    }
  }, [totalSlides]);

  useEffect(() => {
    if (sidebarRef.current && activeItemRefs.current[currentSlide]) {
      const sidebar = sidebarRef.current;
      const activeItem = activeItemRefs.current[currentSlide];

      if (activeItem) {
        // Use requestAnimationFrame to batch DOM reads and avoid forced reflow
        requestAnimationFrame(() => {
          // Batch all DOM reads together
          const itemRect = activeItem.getBoundingClientRect();
          const sidebarRect = sidebar.getBoundingClientRect();
          const isMobile = window.innerWidth < 1024;

          if (isMobile) {
            const isVisible =
              itemRect.left >= sidebarRect.left &&
              itemRect.right <= sidebarRect.right;

            if (!isVisible) {
              // Batch all offset reads
              const scrollLeft =
                activeItem.offsetLeft -
                sidebar.offsetLeft -
                sidebar.clientWidth / 2 +
                activeItem.clientWidth / 2;

              // Use requestAnimationFrame for DOM writes
              requestAnimationFrame(() => {
                sidebar.scrollTo({
                  left: scrollLeft,
                  behavior: "smooth"
                });
              });
            }
          } else {
            const isVisible =
              itemRect.top >= sidebarRect.top &&
              itemRect.bottom <= sidebarRect.bottom;

            if (!isVisible) {
              // Batch all offset reads
              const scrollTop =
                activeItem.offsetTop -
                sidebar.offsetTop -
                sidebar.clientHeight / 2 +
                activeItem.clientHeight / 2;

              // Use requestAnimationFrame for DOM writes
              requestAnimationFrame(() => {
                sidebar.scrollTo({
                  top: scrollTop,
                  behavior: "smooth"
                });
              });
            }
          }
        });
      }
    }
  }, [currentSlide]);

  const registerActiveItemRef = (
    index: number,
    ref: HTMLButtonElement | null
  ) => {
    if (activeItemRefs.current) {
      activeItemRefs.current[index] = ref;
    }
  };

  return {
    sidebarRef,
    registerActiveItemRef
  };
};
