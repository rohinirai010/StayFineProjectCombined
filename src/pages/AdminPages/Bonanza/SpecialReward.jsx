import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  CalendarIcon,
} from "lucide-react";
import { IoRemoveCircle } from "react-icons/io5";
import { FaCopy } from "react-icons/fa";
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

// Dummy data for deposit bonuses
const dummyDepositBonuses = [
  {
    id: 1,
    dateTime: "2024-03-15 09:30:45",
    particular: "First Deposit by John Doe",
    depositAmount: 1000,
    bonusAmount: 250,
    status: "Paid",
    memberId: "M001",
    memberName: "John Doe",
    packageName: "Starter Package",
  },
  {
    id: 2,
    dateTime: "2024-03-14 14:22:31",
    particular: "First Deposit by Jane Smith",
    depositAmount: 2000,
    bonusAmount: 500,
    status: "Pending",
    memberId: "M002",
    memberName: "Jane Smith",
    packageName: "Silver Package",
  },
  {
    id: 3,
    dateTime: "2024-03-13 11:15:05",
    particular: "First Deposit by Mike Johnson",
    depositAmount: 5000,
    bonusAmount: 1250,
    status: "Paid",
    memberId: "M003",
    memberName: "Mike Johnson",
    packageName: "Gold Package",
  },
  {
    id: 4,
    dateTime: "2024-03-12 16:48:22",
    particular: "First Deposit by Sara Wilson",
    depositAmount: 3000,
    bonusAmount: 750,
    status: "Paid",
    memberId: "M004",
    memberName: "Sara Wilson",
    packageName: "Silver Package",
  },
  {
    id: 5,
    dateTime: "2024-03-11 10:05:18",
    particular: "First Deposit by Robert Brown",
    depositAmount: 10000,
    bonusAmount: 2500,
    status: "Paid",
    memberId: "M005",
    memberName: "Robert Brown",
    packageName: "Platinum Package",
  },
  {
    id: 6,
    dateTime: "2024-03-10 13:27:44",
    particular: "First Deposit by Emily Davis",
    depositAmount: 1500,
    bonusAmount: 375,
    status: "Paid",
    memberId: "M006",
    memberName: "Emily Davis",
    packageName: "Starter Package",
  },
  {
    id: 7,
    dateTime: "2024-03-09 08:54:21",
    particular: "First Deposit by David Miller",
    depositAmount: 7500,
    bonusAmount: 1875,
    status: "Pending",
    memberId: "M007",
    memberName: "David Miller",
    packageName: "Gold Package",
  },
];

const StatsCard = ({ title, value, textColor = "text-black", icon: Icon }) => (
  <div className="sm:px-2 py-2 flex flex-col items-center sm:items-start justify-center gap-1 transform transition-all duration-300">
    <h3
      className={`text-sm sm:text-base font-medium text-center tracking-wide ${textColor}`}
    >
      {title}
    </h3>
    <p className="text-xl font-bold text-center">{value}</p>
  </div>
);

const ExportButton = ({ label, bgColor, shadow, onClick }) => (
  <button
    className={`${bgColor} ${shadow} text-white px-4 py-1 text-xs sm:text-sm rounded-lg hover:opacity-90 cursor-pointer`}
    onClick={onClick}
  >
    {label}
  </button>
);

const SpecialReward = () => {
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

  const itemsPerPage = 5;

  // Table columns definition
  const columns = [
    { key: "id", label: "Sr. No", sortable: true },
    { key: "dateTime", label: "Date & Time", sortable: true },
    { key: "particular", label: "Particular", sortable: true },
    {
      key: "depositAmount",
      label: "Deposit Amount",
      sortable: true,
      render: (row) => (
        <span className="font-medium text-blue-600">
          ${row.depositAmount.toFixed(2)}
        </span>
      ),
    },
    {
      key: "bonusAmount",
      label: "Bonus Amount",
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

  // Load data on component mount
  useEffect(() => {
    setBonusData(dummyDepositBonuses);
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

  // Filtering function
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

  // Pagination
  const paginatedData = useMemo(() => {
    const sortedData = sortData(filteredData, sortConfig);
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig((prevSort) => ({
      key,
      direction:
        prevSort.key === key && prevSort.direction === "asc" ? "desc" : "asc",
    }));
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
    setSelectAll(newSelected.size === paginatedData.length);
  };

  // Handle select all for current page
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
    } else {
      const newSelected = new Set(paginatedData.map((row) => row.id));
      setSelectedRows(newSelected);
    }
    setSelectAll(!selectAll);
  };

  // Export functions
  const handleBulkExport = (exportType) => {
    const selectedData = filteredData.filter((row) => selectedRows.has(row.id));
    const dataToExport = selectedRows.size > 0 ? selectedData : filteredData;

    switch (exportType) {
      case "copy":
        copyToClipboard(dataToExport);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        break;
      case "csv":
        exportToCSV(dataToExport, "deposit_bonuses.csv");
        break;
      case "excel":
        exportToExcel(dataToExport, "deposit_bonuses.xlsx");
        break;
      case "pdf":
        exportToPDF(dataToExport, "deposit_bonuses.pdf");
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

    const totalDepositAmount = filteredData.reduce(
      (sum, item) => sum + item.depositAmount,
      0
    );
    const totalBonusAmount = filteredData.reduce(
      (sum, item) => sum + item.bonusAmount,
      0
    );

    return {
      totalBonuses,
      paidBonuses,
      pendingBonuses,

      totalDepositAmount,
      totalBonusAmount,
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

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow p-4 sm:p-6">
          <div className="max-w-full mx-auto">
            {/* Stats Cards */}
            <div className="max-w-full px-2 rounded-xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1 mb-6 bg-white dark:bg-gray-800 shadow-lg">
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
                title="Total Deposits"
                value={`$${stats.totalDepositAmount.toFixed(2)}`}
                textColor="text-purple-600"
              />
              <StatsCard
                title="Total Bonuses"
                value={`$${stats.totalBonusAmount.toFixed(2)}`}
                textColor="text-indigo-600"
              />
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg px-3 sm:px-4 py-6">
              {/* Header Section */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 border-b border-gray-200 dark:border-gray-700 pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                  Special Reward - (every month)
                </h2>
                {/* Export Buttons */}
                <ExportSection />
              </div>

              {/* Copied Message */}
              {isCopied && (
                <div className="absolute right-[15rem] flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
                  Copied! <FaCopy />
                </div>
              )}

              {/* Date Filter */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg px-0 sm:px-4 py-4 mb-6">
                <div className="flex flex-col space-y-2">
                  {/* Filter Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5 text-blue-500" />
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

                  <div className="bg-gray-100 dark:bg-gray-900 rounded-lg shadow-sm p-4">
                    <div className="flex items-center gap-2 mb-3">
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

              {/* Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6">
                <div className="flex-1 sm:col-span-2 min-w-[200px]">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by member name, ID, package..."
                      className="w-full px-4 py-1 text-sm border rounded-lg focus:ring focus:ring-blue-500 bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute right-3 top-2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <select
                  className="px-4 py-1 text-xs sm:text-sm border rounded-lg focus:ring focus:ring-blue-500 bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                
                </select>
              </div>

              {/* Table */}
              <OverallCommonTable
                data={paginatedData}
                columns={columns}
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
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SpecialReward;
