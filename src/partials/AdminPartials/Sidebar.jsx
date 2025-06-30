import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import mainLogo from "../../images/AuthLogo.png";
import logoLight from "../../images/AuthLogo.png";
import sidebarLogoCollapsed from "../../images/AuthLogo.png";
import SidebarLinkGroup, { DropdownProvider } from "./SidebarLinkGroup";
import {
  MdKeyboardArrowDown,
  MdOutlineCardGiftcard,
  MdOutlineDashboard,
} from "react-icons/md";
import {
  RiContactsBook3Line,
  RiContactsBookLine,
  RiLuggageDepositLine,
} from "react-icons/ri";
import {
  BiArrowToRight,
  BiMoneyWithdraw,
  BiSolidArrowToLeft,
} from "react-icons/bi";
import { TbReport } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Settings } from "lucide-react";

// Define navigation items structure for reusability
const navItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <MdOutlineDashboard className="w-5 h-5" />,
    path: "/admin/dashboard",
    exact: true,
  },
  {
    id: "members",
    title: "Members",
    icon: <RiContactsBookLine className="w-5 h-5" />,
    hasDropdown: true,
    children: [
      { title: "Members List", path: "/admin/members-list" },
      { title: "Edited logs", path: "/admin/edited-info", hidden: true },
    ],
  },
  {
    id: "subadmin",
    title: "Sub Admin",
    icon: <RiContactsBook3Line className="w-5 h-5" />,
    hasDropdown: true,
    children: [
      { title: "Create Sub Admin", path: "/admin/create-subadmin" },
     
    ],
  },
  {
    id: "deposit",
    title: "Deposit",
    icon: <RiLuggageDepositLine className="w-5 h-5" />,
    hasDropdown: true,
    children: [
      { title: "Add QR Code", path: "/admin/add-qr" },
      { title: "Deposit History", path: "/admin/deposit-history" },
    ],
  },
  {
    id: "withdrawals",
    title: "Withdrawals",
    icon: <BiMoneyWithdraw className="w-5 h-5" />,
    hasDropdown: true,
    children: [
      { title: "Withdrawal History", path: "/admin/withdraw-history" },
    ],
  },
  {
    id: "reports",
    title: "Reports",
    icon: <TbReport className="w-5 h-5" />,
    hasDropdown: true,
    children: [
      { title: "Daily ROI Report", path: "/admin/daily-roi" },
      { title: "Direct Incentive  Bonus", path: "/admin/direct-bonus" },
      { title: "Affiliate Program", path: "/admin/affiliate-program" },
      { title: "Parallel Bonus Report", path: "/admin/parallel-bonus-report" },
      // { title: "ODL Profit", path: "/admin/odl-profit" },
    ],
  },
  // {
  //   id: "bonanza",
  //   title: "Bonanza",
  //   icon: <MdOutlineCardGiftcard className="w-5 h-5" />,
  //   hasDropdown: true,
  //   children: [
  //     { title: "Royalty Bonus", path: "/admin/royalty-bonus" },
  //     { title: "Special Reward", path: "/admin/special-reward" },
  //   ],
  // },
  {
    id: "setting",
    title: "Settings",
    icon: <Settings className="w-5 h-5" />,
    hasDropdown: true,
    children: [
      { title: "ODL Setting", path: "/admin/odl-setting" },
      { title: "Level Setting", path: "/admin/level-setting" },
    ],
  },
  
];

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  variant = "default",
  isDarkMode = false,
}) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const auth = useSelector((state) => state.auth);
  const [lastLogin, setLastLogin] = useState("Not available");

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

  const getStoredSidebarExpanded = () => {
    try {
      return localStorage.getItem("sidebar-expanded") === "true";
    } catch (err) {
      console.warn("Failed to read sidebar state:", err);
      return false;
    }
  };

  const [sidebarExpanded, setSidebarExpanded] = useState(
    getStoredSidebarExpanded()
  );

  useEffect(() => {
    try {
      localStorage.setItem("sidebar-expanded", sidebarExpanded);
    } catch (err) {
      console.warn("Failed to save sidebar state:", err);
    }

    const body = document.querySelector("body");
    if (sidebarExpanded) {
      body.classList.add("sidebar-expanded");
    } else {
      body.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  // Helper function to check if a parent menu item should be active
  const isParentActive = (item) => {
    // If the item has a direct path and it matches the current path
    if (item.path && pathname === item.path) {
      return true;
    }
    
    // If the item has children, check if any child path matches the current path
    if (item.hasDropdown && item.children) {
      return item.children.some(child => !child.hidden && pathname === child.path);
    }
    
    return false;
  };

  // Render navItem dropdown children
  const renderNavItemChildren = (item, open) => {
    return item.children?.map((child, index) => {
      if (child.hidden) return null;

      return (
        <li key={`${item.id}-child-${index}`} className="mb-1 last:mb-0">
          <NavLink
            end
            to={child.path}
            className={({ isActive }) =>
              `block transition duration-150 truncate py-1 px-3 rounded-md ${
                isActive
                  ? "bg-gradient-to-r from-[#E20C88] via-[#571043] to-[#E20C88] bg-clip-text text-transparent"
                                  : "text-slate-600 hover:text-[#E20C88] dark:text-slate-400 dark:hover:text-[#E20C88]"
              }`
            }
          >
            <div className="flex items-center">
              <div className="w-1 h-1 rounded-full bg-current mr-2"></div>
              <span className="text-sm lg:hidden lg:sidebar-expanded:block duration-200">
                {child.title}
              </span>
            </div>
          </NavLink>
        </li>
      );
    });
  };

  return (
    <div className="min-w-fit">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "block" : "hidden pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40  left-0 top-0 rounded-2xl bg-white border-r border-r-2 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] w-64 lg:w-20 lg:sidebar-expanded:w-64 shrink-0 
       
        px-2 py-3 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
        style={{borderColor: "var(--color-primary)"}}
      >
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
          {/* Sidebar header */}
          <div className="flex justify-between w-full px-2">
            {/* Logo */}
            <NavLink end to="/admin/dashboard" className="block">
              <img
                src={isDarkMode ? logoLight : mainLogo}
                alt="Logo"
                className="w-[5rem] md:w-[6.5rem] h-[2.5rem] lg:hidden lg:sidebar-expanded:block"
              />
              <div className="hidden lg:block lg:sidebar-expanded:hidden">
                <img
                  src={sidebarLogoCollapsed}
                  alt="Sidebar Logo Small"
                  className="w-7 h-7"
                />
              </div>
            </NavLink>

            {/* Close button */}
            <button
              ref={trigger}
              className="lg:hidden text-slate-500 hover:text-slate-400 transition duration-150 cursor-pointer"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
            >
              <span className="sr-only">Close sidebar</span>
              <BiSolidArrowToLeft className="w-6 h-6 fill-current" />
            </button>
          </div>

          {/* Expand / collapse button */}
          <div className="hidden lg:inline-flex">
            <button
              className="text-slate-400 hover:text-[#571043] dark:text-slate-500 dark:hover:text-[#571043] transition duration-150 cursor-pointer"
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
            >
              <span className="sr-only">Expand / collapse sidebar</span>
              <BiArrowToRight
                className={`w-6 h-6 shrink-0 fill-current ${
                  sidebarExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-0.5 mb-6 mt-6 overflow-y-auto scrollbar-thin scrollbar-thumb-violet-200 dark:scrollbar-thumb-violet-900 scrollbar-track-transparent overflow-hidden">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-400 dark:text-slate-500 font-semibold tracking-wider mb-3 lg:hidden lg:sidebar-expanded:block">
              Menu
            </h3>
            <DropdownProvider>
              <ul className="space-y-1">
                {/* Map through navItems to generate sidebar links */}
                {navItems.map((item) => {
                  const isActive = isParentActive(item);

                  return (
                    <SidebarLinkGroup 
                      key={item.id} 
                      activecondition={isActive}
                      id={item.id} // Pass the ID to identify which dropdown is active
                    >
                      {(handleClick, open) => {
                        return (
                          <React.Fragment>
                            <a
                              href={item.path || "#0"}
                              className={`block transition duration-150 ${
                                isActive
                                  ? "bg-gradient-to-r from-[#E20C88] via-[#571043] to-[#E20C88] bg-clip-text text-transparent"
                                  : "text-slate-600 hover:text-[#E20C88] dark:text-slate-400 dark:hover:text-[#E20C88]"
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                if (item.hasDropdown) {
                                  handleClick();
                                  setSidebarExpanded(true);
                                } else if (item.path) {
                                  window.location.href = item.path;
                                }
                              }}
                            >
                              {item.path ? (
                                <NavLink end to={item.path}>
                                  <div
                                    className="flex items-center lg:justify-center lg:sidebar-expanded:justify-between py-1"
                                    title={item.title}
                                  >
                                    <div className="flex items-center">
                                      <span
                                        className={`bg-gradient-to-br ${
                                          isActive
                                            ? "from-[#571043] via-[#E20C88] to-[#FFAEDD]  dark:from-[#571043] dark:via-[#E20C88] dark:to-[#FFAEDD]"
                                            : "from-slate-400 to-slate-500 dark:from-slate-600 dark:to-slate-700"
                                        } 
                                        p-1.5 rounded-md text-white shadow-sm`}
                                      >
                                        {React.cloneElement(item.icon, {
                                          className: "w-4 h-4",
                                        })}
                                      </span>
                                      <span className="text-sm ml-3 font-medium lg:hidden lg:sidebar-expanded:block duration-200">
                                        {item.title}
                                      </span>
                                    </div>
                                  </div>
                                </NavLink>
                              ) : (
                                <div
                                  className="flex items-center lg:justify-center lg:sidebar-expanded:justify-between py-1"
                                  title={item.title}
                                >
                                  <div className="flex items-center">
                                    <span
                                      className={`bg-gradient-to-br ${
                                        isActive
                                           ? "from-[#571043] via-[#E20C88] to-[#FFAEDD]  dark:from-[#571043] dark:via-[#E20C88] dark:to-[#FFAEDD]"
                                            : "from-slate-400 to-slate-500 dark:from-slate-600 dark:to-slate-700"
                                      } 
                                      p-1.5 rounded-md text-white shadow-sm`}
                                    >
                                      {React.cloneElement(item.icon, {
                                        className: "w-4 h-4",
                                      })}
                                    </span>
                                    <span className="text-sm ml-3 font-medium lg:hidden lg:sidebar-expanded:block duration-200">
                                      {item.title}
                                    </span>
                                  </div>
                                  {item.hasDropdown && (
                                    <div className="flex shrink-0">
                                      <MdKeyboardArrowDown
                                        className={`w-5 h-5 shrink-0 lg:hidden lg:sidebar-expanded:block transition-transform duration-150 ml-1 text-slate-400 dark:text-slate-500 ${
                                          open && "rotate-180"
                                        }`}
                                      />
                                    </div>
                                  )}
                                </div>
                              )}
                            </a>
                            {item.hasDropdown && (
                              <div className="lg:hidden lg:sidebar-expanded:block">
                                <ul className={`pl-7 mt-1 ${!open && "hidden"}`}>
                                  {renderNavItemChildren(item, open)}
                                </ul>
                              </div>
                            )}
                          </React.Fragment>
                        );
                      }}
                    </SidebarLinkGroup>
                  );
                })}
              </ul>
            </DropdownProvider>
          </div>
        </div>

        {/* Admin profile section */}
        <div className="mt-auto border-t border-slate-100 dark:border-slate-800 pt-3">
          <div className="flex items-center lg:justify-center lg:px-0 lg:sidebar-expanded:px-2 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FFAEDD] via-[#E20C88] to-[#571043] dark:from-[#FFAEDD] dark:via-[#E20C88] dark:to-[#571043] flex items-center justify-center text-white font-medium text-sm">
              MA
            </div>
            <div className="ml-3 lg:hidden lg:sidebar-expanded:block duration-200">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                Master Admin
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Last Login: {lastLogin}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
