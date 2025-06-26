"use client";

import Link from "next/link";

export interface SlideItem {
  title: string;
  description: string;
  image: {
    node: {
      mediaItemUrl: string;
    };
  };
  link?: string;
}

interface SlideContentProps {
  slide: SlideItem;
  index: number;
  currentSlide: number;
  prevSlide: number;
  isTransitioning: boolean;
  isAnimating: boolean;
}

const SlideContent = ({
  slide,
  index,
  currentSlide,
  prevSlide,
  isTransitioning,
  isAnimating
}: SlideContentProps) => {
  return (
    <div
      key={index}
      className={`absolute inset-0 bg-cover bg-center slide-transition ${
        index === currentSlide ? "z-20" : "z-10"
      } ${
        index === currentSlide
          ? "opacity-100"
          : index === prevSlide && isTransitioning
            ? "opacity-0"
            : "opacity-0"
      }`}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("${slide.image}")`,
        backgroundColor: "#1e3a8a"
      }}
    >
      <div className="relative max-w-6xl mx-auto h-full flex flex-col items-center lg:items-start justify-center text-white px-4">
        <div className="max-w-lg text-center lg:text-start mb-8">
          <h1
            className={`text-3xl lg:text-4xl font-bold mb-4 px-4 lg:px-0 title-animation ${
              isAnimating && index === currentSlide ? "animate" : ""
            }`}
          >
            {slide.title}
          </h1>
          <p
            className={`text-sm lg:text-lg text-gray-300 px-4 lg:px-0 desc-animation ${
              isAnimating && index === currentSlide ? "animate" : ""
            }`}
          >
            {slide.description}
          </p>
          <Link href={slide.link || "/"}>
            <button
              className={`mt-6 bg-yellow-400 hover:bg-yellow-600 text-black font-bold py-2 px-4 uppercase btn-animation ${
                isAnimating && index === currentSlide ? "animate" : ""
              }`}
              aria-label={`Xem ngay: ${slide.title}`}
            >
              Xem ngay
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SlideContent;
