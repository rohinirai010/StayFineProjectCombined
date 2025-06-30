import React from "react";
import { ArrowLeft, Shield, X, RefreshCcw, Eye, EyeOff } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../../commonStyle.css";
import logo from "../../images/AuthLogo.png";

// FormLayout
const FormLayout = ({
  children,
  title,
  showBackButton = false,
  onBackClick,
  maxWidth = "max-w-lg",
  apiError,
}) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center px-4 py-4">
      {/* Top navigation */}
      {showBackButton && (
        <div
          className={`w-full ${maxWidth} flex justify-between items-center mb-2`}
        >
          <button
            onClick={onBackClick}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span className="font-medium text-sm sm:text-base">
              Back to Home
            </span>
          </button>
        </div>
      )}

      <div
        className={`bg-white rounded-2xl shadow-lg w-full ${maxWidth} px-5 py-5 sm:px-8 sm:py-4 border border-gray-100`}
      >
        <div className="flex justify-center mb-2">
          <img src={logo} alt="Logo" className="w-36 h-16" />
        </div>

        {title && (
          <h2 className="text-[22px] font-bold text-center text-gray-800 mb-6">
            {title}
          </h2>
        )}

        {/* Error message */}
        {apiError && (
          <div className="mb-4 px-3 py-2 text-center bg-red-100 border border-red-400 rounded-2xl text-red-700 text-sm">
            {apiError}
          </div>
        )}

        {children}
      </div>

      {/* Footer */}
      <div className="text-xs text-gray-600 mb-6 flex items-center justify-center mt-4">
        <span>© {new Date().getFullYear()} Your Company</span>
        <div className="ml-2 w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full">
          21+
        </div>
      </div>
    </div>
  );
};

