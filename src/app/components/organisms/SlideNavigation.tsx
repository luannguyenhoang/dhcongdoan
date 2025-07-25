"use client";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface SlideNavigationProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  isTransitioning: boolean;
}

const SlideNavigation = ({
  onPrevClick,
  onNextClick,
  isTransitioning
}: SlideNavigationProps) => {
  return (
    <>
      <button
        onClick={onPrevClick}
        className="absolute left-2 md:left-5 top-1/2 transform -translate-y-1/2 z-30 text-white text-2xl md:text-4xl hover:bg-black/20 p-2 rounded-full transition-all"
        disabled={isTransitioning}
        aria-label="Slide trước"
      >
        <IoIosArrowBack />
      </button>

      <button
        onClick={onNextClick}
        className="absolute right-2 md:right-5 top-1/2 transform -translate-y-1/2 z-30 text-white text-2xl md:text-4xl hover:bg-black/20 p-2 rounded-full transition-all"
        disabled={isTransitioning}
        aria-label="Slide tiếp theo"
      >
        <IoIosArrowForward />
      </button>
    </>
  );
};

export default SlideNavigation;
