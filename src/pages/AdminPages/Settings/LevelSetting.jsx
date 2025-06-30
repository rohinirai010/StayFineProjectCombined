import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { XIcon, CheckIcon } from 'lucide-react';
import Header from "../../../partials/AdminPartials/Header";
import Sidebar from "../../../partials/AdminPartials/Sidebar";

// from authSlice (REDUX state management)
const ADMIN_PASSWORD = "admin123";

const LevelSetting = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Modal states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  
  // Last change timestamp
  const [lastChange, setLastChange] = useState('18 May 2025 16:54:69');

  // Fund levels with percentages
  const [igniteFundLevels, setIgniteFundLevels] = useState([
    { level: 1, percentage: 5 },
    { level: 2, percentage: 4 },
    { level: 3, percentage: 3 },
    { level: 4, percentage: 2 },
    { level: 5, percentage: 1 },
  ]);

  const [elevatePlusLevels, setElevatePlusLevels] = useState([
    { level: 1, percentage: 7 },
    { level: 2, percentage: 3 },
    { level: 3, percentage: 2 },
    { level: 4, percentage: 1 },
    { level: 5, percentage: 1 },
  ]);

  const [legacyVaultLevels, setLegacyVaultLevels] = useState([
    { level: 1, percentage: 10 },
    { level: 2, percentage: 3 },
    { level: 3, percentage: 2 },
    { level: 4, percentage: 1 },
    { level: 5, percentage: 1 },
    { level: 6, percentage: 1 },
    { level: 7, percentage: 0.5 },
    { level: 8, percentage: 0.5 },
    { level: 9, percentage: 0.5 },
    { level: 10, percentage: 0.5 },
  ]);

  // Handle percentage change for Ignite Fund levels
  const handleIgniteFundChange = (index, value) => {
    const parsedValue = parseFloat(value) || 0;
    const newLevels = [...igniteFundLevels];
    newLevels[index].percentage = parsedValue;
    setIgniteFundLevels(newLevels);
  };

  // Handle percentage change for Elevate Plus levels
  const handleElevatePlusChange = (index, value) => {
    const parsedValue = parseFloat(value) || 0;
    const newLevels = [...elevatePlusLevels];
    newLevels[index].percentage = parsedValue;
    setElevatePlusLevels(newLevels);
  };

  // Handle percentage change for Legacy Vault levels
  const handleLegacyVaultChange = (index, value) => {
    const parsedValue = parseFloat(value) || 0;
    const newLevels = [...legacyVaultLevels];
    newLevels[index].percentage = parsedValue;
    setLegacyVaultLevels(newLevels);
  };

  // Handle save button click
  const handleSave = () => {
    setShowConfirmModal(true);
  };

  // Handle confirmation
  const handleConfirm = () => {
    setShowConfirmModal(false);
    setShowPasswordModal(true);
  };

  // Handle password submission
  const handlePasswordSubmit = () => {
    if (password === ADMIN_PASSWORD) {
      // Save the changes
      setShowPasswordModal(false);
      
      // Update last change timestamp
      const now = new Date();
      const formattedDate = `${now.getDate()} ${now.toLocaleString('default', { month: 'short' })} ${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      setLastChange(formattedDate);
      
      toast.success("Level percentages updated successfully!", {
        position: "top-right",
        autoClose: 3000
      });
      
      // just for demo (dispatch an action to save to backend)
      console.log("Saving level changes with validated admin password");
      setPassword('');
    } else {
      toast.error("Incorrect password!", {
        position: "top-right",
        autoClose: 3000
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <ToastContainer theme={isDarkMode ? "dark" : "light"} />
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="w-full py-4 px-4 sm:px-4 md:py-8">
          <h1 className="text-2xl font-semibold mb-6 text-center">User Network Bounty Level Settings</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Ignite Fund Card */}
            <div className={`rounded-lg shadow-lg overflow-hidden ${isDarkMode ? 'bg-gradient-to-b from-blue-900 to-[#0d3b67]' : 'bg-gradient-to-b from-blue-900 to-[#0d3b67]'}`}>
              <div className="p-4 bg-white dark:bg-blue-950">
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300">Ignite Fund</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">Start from $100 to $999</p>
              </div>
              
              <div className="p-4 text-white">
               
                <div>
                  <p className="font-semibold mb-2">User Network Bounty</p>
                  <div className="space-y-2">
                    {igniteFundLevels.map((item, index) => (
                      <div key={index} className="flex items-center justify-between bg-blue-800 dark:bg-blue-800 rounded-lg p-2">
                        <span className="text-blue-300">Level {item.level}</span>
                        <div className="flex items-center">
                          <input
                            type="number"
                            value={item.percentage}
                            onChange={(e) => handleIgniteFundChange(index, e.target.value)}
                            className="w-12 bg-blue-700 text-right text-white rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-300"
                            min="0"
                            max="100"
                            step="0.1"
                          />
                          <span className="ml-1">%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Elevate Plus Card */}
            <div className={`rounded-lg shadow-lg overflow-hidden ${isDarkMode ? 'bg-gradient-to-b from-blue-900 to-[#0d3b67]' : 'bg-gradient-to-b from-blue-900 to-[#0d3b67]'}`}>
              <div className="p-4 bg-white dark:bg-indigo-950">
                <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">Elevate Plus</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">Start from $1000 to $9999</p>
              </div>
              
              <div className="p-4 text-white">
                
                <div>
                  <p className="font-semibold mb-2">User Network Bounty</p>
                  <div className="space-y-2">
                    {elevatePlusLevels.map((item, index) => (
                      <div key={index} className="flex items-center justify-between bg-indigo-800 dark:bg-indigo-800 rounded-lg p-2">
                        <span className="text-indigo-300">Level {item.level}</span>
                        <div className="flex items-center">
                          <input
                            type="number"
                            value={item.percentage}
                            onChange={(e) => handleElevatePlusChange(index, e.target.value)}
                            className="w-12 bg-indigo-700 text-right text-white rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-indigo-300"
                            min="0"
                            max="100"
                            step="0.1"
                          />
                          <span className="ml-1">%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Legacy Vault Card */}
            <div className={`rounded-lg shadow-lg overflow-hidden ${isDarkMode ? 'bg-gradient-to-b from-blue-900 to-[#0d3b67]' : 'bg-gradient-to-b from-blue-900 to-[#0d3b67]'}`}>
              <div className="p-4 bg-white dark:bg-blue-950">
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-300">Legacy Vault</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">Start from $10000 and above</p>
              </div>
              
              <div className="p-4 text-white">
               
                <div>
                  <p className="font-semibold mb-2">User Network Bounty</p>
                  <div className="grid grid-cols-2 gap-2">
                    {legacyVaultLevels.map((item, index) => (
                      <div key={index} className="flex items-center justify-between bg-blue-800 dark:bg-blue-800 rounded-lg p-2">
                        <span className="text-purple-300">L{item.level}</span>
                        <div className="flex items-center">
                          <input
                            type="number"
                            value={item.percentage}
                            onChange={(e) => handleLegacyVaultChange(index, e.target.value)}
                            className="w-12 bg-blue-700  text-right text-white rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-purple-300"
                            min="0"
                            max="100"
                            step="0.1"
                          />
                          <span className="ml-1">%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save button */}
          <div className="flex flex-col items-center justify-center mt-8 mb-6">
            <button
              onClick={handleSave}
              className="px-12 py-3 mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save
            </button>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              last change on: {lastChange}
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-50 z-50 p-4 backdrop-blur-xs">
          <div className={`p-6 rounded-lg shadow-xl w-full max-w-md ${isDarkMode ? 'dark:bg-gray-800 text-white' : 'bg-white text-gray-900'} transition-all transform`}>
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Confirm Changes
            </h3>
            <p className="mb-6">Are you sure you want to update the level percentages? Changes will be reflected to live user panel.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center"
              >
                <XIcon className="w-4 h-4 mr-1" />
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <CheckIcon className="w-4 h-4 mr-1" />
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-50 z-50 p-4 backdrop-blur-xs">
          <div className={`p-6 rounded-lg shadow-xl w-full max-w-md ${isDarkMode ? 'dark:bg-gray-800 text-white' : 'bg-white text-gray-900'} transition-all transform`}>
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Enter Admin Password
            </h3>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600' : ''}`}
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center"
              >
                <XIcon className="w-4 h-4 mr-1" />
                Cancel
              </button>
              <button
                onClick={handlePasswordSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <CheckIcon className="w-4 h-4 mr-1" />
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelSetting;