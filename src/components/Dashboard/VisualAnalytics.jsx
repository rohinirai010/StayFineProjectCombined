import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const VisualAnalytics = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Dummy data for the Monthly Usage Graph
  const monthlyUsageData = [
    { name: "Jan", PDFs: 65, Videos: 40, Software: 24 },
    { name: "Feb", PDFs: 59, Videos: 30, Software: 28 },
    { name: "Mar", PDFs: 80, Videos: 45, Software: 29 },
    { name: "Apr", PDFs: 81, Videos: 39, Software: 40 },
    { name: "May", PDFs: 56, Videos: 48, Software: 21 },
    { name: "Jun", PDFs: 55, Videos: 69, Software: 22 },
    { name: "Jul", PDFs: 40, Videos: 30, Software: 43 },
    { name: "Aug", PDFs: 75, Videos: 37, Software: 30 },
    { name: "Sep", PDFs: 88, Videos: 40, Software: 41 },
    { name: "Oct", PDFs: 89, Videos: 26, Software: 58 },
    { name: "Nov", PDFs: 58, Videos: 35, Software: 72 },
    { name: "Dec", PDFs: 90, Videos: 55, Software: 48 }
  ];

  // Dummy data for the Revenue Trend
  const revenueData = [
    { day: "1", revenue: 12500 },
    { day: "3", revenue: 14000 },
    { day: "5", revenue: 25000 },
    { day: "7", revenue: 18000 },
    { day: "9", revenue: 22000 },
    { day: "11", revenue: 19500 },
    { day: "13", revenue: 17800 },
    { day: "15", revenue: 24700 },
    { day: "17", revenue: 15600 },
    { day: "19", revenue: 19300 },
    { day: "21", revenue: 21900 },
    { day: "23", revenue: 28400 },
    { day: "25", revenue: 24100 },
    { day: "27", revenue: 21700 },
    { day: "29", revenue: 23500 }
  ];

  // Dummy data for the Geo Heatmap
  const geoData = [
    { country: "India", users: 1247, flag: "🇮🇳", intensity: 95 },
    { country: "USA", users: 342, flag: "🇺🇸", intensity: 65 },
    { country: "UAE", users: 289, flag: "🇦🇪", intensity: 55 },
    { country: "UK", users: 187, flag: "🇬🇧", intensity: 35 },
    { country: "Australia", users: 134, flag: "🇦🇺", intensity: 25 }
  ];

  const getIntensityColor = (intensity) => {
    if (intensity > 80) return "bg-green-500";
    if (intensity > 60) return "bg-green-400";
    if (intensity > 40) return "bg-green-300";
    if (intensity > 20) return "bg-green-200";
    return "bg-green-100";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div 
        className={`flex justify-between items-center pt-4 px-4  cursor-pointer ${isExpanded ? "pb-0" : "pb-4"}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-[16px] sm:text-lg font-medium text-gray-700 dark:text-gray-200">Visual Analytics</h2>
        {isExpanded ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
        )}
      </div>
      
      {isExpanded && (
        <div className="p-2 sm:p-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Monthly Usage Graph */}
            <div className="md:col-span-6 bg-gray-50 dark:bg-gray-900 py-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 px-4">Monthly Usage Graph</h3>
              <div className="h-64 w-full pr-4 ">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyUsageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.1} />
                    <XAxis dataKey="name" tick={{ fill: '#6B7280' }} />
                    <YAxis tick={{ fill: '#6B7280' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: 'none',
                        borderRadius: '0.375rem',
                        color: '#F9FAFB'
                      }} 
                    />
                    <Bar dataKey="PDFs" name="PDFs" fill="#3B82F6" />
                    <Bar dataKey="Videos" name="Videos" fill="#10B981" />
                    <Bar dataKey="Software" name="Software" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center mt-2 space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">PDFs</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Videos</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Software</span>
                </div>
              </div>
            </div>
            
            {/* Revenue Trend */}
            <div className="md:col-span-6 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Revenue Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.1} />
                    <XAxis dataKey="day" tick={{ fill: '#6B7280' }} />
                    <YAxis tick={{ fill: '#6B7280' }} />
                    <Tooltip 
                      formatter={(value) => [`₹${value}`, 'Revenue']}
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: 'none',
                        borderRadius: '0.375rem',
                        color: '#F9FAFB'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#10B981" 
                      strokeWidth={3} 
                      dot={{ fill: '#059669', strokeWidth: 2 }} 
                      activeDot={{ r: 6, fill: '#10B981' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                Daily revenue over the month (in ₹)
              </div>
            </div>
          </div>
          
          {/* Geo Heatmap */}
          <div className="mt-3 bg-gray-50 dark:bg-gray-900 p-2 sm:p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Geo Heatmap</h3>
            <div className="overflow-hidden">
              <div className="flex flex-col space-y-2">
                {geoData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-lg sm:text-xl mr-2">{item.flag}</span>
                      <span className="font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base">{item.country}</span>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{item.users} users</span>
                      <div className="w-20 sm:w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-2.5">
                        <div 
                          className={`h-2 sm:h-2.5 rounded-full ${getIntensityColor(item.intensity)}`} 
                          style={{ width: `${item.intensity}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualAnalytics;