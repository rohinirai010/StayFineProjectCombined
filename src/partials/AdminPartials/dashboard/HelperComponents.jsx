import { ArrowDownRight, ArrowRight, ArrowUpRight, MinusIcon } from "lucide-react";
import { Link } from "react-router-dom";

// Helper Components
export const MetricCard = ({
  title,
  value,
  icon,
  trend,
  trendUp,
  category,
  link
}) => {
  // Category-based styling
  const categoryStyles = {
    team: {
      iconColor: "text-indigo-600 dark:text-indigo-400",
      bgLight: "from-indigo-50 to-white/80",
      bgDark: "dark:from-indigo-950/30 dark:to-gray-900/40",
      ringLight: "ring-indigo-100",
      ringDark: "dark:ring-indigo-900/20",
      accentColor: "text-indigo-600 dark:text-indigo-400",
      iconBgLight: "bg-indigo-100/70",
      iconBgDark: "dark:bg-indigo-900/30",
    },
    referrals: {
      iconColor: "text-emerald-600 dark:text-emerald-400",
      bgLight: "from-emerald-50 to-white/80",
      bgDark: "dark:from-emerald-950/30 dark:to-gray-900/40",
      ringLight: "ring-emerald-100",
      ringDark: "dark:ring-emerald-900/20",
      accentColor: "text-emerald-600 dark:text-emerald-400",
      iconBgLight: "bg-emerald-100/70",
      iconBgDark: "dark:bg-emerald-900/30",
    },
    deposit: {
      iconColor: "text-blue-600 dark:text-blue-400",
      bgLight: "from-blue-50 to-white/80",
      bgDark: "dark:from-blue-950/30 dark:to-gray-900/40",
      ringLight: "ring-blue-100",
      ringDark: "dark:ring-blue-900/20",
      accentColor: "text-blue-600 dark:text-blue-400",
      iconBgLight: "bg-blue-100/70",
      iconBgDark: "dark:bg-blue-900/30",
    },
    withdrawal: {
      iconColor: "text-violet-600 dark:text-violet-400",
      bgLight: "from-violet-50 to-white/80",
      bgDark: "dark:from-violet-950/30 dark:to-gray-900/40",
      ringLight: "ring-violet-100",
      ringDark: "dark:ring-violet-900/20",
      accentColor: "text-violet-600 dark:text-violet-400",
      iconBgLight: "bg-violet-100/70",
      iconBgDark: "dark:bg-violet-900/30",
    },
  };

  const style = categoryStyles[category];

  

  return (
    <div
      className={`bg-gradient-to-br ${style.bgLight} ${style.bgDark} rounded-xl p-3 shadow-sm ring-1 ${style.ringLight} ${style.ringDark} backdrop-blur-sm transition-all hover:shadow-md hover:scale-[1.01]`}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </div>
          <div className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
            {value}
          </div>
          
        </div>
        <div
          className={`p-1 rounded-lg ${style.iconBgLight} ${style.iconBgDark}`}
        >
          <div className={style.iconColor}>{icon}</div>
        </div>
      </div>
      <div className="mt-4">
        <Link
          to={link}
          className={`text-xs ${style.accentColor} flex items-center font-medium transition-all hover:underline`}
        >
          View Details <ArrowRight size={12} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export const WalletCard = ({
  title,
  amount,
  buttonText,
  secondButtonText,
  isHighlighted = false,
}) => {
  return (
    <div
      className={`rounded-xl overflow-hidden shadow-md ${
        isHighlighted
          ? "bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-900"
          : "bg-white dark:bg-gray-800"
      }`}
    >
      <div className="p-5">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          {title}
        </div>
        <div
          className={`text-3xl font-bold ${
            isHighlighted
              ? "text-indigo-600 dark:text-indigo-400"
              : "text-gray-800 dark:text-gray-200"
          }`}
        >
          ${amount}
        </div>
      </div>
      <div className="px-3 pb-3 flex gap-2">
        <button className="flex-1 bg-indigo-600 text-white py-1.5 text-xs font-medium rounded-full hover:bg-indigo-700 transition shadow-sm">
          {buttonText}
        </button>
        {secondButtonText && (
          <button className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-1.5 text-xs font-medium rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition">
            {secondButtonText}
          </button>
        )}
      </div>
    </div>
  );
};

export const TeamInfoCard = ({ title, value, subtitle, icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {title}
          </span>
          {icon}
        </div>
        <div className="text-xl font-bold text-gray-800 dark:text-white">
          {value}
        </div>
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {subtitle}
        </div>
      </div>
    </div>
  );
};

export const SocialCard = ({ title, icon, color, buttonText = "Connect" }) => {
  const bgColors = {
    green: "bg-green-500 dark:bg-green-600",
    blue: "bg-blue-500 dark:bg-blue-600",
    purple: "bg-purple-600 dark:bg-purple-700",
  };

  const buttonGradients = {
    green: "from-green-500 to-green-600 dark:from-green-600 dark:to-green-700",
    blue: "from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800",
    purple:
      "from-purple-600 to-purple-800 dark:from-purple-700 dark:to-purple-900",
  };

  const hoverEffects = {
    green:
      "hover:shadow-lg hover:shadow-green-500/30 dark:hover:shadow-green-600/30",
    blue: "hover:shadow-lg hover:shadow-blue-500/30 dark:hover:shadow-blue-600/30",
    purple:
      "hover:shadow-lg hover:shadow-purple-500/30 dark:hover:shadow-purple-600/30",
  };

  return (
    <div className="bg-gray-800 dark:bg-gray-700 rounded-lg overflow-hidden">
      <div className="p-3">
        <div
          className={`${bgColors[color]} w-10 h-10 rounded-full flex items-center justify-center text-white mx-auto mb-2`}
        >
          {icon}
        </div>
        <h3 className="text-white dark:text-gray-200 text-sm font-medium text-center mb-2">
          {title}
        </h3>

        <button
          className={`w-full bg-gradient-to-r ${buttonGradients[color]} text-white py-1 px-2 rounded-2xl text-xs font-medium transform transition-all duration-300 cursor-pointer ${hoverEffects[color]} hover:-translate-y-0.5 flex items-center justify-center gap-1`}
        >
          <span>{buttonText}</span>
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
