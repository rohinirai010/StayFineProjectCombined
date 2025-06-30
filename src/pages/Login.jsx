import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError, clearSuccessMessage } from "../ReduxStateManagement/user/slices/authSlice";
import {
  FormLayout,
  FormField,
  PasswordField,
  CaptchaField,
  SubmitButton
} from "../partials/authentication/AuthCommonComponents"

const Login = () => {
  const [formData, setFormData] = useState({
    mobile: "",
    username: "",
    email: "",
    password: "",
    captchaInput: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [captchaText, setCaptchaText] = useState("");
  const [errors, setErrors] = useState({});
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, error, isAuthenticated, successMessage } = useSelector(state => state.auth);

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
      navigate('/user/dashboard');
    }
  }, [isAuthenticated, successMessage, navigate]);

  // Set API errors in local state
  useEffect(() => {
    if (error) {
      setErrors(prevErrors => ({
        ...prevErrors,
        apiError: error
      }));
    }
  }, [error]);

  // Check captcha verification
  useEffect(() => {
    if (formData.captchaInput && formData.captchaInput === captchaText) {
      setIsCaptchaVerified(true);
    } else {
      setIsCaptchaVerified(false);
    }
  }, [formData.captchaInput, captchaText]);

  const generateCaptcha = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    let captcha = "";

    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(captcha);
    setFormData(prev => ({ ...prev, captchaInput: "" })); // Clear captcha input
    setIsCaptchaVerified(false); // Reset verification status

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation (primary login method)
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
      console.log("Form submitted for login", formData);
      // Remove captchaInput from the data sent to the server
      const { captchaInput, ...loginData } = formData;
      dispatch(loginUser(loginData));
    } else {
      console.log("Form validation failed");
    }
  };

  const handleHomeNavigation = () => {
    navigate("/");
  };

  return (
    <FormLayout
      title="Sign In"
      showBackButton={true}
      onBackClick={handleHomeNavigation}
      maxWidth="max-w-lg"
      apiError={errors.apiError}
    >
      <form onSubmit={handleSubmit}>
        {/* Username Field */}
        <FormField
          label="Username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          error={errors.username}
          required={true}
          className="mb-5"
        />

        {/* Hidden fields for mobile and email */}
        <div className="hidden">
          <input
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile"
            type="tel"
          />
          
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
          />
        </div>

        {/* Password Field */}
        <PasswordField
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          error={errors.password}
          showPassword={showPassword}
          onToggleVisibility={togglePasswordVisibility}
          required={true}
          className="mb-5"
        />

        {/* CAPTCHA Field */}
        <CaptchaField
          canvasRef={canvasRef}
          onRefresh={generateCaptcha}
          value={formData.captchaInput}
          onChange={handleChange}
          error={errors.captchaInput}
          isVerified={isCaptchaVerified}
          className="mb-5"
        />

        {/* Remember me and Forgot Password */}
        <div className="hidden justify-between items-center mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              className="h-4 w-4 text-blue-600"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>
          <Link
            to="/password-recover"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <SubmitButton
          isLoading={isLoading}
          loadingText="Signing in..."
        >
          Sign In
        </SubmitButton>
      </form>

      {/* Sign Up Link */}
      <div className="text-center mt-6">
        <p className="text-gray-600 text-sm">
          Don't have an Account?{" "}
          <Link to="/user/register" className="text-blue-600 hover:text-blue-800">
            Sign Up
          </Link>
        </p>
      </div>
    </FormLayout>
  );
};

export default Login;