import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin, clearErrors, refreshCaptcha, checkIpBlocked } from "../../ReduxStateManagement/adminSlices/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginLogo from "../../images/AuthLogo.png";
// import loginBgImg from "../../images/loginBgImg.png"

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [errors, setErrors] = useState({});
  const [ipInfo, setIpInfo] = useState({ ip: "Loading...", country: "" });
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { 
    loading, 
    error, 
    errorCode, 
    isAuthenticated, 
    successMessage, 
    captcha, 
    failedAttempts,
    attemptsLeft,
    ipBlocked,
    blockTimeRemaining 
  } = useSelector((state) => state.adminAuth);

  // Fetch IP address on component mount and check if it's blocked
  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await fetch('https://api.db-ip.com/v2/free/self');
        if (!response.ok) throw new Error('Failed to fetch IP data');
        const data = await response.json();
        
        const ipAddress = data.ipAddress;
        setIpInfo({
          ip: ipAddress,
          country: data.countryName || ""
        });
        
        // Check if this IP is blocked
        dispatch(checkIpBlocked(ipAddress));
      } catch (error) {
        console.error("Error fetching IP:", error);
        setIpInfo({ ip: "Could not determine", country: "" });
      }
    };
    
    fetchIpAddress();
    
    // Generate initial captcha
    dispatch(refreshCaptcha());
    
    // Setup interval to refresh block time remaining if IP is blocked
    const intervalId = setInterval(() => {
      if (ipBlocked) {
        dispatch(checkIpBlocked(ipInfo.ip));
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(intervalId);
  }, [dispatch, ipBlocked, ipInfo.ip]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      if (errorCode === 401) {
        if (attemptsLeft > 0) {
          toast.error(`Invalid username or password. You have ${attemptsLeft} ${attemptsLeft === 1 ? 'attempt' : 'attempts'} left.`);
        } else {
          toast.error("Too many failed attempts. Your IP has been blocked for 1 hour.");
        }
      } else if (errorCode === 403) {
        toast.error("Account locked. Please contact support");
      } else if (errorCode === 429) {
        toast.error(`Too many attempts. IP blocked for 1 hour. Try again at ${new Date(Date.now() + blockTimeRemaining).toLocaleTimeString()}`);
      } else if (errorCode === 400) {
        toast.error("Invalid CAPTCHA. Please try again");
        dispatch(refreshCaptcha());
      } else {
        toast.error(error);
      }
      
      setTimeout(() => {
        dispatch(clearErrors());
      }, 5000);
    }
  }, [error, errorCode, attemptsLeft, blockTimeRemaining, dispatch]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, {
        autoClose: 3000,  
        onClose: () => navigate("/anjo/dashboard")
      });
    }
  }, [successMessage, navigate]);

  const validate = () => {
    const newErrors = {};
    
    if (!username.trim()) {
      newErrors.username = "Username is required";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    }

    if (!captchaInput.trim()) {
      newErrors.captcha = "CAPTCHA verification is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    dispatch(loginAdmin({ username, password, captchaInput, ip: ipInfo.ip }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRefreshCaptcha = () => {
    dispatch(refreshCaptcha());
    setCaptchaInput("");
  };

  // Format remaining block time
  const formatBlockTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  // If IP is blocked, show blocked message
  if (ipBlocked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#171b2e] p-4">
        <div className="bg-red-800 rounded-xl p-6 max-w-md text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl font-bold text-white mb-2">Access Blocked</h2>
          <p className="text-red-100 mb-4">
            Too many failed login attempts detected from your IP address ({ipInfo.ip}).
          </p>
          <div className="bg-red-900 p-3 rounded-lg mb-4">
            <p className="text-white font-semibold">Please try again after:</p>
            <p className="text-xl text-red-100">{formatBlockTime(blockTimeRemaining)}</p>
          </div>
          <p className="text-sm text-red-200">
            For immediate assistance, please contact system administrator.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden" style={{background: "var(--color-white)"}}>
      {/* Background image with responsive styling */}
      {/* <div className="absolute inset-0 z-0">
        <div className="w-full h-full overflow-hidden">
          <img 
            src={loginBgImg} 
            alt="Background" 
            className="object-cover  opacity-100 absolute top-0 md:top-8   right-0 w-[50rem] md:w-[58rem] h-[20rem] md:h-auto md:object-right" 
          />
        </div>
      </div> */}

      <div className="w-full max-w-md flex flex-col items-center z-10 px-4 sm:px-0 py-8 ">
        {/* Logo container */}
        <div className="mb-8 flex flex-col items-center">
          <img src={loginLogo} alt="Rippfarm Logo" className="w-34 h-16 md:w-50 md:h-22" />
          {/* Brand name */}
          {/* <img src={loginBrandName} alt="Login Brand Name" className="w-auto h-6 md:h-8 mt-3 md:mt-4" /> */}
        </div>
        
        <form onSubmit={handleSubmit} className="w-full px-2 md:px-12">
          <div className="mb-4 md:mb-5">
            <label 
              htmlFor="username" 
              className="block text-gray-600 text-sm md:text-[15px] mb-1"
              
            >
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 bottom-1 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-lg">@</span>
              </div>
              <input
                id="username"
                type="text"
                className="w-full text-sm md:text-base pl-10 pr-3 md:pl-10 md:pr-4 py-2 md:py-3 bg-white text-gray-700 rounded-xl md:rounded-2xl focus:ring-1 ring-[#E20C88]"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your Username"
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>
          
          <div className="mb-5">
            <label 
              htmlFor="password" 
              className="block text-gray-600 text-sm md:text-[15px] mb-1"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full text-sm md:text-base pl-10 pr-10 md:pl-10 md:pr-12 py-2 md:py-3 bg-white text-gray-700 rounded-xl md:rounded-2xl focus:ring-1 ring-[#E20C88]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your Password"
              />
              <div 
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
            {/* Display attempts remaining if there have been failed attempts */}
            {failedAttempts > 0 && attemptsLeft > 0 && (
              <p className="text-amber-500 text-xs mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                You have {attemptsLeft} {attemptsLeft === 1 ? 'attempt' : 'attempts'} remaining before your IP is blocked
              </p>
            )}
          </div>
          
          {/* CAPTCHA Section */}
          <div className="mb-6">
            <label 
              htmlFor="captcha" 
              className="block text-gray-600 text-sm md:text-[15px] mb-1"
            >
              Security Verification
            </label>
            <div className="bg-gray-800 p-3 rounded-xl md:rounded-2xl mb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex-grow">
                  <p className="text-white text-sm font-mono py-2 px-3 bg-gray-700 rounded-lg tracking-wider">
                    {captcha?.text || "Loading..."}
                  </p>
                </div>
                <button 
                  type="button" 
                  onClick={handleRefreshCaptcha}
                  className="ml-3 p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <input
                id="captcha"
                type="text"
                className="w-full text-sm md:text-base pl-3 pr-3 py-2 md:py-3 bg-white text-gray-700 rounded-xl md:rounded-2xl focus:ring-1 ring-[#E20C88]"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                placeholder="Enter above text"
              />
            </div>
            {errors.captcha && (
              <p className="text-red-500 text-xs mt-1">{errors.captcha}</p>
            )}
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-10 py-2 rounded-full bg-gradient-to-r from-[#E20C88]  to-[#571043] text-white font-medium focus:outline-none hover:to-[#E20C88]   hover:from-[#571043] transition-all duration-300 shadow-md cursor-pointer"
            >
              {loading ? "Please wait..." : "Enter ›››"}
            </button>
          </div>
        </form>
        
        <div className="mt-8 md:mt-6 text-gray-400 text-xs md:text-sm">
          Your IP Address: {ipInfo.ip}{ipInfo.country ? ` | ${ipInfo.country}` : ''}
        </div>
      </div>
      
      {/* Logo in bottom right - made responsive */}
      <div className="absolute bottom-2 right-4 md:bottom-4 md:right-6 text-[21px] md:text-[32px] text-gray-500 opacity-30">
        <span className="font-bold text-[25px] md:text-[38px]">Stay</span>Fine
      </div>
      
      <ToastContainer position="top-center" autoClose={5000} style={{ fontSize: '14px', zIndex: 9999 }}
  theme="colored"/>
    </div>
  );
}

