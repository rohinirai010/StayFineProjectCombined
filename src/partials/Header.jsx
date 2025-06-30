import React, { useEffect, useReducer, useState } from "react";
import { Mail, Bell, ChevronDown, Menu, X, User, LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../ReduxStateManagement/user/slices/authSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import headerLogo from "../images/AuthLogo.png";

const Header = ({ toggleSidebar }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

const pathToLabelMap = {
  "/user/dashboard": "Dashboard",
  "/user/networks": "Networks",
  "/user/register": "Register",
  "/user/e-wallet": "E-Wallet",
  "/user/withdrawal": "Withdrawal",
  "/user/e-pin": "E-pin",
  "/shopping": "Shopping",
  "/tools": "Tools",
  "/tools/settings": "Settings",
  "/tools/analytics": "Analytics",
  "/mailbox": "Mail Box",
};

const currentPath = location.pathname;
const pageTitle = pathToLabelMap[currentPath] || "Dashboard";

  // Get user data from Redux store
  const { user } = useSelector((state) => state.auth);
  const name = user?.fullName || "User";
  const username = user?.username || "INFO0000";

  // Sample notifications data
  const notifications = [
    { id: 1, title: "New message received", time: "2 min ago", unread: true },
    {
      id: 2,
      title: "System update completed",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "Monthly report ready",
      time: "3 hours ago",
      unread: false,
    },
    { id: 4, title: "User registration", time: "1 day ago", unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".notification-dropdown")) {
        setIsNotificationOpen(false);
      }
      if (!event.target.closest(".profile-dropdown")) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsProfileOpen(false); // Close profile dropdown
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationOpen(false); // Close notification dropdown
  };

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        // Redirect to login page after successful logout
        navigate("/user/login");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  const handleProfile = () => {
    // Navigate to profile page
    navigate("/user/profile");
  };

  return (
    <header className=" border-b border-gray-100">
      <div className="flex items-center justify-between px-2 md:px-4 lg:px-6 pt-3 pb-2">
        {/* Left side - Menu button and breadcrumb */}
        <div className="flex items-center space-x-1">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu size={20} />
          </button>

          {/* Desktop Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Link to="/user/dashboard">
                <img src={headerLogo} alt="Logo" className="w-20 h-10" />
              </Link>
              <span className="hidden sm:block text-gray-400">|</span>
              <span className="hidden sm:block text-gray-600">{pageTitle}</span>
            </div>
          </div>
        </div>

        {/* Right side - Notifications and user */}
        <div className="flex items-center space-x-3">
          {/* Mail button */}
          <button className="p-1 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors relative cursor-pointer">
            <Mail className="text-gray-600 w-4 sm:w-5 h-4 sm:h-5" />
          </button>

          {/* Notification dropdown */}
          <div className="relative notification-dropdown">
            <button
              onClick={toggleNotification}
              className="p-1 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors relative cursor-pointer"
            >
              <Bell className="text-gray-600 w-4 sm:w-5 h-4 sm:h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 sm:w-5 h-4 sm:h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[11px] sm:text-xs font-medium">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification dropdown menu */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-56 sm:w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="px-2 py-1 sm:py-3 sm:px-3  border-b border-gray-100">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                    Notifications
                  </h3>
                  <p className="text-[12px] sm:text-sm text-gray-500">
                    {unreadCount} unread notifications
                  </p>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-2 py-1 sm:py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer ${
                        notification.unread ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            notification.unread ? "bg-blue-500" : "bg-gray-300"
                          }`}
                        ></div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-[13px] sm:text-sm ${
                              notification.unread
                                ? "font-medium text-gray-900"
                                : "text-gray-700"
                            }`}
                          >
                            {notification.title}
                          </p>
                          <p className="text-[11px] sm:text-xs text-gray-500 sm:mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-1 sm:p-2 border-t border-gray-100">
                  <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile dropdown */}
          <div className="relative profile-dropdown">
            <div
              onClick={toggleProfile}
              className="flex items-center space-x-1 cursor-pointer hover:bg-gray-50 rounded-lg p-1 transition-colors"
            >
              <div className="w-6 sm:w-7 h-6 sm:h-7 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-[12px] sm:text-sm">
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
              </div>

              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Profile dropdown menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-46 sm:w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="px-2 sm:px-3 py-1 sm:py-2 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-[13px] sm:text-base font-medium">
                        {name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-[13px] sm:text-[14px]">
                        {name}
                      </p>
                      <p className="text-[11px] sm:text-[13px] text-gray-500">
                        {username}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-1">
                  <button
                    onClick={handleProfile}
                    className="w-full flex items-center space-x-3 px-3 sm:px-4 py-1 sm:py-2 text-[13px] sm:text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>View Profile</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-3 sm:px-4 py-1 sm:py-2 text-[13px] sm:text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
