import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Transition from "../utils/Transition";
import { useDispatch, useSelector } from 'react-redux';
import { logoutAdmin } from '../ReduxStateManagement/adminSlices/authSlice'; 

import UserAvatar from "../images/user-avatar-32.png";
import { LogOut, Settings } from "lucide-react";

function DropdownProfile({ align }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { admin, loading } = useSelector((state) => state.adminAuth);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const handleSignOut = async () => {
    setDropdownOpen(false);
    
    try {
      await dispatch(logoutAdmin()).unwrap();
      
      // Navigate after logout is complete
      navigate('/admin/login', { replace: true });
      
    } catch (error) {
      console.error("Logout error:", error);
      navigate('/admin/login', { replace: true });
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
        disabled={loading} // ✅ Disable during logout
      >
        <img
          className="w-8 h-8 rounded-full"
          src={UserAvatar}
          width="32"
          height="32"
          alt="User"
        />
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium text-gray-600 dark:text-gray-100 group-hover:text-gray-800 dark:group-hover:text-white">
            {admin?.username || "Admin"}
          </span>
          <svg
            className="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1 ${
          align === "right" ? "right-0" : "left-0"
        }`}
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
            <div className="font-medium text-gray-800 dark:text-gray-100">
              {admin?.name || "BTechMine Admin"}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 italic">
              Administrator
            </div>
          </div>
          <ul>
            <li>
              <Link
                className="font-medium text-sm text-[#E20C88] hover:text-[#E20C88]/80 dark:hover:text-[#E20C88]/80 flex items-center gap-2 py-1 px-3 cursor-pointer"
                to="/settings"
                onClick={() => setDropdownOpen(false)}
              >
                <Settings className='w-4 h-4' />  Settings
              </Link>
            </li>
            <li>
              <button
                className="font-medium text-sm text-[#E20C88] hover:text-[#E20C88]/80 dark:hover:text-[#E20C88]/80 flex items-center gap-2 py-1 px-3 cursor-pointer w-full text-left disabled:opacity-50"
                onClick={handleSignOut}
                disabled={loading} 
              >
                <LogOut className='w-4 h-4' /> {loading ? "Signing Out..." : "Sign Out"}
              </button>
            </li>
            
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownProfile;