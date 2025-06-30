import React, { useState, useEffect } from "react";
import phoneImg1 from "../../images/mainWebsiteImages/downloadAppImg1.svg";
import phoneImg2 from "../../images/mainWebsiteImages/downloadAppImg2.svg";
import appleIcon from "../../images/mainWebsiteImages/AppleIcon.svg";
import playStoreIcon from "../../images/mainWebsiteImages/playStoreIcon.svg";

const DownloadApp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="md:pt-16 pb-16 px-6 sm:px-8 md:px-10 lg:px-20 xl:px-30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-400 to-red-500 rounded-full animate-bounce blur-2xl" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping blur-xl" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className={`flex flex-col lg:flex-row justify-between items-start md:items-center gap-2 lg:gap-0 mb-6 md:mb-10 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h1 className=" text-[25px] sm:text-[40px] lg:text-[38px] font-bold  transition-colors duration-300 hover:scale-105 transform cursor-default" style={{color: "var(--color-dark)"}}>
          Download our app
        </h1>
        <p className="text-[11px] sm:text-[14px] lg:text-[13px] tracking-wider hover:text-gray-300 transition-all duration-300 transform hover:translate-x-2" style={{color: "var(--color-dark)"}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /> Sit
          non neque orci amet, amet .
        </p>
      </div>

      {/* middle two cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6 lg:gap-16 relative z-10">
        <div
          className={`flex flex-col gap-1 rounded-4xl px-6 lg:px-10 pt-6 lg:pt-8 relative overflow-hidden transition-all duration-500 hover:shadow-2xl transform group ${isVisible ? 'animate-slide-in-left' : ''}`}
          style={{ background: "var(--color-dark)" }}
        >
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Floating particles effect */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full opacity-60 animate-float" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-8 right-12 w-1 h-1 bg-white rounded-full opacity-40 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-12 right-8 w-1.5 h-1.5 bg-white rounded-full opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>

          <h2 className="text-[24px] sm:text-[22px] lg:text-[28px] font-bold tracking-wide relative z-10 hover:text-gray-200 transition-colors duration-300">
            Download for iOS
          </h2>
          <p className="text-[12px] md:text-[14px] tracking-wider relative z-10 hover:text-gray-300 transition-colors duration-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed
            nulla integer in pellentesque tortor semper elementum. Felis.
          </p>
          
          {/* Download Button */}
          <a
            href="https://apps.apple.com/app/your-app-id"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-sm md:text-base font-medium px-8 sm:px-4 md:px-6 py-2 md:py-3 rounded-3xl mt-4 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer w-fit max-w-full sm:max-w-[200px] relative z-10 transform "
            style={{ background: "var(--color-primary)" }}
          >
            <img
              src={appleIcon}
              alt="Apple Icon"
              className="w-5 h-5 flex-shrink-0 hover:rotate-12 transition-transform duration-300"
            />
            <span className="whitespace-nowrap">APP STORE</span>
          </a>

          <img
            src={phoneImg1}
            alt="Phone Image"
            className="mx-auto mt-10 w-[20rem] transition-all duration-700  relative z-10 animate-pulse"
          />
        </div>

        <div
          className={`flex flex-col gap-1 rounded-4xl px-6 lg:px-10 pt-6 lg:pt-8 relative overflow-hidden - transition-all duration-500 hover:shadow-2xl transform group ${isVisible ? 'animate-slide-in-right' : ''}`}
          style={{ background: "var(--color-primary)" }}
        >
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Floating particles effect */}
          <div className="absolute top-6 right-4 w-2 h-2 bg-white rounded-full opacity-60 animate-float" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-10 right-12 w-1 h-1 bg-white rounded-full opacity-40 animate-float" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-14 right-8 w-1.5 h-1.5 bg-white rounded-full opacity-50 animate-float" style={{ animationDelay: '2.5s' }}></div>

          <h2 className="text-[24px] sm:text-[22px] lg:text-[28px] font-bold tracking-wide relative z-10 hover:text-gray-200 transition-colors duration-300">
            Download for Android
          </h2>
          <p className="text-[12px] md:text-[14px] tracking-wider relative z-10 hover:text-gray-300 transition-colors duration-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed
            nulla integer in pellentesque tortor semper elementum. Felis.
          </p>
          
          <a
            href="https://play.google.com/store/apps/details?id=your.app.package"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-sm md:text-base font-medium px-8 sm:px-4 md:px-6 py-2 md:py-3 rounded-3xl mt-4 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer w-fit max-w-full sm:max-w-[200px] relative z-10 transform "
            style={{ background: "var(--color-dark)" }}
          >
            <img
              src={playStoreIcon}
              alt="Play Store Icon"
              className="w-5 h-5 flex-shrink-0 hover:rotate-12 transition-transform duration-300"
            />
            <span className="whitespace-nowrap">PLAY STORE</span>
          </a>
          
          <img
            src={phoneImg2}
            alt="Phone Image"
            className="mx-auto mt-10 w-[20rem] transition-all duration-700  relative z-10 animate-pulse"
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

      

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out 0.2s both;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out 0.4s both;
        }

    
      `}</style>
    </div>
  );
};

export default DownloadApp;