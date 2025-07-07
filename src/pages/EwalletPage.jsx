// import React, { useState, useMemo } from "react";
// import {
//   Filter,
//   CheckCircle,
//   X,
//   TrendingUp,
//   TrendingDown,
//   Wallet,
//   Send,
// } from "lucide-react";
// import { DataTable } from "../components/BinarySoftwareCommonComponents/DataTable";
// import Sidebar from "../partials/Sidebar";
// import Header from "../partials/Header";
// import EpinPage from "./PromoterPlanPage";

// // E-Wallet Page Component
// export const EWalletPage = () => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [activeItem, setActiveItem] = useState("ewallet");
//   const [isProfileExpanded, setIsProfileExpanded] = useState(false);
//   const [activeWalletTab, setActiveWalletTab] = useState("e-wallet"); // e-wallet or plan
//   const [activeTab, setActiveTab] = useState("statement"); // statement, transfer-history, my-earnings
//   const [statusFilter, setStatusFilter] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [dateFilter, setDateFilter] = useState({ start: "", end: "" });
//   const [showTransferSlider, setShowTransferSlider] = useState(false);
//   const [transferTo, setTransferTo] = useState("");
//   const [transferAmount, setTransferAmount] = useState("");
//   const [transactionFee, setTransactionFee] = useState("10.00");
//   const [transactionPassword, setTransactionPassword] = useState("");
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);

//   const toggleSidebar = () => {
//     setIsExpanded(!isExpanded);
//   };

//   const toggleProfilePanel = () => {
//     setIsProfileExpanded(!isProfileExpanded);
//   };

//   // Sample e-wallet statement data
//   const sampleStatementData = [
//     {
//       id: 1,
//       date: "25 Mar 2025 15:43:15",
//       description: "plan refunded",
//       amount: 100.0,
//       type: "credit",
//       transactionId: "TXN001",
//       balance: 15.84,
//     },
//     {
//       id: 2,
//       date: "25 Mar 2025 15:43:14",
//       description: "plan refunded",
//       amount: 100.0,
//       type: "credit",
//       transactionId: "TXN002",
//       balance: 14.84,
//     },
//     {
//       id: 3,
//       date: "25 Mar 2025 15:43:12",
//       description: "plan refunded",
//       amount: 100.0,
//       type: "credit",
//       transactionId: "TXN003",
//       balance: 13.84,
//     },
//     {
//       id: 4,
//       date: "25 Mar 2025 15:43:11",
//       description: "plan refunded",
//       amount: 100.0,
//       type: "credit",
//       transactionId: "TXN004",
//       balance: 12.84,
//     },
//     {
//       id: 5,
//       date: "25 Mar 2025 15:36:58",
//       description: "Payout Request",
//       amount: 10.0,
//       type: "debit",
//       transactionId: "TXN005",
//       balance: 6.84,
//     },
//   ];

//   // Sample transfer history data
//   const sampleTransferData = [
//     {
//       id: 1,
//       date: "24 Mar 2025 10:30:22",
//       description: "Fund Transfer to User123",
//       amount: 50.0,
//       type: "debit",
//       transactionId: "TXN101",
//       status: "Completed",
//       category: "debit",
//     },
//     {
//       id: 2,
//       date: "23 Mar 2025 14:22:11",
//       description: "Fund Transfer from User456",
//       amount: 25.0,
//       type: "credit",
//       transactionId: "TXN102",
//       status: "Completed",
//       category: "credit",
//     },
//   ];

//   // Sample earnings data
//   const sampleEarningsData = [
//     {
//       id: 1,
//       date: "24 Oct 2024 05:27:59",
//       description: "Binary Commission From JANQU11",
//       totalAmount: 7.0,
//       tds: 0.35,
//       serviceCharge: 0.7,
//       amountPayable: 5.95,
//       transactionId: "TXN201",
//       category: "binary commission",
//     },
//     {
//       id: 2,
//       date: "16 Sep 2024 13:47:08",
//       description: "Level Commission From SANTIAGO1985",
//       totalAmount: 3.0,
//       tds: 0.15,
//       serviceCharge: 0.3,
//       amountPayable: 2.55,
//       transactionId: "TXN202",
//       category: "level commission",
//     },
//     {
//       id: 3,
//       date: "16 Sep 2024 13:47:08",
//       description: "Referral From SANTIAGO1985",
//       totalAmount: 5.0,
//       tds: 0.25,
//       serviceCharge: 0.5,
//       amountPayable: 4.25,
//       transactionId: "TXN203",
//       category: "referral",
//     },
//   ];

//   // Get current data based on active tab
//   const getCurrentData = () => {
//     switch (activeTab) {
//       case "statement":
//         return sampleStatementData;
//       case "transfer-history":
//         return sampleTransferData;
//       case "my-earnings":
//         return sampleEarningsData;
//       default:
//         return sampleStatementData;
//     }
//   };

//   // Define columns based on active tab
//   const getColumns = () => {
//     if (activeTab === "statement") {
//       return [
//         {
//           key: "description",
//           header: "Description",
//           render: (value) => (
//             <div className="text-[12px] sm:text-sm text-gray-700">{value}</div>
//           ),
//         },
//         {
//           key: "amount",
//           header: "Amount",
//           render: (value, item) => (
//             <div className="flex items-center gap-1">
//               <span
//                 className={`text-[12px] sm:text-sm font-semibold ${
//                   item.type === "credit" ? "text-green-600" : "text-red-600"
//                 }`}
//               >
//                 {item.type === "credit" ? "+" : "-"}₹
//                 {Math.abs(value).toFixed(2)}
//               </span>
//               {item.type === "credit" ? (
//                 <TrendingUp className="w-3 h-3 text-green-500" />
//               ) : (
//                 <TrendingDown className="w-3 h-3 text-red-500" />
//               )}
//             </div>
//           ),
//         },
//         {
//           key: "date",
//           header: "Transaction Date",
//           render: (value) => (
//             <div className="text-[12px] sm:text-sm text-gray-600">{value}</div>
//           ),
//         },
//         {
//           key: "balance",
//           header: "Balance",
//           render: (value) => (
//             <div className="text-[12px] sm:text-sm font-semibold text-purple-600">
//               ₹{value}
//             </div>
//           ),
//         },
//       ];
//     }

