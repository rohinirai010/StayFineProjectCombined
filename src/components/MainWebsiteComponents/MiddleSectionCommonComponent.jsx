import React from "react";

const MiddleSectionCommonComponent = ({
  icon,
  title,
  description,
  className = "",
}) => {
  return (
    <div
      className={`px-6 md:px-4 xl:px-6 py-8 md:py-4 xl:py-8 shadow-2xl flex flex-col justify-center rounded-4xl ${className}`}
      style={{ background: "var(--color-dark)" }}
    >
      {/* Icon */}
      <div className="mb-2 xl:mb-5">
        <div
          className="w-14 md:w-8 xl:w-14 h-14 md:h-8 xl:h-14  rounded-xl flex items-center justify-center"
          style={{ background: "var(--color-primary)" }}
        >
          <img src={icon} alt="" className="w-8 md:w-5 xl:w-8 h-8 md:h-5 xl:h-8" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg md:text-[14px] xl:text-lg font-bold mb-2 xl:mb-3 uppercase tracking-wide">
        {title}
      </h3>

      {/* Description */}
      <p className="text-purple-100 text-sm md:text-[12px] xl:text-sm leading-relaxed opacity-90">
        {description}
      </p>
    </div>
  );
};

export default MiddleSectionCommonComponent;
