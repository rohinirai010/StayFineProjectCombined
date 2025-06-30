import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Award,
  BadgeAlert,
  BarChart,
  Bell,
  Check,
  ChevronRight,
  Database,
  Gift,
  MessageSquare,
  PieChart,
  Redo2,
  Scissors,
  Shield,
  Star,
  TrendingUp,
  Undo2,
  User,
  UserCheck,
  Users,
  XCircle,
} from "lucide-react";
import { format, addHours } from "date-fns";
import { useSelector } from "react-redux";


// Income Overview Card Component
export const IncomeCard = ({ title, amount, icon, change, color }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    green:
      "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    purple:
      "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    indigo:
      "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
    orange:
      "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start mb-3">
        <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
        <div
          className={`p-2 rounded-full ${
            colorClasses[color] || colorClasses.blue
          }`}
        >
          {icon}
        </div>
      </div>
      <div className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
        {amount}
      </div>
      {change && (
        <div className="mt-2 text-xs flex items-center">
          <span
            className={
              change >= 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }
          >
            {change >= 0 ? "+" : ""}
            {change}% from previous period
          </span>
        </div>
      )}
    </div>
  );
};

// System Summary Card Component
export const SystemSummaryCard = ({
  title,
  value,
  icon,
  type = "default",
  subtitle,
}) => {
  const getCardStyle = () => {
    switch (type) {
      case "success":
        return "border-l-4 border-green-500";
      case "warning":
        return "border-l-4 border-yellow-500";
      case "danger":
        return "border-l-4 border-red-500";
      case "info":
        return "border-l-4 border-blue-500";
      default:
        return "";
    }
  };

  return (
    <div
      className={` bg-white h-full dark:bg-gray-800 rounded-lg p-2 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700 ${getCardStyle()}`}
    >
      <div className="flex items-center">
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mr-4">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </h3>
          <div className="text-xl font-bold text-gray-900 dark:text-white mt-1">
            ${value}
          </div>
          {subtitle && (
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Alert Card Component
export const AlertCard = ({
  title,
  color,
  icon,
  actionText = "View All",
  showMetrics = false,
  metrics = { today: 0, weekly: 0, monthly: 0 },
}) => {
  const bgColors = {
    red: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
    amber:
      "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800",
    green:
      "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    blue: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
  };

  const textColors = {
    red: "text-red-700 dark:text-red-300",
    amber: "text-amber-700 dark:text-amber-300",
    green: "text-green-700 dark:text-green-300",
    blue: "text-blue-700 dark:text-blue-300",
  };

  return (
    <div
      className={`p-4 rounded-lg border h-full flex flex-col ${
        bgColors[color] || bgColors.blue
      }`}
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <div className={`mr-3 ${textColors[color] || textColors.blue}`}>
            {icon}
          </div>
          <div className="font-medium">{title}</div>
        </div>
        <div
          className={`flex items-center text-sm font-medium ${
            textColors[color] || textColors.blue
          }`}
        >
          {actionText}
          <ChevronRight size={16} className="ml-1" />
        </div>
      </div>

      {showMetrics ? (
        <div className="mt-2 flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Today
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Weekly
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Monthly
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center mt-1">
            <div className="text-xl font-bold">{metrics.today}</div>
            <div className="text-xl font-bold">{metrics.weekly}</div>
            <div className="text-xl font-bold">{metrics.monthly}</div>
          </div>
        </div>
      ) : (
        <div className="text-2xl font-bold mt-1 flex-1 flex items-center">
          {metrics.total || 0}
        </div>
      )}
    </div>
  );
};

// Performance Card Component
export const PerformanceCard = ({ title, userName, value, icon, rank }) => {
  return (
    <Link
      to={`/user-performance/${userName.replace(/\s+/g, "-").toLowerCase()}`}
      className="block"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-start">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {title}
          </div>
          <div className="flex items-center">
            <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold px-2 py-1 rounded-full">
              #{rank}
            </span>
          </div>
        </div>
        <div className="flex items-center mt-3">
          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full mr-3">
            {icon || (
              <User
                size={18}
                className="text-indigo-600 dark:text-indigo-400"
              />
            )}
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              {userName}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {value}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Live Activity Feed Component
export const LiveActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case "registration":
        return <User size={16} className="text-green-500" />;
      case "deposit":
        return <Database size={16} className="text-blue-500" />;
      case "withdrawal":
        return <Scissors size={16} className="text-purple-500" />;
      case "admin":
        return <Shield size={16} className="text-amber-500" />;
      case "support":
        return <MessageSquare size={16} className="text-pink-500" />;
      default:
        return <Bell size={16} className="text-gray-500" />;
    }
  };

  const getActivityLink = (type) => {
    switch (type) {
      case "registration":
        return "/user-registrations";
      case "deposit":
        return "/deposits";
      case "withdrawal":
        return "/withdrawals";
      case "admin":
        return "/admin-logs";
      case "support":
        return "/support-tickets";
      default:
        return "/activity";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Live Activity
        </h2>
        <Link
          to="/all-activities"
          className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="space-y-3 p-2">
        {activities.map((activity, index) => (
          <Link
            key={index}
            to={getActivityLink(activity.type)}
            className="block"
          >
            <div className="flex items-start p-1 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full mr-3">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-white">
                  {activity.title}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {activity.description}
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {activity.time}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const CappingAlertCard = () => {
  return (
    <div className="bg-white dark:bg-red-800/10 rounded-xl shadow-sm hover:shadow-md transition-all border border-red-200 dark:border-red-700">
      <div className="flex justify-between items-center px-4 py-3">
        <h2 className="flex flex-row gap-2 items-center text-lg font-semibold text-gray-800 dark:text-white">
        <BadgeAlert className="h-6 w-6 text-red-700" /> Capping Alert
        </h2>
      </div>

      <div className="space-y-1 px-4 pb-3">
        <div className="text-base tracking-wider text-gray-300"> 2X 80% Reached User : <span className="text-lg text-white font-bold">50</span> </div>
        <div className="text-base tracking-wider text-gray-300">3X 80% Reached User : <span className="text-lg text-white font-bold">50</span> </div>
      </div>
    </div>
  );
}

// Withdrawal & Deposit Stats Dashboard Component
export const WithdrawalDepositStats = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Withdrawal & Deposit Overview
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Link to="/pending-withdrawals" className="block">
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Pending Withdrawals
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-1">
              $4,235
            </div>
            <div className="text-xs text-amber-600 dark:text-amber-400 flex items-center mt-1">
              <AlertTriangle size={12} className="mr-1" />
              <span>12 requests waiting</span>
            </div>
          </div>
        </Link>

        <Link to="/approved-withdrawals" className="block">
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Approved Today
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-1">
              $1,890
            </div>
            <div className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
              <Check size={12} className="mr-1" />
              <span>8 completed</span>
            </div>
          </div>
        </Link>

        <Link to="/declined-withdrawals" className="block">
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Declined
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-1">
              $320
            </div>
            <div className="text-xs text-red-600 dark:text-red-400 flex items-center mt-1">
              <XCircle size={12} className="mr-1" />
              <span>2 rejected</span>
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
              Quick Actions
            </div>
            <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
              Process pending withdrawals
            </div>
          </div>
          <Link to="/review-withdrawals">
            <button className="bg-indigo-600 text-white text-xs px-3 py-1 rounded-lg hover:bg-indigo-700 transition-colors">
              Review
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// System Controls Component
export const SystemControlsCard = () => {
  const [closingDate, setClosingDate] = useState(addHours(new Date(), 72));
  const [lastLogin, setLastLogin] = useState("Not available");
  const [hitCount, setHitCount] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [action, setAction] = useState(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isBlinking, setIsBlinking] = useState(false);
  const auth = useSelector((state) => state.auth);

  // Calculate next closing date (only once on component mount)
  useEffect(() => {
    const now = new Date();
    const nextClosingDate = addHours(now, 72);
    setClosingDate(nextClosingDate);
  }, []);

  useEffect(() => {
    const formatLastLogin = () => {
      try {
        const timestamp = auth.lastLogin || localStorage.getItem('lastLoginTime');
        if (timestamp) {
          const date = new Date(timestamp);
          return date.toLocaleString(); // Format as localized date and time
        }
        return "Not available";
      } catch (error) {
        console.error("Error formatting last login time:", error);
        return "Not available";
      }
    };
    
    setLastLogin(formatLastLogin());
  }, [auth.lastLogin]);

  // Handle undo or redo click
  const handleActionClick = (type) => {
    setAction(type);
    setOpenModal(true);
    setPassword('');
    setError('');
  };

  // Handle password confirm
  const handleConfirm = () => {
    // Check password against ADMIN_PASSWORD from authSlice
    const ADMIN_PASSWORD = "admin123";
    
    if (password === ADMIN_PASSWORD) {
      // Execute the action (undo or redo)
      if (action === 'undo') {
        setHitCount(prev => Math.max(prev - 1, 0));
      } else if (action === 'redo') {
        setHitCount(prev => prev + 1);
      }
      
      setOpenModal(false);
      setPassword('');
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  // Blink effect for red box when hitCount is 2
  useEffect(() => {
    if (hitCount === 2) {
      const blinkInterval = setInterval(() => {
        setIsBlinking(prev => !prev);
      }, 500);
      
      return () => clearInterval(blinkInterval);
    } else {
      setIsBlinking(false);
    }
  }, [hitCount]);

  // Determine box style based on hitCount
  const getBoxStyle = () => {
    if (hitCount >= 2) {
      return isBlinking 
        ? "bg-red-500 dark:bg-red-900 p-2 rounded-lg text-left transition-colors group w-full h-full flex flex-col justify-between" 
        : "bg-red-400 dark:bg-red-800 p-2 rounded-lg text-left transition-colors group w-full h-full flex flex-col justify-between";
    }
    return "bg-gray-100 dark:bg-gray-700 p-2 rounded-lg text-left hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group w-full h-full flex flex-col justify-between";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        System Controls
      </h2>

      <div className="grid grid-cols-2 gap-2">
        <Link to="/roi-management">
          <button className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg text-left hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group w-full h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate pr-2">
                Server Status
              </div>
              <div className="flex-shrink-0 flex items-center justify-center bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs px-2 py-0.5 rounded-full">
                Active
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Neutral 32%
            </div>
            <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to manage
            </div>
          </button>
        </Link>

        <button className={getBoxStyle()}>
          <div className="flex items-center justify-between">
            <div className={`text-sm font-medium text-gray-700 dark:text-gray-300 truncate pr-2 ${isBlinking ? "" : ""}`}>
              Closing System
            </div>
            <div className="flex-shrink-0 flex items-center justify-center bg-gray-200 text-sm text-gray-800 px-2 py-0.2 font-semibold rounded">
              {hitCount}
            </div>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-200 mt-1 tracking-wider">
            {format(closingDate, "dd/MM/yyyy HH:mm")}
          </div>
          <div className="flex items-center justify-between mt-2 text-xs">
            <div>

            <span className="text-gray-700 dark:text-gray-300 mr-2 text-sm tracking-wide">Hit:</span>
            <span className="font-bold mr-2 text-sm">{hitCount}</span>
            </div>
            <div>

            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleActionClick('undo');
              }}
              className="text-blue-600 hover:text-blue-800 bg-blue-100 hover:bg-blue-200 px-1.5 py-0.5 rounded  mr-1"
            >
              <Undo2 className="w-4 h-4"/>
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleActionClick('redo');
              }}
              className="text-blue-600 hover:text-blue-800 bg-blue-100 hover:bg-blue-200 px-1.5 py-0.5 rounded "
            >
              <Redo2 className="w-4 h-4"/>
            </button>
            </div>
          </div>
        </button>

        <Link to="/gateway-status">
          <button className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg text-left hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group w-full h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate pr-2">
                Gateway Status
              </div>
              <div className="flex-shrink-0 flex items-center justify-center bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 text-xs px-2 py-0.5 rounded-full">
                Live
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Success Rate: 100%
            </div>
            <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to process
            </div>
          </button>
        </Link>

        <Link to="/announcements">
          <button className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg text-left hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group w-full h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="text-xs font-medium text-gray-700 dark:text-gray-300 pr-2">
                Admin Logged-In Screens
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              1 
            </div>
            <p className="text-xs tracking-wide text-slate-500 dark:text-slate-400">
              Last Login: {lastLogin}
            </p>
            <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to publish
            </div>
          </button>
        </Link>
      </div>

      {/* Password Verification Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-xs flex items-center justify-center z-50 " >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full m-4">
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Password Verification
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Please enter your admin password to {action === 'undo' ? 'undo' : 'redo'} this action.
              </p>
              
              <div className="mb-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Admin Password"
                />
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Income Overview Dashboard Component
export const IncomeOverviewDashboard = () => {
  const [activeFilter, setActiveFilter] = useState('today');
  
  // dummy data for different time periods
  const incomeData = {
    today: [
      { title: "Daily XRP Bounty", amount: "$1,675", change: 2.5, color: "blue", icon: <BarChart size={18} /> },
      { title: "Direct Bounty", amount: "$3,450", change: 5.7, color: "green", icon: <PieChart size={18} /> },
      { title: "User Network Bounty", amount: "$920", change: -1.2, color: "purple", icon: <Users size={18} /> },
      { title: "Beyond Limit Bonus", amount: "$540", change: 3.4, color: "indigo", icon: <TrendingUp size={18} /> },
      { title: "ODL Profit", amount: "$275", change: 12.3, color: "orange", icon: <Gift size={18} /> },
      { totalAmount: "$6,860", change: 4.2 }
    ],
    week: [
      { title: "Daily XRP Bounty", amount: "$6,275", change: 3.8, color: "blue", icon: <BarChart size={18} /> },
      { title: "Direct Bounty", amount: "$15,320", change: 2.1, color: "green", icon: <PieChart size={18} /> },
      { title: "User Network Bounty", amount: "$4,560", change: 1.5, color: "purple", icon: <Users size={18} /> },
      { title: "Beyond Limit Bonus", amount: "$2,890", change: -2.3, color: "indigo", icon: <TrendingUp size={18} /> },
      { title: "ODL Profit", amount: "$875", change: 8.7, color: "orange", icon: <Gift size={18} /> },
      { totalAmount: "$29,920", change: 2.8 }
    ],
    month: [
      { title: "Daily XRP Bounty", amount: "$12,675", change: 2.5, color: "blue", icon: <BarChart size={18} /> },
      { title: "Direct Bounty", amount: "$28,450", change: 5.7, color: "green", icon: <PieChart size={18} /> },
      { title: "User Network Bounty", amount: "$8,920", change: -1.2, color: "purple", icon: <Users size={18} /> },
      { title: "Beyond Limit Bonus", amount: "$5,340", change: 3.4, color: "indigo", icon: <TrendingUp size={18} /> },
      { title: "ODL Profit", amount: "$1,275", change: 12.3, color: "orange", icon: <Gift size={18} /> },
      { totalAmount: "$56,660", change: 4.2 }
    ]
  };

  // Get current data based on active filter
  const currentData = incomeData[activeFilter];
  const totalData = currentData[currentData.length - 1];
  
  // Handler for filter button clicks
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-2 md:p-4 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Income Distribution
        </h2>
        <div className="flex flex-row gap-2">
          <button 
            className={`text-xs font-medium px-2 md:px-3 py-1 rounded-xl md:rounded-full transition-colors ${
              activeFilter === 'today' 
                ? 'bg-indigo-500 text-white dark:bg-indigo-600' 
                : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800'
            }`}
            onClick={() => handleFilterClick('today')}
          >
            Today
          </button>
          <button 
            className={`text-xs font-medium px-2 md:px-3 py-1 rounded-xl md:rounded-full transition-colors ${
              activeFilter === 'week' 
                ? 'bg-indigo-500 text-white dark:bg-indigo-600' 
                : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800'
            }`}
            onClick={() => handleFilterClick('week')}
          >
            This Week
          </button>
          <button 
            className={`text-xs font-medium px-2 md:px-3 py-1 rounded-xl md:rounded-full transition-colors ${
              activeFilter === 'month' 
                ? 'bg-indigo-500 text-white dark:bg-indigo-600' 
                : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800'
            }`}
            onClick={() => handleFilterClick('month')}
          >
            This Month
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {currentData.slice(0, 5).map((item, index) => (
          <IncomeCard
            key={index}
            title={item.title}
            amount={item.amount}
            icon={item.icon}
            change={item.change}
            color={item.color}
          />
        ))}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-4 text-white">
          <div className="text-sm opacity-80 mb-3">Total Distributed</div>
          <div className="text-2xl font-bold mb-2">{totalData.totalAmount}</div>
          <div className="text-xs opacity-80 flex items-center">
            <TrendingUp size={12} className="mr-1" />
            <span>+{totalData.change}% from last month</span>
          </div>
        </div>
      </div>
    </div>
  );
}


// Use this to render the Performance & Engagement section
export const PerformanceEngagementSection = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Top Performers
        </h2>
        <div className="flex space-x-2">
          <button className="text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 px-3 py-1 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors">
            Today
          </button>
          <button className="text-xs font-medium bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full hover:bg-indigo-100 hover:text-indigo-700 dark:hover:bg-indigo-900 dark:hover:text-indigo-300 transition-colors">
            Week
          </button>
          <button className="text-xs font-medium bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full hover:bg-indigo-100 hover:text-indigo-700 dark:hover:bg-indigo-900 dark:hover:text-indigo-300 transition-colors">
            Month
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/user-performance/sarah-johnson">
          <PerformanceCard
            title="Top Earner"
            userName="Sarah Johnson"
            value="$3,240 earned today"
            icon={<Award size={18} className="text-amber-500" />}
            rank="1"
          />
        </Link>
        <Link to="/user-performance/michael-chen">
          <PerformanceCard
            title="Most Active Referrer"
            userName="Michael Chen"
            value="12 new referrals today"
            icon={<UserCheck size={18} className="text-green-500" />}
            rank="1"
          />
        </Link>
        <Link to="/user-performance/team-apex">
          <PerformanceCard
            title="Fastest Growing Team"
            userName="Team Apex"
            value="38 new members this week"
            icon={<Users size={18} className="text-blue-500" />}
            rank="1"
          />
        </Link>
        <Link to="/user-performance/robert-frost">
          <PerformanceCard
            title="Top ROI Earner"
            userName="Robert Frost"
            value="$1,890 ROI income today"
            icon={<Star size={18} className="text-purple-500" />}
            rank="1"
          />
        </Link>
      </div>
    </div>
  );
};