//     if (activeTab === "my-earnings") {
//       return [
//         {
//           key: "description",
//           header: "Description",
//           render: (value) => (
//             <div className="text-[12px] sm:text-sm text-gray-700">{value}</div>
//           ),
//         },
//         {
//           key: "totalAmount",
//           header: "Total Amount",
//           render: (value) => (
//             <div className="text-[12px] sm:text-sm font-semibold text-green-600">
//               ₹{value.toFixed(2)}
//             </div>
//           ),
//         },
//         {
//           key: "tds",
//           header: "TDS",
//           render: (value) => (
//             <div className="text-[12px] sm:text-sm text-gray-600">
//               ₹{value.toFixed(2)}
//             </div>
//           ),
//         },
//         {
//           key: "serviceCharge",
//           header: "Service Charge",
//           render: (value) => (
//             <div className="text-[12px] sm:text-sm text-gray-600">
//               ₹{value.toFixed(2)}
//             </div>
//           ),
//         },
//         {
//           key: "amountPayable",
//           header: "Amount Payable",
//           render: (value) => (
//             <div className="text-[12px] sm:text-sm font-semibold text-blue-600">
//               ₹{value.toFixed(2)}
//             </div>
//           ),
//         },
//         {
//           key: "date",
//           header: "Transaction Date",
//           render: (value) => (
//             <div className="text-[12px] sm:text-sm text-gray-600">{value}</div>
//           ),
//         },
//       ];
//     }

//     // Transfer history columns (default)
//     return [
//       {
//         key: "description",
//         header: "Description",
//         render: (value) => (
//           <div className="text-[12px] sm:text-sm text-gray-700">{value}</div>
//         ),
//       },
//       {
//         key: "amount",
//         header: "Amount",
//         render: (value, item) => (
//           <div className="flex items-center gap-1">
//             <span
//               className={`text-[12px] sm:text-sm font-semibold ${
//                 item.type === "credit" ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {item.type === "credit" ? "+" : "-"}₹{Math.abs(value).toFixed(2)}
//             </span>
//             {item.type === "credit" ? (
//               <TrendingUp className="w-3 h-3 text-green-500" />
//             ) : (
//               <TrendingDown className="w-3 h-3 text-red-500" />
//             )}
//           </div>
//         ),
//       },
//       {
//         key: "date",
//         header: "Transaction Date",
//         render: (value) => (
//           <div className="text-[12px] sm:text-sm text-gray-600">{value}</div>
//         ),
//       },
//       {
//         key: "status",
//         header: "Status",
//         render: (value) => (
//           <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-medium bg-green-100 text-green-800">
//             <CheckCircle className="w-3 h-3" />
//             {value}
//           </span>
//         ),
//       },
//     ];
//   };

//   // Get category options based on active tab
//   const getCategoryOptions = () => {
//     if (activeTab === "transfer-history") {
//       return [
//         { value: "", label: "Select..." },
//         { value: "credit", label: "Credit" },
//         { value: "debit", label: "Debit" },
//       ];
//     } else if (activeTab === "my-earnings") {
//       return [
//         { value: "", label: "Select..." },
//         { value: "level commission", label: "Level Commission" },
//         { value: "referral", label: "Referral" },
//         { value: "binary commission", label: "Binary Commission" },
//       ];
//     }
//     return [];
//   };

//   // Filter data by status, category, and date
//   const filteredData = useMemo(() => {
//     let currentData = getCurrentData();

//     // Filter by status (for statement tab)
//     if (statusFilter && statusFilter !== "all" && activeTab === "statement") {
//       currentData = currentData.filter((item) =>
//         item.type?.toLowerCase().includes(statusFilter.toLowerCase())
//       );
//     }

//     // Filter by category (for transfer-history and my-earnings tabs)
//     if (categoryFilter && categoryFilter !== "") {
//       currentData = currentData.filter((item) =>
//         item.category?.toLowerCase().includes(categoryFilter.toLowerCase())
//       );
//     }

//     // Filter by date range
//     if (dateFilter.start || dateFilter.end) {
//       currentData = currentData.filter((item) => {
//         const itemDate = new Date(item.date);
//         const startDate = dateFilter.start ? new Date(dateFilter.start) : null;
//         const endDate = dateFilter.end ? new Date(dateFilter.end) : null;

//         if (startDate && endDate) {
//           return itemDate >= startDate && itemDate <= endDate;
//         } else if (startDate) {
//           return itemDate >= startDate;
//         } else if (endDate) {
//           return itemDate <= endDate;
//         }
//         return true;
//       });
//     }

//     return currentData;
//   }, [statusFilter, categoryFilter, dateFilter, activeTab]);

//   // Calculate stats for e-wallet
//   const eWalletStats = {
//     balance: 15.84,
//     credited: sampleStatementData
//       .filter((item) => item.type === "credit")
//       .reduce((sum, item) => sum + item.amount, 0),
//     debited: sampleStatementData
//       .filter((item) => item.type === "debit")
//       .reduce((sum, item) => sum + item.amount, 0),
//     spent: 72.54,
//     totalTransactions: sampleStatementData.length,
//   };

//   const DonutChart = ({ spent, balance }) => {
//     const total = spent + balance;
//     const spentPercentage = (spent / total) * 100;
//     const balancePercentage = (balance / total) * 100;

//     const radius = 16;
//     const strokeWidth = 6;
//     const circumference = 3 * Math.PI * radius;
//     const spentOffset = circumference - (spentPercentage / 100) * circumference;
//     const balanceOffset =
//       circumference - (balancePercentage / 100) * circumference;

//     return (
//       <div className="relative w-11 h-11 sm:w-14 sm:h-14">
//         <svg className="w-full h-full transform -rotate-90" viewBox="0 0 40 40">
//           {/* Background circle */}
//           <circle
//             cx="20"
//             cy="20"
//             r={radius}
//             stroke="#e5e7eb"
//             strokeWidth={strokeWidth}
//             fill="transparent"
//           />
//           {/* Spent amount (blue) */}
//           <circle
//             cx="20"
//             cy="20"
//             r={radius}
//             stroke="#3b82f6"
//             strokeWidth={strokeWidth}
//             fill="transparent"
//             strokeDasharray={circumference}
//             strokeDashoffset={spentOffset}
//             strokeLinecap="round"
//             className="transition-all duration-300"
//           />
//           {/* Balance amount (green) */}
//           <circle
//             cx="20"
//             cy="20"
//             r={radius}
//             stroke="#10b981"
//             strokeWidth={strokeWidth}
//             fill="transparent"
//             strokeDasharray={circumference}
//             strokeDashoffset={balanceOffset}
//             strokeLinecap="round"
//             className="transition-all duration-300"
//             style={{
//               strokeDasharray: `${
//                 (balancePercentage / 100) * circumference
//               } ${circumference}`,
//               transform: `rotate(${(spentPercentage / 100) * 360}deg)`,
//               transformOrigin: "20px 20px",
//             }}
//           />
//         </svg>
//         <div className="absolute inset-0 flex items-center justify-center">
//           <span className="text-[8px] sm:text-[10px] font-bold text-gray-700">
//           ₹{balance}
//           </span>
//         </div>
//       </div>
//     );
//   };

//   const handleFundTransfer = () => {
//     setShowTransferSlider(true);
//   };

//   const handleSubmitTransfer = (e) => {
//     e.preventDefault();
//     if (!transferTo || !transferAmount || !transactionPassword) {
//       alert("Please fill in all required fields");
//       return;
//     }

