"use client";
import { slideData } from "@/data/DefaultData";
import { useCallback, useEffect, useRef, useState } from "react";
import SlideAnimationStyles from "@/utils/styles";
import FeatureBoxes from "@/app/components/organisms/FeatureBoxes";
import SlideContent from "@/app/components/organisms/SlideContent";
import SlideNavigation from "@/app/components/organisms/SlideNavigation";

export const Slider = ({ data }: { data?: any }) => {
  const sliderContent = data?.content || slideData;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleNextSlide = useCallback(() => {
    if (isTransitioning) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setIsTransitioning(true);
    setIsAnimating(false);
    setPrevSlide(currentSlide);
    setCurrentSlide((prev) =>
      prev === sliderContent.length - 1 ? 0 : prev + 1
    );
  }, [currentSlide, isTransitioning, sliderContent.length]);

  const startAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (!isTransitioning) {
        handleNextSlide();
      } else {
        console.log("Skipping auto slide, still transitioning");
      }
    }, 5000);
  }, [isTransitioning, handleNextSlide]);

  const handlePrevSlide = () => {
    if (isTransitioning) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setIsTransitioning(true);
    setIsAnimating(false);
    setPrevSlide(currentSlide);
    setCurrentSlide((prev) =>
      prev === 0 ? sliderContent.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (currentSlide !== prevSlide) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);

        setTimeout(() => {
          setIsAnimating(true);
        }, 50);

        setTimeout(() => {
          startAutoSlide();
        }, 100);
      }, 1200);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [currentSlide, prevSlide, isTransitioning, startAutoSlide]);

  useEffect(() => {
    setIsAnimating(true);
    startAutoSlide();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startAutoSlide]);

  return (
    <div className="relative w-full">
      <SlideAnimationStyles />
      <div className="lg:h-[700px] h-[450px] relative">
        <SlideNavigation
          onPrevClick={handlePrevSlide}
          onNextClick={handleNextSlide}
          isTransitioning={isTransitioning}
        />

        <div className="relative w-full h-full overflow-hidden">
          {sliderContent.map((slide: any, index: number) => (
            <SlideContent
              key={index}
              slide={{
                title: slide.title,
                description: slide.description,
                image: slide.image?.node?.mediaItemUrl,
                link: slide.link,
              }}
              index={index}
              currentSlide={currentSlide}
              prevSlide={prevSlide}
              isTransitioning={isTransitioning}
              isAnimating={isAnimating}
            />
          ))}
        </div>
      </div>
      <div className="relative z-30">
        <FeatureBoxes data={data?.introduce} />
      </div>
    </div>
  );
};

export default Slider;
