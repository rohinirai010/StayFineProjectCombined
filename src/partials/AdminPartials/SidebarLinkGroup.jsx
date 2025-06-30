import React, { useState, useContext, createContext } from 'react';

const DropdownContext = createContext({
  activeDropdown: null,
  setActiveDropdown: () => {}
});

export const DropdownProvider = ({ children }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  return (
    <DropdownContext.Provider value={{ activeDropdown, setActiveDropdown }}>
      {children}
    </DropdownContext.Provider>
  );
};

const SidebarLinkGroup = ({ children, activecondition, id }) => {
  const { activeDropdown, setActiveDropdown } = useContext(DropdownContext);
  const isOpen = id === activeDropdown;
  
  const handleClick = () => {
    setActiveDropdown(isOpen ? null : id);
  };

  return (
    <li 
      className={`
       py-1 px-2 rounded-lg mb-1 last:mb-0 
        transition-all duration-150 ease-in-out
        ${activecondition ? 
          'bg-purple-50 dark:bg-purple-600/20' : 
          'hover:bg-purple-50/50 dark:hover:bg-purple-600/10'
        }
      `}
    >
      {children(handleClick, isOpen)}
    </li>
  );
};

export default SidebarLinkGroup;