
import React from "react";

const RewardsSectionCommonComponent = ({
  icon,
  title,
  description,
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Icon */}
      <div className="flex-shrink-0">
        <div className="w-8 md:w-10 h-8 md:h-10 rounded-xl  flex items-center justify-center" style={{ background: "var(--color-dark)" }}>
            <img src={icon} alt="" className="w-5 md:w-7 h-5 md:h-7" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="font-medium text-sm mb-1" style={{      color: "var(--color-dark)"}}>
          {title}
        </h3>
        {description && (
          <p className="text-gray-400 text-xs leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default RewardsSectionCommonComponent;
