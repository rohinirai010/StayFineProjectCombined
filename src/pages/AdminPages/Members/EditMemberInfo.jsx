import React, { useState } from "react";
import SectionHeader from "../../../components/SectionHeader";
import PasswordVerificationDialog from "../../../partials/AdminPartials/members/PasswordVerificationDailog";

const EditMemberInfo = ({ member, onSave, onClose }) => {
  const [showPasswordVerification, setShowPasswordVerification] = useState(false);
  const [memberId, setMemberId] = useState("");
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [memberInfo, setMemberInfo] = useState({
    firstName: member.fullname.split(" ")[0],
    lastName: member.fullname.split(" ")[1] || "",
    email: "example@email.com",
    mobileNumber: member.mobileNumber,
    dateOfBirth: "2000-01-01",
    gender: "Male",
    address: "123 Street",
    city: "City",
    state: "State",
    country: "Country",
  });

  const [bankDetails, setBankDetails] = useState({
    accountHolder: "",
    accountNumber: "",
    bankName: "",
    branchName: "",
    ifscCode: "",
    accountType: "Savings",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleMemberInfoChange = (e) => {
    const { name, value } = e.target;
    setMemberInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setBankDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    // Add your validation logic here
    // Example:
    if (!memberInfo.firstName) errors.firstName = "First name is required";
    if (!memberInfo.mobileNumber) errors.mobileNumber = "Mobile number is required";
    
    return errors;
  };

  const handleSaveClick = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    // Show confirmation dialog instead of saving directly
  
    setShowPasswordVerification(true);
  };

  const handleVerifiedSave = () => {
    // Proceed with saving after password verification
    onSave(memberInfo);
    
  };

  const handleConfirmSave = () => {
    // Prepare the updated member data
    const updatedMember = {
      ...member,
      fullname: `${memberInfo.firstName} ${memberInfo.lastName}`.trim(),
      mobileNumber: memberInfo.mobileNumber,
      email: memberInfo.email,
      dateOfBirth: memberInfo.dateOfBirth,
      gender: memberInfo.gender,
      address: memberInfo.address,
      city: memberInfo.city,
      state: memberInfo.state,
      country: memberInfo.country,
      // Include bank details if they should be updated
      bankDetails: {
        accountHolder: bankDetails.accountHolder,
        accountNumber: bankDetails.accountNumber,
        bankName: bankDetails.bankName,
        branchName: bankDetails.branchName,
        ifscCode: bankDetails.ifscCode,
        accountType: bankDetails.accountType,
      }
    };

    // Call the onSave function with the updated member data
    onSave(updatedMember);
    setShowUpdateDialog(false);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         {/* Member Information */}
         <div>
          <SectionHeader title="Member Information" />
          <div className="space-y-2">
            <input
              type="text"
              name="firstName"
              value={memberInfo.firstName}
              onChange={handleMemberInfoChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={memberInfo.lastName}
              onChange={handleMemberInfoChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              placeholder="Last Name"
            />
            <input
              type="email"
              name="email"
              value={memberInfo.email}
              onChange={handleMemberInfoChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              placeholder="Email"
            />
            <input
              type="tel"
              name="mobileNumber"
              value={memberInfo.mobileNumber}
              onChange={handleMemberInfoChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              placeholder="Mobile Number"
            />
            <input
              type="date"
              name="dateOfBirth"
              value={memberInfo.dateOfBirth}
              onChange={handleMemberInfoChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            />
            <select
              name="gender"
              value={memberInfo.gender}
              onChange={handleMemberInfoChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <textarea
              name="address"
              value={memberInfo.address}
              onChange={handleMemberInfoChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              placeholder="Address"
            />
            <input
              type="text"
              name="city"
              value={memberInfo.city}
              onChange={handleMemberInfoChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              placeholder="City"
            />
            <input
              type="text"
              name="state"
              value={memberInfo.state}
              onChange={handleMemberInfoChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              placeholder="State"
            />
            <input
              type="text"
              name="country"
              value={memberInfo.country}
              onChange={handleMemberInfoChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              placeholder="Country"
            />
          </div>
        </div>

        {/* Bank Details */}
        <div>
        <SectionHeader title="Bank Details" />
          <div className="space-y-2">
            <input
              type="text"
              name="accountHolder"
              value={bankDetails.accountHolder}
              onChange={handleBankDetailsChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              placeholder="Account Holder Name"
            />
            <input
              type="text"
              name="accountNumber"
              value={bankDetails.accountNumber}
              onChange={handleBankDetailsChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              placeholder="Account Number"
            />
            <input
              type="text"
              name="bankName"
              value={bankDetails.bankName}
              onChange={handleBankDetailsChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              placeholder="Bank Name"
            />
            <input
              type="text"
              name="branchName"
              value={bankDetails.branchName}
              onChange={handleBankDetailsChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              placeholder="Branch Name"
            />
            <input
              type="text"
              name="ifscCode"
              value={bankDetails.ifscCode}
              onChange={handleBankDetailsChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              placeholder="IFSC Code"
            />
            <select
              name="accountType"
              value={bankDetails.accountType}
              onChange={handleBankDetailsChange}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              <option value="Savings">Savings</option>
              <option value="Current">Current</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm text-gray-200 bg-gray-500 hover:bg-gray-800 dark:hover:bg-gray-100  dark:hover:text-gray-800 rounded-lg cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveClick}
          className="ml-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
        >
          Save
        </button>
      </div>

      {/* Update Confirmation Dialog */}
      {showUpdateDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="rounded-lg bg-white p-6 dark:bg-gray-800 w-96 transform transition-all duration-200 ease-out scale-100 opacity-100 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Confirm Update
            </h3>
            <div className="mb-6 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Member ID:</span>
                <span className="font-medium text-gray-900 dark:text-white">{member.memberId}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Name:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {memberInfo.firstName} {memberInfo.lastName}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                Are you sure you want to update this member's information?
              </p>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowUpdateDialog(false)}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSave}
                className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
              >
                Confirm Update
              </button>
            </div>
          </div>
        </div>
      )}

<PasswordVerificationDialog
        isOpen={showPasswordVerification}
        onClose={() => setShowPasswordVerification(false)}
        onConfirm={handleConfirmSave}
      />
    </div>
  );
};

export default EditMemberInfo;