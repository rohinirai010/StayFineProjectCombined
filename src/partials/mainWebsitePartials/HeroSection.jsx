import React, { useState, useEffect } from "react";
import computerImg from "../../images/mainWebsiteImages/appleComputerImg.svg";
import heroSectionBgSpot from "../../images/mainWebsiteImages/heroSectionBgSpot.svg";
import companyImg from "../../images/mainWebsiteImages/companyImg.svg";
import headerResLaptop from "../../images/mainWebsiteImages/headerResLaptop.svg";
import {
  PrimaryButton,
  TertiaryButton,
} from "../../components/MainWebsiteComponents/ButtonsComponent";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [textAnimation, setTextAnimation] = useState(false);
  const [buttonAnimation, setButtonAnimation] = useState(false);
  const [imageAnimation, setImageAnimation] = useState(false);
  const [featuredAnimation, setFeaturedAnimation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer1 = setTimeout(() => setIsVisible(true), 100);
    const timer2 = setTimeout(() => setTextAnimation(true), 300);
    const timer3 = setTimeout(() => setButtonAnimation(true), 600);
    const timer4 = setTimeout(() => setImageAnimation(true), 400);
    const timer5 = setTimeout(() => setFeaturedAnimation(true), 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between pr-8 md:pr-0 pl-6 sm:pl-8 md:pl-10 lg:pl-20 xl:pl-30 pt-8 md:pt-16 w-full h-full relative ">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-20">
          <div
            className={`absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl transition-all duration-3000 ${
              isVisible
                ? "animate-pulse scale-150 opacity-100"
                : "scale-50 opacity-0"
            }`}
          ></div>
          <div
            className={`absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-pink-400/20 to-yellow-400/20 rounded-full blur-lg transition-all duration-2000 delay-500 ${
              isVisible ? "animate-bounce opacity-100" : "opacity-0"
            }`}
          ></div>
          <div
            className={`absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-md transition-all duration-4000 delay-300 ${
              isVisible ? "animate-ping opacity-100" : "opacity-0"
            }`}
          ></div>
        </div>

        <div
          className={`flex flex-col gap-8 sm:gap-10 md:justify-center transition-all duration-1200 transform ${
            isVisible
              ? "opacity-100 translate-x-0 scale-100"
              : "opacity-0 -translate-x-20 scale-95"
          }`}
        >
          <div
            className={`transition-all duration-1000 transform ${
              textAnimation
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-10 scale-95"
            }`}
          >
            <h1 className="flex flex-col text-[36px] sm:text-[35px] md:text-[30px] lg:text-[56px] leading-10 lg:leading-16 font-bold bg-gradient-to-r from-[#E20C88] via-[#FFAEDD] to-[#E20C88] bg-clip-text text-transparent animate-gradient-x hover:scale-105 transition-transform duration-300" >
              Welcome to <span className="bg-gradient-to-r from-[#571043] via-[#FFAEDD] to-[#571043] bg-clip-text text-transparent animate-gradient-x">StayFine Supermart</span>
            </h1>
            <p
              className={`text-[14px] sm:text-[16px] md:text-[14px] lg:text-[15px] mt-4 lg:mt-5 transition-all duration-800 delay-200 ${
                textAnimation
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-5"
              }`}
              style={{color: "var(--color-dark)"}}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat{" "}
              <br /> nulla suspendisse tortor aenean dis placerat.
            </p>
          </div>
          <div
            className={`flex flex-row gap-4 lg:gap-6 transition-all duration-1000 transform ${
              buttonAnimation
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-10 scale-90"
            }`}
          >
            <div className="transform transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:-translate-y-2 animate-pulse hover:animate-none">
              <PrimaryButton onClick={() => navigate("/user/login")}>
                LOGIN
              </PrimaryButton>
            </div>
            <div className="transform transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:-translate-y-2 ">
              <TertiaryButton onClick={() => navigate("/user/register")}>
                START NOW
              </TertiaryButton>
            </div>
          </div>
        </div>
        <img
          src={heroSectionBgSpot}
          alt=""
          className={`block absolute top-54 sm:top-0 right-0 -z-10  transition-all duration-2000 transform`}
        /> 
        <img
          src={computerImg}
          alt="Computer Image"
          className={`hidden md:block w-[20rem] md:w-[20rem] lg:w-[30rem] xl:w-[36rem] transition-all duration-1500 transform ${
            imageAnimation
              ? "opacity-100 translate-x-0 scale-100 hover:scale-105"
              : "opacity-0 translate-x-20 scale-75"
          } animate-pulse`}
        />
        <img
          src={headerResLaptop}
          alt=""
          className={`block md:hidden w-[35rem] sm:w-[40rem] mt-16 transition-all duration-1500 transform ${
            imageAnimation
              ? "opacity-70 translate-x-0 scale-100 hover:scale-105"
              : "opacity-0 translate-x-20 scale-75"
          } animate-pulse `}
        />
      </div>

      {/* featured section */}
      <div
        className={`mt-16 md:mt-30 px-6 sm:px-8 md:px-10 lg:px-20 xl:px-30 transition-all duration-1500 transform ${
          featuredAnimation
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-20 scale-95"
        }`}
      >
        <h2
          className={`text-center text-lg sm:text-xl md:text-[18px] mb-10 transition-all duration-1000 ${
            featuredAnimation ? "opacity-100 " : "opacity-0"
          }`}
          style={{color: "var(--color-primary)"}}
        >
          Finance flow has been featured on
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-5 items-center justify-center gap-8 sm:gap-x-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`flex flex-row items-center justify-center gap-2  ${
                featuredAnimation
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-10 scale-75"
              }`}
            >
              <img
                src={companyImg}
                alt=""
                className="transition-all duration-500 hover:rotate-360 hover:scale-125 animate-pulse hover:animate-spin"
              />
              <h2 className="text-[16px] sm:text-xl font-bold transition-all duration-300" style={{color: "var(--color-primary)"}}>
                Company
              </h2>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes animate-gradient-x {
          0%,
          100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        @keyframes animate-spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-gradient-x {
          animation: animate-gradient-x 3s ease infinite;
        }

        .animate-spin-slow {
          animation: animate-spin-slow 20s linear infinite;
        }

        .hover\\:rotate-360:hover {
          transform: rotate(360deg);
        }
      `}</style>
    </>
  );
};

export default HeroSection;
