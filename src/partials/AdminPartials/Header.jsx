import React, { useState } from 'react';

import SearchModal from '../../components/ModalSearch';
import Notifications from '../../components/DropdownNotifications';
import Help from '../../components/DropdownHelp';
import UserMenu from '../../components/DropdownProfile';
import ThemeToggle from '../../components/ThemeToggle';

function Header({
  sidebarOpen,
  setSidebarOpen,
  variant = 'default',
}) {

  const [searchModalOpen, setSearchModalOpen] = useState(false)

  return (
    <header className={`sticky top-0 before:absolute before:inset-0 before:backdrop-blur-md max-lg:before:bg-white/90 dark:max-lg:before:bg-purple-900/20 before:-z-10 z-30 ${variant === 'v2' || variant === 'v3' ? 'before:bg-white after:absolute after:h-px after:inset-x-0 after:top-full after:bg-purple-200 dark:after:bg-slate-700/60 after:-z-10' : 'max-lg:shadow-lg max-lg:shadow-violet-500/5 lg:before:bg-white/90 dark:lg:before:bg-purple-900/20'} ${variant === 'v2' ? 'dark:before:bg-purple-900/20' : ''} ${variant === 'v3' ? 'dark:before:bg-purple-900/20' : ''}`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-15 ${variant === 'v2' || variant === 'v3' ? '' : 'lg:border-b border-purple-200 dark:border-slate-700/60'}`}>

          {/* Header: Left side */}
          <div className="flex">

            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => { e.stopPropagation(); setSidebarOpen(!sidebarOpen); }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>

          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            <div className='hidden'>
              <button
                className={` w-8 h-8 flex items-center justify-center hover:bg-purple-50 lg:hover:bg-purple-100 dark:hover:bg-purple-600/10 dark:lg:hover:bg-purple-600/20 rounded-full ml-3 ${searchModalOpen && 'bg-purple-100 dark:bg-purple-600/20'}`}
                onClick={(e) => { e.stopPropagation(); setSearchModalOpen(true); }}
                aria-controls="search-modal"
              >
                <span className="sr-only">Search</span>
                <svg
                  className="fill-current text-slate-500/80 dark:text-slate-400/80"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7ZM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Z" />
                  <path d="m13.314 11.9 2.393 2.393a.999.999 0 1 1-1.414 1.414L11.9 13.314a8.019 8.019 0 0 0 1.414-1.414Z" />
                </svg>
              </button>
              <SearchModal id="search-modal" searchId="search" modalOpen={searchModalOpen} setModalOpen={setSearchModalOpen} />
            </div>
            <div className='hidden'>

            <Notifications align="right" />
            </div>
            <div className='hidden'>

            <Help align="right" />
            </div>
            <div className='hidden'>

            <ThemeToggle />
            </div>
            {/*  Divider */}
            <hr className="w-px h-6 bg-purple-200 dark:bg-slate-700/60 border-none" />
            <UserMenu align="right" />

          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;