//     // Simulate API call
//     setTimeout(() => {
//       setShowTransferSlider(false);
//       setShowSuccessMessage(true);
//       setTransferTo("");
//       setTransferAmount("");
//       setTransactionPassword("");

//       // Hide success message after 3 seconds
//       setTimeout(() => {
//         setShowSuccessMessage(false);
//       }, 3000);
//     }, 1000);
//   };

//   const handleSearch = () => {
//     // This function can be used to trigger search/filter
//     console.log("Searching with filters:", {
//       statusFilter,
//       categoryFilter,
//       dateFilter,
//     });
//   };

//   const handleReset = () => {
//     setStatusFilter("");
//     setCategoryFilter("");
//     setDateFilter({ start: "", end: "" });
//   };

//   // Export configuration for DataTable
//   const exportConfig = {
//     filename: `ewallet-${activeTab}-report`,
//     title: `E-Wallet ${
//       activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
//     } Report`,
//     searchPlaceholder: `Search ${activeTab}...`,
//   };

//   return (
//     <>
//       <div className="w-[100%] flex h-screen bg-gray-50">
//         {/* Sidebar */}
//         <Sidebar
//           isExpanded={isExpanded}
//           setIsExpanded={setIsExpanded}
//           activeItem={activeItem}
//           setActiveItem={setActiveItem}
//         />

//         {/* Main Content */}
//         <div
//           className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 pb-20 lg:pb-0 ${
//             isProfileExpanded ? "lg:w-[60%]" : "w-[80%] lg:w-[80%]"
//           }`}
//         >
//           {/* Header */}
//           <Header
//             toggleSidebar={toggleSidebar}
//             toggleProfilePanel={toggleProfilePanel}
//           />

//           {/* E-Wallet Content */}
//           <main className="flex-1 overflow-auto px-4 py-2 relative lg:ml-20">
//             <div className="max-w-7xl mx-auto">
//               {/* Success Message */}
//               {showSuccessMessage && (
//                 <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 text-[12px] sm:text-base rounded-lg shadow-lg z-50 flex items-center gap-2">
//                   <CheckCircle className="w-5 h-5" />
//                   Fund transfer submitted successfully!
//                 </div>
//               )}

//               {/* Toggle Buttons */}
//               <div className="mb-3 flex gap-1 bg-white p-1 rounded-2xl shadow-sm border border-gray-200 w-fit">
//                 <button
//                   onClick={() => setActiveWalletTab("e-wallet")}
//                   className={`px-3 py-1 text-sm font-medium rounded-2xl transition-all duration-200 cursor-pointer ${
//                     activeWalletTab === "e-wallet"
//                       ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-sm"
//                       : "text-gray-600 hover:text-gray-800"
//                   }`}
//                 >
//                   E-Wallet
//                 </button>
//                 <button
//                   onClick={() => setActiveWalletTab("plan")}
//                   className={`px-3 py-1 text-sm font-medium rounded-2xl transition-all duration-200 cursor-pointer ${
//                     activeWalletTab === "plan"
//                       ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-sm"
//                       : "text-gray-600 hover:text-gray-800"
//                   }`}
//                 >
//                   Promoter Plan
//                 </button>
//               </div>

//               {/* E-Wallet Section */}
//               {activeWalletTab === "e-wallet" && (
//                 <>
//                   {/* Header */}
//                   <div className="mb-4 sm:mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
//                     <div>
//                       <h1 className="text-[16px] sm:text-[18px] font-medium text-gray-700">
//                         E-Wallet Management
//                       </h1>
//                       <p className="text-[12px] sm:text-[13px] text-gray-500 tracking-wide">
//                         Manage your e-wallet balance and transactions
//                       </p>
//                     </div>

//                     <button
//                       onClick={handleFundTransfer}
//                       className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-sm cursor-pointer"
//                     >
//                       <Send className="w-4 h-4" />
//                       E-wallet Fund Transfer
//                     </button>
//                   </div>

//                   {/* Stats Cards */}
//                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5 sm:gap-2 mb-3">
//                     <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-1.5 sm:p-3">
//                       <div className="flex items-center gap-2 sm:gap-3">
//                         <div className="w-6 sm:w-10 h-6 sm:h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
//                           <Wallet className="w-3.5 sm:w-5 h-3.5 sm:h-5 text-white" />
//                         </div>
//                         <div>
//                           <p className="text-[11px] sm:text-[12px] font-medium text-gray-600">
//                             E-Wallet Balance
//                           </p>
//                           <p className="text-[13px] sm:text-[16px] font-bold text-gray-900">
//                           ₹ {eWalletStats.balance.toFixed(2)}
//                           </p>
//                           <p className="text-[10px] text-gray-500 flex items-center gap-1">
//                             Last Month{" "}
//                             <TrendingDown className="w-3 h-3 text-red-500" />{" "}
//                             -0%
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-1.5 sm:p-3">
//                       <div className="flex items-center gap-2 sm:gap-3">
//                         <div className="w-6 sm:w-10 h-6 sm:h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
//                           <TrendingUp className="w-3.5 sm:w-5 h-3.5 sm:h-5 text-white" />
//                         </div>
//                         <div>
//                           <p className="text-[11px] sm:text-[12px] font-medium text-gray-600">
//                             Credited Amount
//                           </p>
//                           <p className="text-[13px] sm:text-[16px] font-bold text-gray-900">
//                           ₹ {eWalletStats.credited.toFixed(2)}
//                           </p>
//                           <p className="text-[10px] text-gray-500 flex items-center gap-1">
//                             Last Month{" "}
//                             <TrendingDown className="w-3 h-3 text-red-500" />{" "}
//                             -0%
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-1.5 sm:p-3">
//                       <div className="flex items-center gap-2 sm:gap-3">
//                         <div className="w-6 sm:w-10 h-6 sm:h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
//                           <TrendingDown className="w-3.5 sm:w-5 h-3.5 sm:h-5 text-white" />
//                         </div>
//                         <div>
//                           <p className="text-[11px] sm:text-[12px] font-medium text-gray-600">
//                             Debited Amount
//                           </p>
//                           <p className="text-[13px] sm:text-[16px] font-bold text-gray-900">
//                           ₹ {eWalletStats.debited.toFixed(2)}
//                           </p>
//                           <p className="text-[10px] text-gray-500 flex items-center gap-1">
//                             Last Month{" "}
//                             <TrendingDown className="w-3 h-3 text-red-500" />{" "}
//                             -0%
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-1.5 sm:p-3">
//                       <div className="flex items-center  gap-1.5 sm:gap-4">
//                         <DonutChart
//                           spent={eWalletStats.spent}
//                           balance={eWalletStats.balance}
//                         />
//                         <div className="flex-1">
//                           <div className="flex flex-col gap-1 mt-1">
//                             <div className="flex items-center gap-1">
//                               <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-500 rounded-full"></div>
//                               <span className="text-[10px] sm:text-[12px] text-gray-600">
//                                 Spent ₹ {eWalletStats.spent.toFixed(2)}
//                               </span>
//                             </div>
//                             <div className="flex items-center gap-1">
//                               <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-500 rounded-full"></div>
//                               <span className="text-[10px] sm:text-[12px] text-gray-600">
//                                 Balance ₹ {eWalletStats.balance.toFixed(2)}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Tab Navigation */}
//                   <div className="mb-2 flex gap-1 bg-white p-1 rounded-xl shadow-sm border border-gray-200 w-fit">
//                     <button
//                       onClick={() => setActiveTab("statement")}
//                       className={`px-2 sm:px-4 py-1 text-[12px] sm:text-[13px] font-medium rounded-lg transition-all duration-200 ${
//                         activeTab === "statement"
//                           ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-sm"
//                           : "text-gray-600 hover:text-gray-800"
//                       }`}
//                     >
//                       Statement
//                     </button>
//                     <button
//                       onClick={() => setActiveTab("transfer-history")}
//                       className={`px-2 sm:px-4 py-1 text-[12px] sm:text-[13px] font-medium rounded-lg transition-all duration-200 ${
//                         activeTab === "transfer-history"
//                           ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-sm"
//                           : "text-gray-600 hover:text-gray-800"
//                       }`}
//                     >
//                       Transfer History
//                     </button>
//                     <button
//                       onClick={() => setActiveTab("my-earnings")}
//                       className={`px-2 sm:px-4 py-1 text-[12px] sm:text-[13px] font-medium rounded-lg transition-all duration-200 ${
//                         activeTab === "my-earnings"
//                           ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-sm"
//                           : "text-gray-600 hover:text-gray-800"
//                       }`}
//                     >
//                       My Earnings
//                     </button>
//                   </div>

