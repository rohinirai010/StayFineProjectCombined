import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  clearError,
  clearSuccessMessage,
} from "../ReduxStateManagement/user/slices/authSlice";
import {
  FormLayout,
  FormField,
  PasswordField,
  CaptchaField,
  SubmitButton,
  SponsorField,
  UsernameField,
  InternationalPhoneInput,
} from "../partials/authentication/AuthCommonComponents";

const Register = () => {
  const [formData, setFormData] = useState({
    // Visible fields
    username: "",
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    sponsorId: "",
    position: "", // New field for right/left selection
    agreeToTerms: false,
    captchaInput: "",

    // Hidden fields
    panCardNo: "",
    firstName: "",
    lastName: "",
    gender: "",
    birthdate: "",
    blindPin: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captchaText, setCaptchaText] = useState("");
  const [errors, setErrors] = useState({});
  const [isSponsorVerified, setIsSponsorVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [sponsorName, setSponsorName] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState(null);

  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, error, isAuthenticated, successMessage } = useSelector(
    (state) => state.auth
  );

  // Dummy sponsor data
  const sponsorData = {
    SPON1234: "Ajay Kumar",
    REF5678: "Ritesh Agarwal",
    CRYPT9012: "Danny Wilson",
    TRADE4321: "David Wilson",
  };
  const validSponsorIds = Object.keys(sponsorData);

  // Generate captcha on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Clear Redux errors and success messages when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearSuccessMessage());
    };
  }, [dispatch]);

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated && successMessage) {
      navigate("/user/welcome");
    }
  }, [isAuthenticated, successMessage, navigate]);

  // Set API errors in local state
  useEffect(() => {
    if (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        apiError: error,
      }));
    }
  }, [error]);

  // Auto-verify sponsor ID when it changes
  useEffect(() => {
    if (!formData.sponsorId.trim()) {
      setIsSponsorVerified(false);
      setSponsorName("");
      if (errors.sponsorId) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.sponsorId;
          return newErrors;
        });
      }
      return;
    }

    if (formData.sponsorId.length < 4) {
      return;
    }

    setIsVerifying(true);

    const debounceTimer = setTimeout(() => {
      verifySponsorId(formData.sponsorId);
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [formData.sponsorId]);

  // Username validation effect
  useEffect(() => {
    const alphanumericRegex = /^[a-zA-Z0-9]*$/;

    if (!formData.username.trim()) {
      setUsernameStatus(null);
      return;
    }

    if (!alphanumericRegex.test(formData.username)) {
      setUsernameStatus("invalid");
      return;
    }

    if (formData.username.length < 3) {
      setUsernameStatus(null);
      return;
    }

    const debounceTimer = setTimeout(() => {
      checkUsernameAvailability(formData.username);
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [formData.username]);

  const generateCaptcha = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    let captcha = "";

    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(captcha);
    setFormData((prev) => ({ ...prev, captchaInput: "" }));

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "#f0f0f0");
    gradient.addColorStop(1, "#e0e0e0");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add noise
    for (let i = 0; i < 100; i++) {
      ctx.fillStyle = `rgba(${Math.random() * 100}, ${Math.random() * 100}, ${
        Math.random() * 100
      }, 0.2)`;
      ctx.fillRect(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        2,
        2
      );
    }

    // Add lines
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.strokeStyle = `rgba(${Math.random() * 100}, ${Math.random() * 100}, ${
        Math.random() * 100
      }, 0.3)`;
      ctx.stroke();
    }

    // Draw text
    ctx.font = "bold 26px Arial";
    ctx.fillStyle = "#6b21a8";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const textWidth = ctx.measureText(captcha).width;
    const startX = canvas.width / 2 - textWidth / 2;
    const charWidth = textWidth / captcha.length;

    for (let i = 0; i < captcha.length; i++) {
      const char = captcha.charAt(i);
      const x = startX + i * charWidth + charWidth / 2;
      const y = canvas.height / 2;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((Math.random() - 0.5) * 0.4);
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }
  };

  const checkUsernameAvailability = (username) => {
    setIsCheckingUsername(true);
    setUsernameStatus("checking");

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const usernameExists = users.some(
        (user) => user.username.toLowerCase() === username.toLowerCase()
      );

      setUsernameStatus(usernameExists ? "taken" : "available");
      setIsCheckingUsername(false);

      if (usernameExists) {
        setErrors((prev) => ({
          ...prev,
          username: "Username already taken",
        }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.username;
          return newErrors;
        });
      }
    }, 600);
  };

  const verifySponsorId = (sponsorId) => {
    setTimeout(() => {
      const isValid = validSponsorIds.includes(sponsorId);

      if (isValid) {
        setIsSponsorVerified(true);
        setSponsorName(sponsorData[sponsorId]);
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.sponsorId;
          return newErrors;
        });
      } else {
        setIsSponsorVerified(false);
        setSponsorName("");
        setErrors((prev) => ({
          ...prev,
          sponsorId: "Invalid Sponsor ID. Please check and try again.",
        }));
      }

      setIsVerifying(false);
    }, 800);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // For username
    if (name === "username") {
      const alphanumericRegex = /^[a-zA-Z0-9]*$/;
      if (value !== "" && !alphanumericRegex.test(value)) {
        return; // Don't update if invalid characters
      }
      if (usernameStatus === "available" || usernameStatus === "taken") {
        setUsernameStatus(null);
      }
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (usernameStatus === "taken") {
      newErrors.username = "Username already taken";
    } else if (usernameStatus === "invalid") {
      newErrors.username = "Username can only contain letters and numbers";
    }

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Mobile validation
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (formData.mobile.length < 8) {
      newErrors.mobile = "Please enter a valid mobile number";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Sponsor ID validation
    if (!formData.sponsorId) {
      newErrors.sponsorId = "Referral ID is required";
    } else if (formData.sponsorId && !isSponsorVerified) {
      newErrors.sponsorId = "Invalid Sponsor ID. Please check and try again.";
    }

    // Position validation
    if (!formData.position) {
      newErrors.position = "Please select a position";
    }

    // Terms and conditions validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the Terms and Conditions";
    }

    // Captcha validation
    if (!formData.captchaInput) {
      newErrors.captchaInput = "Captcha is required";
    } else if (formData.captchaInput !== captchaText) {
      newErrors.captchaInput = "Incorrect captcha";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted successfully", formData);
      // Remove captchaInput from the data sent to the server
      const { captchaInput, ...registerData } = formData;
      dispatch(registerUser(registerData));
    } else {
      console.log("Form validation failed");
    }
  };

  const handleHomeNavigation = () => {
    navigate("/");
  };

  return (
    <FormLayout
      title="Create Your Account"
      maxWidth="max-w-2xl"
      apiError={errors.apiError}
      showBackButton={true}
      onBackClick={handleHomeNavigation}
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Username */}
          <UsernameField
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            usernameStatus={usernameStatus}
          />

          {/* Full Name */}
          <FormField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            error={errors.fullName}
            required
          />

          {/* Email */}
          <FormField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            error={errors.email}
            required
          />

          {/* Mobile */}
          <InternationalPhoneInput
            value={formData.mobile}
            onChange={handleChange}
            error={errors.mobile}
            containerClass=""
          />

          {/* Password */}
          <PasswordField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
            showPassword={showPassword}
            onToggleVisibility={() => togglePasswordVisibility("password")}
            required
          />

          {/* Confirm Password */}
          <PasswordField
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            error={errors.confirmPassword}
            showPassword={showConfirmPassword}
            onToggleVisibility={() =>
              togglePasswordVisibility("confirmPassword")
            }
            required
          />

          {/* Sponsor ID */}
          <SponsorField
            value={formData.sponsorId}
            onChange={handleChange}
            error={errors.sponsorId}
            isVerifying={isVerifying}
            isVerified={isSponsorVerified}
            sponsorName={sponsorName}
          />

          {/* Position Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Position <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                className={`flex-1 py-2 px-4 text-sm rounded-2xl border-2 transition-all ${
                  formData.position === "left"
                    ? "border-purple-600 bg-purple-50 text-purple-700"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onClick={() =>
                  handleChange({
                    target: {
                      name: "position",
                      value: "left",
                    },
                  })
                }
              >
                Left
              </button>
              <button
                type="button"
                className={`flex-1 py-2 px-4 text-sm rounded-2xl border-2 transition-all ${
                  formData.position === "right"
                    ? "border-purple-600 bg-purple-50 text-purple-700"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onClick={() =>
                  handleChange({
                    target: {
                      name: "position",
                      value: "right",
                    },
                  })
                }
              >
                Right
              </button>
            </div>
            {errors.position && (
              <p className="text-red-500 text-xs mt-1">{errors.position}</p>
            )}
          </div>
        </div>

        {/* CAPTCHA */}
        <CaptchaField
          canvasRef={canvasRef}
          onRefresh={generateCaptcha}
          value={formData.captchaInput}
          onChange={handleChange}
          error={errors.captchaInput}
          isVerified={
            formData.captchaInput === captchaText && formData.captchaInput
          }
        />

        {/* Terms and Conditions */}
        <div className="mb-6">
          <div className="flex items-center ">
            <div className="">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                className="peer h-5 w-5 text-purple-600  border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 transition-all duration-200 cursor-pointer hover:border-purple-400"
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
            </div>
            <label
              htmlFor="agreeToTerms"
              className="mt-1 ml-2 sm:ml-3 text-[11px] sm:text-sm text-gray-700 cursor-pointer leading-relaxed"
            >
              I agree to the{" "}
              <Link
                to="/terms"
                className="text-purple-600 hover:text-purple-800 underline decoration-2 underline-offset-2 font-medium transition-colors duration-200"
                target="_blank"
              >
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-purple-600 hover:text-purple-800 underline decoration-2 underline-offset-2 font-medium transition-colors duration-200"
                target="_blank"
              >
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-red-500 text-xs mt-2 ml-1 flex items-center">
              <svg
                className="h-4 w-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.agreeToTerms}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <SubmitButton
          isLoading={isLoading}
          disabled={!isSponsorVerified || usernameStatus === "taken"}
          loadingText="Creating Account..."
        >
          Create Account
        </SubmitButton>
      </form>

      {/* Login Link */}
      <div className="text-center mt-6">
        <p className="text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/user/login"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </FormLayout>
  );
};

export default Register;
