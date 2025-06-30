import React from "react";
import { ArrowTrendingUpIcon, UsersIcon, DocumentIcon, VideoCameraIcon, CurrencyRupeeIcon, CubeIcon } from "@heroicons/react/24/outline";

const SummaryCards = () => {
  // Dummy data for the summary cards
  const summaryData = [
    {
      title: "Total Clients",
      value: 2453,
      subtitle: "All clients registered",
      icon: <UsersIcon className="h-5 sm:h-7 w-5 sm:w-7" />,
      color: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300",
      link: "/clients"
    },
    {
      title: "Active Today",
      value: 134,
      subtitle: "Logged in today",
      icon: <ArrowTrendingUpIcon className="h-5 sm:h-7 w-5 sm:w-7" />,
      color: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-300",
      link: "/active-clients"
    },
    {
      title: "Projects Created",
      value: 58,
      subtitle: "New software built today",
      icon: <CubeIcon className="h-5 sm:h-7 w-5 sm:w-7" />,
      color: "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300",
      link: "/projects"
    },
    {
      title: "PDFs Made Today",
      value: 89,
      subtitle: "PDFs created using templates",
      icon: <DocumentIcon className="h-5 sm:h-7 w-5 sm:w-7" />,
      color: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-300",
      link: "/pdfs"
    },
    {
      title: "Videos Rendered",
      value: 26,
      subtitle: "Auto-generated plan videos",
      icon: <VideoCameraIcon className="h-5 sm:h-7 w-5 sm:w-7" />,
      color: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300",
      link: "/videos"
    },
    {
      title: "Revenue Today",
      value: "₹21,700",
      subtitle: "Today's earned amount",
      icon: <CurrencyRupeeIcon className="h-5 sm:h-7 w-5 sm:w-7" />,
      color: "bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-300",
      link: "/revenue"
    }
  ];

  return (
    <div className="mb-4">
      <h2 className="text-base font-medium text-gray-700 dark:text-gray-200 mb-2">Dashboard Overview</h2>
      <div className="grid grid-cols-2  lg:grid-cols-3 xl:grid-cols-6 gap-2 sm:gap-3">
        {summaryData.map((card, index) => (
          <a 
            href={card.link} 
            key={index} 
            className="group bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-3 border border-gray-100 dark:border-gray-700 flex flex-col"
          >
            <div className="flex justify-between items-center">
              <div className={`${card.color} p-[6px] sm:p-2 rounded-lg`}>
                {card.icon}
              </div>
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                Today
              </span>
            </div>
            <div className="mt-2 sm:mt-3">
              <h3 className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white">{card.value}</h3>
              <p className="text-[13px] sm:text-sm text-gray-500 dark:text-gray-400 mt-1">{card.subtitle}</p>
            </div>
            <h4 className="mt-2 text-[13px] sm:text-sm font-medium text-gray-700 dark:text-gray-300">{card.title}</h4>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SummaryCards;