import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, ClockIcon } from "@heroicons/react/24/outline";

const ActivityFeed = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Dummy data for the activity feed
  const activityData = [
    { 
      id: 1, 
      time: "3 mins ago", 
      message: "John Patel generated a PDF", 
      icon: "document",
      user: "John Patel",
      action: "generated a PDF",
      link: "/pdfs/recent"
    },
    { 
      id: 2, 
      time: "10 mins ago", 
      message: "Anita created new MLM software", 
      icon: "code",
      user: "Anita",
      action: "created new MLM software",
      link: "/projects/mlm"
    },
    { 
      id: 3, 
      time: "1:45 PM", 
      message: "3 videos rendered", 
      icon: "video",
      user: "System",
      action: "3 videos rendered",
      link: "/videos/recent"
    },
    { 
      id: 4, 
      time: "11:00 AM", 
      message: "Admin updated withdrawal condition", 
      icon: "settings",
      user: "Admin",
      action: "updated withdrawal condition",
      link: "/settings/withdrawal"
    },
   
  ];

  const renderIcon = (iconType) => {
    switch (iconType) {
      case "document":
        return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>;
      case "code":
        return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>;
      case "video":
        return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>;
      case "settings":
        return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>;
      case "shopping":
        return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>;
      case "server":
        return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>;
      default:
        return <ClockIcon className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div 
        className="flex justify-between items-center p-2 sm:p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-[16px] sm:text-lg font-medium text-gray-700 dark:text-gray-200">Activity Feed</h2>
        {isExpanded ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
        )}
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
            
            {/* Activity items */}
            <div className="sm:space-y-2">
              {activityData.map((activity) => (
                <a 
                  key={activity.id} 
                  href={activity.link}
                  className="relative flex group pl-10 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors duration-150"
                >
                  {/* Icon */}
                  <div className="absolute left-0 p-1 bg-white dark:bg-gray-800 rounded-full border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                    {renderIcon(activity.icon)}
                  </div>
                  
                  {/* Content */}
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span className="font-medium text-[14px] sm:text-base text-gray-800 dark:text-white">{activity.user}</span>
                      <span className="ml-2 text-[12px] sm:text-base text-gray-600 dark:text-gray-300">{activity.action}</span>
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500">{activity.time}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <a href="/activity" className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
              View all activity
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;