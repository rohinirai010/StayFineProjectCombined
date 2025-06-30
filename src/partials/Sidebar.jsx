import React, { useState } from "react";
import {
  Home,
  UserPlus,
  Wallet,
  Zap,
  ShoppingCart,
  Settings,
  Mail,
  ChevronDown,
  Network,
  ChevronsRight,
  ChevronsLeft,
  IndianRupeeIcon,
} from "lucide-react";
import sidebarLogo from "../images/AuthLogo.png";
import { Link } from "react-router-dom";

const Sidebar = ({ isExpanded, setIsExpanded, activeItem, setActiveItem }) => {
  const [dropdownStates, setDropdownStates] = useState({
    Networks: false,
    Tools: false,
  });

  const menuItems = [
    { icon: Home, label: "Dashboard", id: "dashboard", link: "/user/dashboard" },
    { 
      icon: Network, 
      label: "Networks", 
      id: "networks", 
      // hasDropdown: true,
      link: "/user/networks",
      // dropdownItems: [
      //   { label: "My Network", link: "/networks/my-network" },
      //   { label: "Team Network", link: "/networks/team-network" }
      // ]
    },
    { icon: UserPlus, label: "Register", id: "register", link: "/user/register" },
    { icon: Wallet, label: "E-Wallet", id: "ewallet", link: "/user/e-wallet" },
    { icon: IndianRupeeIcon, label: "Withdrawal", id: "payout", link: "/user/withdrawal" },
    { icon: Zap, label: "Promoter Plan", id: "ewallet", link: "/user/e-wallet" },
    { icon: ShoppingCart, label: "Shopping", id: "shopping", link: "/shopping" },
    { 
      icon: Settings, 
      label: "Tools", 
      id: "tools", 
      hasDropdown: true,
      link: "/tools",
      dropdownItems: [
        { label: "Settings", link: "/tools/settings" },
        { label: "Analytics", link: "/tools/analytics" }
      ]
    },
    { icon: Mail, label: "Mail Box", id: "mailbox", link: "/mailbox" },
  ];

  const toggleDropdown = (itemLabel) => {
    setDropdownStates((prev) => ({
      ...prev,
      [itemLabel]: !prev[itemLabel],
    }));
  };

  console.log("Current activeItem:", activeItem);



  const handleItemClick = (item, e) => {
    e.preventDefault();
    setActiveItem(item.id);
    
    if (item.hasDropdown) {
      // For dropdown items, toggle dropdown AND navigate to main link
      toggleDropdown(item.label);
      // Add a small delay to allow dropdown animation, then navigate
      setTimeout(() => {
        window.location.href = item.link;
      }, 100);
    } else {
      // For regular items, navigate immediately
      window.location.href = item.link;
    }
  };

  // Alternative approach - separate click handlers
  const handleDropdownToggle = (item, e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveItem(item.id);
    toggleDropdown(item.label);
  };

  const handleMainItemClick = (item, e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveItem(item.id);
    window.location.href = item.link;
  };

  const handleDropdownItemClick = (dropdownItem, e) => {
    e.preventDefault();
    e.stopPropagation();
    // Navigate to dropdown item link
    window.location.href = dropdownItem.link;
    // Or if using React Router: navigate(dropdownItem.link);
    setIsExpanded(false); // Close sidebar after navigation
  };

  // First 5 items for collapsed view
  const collapsedItems = menuItems.slice(0, 5);

  return (
    <>
      {/* Collapsed Sidebar - Always visible on left */}
      <div className="fixed left-0 top-1/4 h-1/2 z-20 w-24 hidden lg:flex flex-col items-center py-4 space-y-4">
        {collapsedItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div key={index} className="relative group">
              <a
                href={item.link}
                onClick={(e) => handleItemClick(item, e)}
                className={`p-2 rounded-full transition-colors w-12 h-12 flex items-center justify-center cursor-pointer ${
                  activeItem === item.id
                    ? "bg-[#954cea] text-gray-200"
                    : "text-gray-500 hover:bg-purple-100"
                }`}
              >
                <IconComponent className="w-6 h-6" />
              </a>
              
              {/* Tooltip */}
              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-blue-400/60 text-[#000] text-[11px] px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-30">
                {item.label}
                {/* Tooltip arrow */}
                <div className="absolute -left-[5px] top-1/2 transform -translate-y-1/2 -translate-0-x-full w-0 h-0 border-t-5 border-b-5 border-r-5 border-transparent border-r-gray-800"></div>
              </div>
            </div>
          );
        })}

        {/* Expand/Collapse Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-tl-xl rounded-br-xl text-gray-200 bg-gradient-to-br from-[#836fe8] hover:from-[#ac45cc] via-[#4228c5] to-[#ac45cc] hover:to-[#836fe8] hover:scale-105 flex items-center justify-center mb-4 cursor-pointer"
        >
          <ChevronsRight className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed left-0 bottom-0 w-full z-20 flex lg:hidden flex-row items-center justify-between py-3 bg-gray-100 shadow-lg px-4 sm:px-8">
        {collapsedItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <a
              key={index}
              href={item.link}
              onClick={(e) => handleItemClick(item, e)}
              className={`p-2 rounded-full transition-colors w-12 h-12 flex items-center justify-center cursor-pointer ${
                activeItem === item.id
                  ? "bg-[#954cea] text-gray-200"
                  : "text-gray-800 hover:bg-gray-100"
              }`}
            >
              <IconComponent className="w-6 h-6" />
            </a>
          );
        })}
      </div>

      {/* Expanded Sidebar Overlay */}
      <>
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/30 bg-opacity-50 z-45 transition-opacity duration-700 ease-in-out ${
            isExpanded
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsExpanded(false)}
        />

        {/* Full Sidebar */}
        <div
          className={`fixed left-0 top-0 h-full bg-[#f6f4fe] shadow-xl z-50 w-64 transition-all duration-700 ease-in-out transform ${
            isExpanded ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Logo Header */}
          <div className="flex items-center justify-between px-4 pt-5 pb-3 border-b">
          <Link to="/user/dashboard">
                <img src={sidebarLogo} alt="Logo" className="w-20 h-10" />
              </Link>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 rounded-tl-xl rounded-br-xl text-gray-200 bg-gradient-to-br from-[#836fe8] hover:from-[#ac45cc] via-[#4228c5] to-[#ac45cc] hover:to-[#836fe8] hover:scale-105 flex items-center justify-center cursor-pointer"
            >
              <ChevronsLeft className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="p-2 space-y-1 mt-4">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index}>
                  <div
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors cursor-pointer ${
                      activeItem === item.id
                        ? "bg-purple-100 text-purple-700 border-l-4 border-purple-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {/* Main clickable area */}
                    <div 
                      className="flex items-center space-x-3 flex-1"
                      onClick={(e) => handleMainItemClick(item, e)}
                    >
                      <div className="p-1 bg-[#ffffff] rounded-full">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-[12px] font-semibold">
                        {item.label}
                      </span>
                    </div>
                    
                    {/* Dropdown toggle button */}
                    {item.hasDropdown && (
                      <button
                        onClick={(e) => handleDropdownToggle(item, e)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <ChevronDown
                          size={16}
                          className={`text-gray-400 transition-transform ${
                            dropdownStates[item.label] ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Dropdown Content */}
                  {item.hasDropdown && dropdownStates[item.label] && (
                    <div className="ml-6 mt-1 space-y-[2px]">
                      {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                        <a
                          key={dropdownIndex}
                          href={dropdownItem.link}
                          onClick={(e) => handleDropdownItemClick(dropdownItem, e)}
                          className="block w-full text-left px-3 py-2 text-[12px] font-medium text-gray-600 hover:bg-gray-50 rounded-lg"
                        >
                          {dropdownItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </>
    </>
  );
};

export default Sidebar;