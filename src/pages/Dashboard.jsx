import React, { useState } from "react";
import { Wallet, IndianRupeeIcon } from "lucide-react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [joiningsPeriod, setJoiningsPeriod] = useState("Year");
  const [performanceTab, setPerformanceTab] = useState("Top Earners");
  const [earningsTab, setEarningsTab] = useState("Earnings");
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [hoveredPayout, setHoveredPayout] = useState(null);
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleProfilePanel = () => {
    setIsProfileExpanded(!isProfileExpanded);
  };

  // data
  const userData = {
    name: user?.fullName || "",
    id: user?.username || "",
    membershipPack: user?.membershipPack || "",
    personalUnit: user?.personalUnit || 0,
    groupUnit: user?.groupUnit || 0,
    sponsor: user?.sponsorId || "",
  };

  const teamOverviewData = {
    current: { left: 0, right: 15 },
    carryForward: { left: 5, right: 0 },
    paid: { left: 10, right: 10 },
  };

  const statsData = {
    eWallet: 15.84,
    commission: 71.4,
    totalCredit: 96.4,
    totalDebit: 72.54,
  };

  const stats = [
    {
      label: "E-Wallet",
      value: `₹${statsData.eWallet}`,
      color: "green",
      icon: Wallet,
    },
    {
      label: "Commission",
      value: `₹${statsData.commission}`,
      color: "blue",
      icon: IndianRupeeIcon,
    },
    {
      label: "Total Credit",
      value: `₹${statsData.totalCredit}`,
      color: "purple",
      icon: Wallet,
    },
    {
      label: "Total Debit",
      value: `₹${statsData.totalDebit}`,
      color: "teal",
      icon: IndianRupeeIcon,
    },
  ];

  // Joinings data for different periods
  const joiningsData = {
    Year: [
      { period: "2022", value: 5, displayValue: 5 },
      { period: "2023", value: 12, displayValue: 12 },
      { period: "2024", value: 8, displayValue: 8 },
      { period: "2025", value: 3, displayValue: 3 },
    ],
    Month: [
      { period: "Jul 24", value: 0, displayValue: 0 },
      { period: "Aug 24", value: 2, displayValue: 2 },
      { period: "Sep 24", value: 1, displayValue: 1 },
      { period: "Oct 24", value: 0, displayValue: 0 },
      { period: "Nov 24", value: 0, displayValue: 0 },
      { period: "Dec 24", value: 3, displayValue: 3 },
      { period: "Jan 25", value: 4, displayValue: 4 },
      { period: "Feb 25", value: 2, displayValue: 2 },
      { period: "Mar 25", value: 1, displayValue: 1 },
      { period: "Apr 25", value: 0, displayValue: 0 },
      { period: "May 25", value: 0, displayValue: 0 },
      { period: "Jun 25", value: 1, displayValue: 1 },
    ],
    Day: [
      { period: "Mon", value: 2, displayValue: 2 },
      { period: "Tue", value: 1, displayValue: 1 },
      { period: "Wed", value: 0, displayValue: 0 },
      { period: "Thu", value: 3, displayValue: 3 },
      { period: "Fri", value: 1, displayValue: 1 },
      { period: "Sat", value: 0, displayValue: 0 },
      { period: "Sun", value: 2, displayValue: 2 },
    ],
  };

  const currentJoiningsData = joiningsData[joiningsPeriod];
  const maxValue = Math.max(...currentJoiningsData.map((item) => item.value));

  const newMembers = [
    { name: "Byron", id: "INF0361985", date: "16 Sep 2024", avatar: "B" },
    {
      name: "Sean Skinner",
      id: "INF9076273",
      date: "18 Mar 2023",
      avatar: "S",
    },
    {
      name: "David Andrade",
      id: "INF18536507",
      date: "15 Mar 2023",
      avatar: "D",
    },
    {
      name: "Barbara Duran",
      id: "INF74837484",
      date: "13 Mar 2023",
      avatar: "B",
    },
    {
      name: "Michael Davis",
      id: "INF42341484",
      date: "03 Jan 2023",
      avatar: "M",
    },
  ];

  // Team Performance data
  const teamPerformanceData = {
    "Top Earners": [
      {
        name: "Michael Davis",
        id: "INF42341484",
        value: "₹25.50",
        avatar: "M",
      },
      {
        name: "David Andrade",
        id: "INF18536507",
        value: "₹12.75",
        avatar: "D",
      },
      {
        name: "Corrie Washington",
        id: "INF91850711",
        value: "₹8.50",
        avatar: "C",
      },
      { name: "Jeremy Lee", id: "INF55329858", value: "₹6.80", avatar: "J" },
    ],
    "Top Recruiters": [
      {
        name: "Sarah Johnson",
        id: "INF12345678",
        value: "15 recruits",
        avatar: "S",
      },
      {
        name: "Robert Brown",
        id: "INF87654321",
        value: "12 recruits",
        avatar: "R",
      },
      {
        name: "Emily Wilson",
        id: "INF11223344",
        value: "10 recruits",
        avatar: "E",
      },
      {
        name: "James Taylor",
        id: "INF44332211",
        value: "8 recruits",
        avatar: "J",
      },
    ],
    "Package Overview": [
      { name: "Premium Package", id: "PKG001", value: "45 users", avatar: "P" },
      {
        name: "Standard Package",
        id: "PKG002",
        value: "32 users",
        avatar: "S",
      },
      { name: "Basic Package", id: "PKG003", value: "28 users", avatar: "B" },
      { name: "Starter Package", id: "PKG004", value: "15 users", avatar: "S" },
    ],
  };

  // Earnings & Expenses data
  const earningsExpensesData = {
    Earnings: [
      { label: "Referral", amount: "₹21.25" },
      { label: "Level Commission", amount: "₹26.35" },
      { label: "Binary Commission", amount: "₹23.80" },
      { label: "Matching Bonus", amount: "₹18.90" },
    ],
    Expenses: [
      { label: "Processing Fee", amount: "₹5.25" },
      { label: "Maintenance", amount: "₹12.00" },
      { label: "Tax Deduction", amount: "₹8.50" },
      { label: "Transfer Fee", amount: "₹3.75" },
    ],
  };

  // Payout data
  const payoutData = {
    requested: 17.02,
    approved: 0,
    paid: 26.54,
    rejected: 0,
  };

  const totalPayout =
    payoutData.requested +
    payoutData.approved +
    payoutData.paid +
    payoutData.rejected;
  const paidPercentage =
    totalPayout > 0 ? (payoutData.paid / totalPayout) * 100 : 0;
  const requestedPercentage =
    totalPayout > 0 ? (payoutData.requested / totalPayout) * 100 : 0;

  // Calculate stroke dash arrays and offsets properly
  const circumference = 2 * Math.PI * 60;
  const paidStrokeDasharray = circumference;
  const paidStrokeDashoffset = circumference * (1 - paidPercentage / 100);

  const requestedStrokeDasharray = circumference;
  const requestedStrokeDashoffset =
    circumference * (1 - requestedPercentage / 100);

  return (
    <>
      <div className="w-[100%] flex h-screen bg-gray-50 ">
        {/* Sidebar */}
        <Sidebar
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />

        {/* Main Content */}
        <div
          className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 pb-20 lg:pb-0 ${
            isProfileExpanded ? "lg:w-[60%]" : "w-[80%] lg:w-[80%]"
          }`}
        >
          {/* Header */}
          <Header
            toggleSidebar={toggleSidebar}
            toggleProfilePanel={toggleProfilePanel}
          />

          {/* Dashboard Content */}
          <main className="flex-1 overflow-auto px-4 py-2 relative lg:ml-20  ">
            {/* Welcome message */}
            <div className="pb-2">
              <h2 className="block lg:hidden text-lg font-medium mb-1 mt-1">
                Dashboard
              </h2>
              <p className="text-gray-600 text-[12px] tracking-wide">
                Welcome {userData.name}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2  lg:grid-cols-4 gap-2 md:gap-6 mb-3 md:mb-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-2 sm:p-3 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-medium text-gray-600 mb-1">
                        {stat.label}
                      </p>
                      <p className="text-[19px] font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={`p-2 rounded-lg ${
                        stat.color === "green"
                          ? "bg-green-100"
                          : stat.color === "blue"
                          ? "bg-blue-100"
                          : stat.color === "purple"
                          ? "bg-purple-100"
                          : "bg-teal-100"
                      }`}
                    >
                      <stat.icon
                        className={`w-5 sm:w-6 h-5 sm:h-6 ${
                          stat.color === "green"
                            ? "text-green-600"
                            : stat.color === "blue"
                            ? "text-blue-600"
                            : stat.color === "purple"
                            ? "text-purple-600"
                            : "text-teal-600"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-5 mb-3 lg:mb-4">
              {/* Joinings Chart */}
              <div className="md:col-span-2 bg-white rounded-lg p-3 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[16px] font-semibold">Joinings</h3>
                  <div className="flex space-x-1 text-[13px]">
                    {["Year", "Month", "Day"].map((period) => (
                      <button
                        key={period}
                        onClick={() => setJoiningsPeriod(period)}
                        className={`px-3 py-1 rounded ${
                          joiningsPeriod === period
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="h-64 relative">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 800 240"
                    className="overflow-visible"
                  >
                    {/* Grid lines */}
                    <defs>
                      <pattern
                        id="grid"
                        width="80"
                        height="40"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 80 0 L 0 0 0 40"
                          fill="none"
                          stroke="#f3f4f6"
                          strokeWidth="1"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {/* Y-axis labels */}
                    <text
                      x="10"
                      y="20"
                      className="text-xs fill-gray-400"
                      textAnchor="start"
                    >
                      2
                    </text>
                    <text
                      x="10"
                      y="100"
                      className="text-xs fill-gray-400"
                      textAnchor="start"
                    >
                      1
                    </text>
                    <text
                      x="10"
                      y="180"
                      className="text-xs fill-gray-400"
                      textAnchor="start"
                    >
                      0
                    </text>

                    {/* Chart area */}
                    <g transform="translate(40, 20)">
                      {/* Generate path for the curve */}
                      <path
                        d={(() => {
                          const points = currentJoiningsData.map(
                            (item, index) => {
                              const x =
                                (index / (currentJoiningsData.length - 1)) *
                                720;
                              const y =
                                maxValue > 0
                                  ? 160 - (item.value / maxValue) * 160
                                  : 160;
                              return [x, y];
                            }
                          );

                          // Create smooth curve using quadratic bezier curves
                          let path = `M ${points[0][0]} ${points[0][1]}`;
                          for (let i = 1; i < points.length; i++) {
                            const prevPoint = points[i - 1];
                            const currentPoint = points[i];
                            const controlX =
                              prevPoint[0] +
                              (currentPoint[0] - prevPoint[0]) * 0.5;
                            path += ` Q ${controlX} ${prevPoint[1]} ${currentPoint[0]} ${currentPoint[1]}`;
                          }
                          return path;
                        })()}
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="3"
                        className="drop-shadow-sm"
                      />

                      {/* Fill area under curve */}
                      <path
                        d={(() => {
                          const points = currentJoiningsData.map(
                            (item, index) => {
                              const x =
                                (index / (currentJoiningsData.length - 1)) *
                                720;
                              const y =
                                maxValue > 0
                                  ? 160 - (item.value / maxValue) * 160
                                  : 160;
                              return [x, y];
                            }
                          );

                          let path = `M ${points[0][0]} 160 L ${points[0][0]} ${points[0][1]}`;
                          for (let i = 1; i < points.length; i++) {
                            const prevPoint = points[i - 1];
                            const currentPoint = points[i];
                            const controlX =
                              prevPoint[0] +
                              (currentPoint[0] - prevPoint[0]) * 0.5;
                            path += ` Q ${controlX} ${prevPoint[1]} ${currentPoint[0]} ${currentPoint[1]}`;
                          }
                          path += ` L ${points[points.length - 1][0]} 160 Z`;
                          return path;
                        })()}
                        fill="url(#gradient)"
                        opacity="0.3"
                      />

                      {/* Data points and labels */}
                      {currentJoiningsData.map((item, index) => {
                        const x =
                          (index / (currentJoiningsData.length - 1)) * 720;
                        const y =
                          maxValue > 0
                            ? 160 - (item.value / maxValue) * 160
                            : 160;

                        return (
                          <g key={index}>
                            {/* Data point */}
                            <circle
                              cx={x}
                              cy={y}
                              r="7"
                              fill="#a855f7"
                              stroke="white"
                              strokeWidth="2"
                              className="cursor-pointer hover:r-6 transition-all duration-200"
                              onMouseEnter={() =>
                                setHoveredPoint({
                                  x: x,
                                  y: y,
                                  period: item.period,
                                  value: item.value,
                                })
                              }
                              onMouseLeave={() => setHoveredPoint(null)}
                            />

                            {/* Value label with background - only show for non-zero values */}
                            {item.value > 0 && (
                              <>
                                <rect
                                  x={x - 12}
                                  y={y - 25}
                                  width="24"
                                  height="16"
                                  fill="#7c3aed"
                                  rx="8"
                                />
                                <text
                                  x={x}
                                  y={y - 15}
                                  className="text-xs fill-white font-medium"
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                >
                                  {item.displayValue}
                                </text>
                              </>
                            )}

                            {/* X-axis label */}
                            <text
                              x={x}
                              y="185"
                              className="text-xs fill-gray-500"
                              textAnchor="middle"
                            >
                              {item.period}
                            </text>
                          </g>
                        );
                      })}
                    </g>

                    {/* Gradient definition */}
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#a855f7"
                          stopOpacity="0.8"
                        />
                        <stop
                          offset="100%"
                          stopColor="#a855f7"
                          stopOpacity="0.1"
                        />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Tooltip - Fixed positioning */}
                  {hoveredPoint && (
                    <div
                      className="absolute bg-gray-800/90 text-white px-2 py-1 rounded-lg shadow-lg pointer-events-none z-10 text-[10px]"
                      style={{
                        left: `${(hoveredPoint.x / 720) * 100}%`,
                        top: `${((hoveredPoint.y + 20) / 240) * 100}%`,
                        transform: "translate(-50%, -100%)",
                      }}
                    >
                      <div className="text-center">
                        <div className="font-medium">{hoveredPoint.period}</div>
                        <div className="text-purple-200">
                          {hoveredPoint.value}
                        </div>
                      </div>
                      {/* Tooltip arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* New Members */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-[16px] font-semibold mb-3">New Members</h3>
                <div className="space-y-3">
                  {newMembers.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-medium">
                            {member.avatar}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-[13px]">
                            {member.name}
                          </p>
                          <p className="text-[11px] text-gray-500">
                            {member.id}
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] text-gray-500">
                        {member.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-5">
              {/* Team Performance */}
              <div className="md:col-span-2 bg-white rounded-lg p-3 shadow-sm">
                <h3 className="text-[16px] font-semibold mb-3">
                  Team Performance
                </h3>

                <div className="flex space-x-2 sm:space-x-4 mb-4">
                  {Object.keys(teamPerformanceData).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setPerformanceTab(tab)}
                      className={`text-[11.8px] sm:text-[12px] font-medium ${
                        performanceTab === tab
                          ? "text-purple-600 border-b-2 border-purple-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="space-y-3">
                  {teamPerformanceData[performanceTab].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-7 h-7 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-medium">
                            {item.avatar}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-[13px]">{item.name}</p>
                          <p className="text-[11px] text-gray-500">{item.id}</p>
                        </div>
                      </div>
                      <span className="text-green-600 font-medium text-[13px]">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Earnings and Expenses */}
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <h3 className="text-[16px] font-semibold mb-3">
                  Earning & Expenses
                </h3>
                <div className="flex space-x-4 mb-4">
                  {Object.keys(earningsExpensesData).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setEarningsTab(tab)}
                      className={`text-[12px] font-medium ${
                        earningsTab === tab
                          ? "text-purple-600 border-b-2 border-purple-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="space-y-3">
                  {earningsExpensesData[earningsTab].map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600 text-sm">
                        {item.label}
                      </span>
                      <span
                        className={`font-medium text-sm ${
                          earningsTab === "Earnings"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {item.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="hidden lg:block bg-white border-t p-4 text-center lg:ml-24">
            <p className="text-sm text-gray-500">
              Copyright @ All right reserved. 2025
            </p>
          </footer>
        </div>

        {/* Right Profile Panel */}
        <div
          className={`fixed lg:relative top-0 right-0 h-full bg-white shadow-lg z-50 transition-all duration-300 ${
            isProfileExpanded
              ? "w-[85%] sm:w-[60%] md:w-[40%] lg:w-[20%] translate-x-0"
              : "w-[85%] sm:w-[60%] md:w-[40%] lg:w-[20%] translate-x-full lg:translate-x-0"
          } ${isProfileExpanded ? "lg:block" : "lg:block"}`}
        >
          {/* Close button for mobile/tablet */}
          <button
            onClick={toggleProfilePanel}
            className="lg:hidden absolute top-4 left-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 z-50"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="px-4 py-6 h-full overflow-y-auto">
            {/* User Profile Card */}
            <div className="pb-4 border-b">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <h4 className="font-semibold">{userData.name}</h4>
                <p className="text-sm text-gray-500">{userData.id}</p>
                <p className="text-xs text-gray-500">
                  Membership {userData.membershipPack}
                </p>
              </div>
              <div className="grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-0 lg:gap-4 xl:gap-0 text-center text-sm">
                <div>
                  <p className="text-[12px] text-gray-500">Personal Unit</p>
                  <p className="text-[11px] font-semibold">
                    {userData.personalUnit}
                  </p>
                </div>
                <div className="block lg:hidden xl:block">|</div>
                <div>
                  <p className="text-[12px] text-gray-500">Group Unit</p>
                  <p className="text-[11px] font-semibold">
                    {userData.groupUnit}
                  </p>
                </div>
              </div>
              <div className="mt-3 text-center">
                <p className="text-gray-500 text-[13px]">Sponsor</p>
                <p className="text-[13px] font-semibold">{userData.sponsor}</p>
              </div>
            </div>

            {/* Team Overview */}
            <div className="pt-2 pb-4 border-b">
        <h3 className="text-[14px] font-semibold mb-2">TEAM OVERVIEW</h3>

        {/* Header Row */}
        <div className="grid grid-cols-2 gap-4 pb-2 border-b border-gray-200">
          <div className="text-left">
            <span className="text-[11px] lg:text-[10px] xl:text-[11px] text-gray-500 font-semibold uppercase tracking-wider">
              Particular
            </span>
          </div>
          <div className="flex flex-row items-end justify-end gap-8 lg:gap-3 xl:gap-8">

          <div className="text-center">
            <span className="text-[11px] lg:text-[10px] xl:text-[11px] text-blue-600 font-semibold uppercase tracking-wider">
              Left
            </span>
          </div>
          <div className="text-center">
            <span className="text-[11px] lg:text-[10px] xl:text-[11px] text-green-600 font-semibold uppercase tracking-wider">
              Right
            </span>
          </div>
          </div>
        </div>

        {/* Data Rows */}
        <div className="space-y-0">
          {/* Current Row */}
          <div className="grid grid-cols-2 gap-4 py-1.5 xl:py-2 hover:bg-gray-50 transition-colors duration-150">
            <div className="text-left">
              <span className="text-[13px] lg:text-[11.5px] xl:text-[13px] text-gray-700 font-medium">Current</span>
            </div>

            <div className="flex flex-row items-end justify-end gap-8 lg:gap-3 xl:gap-8">

            <div className="text-center">
              <span className="text-[13px] lg:text-[12px] xl:text-[13px] font-bold text-blue-600 bg-blue-50 px-3 lg:px-2 xl:px-3 py-1 rounded-md">
                {teamOverviewData.current.left}
              </span>
            </div>
            <div className="text-center">
              <span className="text-[13px] lg:text-[12px] xl:text-[13px] font-bold text-green-600 bg-green-50 px-3 lg:px-2 xl:px-3 py-1 rounded-md">
                {teamOverviewData.current.right}
              </span>
            </div>
            </div>
          </div>

          {/* Carry Forward Row */}
          <div className="grid grid-cols-2 gap-4 py-1.5 xl:py-2 hover:bg-gray-50 transition-colors duration-150 border-t border-gray-100">
            <div className="text-left">
              <span className="text-[13px] lg:text-[11px] xl:text-[13px] text-gray-700 font-medium">Carry Forward</span>
            </div>

            <div className="flex flex-row items-end justify-end gap-8 lg:gap-3 xl:gap-8">

            <div className="text-center">
              <span className="text-[13px] lg:text-[12px] xl:text-[13px] font-bold text-blue-600 bg-blue-50 px-3 lg:px-2 xl:px-3 py-1 rounded-md">
                {teamOverviewData.carryForward.left}
              </span>
            </div>
            <div className="text-center">
              <span className="text-[13px] lg:text-[12px] xl:text-[13px] font-bold text-green-600 bg-green-50 px-3 lg:px-2 xl:px-3 py-1 rounded-md">
                {teamOverviewData.carryForward.right}
              </span>
            </div>
            </div>
          </div>

          {/* Paid Row */}
          <div className="grid grid-cols-2 gap-4 py-1.5 xl:py-2 hover:bg-gray-50 transition-colors duration-150 border-t border-gray-100">
            <div className="text-left">
              <span className="text-[13px] lg:text-[11.5px] xl:text-[13px] text-gray-700 font-medium">Paid</span>
            </div>
            <div className="flex flex-row items-end justify-end gap-8 lg:gap-3 xl:gap-6.5">

            <div className="text-center">
              <span className="text-[13px] lg:text-[12px] xl:text-[13px] font-bold text-blue-600 bg-blue-50 px-3 lg:px-2 xl:px-3 py-1 rounded-md">
                {teamOverviewData.paid.left}
              </span>
            </div>
            <div className="text-center">
              <span className="text-[13px] lg:text-[12px] xl:text-[13px] font-bold text-green-600 bg-green-50 px-3 lg:px-2 xl:px-3 py-1 rounded-md">
                {teamOverviewData.paid.right}
              </span>
            </div>
            </div>
          </div>
        </div>
      </div>

            {/* Payout Overview */}
            <div className="pt-3">
              <h3 className="text-[14px] font-semibold mb-2">
                PAYOUT OVERVIEW
              </h3>

              <div className="flex justify-center mb-2 relative">
                <div className="relative w-36 h-36">
                  <svg className="w-36 h-36" viewBox="0 0 144 144">
                    {/* Background circle */}
                    <circle
                      cx="72"
                      cy="72"
                      r="60"
                      stroke="#f3f4f6"
                      strokeWidth="12"
                      fill="none"
                    />
                    {/* Paid circle (green) */}
                    <circle
                      cx="72"
                      cy="72"
                      r="60"
                      stroke="#10b981"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={paidStrokeDasharray}
                      strokeDashoffset={paidStrokeDashoffset}
                      strokeLinecap="round"
                      className="cursor-pointer transition-all duration-200"
                      style={{ pointerEvents: "all" }}
                      onMouseEnter={() =>
                        setHoveredPayout({
                          type: "Paid",
                          value: payoutData.paid,
                          percentage: paidPercentage.toFixed(1),
                        })
                      }
                      onMouseLeave={() => setHoveredPayout(null)}
                      transform="rotate(-90 72 72)"
                    />
                    {/* Requested/Pending circle (blue) */}
                    <circle
                      cx="72"
                      cy="72"
                      r="60"
                      stroke="#3b82f6"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={requestedStrokeDasharray}
                      strokeDashoffset={requestedStrokeDashoffset}
                      strokeLinecap="round"
                      className="cursor-pointer transition-all duration-200"
                      style={{ pointerEvents: "all" }}
                      transform={`rotate(${
                        (paidPercentage / 100) * 360 - 90
                      } 72 72)`}
                      onMouseEnter={() =>
                        setHoveredPayout({
                          type: "Pending",
                          value: payoutData.requested,
                          percentage: requestedPercentage.toFixed(1),
                        })
                      }
                      onMouseLeave={() => setHoveredPayout(null)}
                    />
                  </svg>

                  {/* Center content */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">
                        {hoveredPayout ? hoveredPayout.type : "Total"}
                      </div>
                      <div className="text-xl font-bold">
                        ₹
                        {hoveredPayout
                          ? hoveredPayout.value.toFixed(2)
                          : totalPayout.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tooltip */}
                {hoveredPayout && (
                  <div
                    className="absolute bg-gray-800 text-white px-2 py-1 rounded-lg shadow-lg pointer-events-none text-[12px]"
                    style={{
                      top: "-60px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      zIndex: 1000,
                      whiteSpace: "nowrap",
                    }}
                  >
                    <div className="text-center">
                      <div className="font-medium">{hoveredPayout.type}</div>
                      <div
                        className={
                          hoveredPayout.type === "Paid"
                            ? "text-green-300"
                            : "text-blue-300"
                        }
                      >
                        ₹{hoveredPayout.value} ({hoveredPayout.percentage}%)
                      </div>
                    </div>
                    {/* Tooltip arrow */}
                    <div
                      className="absolute w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"
                      style={{
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    ></div>
                  </div>
                )}
              </div>

              <div className="text-center mb-4">
                <h4 className="font-semibold text-lg">Payout</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Add overlay for mobile when profile panel is open */}
        {isProfileExpanded && (
          <div
            className="fixed inset-0 bg-black/80 bg-opacity-50 z-30 lg:hidden"
            onClick={toggleProfilePanel}
          ></div>
        )}
      </div>
      <button
        onClick={toggleProfilePanel}
        className="lg:hidden fixed z-40 bottom-20 right-6 p-2 rounded-full bg-blue-200/50 hover:bg-gray-100"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </button>
    </>
  );
};

export default Dashboard;
