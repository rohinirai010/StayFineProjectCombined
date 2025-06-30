import React, { useState, useEffect } from "react";
import rewardSecIcon1 from "../../images/mainWebsiteImages/rewardSecIcon1.svg";
import rewardSecIcon2 from "../../images/mainWebsiteImages/rewardSecIcon2.svg";
import rewardSecIcon3 from "../../images/mainWebsiteImages/rewardSecIcon3.svg";
import rewardSecIcon4 from "../../images/mainWebsiteImages/rewardSecIcon4.svg";
import rewardSecIcon5 from "../../images/mainWebsiteImages/rewardSecIcon5.svg";
import rewardSecIcon6 from "../../images/mainWebsiteImages/rewardSecIcon6.svg";
import rewardSectionBgSpot from "../../images/mainWebsiteImages/rewardSecBgSpot.svg";
import rewardsSecMobileImages from "../../images/mainWebsiteImages/rewardsSecMobileImages.svg";
import rewardsSecLaptop from "../../images/mainWebsiteImages/rewardsSecLaptop.svg";
import headerResLaptop from "../../images/mainWebsiteImages/headerResLaptop.svg";

// Import your original common component
import RewardsSectionCommonComponent from "../../components/MainWebsiteComponents/RewardsSectionCommonComponent";

// Enhanced wrapper for animation
const AnimatedRewardsSectionCommonComponent = ({ icon, title, description, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={`transform transition-all duration-700 ease-out ${
      isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
    } hover:translate-x-2 hover:scale-105`}>
      <RewardsSectionCommonComponent
        icon={icon}
        title={title}
        description={description}
      />
    </div>
  );
};

const RewardsSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const topFeatures = [
    {
      icon: rewardSecIcon1,
      title: "Lowest fees in market",
      description: null,
    },
    {
      icon: rewardSecIcon2,
      title: "Fast and secure transactions",
      description: null,
    },
    {
      icon: rewardSecIcon3,
      title: "256-bit secure encryption",
      description: null,
    },
  ];

  const bottomFeatures = [
    {
      icon: rewardSecIcon4,
      title: "100% Private data",
      description: null,
    },
    {
      icon: rewardSecIcon5,
      title: "99.99% Uptime guarantee",
      description: null,
    },
    {
      icon: rewardSecIcon6,
      title: "24/7 Dedicated support",
      description: null,
    },
  ];

  return (
    <div className="pt-20 md:pt-24 relative overflow-hidden">
      {/* Animated Background Spot */}
      <img
        src={rewardSectionBgSpot}
        alt=""
        className="absolute -z-10 top-[45%] sm:top-8 md:animate-pulse"
      />
      
      {/* Floating particles animation */}
      <div className="absolute inset-0 -z-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeInUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
           @keyframes slowBounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px); 
    }
  }

  .slow-bounce {
    animation: slowBounce 3s infinite ease-in-out; /* slower and smoother */
  }
      `}</style>

      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 px-6 sm:px-8 md:px-10 lg:px-20 xl:px-30">
        {/* Left Image */}
        <div className={`transform transition-all duration-1000 ease-out slow-bounce ${
          isLoaded ? 'translate-x-0 opacity-100 scale-100' : '-translate-x-20 opacity-0 scale-95'
        } hover:scale-105 hover:rotate-1`}>
          <img
            src={rewardsSecMobileImages}
            alt="Mobile Image"
            className="w-[24rem] sm:w-[20rem] md:w-[25rem] lg::w-[30rem] drop-shadow-2xl hover:drop-shadow-3xl transition-all duration-300 "
            style={{
              animation: isLoaded ? 'slideInLeft 1s ease-out' : 'none'
            }}
          />
        </div>

        {/* Right Content */}
        <div className={`space-y-12 transform transition-all duration-1000 ease-out delay-300 ${
          isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
        }`}>
          <div>
            <h2 className="text-[25px] sm:text-[34px] lg:text-[40px] font-bold  mb-3 sm:mb-6 leading-tight  transition-colors duration-300"
                style={{
                  animation: isLoaded ? 'fadeInUp 1s ease-out 0.5s both' : 'none',
                  color: "var(--color-primary)"
                }}>
              Earn daily rewards on
              <br />
              your idle tokens
            </h2>
            <p className="text-gray-300 mb-6 md:mb-8 text-[14px]  sm:text-[16px] leading-relaxed max-w-lg  transition-colors duration-300"
               style={{
                 animation: isLoaded ? 'fadeInUp 1s ease-out 0.7s both' : 'none',
                       color: "var(--color-dark)"
               }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat
              nulla suspendisse tortor aute.
            </p>

            {/* Top Features */}
            <div className="space-y-3 sm:space-y-4"
                 style={{
                   animation: isLoaded ? 'scaleIn 1s ease-out 0.9s both' : 'none'
                 }}>
              {topFeatures.map((feature, index) => (
                <AnimatedRewardsSectionCommonComponent
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0 mt-20 pl-6 sm:pl-8 md:pl-10 lg:pl-20 xl:pl-30">
        {/* Left Content */}
        <div className={`transform transition-all duration-1000 ease-out delay-1000 ${
          isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
        }`}>
          <h2 className="text-[25px] sm:text-[34px] lg:text-[40px] font-bold  mb-3 md:mb-6 leading-tight  transition-colors duration-300"
              style={{
                animation: isLoaded ? 'slideInLeft 1s ease-out 1.2s both' : 'none',
                      color: "var(--color-primary)"

              }}>
            Earn daily rewards on
            <br />
            your idle tokens
          </h2>
          <p className="text-gray-300 mb-6 md:mb-8 text-[14px]  sm:text-[16px] leading-relaxed max-w-lg  transition-colors duration-300"
             style={{
               animation: isLoaded ? 'slideInLeft 1s ease-out 1.4s both' : 'none',
                     color: "var(--color-dark)"
             }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat
            nulla suspendisse tortor aute.
          </p>

          {/* Bottom Features */}
          <div className="space-y-3 md:space-y-4"
               style={{
                 animation: isLoaded ? 'scaleIn 1s ease-out 1.6s both' : 'none'
               }}>
            {bottomFeatures.map((feature, index) => (
              <AnimatedRewardsSectionCommonComponent
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index + 3}
              />
            ))}
          </div>
        </div>

        {/* Right Image - Laptop */}
        <div className={`transform transition-all duration-1000 ease-out delay-1000 slow-bounce ${
          isLoaded ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-20 opacity-0 scale-95'
        } hover:scale-105 hover:-rotate-1`}>
          <img
            src={rewardsSecLaptop}
            alt="Laptop Image"
            className="hidden md:block w-[44rem] drop-shadow-2xl hover:drop-shadow-3xl transition-all duration-300"
            style={{
              animation: isLoaded ? 'slideInRight 1s ease-out 1.8s both' : 'none'
            }}
          />
          <img
            src={headerResLaptop}
            alt="Laptop Image"
            className="block md:hidden w-[25rem] sm:w-[30rem] pr-6 drop-shadow-2xl hover:drop-shadow-3xl transition-all duration-300"
            style={{
              animation: isLoaded ? 'slideInRight 1s ease-out 1.8s both' : 'none'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RewardsSection;