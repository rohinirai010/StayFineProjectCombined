import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { format, addHours } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { XIcon, CheckIcon } from 'lucide-react';
import Header from "../../../partials/AdminPartials/Header";
import Sidebar from "../../../partials/AdminPartials/Sidebar";

// from authSlice (REDUX state management)
const ADMIN_PASSWORD = "admin123";

const OdlSetting = () => {
  // State for form values
  const [turnover, setTurnover] = useState(100000);
  const [ctoPercentage, setCtoPercentage] = useState(5);
  const [ctoAmount, setCtoAmount] = useState(5000);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Fund distribution percentages
  const [fundDistribution, setFundDistribution] = useState({
    igniteFund: 20,
    elevatePlus: 30,
    legacyVault: 50
  });

  // Fund amounts
  const [fundAmounts, setFundAmounts] = useState({
    igniteFund: 1000,
    elevatePlus: 1500,
    legacyVault: 2500
  });

  // Slabs data structure (fixed ranges as per requirements)
  const [slabs, setSlabs] = useState({
    igniteFund: [
      { range: "$100 - $250", percentage: 30, amount: 300 },
      { range: "$251 - $500", percentage: 20, amount: 200 },
      { range: "$501 - $999", percentage: 50, amount: 500 }
    ],
    elevatePlus: [
      { range: "$1000 - $2500", percentage: 30, amount: 450 },
      { range: "$2501 - $5000", percentage: 20, amount: 300 },
      { range: "$5001 - $9999", percentage: 50, amount: 750 }
    ],
    legacyVault: [
      { range: "$10000 - $25000", percentage: 30, amount: 750 },
      { range: "$25001 - $50000", percentage: 20, amount: 500 },
      { range: "$50001 - $99999", percentage: 50, amount: 1250 }
    ]
  });

  // Modal states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');

  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // current user from Redux store
  const { admin } = useSelector(state => state.adminAuth || {});

  // Dynamic closing date (72 hours from now)
  const [closingDate, setClosingDate] = useState(addHours(new Date(), 72));

  // Calculate next closing date (every 72 hours)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const nextClosingDate = addHours(now, 72);
      setClosingDate(nextClosingDate);
    }, 60000); 
    
    return () => clearInterval(interval);
  }, []);

  // Calculate CTO amount whenever turnover or percentage changes
  useEffect(() => {
    const calculatedAmount = (turnover * ctoPercentage) / 100;
    setCtoAmount(calculatedAmount);
    
    // Update fund amounts based on fund distribution
    const updatedFundAmounts = {
      igniteFund: (calculatedAmount * fundDistribution.igniteFund) / 100,
      elevatePlus: (calculatedAmount * fundDistribution.elevatePlus) / 100,
      legacyVault: (calculatedAmount * fundDistribution.legacyVault) / 100
    };
    
    setFundAmounts(updatedFundAmounts);
    
    // Update slab amounts for each fund
    const updatedSlabs = {...slabs};
    
    Object.keys(updatedSlabs).forEach(fund => {
      const fundAmount = updatedFundAmounts[fund];
      updatedSlabs[fund] = updatedSlabs[fund].map(slab => ({
        ...slab,
        amount: (fundAmount * slab.percentage) / 100
      }));
    });
    
    setSlabs(updatedSlabs);
  }, [turnover, ctoPercentage, fundDistribution]);

  // Update slab when fund percentages change
  const updateSlabPercentage = (fund, slabIndex, newPercentage) => {
    const intValue = parseInt(newPercentage, 10) || 0;
    
    const newSlabs = {...slabs};
    newSlabs[fund][slabIndex].percentage = intValue;
    
    // Recalculate amounts
    const fundAmount = fundAmounts[fund];
    newSlabs[fund][slabIndex].amount = (fundAmount * intValue) / 100;
    
    setSlabs(newSlabs);
  };

  // Handle fund distribution percentage change
  const handleFundPercentageChange = (fund, value) => {
    const intValue = parseInt(value, 10) || 0;
    
    const updatedDistribution = {
      ...fundDistribution,
      [fund]: intValue
    };
    
    setFundDistribution(updatedDistribution);
    
    // Update fund amounts
    const updatedAmount = (ctoAmount * intValue) / 100;
    setFundAmounts({
      ...fundAmounts,
      [fund]: updatedAmount
    });
  };

  // Handle fund amount change
  const handleFundAmountChange = (fund, value) => {
    const intValue = parseInt(value, 10) || 0;
    setFundAmounts({
      ...fundAmounts,
      [fund]: intValue
    });
    
    // Update fund percentage based on amount
    if (ctoAmount > 0) {
      const updatedPercentage = Math.round((intValue / ctoAmount) * 100);
      setFundDistribution({
        ...fundDistribution,
        [fund]: updatedPercentage
      });
    }
  };

  // Handle save button click
  const handleSave = () => {
    // Validate that fund percentages add up to 100%
    const totalPercentage = Object.values(fundDistribution).reduce((sum, val) => sum + val, 0);
    if (totalPercentage !== 100) {
      toast.error("Fund distribution percentages must add up to 100%", {
        position: "top-right",
        autoClose: 3000
      });
      return;
    }
    
    // Validate each slab's percentages add up to 100%
    for (const fund of Object.keys(slabs)) {
      const slabTotal = slabs[fund].reduce((sum, slab) => sum + slab.percentage, 0);
      if (slabTotal !== 100) {
        toast.error(`${fund} slabs percentages must add up to 100%`, {
          position: "top-right",
          autoClose: 3000
        });
        return;
      }
    }
    
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
      toast.success("Changes saved successfully!", {
        position: "top-right",
        autoClose: 3000
      });
      
      // just for demo (dispatch an action to save to backend)
      console.log("Saving changes with validated admin password");
      setPassword('');
    } else {
      toast.error("Incorrect password!", {
        position: "top-right",
        autoClose: 3000
      });
    }
  };

  // Format currency function
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <ToastContainer theme={isDarkMode ? "dark" : "light"} />
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="container mx-auto py-4 px-2 sm:px-4 md:py-8">
          
          {/* Top box - Company Turnover */}
          <div className="flex justify-center ">
            <div className={`w-full max-w-sm p-4 sm:p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gradient-to-b from-blue-900 to-[#0d3b67]' : 'bg-gradient-to-r from-blue-600 to-indigo-500'} text-white transition-all`}>
              <h2 className="text-lg  font-semibold text-[#3fadf8]">Company Turnover</h2>
              <div className="flex items-center mb-2">
                <span className="text-xl ">$</span>
                <div className='border-b-2 border-gray-200'>

                <input
                  type="number"
                  value={turnover}
                  onChange={(e) => setTurnover(parseInt(e.target.value) || 0)}
                  className="bg-transparent  w-full text-3xl font-bold  withdraw-input"
                />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                <div>
                  <div className="text-[17px] font-medium text-[#3fadf8]">Closing Date:</div>
                  <div className="text-[16px] font-bold mb-2 text-[#3fadf8]">
                    {format(closingDate, 'dd MMM yyyy | h:mm a')}
                  </div>
                </div>
                <div className="flex items-center mt-2 sm:mt-0">
                  <div className="text-xs mr-2">Time Remaining</div>
                  <div className="text-sm font-medium">
                    {`${Math.floor((closingDate - new Date()) / (1000 * 60 * 60))} hours`}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className='border-b-2 border-gray-200'>

                <input
                  type="number"
                  value={ctoPercentage}
                  onChange={(e) => setCtoPercentage(parseInt(e.target.value) || 0)}
                  className="bg-transparent w-14 text-lg  withdraw-input"
                  min="0"
                  max="100"
                />
                </div>
                <span className="text-lg text-[#3fadf8] font-semibold">% of C.T.O.</span>
              </div>
              
              <div className="flex items-center mt-2">
                <span className="text-3xl mr-2">$</span>
                <input
                  type="number"
                  value={ctoAmount}
                  className="bg-transparent border-b w-full text-4xl font-bold withdraw-input "
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Tree structure for funds */}
          <div className="relative mb-8">
            {/* Connecting lines  */}
            <div className="hidden md:block absolute left-1/2 top-0 w-px h-12 bg-gray-400"></div>
            <div className="hidden md:block absolute left-1/4 top-12 w-1/2 h-px bg-gray-400"></div>
            <div className="hidden md:block absolute left-1/4 top-12 w-px h-12 bg-gray-400"></div>
            <div className="hidden md:block absolute left-1/2 top-12 w-px h-12 bg-gray-400"></div>
            <div className="hidden md:block absolute left-3/4 top-12 w-px h-12 bg-gray-400"></div>

            {/* Fund boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pt-4 md:pt-24">
              {/* Ignite Fund */}
              <div className={`p-4 rounded-lg ${isDarkMode ? 'dark:bg-gray-800' : 'bg-white'} shadow-md transition-all`}>
                <div className="text-purple-600 text-xl font-semibold mb-2">Ignite Fund</div>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-xl sm:text-2xl font-bold flex items-center">
                    <input
                      type="number"
                      value={fundDistribution.igniteFund}
                      onChange={(e) => handleFundPercentageChange('igniteFund', e.target.value)}
                      className={`w-16 ${isDarkMode ? 'dark:bg-gray-700' : 'bg-gray-100'} rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      min="0"
                      max="100"
                    />
                    <span className="ml-1">%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm mr-1">$</span>
                    <input
                      type="number"
                      value={Math.round(fundAmounts.igniteFund)}
                      onChange={(e) => handleFundAmountChange('igniteFund', e.target.value)}
                      className={`w-20 ${isDarkMode ? 'dark:bg-gray-700' : 'bg-gray-100'} rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                  </div>
                </div>

                {/* Slabs */}
                <div className="mt-6 space-y-4">
                  {slabs.igniteFund.map((slab, index) => (
                    <div key={index} className={`p-3 rounded ${isDarkMode ? 'dark:bg-gray-700' : 'bg-gray-100'} hover:shadow-md transition-all`}>
                        <div className='flex flex-row justify-between items-center'>

                      <div className="text-base text-gray-300 dark:text-gray-300">
                        {index + 1} Slab
                      </div>
                      <div className="text-lg  font-semibold">{slab.range}</div>
                        </div>
                      <div className="flex justify-between items-center mt-1">
                        <div className="flex items-center">
                          <input
                            type="number"
                            value={slab.percentage}
                            onChange={(e) => updateSlabPercentage('igniteFund', index, e.target.value)}
                            className={`w-12 ${isDarkMode ? 'dark:bg-gray-600' : 'bg-white'} rounded px-1 py-0.5 focus:outline-none`}
                            min="0"
                            max="100"
                          />
                          <span className="ml-1 text-xl">%</span>
                        </div>
                        <div className="text-base font-medium">{formatCurrency(Math.round(slab.amount))}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Elevate Plus */}
              <div className={`p-4 rounded-lg ${isDarkMode ? 'dark:bg-gray-800' : 'bg-white'} shadow-md transition-all`}>
                <div className="text-blue-600 text-xl font-semibold mb-2">Elevate Plus</div>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-xl sm:text-2xl font-bold flex items-center">
                    <input
                      type="number"
                      value={fundDistribution.elevatePlus}
                      onChange={(e) => handleFundPercentageChange('elevatePlus', e.target.value)}
                      className={`w-16 ${isDarkMode ? 'dark:bg-gray-700' : 'bg-gray-100'} rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      min="0"
                      max="100"
                    />
                    <span className="ml-1">%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm mr-1">$</span>
                    <input
                      type="number"
                      value={Math.round(fundAmounts.elevatePlus)}
                      onChange={(e) => handleFundAmountChange('elevatePlus', e.target.value)}
                      className={`w-20 ${isDarkMode ? 'dark:bg-gray-700' : 'bg-gray-100'} rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                </div>

                {/* Slabs */}
                <div className="mt-6 space-y-4">
                  {slabs.elevatePlus.map((slab, index) => (
                    <div key={index} className={`p-3 rounded ${isDarkMode ? 'dark:bg-gray-700' : 'bg-gray-100'} hover:shadow-md transition-all`}>
                        <div className='flex flex-row items-center justify-between'>

                      <div className="text-base text-gray-500 dark:text-gray-400">
                        {index + 1} Slab
                      </div>
                      <div className="text-lg font-semibold">{slab.range}</div>
                        </div>
                      <div className="flex justify-between items-center mt-1">
                        <div className="flex items-center">
                          <input
                            type="number"
                            value={slab.percentage}
                            onChange={(e) => updateSlabPercentage('elevatePlus', index, e.target.value)}
                            className={`w-12 ${isDarkMode ? 'dark:bg-gray-600' : 'bg-white'} rounded px-1 py-0.5 focus:outline-none`}
                            min="0"
                            max="100"
                          />
                          <span className="ml-1 text-xl">%</span>
                        </div>
                        <div className="text-base font-medium">{formatCurrency(Math.round(slab.amount))}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legacy Vault */}
              <div className={`p-4 rounded-lg ${isDarkMode ? 'dark:bg-gray-800' : 'bg-white'} shadow-md transition-all`}>
                <div className="text-green-600 text-xl font-semibold mb-2">Legacy Vault</div>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-xl sm:text-2xl font-bold flex items-center">
                    <input
                      type="number"
                      value={fundDistribution.legacyVault}
                      onChange={(e) => handleFundPercentageChange('legacyVault', e.target.value)}
                      className={`w-16 ${isDarkMode ? 'dark:bg-gray-700' : 'bg-gray-100'} rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500`}
                      min="0"
                      max="100"
                    />
                    <span className="ml-1">%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm mr-1">$</span>
                    <input
                      type="number"
                      value={Math.round(fundAmounts.legacyVault)}
                      onChange={(e) => handleFundAmountChange('legacyVault', e.target.value)}
                      className={`w-20 ${isDarkMode ? 'dark:bg-gray-700' : 'bg-gray-100'} rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500`}
                    />
                  </div>
                </div>

                {/* Slabs */}
                <div className="mt-6 space-y-4">
                  {slabs.legacyVault.map((slab, index) => (
                    <div key={index} className={`p-3 rounded ${isDarkMode ? 'dark:bg-gray-700' : 'bg-gray-100'} hover:shadow-md transition-all`}>
                        <div className='flex flex-row items-center justify-between'>

                      <div className="text-base text-gray-500 dark:text-gray-400">
                        {index + 1} Slab
                      </div>
                      <div className="text-lg font-semibold">{slab.range}</div>
                        </div>
                      <div className="flex justify-between items-center mt-1">
                        <div className="flex items-center">
                          <input
                            type="number"
                            value={slab.percentage}
                            onChange={(e) => updateSlabPercentage('legacyVault', index, e.target.value)}
                            className={`w-12 ${isDarkMode ? 'dark:bg-gray-600' : 'bg-white'} rounded px-1 py-0.5 focus:outline-none`}
                            min="0"
                            max="100"
                          />
                          <span className="ml-1 text-xl">%</span>
                        </div>
                        <div className="text-base font-medium">{formatCurrency(Math.round(slab.amount))}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>


          {/* Save button */}
          <div className="flex justify-center mt-8 mb-6">
            <button
              onClick={handleSave}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
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
            <p className="mb-6">Are you sure you want to change these fields? Changes will be reflected to live user panel.</p>
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

export default OdlSetting;