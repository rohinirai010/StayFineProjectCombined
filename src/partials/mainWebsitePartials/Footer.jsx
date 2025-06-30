import React from "react";
import mainLogo from "../../images/AuthLogo.png";
import instaIcon from "../../images/mainWebsiteImages/instaIcon.svg"
import facebookIcon from "../../images/mainWebsiteImages/facebookIcon.svg"
import linkedinIcon from "../../images/mainWebsiteImages/linkedinIcon.svg"
import appleIcon from "../../images/mainWebsiteImages/AppleIcon.svg"
import playStoreIcon from "../../images/mainWebsiteImages/playStoreIcon.svg"

const Footer = () => {
  return (
    <>
      <div
        className="px-6 sm:px-8 md:px-10 lg:px-20 xl:px-30 pt-10 pb-6 relative overflow-hidden"
        style={{ background: "var(--color-dark)" }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Top section with logo and social icons */}
        <div className="flex flex-row items-center justify-between mb-12 relative z-10 animate-fade-in-down">
          <img
            src={mainLogo}
            alt="Main Logo"
            className="w-[7rem] sm:w-[9rem] h-14 sm:h-16 hover:scale-110 transition-transform duration-300 ease-out"
          />

          {/* social media section */}
          <div className="flex flex-row gap-3">
            <div className="bg-gray-400 p-1.5 sm:p-2 rounded-full hover:bg-pink-900 transition-all duration-300 hover:scale-110 hover:rotate-12 cursor-pointer transform">
              <img src={instaIcon} alt="" className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </div>
            <div className="bg-gray-400 p-1.5 sm:p-2 rounded-full hover:bg-blue-600 transition-all duration-300 hover:scale-110 hover:rotate-12 cursor-pointer transform" style={{ animationDelay: '0.1s' }}>
              <img src={facebookIcon} alt="" className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </div>
            <div className="bg-gray-400 p-1.5 sm:p-2 rounded-full hover:bg-blue-300 transition-all duration-300 hover:scale-110 hover:rotate-12 cursor-pointer transform" style={{ animationDelay: '0.2s' }}>
              <img src={linkedinIcon} alt="" className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </div>
          </div>
        </div>

        {/* Main content section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-0 relative z-10">
          
          {/* Menu Section */}
          <div className="flex flex-col animate-fade-in-left">
            <h3 className="text-white text-lg font-semibold mb-4 tracking-wider hover:text-gray-200 transition-colors duration-300">MENU</h3>
            <div className="w-full h-[0.5px] animate-expand-width" style={{ background: "var(--color-white)" }}></div>
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 mt-6">
              <div className="flex flex-col gap-4">
                <a href="#" className="text-white text-sm hover:text-gray-300 transition-all duration-300 hover:translate-x-2 hover:scale-105 transform">HOME</a>
                <a href="#" className="text-white text-sm hover:text-gray-300 transition-all duration-300 hover:translate-x-2 hover:scale-105 transform" style={{ animationDelay: '0.1s' }}>ABOUT</a>
                <a href="#" className="text-white text-sm hover:text-gray-300 transition-all duration-300 hover:translate-x-2 hover:scale-105 transform" style={{ animationDelay: '0.2s' }}>PRICING</a>
              </div>
              <div className="flex flex-col gap-4">
                <a href="#" className="text-white text-sm hover:text-gray-300 transition-all duration-300 hover:translate-x-2 hover:scale-105 transform" style={{ animationDelay: '0.3s' }}>TOKENS</a>
                <a href="#" className="text-white text-sm hover:text-gray-300 transition-all duration-300 hover:translate-x-2 hover:scale-105 transform" style={{ animationDelay: '0.4s' }}>BLOG</a>
                <a href="#" className="text-white text-sm hover:text-gray-300 transition-all duration-300 hover:translate-x-2 hover:scale-105 transform" style={{ animationDelay: '0.5s' }}>CONTACT US</a>
              </div>
            </div>
          </div>

          {/* Download App Section */}
          <div className="bg-[#E20C88]/10 backdrop-blur-xs rounded-4xl p-8 max-w-md hover:bg-[#E20C88]/20 transition-all duration-500  hover:shadow-2xl transform animate-fade-in-right">
            <h3 className="text-white text-lg font-semibold mb-3 hover:text-gray-200 transition-colors duration-300">DOWNLOAD OUR APPLICATION</h3>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed hover:text-gray-200 transition-colors duration-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nulla integer
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg transform hover:-translate-y-1" style={{ background: "var(--color-primary)" }}>
                <img src={appleIcon} alt="Apple Icon" className="w-5 h-5 flex-shrink-0 hover:rotate-12 transition-transform duration-300" /> 
                APP STORE
              </button>
              <button className="px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg transform hover:-translate-y-1" style={{ background: "var(--color-primary)", animationDelay: '0.1s' }}>
                <img src={playStoreIcon} alt="Play Store Icon" className="w-5 h-5 flex-shrink-0 hover:rotate-12 transition-transform duration-300" /> 
                PLAY STORE
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-6 border-t border-gray-500 relative z-10 animate-fade-in-up">
          <p className="text-gray-400 text-sm hover:text-gray-300 transition-colors duration-300">All rights reserved</p>
        </div>

        <style jsx>{`
          @keyframes fade-in-down {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fade-in-left {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fade-in-right {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes expand-width {
            from {
              width: 0;
            }
            to {
              width: 100%;
            }
          }

          .animate-fade-in-down {
            animation: fade-in-down 0.8s ease-out;
          }

          .animate-fade-in-left {
            animation: fade-in-left 1s ease-out 0.2s both;
          }

          .animate-fade-in-right {
            animation: fade-in-right 1s ease-out 0.4s both;
          }

          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out 0.6s both;
          }

          .animate-expand-width {
            animation: expand-width 1.2s ease-out 0.8s both;
          }
        `}</style>
      </div>
    </>
  );
};

export default Footer;