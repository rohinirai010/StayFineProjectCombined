import React, { useState, useEffect } from "react";
import {
  PrimaryButton,
  SecondaryButton,
} from "../../components/MainWebsiteComponents/ButtonsComponent";
import middleSectionBgSpot from "../../images/mainWebsiteImages/rewardSecBgSpot.svg";

const ReviewSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const testimonials = [
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo dolor fermentum dignissim et pellentesque egestas mauris, faucibus. Tellus mi amet non et pharetra faucibus senectus in.",
      name: "JOHN CARTER",
      company: "ROLE, COMPANY",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    },
    {
      id: 2,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo dolor fermentum dignissim et pellentesque egestas mauris, faucibus. Tellus mi amet non et pharetra faucibus senectus in.",
      name: "SARAH JOHNSON",
      company: "MANAGER, TECH CORP",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
    },
    {
      id: 3,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo dolor fermentum dignissim et pellentesque egestas mauris, faucibus. Tellus mi amet non et pharetra faucibus senectus in.",
      name: "MIKE DAVIS",
      company: "CEO, STARTUP INC",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    },
    {
      id: 4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo dolor fermentum dignissim et pellentesque egestas mauris, faucibus. Tellus mi amet non et pharetra faucibus senectus in.",
      name: "EMILY WILSON",
      company: "DIRECTOR, AGENCY",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    },
    {
      id: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo dolor fermentum dignissim et pellentesque egestas mauris, faucibus. Tellus mi amet non et pharetra faucibus senectus in.",
      name: "ALEX BROWN",
      company: "FOUNDER, COMPANY",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
    },
    {
      id: 6,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo dolor fermentum dignissim et pellentesque egestas mauris, faucibus. Tellus mi amet non et pharetra faucibus senectus in.",
      name: "LISA TAYLOR",
      company: "VP, ENTERPRISE",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("review-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getVisibleTestimonials = () => {
    const result = [];
    // Show 3 cards: previous, current, next
    for (let i = -1; i <= 1; i++) {
      let index =
        (currentSlide + i + testimonials.length) % testimonials.length;
      result.push({
        ...testimonials[index],
        position: i, // -1 = left, 0 = center, 1 = right
      });
    }
    return result;
  };

  return (
    <div
      id="review-section"
      className={`pt-14 md:pt-30 pb-16 transition-all duration-1000 relative ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div
        className={`flex flex-row justify-between items-center mb-6 md:mb-10 px-6 sm:px-8 md:px-10 lg:px-20 xl:px-30 transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
        }`}
      >
        <h1
          className=" text-[16px] sm:text-[28px] md:text-[38px] font-bold hover:scale-105 transition-transform duration-300"
          style={{ color: "var(--color-dark" }}
        >
          What our users say?
        </h1>
        <div className="animate-pulse-slow">
          <SecondaryButton onClick={() => alert("Primary action!")}>
            DOWNLOAD APP
          </SecondaryButton>
        </div>
      </div>

      <img
        src={middleSectionBgSpot}
        alt=""
        className="absolute -z-10 top-58 md:-top-8 left-0 w-[60rem]  "
      />

      {/* Three Cards Display with Center Focus */}
      <div
        className={`relative overflow-hidden transition-all duration-1000 delay-400 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex justify-center items-center gap-4 md:gap-2">
          {getVisibleTestimonials().map((testimonial, index) => {
            const isCenter = testimonial.position === 0;
            return (
              <div
                key={`${testimonial.id}-${testimonial.position}`}
                className={`w-[90%] md:w-1/3 flex-shrink-0 transition-all duration-700 ease-in-out transform ${
                  isCenter
                    ? "opacity-100 scale-100 z-10 hover:scale-105"
                    : "opacity-30 scale-90 z-0 hover:opacity-50"
                } hover:shadow-2xl`}
                style={{
                  transform: `translateX(${testimonial.position * 2}px) scale(${
                    isCenter ? 1 : 0.9
                  })`,
                  transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <div
                  className="bg-opacity-10 backdrop-blur-sm rounded-3xl p-6 md:p-8 h-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-opacity-20 group"
                  style={{ background: "var(--color-dark)" }}
                >
                  <p className="text-white text-sm md:text-base leading-relaxed mb-6 group-hover:text-opacity-90 transition-all duration-300">
                    <span className="inline-block animate-fade-in">
                      "{testimonial.text}"
                    </span>
                  </p>
                  <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                    <div className="relative">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4 object-cover transition-all duration-300 group-hover:scale-110 hover:ring-2 hover:ring-white hover:ring-opacity-50"
                      />
                      <div className="absolute inset-0 w-12 h-12 rounded-full bg-gradient-to-r from-transparent to-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm group-hover:text-blue-200 transition-colors duration-300">
                        {testimonial.name}
                      </h4>
                      <p className="text-white text-opacity-70 text-xs group-hover:text-opacity-90 transition-all duration-300">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Dots */}
      <div
        className={`flex justify-center mt-8 space-x-2 transition-all duration-1000 delay-600 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-500 hover:scale-125 hover:shadow-lg transform ${
              index === currentSlide
                ? "bg-white scale-110 shadow-md animate-pulse-dot"
                : "bg-pink-300 hover:bg-pink-500 hover:scale-110"
            }`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes pulse-dot {
          0%,
          100% {
            transform: scale(1.1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-pulse-dot {
          animation: pulse-dot 2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ReviewSection;
