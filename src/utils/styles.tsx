"use client";

const SlideAnimationStyles = () => {
  return (
    <style jsx global>{`
      @keyframes slideInFromTop {
        0% {
          transform: translateY(-150px);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }

      @keyframes slideInFromLeft {
        0% {
          transform: translateX(-200px);
          opacity: 0;
        }
        100% {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @keyframes slideInFromBottom {
        0% {
          transform: translateY(150px);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }

      .title-animation {
        opacity: 0;
        transform: translateY(-150px);
      }

      .title-animation.animate {
        animation: slideInFromTop 1s ease forwards;
      }

      .desc-animation {
        opacity: 0;
        transform: translateX(-200px);
      }

      .desc-animation.animate {
        animation: slideInFromLeft 1s ease forwards;
        animation-delay: 0.4s;
      }

      .btn-animation {
        opacity: 0;
        transform: translateY(150px);
      }

      .btn-animation.animate {
        animation: slideInFromBottom 1s ease forwards;
        animation-delay: 0.8s;
      }

      .slide-transition {
        transition: opacity 1.2s ease-in-out;
      }
    `}</style>
  );
};

export default SlideAnimationStyles;
