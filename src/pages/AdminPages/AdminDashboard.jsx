import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../partials/AdminPartials/Sidebar";
import Header from "../../partials/AdminPartials/Header";
import {
  ArrowRight,
  Users,
  Upload,
  DollarSign,
  Bell,
  PlusCircle,
  FileText,
  Shield,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import dashboardLogo from "../../images/AuthLogo.png";
import "../../css/additional.css";
import { useDispatch, useSelector } from "react-redux";
import {
  AlertCard,
  CappingAlertCard,
  IncomeOverviewDashboard,
  LiveActivityFeed,
  PerformanceEngagementSection,
  SystemControlsCard,
  SystemSummaryCard,
  WithdrawalDepositStats,
} from "../../partials/AdminPartials/dashboard/Components";
import { PiHandDepositDuotone, PiHandWithdrawDuotone } from "react-icons/pi";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarPosition, setSidebarPosition] = useState(() => {
    try {
      return localStorage.getItem("sidebar-position") || "left";
    } catch {
      return "left";
    }
  });

  // Interactive states
  const [showNotification, setShowNotification] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0);

  useEffect(() => {
    // Simulate fetching user data
    const fetchUserData = () => {
      const fetchedTotalUsers = 12458;  
      const fetchedActiveUsers = 3245; 
      const fetchedInactiveUsers = 92013; 

      setTotalUsers(fetchedTotalUsers);
      setActiveUsers(fetchedActiveUsers);
      setInactiveUsers(fetchedInactiveUsers);
    };

    fetchUserData();
  }, []);

  const odlMetrics = {
    today: 0,
    weekly: 15,
    monthly: 17
  };

  const recentActivities = [
    {
      type: "registration",
      title: "New Registration",
      description: "Sarah Johnson completed registration",
      time: "2 minutes ago",
    },
    {
      type: "deposit",
      title: "New Deposit",
      description: "Robert Frost deposited $2,500 USDT",
      time: "8 minutes ago",
    },
    {
      type: "withdrawal",
      title: "Withdrawal Request",
      description: "Michael Chen requested $1,200 USDT withdrawal",
      time: "15 minutes ago",
    },
    {
      type: "admin",
      title: "Admin Action",
      description: "System maintenance scheduled for tonight",
      time: "1 hour ago",
    },
    {
      type: "support",
      title: "Support Ticket",
      description: "New support ticket #4582 created",
      time: "3 hours ago",
    },
  ];


  // Generate performance history
  const historyPercents = [
    0.8, 0.2, 0.5, 0.2, 0.9, 0.3, 0.55, 0.3, 0.15, 0.8, 0.4,
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarPosition={sidebarPosition}
        setSidebarPosition={setSidebarPosition}
      />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          sidebarPosition={sidebarPosition}
        />
        <main className="grow px-3 sm:px-6 py-6">
          <div className="max-w-full mx-auto">
            {/* Welcome Banner with animated background */}
            <div className="bg-gradient-to-r from-[#571043] via-[#E20C88] to-[#FFAEDD] rounded-xl p-6 mb-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mt-20 -mr-20 sm:w-32 sm:h-32 sm:-mt-12 sm:-mr-12"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full -mb-16 -ml-16 sm:w-24 sm:h-24 sm:-mb-10 sm:-ml-10"></div>
                <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-white rounded-full sm:w-16 sm:h-16 sm:left-1/4 sm:top-1/3"></div>
                <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-white rounded-full sm:w-12 sm:h-12 sm:right-1/5 sm:bottom-1/4"></div>
              </div>

              <div className="relative flex flex-col sm:flex-row justify-between">
                <div>
                  <h1 className="text-xl font-bold mb-2 sm:text-3xl">
                    Welcome to Stay Fine Master Admin Dashboard
                  </h1>

                  <div className="mt-4 flex gap-3 flex-col sm:flex-row">
                    <Link to="/add-funds" className=" px-3 py-2 text-sm rounded-lg font-medium hover:bg-opacity-90 transition flex items-center justify-center group w-full sm:w-auto cursor-pointer" style={{background: "var(--color-white)", color: "var(--color-dark)"}}>
                      <DollarSign size={16} className="mr-2" />
                      <span className="group-hover:mr-1 transition-all">
                        Add Funds
                      </span>
                      <ArrowRight
                        size={14}
                        className="ml-1 transition-all duration-300"
                      />
                    </Link>

                    <Link to="/deduct-funds" className=" px-3 py-2 text-sm rounded-lg font-medium hover:bg-opacity-60 transition flex items-center justify-center group border  border-opacity-30 w-full sm:w-auto cursor-pointer" style={{background: "var(--color-dark)", color: "var(--color-white)", borderColor: "var(--color-white)"}}>
                      <Upload size={16} className="mr-2" />
                      <span className="group-hover:mr-1 transition-all">
                        Deduct Funds
                      </span>
                      <ArrowRight size={14} className="ml-1 transition-all" />
                    </Link>

                    <Link to="/new-registration" className=" dark:bg-indigo-900 bg-opacity-40 dark:text-white px-3 py-2 text-sm rounded-lg font-medium hover:bg-opacity-60 transition flex items-center justify-center group border  border-opacity-30 w-full sm:w-auto cursor-pointer" style={{background: "var(--color-white)", color: "var(--color-dark)", borderColor: "var(--color-white)"}}>
                      <PlusCircle size={16} className="mr-2" />
                      <span className="group-hover:mr-1 transition-all">
                        New Registration
                      </span>
                      <ArrowRight size={14} className="ml-1 transition-all" />
                    </Link>
                  </div>
                </div>
                <div className="hidden sm:flex items-center mt-4 sm:mt-0">
                  <Link to="/profile" className=" p-3 rounded-xl shadow-lg transform hover:scale-105 transition-transform cursor-pointer" style={{background: "var(--color-white)"}}>
                    <div className="relative">
                      <img
                        src={dashboardLogo}
                        alt="Dashboard Logo"
                        className="w-20 h-10"
                      />
                      <div className="absolute -top-4 -right-5 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {/* System Summary Cards - First Row */}
              <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Link to="/users" className="block">
                  <SystemSummaryCard 
                    title="Total Users"
                    value={totalUsers}
                    icon={<Users size={20} className="text-indigo-600 dark:text-indigo-400" />}
                    subtitle={
                      <>
                        <div className="text-xs text-green-500 dark:text-green-400">
                          Active: {activeUsers} ({((activeUsers / totalUsers) * 100).toFixed(1)}%)
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Inactive: {inactiveUsers} ({((inactiveUsers / totalUsers) * 100).toFixed(1)}%)
                        </div>
                      </>
                    }
                  />
                </Link>

                <Link to="/registrations" className="block">
                  <SystemSummaryCard
                    title="Total Withdrawals"
                    value="1000"
                    icon={
                      <PiHandWithdrawDuotone
                        size={20}
                        className="text-blue-600 dark:text-blue-400"
                      />
                    }
                    type="info"
                    subtitle="+12% from yesterday"
                  />
                </Link>

                <Link to="/packages" className="block">
                  <SystemSummaryCard
                    title="Total Deposits"
                    value="1000"
                    icon={
                      <PiHandDepositDuotone
                        size={20}
                        className="text-purple-600 dark:text-purple-400"
                      />
                    }
                    subtitle="79% activation rate"
                  />
                </Link>

                <Link to="/wallet" className="block">
                  <SystemSummaryCard
                    title="Total Payouts"
                    value="1000"
                    icon={
                      <DollarSign
                        size={20}
                        className="text-amber-600 dark:text-amber-400"
                      />
                    }
                    type="warning"
                    subtitle="USDT Balance"
                  />
                </Link>
              </div>

              {/* Alert Cards - Second Row */}
              <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to="/odl-accounts" className="block">
                  <AlertCard
                    title="Missed ODL Accounts"
                    color="amber"
                    icon={<AlertCircle size={20} />}
                    actionText="View Details"
                    showMetrics={true}
                    metrics={odlMetrics}
                  />
                </Link>
                
                <Link to="/blocked-users" className="block">
                  <AlertCard
                    title="Blocked Users"
                    count="3"
                    color="red"
                    icon={<Shield size={20} />}
                    actionText="View"
                  />
                </Link>
                
                <Link to="/pending-withdrawals" className="block">
                  <AlertCard
                    title="Pending Withdrawals"
                    count="12"
                    color="blue"
                    icon={<DollarSign size={20} />}
                    actionText="Process"
                  />
                </Link>
                
                <Link to="/support-tickets" className="block">
                  <AlertCard
                    title="Support Tickets"
                    count="8"
                    color="green"
                    icon={<MessageSquare size={20} />}
                    actionText="Respond"
                  />
                </Link>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content Area  */}
                <div className="lg:col-span-2 space-y-4">
                  <IncomeOverviewDashboard />
                  <WithdrawalDepositStats />
                  <PerformanceEngagementSection />
                </div>

                {/* Right Side cards */}
                <div className="lg:col-span-1 space-y-3">
                  <SystemControlsCard />
                  <LiveActivityFeed activities={recentActivities} />
                  <CappingAlertCard />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Notification toast */}
      <div
        className={`fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center transition-all duration-300 transform ${
          showNotification
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >
        <Bell size={20} className="text-indigo-600 mr-3" />
        <div>
          <div className="font-medium">New notification</div>
          <div className="text-sm text-gray-500">
            Your account has been updated
          </div>
        </div>
        <button
          className="ml-4 text-gray-400 hover:text-gray-600"
          onClick={() => setShowNotification(false)}
        >
          ×
        </button>
      </div>

    </div>
  );
};

export default AdminDashboard;