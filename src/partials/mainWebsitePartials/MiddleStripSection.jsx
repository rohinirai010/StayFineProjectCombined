import React from "react";
import middleStripMobileImage from "../../images/mainWebsiteImages/middleStripMobileImage.svg";
import { OutlineButton, SecondaryButton } from "../../components/MainWebsiteComponents/ButtonsComponent";

const MiddleStripSection = () => {
  return (
    <div
      className="flex flex-col md:flex-row justify-between items-center px-6 sm:px-8 md:px-10 lg:px-20 xl:px-30 relative mt-20 md:mt-40 "
      style={{ background: "var(--color-dark)", position: "relative" }}
    >
      {/* Inline CSS for keyframes */}
      <style>
        {`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(100px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .fade-up {
            animation: fadeUp 0.8s ease-out forwards;
          }

          .slide-in-right {
            animation: slideInRight 1s ease-out forwards;
          }

          .delay-0 { animation-delay: 0ms; }
          .delay-200 { animation-delay: 200ms; }
          .delay-400 { animation-delay: 400ms; }
          .delay-600 { animation-delay: 600ms; }
          .delay-800 { animation-delay: 800ms; }
        `}
      </style>

      <div className="py-10 md:py-20 fade-up delay-0" style={{ animationDelay: "0ms" }}>
        <h2
          className="text-[24px] sm:text-[30px] md:text-[34px] lg:text-[40px] font-bold text-white mb-2 md:mb-4 leading-tight fade-up"
          style={{ animationDelay: "200ms", animationFillMode: "forwards", animationDuration: "0.8s", animationTimingFunction: "ease-out", animationName: "fadeUp" }}
        >
          Explore endless possibilities
          <br />
          with FinanceFlow
        </h2>
        <p
          className="text-gray-300 text-[16px] leading-relaxed max-w-lg mb-6 md:mb-8 fade-up"
          style={{ animationDelay: "400ms", animationFillMode: "forwards", animationDuration: "0.8s", animationTimingFunction: "ease-out", animationName: "fadeUp" }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat nulla
          suspendisse tortor aute.
        </p>
        <div
          className="fade-up "
          style={{ animationDelay: "600ms", animationFillMode: "forwards", animationDuration: "0.8s", animationTimingFunction: "ease-out", animationName: "fadeUp" }}
        >
          <SecondaryButton onClick={() => alert("Primary action!")} >
            DOWNLOAD APP
          </SecondaryButton>
        </div>
      </div>

      <img
        src={middleStripMobileImage}
        alt="Mobile Image"
        className="h-[300px] md:h-[400px] lg:h-[500px] md:absolute right-0 bottom-0 z-10 md:pr-30 slide-in-right"
        style={{
          animationDelay: "800ms",
          animationFillMode: "forwards",
          animationDuration: "1s",
          animationTimingFunction: "ease-out",
          animationName: "slideInRight",
          filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))",
        }}
      />
    </div>
  );
};

export default MiddleStripSection;
