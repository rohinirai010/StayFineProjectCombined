import React, { useState, useEffect } from "react";
import { PlayButtonGray } from "../../components/MainWebsiteComponents/ButtonsComponent";
import downloadIcon from "../../images/mainWebsiteImages/downloadIcon.svg";
import rewardSecIcon5 from "../../images/mainWebsiteImages/rewardSecIcon5.svg";
import rewardSecIcon6 from "../../images/mainWebsiteImages/rewardSecIcon6.svg";
import RewardsSectionCommonComponent from "../../components/MainWebsiteComponents/RewardsSectionCommonComponent";

const GetStarted = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateSteps, setAnimateSteps] = useState(false);

  const bottomFeatures = [
    {
      icon: downloadIcon,
      title: "Download app",
      description: null,
    },
    {
      icon: rewardSecIcon5,
      title: "Create a free account",
      description: null,
    },
    {
      icon: rewardSecIcon6,
      title: "Start trading",
      description: null,
    },
  ];

  // Intersection observer for entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Trigger step animations after main animation
          setTimeout(() => {
            setAnimateSteps(true);
          }, 800);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("get-started-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Bottom Section */}
      <div
        id="get-started-section"
        className={`flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0 mt-6 sm:mt-24 px-6 sm:px-8 md:px-10 lg:px-20 xl:px-30 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Left Content */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          <h2 className="text-[25px] sm:text-[34px] lg:text-[40px] font-bold mb-3 md:mb-6 leading-tight hover:scale-105 transition-transform duration-300 cursor-default" style={{color: "var(--color-dark)"}}>
            <span className="inline-block animate-text-reveal">
              Get started today
            </span>
          </h2>
          <p
            className={` mb-6 md:mb-8 text-[14px] sm:text-[16px] leading-relaxed max-w-lg transition-all duration-700 delay-500  ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{color: "var(--color-dark)"}}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat
            nulla suspendisse tortor aene.
          </p>

          {/* Bottom Features */}
          <div className="space-y-3 md:space-y-4">
            {bottomFeatures.map((feature, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  animateSteps
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-6"
                }`}
                style={{
                  transitionDelay: `${600 + index * 200}ms`,
                }}
              >
                <div className="relative overflow-hidden">
                  <div
                    className={`transform transition-all duration-500 hover:scale-105 ${
                      animateSteps ? "translate-y-0" : "translate-y-8"
                    }`}
                  >
                    <RewardsSectionCommonComponent
                    
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                    />
                  </div>
                  {/* Animated underline effect */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image  */}
        <div
          className={`relative transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
        >
          <div
            className="w-[18rem] sm:w-[35rem] h-[13rem] sm:h-[20rem] rounded-4xl flex items-center justify-center   group hover:scale-105 transition-all duration-500 hover:shadow-2xl cursor-pointer"
            style={{ background: "var(--color-dark)" }}
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 rounded-4xl bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Ripple effect on hover */}
            <div className="absolute inset-0 rounded-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 rounded-4xl animate-ripple bg-white/5"></div>
            </div>

            <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
              <PlayButtonGray />
            </div>

            {/* Shine effect */}
            <div className="absolute inset-0 rounded-4xl overflow-hidden">
              <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-4xl bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10 scale-110"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes text-reveal {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.8;
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.5);
          }
        }

        .animate-text-reveal {
          animation: text-reveal 0.8s ease-out 0.6s both;
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-ripple {
          animation: ripple 1s ease-out;
        }

        .rounded-4xl {
          border-radius: 2rem;
        }

        /* Custom hover effects */
        .group:hover .animate-float {
          animation-play-state: running;
        }
      `}</style>
    </>
  );
};

export default GetStarted;
