import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAdmin } from '../ReduxStateManagement/adminSlices/authSlice';
import Transition from '../utils/Transition';

import UserAvatar from '../images/user-avatar-32.png';
import { LogOut, Settings } from 'lucide-react';

function DropdownProfile({ align }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const dispatch = useDispatch();
  
  // Get user data from Redux store
  const { user } = useSelector(state => state.auth);
  const userEmail = user ? user.email : localStorage.getItem("userEmail");
  const userRole = user ? user.role : "User";
  
  // Check if we're on mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  // Check if sidebar is collapsed
  const [sidebarExpanded, setSidebarExpanded] = useState(() => {
    try {
      return localStorage.getItem('sidebar-expanded') === 'true';
    } catch (err) {
      return false;
    }
  });
  
  // Update on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Also listen for sidebar expansion state changes
    const checkSidebarState = () => {
      try {
        setSidebarExpanded(localStorage.getItem('sidebar-expanded') === 'true');
      } catch (err) {
        setSidebarExpanded(false);
      }
    };
    
    // Use MutationObserver to detect body class changes
    const observer = new MutationObserver(() => {
      const expanded = document.body.classList.contains('sidebar-expanded');
      setSidebarExpanded(expanded);
    });
    
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  // Handle sign out
  const handleSignOut = () => {
    dispatch(logoutAdmin()); // dispatch the logout action
    navigate('/'); // redirect to home page after logout
  };

  // Determine dropdown position based on sidebar state
  const getDropdownPosition = () => {
    if (isMobile) {
      // On mobile, position based on alignment
      return align === 'right' ? "right-0" : "left-0";
    } else if (!sidebarExpanded) {
      // Desktop collapsed sidebar: position to the right of the sidebar
      return align === 'right' ? "right-auto left-0" : "left-auto right-0 -translate-x-0 translate-y-0";
    } else {
      // Desktop expanded sidebar: normal positioning
      return align === 'right' ? "right-0" : "left-0";
    }
  };

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <img 
          className="w-8 h-8 rounded-full" 
          src={UserAvatar} 
          width="32" 
          height="32" 
          alt="User" 
        />
        {/* Only show username if sidebar is expanded or on mobile */}
        {(sidebarExpanded || isMobile) && (
          <div className="flex items-center truncate">
            <span className="truncate ml-2 text-sm font-medium text-gray-600 dark:text-gray-100 group-hover:text-gray-800 dark:group-hover:text-white">
              {userEmail ? userEmail.split('@')[0] : 'Guest'}
            </span>
            <svg className="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500" viewBox="0 0 12 12">
              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
            </svg>
          </div>
        )}
      </button>

      <Transition
        className={`origin-top-right z-50 absolute top-full w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1 rounded-lg shadow-lg overflow-hidden mt-1 ${getDropdownPosition()}`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200 dark:border-gray-700/60">
            <div className="font-medium text-gray-800 dark:text-gray-100">{userEmail || 'Guest'}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 italic">{userRole}</div>
          </div>
          <ul>
            <li>
              <Link
                className="font-medium text-sm text-[#E20C88] hover:text-[#E20C88]/80 dark:hover:text-[#E20C88]/80 flex items-center gap-2 py-1 px-3 cursor-pointer"
                to="/settings"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
               <Settings className='w-4 h-4' /> Settings
              </Link>
            </li>
            <li>
              <button
                className="font-medium text-sm text-[#E20C88] hover:text-[#E20C88]/80 dark:hover:text-[#E20C88]/80 flex items-center gap-2 py-1 px-3 w-full text-left cursor-pointer"
                onClick={() => {
                  setDropdownOpen(false);
                  handleSignOut();
                }}
              >
               <LogOut className='w-4 h-4'  /> Sign Out
              </button>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownProfile;
