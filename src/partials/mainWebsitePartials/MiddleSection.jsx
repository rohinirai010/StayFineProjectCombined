import React from "react";
import phoneImg from "../../images/mainWebsiteImages/phoneImg.svg";
import MiddleSectionCommonComponent from "../../components/MainWebsiteComponents/MiddleSectionCommonComponent";
import middleSecArrowIcon from "../../images/mainWebsiteImages/middleSecArrowIcon.svg";
import middleSecIcon2 from "../../images/mainWebsiteImages/middleSecIcon2.svg";
import middleSecIcon3 from "../../images/mainWebsiteImages/middleSecIcon3.svg";
import middleSecIcon4 from "../../images/mainWebsiteImages/middleSecIcon4.svg";
import middleSectionBgSpot from "../../images/mainWebsiteImages/middleSecBgSpot.svg";
import { PrimaryButton } from "../../components/MainWebsiteComponents/ButtonsComponent";

const MiddleSection = () => {
  return (
    <div className="px-6 sm:px-8 md:px-10 lg:px-20 xl:px-30 pt-18 sm:pt-32 relative">
      <div className="flex flex-col gap-2 items-start sm:items-center animate-fade-in-up">
        <h1 className="text-[30px] sm:text-[36px] font-bold" style={{color: "var(--color-primary)"}}>Build your crypto portfolio</h1>
        <p className="text-[13px] sm:text-[14.5px] tracking-wide sm:text-center" style={{color: "var(--color-dark)"}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />{" "}
          Feugiat nulla suspendisse tortor aene.
        </p>
      </div>
      <img
        src={middleSectionBgSpot}
        alt=""
        className="absolute -z-10 top-28 md:-top-8  right-0 sm:w-[60rem]  "
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-y-6 md:gap-y-4 xl:gap-y-6 md:gap-x-4 xl:gap-x-6 mt-12 md:mt-18">
        <div className="grid grid-cols-1 gap-y-6 md:gap-y-4 xl:gap-y-6 animate-fade-in-left">
          <MiddleSectionCommonComponent
            icon={middleSecArrowIcon}
            title="Send & Receive"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat nulla suspendisse tortor aene."
          />
          <MiddleSectionCommonComponent
            icon={middleSecIcon2}
            title="100% Secure Wallet"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat nulla suspendisse tortor aene."
          />
        </div>
        <div
          className="col-span-2 flex flex-col gap-1 rounded-4xl px-6 sm:px-10 pt-6 sm:pt-8 animate-fade-in-up transition-transform duration-300 ease-in-out"
          style={{ background: "var(--color-primary)" }}
        >
          <h2 className="text-[26px] font-semibold tracking-wide">
            iOS & ANDROID APP
          </h2>
          <p className="text-[14px] tracking-wider">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet,
            morbi non at sed neque.
          </p>

          <img
            src={phoneImg}
            alt="Phone Image"
            className="mx-auto mt-6 w-[20rem]"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 animate-fade-in-right">
          <MiddleSectionCommonComponent
            icon={middleSecIcon3}
            title="Trading Charts"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat nulla suspendisse tortor aene."
          />
          <MiddleSectionCommonComponent
            icon={middleSecIcon4}
            title="Real Time Trading"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat nulla suspendisse tortor aene."
          />
        </div>
      </div>

      <div className="flex justify-center mt-6 sm:mt-10 animate-fade-in-up">
        <PrimaryButton onClick={() => alert("Primary action!")}>
          DOWNLOAD APP
        </PrimaryButton>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out 0.2s both;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out 0.4s both;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default MiddleSection;