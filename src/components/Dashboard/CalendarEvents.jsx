import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, CalendarIcon } from "@heroicons/react/24/outline";

const CalendarEvents = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Dummy data for calendar events
  const events = [
    {
      id: 1,
      title: "Client demo",
      time: "6:00 PM",
      date: "Today",
      type: "meeting",
      client: "TechSolutions Inc.",
      link: "/calendar/events/1"
    },
    {
      id: 2,
      title: "Payment follow-up",
      time: "11:00 AM",
      date: "Tomorrow",
      type: "task",
      client: "GlobalVision Ltd.",
      link: "/calendar/events/2"
    },
    {
      id: 3,
      title: "Feature rollout",
      time: "2:00 PM",
      date: "Saturday",
      type: "milestone",
      project: "Video Engine 2.0",
      link: "/calendar/events/3"
    },
    {
      id: 4,
      title: "Team meeting",
      time: "10:00 AM",
      date: "Monday",
      type: "meeting",
      project: "All Teams",
      link: "/calendar/events/4"
    }
  ];

  const getEventTypeIcon = (type) => {
    switch (type) {
      case "meeting":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        );
      case "task":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
          </svg>
        );
      case "milestone":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path>
          </svg>
        );
      default:
        return <CalendarIcon className="w-4 h-4" />;
    }
  };

  const getEventTypeBg = (type) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300";
      case "task":
        return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300";
      case "milestone":
        return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div 
        className="flex justify-between items-center p-3 sm:p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-[16px] sm:text-lg font-medium text-gray-700 dark:text-gray-200">Calendar Events</h2>
        {isExpanded ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
        )}
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="space-y-2 sm:space-y-3">
            {events.map((event) => (
              <a 
                key={event.id}
                href={event.link}
                className="block p-2 border border-gray-100 dark:border-gray-700 rounded-lg hover:border-gray-200 dark:hover:border-gray-600 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg mr-3 ${getEventTypeBg(event.type)}`}>
                      {getEventTypeIcon(event.type)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-white text-sm">{event.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {event.date}, {event.time}
                      </p>
                      {event.client && (
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                          {event.client}
                        </p>
                      )}
                      {event.project && (
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                          {event.project}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="text-xs font-medium capitalize px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    {event.type}
                  </span>
                </div>
              </a>
            ))}
          </div>
          
          <div className="mt-3 text-center">
            <a href="/calendar" className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
              View full calendar
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarEvents;