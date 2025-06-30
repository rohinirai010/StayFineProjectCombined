import React, { useState, useMemo } from "react";
import {
  Search,
  Users,
  CheckCircle,
  Clock,
  RotateCcw,
  Calendar,
  Info
} from "lucide-react";
import { IoRemoveCircle } from "react-icons/io5";
import { FaCopy } from "react-icons/fa";
import DatePickerWithRange from "../../../components/Datepicker";
import OverallCommonTable from "../../../components/OverallCommonTable";
import ConfirmationDialog from "../../../components/ConfirmationDialog";
import {
  copyToClipboard,
  exportToCSV,
  exportToExcel,
  exportToPDF,
} from "../../../utils/Utils";
import Header from "../../../partials/AdminPartials/Header";
import Sidebar from "../../../partials/AdminPartials/Sidebar";

const StatsCard = ({ title, value, textColor = "text-black", icon: Icon }) => (
  <div className="bg-white dark:bg-gray-800 p-2 sm:p-4 rounded-xl shadow-lg  flex flex-col items-center sm:items-start justify-center gap-1 transform transition-all duration-300">
    <h3 className={`text-sm sm:text-base font-medium text-center tracking-wide ${textColor}`}>
      {title}
    </h3>
    <p className="text-lg sm:text-2xl font-bold text-center">{value}</p>
  </div>
);


const ExportButton = ({ label, bgColor, shadow, onClick }) => (
  <button
    className={`${bgColor} ${shadow} text-white px-2 sm:px-4 py-1 text-xs sm:text-sm rounded-lg hover:opacity-90 cursor-pointer`}
    onClick={onClick}
  >
    {label}
  </button>
);

const WithdrawalHistory = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    actionType: "",
    memberData: null,
    onConfirm: () => {},
  });

  const itemsPerPage = 10;


  // Sample withdrawal data
  const [data, setData] = useState([
    {
      id: 1,
      srNo: 1,
      username: "john123",
      fullname: "John Doe",
      withdrawalMethod: "Bank Transfer",
      amount: "5000.00",
      adminDeduction: "500.00",
      withdrawalAmount: "4500.00",
      accountDetails: "XXXX-XXXX-1234",
      status: "Pending",
      requestDate: "2024-02-15 10:30:00",
      approvedDate: "",
      rejectDate: "",
      remark: ""
    },
    {
      id: 2,
      srNo: 2,
      username: "jane123",
      fullname: "Jane Smith",
      withdrawalMethod: "USDT",
      amount: "10000.00",
      adminDeduction: "1000.00",
      withdrawalAmount: "9000.00",
      accountDetails: "0x1234...5678",
      status: "Approved",
      requestDate: "2024-02-14 15:45:00",
      approvedDate: "2024-02-15 09:20:00",
      rejectDate: "",
      remark: ""
    }
  ]);



  // Stats calculation
  const stats = useMemo(() => ({
    totalRequests: data.length,
    approved: data.filter((item) => item.status === "Approved").length,
    pending: data.filter((item) => item.status === "Pending").length,
    rejected: data.filter((item) => item.status === "Rejected").length,
    totalPaidAmount: data
      .filter((item) => item.status === "Approved")
      .reduce((sum, item) => sum + parseFloat(item.withdrawalAmount), 0)
      .toFixed(2),
    totalPendingAmount: data
      .filter((item) => item.status === "Pending")
      .reduce((sum, item) => sum + parseFloat(item.withdrawalAmount), 0)
      .toFixed(2)
  }), [data]);

  const columns = [
    { key: "srNo", label: "Sr No" },
    { key: "username", label: "Username" },
    { key: "fullname", label: "Full Name" },
    { key: "withdrawalMethod", label: "Withdrawal Method" },
    { key: "amount", label: "Amount" },
    { key: "adminDeduction", label: "10% Admin Deduction" },
    { key: "withdrawalAmount", label: "Withdrawal Amount" },
    { key: "accountDetails", label: "Withdrawal Address" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <div className="flex justify-center">
          <span
            className={`px-2 py-[2px] rounded-full text-[11px] ${
              row.status === "Approved"
                ? "bg-green-100 text-green-800"
                : row.status === "Rejected"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {row.status}
          </span>
        </div>
      ),
    },
    { key: "requestDate", label: "Request Date" },
    { 
      key: "approvedDate", 
      label: "Approved Date",
      render: (row) => (
        <div className="flex justify-center items-center">
          {row.status === "Approved" ? (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-green-500" />
              <span>{row.approvedDate}</span>
            </div>
          ) : (
            "-"
          )}
        </div>
      )
    },
    { 
      key: "action",
      label: "Action",
      render: (row) => (
        <div className="flex justify-center gap-2">
          {row.status === "Pending" && (
            <>
              <button 
                onClick={() => handleStatusUpdateClick(row, "Approved")}
                className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Approve
              </button>
              <button 
                onClick={() => handleStatusUpdateClick(row, "Rejected")}
                className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Reject
              </button>
            </>
          )}
          {row.status === "Rejected" && (
            <button 
              onClick={() => handleStatusUpdateClick(row, "Approved")}
              className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reapprove
            </button>
          )}
          {row.status === "Approved" && (
            <button 
              onClick={() => showTransactionDetails(row)}
              className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors flex items-center gap-1"
            >
              <Info className="w-3 h-3" />
              View Details
            </button>
          )}
        </div>
      )
    }
  ];

  const handleStatusUpdateClick = (row, newStatus) => {
    let dialogData = {
      isOpen: true,
      memberData: {
        memberId: row.id,
        fullname: row.fullname
      },
      onConfirm: () => {
        handleStatusUpdate(row.id, newStatus);
        setDialogConfig(prev => ({ ...prev, isOpen: false }));
      }
    };

    if (newStatus === "Rejected") {
      dialogData = {
        ...dialogData,
        title: "Confirm Rejection",
        message: "Are you sure you want to reject this withdrawal request?",
        actionType: "block"
      };
    } else if (newStatus === "Approved") {
      dialogData = {
        ...dialogData,
        title: row.status === "Rejected" ? "Confirm Reapproval" : "Confirm Approval",
        message: `Are you sure you want to ${row.status === "Rejected" ? "reapprove" : "approve"} this withdrawal request?`,
        actionType: "unblock"
      };
    }

    setDialogConfig(dialogData);
  };

  const handleStatusUpdate = (id, newStatus) => {
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    setData(prevData =>
      prevData.map(item => {
        if (item.id === id) {
          return {
            ...item,
            status: newStatus,
            approvedDate: newStatus === 'Approved' ? now : '',
            rejectDate: newStatus === 'Rejected' ? now : '',
          };
        }
        return item;
      })
    );
  };

  // Add this after handleStatusUpdate function:

const showTransactionDetails = (row) => {
  setDialogConfig({
    isOpen: true,
    title: "Transaction Details",
    message: "Review the withdrawal transaction details below.",
    actionType: "login",
    memberData: {
      memberId: row.id,
      fullname: row.fullname,
      // Add additional details to display
      extraDetails: [
        { label: "Withdrawal Method", value: row.withdrawalMethod },
        { label: "Amount", value: `$${row.amount}` },
        { label: "Admin Deduction", value: `$${row.adminDeduction}` },
        { label: "Final Amount", value: `$${row.withdrawalAmount}` },
        { label: "Account Details", value: row.accountDetails },
        { label: "Request Date", value: row.requestDate },
        { label: "Approved Date", value: row.approvedDate || "N/A" },
        { label: "Status", value: row.status }
      ]
    }
  });
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
        exportToCSV(dataToExport, "withdrawal_history.csv");
        break;
      case "excel":
        exportToExcel(dataToExport, "withdrawal_history.xlsx");
        break;
      case "pdf":
        exportToPDF(dataToExport, "withdrawal_history.pdf");
        break;
      default:
        break;
    }
  };

  // Filtering logic
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );

      const matchesStatus =
        statusFilter === "all" ||
        item.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesDateRange =
        (!dateRange.from || new Date(item.requestDate) >= dateRange.from) &&
        (!dateRange.to || new Date(item.requestDate) <= dateRange.to);

      return matchesSearch && matchesStatus && matchesDateRange;
    });
  }, [data, searchTerm, statusFilter, dateRange]);

  // Pagination logic
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDateRange({ from: null, to: null });
    setSelectedRows(new Set());
    setSelectAll(false);
  };

  const handleSort = (key) => {
    setSortConfig((prevSort) => ({
      key,
      direction:
        prevSort.key === key && prevSort.direction === "asc" ? "desc" : "asc",
    }));
  };


  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow p-4 sm:p-6">
          <div className="max-w-full mx-auto">
            {/* Stats Cards */}
            <div className="max-w-full sm:max-w-sm px-2 rounded-xl grid grid-cols-2 mb-3  sm:mb-6 bg-white dark:bg-gray-800 shadow-lg">

                <StatsCard
                  title="Paid"
                  value={`$${stats.totalPaidAmount}`}
                  textColor="text-green-600"
                  icon={CheckCircle}
                />
             
              
                <StatsCard
                  title="Pending"
                  value={`$${stats.totalPendingAmount}`}
                  textColor="text-yellow-600"
                  icon={Clock}
                />
           
                {/* <StatsCard
                  title="Total Requests"
                  value={stats.totalRequests}
                  textColor="text-blue-600"
                  icon={Users}
                /> */}
             
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg px-4 py-3 sm:py-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-[6px] sm:gap-2 sm:gap-0 border-b border-gray-200 dark:border-gray-700 pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                  Withdrawal History
                </h2>
                <div className="flex items-center gap-2">
                  <ExportButton
                    label="Copy"
                    bgColor="bg-blue-500"
                    shadow="shadow-md shadow-blue-600"
                    onClick={() => handleBulkExport("copy")}
                  />
                  <ExportButton
                    label="CSV"
                    bgColor="bg-red-500"
                    shadow="shadow-md shadow-red-600"
                    onClick={() => handleBulkExport("csv")}
                  />
                  <ExportButton
                    label="Excel"
                    bgColor="bg-yellow-500"
                    shadow="shadow-md shadow-yellow-600"
                    onClick={() => handleBulkExport("excel")}
                  />
                  <ExportButton
                    label="PDF"
                    bgColor="bg-green-500"
                    shadow="shadow-md shadow-green-600"
                    onClick={() => handleBulkExport("pdf")}
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg sm:p-4 mb-3 sm:mb-6">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center justify-end">
                    <button
                      onClick={resetFilters}
                      className="flex items-center gap-1 px-3 py-1 text-xs text-[red] hover:text-gray-900 dark:hover:text-gray-100 transition-colors cursor-pointer"
                    >
                      <IoRemoveCircle className="w-4 h-4" />
                      Clear Filters
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2 w-full bg-gray-100 dark:bg-gray-900 rounded-lg shadow-sm p-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                          Request Period
                        </span>
                      </div>
                      <DatePickerWithRange
                        date={dateRange}
                        onDateChange={setDateRange}
                      />
                    </div>

                    <div className="flex flex-col justify-end">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search..."
                          className="w-full px-4 py-2 text-sm border rounded-lg focus:ring focus:ring-blue-500 bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                      </div>
                    </div>

                    <div className="flex flex-col justify-end">
                      <select
                        className="px-4 py-2 text-sm border rounded-lg focus:ring focus:ring-blue-500 bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="all">All Status</option>
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table */}
              <OverallCommonTable
                data={paginatedData}
                columns={columns}
                selectedRows={selectedRows}
                onRowSelect={(id) => {
                  const newSelected = new Set(selectedRows);
                  if (newSelected.has(id)) {
                    newSelected.delete(id);
                  } else {
                    newSelected.add(id);
                  }
                  setSelectedRows(newSelected);
                }}
                selectAll={selectAll}
                onSelectAll={() => {
                  if (selectAll) {
                    setSelectedRows(new Set());
                  } else {
                    setSelectedRows(new Set(paginatedData.map((row) => row.id)));
                  }
                  setSelectAll(!selectAll);
                }}
                sortConfig={sortConfig}
                onSort={handleSort}
              />

              {/* Copied Message */}
              {isCopied && (
                <div className="absolute right-[15rem] flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
                  Copied! <FaCopy />
                </div>
              )}

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4 border-t border-gray-200 pt-4">
                <span className="text-xs sm:text-sm text-gray-600">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
                  {filteredData.length} entries
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-2 sm:px-4 py-1 sm:py-2 text-xs  sm:text-sm border rounded-lg disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-2 sm:px-4 py-1 sm:py-2 text-xs  sm:text-sm border rounded-lg disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

             {/* ConfirmationDialog */}
      <ConfirmationDialog
        isOpen={dialogConfig.isOpen}
        onClose={() => setDialogConfig(prev => ({ ...prev, isOpen: false }))}
        onConfirm={dialogConfig.onConfirm}
        title={dialogConfig.title}
        message={dialogConfig.message}
        actionType={dialogConfig.actionType}
        memberData={dialogConfig.memberData}
      />
          </div>
        </main>
      </div>
    </div>
  );
};

export default WithdrawalHistory;