//                   {/* Filters Section */}
//                   <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-2">
//                     {/* Filter Toggle Button for mobile */}
//                     <div className="lg:hidden px-4 py-2 border-b border-gray-200">
//                       <button
//                         onClick={() => setShowFilters(!showFilters)}
//                         className="flex items-center justify-between w-full text-left"
//                       >
//                         <span className="text-[14px] font-medium text-gray-700">
//                           Filters
//                         </span>
//                         <Filter
//                           className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
//                             showFilters ? "rotate-180" : ""
//                           }`}
//                         />
//                       </button>
//                     </div>

//                     {/* Filter Content */}
//                     <div
//                       className={`transition-all duration-300 ease-in-out overflow-hidden ${
//                         showFilters || window.innerWidth >= 768
//                           ? "max-h-96 opacity-100"
//                           : "max-h-0 opacity-0"
//                       } md:max-h-none md:opacity-100`}
//                     >
//                       <div className="p-3">
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
//                           {/* Date Filter */}
//                           <div>
//                             <label className="block text-[12px] font-medium text-gray-700 mb-1">
//                               Date
//                             </label>
//                             <div className="flex gap-2">
//                               <input
//                                 type="date"
//                                 value={dateFilter.start}
//                                 onChange={(e) =>
//                                   setDateFilter((prev) => ({
//                                     ...prev,
//                                     start: e.target.value,
//                                   }))
//                                 }
//                                 placeholder="Start date"
//                                 className="flex-1 text-[12px] border border-gray-300 rounded-xl px-2 py-1 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                               />
//                               <input
//                                 type="date"
//                                 value={dateFilter.end}
//                                 onChange={(e) =>
//                                   setDateFilter((prev) => ({
//                                     ...prev,
//                                     end: e.target.value,
//                                   }))
//                                 }
//                                 placeholder="End date"
//                                 className="flex-1 text-[12px] border border-gray-300 rounded-xl px-2 py-1 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                               />
//                             </div>
//                           </div>

//                           {/* Category Filter */}
//                           <div>
//                             <label className="block text-[12px] font-medium text-gray-700 mb-1">
//                               Category
//                             </label>
//                             {activeTab === "statement" ? (
//                               <select
//                                 value={statusFilter}
//                                 onChange={(e) =>
//                                   setStatusFilter(e.target.value)
//                                 }
//                                 className="w-full text-[12px] border border-gray-300 rounded-xl px-2 py-1 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                               >
//                                 <option value="">Select...</option>
//                                 <option value="credit">Credit</option>
//                                 <option value="debit">Debit</option>
//                               </select>
//                             ) : (
//                               <select
//                                 value={categoryFilter}
//                                 onChange={(e) =>
//                                   setCategoryFilter(e.target.value)
//                                 }
//                                 className="w-full text-[12px] border border-gray-300 rounded-xl px-2 py-1 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                               >
//                                 {getCategoryOptions().map((option) => (
//                                   <option
//                                     key={option.value}
//                                     value={option.value}
//                                   >
//                                     {option.label}
//                                   </option>
//                                 ))}
//                               </select>
//                             )}
//                           </div>

//                           {/* Action Buttons */}
//                           <div className="flex items-end gap-2">
//                             <button
//                               onClick={handleSearch}
//                               className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-[13px] font-medium rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200 cursor-pointer"
//                             >
//                               Search
//                             </button>
//                             <button
//                               onClick={handleReset}
//                               className="px-3 py-1.5 bg-gray-500 text-white text-[13px] font-medium rounded-xl hover:bg-gray-600 transition-all duration-200 cursor-pointer"
//                             >
//                               Reset
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Data Table */}
//                   <DataTable
//                     data={filteredData}
//                     columns={getColumns()}
//                     searchable={true}
//                     exportable={true}
//                     selectable={true}
//                     maxHeight="500px"
//                     exportConfig={exportConfig}
//                   />
//                 </>
//               )}

//               {/* plan Section Placeholder */}
//               {activeWalletTab === "plan" && <EpinPage />}

//               {/* Fund Transfer Slider */}
//               {showTransferSlider && (
//                 <>
//                   {/* Overlay */}
//                   <div
//                     className="fixed inset-0 bg-black/60 bg-opacity-50 z-40"
//                     onClick={() => setShowTransferSlider(false)}
//                   />

//                   {/* Slider */}
//                   <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 overflow-y-auto ">
//                     <div className="p-4">
//                       {/* Header */}
//                       <div className="flex items-center justify-between mb-4">
//                         <h2 className="text-lg font-bold text-gray-900">
//                           Ewallet Fund Transfer
//                         </h2>
//                         <button
//                           onClick={() => setShowTransferSlider(false)}
//                           className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                         >
//                           <X className="w-5 h-5 text-gray-500" />
//                         </button>
//                       </div>

//                       <form onSubmit={handleSubmitTransfer}>
//                         {/* Transfer To */}
//                         <div className="mb-5">
//                           <label className="block text-[13px] font-medium text-gray-700 mb-1">
//                             Transfer To (Username) *
//                           </label>
//                           <input
//                             type="text"
//                             value={transferTo}
//                             onChange={(e) => setTransferTo(e.target.value)}
//                             placeholder="Transfer To : (Username)"
//                             className="w-full px-3 py-1.5 text-[13px] border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                             required
//                           />
//                         </div>

