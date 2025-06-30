import React, { useState, useMemo } from "react";
import {
  Filter,
  DollarSign,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  X,
  TrendingUp,
  TrendingDown,
  IndianRupeeIcon,
} from "lucide-react";
import { DataTable } from "../components/BinarySoftwareCommonComponents/DataTable";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

// Payout Page Component
export const PayoutPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("payout");
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [showPayoutSlider, setShowPayoutSlider] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [transactionPassword, setTransactionPassword] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleProfilePanel = () => {
    setIsProfileExpanded(!isProfileExpanded);
  };

  // Sample payout data
  const samplePayoutData = [
    {
      id: 1,
      date: "29 Dec 2023 17:55:09",
      amount: 26.54,
      payoutMethod: "bank-transfer",
      status: "Paid",
      transactionId: "TXN001",
    },
    {
      id: 2,
      date: "25 Mar 2025 15:36:58",
      amount: 10.0,
      payoutMethod: "bank-transfer",
      status: "Requested",
      transactionId: "TXN002",
    },
    {
      id: 3,
      date: "27 Nov 2023 12:13:14",
      amount: 5.02,
      payoutMethod: "bank-transfer",
      status: "Requested",
      transactionId: "TXN003",
    },
    {
      id: 4,
      date: "27 Nov 2023 12:14:08",
      amount: 2.01,
      payoutMethod: "bank-transfer",
      status: "Requested",
      transactionId: "TXN004",
    },
    {
      id: 5,
      date: "15 Jan 2024 10:30:22",
      amount: 45.75,
      payoutMethod: "bank-transfer",
      status: "Approved",
      transactionId: "TXN005",
    },
    {
      id: 6,
      date: "20 Feb 2024 14:22:11",
      amount: 12.8,
      payoutMethod: "bank-transfer",
      status: "Rejected",
      transactionId: "TXN006",
    },
    {
      id: 7,
      date: "05 Mar 2024 09:15:33",
      amount: 33.25,
      payoutMethod: "bank-transfer",
      status: "Paid",
      transactionId: "TXN007",
    },
  ];

  const columns = [
    {
      key: "date",
      header: "Date",
      render: (value) => (
        <div className="text-[12px] sm:text-sm text-gray-600">{value}</div>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      render: (value) => (
        <div className="flex items-center gap-1">
          <span className="text-[12px] sm:text-sm font-semibold text-green-600">
          ₹{value.toFixed(2)}
          </span>
          <TrendingUp className="w-3 h-3 text-green-500" />
        </div>
      ),
    },
    {
      key: "payoutMethod",
      header: "Payout Method",
      render: (value) => (
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-blue-500" />
          <span className="text-[12px] sm:text-sm text-gray-700">{value}</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (value) => {
        const statusConfig = {
          Requested: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
          Approved: { color: "bg-blue-100 text-blue-800", icon: CheckCircle },
          Paid: { color: "bg-green-100 text-green-800", icon: CheckCircle },
          Rejected: { color: "bg-red-100 text-red-800", icon: XCircle },
        };
        const config = statusConfig[value] || statusConfig["Requested"];
        const IconComponent = config.icon;

        return (
          <span
            className={`inline-flex items-center gap-1 px-1.5  sm:px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-medium ${config.color}`}
          >
            <IconComponent className="w-3 h-3" />
            {value}
          </span>
        );
      },
    },
  ];

  // Filter data by status
  const filteredData = useMemo(() => {
    if (!statusFilter || statusFilter === "all") return samplePayoutData;
    return samplePayoutData.filter(
      (payout) => payout.status.toLowerCase() === statusFilter.toLowerCase()
    );
  }, [statusFilter]);

  // Calculate stats
  const stats = {
    requested: samplePayoutData
      .filter((p) => p.status === "Requested")
      .reduce((sum, p) => sum + p.amount, 0),
    approved: samplePayoutData
      .filter((p) => p.status === "Approved")
      .reduce((sum, p) => sum + p.amount, 0),
    paid: samplePayoutData
      .filter((p) => p.status === "Paid")
      .reduce((sum, p) => sum + p.amount, 0),
    rejected: samplePayoutData
      .filter((p) => p.status === "Rejected")
      .reduce((sum, p) => sum + p.amount, 0),
  };

  // Get unique statuses for filter dropdown
  const uniqueStatuses = [...new Set(samplePayoutData.map((p) => p.status))];

  const handlePayoutRequest = () => {
    setShowPayoutSlider(true);
  };

  const handleSubmitPayout = (e) => {
    e.preventDefault();
    if (!withdrawalAmount || !transactionPassword) {
      alert("Please fill in all required fields");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setShowPayoutSlider(false);
      setShowSuccessMessage(true);
      setWithdrawalAmount("");
      setTransactionPassword("");

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }, 1000);
  };

  // Export configuration for DataTable
  const exportConfig = {
    filename: "payout-report",
    title: "Payout Report",
    searchPlaceholder: "Search members...",
  };

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

          {/* Payout Content */}
          <main className="flex-1 overflow-auto px-4 py-2 relative lg:ml-20">
            <div className="w-full mx-auto">
              {/* Success Message */}
              {showSuccessMessage && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 text-[12px] sm:text-base rounded-lg shadow-lg z-50 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Payout request submitted successfully!
                </div>
              )}

              {/* Header */}
              <div className="mb-4 sm:mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                <div>
                  <h1 className="text-[17px] sm:text-[19px] font-medium text-gray-700">
                  Withdrawal Management
                  </h1>
                  <p className="text-[12px] sm:text-[13px] text-gray-500 tracking-wide">
                    Manage your withdrawal requests and payout history
                  </p>
                </div>

                <button
                  onClick={handlePayoutRequest}
                  className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-sm cursor-pointer"
                >
                  <IndianRupeeIcon className="w-4 h-4" />
                  Request Withdrawal
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1.5 sm:gap-2 mb-3">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-2 sm:p-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-6 sm:w-10 h-6 sm:h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[12px] sm:text-[13px] font-medium text-gray-600">
                        Requested
                      </p>
                      <p className="text-[14px] sm:text-[20px] font-bold text-gray-900">
                      ₹ {stats.requested.toFixed(2)}
                      </p>
                      <p className="text-[10px] text-gray-500 flex items-center gap-1">
                        Last Month{" "}
                        <TrendingDown className="w-3 h-3 text-red-500" /> -0%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-2 sm:p-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-6 sm:w-10 h-6 sm:h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[12px] sm:text-[13px] font-medium text-gray-600">
                        Approved
                      </p>
                      <p className="text-[14px] sm:text-[20px] font-bold text-gray-900">
                      ₹ {stats.approved.toFixed(2)}
                      </p>
                      <p className="text-[10px] text-gray-500 flex items-center gap-1">
                        Last Month{" "}
                        <TrendingDown className="w-3 h-3 text-red-500" /> -0%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-2 sm:p-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-6 sm:w-10 h-6 sm:h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                      <IndianRupeeIcon className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[12px] sm:text-[13px] font-medium text-gray-600">
                        Paid
                      </p>
                      <p className="text-[14px] sm:text-[20px] font-bold text-gray-900">
                      ₹ {stats.paid.toFixed(2)}
                      </p>
                      <p className="text-[10px] text-gray-500 flex items-center gap-1">
                        Last Month{" "}
                        <TrendingDown className="w-3 h-3 text-red-500" /> -0%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-2 sm:p-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-6 sm:w-10 h-6 sm:h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
                      <XCircle className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[12px] sm:text-[13px] font-medium text-gray-600">
                        Rejected
                      </p>
                      <p className="text-[14px] sm:text-[20px] font-bold text-gray-900">
                      ₹ {stats.rejected.toFixed(2)}
                      </p>
                      <p className="text-[10px] text-gray-500 flex items-center gap-1">
                        Last Month{" "}
                        <TrendingDown className="w-3 h-3 text-red-500" /> -0%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status Filter */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-3 py-2  max-w-xs">
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] sm:text-[13px] font-medium text-gray-600 flex items-center gap-2">
                      <Filter className="w-3 sm:w-4 h-3 sm:h-4" />
                      Filter by Status
                    </label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="text-[12px] sm:text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All Status</option>

                      {uniqueStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <DataTable
                data={filteredData}
                columns={columns}
                searchable={true}
                exportable={true}
                selectable={true}
                maxHeight="500px"
                exportConfig={exportConfig}
              />

              {/* Payout Request Slider */}
              {showPayoutSlider && (
                <>
                  {/* Overlay */}
                  <div
                    className="fixed inset-0 bg-black/60 bg-opacity-50 z-40"
                    onClick={() => setShowPayoutSlider(false)}
                  />

                  {/* Slider */}
                  <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 overflow-y-auto">
                    <div className="p-4">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-900">
                          Withdrawal Request
                        </h2>
                        <button
                          onClick={() => setShowPayoutSlider(false)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5 text-gray-500" />
                        </button>
                      </div>

                      <form onSubmit={handleSubmitPayout}>
                        {/* Withdrawal Amount */}
                        <div className="mb-5">
                          <label className="block text-[13px] font-medium text-gray-700 mb-1">
                            Withdrawal Amount
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 text-[13px] transform -translate-y-1/2 text-gray-500">
                            ₹
                            </span>
                            <input
                              type="number"
                              step="0.01"
                              value={withdrawalAmount}
                              onChange={(e) =>
                                setWithdrawalAmount(e.target.value)
                              }
                              placeholder="Amount"
                              className="w-full pl-8 pr-4 py-1.5 text-[13px] border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              required
                            />
                          </div>
                        </div>

                        {/* Transaction Password */}
                        <div className="mb-6">
                          <label className="block text-[13px] font-medium text-gray-700 mb-1">
                            Transaction Password *
                          </label>
                          <input
                            type="password"
                            value={transactionPassword}
                            onChange={(e) =>
                              setTransactionPassword(e.target.value)
                            }
                            placeholder="Transaction Password"
                            className="w-full px-3 py-1.5 text-[13px] border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                          />
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white text-[16px] py-1.5 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-200 cursor-pointer"
                        >
                          Submit
                        </button>
                      </form>

                      {/* Particulars Section */}
                      <div className="mt-8">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">
                          Particulars
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between border-b border-gray-300 pb-1">
                            <span className="text-gray-600">
                              Default Currency
                            </span>
                            <span className="text-gray-900">(₹)</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-300 pb-1">
                            <span className="text-gray-600">
                              E-Wallet Balance
                            </span>
                            <span className="text-gray-900">₹ 15.84</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-300 pb-1">
                            <span className="text-gray-600">
                              Ewallet Amount Already in Payout Process
                            </span>
                            <span className="text-gray-900">₹ 17.02</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-300 pb-1">
                            <span className="text-gray-600">
                              Total Paid Amount
                            </span>
                            <span className="text-gray-900">₹ 26.54</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-300 pb-1">
                            <span className="text-gray-600">Withdrawal Method</span>
                            <span className="text-gray-900">Bank Transfer</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-300 pb-1">
                            <span className="text-gray-600">
                              Minimum Withdrawal Amount
                            </span>
                            <span className="text-gray-900">₹ 10.00</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-300 pb-1">
                            <span className="text-gray-600">
                              Maximum Withdrawal Amount
                            </span>
                            <span className="text-gray-900">₹ 500.00</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-300 pb-1">
                            <span className="text-gray-600">
                              Available Maximum Withdrawal Amount
                            </span>
                            <span className="text-gray-900">₹ 15.84</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-300 pb-1">
                            <span className="text-gray-600">
                            Withdrawal Request Validity Days
                            </span>
                            <span className="text-gray-900">-</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-300 pb-1">
                            <span className="text-gray-600">Withdrawal Fee</span>
                            <span className="text-purple-600 font-medium">
                              0 %
                            </span>
                          </div>
                          <div className="flex justify-between border-b border-gray-300 pb-1">
                            <span className="text-gray-600">
                            Withdrawal Fee Mode
                            </span>
                            <span className="text-gray-900">Percentage</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </main>

          {/* Footer */}
          <footer className="hidden lg:block bg-white border-t p-4 text-center lg:ml-24">
            <p className="text-sm text-gray-500">
              Copyright @ All right reserved. 2025
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default PayoutPage;
