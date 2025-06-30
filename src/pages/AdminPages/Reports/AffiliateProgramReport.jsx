import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Check,
  CalendarIcon,
} from "lucide-react";
import { IoRemoveCircle } from "react-icons/io5";
import Header from "../../../partials/AdminPartials/Header";
import Sidebar from "../../../partials/AdminPartials/Sidebar";
import DatePickerWithRange from "../../../components/Datepicker";
import OverallCommonTable from "../../../components/OverallCommonTable";
import {
  copyToClipboard,
  exportToCSV,
  exportToExcel,
  exportToPDF,
} from "../../../utils/Utils";

// Dummy data for invitation bonuses
const dummyInvitationBonuses = [
  {
    id: 1,
    dateTime: "2024-03-15 09:30:45",
    particular: "Invitation Bonus - New Member Signup",
    referrerId: "M001",
    referrerName: "John Doe",
    inviteeId: "M008",
    inviteeName: "Alice Cooper",
   
    packageAmount: 1000,
    bonusAmount: 100,
    status: "Paid",
  },
  {
    id: 2,
    dateTime: "2024-03-14 14:22:31",
    particular: "Invitation Bonus - New Member Signup",
    referrerId: "M002",
    referrerName: "Jane Smith",
    inviteeId: "M009",
    inviteeName: "Bob Taylor",
    
    packageAmount: 2000,
    bonusAmount: 200,
    status: "Pending",
  },
  {
    id: 3,
    dateTime: "2024-03-13 11:15:05",
    particular: "Invitation Bonus - New Member Signup",
    referrerId: "M003",
    referrerName: "Mike Johnson",
    inviteeId: "M010",
    inviteeName: "Carol White",
   
    packageAmount: 5000,
    bonusAmount: 500,
    status: "Paid",
  },
  {
    id: 4,
    dateTime: "2024-03-12 16:48:22",
    particular: "Invitation Bonus - New Member Signup",
    referrerId: "M004",
    referrerName: "Sara Wilson",
    inviteeId: "M011",
    inviteeName: "Daniel Lewis",
    packageName: "Silver Package",
    packageAmount: 3000,
    bonusAmount: 300,
    status: "Paid",
  },
  {
    id: 5,
    dateTime: "2024-03-11 10:05:18",
    particular: "Invitation Bonus - New Member Signup",
    referrerId: "M005",
    referrerName: "Robert Brown",
    inviteeId: "M012",
    inviteeName: "Eva Green",
    
    packageAmount: 10000,
    bonusAmount: 1000,
    status: "Paid",
  },
  {
    id: 6,
    dateTime: "2024-03-10 13:27:44",
    particular: "Invitation Bonus - New Member Signup",
    referrerId: "M006",
    referrerName: "Emily Davis",
    inviteeId: "M013",
    inviteeName: "Frank Stone",
   
    packageAmount: 1500,
    bonusAmount: 150,
    status: "Paid",
  },
  {
    id: 7,
    dateTime: "2024-03-09 08:54:21",
    particular: "Invitation Bonus - New Member Signup",
    referrerId: "M007",
    referrerName: "David Miller",
    inviteeId: "M014",
    inviteeName: "Grace Hall",
    packageName: "Gold Package",
    packageAmount: 7500,
    bonusAmount: 750,
    status: "Pending",
  },
];

// Summary data for invitation bonuses
const summaryData = [
  {
    id: 1,
    referrerId: "M001",
    referrerName: "John Doe",
    totalInvitees: 5,
    totalBonuses: 600,
    level: "Gold",
    status: "Active",
  },
  {
    id: 2,
    referrerId: "M002",
    referrerName: "Jane Smith",
    totalInvitees: 8,
    totalBonuses: 950,
    level: "Platinum",
    status: "Active",
  },
  {
    id: 3,
    referrerId: "M003",
    referrerName: "Mike Johnson",
    totalInvitees: 3,
    totalBonuses: 350,
    level: "Silver",
    status: "Active",
  },
  {
    id: 4,
    referrerId: "M004",
    referrerName: "Sara Wilson",
    totalInvitees: 2,
    totalBonuses: 200,
    level: "Bronze",
    status: "Inactive",
  },
  {
    id: 5,
    referrerId: "M005",
    referrerName: "Robert Brown",
    totalInvitees: 12,
    totalBonuses: 1500,
    level: "Diamond",
    status: "Active",
  },
];

const StatsCard = ({ title, value, textColor = "text-black", icon: Icon }) => (
  <div className="sm:px-2  sm:py-2 flex flex-col items-center sm:items-start justify-center sm:gap-1 transform transition-all duration-300">
    <h3
      className={`text-[13px] sm:text-base font-medium text-center tracking-wide ${textColor}`}
    >
      {title}
    </h3>
    <p className="text-lg sm:text-xl font-bold text-center">{value}</p>
  </div>
);

const ExportButton = ({ label, bgColor, shadow, onClick }) => (
  <button
    className={`${bgColor} ${shadow} text-white px-2 sm:px-4 py-[3px] sm:py-1 text-xs sm:text-sm rounded-lg hover:opacity-90 cursor-pointer`}
    onClick={onClick}
  >
    {label}
  </button>
);

const AffiliateProgramReport = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bonusData, setBonusData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "dateTime",
    direction: "desc",
  });
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("report"); // "report" or "summary"
  const [summarySortConfig, setSummarySortConfig] = useState({
    key: "totalBonuses",
    direction: "desc",
  });
  const [summaryCurrentPage, setSummaryCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // Table columns definition for reports
  const reportColumns = [
    { key: "id", label: "Sr. No", sortable: true },
    { key: "dateTime", label: "Date & Time", sortable: true },
    { key: "particular", label: "Particular", sortable: true },
    { 
      key: "referrerName", 
      label: "Referrer", 
      sortable: true,
      render: (row) => (
        <span className="font-medium">
          {row.referrerName} <span className="text-xs text-gray-500">({row.referrerId})</span>
        </span>
      )
    },
    { 
      key: "inviteeName", 
      label: "Invitee", 
      sortable: true,
      render: (row) => (
        <span className="font-medium">
          {row.inviteeName} <span className="text-xs text-gray-500">({row.inviteeId})</span>
        </span>
      )
    },
  
    {
      key: "packageAmount",
      label: "Amount",
      sortable: true,
      render: (row) => (
        <span className="font-medium text-blue-600">
          ${row.packageAmount.toFixed(2)}
        </span>
      ),
    },
    {
      key: "bonusAmount",
      label: "Bonus Amount (20%)",
      sortable: true,
      render: (row) => (
        <span className="font-medium text-green-600">
          ${row.bonusAmount.toFixed(2)}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (row) => (
        <span
          className={`px-2 py-[2px] rounded-full text-xs ${
            row.status === "Paid"
              ? "bg-green-100 text-green-800"
              : row.status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  // Table columns definition for summary
  const summaryColumns = [
    { key: "id", label: "Sr. No", sortable: true },
    {
      key: "referrerName",
      label: "Referrer",
      sortable: true,
      render: (row) => (
        <span className="font-medium">
          {row.referrerName} <span className="text-xs text-gray-500">({row.referrerId})</span>
        </span>
      ),
    },
    {
      key: "totalInvitees",
      label: "Total Invitees",
      sortable: true,
      render: (row) => (
        <span className="font-medium text-blue-600">{row.totalInvitees}</span>
      ),
    },
    {
      key: "totalBonuses",
      label: "Total Bonuses",
      sortable: true,
      render: (row) => (
        <span className="font-medium text-green-600">${row.totalBonuses.toFixed(2)}</span>
      ),
    },
   
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (row) => (
        <span
          className={`px-2 py-[2px] rounded-full text-xs ${
            row.status === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  // Load data on component mount
  useEffect(() => {
    setBonusData(dummyInvitationBonuses);
  }, []);

  // Sorting function
  const sortData = (data, sortConfig) => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  // Filtering function for reports
  const filteredData = useMemo(() => {
    return bonusData.filter((item) => {
      // Search term filter
      const matchesSearch = Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Status filter
      const matchesStatus =
        statusFilter === "all" ||
        item.status.toLowerCase() === statusFilter.toLowerCase();

      // Date filter
      const bonusDate = new Date(item.dateTime);
      const matchesDate =
        !dateRange?.from ||
        (bonusDate >= dateRange.from &&
          (!dateRange.to || bonusDate <= dateRange.to));

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [bonusData, searchTerm, statusFilter, dateRange]);

  // Filtering function for summary
  const filteredSummaryData = useMemo(() => {
    return summaryData.filter((item) => {
      return Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm]);

  // Pagination for reports
  const paginatedData = useMemo(() => {
    const sortedData = sortData(filteredData, sortConfig);
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, sortConfig]);

  // Pagination for summary
  const paginatedSummaryData = useMemo(() => {
    const sortedData = sortData(filteredSummaryData, summarySortConfig);
    const startIndex = (summaryCurrentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredSummaryData, summaryCurrentPage, summarySortConfig]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const totalSummaryPages = Math.ceil(filteredSummaryData.length / itemsPerPage);

  const handleSort = (key) => {
    if (activeTab === "report") {
      setSortConfig((prevSort) => ({
        key,
        direction:
          prevSort.key === key && prevSort.direction === "asc" ? "desc" : "asc",
      }));
    } else {
      setSummarySortConfig((prevSort) => ({
        key,
        direction:
          prevSort.key === key && prevSort.direction === "asc" ? "desc" : "asc",
      }));
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDateRange({ from: null, to: null });
  };

  // Handle individual row selection
  const handleRowSelect = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
    setSelectAll(newSelected.size === (activeTab === "report" ? paginatedData.length : paginatedSummaryData.length));
  };

  // Handle select all for current page
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
    } else {
      const newSelected = new Set(
        activeTab === "report"
          ? paginatedData.map((row) => row.id)
          : paginatedSummaryData.map((row) => row.id)
      );
      setSelectedRows(newSelected);
    }
    setSelectAll(!selectAll);
  };

  // Export functions
  const handleBulkExport = (exportType) => {
    const data = activeTab === "report" ? filteredData : filteredSummaryData;
    const selectedData = data.filter((row) => selectedRows.has(row.id));
    const dataToExport = selectedRows.size > 0 ? selectedData : data;
    const fileName = activeTab === "report" ? "invitation_bonuses" : "invitation_summary";

    switch (exportType) {
      case "copy":
        copyToClipboard(dataToExport);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        break;
      case "csv":
        exportToCSV(dataToExport, `${fileName}.csv`);
        break;
      case "excel":
        exportToExcel(dataToExport, `${fileName}.xlsx`);
        break;
      case "pdf":
        exportToPDF(dataToExport, `${fileName}.pdf`);
        break;
      default:
        break;
    }
  };

  // Stats data
  const stats = useMemo(() => {
    const totalBonuses = filteredData.length;
    const paidBonuses = filteredData.filter(
      (bonus) => bonus.status === "Paid"
    ).length;
    const pendingBonuses = filteredData.filter(
      (bonus) => bonus.status === "Pending"
    ).length;

    const totalPackageAmount = filteredData.reduce(
      (sum, item) => sum + item.packageAmount,
      0
    );
    const totalBonusAmount = filteredData.reduce(
      (sum, item) => sum + item.bonusAmount,
      0
    );

    const totalReferrers = new Set(filteredData.map(item => item.referrerId)).size;
    const totalInvitees = new Set(filteredData.map(item => item.inviteeId)).size;

    return {
      totalBonuses,
      paidBonuses,
      pendingBonuses,
      totalPackageAmount,
      totalBonusAmount,
      totalReferrers,
      totalInvitees
    };
  }, [filteredData]);

  // Export buttons section
  const ExportSection = () => (
    <div className="flex items-center gap-4">
      <div className="flex gap-2">
        <ExportButton
          label={
            <div className="flex items-center gap-1">
              <span>Copy</span>
              {selectedRows.size > 0 && (
                <span className="text-xs">({selectedRows.size})</span>
              )}
            </div>
          }
          bgColor="bg-blue-500"
          shadow="shadow-md shadow-blue-600"
          onClick={() => handleBulkExport("copy")}
        />
        <ExportButton
          label={
            <div className="flex items-center gap-1">
              <span>CSV</span>
              {selectedRows.size > 0 && (
                <span className="text-xs">({selectedRows.size})</span>
              )}
            </div>
          }
          bgColor="bg-red-500"
          shadow="shadow-md shadow-red-600"
          onClick={() => handleBulkExport("csv")}
        />
        <ExportButton
          label={
            <div className="flex items-center gap-1">
              <span>Excel</span>
              {selectedRows.size > 0 && (
                <span className="text-xs">({selectedRows.size})</span>
              )}
            </div>
          }
          bgColor="bg-yellow-500"
          shadow="shadow-md shadow-yellow-600"
          onClick={() => handleBulkExport("excel")}
        />
        <ExportButton
          label={
            <div className="flex items-center gap-1">
              <span>PDF</span>
              {selectedRows.size > 0 && (
                <span className="text-xs">({selectedRows.size})</span>
              )}
            </div>
          }
          bgColor="bg-green-500"
          shadow="shadow-md shadow-green-600"
          onClick={() => handleBulkExport("pdf")}
        />
      </div>
    </div>
  );

  // Tab switcher
  const TabSwitcher = () => (
    <div className="flex mb-3 sm:mb-4 border-b border-gray-200 dark:border-gray-700">
      <button
        className={`py-2 px-4 text-sm font-medium ${
          activeTab === "report"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => setActiveTab("report")}
      >
        Report
      </button>
      <button
        className={`py-2 px-4 text-sm font-medium ${
          activeTab === "summary"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => setActiveTab("summary")}
      >
        Summary
      </button>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow p-4 sm:p-6">
          <div className="max-w-full mx-auto">
            {/* Stats Cards */}
            <div className="max-w-full px-2 py-[6px] sm:py-0 rounded-xl grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-1 mb-3 sm:mb-6 bg-white dark:bg-gray-800 shadow-lg">
              <StatsCard
                title="Total Entries"
                value={stats.totalBonuses}
                textColor="text-blue-600"
              />
              <StatsCard
                title="Paid"
                value={stats.paidBonuses}
                textColor="text-green-600"
              />
              <StatsCard
                title="Pending"
                value={stats.pendingBonuses}
                textColor="text-yellow-600"
              />
              <StatsCard
                title="Total Referrers"
                value={stats.totalReferrers}
                textColor="text-purple-600"
              />
              <StatsCard
                title="Total Invitees"
                value={stats.totalInvitees}
                textColor="text-indigo-600"
              />
              <StatsCard
                title="Total Amount"
                value={`$${stats.totalPackageAmount.toFixed(2)}`}
                textColor="text-blue-600"
              />
              <StatsCard
                title=" Bonus Amount"
                value={`$${stats.totalBonusAmount.toFixed(2)}`}
                textColor="text-green-600"
              />
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg px-3 sm:px-4 py-3 sm:py-6">
              {/* Header Section */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 border-b border-gray-200 dark:border-gray-700 pb-4">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white tracking-wide sm:tracking-wider">
                Affiliate Program - ROI Based
                </h2>
                {/* Export Buttons */}
                <ExportSection />
              </div>

              {/* Tab Switcher */}
              <TabSwitcher />

              {/* Date Filter  */}
              {activeTab === "report" && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg px-0 sm:px-4 sm:py-4 mb-4 sm:mb-6">
                  <div className="flex flex-col space-y-2">
                    {/* Filter Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 sm:w-5 h-4 sm:h-5 text-blue-500" />
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">
                          Date Filter
                        </h3>
                      </div>
                      <button
                        onClick={resetFilters}
                        className="flex items-center text-[red] gap-1 px-3 py-1 text-xs hover:text-gray-900 dark:hover:text-gray-100 transition-colors cursor-pointer"
                      >
                        <IoRemoveCircle className="w-4 h-4" />
                        Clear Filters
                      </button>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-900 rounded-lg shadow-sm p-2 sm:p-4">
                      <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                          Transaction Date
                        </span>
                      </div>
                      <DatePickerWithRange
                        date={dateRange}
                        onDateChange={setDateRange}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Filters */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 pb-3 sm:pb-6">
                <div className={`flex-1 sm:col-span-2 sm:min-w-[200px] ${activeTab === "summary" ? " col-span-2 min-w-[200px] mt-4" : ""}`}>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={
                        activeTab === "report"
                          ? "Search here..."
                          : "Search by referrer name, ID, level..."
                      }
                      className="w-full px-3 sm:px-4 py-1 text-sm border rounded-lg focus:ring focus:ring-blue-500 bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute right-3 top-2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {activeTab === "report" && (
                  <select
                    className="px-4 py-1 text-xs sm:text-sm border rounded-lg focus:ring focus:ring-blue-500 bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                   
                  </select>
                )}
              </div>

              {/* Table */}
              {activeTab === "report" ? (
                <>
                  <OverallCommonTable
                    data={paginatedData}
                    columns={reportColumns}
                    selectedRows={selectedRows}
                    onRowSelect={handleRowSelect}
                    selectAll={selectAll}
                    onSelectAll={handleSelectAll}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                  />

                  {/* Pagination */}
                  <div className="py-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                        {Math.min(currentPage * itemsPerPage, filteredData.length)}{" "}
                        of {filteredData.length} entries
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          disabled={currentPage === 1}
                          className="px-2 sm:px-4 py-1 text-xs sm:text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          Previous
                        </button>
                        <button
                          onClick={() =>
                            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                          }
                          disabled={currentPage === totalPages || totalPages === 0}
                          className="px-2 sm:px-4 py-1 text-xs sm:text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <OverallCommonTable
                    data={paginatedSummaryData}
                    columns={summaryColumns}
                    selectedRows={selectedRows}
                    onRowSelect={handleRowSelect}
                    selectAll={selectAll}
                    onSelectAll={handleSelectAll}
                    sortConfig={summarySortConfig}
                    onSort={handleSort}
                  />

                {/* Pagination for Summary */}
                <div className="py-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Showing {(summaryCurrentPage - 1) * itemsPerPage + 1} to{" "}
                            {Math.min(summaryCurrentPage * itemsPerPage, filteredSummaryData.length)}{" "}
                            of {filteredSummaryData.length} entries
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                setSummaryCurrentPage((prev) => Math.max(prev - 1, 1))
                              }
                              disabled={summaryCurrentPage === 1}
                              className="px-2 sm:px-4 py-1 text-xs sm:text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                              Previous
                            </button>
                            <button
                              onClick={() =>
                                setSummaryCurrentPage((prev) => Math.min(prev + 1, totalSummaryPages))
                              }
                              disabled={summaryCurrentPage === totalSummaryPages || totalSummaryPages === 0}
                              className="px-2 sm:px-4 py-1 text-xs sm:text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </main>
          </div>
          
          {/* Copy Success Notification */}
          {isCopied && (
            <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Copied to clipboard!</span>
            </div>
          )}
        </div>
      );
    };
    
    export default AffiliateProgramReport;