// FormField
const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = false,
  className = "",
  children,
}) => {
  return (
    <div className={`mb-2 ${className}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children || (
        <input
          type={type}
          id={name}
          name={name}
          className={`w-full px-4 py-2 border rounded-2xl text-sm ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};


// PasswordField
const PasswordField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  showPassword,
  onToggleVisibility,
  required = false,
  className = "",
}) => {
  return (
    <div className={`mb-2 ${className}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={name}
          name={name}
          className={`w-full px-4 py-2 border rounded-2xl text-sm ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={onToggleVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
        >
          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

// CaptchaField
const CaptchaField = ({
  canvasRef,
  onRefresh,
  value,
  onChange,
  error,
  isVerified,
  className = "",
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        CAPTCHA <span className="text-red-500">*</span>
      </label>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center">
          <canvas
            ref={canvasRef}
            width="200"
            height="48"
            className="border rounded-2xl"
            style={{ height: "48px" }}
          />
          <button
            type="button"
            onClick={onRefresh}
            className="ml-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <RefreshCcw size={20} />
          </button>
        </div>

        <input
          type="text"
          name="captchaInput"
          placeholder="Enter CAPTCHA"
          className={`px-4 py-2 border rounded-2xl w-full h-[48px] text-sm ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          value={value}
          onChange={onChange}
        />
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      {isVerified && (
        <div className="text-green-600 text-xs mt-1 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Captcha verified
        </div>
      )}
    </div>
  );
};

export default CaptchaField;

// SubmitButton
const SubmitButton = ({
    isLoading,
    disabled = false,
    loadingText,
    children,
    className = "",
  }) => {
    return (
      <button
        type="submit"
        disabled={isLoading || disabled}
        className={`relative w-full overflow-hidden bg-gradient-to-r from-blue-600 via-blue-800 to-indigo-600 text-white py-3 px-8 rounded-2xl hover:from-indigo-700 hover:via-blue-600 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 font-semibold shadow-xl hover:shadow-2xl active:scale-[0.98] transform hover:-translate-y-1 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:via-transparent before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 before:skew-x-12 cursor-pointer ${className}`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 mr-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="animate-pulse">{loadingText}</span>
          </div>
        ) : (
          <span className="relative z-10">{children}</span>
        )}
      </button>
    );
  };



//InternationalPhoneInput  (specific to Register)
export const InternationalPhoneInput = ({
  value,
  onChange,
  error,
  placeholder = "Phone Number",
  disabled = false,
  inputClass = "",
  containerClass = "",
}) => {
  const handleChange = (phone, country) => {
    // Format the phone number with country code
    const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;

    onChange({
      target: {
        name: "mobile",
        value: formattedPhone,
        country: country,
      },
    });
  };

  return (
    <div className={`mb-2 ${containerClass}`}>
      <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
        Mobile Number <span className="text-red-500">*</span>
      </label>
      <PhoneInput
        country={'in'} // Default country (India)
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        inputClass={`!w-full !py-2 !pl-12 !pr-4 !rounded-2xl !border !text-sm ${error ? '!border-red-500' : '!border-gray-300'} ${inputClass}`}
        dropdownClass="!z-50"
        enableSearch
        searchPlaceholder="Search country"
        inputProps={{
          name: "mobile",
          required: true,
          autoComplete: "tel",
        }}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

// SponsorField (specific to Register)
const SponsorField = ({
  value,
  onChange,
  error,
  isVerifying,
  isVerified,
  sponsorName,
  className = "",
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label
        htmlFor="sponsorId"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Referral/Sponsor ID <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          type="text"
          id="sponsorId"
          name="sponsorId"
          className={`w-full px-4 py-2 border rounded-2xl pr-12 text-sm ${
            error
              ? "border-red-500"
              : isVerified
              ? "border-green-500"
              : "border-gray-300"
          }`}
          value={value}
          onChange={onChange}
          placeholder="Referral/Sponsor ID"
        />

        {/* Status indicator */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {isVerifying && (
            <div className="flex items-center gap-1">
              <svg
                className="animate-spin h-4 w-4 text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span className="text-xs text-yellow-500">Verifying</span>
            </div>
          )}
          {!isVerifying && isVerified && (
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-xs text-green-500">Verified</span>
            </div>
          )}
          {!isVerifying && !isVerified && value && (
            <div className="flex items-center gap-1">
              <X className="w-4 h-4 text-red-500" />
              <span className="text-xs text-red-500">Invalid</span>
            </div>
          )}
        </div>
      </div>

      {/* Sponsor name display */}
      {isVerified && sponsorName && (
        <p className="text-xs text-green-500 mt-1 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          Sponsor: {sponsorName}
        </p>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

// UsernameField (specific to Register with availability checking)
const UsernameField = ({
  value,
  onChange,
  error,
  usernameStatus,
  className = "",
}) => {
  const renderUsernameStatus = () => {
    if (!value || value.length < 3) {
      return null;
    }

    if (usernameStatus === "checking") {
      return (
        <div className="flex items-center text-yellow-500 text-xs mt-1">
          <svg
            className="animate-spin h-3 w-3 mr-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Checking availability...
        </div>
      );
    }

    if (usernameStatus === "available") {
      return (
        <div className="flex items-center text-green-500 text-xs mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Username available
        </div>
      );
    }

    if (usernameStatus === "taken") {
      return (
        <div className="flex items-center text-red-500 text-xs mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Username already taken
        </div>
      );
    }

    if (usernameStatus === "invalid") {
      return (
        <div className="flex items-center text-red-500 text-xs mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          Only letters and numbers allowed
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`mb-2 ${className}`}>
      <label
        htmlFor="username"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Username <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="username"
        name="username"
        className={`w-full px-4 py-2 border rounded-2xl text-sm ${
          error
            ? "border-red-500"
            : usernameStatus === "available"
            ? "border-green-500"
            : "border-gray-300"
        }`}
        value={value}
        onChange={onChange}
        placeholder="Create Username"
      />
      {renderUsernameStatus()}
      {error && !["taken", "invalid"].includes(usernameStatus) && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export {
  FormLayout,
  FormField,
  PasswordField,
  CaptchaField,
  SubmitButton,
  SponsorField,
  UsernameField,
};
