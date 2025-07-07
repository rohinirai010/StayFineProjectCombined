import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { loadUser } from "../ReduxStateManagement/user/slices/authSlice";
import {
  Check,
  Copy,
  CheckCheck,
  ArrowRight,
  Star,
  Shield,
  Zap,
} from "lucide-react";
import AuthLogo from "../images/AuthLogo.png";

// Reusable Components
const ProfileShimmer = () => (
  <>
    {Array(4)
      .fill(0)
      .map((_, index) => (
        <motion.div
          key={index}
          className="flex justify-between items-center py-4 px-4 bg-white/5 rounded-lg relative overflow-hidden"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.1 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"
            animate={{ x: [-200, 300] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 0.5,
            }}
          />
          <div className="h-4 w-24 bg-gray-300/30 rounded-md"></div>
          <div className="h-4 w-32 bg-gray-300/30 rounded-md"></div>
        </motion.div>
      ))}
  </>
);

const ProfileData = ({ user, isMobile = false }) => {
  const [copiedField, setCopiedField] = useState(null);

  const profileData = useMemo(() => {
    return {
      "Full Name": user?.fullName || user?.username || "N/A",
      UserId: user?.username || "N/A",
      Password: user?.password || "N/A",
      Email: user?.email || "N/A",
      Mobile: user?.mobile || "N/A",
    };
  }, [user]);

  const copyToClipboard = (label, text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedField(label);
        setTimeout(() => setCopiedField(null), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <>
      {Object.entries(profileData)
        .filter(([_, value]) => value && value !== "N/A")
        .map(([label, value], index) => (
          <motion.div
            key={label}
            className={`flex justify-between items-center ${
              isMobile ? "py-2 px-3" : "py-2 px-4"
            } bg-white/5 rounded-lg hover:bg-white/10 transition-colors relative overflow-hidden`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          >
            <span
              className={`${
                isMobile ? "text-xs" : "text-sm"
              } font-medium text-gray-600`}
            >
              {label}:
            </span>
            <div className="flex items-center gap-2">
              <motion.span
                className={`${
                  isMobile ? "text-xs" : "text-sm"
                } font-semibold text-gray-800 max-w-32 truncate`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.12 }}
              >
                {value}
              </motion.span>

              <motion.button
                onClick={() => copyToClipboard(label, value)}
                className="text-blue-500 hover:text-blue-600 focus:outline-none transition-colors p-1 rounded hover:bg-blue-50"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                aria-label={`Copy ${label}`}
                title={`Copy ${label}`}
              >
                {copiedField === label ? (
                  <CheckCheck
                    className={`${
                      isMobile ? "w-3 h-3" : "w-4 h-4"
                    } text-green-500`}
                  />
                ) : (
                  <Copy className={`${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
                )}
              </motion.button>
            </div>
          </motion.div>
        ))}
    </>
  );
};

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay,
  isMobile = false,
}) => (
  <motion.div
    className={`bg-white/80 backdrop-blur-sm rounded-xl ${
      isMobile ? "p-1.5" : "p-4"
    } shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    <div
      className={`${
        isMobile ? "w-5 h-5 " : "w-9 h-9"
      } bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-1`}
    >
      <Icon className={`${isMobile ? "w-3.5 h-3.5" : "w-5 h-5"} text-white`} />
    </div>
    <h3
      className={`${
        isMobile ? "text-[12px]" : "text-[15.5px]"
      } font-semibold text-gray-800 mb-1`}
    >
      {title}
    </h3>
    <p className={`text-gray-600 ${isMobile ? "text-[11px]" : "text-[12.5px]"}`}>
      {description}
    </p>
  </motion.div>
);

// Swipe to Dashboard Component
const SwipeToDashboard = ({ onSwipeComplete, isEnabled, isMobile = false }) => {
  const x = useMotionValue(0);
  const maxDrag = isMobile ? 200 : 240;
  const width = useTransform(x, [0, maxDrag], ["0%", "100%"]);
  const dragOpacity = useTransform(x, [0, maxDrag], [1, 0]);

  const handleDragEnd = (event, info) => {
    if (info.offset.x >= (isMobile ? 60 : 80) && isEnabled) {
      onSwipeComplete();
    }
  };

  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main button container */}
      <motion.div
        className={`relative  ${
          isMobile ? "h-11 w-[80%] mx-auto" : "w-full h-12 sm:h-14"
        } border-2 ${
          isEnabled
            ? "border-blue-500 bg-gradient-to-r from-blue-500 to-purple-500"
            : "border-gray-300 bg-gray-300"
        } backdrop-blur-sm rounded-full overflow-hidden`}
        whileHover={
          isEnabled ? { boxShadow: "0 0 25px rgba(59,130,246,0.4)" } : {}
        }
        animate={
          isEnabled
            ? {
                boxShadow: [
                  "0 4px 16px rgba(59,130,246,0.2)",
                  "0 4px 24px rgba(59,130,246,0.4)",
                  "0 4px 16px rgba(59,130,246,0.2)",
                ],
              }
            : {}
        }
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Animated shimmer effect */}
        {isEnabled && (
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
              backgroundSize: "200% 100%",
            }}
            animate={{
              backgroundPosition: ["100% 0%", "-100% 0%"],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Pulsating background glow */}
        {isEnabled && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-blue-400/20 to-purple-500/10 rounded-full"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.98, 1, 0.98],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}

        {/* Swipe instruction text */}
        <div
          className={`absolute inset-0 flex items-center justify-end ${
            isMobile ? "mr-6" : "mr-10"
          }`}
        >
          <motion.div
            style={{ opacity: dragOpacity }}
            className={`${
              isEnabled ? "text-white" : "text-gray-500"
            } uppercase tracking-wider ${
              isMobile ? "text-xs" : "text-sm"
            } font-medium flex items-center gap-2`}
            animate={
              isEnabled
                ? {
                    textShadow: [
                      "0 0 4px rgba(255,255,255,0.3)",
                      "0 0 8px rgba(255,255,255,0.6)",
                      "0 0 4px rgba(255,255,255,0.3)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowRight className={`${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
            <span>Swipe</span>
          </motion.div>
        </div>

        {/* Draggable handle */}
        <motion.div
          className={`absolute left-1 top-0 bottom-0 ${
            isMobile ? "w-32 h-9" : "w-38 sm:w-44 h-10 sm:h-12"
          } flex items-center justify-center ${
            isEnabled
              ? "bg-gradient-to-r from-blue-400 to-purple-400 cursor-grab active:cursor-grabbing shadow-md shadow-blue-500/50"
              : "bg-gray-400 cursor-not-allowed"
          } rounded-full mt-[1.5px]`}
          drag={isEnabled ? "x" : false}
          dragConstraints={{ left: 0, right: maxDrag }}
          style={{ x }}
          onDragEnd={handleDragEnd}
          whileDrag={isEnabled ? { scale: 1.1 } : {}}
          animate={
            isEnabled
              ? {
                  x: [0, isMobile ? 10 : 15, 0],
                  boxShadow: [
                    "0 0 10px rgba(59,130,246,0.5)",
                    "0 0 20px rgba(59,130,246,0.8)",
                    "0 0 10px rgba(59,130,246,0.5)",
                  ],
                }
              : {}
          }
          transition={
            isEnabled
              ? {
                  x: {
                    duration: 1.4,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut",
                  },
                  boxShadow: {
                    duration: 1.5,
                    repeat: Infinity,
                  },
                }
              : {}
          }
        >
          {/* Inner glowing effect for the handle */}
          {isEnabled && (
            <motion.div
              className="absolute inset-1"
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}

          {/* Inner glow pulse */}
          {isEnabled && (
            <motion.div
              className="absolute inset-2 bg-white rounded-full"
              animate={{
                opacity: [0.1, 0.4, 0.1],
                scale: [0.8, 1.1, 0.8],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}

          <h1
            className={`${isMobile ? "text-xs" : "text-[13px] sm:text-sm"} ${
              isEnabled ? "text-white" : "text-gray-600"
            } font-medium`}
          >
            {isMobile ? "Dashboard" : "Swipe to dashboard"}
          </h1>
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          className={`absolute left-0 top-0 bottom-0 ${
            isEnabled
              ? "bg-gradient-to-r from-blue-500/40 to-purple-400/20"
              : "bg-gray-400/20"
          } h-full rounded-full`}
          style={{ width }}
        />
      </motion.div>
    </motion.div>
  );
};

// Main Welcome Page Component
const WelcomePage =() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  const [profileRevealed, setProfileRevealed] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const userName = useMemo(
    () => user?.fullName || user?.username || "User",
    [user]
  );

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const loadUserData = async () => {
      try {
        await dispatch(loadUser()).unwrap();
        if (isMounted) {
          setInitialLoadComplete(true);
          setTimeout(() => {
            setProfileRevealed(true);
          }, 1000);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        if (isMounted) setInitialLoadComplete(true);
      }
    };

    loadUserData();
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  useEffect(() => {
    if (initialLoadComplete && !isLoading && !isAuthenticated) {
      navigate("/user/login");
    }
  }, [isAuthenticated, isLoading, navigate, initialLoadComplete]);

  const handleSwipeComplete = () => {
    navigate("/user/dashboard");
  };

  if (isLoading || !initialLoadComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your account...</p>
        </div>
      </div>
    );
  }

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        {/* Mobile Content - Single Screen */}
        <div className="relative z-10 min-h-screen flex flex-col p-4">
          {/* Header */}
          <motion.div
            className="flex items-center justify-between mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img src={AuthLogo} alt="Logo" className="w-18 h-10" />
            <div className="text-xs text-gray-500">
              Hi, {userName.split(" ")[0]}
            </div>
          </motion.div>

          {/* Welcome Message */}
          <motion.div
            className="text-center mb-2 sm:mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <h2 className="text-[17px] font-semibold text-gray-800 leading-tight mb-3 sm:mb-2">
            Welcome to 
              <span className="text-[21px] bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-bold block">
              Stay Fine Supermart 
              
              </span>
              Retails Chain Promoters & Partners Program
            </h2>
            <p className="text-[11.5px] sm:text-[12px] text-gray-600">
              Your dashboard awaits with powerful tools and insights
            </p>
          </motion.div>

          {/* Success Notification */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="px-3 py-1.5 sm:py-2 bg-green-50 border border-green-200 rounded-xl mb-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="font-semibold text-green-800 text-sm">
                  Setup Complete!
                </p>
                <p className="text-xs text-green-600">
                  Profile verified successfully
                </p>
              </div>
            </div>
          </motion.div>

          {/* Profile Card - Top Section */}
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-1.5 shadow-lg mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="text-center mb-2">
              <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-1 flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {userName
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || "U"}
                </span>
              </div>
              <h3 className="text-[16px] font-bold text-gray-800">
                Account Details
              </h3>
            </div>

            <div className="">
              {!profileRevealed && <ProfileShimmer />}
              {profileRevealed && <ProfileData user={user} isMobile={true} />}
            </div>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <FeatureCard
              icon={Shield}
              title="Product Quality"
              description=""
              delay={0.6}
              isMobile={true}
            />
            <FeatureCard
              icon={Zap}
              title="Customer Support"
              description=""
              delay={0.7}
              isMobile={true}
            />
            <FeatureCard
              icon={Star}
              title="Speed Service"
              description=""
              delay={0.8}
              isMobile={true}
            />
          </div>

          {/* Swipe Button */}
          <div className="mt-auto">
            {profileRevealed && (
              <SwipeToDashboard
                onSwipeComplete={handleSwipeComplete}
                isEnabled={true}
                isMobile={true}
              />
            )}
          </div>

          {/* Footer */}
          <motion.div
            className="text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <p className="text-gray-500 text-xs">
              Need help?{" "}
              <span className="text-blue-500">support@stayfine.com</span>
            </p>
            <p className="text-gray-400 text-xs mt-1">© 2025 Stay Fine</p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="w-full py-6 px-8">
          <motion.div
            className="max-w-8xl mx-auto flex items-center justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <img src={AuthLogo} alt="Logo" className="w-32 h-16" />
            </div>
            <div className="text-sm text-gray-500">Welcome, {userName}</div>
          </motion.div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-6 py-4">
          <div className="max-w-[78rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ">
            {/* Left Content */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-[14px] lg:text-[36px] font-semibold text-gray-700 leading-12">
                Welcome to 
                  <span className="text-[40px] bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-bold block">
                  Stay Fine Supermart 
              
                  </span>
                  Retails Chain Promoters & Partners Program
                </h2>
                <p className="text-[15.5px] text-gray-600 mt-3">
                We are providing our Stay Fine branded healthcare, cosmetic, personal care, home care, and grocery products all over India through Stayfine Supermart. We offer the best opportunity to earn profit share on every product purchase.
                </p>
              </motion.div>

              {/* Success Notification */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="px-4 py-3 bg-green-50 border border-green-200 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-800">
                      Account Setup Complete!
                    </p>
                    <p className="text-sm text-green-600">
                      Your profile has been successfully configured and
                      verified.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
  <FeatureCard
    icon={Shield}
    title="Product Quality"
    description="We deliver excellence with strict quality standards"
    delay={0.4}
  />
  <FeatureCard
    icon={Zap}
    title="Customer Support"
    description="Always here to help with responsive assistance"
    delay={0.5}
  />
  <FeatureCard
    icon={Star}
    title="Speed Service"
    description="Fast and reliable service when you need it most"
    delay={0.6}
  />
</div>

            </div>

            {/* Right Content - Profile Card */}
            <motion.div
              className="w-full max-w-md mx-auto"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {userName
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "U"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Account Details
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Review your profile information below
                  </p>
                </div>

                <div className="mb-6">
                  {!profileRevealed && <ProfileShimmer />}
                  {profileRevealed && <ProfileData user={user} />}
                </div>

                {profileRevealed && (
                  <SwipeToDashboard
                    onSwipeComplete={handleSwipeComplete}
                    isEnabled={true}
                  />
                )}
              </div>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full py-4 px-6 border-t border-gray-200 bg-white/50">
          <motion.div
            className="max-w-7xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="space-y-2">
              <p className="text-gray-500 text-sm">
                Need assistance? Contact our support team at{" "}
                <span className="text-blue-500 font-medium">
                  support@stayfine.com
                </span>
              </p>
              <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                <span>© 2025 Stay Fine. All rights reserved.</span>
              </div>
            </div>
          </motion.div>
        </footer>
      </div>
    </div>
  );
}

export default WelcomePage;
