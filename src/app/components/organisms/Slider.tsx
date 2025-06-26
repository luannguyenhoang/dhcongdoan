"use client";
import FeatureBoxes from "@/app/components/organisms/FeatureBoxes";
import SlideContent from "@/app/components/organisms/SlideContent";
import SlideNavigation from "@/app/components/organisms/SlideNavigation";
import { slideData } from "@/data/DefaultData";
import SlideAnimationStyles from "@/utils/styles";
import { useCallback, useEffect, useRef, useState } from "react";

// const SliderSkeleton = () => {
//   return (
//     <div className="relative w-full">
//       <div className="lg:h-[700px] h-[450px] relative bg-gray-200 animate-pulse">
//         {/* Navigation placeholders */}
//         <div className="absolute top-1/2 left-4 z-20 transform -translate-y-1/2">
//           <div className="w-10 h-10 rounded-full bg-gray-300"></div>
//         </div>
//         <div className="absolute top-1/2 right-4 z-20 transform -translate-y-1/2">
//           <div className="w-10 h-10 rounded-full bg-gray-300"></div>
//         </div>

//         {/* Slide content placeholder */}
//         <div className="absolute inset-0 flex items-center">
//           <div className="container mx-auto px-4 md:px-8 z-10">
//             <div className="flex flex-col md:flex-row items-center">
//               <div className="w-full md:w-1/2 mb-8 md:mb-0 pr-0 md:pr-8">
//                 {/* Title placeholder */}
//                 <div className="h-12 bg-gray-300 rounded mb-6 w-3/4"></div>

//                 {/* Description placeholder */}
//                 <div className="h-6 bg-gray-300 rounded mb-3 w-full"></div>
//                 <div className="h-6 bg-gray-300 rounded mb-3 w-full"></div>
//                 <div className="h-6 bg-gray-300 rounded mb-6 w-2/3"></div>

//                 {/* Button placeholder */}
//                 <div className="h-12 bg-gray-300 rounded w-40"></div>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>

//       {/* FeatureBoxes placeholder */}
//       <div className="absolute bottom-0 w-full z-30">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[1, 2, 3].map((item) => (
//               <div
//                 key={item}
//                 className="bg-gray-200 p-6 rounded-lg animate-pulse"
//               >

//                 <div className="h-6 bg-gray-300 rounded mb-3 w-3/4"></div>
//                 <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
//                 <div className="h-4 bg-gray-300 rounded w-5/6"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export const Slider = ({
  data,
  loading = false
}: {
  data?: any;
  loading?: boolean;
}) => {
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
  // if (loading) {
  //   return <SliderSkeleton />;
  // }

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
                link: slide.link
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