//                         {/* Amount */}
//                         <div className="mb-5">
//                           <label className="block text-[13px] font-medium text-gray-700 mb-1">
//                             Amount *
//                           </label>
//                           <div className="relative">
//                             <span className="absolute left-3 top-1/2 text-[13px] transform -translate-y-1/2 text-gray-500">
//                             ₹
//                             </span>
//                             <input
//                               type="number"
//                               step="0.01"
//                               value={transferAmount}
//                               onChange={(e) =>
//                                 setTransferAmount(e.target.value)
//                               }
//                               placeholder="Amount"
//                               className="w-full pl-8 pr-4 py-1.5 text-[13px] border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                               required
//                             />
//                           </div>
//                         </div>

//                         {/* Available Amount */}
//                         <div className="mb-5">
//                           <label className="block text-[13px] font-medium text-gray-700 mb-1">
//                             Available Amount
//                           </label>
//                           <div className="relative">
//                             <span className="absolute left-3 top-1/2 text-[13px] transform -translate-y-1/2 text-gray-500">
//                             ₹
//                             </span>
//                             <input
//                               type="text"
//                               value="15.84"
//                               readOnly
//                               className="w-full pl-8 pr-4 py-1.5 text-[13px] border border-gray-300 rounded-xl bg-gray-50"
//                             />
//                           </div>
//                         </div>

//                         {/* Transaction Fee */}
//                         <div className="mb-5">
//                           <label className="block text-[13px] font-medium text-gray-700 mb-1">
//                             Transaction Fee
//                           </label>
//                           <div className="relative">
//                             <span className="absolute left-3 top-1/2 text-[13px] transform -translate-y-1/2 text-gray-500">
//                             ₹
//                             </span>
//                             <input
//                               type="text"
//                               value={transactionFee}
//                               readOnly
//                               className="w-full pl-8 pr-4 py-1.5 text-[13px] border border-gray-300 rounded-xl bg-gray-50"
//                             />
//                           </div>
//                         </div>

//                         {/* Transaction Password */}
//                         <div className="mb-6">
//                           <label className="block text-[13px] font-medium text-gray-700 mb-1">
//                             Transaction Password *
//                           </label>
//                           <input
//                             type="password"
//                             value={transactionPassword}
//                             onChange={(e) =>
//                               setTransactionPassword(e.target.value)
//                             }
//                             placeholder="Transaction Password"
//                             className="w-full px-3 py-1.5 text-[13px] border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                             required
//                           />
//                         </div>

//                         {/* Submit Button */}
//                         <button
//                           type="submit"
//                           className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white text-[16px] py-1.5 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-200 cursor-pointer"
//                         >
//                           Submit
//                         </button>
//                       </form>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>
//           </main>

//           {/* Footer */}
//           <footer className="hidden lg:block bg-white border-t p-4 text-center lg:ml-24">
//             <p className="text-sm text-gray-500">
//               Copyright @ All right reserved. 2025
//             </p>
//           </footer>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EWalletPage;

import React, { useState, useMemo } from "react";
import {
  Filter,
  CheckCircle,
  X,
  TrendingUp,
  TrendingDown,
  Wallet,
  Send,
} from "lucide-react";
import { DataTable } from "../components/BinarySoftwareCommonComponents/DataTable";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import EpinPage from "./PromoterPlanPage";

