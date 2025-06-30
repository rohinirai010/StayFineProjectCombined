import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, ExclamationTriangleIcon, TicketIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

const SupportAlerts = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('tickets');

  // Dummy data for support and alerts
  const supportData = {
    tickets: [
      { id: 1, title: "Payment gateway error", priority: "urgent", time: "2h", user: "Vikram S." },
      { id: 2, title: "PDF rendering issue", priority: "urgent", time: "4h", user: "Priya M." },
      { id: 3, title: "Account access problem", priority: "normal", time: "24h", user: "Rahul K." },
      { id: 4, title: "Video quality concern", priority: "normal", time: "24h", user: "Neha T." }
    ],
    systemAlerts: [
      { id: 1, title: "PDF generation failed", status: "auto-restarted", time: "30m" },
      { id: 2, title: "Video rendering timeout", status: "auto-restarted", time: "2h" }
    ],
    feedback: [
      { id: 1, issue: "PDF delay", count: 3, time: "Today" },
      { id: 2, issue: "Dashboard slow", count: 1, time: "Yesterday" }
    ]
  };

  const getPriorityColor = (priority) => {
    return priority === "urgent" ? "text-red-500" : "text-yellow-500";
  };

  const getSummary = () => {
    const urgentTickets = supportData.tickets.filter(t => t.priority === "urgent").length;
    const totalIssues = supportData.tickets.length + supportData.systemAlerts.length + 
      supportData.feedback.reduce((total, item) => total + item.count, 0);
    
    return `${totalIssues} issues (${urgentTickets} urgent)`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div 
        className="flex justify-between items-center p-2 sm:p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <h2 className="text-[16px] sm:text-lg font-medium text-gray-700 dark:text-gray-200">Support & Alerts</h2>
          <span className="text-[9px] sm:text-xs bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 px-[5px] sm:px-2 py-0.5 rounded-full">
            {getSummary()}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUpIcon className="h-3 sm:h-4 w-3 sm:w-4 text-gray-500" />
        ) : (
          <ChevronDownIcon className="h-3 sm:h-4 w-3 sm:w-4 text-gray-500" />
        )}
      </div>
      
      {isExpanded && (
        <div className="px-3 pb-3">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-2">
            <button
              className={`px-[6px] sm:px-3 py-2 text-xs font-medium ${
                activeTab === 'tickets' 
                  ? 'text-blue-600 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('tickets')}
            >
              <div className="flex items-center text-[12px] sm:text-sm">
                <TicketIcon className="h-[14px] sm:h-4w-[14px] sm:w-4 mr-[1px] sm:mr-2" />
                Tickets ({supportData.tickets.length})
              </div>
            </button>
            <button
              className={`px-[6px] sm:px-3 py-2 text-xs font-medium ${
                activeTab === 'alerts' 
                  ? 'text-blue-600 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('alerts')}
            >
              <div className="flex items-center text-[12px] sm:text-sm">
                <ExclamationTriangleIcon className="h-[14px] sm:h-4w-[14px] sm:w-4 mr-[1px] sm:mr-2" />
                System ({supportData.systemAlerts.length})
              </div>
            </button>
            <button
              className={`px-[6px] sm:px-3 py-2 text-xs font-medium ${
                activeTab === 'feedback' 
                  ? 'text-blue-600 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('feedback')}
            >
              <div className="flex items-center text-[12px] sm:text-sm">
                <ChatBubbleLeftRightIcon className="h-[14px] sm:h-4w-[14px] sm:w-4 mr-[1px] sm:mr-2" />
                Feedback ({supportData.feedback.reduce((total, item) => total + item.count, 0)})
              </div>
            </button>
          </div>
          
          {/* Content based on active tab */}
          {activeTab === 'tickets' && (
            <div className="space-y-[2px]">
              {supportData.tickets.map((ticket) => (
                <a
                  key={ticket.id}
                  href={`/support/tickets/${ticket.id}`}
                  className="flex justify-between items-center p-1.5 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md text-xs"
                >
                  <div className="flex items-center space-x-2">
                    <span className={`h-2 w-2 rounded-full ${ticket.priority === 'urgent' ? 'bg-red-500' : 'bg-yellow-500'}`}></span>
                    <p className="text-gray-800 dark:text-gray-200 truncate max-w-xs text-xs">{ticket.title}</p>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <span>{ticket.time}</span>
                    <span className="text-gray-400">|</span>
                    <span>{ticket.user}</span>
                  </div>
                </a>
              ))}
            </div>
          )}
          
          {activeTab === 'alerts' && (
            <div className="space-y-1">
              {supportData.systemAlerts.map((alert) => (
                <a
                  key={alert.id}
                  href={`/system/logs/${alert.id}`}
                  className="flex justify-between items-center p-1.5 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md text-xs"
                >
                  <p className="text-gray-800 dark:text-gray-200 truncate max-w-xs">{alert.title}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500 text-xs">{alert.status}</span>
                    <span className="text-gray-500">{alert.time}</span>
                  </div>
                </a>
              ))}
            </div>
          )}
          
          {activeTab === 'feedback' && (
            <div className="space-y-1">
              {supportData.feedback.map((item) => (
                <a
                  key={item.id}
                  href={`/feedback/${item.issue.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex justify-between items-center p-1.5 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md text-xs"
                >
                  <p className="text-gray-800 dark:text-gray-200">"{item.issue}"</p>
                  <div className="flex items-center space-x-2">
                    <span className="bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-300 px-1.5 py-0.5 rounded-full">
                      {item.count} clients
                    </span>
                    <span className="text-gray-500">{item.time}</span>
                  </div>
                </a>
              ))}
            </div>
          )}
          
          <div className="mt-2 text-center">
            <a href="/support" className="text-sm font-medium tracking-wide text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
              View all issues
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportAlerts;