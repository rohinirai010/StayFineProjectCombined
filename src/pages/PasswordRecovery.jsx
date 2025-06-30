import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { GrLanguage } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../css/additional.css";

const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const languageMenuRef = useRef(null);
  const recaptchaRef = useRef(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // Available languages (same as in Login component)
  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "pt", name: "Português" },
    { code: "ru", name: "Русский" },
    { code: "it", name: "Italiano" },
    { code: "pl", name: "Polski" },
    { code: "id", name: "Indonesian" },
    { code: "th", name: "Thai" },
    { code: "vi", name: "Tiếng Việt" },
    { code: "zh", name: "中文" },
    { code: "tr", name: "Türkçe" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
    { code: "fa", name: "فارسی" },
    { code: "sr", name: "Српски" },
    { code: "ro", name: "Română" },
    { code: "hr", name: "Hrvatski" },
    { code: "hi", name: "हिन्दी" },
    { code: "el", name: "ελληνικά" },
    { code: "bn", name: "বাংলা" },
    { code: "uk", name: "Українська" },
    { code: "fil", name: "Pilipinas" },
    { code: "ar", name: "العربية" },
    { code: "sw", name: "Kiswahili" }
  ];

  // Load reCAPTCHA script
  useEffect(() => {
    // Add reCAPTCHA script if it doesn't exist
    if (!window.grecaptcha) {
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.id = "recaptcha-script";
      
      script.onload = () => initializeRecaptcha();
      
      document.body.appendChild(script);
      
      return () => {
        document.getElementById("recaptcha-script")?.remove();
      };
    } else {
      initializeRecaptcha();
    }
  }, []);

  // Function to initialize reCAPTCHA
  const initializeRecaptcha = () => {
    if (window.grecaptcha && window.grecaptcha.render && recaptchaRef.current) {
      try {
        window.grecaptcha.render(recaptchaRef.current, {
          sitekey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI", // Replace with your actual site key (this is Google's test key)
          callback: (token) => {
            setRecaptchaToken(token);
            setErrors(prev => ({ ...prev, recaptcha: "" }));
          },
          "expired-callback": () => {
            setRecaptchaToken("");
          }
        });
      } catch (error) {
        // Handle case where reCAPTCHA was already rendered
        console.log("reCAPTCHA already rendered");
      }
    }
  };

  // Reset reCAPTCHA
  const resetRecaptcha = () => {
    if (window.grecaptcha && window.grecaptcha.reset) {
      window.grecaptcha.reset();
      setRecaptchaToken("");
    }
  };

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
        setLanguageMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Change language handler
  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setLanguageMenuOpen(false);
  };

  // Get current language
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = t("errors.emailRequired");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t("errors.emailInvalid");
    }
    
    if (!recaptchaToken) {
      newErrors.recaptcha = t("errors.recaptchaRequired") || "Please complete the reCAPTCHA verification";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      
      // Simulate API call with reCAPTCHA token
      setTimeout(() => {
        // This is where you would send the email and recaptchaToken to your API
        console.log("Form submitted with:", { email, recaptchaToken });
        
        setLoading(false);
        setSuccessMessage(t("recovery.emailSent", { email }));
        // Reset form
        setEmail("");
        resetRecaptcha();
      }, 1500);
    }
  };

  // Handle login page navigation
  const handleLoginNavigation = () => {
    navigate("/");
  };

  // Toggle language menu
  const toggleLanguageMenu = () => {
    setLanguageMenuOpen(!languageMenuOpen);
  };

  // Handle home page navigation
  const handleHomeNavigation = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center px-4 py-8">
      {/* Top navigation bar */}
      <div className="w-full max-w-lg flex justify-between items-center mb-4">
        <button 
          onClick={handleHomeNavigation}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
        >
          <ArrowLeft size={16} className="mr-1" /> 
          <span className="font-medium text-sm sm:text-base">{t("navigation.toHome")}</span>
        </button>
        
        <div className="relative" ref={languageMenuRef}>
          <button 
            onClick={toggleLanguageMenu}
            className="flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-300"
          >
            <span className="mr-2 font-medium ">{currentLanguage.name}</span>
            <GrLanguage className="text-blue-600" />
            <ChevronDown size={16} className="ml-1 text-blue-600" />
          </button>
          
          {languageMenuOpen && (
            <div className="absolute right-0 mt-2 py-2 w-64 bg-white rounded-lg shadow-xl z-10 max-h-96 overflow-y-auto border border-gray-100">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 px-3 py-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`text-left px-2 py-1 rounded hover:bg-blue-50 transition-colors duration-200 ${
                      i18n.language === lang.code ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700"
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Main content */}
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-5 sm:p-8 border border-gray-100">
        {/* Logo */}
        <div className="flex justify-center mb-3">
          <div className="text-center">
            <div className="flex items-center justify-center">
             <img src="" alt="Logo" />
              <span className="text-2xl font-medium ml-2 text-gray-800">Trade</span>
            </div>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-800">{t("recovery.title")}</h1>
        
        <p className="text-center text-xs sm:text-sm text-gray-600 mb-6">
          {t("recovery.description")}
        </p>
      
        {successMessage ? (
          <div className="mb-6">
            <div className="bg-green-50 text-xs sm:text-sm border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              <p>{successMessage}</p>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={handleLoginNavigation}
                className="text-sm sm:text-base text-blue-600 hover:text-blue-800 transition-colors duration-300 border-b border-blue-800 border-dashed cursor-pointer"
              >
                {t("recovery.backToLogin")}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Email field */}
            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t("auth.email")} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                className={`w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                  errors.email ? 'border-red-500' : ''
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}
            </div>

            {/* reCAPTCHA */}
            <div className="mb-5 rounded-lg ">
              <div id="recaptcha-container" className="flex justify-center px-4 rounded-lg">
                <div ref={recaptchaRef}></div>
              </div>
              {errors.recaptcha && (
                <p className="text-red-500 text-xs mt-2 text-center">{errors.recaptcha}</p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-800 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-800 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 cursor-pointer"
              disabled={loading}
            >
              {loading ? t("recovery.sendingInstructions") : t("recovery.restoreButton")}
            </button>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={handleLoginNavigation}
                className="text-sm sm:text-base text-blue-600 hover:text-blue-800 transition-colors duration-300 border-b border-blue-800 border-dashed cursor-pointer"
              >
                {t("recovery.backToLogin")}
              </button>
            </div>
          </form>
        )}
      </div>
      
      {/* Footer links */}
      <div className="w-full max-w-md mt-8 mb-6">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-600">
          <a href="#" className="hover:text-blue-600 hover:underline transition-all duration-300">{t("footer.contacts")}</a>
          <a href="#" className="hover:text-blue-600 hover:underline transition-all duration-300">{t("footer.amlPolicy")}</a>
          <a href="#" className="hover:text-blue-600 hover:underline transition-all duration-300">{t("footer.paymentPolicy")}</a>
          <a href="#" className="hover:text-blue-600 hover:underline transition-all duration-300">{t("footer.termsConditions")}</a>
          <a href="#" className="hover:text-blue-600 hover:underline transition-all duration-300">{t("footer.privacyPolicy")}</a>
          <a href="#" className="hover:text-blue-600 hover:underline transition-all duration-300">{t("footer.infoDisclosure")}</a>
        </div>
      </div>

      {/* Copyright */}
      <div className="flex items-center justify-center text-xs sm:text-sm text-gray-600 mb-6">
        <span>{t("footer.copyright", { year: new Date().getFullYear() })}</span>
        <div className="ml-2 flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-xs text-white bg-blue-600">
          21+
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;