// E-Wallet Page Component
export const EWalletPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("ewallet");
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [activeWalletTab, setActiveWalletTab] = useState("e-wallet"); // e-wallet or plan
  const [activeTab, setActiveTab] = useState("statement"); // statement, transfer-history, my-earnings
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState({ start: "", end: "" });
  const [showTransferSlider, setShowTransferSlider] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: "", status: "" });
  const [activationUnits, setActivationUnits] = useState("");
  const [unitBalance] = useState(15);
  const [transferTo, setTransferTo] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [transactionFee, setTransactionFee] = useState("10.00");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleProfilePanel = () => {
    setIsProfileExpanded(!isProfileExpanded);
  };

  // Sample e-wallet statement data
  const sampleStatementData = [
    {
      id: 1,
      date: "25 Mar 2025 15:43:15",
      description: "plan refunded",
      amount: 100.0,
      type: "credit",
      transactionId: "TXN001",
      balance: 15.84,
    },
    {
      id: 2,
      date: "25 Mar 2025 15:43:14",
      description: "plan refunded",
      amount: 100.0,
      type: "credit",
      transactionId: "TXN002",
      balance: 14.84,
    },
    {
      id: 3,
      date: "25 Mar 2025 15:43:12",
      description: "plan refunded",
      amount: 100.0,
      type: "credit",
      transactionId: "TXN003",
      balance: 13.84,
    },
    {
      id: 4,
      date: "25 Mar 2025 15:43:11",
      description: "plan refunded",
      amount: 100.0,
      type: "credit",
      transactionId: "TXN004",
      balance: 12.84,
    },
    {
      id: 5,
      date: "25 Mar 2025 15:36:58",
      description: "Payout Request",
      amount: 10.0,
      type: "debit",
      transactionId: "TXN005",
      balance: 6.84,
    },
  ];

  // Sample transfer history data
  const sampleTransferData = [
    {
      id: 1,
      date: "24 Mar 2025 10:30:22",
      description: "Fund Transfer to User123",
      amount: 50.0,
      type: "debit",
      transactionId: "TXN101",
      status: "Completed",
      category: "debit",
    },
    {
      id: 2,
      date: "23 Mar 2025 14:22:11",
      description: "Fund Transfer from User456",
      amount: 25.0,
      type: "credit",
      transactionId: "TXN102",
      status: "Completed",
      category: "credit",
    },
  ];

  // Sample earnings data
  const sampleEarningsData = [
    {
      id: 1,
      date: "24 Oct 2024 05:27:59",
      description: "Matching Business Incentive on 10 Units",
      totalAmount: 7.0,
      tds: 0.35,
      serviceCharge: 0.7,
      amountPayable: 5.95,
      transactionId: "TXN201",
      category: "binary commission",
    },
    {
      id: 2,
      date: "16 Sep 2024 13:47:08",
      description: "Matching Business Incentive on 10 Units",
      totalAmount: 3.0,
      tds: 0.15,
      serviceCharge: 0.3,
      amountPayable: 2.55,
      transactionId: "TXN202",
      category: "level commission",
    },
    {
      id: 3,
      date: "16 Sep 2024 13:47:08",
      description: "Matching Business Incentive on 10 Units",
      totalAmount: 5.0,
      tds: 0.25,
      serviceCharge: 0.5,
      amountPayable: 4.25,
      transactionId: "TXN203",
      category: "referral",
    },
  ];

  // Get current data based on active tab
  const getCurrentData = () => {
    switch (activeTab) {
      case "statement":
        return sampleStatementData;
      case "transfer-history":
        return sampleTransferData;
      case "my-earnings":
        return sampleEarningsData;
      default:
        return sampleStatementData;
    }
  };

  // Define columns based on active tab
  const getColumns = () => {
    if (activeTab === "statement") {
      return [
        {
          key: "description",
          header: "Description",
          render: (value) => (
            <div className="text-[12px] sm:text-sm text-gray-700">{value}</div>
          ),
        },
        {
          key: "amount",
          header: "Amount",
          render: (value, item) => (
            <div className="flex items-center gap-1">
              <span
                className={`text-[12px] sm:text-sm font-semibold ${
                  item.type === "credit" ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.type === "credit" ? "+" : "-"}₹
                {Math.abs(value).toFixed(2)}
              </span>
              {item.type === "credit" ? (
                <TrendingUp className="w-3 h-3 text-green-500" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-500" />
              )}
            </div>
          ),
        },
        {
          key: "date",
          header: "Transaction Date",
          render: (value) => (
            <div className="text-[12px] sm:text-sm text-gray-600">{value}</div>
          ),
        },
        {
          key: "balance",
          header: "Balance",
          render: (value) => (
            <div className="text-[12px] sm:text-sm font-semibold text-purple-600">
              ₹{value}
            </div>
          ),
        },
      ];
    }

    if (activeTab === "my-earnings") {
      return [
        {
          key: "description",
          header: "Description",
          render: (value) => (
            <div className="text-[12px] sm:text-sm text-gray-700">{value}</div>
          ),
        },
        {
          key: "totalAmount",
          header: "Total Amount",
          render: (value) => (
            <div className="text-[12px] sm:text-sm font-semibold text-green-600">
              ₹{value.toFixed(2)}
            </div>
          ),
        },
        {
          key: "tds",
          header: "TDS",
          render: (value) => (
            <div className="text-[12px] sm:text-sm text-gray-600">
              ₹{value.toFixed(2)}
            </div>
          ),
        },
        {
          key: "serviceCharge",
          header: "Service Charge",
          render: (value) => (
            <div className="text-[12px] sm:text-sm text-gray-600">
              ₹{value.toFixed(2)}
            </div>
          ),
        },
        {
          key: "amountPayable",
          header: "Amount Payable",
          render: (value) => (
            <div className="text-[12px] sm:text-sm font-semibold text-blue-600">
              ₹{value.toFixed(2)}
            </div>
          ),
        },
        {
          key: "date",
          header: "Transaction Date",
          render: (value) => (
            <div className="text-[12px] sm:text-sm text-gray-600">{value}</div>
          ),
        },
      ];
    }

    // Transfer history columns (default)
    return [
      {
        key: "description",
        header: "Description",
        render: (value) => (
          <div className="text-[12px] sm:text-sm text-gray-700">{value}</div>
        ),
      },
      {
        key: "amount",
        header: "Amount",
        render: (value, item) => (
          <div className="flex items-center gap-1">
            <span
              className={`text-[12px] sm:text-sm font-semibold ${
                item.type === "credit" ? "text-green-600" : "text-red-600"
              }`}
            >
              {item.type === "credit" ? "+" : "-"}₹{Math.abs(value).toFixed(2)}
            </span>
            {item.type === "credit" ? (
              <TrendingUp className="w-3 h-3 text-green-500" />
            ) : (
              <TrendingDown className="w-3 h-3 text-red-500" />
            )}
          </div>
        ),
      },
      {
        key: "date",
        header: "Transaction Date",
        render: (value) => (
          <div className="text-[12px] sm:text-sm text-gray-600">{value}</div>
        ),
      },
      {
        key: "status",
        header: "Status",
        render: (value) => (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3" />
            {value}
          </span>
        ),
      },
    ];
  };

  // Get category options based on active tab
  const getCategoryOptions = () => {
    if (activeTab === "transfer-history") {
      return [
        { value: "", label: "Select..." },
        { value: "credit", label: "Credit" },
        { value: "debit", label: "Debit" },
      ];
    } else if (activeTab === "my-earnings") {
      return [
        { value: "", label: "Select..." },
        { value: "level commission", label: "Level Commission" },
        { value: "referral", label: "Referral" },
        { value: "binary commission", label: "Binary Commission" },
      ];
    }
    return [];
  };

  // Filter data by status, category, and date
  const filteredData = useMemo(() => {
    let currentData = getCurrentData();

    // Filter by status (for statement tab)
    if (statusFilter && statusFilter !== "all" && activeTab === "statement") {
      currentData = currentData.filter((item) =>
        item.type?.toLowerCase().includes(statusFilter.toLowerCase())
      );
    }

    // Filter by category (for transfer-history and my-earnings tabs)
    if (categoryFilter && categoryFilter !== "") {
      currentData = currentData.filter((item) =>
        item.category?.toLowerCase().includes(categoryFilter.toLowerCase())
      );
    }

    // Filter by date range
    if (dateFilter.start || dateFilter.end) {
      currentData = currentData.filter((item) => {
        const itemDate = new Date(item.date);
        const startDate = dateFilter.start ? new Date(dateFilter.start) : null;
        const endDate = dateFilter.end ? new Date(dateFilter.end) : null;

        if (startDate && endDate) {
          return itemDate >= startDate && itemDate <= endDate;
        } else if (startDate) {
          return itemDate >= startDate;
        } else if (endDate) {
          return itemDate <= endDate;
        }
        return true;
      });
    }

    return currentData;
  }, [statusFilter, categoryFilter, dateFilter, activeTab]);

  // Calculate stats for e-wallet
  const eWalletStats = {
    balance: 15.84,
    credited: sampleStatementData
      .filter((item) => item.type === "credit")
      .reduce((sum, item) => sum + item.amount, 0),
    debited: sampleStatementData
      .filter((item) => item.type === "debit")
      .reduce((sum, item) => sum + item.amount, 0),
    spent: 72.54,
    totalTransactions: sampleStatementData.length,
  };

  const DonutChart = ({ spent, balance }) => {
    const total = spent + balance;
    const spentPercentage = (spent / total) * 100;
    const balancePercentage = (balance / total) * 100;

    const radius = 16;
    const strokeWidth = 6;
    const circumference = 3 * Math.PI * radius;
    const spentOffset = circumference - (spentPercentage / 100) * circumference;
    const balanceOffset =
      circumference - (balancePercentage / 100) * circumference;

    return (
      <div className="relative w-11 h-11 sm:w-14 sm:h-14">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 40 40">
          {/* Background circle */}
          <circle
            cx="20"
            cy="20"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Spent amount (blue) */}
          <circle
            cx="20"
            cy="20"
            r={radius}
            stroke="#3b82f6"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={spentOffset}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
          {/* Balance amount (green) */}
          <circle
            cx="20"
            cy="20"
            r={radius}
            stroke="#10b981"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={balanceOffset}
            strokeLinecap="round"
            className="transition-all duration-300"
            style={{
              strokeDasharray: `${
                (balancePercentage / 100) * circumference
              } ${circumference}`,
              transform: `rotate(${(spentPercentage / 100) * 360}deg)`,
              transformOrigin: "20px 20px",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[8px] sm:text-[10px] font-bold text-gray-700">
            ₹{balance}
          </span>
        </div>
      </div>
    );
  };

  const handleFundTransfer = () => {
    setShowTransferSlider(true);
  };

  const handleSubmitTransfer = (e) => {
    e.preventDefault();
    if (!transferTo || !activationUnits) {
      alert("Please fill in all required fields");
      return;
    }

    const totalAmount = parseFloat(activationUnits) * 10000; // 1 unit = 10,000 INR

    // Simulate API call
    setTimeout(() => {
      setShowTransferSlider(false);
      setShowSuccessMessage(true);
      setTransferTo("");
      setActivationUnits("");
      setUserDetails({ name: "", status: "" });

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }, 1000);
  };

  const handleSearch = () => {
    // This function can be used to trigger search/filter
    console.log("Searching with filters:", {
      statusFilter,
      categoryFilter,
      dateFilter,
    });
  };

  const handleReset = () => {
    setStatusFilter("");
    setCategoryFilter("");
    setDateFilter({ start: "", end: "" });
  };

  const dummyUsers = {
    "69532dcddag": {
      name: "Savitri Tiwari",
      status: "Already Active",
    },
    USER123: {
      name: "Rahul Sharma",
      status: "Inactive",
    },
    JOHN456: {
      name: "John Wilson",
      status: "Active",
    },
    MARIA789: {
      name: "Maria Garcia",
      status: "Pending",
    },
    ADMIN001: {
      name: "Admin User",
      status: "Already Active",
    },
  };

  //function to handle user ID lookup
  const handleUserIdLookup = async (userId) => {
    if (userId.length >= 3) {
      // Start lookup after 4 characters
      //api call here
      // Simulate API call delay
      setTimeout(() => {
        const userKey = Object.keys(dummyUsers).find(
          (key) => key.toLowerCase() === userId.toLowerCase()
        );

        if (userKey) {
          setUserDetails(dummyUsers[userKey]);
        } else {
          setUserDetails({
            name: "User Not Found",
            status: "Invalid",
          });
        }
      }, 300);
    } else {
      setUserDetails({ name: "", status: "" });
    }
  };

  // Export configuration for DataTable
  const exportConfig = {
    filename: `ewallet-${activeTab}-report`,
    title: `E-Wallet ${
      activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
    } Report`,
    searchPlaceholder: `Search ${activeTab}...`,
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

          {/* E-Wallet Content */}
          <main className="flex-1 overflow-auto px-4 py-2 relative lg:ml-20">
            <div className="w-full mx-auto">
              {/* Success Message */}
              {showSuccessMessage && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-4 sm:px-6 py-3 text-[12px] sm:text-base rounded-lg shadow-lg z-50 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Package activation submitted successfully!
                </div>
              )}

              {/* Toggle Buttons */}
              <div className="mb-3 flex gap-1 bg-white p-1 rounded-2xl shadow-sm border border-gray-200 w-fit">
                <button
                  onClick={() => setActiveWalletTab("e-wallet")}
                  className={`px-3 py-1 text-sm font-medium rounded-2xl transition-all duration-200 cursor-pointer ${
                    activeWalletTab === "e-wallet"
                      ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  E-Wallet
                </button>
                <button
                  onClick={() => setActiveWalletTab("plan")}
                  className={`px-3 py-1 text-sm font-medium rounded-2xl transition-all duration-200 cursor-pointer ${
                    activeWalletTab === "plan"
                      ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Promoter Plan
                </button>
              </div>

              {/* E-Wallet Section */}
              {activeWalletTab === "e-wallet" && (
                <>
                  {/* Header */}
                  <div className="mb-4 sm:mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                    <div>
                      <h1 className="text-[16px] sm:text-[18px] font-medium text-gray-700">
                        E-Wallet Management
                      </h1>
                      <p className="text-[12px] sm:text-[13px] text-gray-500 tracking-wide">
                        Manage your e-wallet balance and transactions
                      </p>
                    </div>

                    <button
                      onClick={handleFundTransfer}
                      className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-sm cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      Package Activation
                    </button>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5 sm:gap-2 mb-3">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-1.5 sm:p-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-6 sm:w-10 h-6 sm:h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                          <Wallet className="w-3.5 sm:w-5 h-3.5 sm:h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-[11px] sm:text-[12px] font-medium text-gray-600">
                            E-Wallet Balance
                          </p>
                          <p className="text-[13px] sm:text-[16px] font-bold text-gray-900">
                            ₹ {eWalletStats.balance.toFixed(2)}
                          </p>
                          <p className="text-[10px] text-gray-500 flex items-center gap-1">
                            Last Month{" "}
                            <TrendingDown className="w-3 h-3 text-red-500" />{" "}
                            -0%
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-1.5 sm:p-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-6 sm:w-10 h-6 sm:h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-3.5 sm:w-5 h-3.5 sm:h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-[11px] sm:text-[12px] font-medium text-gray-600">
                            Credited Amount
                          </p>
                          <p className="text-[13px] sm:text-[16px] font-bold text-gray-900">
                            ₹ {eWalletStats.credited.toFixed(2)}
                          </p>
                          <p className="text-[10px] text-gray-500 flex items-center gap-1">
                            Last Month{" "}
                            <TrendingDown className="w-3 h-3 text-red-500" />{" "}
                            -0%
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-1.5 sm:p-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-6 sm:w-10 h-6 sm:h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
                          <TrendingDown className="w-3.5 sm:w-5 h-3.5 sm:h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-[11px] sm:text-[12px] font-medium text-gray-600">
                            Debited Amount
                          </p>
                          <p className="text-[13px] sm:text-[16px] font-bold text-gray-900">
                            ₹ {eWalletStats.debited.toFixed(2)}
                          </p>
                          <p className="text-[10px] text-gray-500 flex items-center gap-1">
                            Last Month{" "}
                            <TrendingDown className="w-3 h-3 text-red-500" />{" "}
                            -0%
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-1.5 sm:p-3">
                      <div className="flex items-center  gap-1.5 sm:gap-4">
                        <DonutChart
                          spent={eWalletStats.spent}
                          balance={eWalletStats.balance}
                        />
                        <div className="flex-1">
                          <div className="flex flex-col gap-1 mt-1">
                            <div className="flex items-center gap-1">
                              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-[10px] sm:text-[12px] text-gray-600">
                                Spent ₹ {eWalletStats.spent.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-500 rounded-full"></div>
                              <span className="text-[10px] sm:text-[12px] text-gray-600">
                                Balance ₹ {eWalletStats.balance.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tab Navigation */}
                  <div className="mb-2 flex gap-1 bg-white p-1 rounded-xl shadow-sm border border-gray-200 w-fit">
                    <button
                      onClick={() => setActiveTab("statement")}
                      className={`px-2 sm:px-4 py-1 text-[12px] sm:text-[13px] font-medium rounded-lg transition-all duration-200 ${
                        activeTab === "statement"
                          ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-sm"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      Statement
                    </button>
                    <button
                      onClick={() => setActiveTab("transfer-history")}
                      className={`px-2 sm:px-4 py-1 text-[12px] sm:text-[13px] font-medium rounded-lg transition-all duration-200 ${
                        activeTab === "transfer-history"
                          ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-sm"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      Transfer History
                    </button>
                    <button
                      onClick={() => setActiveTab("my-earnings")}
                      className={`px-2 sm:px-4 py-1 text-[12px] sm:text-[13px] font-medium rounded-lg transition-all duration-200 ${
                        activeTab === "my-earnings"
                          ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-sm"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      My Earnings
                    </button>
                  </div>

                  {/* Filters Section */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-2">
                    {/* Filter Toggle Button for mobile */}
                    <div className="lg:hidden px-4 py-2 border-b border-gray-200">
                      <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center justify-between w-full text-left"
                      >
                        <span className="text-[14px] font-medium text-gray-700">
                          Filters
                        </span>
                        <Filter
                          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                            showFilters ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {/* Filter Content */}
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        showFilters || window.innerWidth >= 768
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      } md:max-h-none md:opacity-100`}
                    >
                      <div className="p-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
                          {/* Date Filter */}
                          <div>
                            <label className="block text-[12px] font-medium text-gray-700 mb-1">
                              Date
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="date"
                                value={dateFilter.start}
                                onChange={(e) =>
                                  setDateFilter((prev) => ({
                                    ...prev,
                                    start: e.target.value,
                                  }))
                                }
                                placeholder="Start date"
                                className="flex-1 text-[12px] border border-gray-300 rounded-xl px-2 py-1 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                              <input
                                type="date"
                                value={dateFilter.end}
                                onChange={(e) =>
                                  setDateFilter((prev) => ({
                                    ...prev,
                                    end: e.target.value,
                                  }))
                                }
                                placeholder="End date"
                                className="flex-1 text-[12px] border border-gray-300 rounded-xl px-2 py-1 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                            </div>
                          </div>

                          {/* Category Filter */}
                          <div>
                            <label className="block text-[12px] font-medium text-gray-700 mb-1">
                              Category
                            </label>
                            {activeTab === "statement" ? (
                              <select
                                value={statusFilter}
                                onChange={(e) =>
                                  setStatusFilter(e.target.value)
                                }
                                className="w-full text-[12px] border border-gray-300 rounded-xl px-2 py-1 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              >
                                <option value="">Select...</option>
                                <option value="credit">Credit</option>
                                <option value="debit">Debit</option>
                              </select>
                            ) : (
                              <select
                                value={categoryFilter}
                                onChange={(e) =>
                                  setCategoryFilter(e.target.value)
                                }
                                className="w-full text-[12px] border border-gray-300 rounded-xl px-2 py-1 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              >
                                {getCategoryOptions().map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-end gap-2">
                            <button
                              onClick={handleSearch}
                              className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-[13px] font-medium rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200 cursor-pointer"
                            >
                              Search
                            </button>
                            <button
                              onClick={handleReset}
                              className="px-3 py-1.5 bg-gray-500 text-white text-[13px] font-medium rounded-xl hover:bg-gray-600 transition-all duration-200 cursor-pointer"
                            >
                              Reset
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Data Table */}
                  <DataTable
                    data={filteredData}
                    columns={getColumns()}
                    searchable={true}
                    exportable={true}
                    selectable={true}
                    maxHeight="500px"
                    exportConfig={exportConfig}
                  />
                </>
              )}

              {/* plan Section Placeholder */}
              {activeWalletTab === "plan" && <EpinPage />}

              {/* Fund Transfer Slider */}
              {showTransferSlider && (
                <>
                  {/* Overlay */}
                  <div
                    className="fixed inset-0 bg-black/60 bg-opacity-50 z-40"
                    onClick={() => setShowTransferSlider(false)}
                  />

                  {/* Slider */}
                  <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 overflow-y-auto">
                    <div className="p-4">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-900">
                          Package Activation
                        </h2>
                        <button
                          onClick={() => setShowTransferSlider(false)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5 text-gray-500" />
                        </button>
                      </div>

                      <form onSubmit={handleSubmitTransfer}>
                        {/* User ID Input */}
                        <div className="mb-6">
                          <label className="block text-[13px] font-medium text-gray-700 mb-1">
                            Enter Userid to activate
                          </label>
                          <input
                            type="text"
                            value={transferTo}
                            onChange={(e) => {
                              setTransferTo(e.target.value);
                              handleUserIdLookup(e.target.value);
                            }}
                            placeholder="Enter User ID"
                            className="w-full px-3 py-1.5 text-[13px] border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-100"
                            required
                          />

                          {/* User Details Display */}
                          {userDetails.name && (
                            <div className="mt-2 flex justify-between items-center text-[12px]">
                              <span className="text-gray-600">
                                <strong>Name:</strong> {userDetails.name}
                              </span>
                              <span className="text-gray-700">
                                <strong>Status:</strong>
                                <span
                                  className={` ml-1 font-medium ${
                                    userDetails.status === "Already Active" ||
                                    userDetails.status === "Active"
                                      ? " text-green-700 "
                                      : userDetails.status === "Inactive"
                                      ? "text-red-700 "
                                      : userDetails.status === "Pending"
                                      ? " text-yellow-700 "
                                      : " text-gray-700 "
                                  }`}
                                >
                                  {userDetails.status}
                                </span>
                              </span>
                            </div>
                          )}

                        </div>

                        {/* Activation Units */}
                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-1">
                            <label className="block text-[13px] font-medium text-gray-700">
                              Enter Activation Unit
                            </label>
                            <span className="text-[12px] text-gray-500">
                              Unit Balance: {unitBalance}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 relative">
                              <span className="absolute left-3 top-1/2 text-[13px] transform -translate-y-1/2 text-gray-500">
                                U
                              </span>
                              <input
                                type="number"
                                step="1"
                                min="1"
                                value={activationUnits}
                                onChange={(e) =>
                                  setActivationUnits(e.target.value)
                                }
                                placeholder="Amount"
                                className="w-full pl-7 pr-4 py-1.5 text-[13px] border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                required
                              />
                            </div>
                            <span className="text-[12px] text-gray-600 whitespace-nowrap">
                              in INR:{" "}
                              {activationUnits
                                ? (
                                    parseFloat(activationUnits) * 10000
                                  ).toLocaleString()
                                : "0"}
                            </span>
                          </div>
                        </div>

                        {/* Activate Button */}
                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white text-[16px] py-2.5 rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-200 cursor-pointer"
                        >
                          Activate
                        </button>
                      </form>
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

export default EWalletPage;
