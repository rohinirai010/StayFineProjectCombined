import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { RiProfileLine } from "react-icons/ri";
import { MdSecurity } from "react-icons/md";
import { IoPeople } from "react-icons/io5";

// Account Page Component
const AccountPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("account");
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isIfscLoading, setIsIfscLoading] = useState(false);
  const [ifscError, setIfscError] = useState("");

  // Form states for each tab
  const [profileData, setProfileData] = useState({
    fullName: "",
    username: "",
    email: "",
    mobile: "",
    dateOfBirth: "",
    gender: "",
    country: "",
    stateRegion: "",
    city: "",
    address: "",
    zipCode: "",
    profilePhoto: null,
    profilePhotoPreview: null,
    idCreationDate: "",
    sponsorId: "",
    uplineName: "",
    packageName: "",
    activationDate: "",
    status: "Active", // or "Inactive"
  });

  const [kycData, setKycData] = useState({
    panCard: null,
    panCardPreview: null,
    aadhaarFront: null,
    aadhaarFrontPreview: null,
    aadhaarBack: null,
    aadhaarBackPreview: null,
    selfieWithId: null,
    selfieWithIdPreview: null,
    kycStatus: "Approved", // Pending / Approved / Rejected
    approvalDate: "",
    rejectionReason: "",
    bankAccountNumber: "",
    confirmAccountNumber: "",
    accountHolderName: "",
    bankName: "",
    branchName: "",
    ifscCode: "",
    upiId: "",
    panCardNumber: "",
  });

  const [nomineeData, setNomineeData] = useState({
    nomineeName: "",
    relationship: "",
    dateOfBirth: "",
    mobileNumber: "",
    email: "",
    address: "",
    idProof: null,
    idProofPreview: null,
    addedDate: "",
    status: "Not Verified", // Verified / Not Verified
  });

  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  // Function to fetch bank details from IFSC code
  const fetchBankDetails = async (ifscCode) => {
    if (ifscCode && ifscCode.length === 11) {
      setIsIfscLoading(true);
      setIfscError("");

      try {
        const response = await fetch(`https://ifsc.razorpay.com/${ifscCode}`);
        if (response.ok) {
          const data = await response.json();
          setKycData((prev) => ({
            ...prev,
            bankName: data.BANK,
            branchName: data.BRANCH,
          }));
          setIfscError("");
        } else {
          // IFSC not found - allow manual entry
          setKycData((prev) => ({
            ...prev,
            bankName: "",
            branchName: "",
          }));
          setIfscError(
            "IFSC code not found. Please enter bank details manually."
          );
        }
      } catch (error) {
        console.error("Error fetching bank details:", error);
        setKycData((prev) => ({
          ...prev,
          bankName: "",
          branchName: "",
        }));
        setIfscError("Unable to fetch bank details. Please enter manually.");
      } finally {
        setIsIfscLoading(false);
      }
    } else {
      // Clear error when IFSC is incomplete
      setIfscError("");
    }
  };

  // Load existing user data on component mount
  useEffect(() => {
    if (user) {
      setProfileData((prev) => ({
        ...prev,
        fullName: user.fullName || "",
        username: user.username || "",
        email: user.email || "",
        mobile: user.mobile || "",
        dateOfBirth: user.dateOfBirth || "",
        gender: user.gender || "",
        country: user.country || "",
        stateRegion: user.stateRegion || "",
        city: user.city || "",
        address: user.address || "",
        zipCode: user.zipCode || "",
        sponsorId: user.sponsorId || "",
      }));

      // Load KYC data if available
      if (user.kycData) {
        setKycData((prev) => ({
          ...prev,
          ...user.kycData,
        }));
      }

      // Load nominee data if available
      if (user.nomineeData) {
        setNomineeData((prev) => ({
          ...prev,
          ...user.nomineeData,
        }));
      }
    }
  }, [user]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleProfilePanel = () => {
    setIsProfileExpanded(!isProfileExpanded);
  };

  // File upload handler
  const handleFileUpload = (e, field, tabType) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (tabType === "profile") {
          setProfileData((prev) => ({
            ...prev,
            [field]: file,
            [`${field}Preview`]: event.target.result,
          }));
        } else if (tabType === "kyc") {
          setKycData((prev) => ({
            ...prev,
            [field]: file,
            [`${field}Preview`]: event.target.result,
          }));
        } else if (tabType === "nominee") {
          setNomineeData((prev) => ({
            ...prev,
            [field]: file,
            [`${field}Preview`]: event.target.result,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Form input handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKycChange = (e) => {
    const { name, value } = e.target;
    setKycData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-fetch bank details when IFSC code is entered
    if (name === "ifscCode") {
      if (value.length === 11) {
        fetchBankDetails(value.toUpperCase());
      } else {
        // Clear bank details if IFSC is incomplete
        setKycData((prev) => ({
          ...prev,
          bankName: "",
          branchName: "",
        }));
        setIfscError("");
      }
    }

    // Clear error when both bank name and branch name are manually entered
    if ((name === "bankName" || name === "branchName") && ifscError) {
      // Check if both fields will have values after this update
      const updatedKycData = { ...kycData, [name]: value };
      if (updatedKycData.bankName && updatedKycData.branchName) {
        setIfscError("");
      }
    }
  };

  const handleNomineeChange = (e) => {
    const { name, value } = e.target;
    setNomineeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save handlers for each tab
  const handleSaveProfile = () => {
    const updatedUser = {
      ...user,
      ...profileData,
      updatedAt: new Date().toISOString(),
    };

    // Update localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex((u) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));
    }

    // Update auth token
    const authData = JSON.parse(localStorage.getItem("authToken"));
    authData.user = updatedUser;
    localStorage.setItem("authToken", JSON.stringify(authData));

    // Show success message
    setSuccessMessage("Profile saved successfully!");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSaveKyc = () => {
    const updatedUser = {
      ...user,
      kycData: kycData,
      updatedAt: new Date().toISOString(),
    };

    // Update localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex((u) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));
    }

    // Update auth token
    const authData = JSON.parse(localStorage.getItem("authToken"));
    authData.user = updatedUser;
    localStorage.setItem("authToken", JSON.stringify(authData));

    // Show success message
    setSuccessMessage("KYC details saved successfully!");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSaveNominee = () => {
    const updatedUser = {
      ...user,
      nomineeData: nomineeData,
      updatedAt: new Date().toISOString(),
    };

    // Update localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex((u) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));
    }

    // Update auth token
    const authData = JSON.parse(localStorage.getItem("authToken"));
    authData.user = updatedUser;
    localStorage.setItem("authToken", JSON.stringify(authData));

    // Show success message
    setSuccessMessage("Nominee details saved successfully!");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const renderProfileTab = () => (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-4 sm:gap-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={profileData.fullName}
            onChange={handleProfileChange}
            className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            value={profileData.username}
            className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            disabled
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleProfileChange}
            className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            Mobile Number
          </label>
          <input
            type="tel"
            name="mobile"
            value={profileData.mobile}
            onChange={handleProfileChange}
            className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={profileData.dateOfBirth}
            onChange={handleProfileChange}
            className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            name="gender"
            value={profileData.gender}
            onChange={handleProfileChange}
            className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Country */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            Country
          </label>
          <select
            name="country"
            value={profileData.country}
            onChange={handleProfileChange}
            className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Canada">Canada</option>
          </select>
        </div>

        {/* State/Region */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            State / Region (Optional)
          </label>
          <input
            type="text"
            name="stateRegion"
            value={profileData.stateRegion}
            onChange={handleProfileChange}
            className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            City (Optional)
          </label>
          <input
            type="text"
            name="city"
            value={profileData.city}
            onChange={handleProfileChange}
            className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Zip Code */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            Zip/Postal Code (Optional)
          </label>
          <input
            type="text"
            name="zipCode"
            value={profileData.zipCode}
            onChange={handleProfileChange}
            className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Address */}
        <div className="xl:col-span-2">
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            name="address"
            value={profileData.address}
            onChange={handleProfileChange}
            rows="1"
            className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Profile Photo */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            Profile Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, "profilePhoto", "profile")}
            className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {profileData.profilePhotoPreview && (
            <div className="mt-3">
              <img
                src={profileData.profilePhotoPreview}
                alt="Profile Preview"
                className="w-20 h-20 object-cover rounded-3xl border"
              />
            </div>
          )}
        </div>

        {/* ID Creation Date */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            ID Creation Date
          </label>
          <input
            type="text"
            value={
              profileData.idCreationDate || new Date().toLocaleDateString()
            }
            className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            disabled
          />
        </div>

        {/* Sponsor ID */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            Sponsor ID
          </label>
          <input
            type="text"
            value={profileData.sponsorId}
            className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            disabled
          />
        </div>

        {/* Upline Name */}
        <div className="hidden">
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            Upline Name
          </label>
          <input
            type="text"
            value={profileData.uplineName || "Parent Node"}
            className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            disabled
          />
        </div>

        {/* Package Name */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            Package Name
          </label>
          <input
            type="text"
            value={profileData.packageName || "Basic Plan"}
            className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            disabled
          />
        </div>

        {/* Activation Date */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            Activation Date
          </label>
          <input
            type="text"
            value={
              profileData.activationDate || new Date().toLocaleDateString()
            }
            className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            disabled
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            Status
          </label>
          <div className="flex items-center">
            <span
              className={`w-full px-3 py-1.5 text-[14px] font-medium rounded-lg border ${
                profileData.status === "Active"
                  ? "bg-green-100 text-green-800 border-green-600"
                  : "bg-red-100 text-red-800 border-red-600"
              }`}
            >
              {profileData.status || "Active"}
            </span>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSaveProfile}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-2xl text-[12.5px] sm:text-[14px] font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
        >
          <span className="text-[12px] sm:text-[14px]">💾</span>
          Save Profile
        </button>
      </div>
    </div>
  );

  const renderKycTab = () => (
    <div className="space-y-6">
      {/* Document Uploads */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-3 md:gap-6">
        {/* PAN Card */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            Upload PAN Card <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, "panCard", "kyc")}
            className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {kycData.panCardPreview && (
            <div className="mt-3">
              <img
                src={kycData.panCardPreview}
                alt="PAN Card Preview"
                className="w-36 h-20 object-fit rounded-lg border"
              />
            </div>
          )}
        </div>

        {/* Aadhaar Front */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            Upload Aadhaar Front ID <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, "aadhaarFront", "kyc")}
            className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {kycData.aadhaarFrontPreview && (
            <div className="mt-3">
              <img
                src={kycData.aadhaarFrontPreview}
                alt="Aadhaar Front Preview"
                className="w-36 h-20 object-fit rounded-lg border"
              />
            </div>
          )}
        </div>

        {/* Aadhaar Back */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            Upload Aadhaar Back ID <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, "aadhaarBack", "kyc")}
            className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {kycData.aadhaarBackPreview && (
            <div className="mt-3">
              <img
                src={kycData.aadhaarBackPreview}
                alt="Aadhaar Back Preview"
                className="w-36 h-20 object-fit rounded-lg border"
              />
            </div>
          )}
        </div>

        {/* Selfie with ID */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            Selfie with ID (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, "selfieWithId", "kyc")}
            className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {kycData.selfieWithIdPreview && (
            <div className="mt-3">
              <img
                src={kycData.selfieWithIdPreview}
                alt="Selfie Preview"
                className="w-36 h-20 object-fit rounded-lg border"
              />
            </div>
          )}
        </div>

        {/* KYC Status */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            KYC Status
          </label>
          <div className="flex items-center">
            <span
              className={`w-full px-3 py-1.5 text-[14px] font-medium rounded-lg border ${
                kycData.kycStatus === "Approved"
                  ? "bg-green-100 text-green-800 border-green-600"
                  : kycData.kycStatus === "Rejected"
                  ? "bg-red-100 text-red-800 border-red-806"
                  : "bg-yellow-100 text-yellow-800 border-yellow-600"
              }`}
            >
              {kycData.kycStatus || "Pending"}
            </span>
          </div>
        </div>

        {/* Approval Date - Only show if KYC is approved */}
        {kycData.kycStatus === "Approved" && (
          <div>
            <label className="block text-[13px] font-medium text-gray-700 mb-1">
              Approval Date
            </label>
            <input
              type="text"
              value={kycData.approvalDate || new Date().toLocaleDateString()}
              className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              disabled
            />
          </div>
        )}

        {/* Rejection Reason - Only show if KYC is rejected */}
        {kycData.kycStatus === "Rejected" && (
          <div>
            <label className="block text-[13px] font-medium text-gray-700 mb-1">
              Rejection Reason
            </label>
            <input
              type="text"
              value={kycData.rejectionReason || "Document quality issues"}
              className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              disabled
            />
          </div>
        )}
      </div>

      {/* Bank Details Section */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-[14px] sm:text-[16px] font-semibold mb-4">
          Add Bank Details for Withdrawal
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Bank Account Number */}
          <div>
            <label className="block text-[13px] font-medium text-gray-700 mb-1">
              Bank Account Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="bankAccountNumber"
              value={kycData.bankAccountNumber}
              onChange={handleKycChange}
              className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter account number"
              required
            />
          </div>

          {/* Confirm Account Number */}
          <div>
            <label className="block text-[13px] font-medium text-gray-700 mb-1">
              Confirm Account Number
            </label>
            <input
              type="text"
              name="confirmAccountNumber"
              value={kycData.confirmAccountNumber}
              onChange={handleKycChange}
              className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Confirm account number"
            />
          </div>

          {/* Account Holder Name */}
          <div>
            <label className="block text-[13px] font-medium text-gray-700 mb-1">
              Account Holder Name
            </label>
            <input
              type="text"
              name="accountHolderName"
              value={kycData.accountHolderName}
              onChange={handleKycChange}
              className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter account holder name"
            />
          </div>

          {/* Bank Name */}
          <div>
            <label className="block text-[13px] font-medium text-gray-700 mb-1">
              Bank Name{" "}
              {(!kycData.bankName || ifscError) && (
                <span className="text-red-500">*</span>
              )}
            </label>
            <input
              type="text"
              name="bankName"
              value={kycData.bankName}
              onChange={handleKycChange}
              className={`w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                kycData.bankName && !ifscError
                  ? "bg-green-50"
                  : ifscError
                  ? "bg-white"
                  : "bg-gray-100"
              }`}
              placeholder={
                ifscError ? "Enter bank name manually" : "Auto-filled from IFSC"
              }
              disabled={isIfscLoading}
            />
          </div>

          {/* Branch Name */}
          <div>
            <label className="block text-[13px] font-medium text-gray-700 mb-1">
              Branch Name{" "}
              {(!kycData.branchName || ifscError) && (
                <span className="text-red-500">*</span>
              )}
            </label>
            <input
              type="text"
              name="branchName"
              value={kycData.branchName}
              onChange={handleKycChange}
              className={`w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                kycData.branchName && !ifscError
                  ? "bg-green-50"
                  : ifscError
                  ? "bg-white"
                  : "bg-gray-100"
              }`}
              placeholder={
                ifscError
                  ? "Enter branch name manually"
                  : "Auto-filled from IFSC"
              }
              disabled={isIfscLoading}
            />
          </div>

          {/* IFSC Code */}
          <div>
            <label className="block text-[13px] font-medium text-gray-700 mb-1">
              IFSC / SWIFT Code
            </label>
            <div className="relative">
              <input
                type="text"
                name="ifscCode"
                value={kycData.ifscCode}
                onChange={handleKycChange}
                placeholder="Enter IFSC Code (e.g., SBIN0000123)"
                maxLength="11"
                className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                style={{ textTransform: "uppercase" }}
              />
              {isIfscLoading && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>
            {ifscError && (
              <p className="text-red-500 text-[12px] mt-1">{ifscError}</p>
            )}
          </div>

          {/* UPI ID */}
          <div>
            <label className="block text-[13px] font-medium text-gray-700 mb-1">
              UPI ID (India only) (Optional)
            </label>
            <input
              type="text"
              name="upiId"
              value={kycData.upiId}
              onChange={handleKycChange}
              className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter UPI Id"
            />
          </div>

          {/* PAN Card Number */}
          <div>
            <label className="block text-[13px] font-medium text-gray-700 mb-1">
              PAN Card Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="panCardNumber"
              value={kycData.panCardNumber}
              onChange={handleKycChange}
              placeholder="enter pan number (e.g., BCDE1234F)"
              maxLength="10"
              className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
              style={{ textTransform: "uppercase" }}
              pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
              title="PAN format: 5 letters, 4 numbers, 1 letter (e.g., ABCDE1234F)"
              required
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveKyc}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-2xl text-[12.5px] sm:text-[14px] font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
        >
          <span className="text-[13px] sm:text-[14px]">✅</span>
          Save KYC Details
        </button>
      </div>
    </div>
  );

  const renderNomineeTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Nominee Name */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            Nominee Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="nomineeName"
            value={nomineeData.nomineeName}
            onChange={handleNomineeChange}
            className="w-full px-2 py-1.5 text-[14px] sm:py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter nominee name"
            required
          />
        </div>

        {/* Relationship */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            Relationship
          </label>
          <select
            name="relationship"
            value={nomineeData.relationship}
            onChange={handleNomineeChange}
            className="w-full px-2 py-1.5 text-[14px] text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Relationship</option>
            <option value="Spouse">Spouse</option>
            <option value="Parent">Parent</option>
            <option value="Child">Child</option>
            <option value="Friend">Friend</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={nomineeData.dateOfBirth}
            onChange={handleNomineeChange}
            className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            Mobile Number (Optional)
          </label>
          <input
            type="tel"
            name="mobileNumber"
            value={nomineeData.mobileNumber}
            onChange={handleNomineeChange}
            className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter mobile number"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            Email (Optional)
          </label>
          <input
            type="email"
            name="email"
            value={nomineeData.email}
            onChange={handleNomineeChange}
            className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter email id"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            Address (Optional)
          </label>
          <textarea
            name="address"
            value={nomineeData.address}
            onChange={handleNomineeChange}
            rows="1"
            className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* ID Proof Upload */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            ID Proof of Nominee
          </label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => handleFileUpload(e, "idProof", "nominee")}
            className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {nomineeData.idProofPreview && (
            <div className="mt-3">
              <img
                src={nomineeData.idProofPreview}
                alt="ID Proof Preview"
                className="w-36 h-20 object-fit rounded-lg border"
              />
            </div>
          )}
        </div>

        {/* Added Date */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            Added Date
          </label>
          <input
            type="text"
            value={nomineeData.addedDate || new Date().toLocaleDateString()}
            className="w-full px-2 py-1.5 text-[14px] border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            disabled
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            Status
          </label>
          <div className="flex items-center">
            <span
              className={`w-full px-3 py-1.5 text-[14px] font-medium rounded-lg border ${
                nomineeData.status === "Verified"
                  ? "bg-green-100 text-green-800 border-green-600"
                  : "bg-yellow-100 text-yellow-800 border-yellow-600"
              }`}
            >
              {nomineeData.status || "Not Verified"}
            </span>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveNominee}
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-2xl text-[12.5px] sm:text-[14px] font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
        >
          <span className="text-[12px] sm:text-[14px]">👥</span>
          Save Nominee Details
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="w-[100%] flex h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />

        {/* Main Content */}
        <div
          className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 pb-20 lg:pb-0 ${
            isProfileExpanded ? "lg:w-[60%]" : "w-[80%] lg:w-[80%]"
          }`}
        >
          {/* Header */}
          <Header
            toggleSidebar={toggleSidebar}
            toggleProfilePanel={toggleProfilePanel}
          />

          {/* Account Content */}
          <main className="flex-1 overflow-auto px-4  text-[14px] relative lg:ml-20 py-4">
            <div className="w-full sm:px-2 lg:px-6 mx-auto">
              {/* Page Title */}
              <div className="mb-6 sm:mb-8">
                <h1 className="text-[19px] sm:text-2xl font-bold text-gray-700">
                  My Account
                </h1>
                <p className="text-gray-600 text-[12px] sm:text-[14px]">
                  Manage your profile, KYC, and nominee details
                </p>
              </div>

              {/* Success Message */}
              {showSuccess && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-fade-in">
                  <span className="text-lg">✅</span>
                  <span className="font-medium">{successMessage}</span>
                </div>
              )}

              {/* Tab Navigation */}
              <div className="bg-white rounded-2xl shadow-sm mb-4  p-1">
                <nav className="flex space-x-1">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`flex-1 py-2 px-2 sm:px-4 text-[12px] sm:text-[14px] font-medium rounded-2xl transition-all duration-200 flex items-center justify-center gap-1 md:gap-3 cursor-pointer ${
                      activeTab === "profile"
                        ? "bg-blue-500 text-white shadow-md transform"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <RiProfileLine className="hidden sm:block  w-5 h-5" />
                    My Profile
                  </button>
                  <button
                    onClick={() => setActiveTab("kyc")}
                    className={`flex-1 py-2 px-2 sm:px-4 text-[12px] sm:text-[14px] font-medium rounded-2xl transition-all duration-200 flex items-center justify-center gap-1 md:gap-3 cursor-pointer ${
                      activeTab === "kyc"
                        ? "bg-green-500 text-white shadow-md transform "
                        : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                    }`}
                  >
                    <MdSecurity className="hidden sm:block  w-5 h-5" />
                    My KYC
                  </button>
                  <button
                    onClick={() => setActiveTab("nominee")}
                    className={`flex-1 py-2 px-2 sm:px-4 text-[12px] sm:text-[14px] font-medium rounded-2xl transition-all duration-200 flex items-center justify-center gap-1 md:gap-3 cursor-pointer ${
                      activeTab === "nominee"
                        ? "bg-purple-500 text-white shadow-md transform "
                        : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                    }`}
                  >
                    <IoPeople className="hidden sm:block  w-5 h-5" />
                    My Nominee
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-5">
                {activeTab === "profile" && renderProfileTab()}
                {activeTab === "kyc" && renderKycTab()}
                {activeTab === "nominee" && renderNomineeTab()}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
