import React, { useState, useMemo, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Users,
  User,
  Edit,
  Check,
  CalendarIcon,
  Filter,
} from "lucide-react";
import Header from "../../../partials/AdminPartials/Header";
import Sidebar from "../../../partials/AdminPartials/Sidebar";
import { IoRemoveCircle } from "react-icons/io5";
import { FaCopy } from "react-icons/fa";
import {
  copyToClipboard,
  exportToCSV,
  exportToExcel,
  exportToPDF,
} from "../../../utils/Utils";
import data from "../../../utils/DummyData";
import EditMemberInfo from "./EditMemberInfo";
import "../../../css/additional.css";
import ConfirmationDialog from "../../../components/ConfirmationDialog";
import CommonTable from "../../../components/CommonTable";
import DatePickerWithRange from "../../../components/Datepicker";

const StatsCard = ({ title, value, textColor = "text-black", icon: Icon }) => (
  <div className="p-2 flex flex-col items-center sm:items-start justify-center gap-1 transform transition-all duration-300">
    <h3
      className={`text-[15px] sm:text-base font-medium text-center tracking-wide ${textColor} `}
    >
      {title}
    </h3>
    <p className="text-xl sm:text-2xl font-bold text-center">{value}</p>
  </div>
);

const ExportButton = ({ label, bgColor, shadow, onClick }) => (
  <button
    className={`${bgColor} ${shadow} text-white px-2 sm:px-4 py-1 text-[13px] sm:text-sm rounded-lg hover:opacity-90 cursor-pointer`}
    onClick={onClick}
  >
    {label}
  </button>
);

const MembersList = () => {
  const [membersData, setMembersData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [registrationDateRange, setRegistrationDateRange] = React.useState({
    from: null,
    to: null
  });
  
  const [activationDateRange, setActivationDateRange] = React.useState({
    from: null,
    to: null
  });
  const [activeFilter, setActiveFilter] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [memberStatus, setMemberStatus] = useState({}); // for block/unblock status
  const [pinStatus, setPinStatus] = useState({}); // for pin status
  const [levelStatus, setLevelStatus] = useState({}); // for level manual status
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [lastEdited, setLastEdited] = useState({});
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    actionType: null,
    memberData: null,
    currentStatus: false,
    onConfirm: null,
  });
  const itemsPerPage = 5;


  useEffect(() => {
    setMembersData(data);
  }, []);

  useEffect(() => {
    setMembersData(data);
    const initialMemberStatus = {};
    const initialPinStatus = {};
    const initialLevelStatus = {};

    data.forEach((row) => {
      initialMemberStatus[row.id] = row.userStatus === "Active";
      initialPinStatus[row.id] = row.pinStatus === "ON";
      initialLevelStatus[row.id] = row.levelManual === "Level ON";
    });

    setMemberStatus(initialMemberStatus);
    setPinStatus(initialPinStatus);
    setLevelStatus(initialLevelStatus);
  }, []);

  const handleBlockToggle = (member) => {
    const isActive = memberStatus[member.id];
    setConfirmDialog({
      isOpen: true,
      actionType: "block",
      memberData: member,
      currentStatus: isActive,
      title: isActive ? "Confirm Block" : "Confirm Unblock",
      message: `Are you sure you want to ${
        isActive ? "block" : "unblock"
      } this member?`,
      onConfirm: () => {
        setMemberStatus((prev) => ({
          ...prev,
          [member.id]: !prev[member.id],
        }));
        setConfirmDialog({ isOpen: false });
      },
    });
  };

  const handlePinToggle = (member) => {
    const isPinEnabled = pinStatus[member.id];
    setConfirmDialog({
      isOpen: true,
      actionType: "pin",
      memberData: member,
      currentStatus: isPinEnabled,
      title: "Confirm Pin Status Change",
      message: `Are you sure you want to ${
        isPinEnabled ? "disable" : "enable"
      } pin for this member?`,
      onConfirm: () => {
        setPinStatus((prev) => ({
          ...prev,
          [member.id]: !prev[member.id],
        }));
        setConfirmDialog({ isOpen: false });
      },
    });
  };

  const handleLevelToggle = (member) => {
    const isLevelEnabled = levelStatus[member.id];
    setConfirmDialog({
      isOpen: true,
      actionType: "level",
      memberData: member,
      currentStatus: isLevelEnabled,
      title: "Confirm Level Manual Change",
      message: `Are you sure you want to ${
        isLevelEnabled ? "disable" : "enable"
      } level manual for this member?`,
      onConfirm: () => {
        setLevelStatus((prev) => ({
          ...prev,
          [member.id]: !prev[member.id],
        }));
        setConfirmDialog({ isOpen: false });
      },
    });
  };

  const handleEditClick = (member) => {
    setSelectedMember(member);
    setEditModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalClosing(true);
    setTimeout(() => {
      setEditModalOpen(false);
      setSelectedMember(null);
      setIsModalClosing(false);
    }, 200); // Match this with animation duration
  };

  const handleSave = (updatedMember) => {
    setMembersData((prevData) =>
      prevData.map((member) =>
        member.id === updatedMember.id
          ? {
              ...member,
              ...updatedMember,
              // Ensuring all necessary fields are updated
              fullname: updatedMember.fullname,
              mobileNumber: updatedMember.mobileNumber,
              // other fields that need to be updated
            }
          : member
      )
    );

    // Updating last edited timestamp
    setLastEdited((prev) => ({
      ...prev,
      [updatedMember.id]: new Date().toLocaleString(),
    }));

    // Close the modal
    setEditModalOpen(false);
    setSelectedMember(null);

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Stats data
  const stats = useMemo(() => {
    const totalJoinings = membersData.length;
    const activeAccounts = membersData.filter(member => member.userStatus === "Active").length;
    const inactiveAccounts = totalJoinings - activeAccounts;
    
    return {
      totalJoinings,
      activeAccounts,
      inactiveAccounts
    };
  }, [membersData]);

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
  return membersData.filter((item) => {
    // Search term filter
    const matchesSearch = Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Status filter
    const matchesStatus =
      statusFilter === "all" ||
      item.userStatus.toLowerCase() === statusFilter.toLowerCase();

    // Registration date filter
    const registrationDate = new Date(item.registrationDate);
    const matchesRegDate =
      !registrationDateRange?.from || // safely access from
      (registrationDate >= registrationDateRange.from &&
        (!registrationDateRange.to || registrationDate <= registrationDateRange.to));

    // Activation date filter
    const activationDate = new Date(item.activationDate);
    const matchesActDate =
      !activationDateRange?.from || // safely access from
      (activationDate >= activationDateRange.from &&
        (!activationDateRange.to || activationDate <= activationDateRange.to));

    return matchesSearch && matchesStatus && matchesRegDate && matchesActDate;
  });
}, [
  membersData,
  searchTerm,
  statusFilter,
  registrationDateRange,
  activationDateRange,
]);
  
 
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

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column)
      return <ChevronDown className="w-4 h-4 opacity-20" />;
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setRegistrationDateRange({ from: null, to: null });
    setActivationDateRange({ from: null, to: null });
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
    // Update selectAll state if all visible rows are selected
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

  // export functions to handle selected rows
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
        exportToCSV(dataToExport, "members_list.csv");
        break;
      case "excel":
        exportToExcel(dataToExport, "members_list.xlsx");
        break;
      case "pdf":
        exportToPDF(dataToExport, "members_list.pdf");
        break;
      default:
        break;
    }
  };

  // Checkbox component for consistency
  const Checkbox = ({ checked, onChange, className = "" }) => (
    <div
      className={`w-4 h-4 border-2 rounded-md cursor-pointer flex items-center justify-center transition-colors ${
        checked
          ? "bg-green-600 border-green-700 shadow-sm shadow-green-400 dark:shadow-amber-100"
          : "bg-white border-gray-300 hover:border-blue-500"
      } ${className}`}
      onClick={onChange}
    >
      {checked && <Check className="w-3 h-3 text-white" />}
    </div>
  );

  //  export buttons section
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

  // Date Filters Component
  const DateFiltersComponent = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg sm:p-4 mb-3 sm:mb-6">
      <div className="flex flex-col space-y-2">
        {/* Filter Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-blue-500" />
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Date Filters
            </h3>
          </div>
          <button
            onClick={resetFilters}
            className="flex items-center text-[red] gap-1 px-3 py-1 text-xs hover:text-gray-900 dark:hover:text-gray-100 transition-colors cursor-pointer"
          >
            <IoRemoveCircle className="w-4 h-4 " />
            Clear Filters
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-2 sm:gap-6">
          {/* Registration Date Filter */}
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3 ">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                Registration Period
              </span>
            </div>
            <DatePickerWithRange
              date={registrationDateRange}
              onDateChange={setRegistrationDateRange}
            />
          </div>

          {/* Activation Date Filter */}
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                Activation Period
              </span>
            </div>
            <DatePickerWithRange
              date={activationDateRange}
              onDateChange={setActivationDateRange}
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Toggle mobile filters
  const toggleMobileFilters = () => {
    setShowMobileFilters(prev => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow p-4 sm:p-6">
          <div className="max-w-full mx-auto">
            {/* Stats Cards */}
            <div className="max-w-full sm:max-w-xs px-2 rounded-xl grid grid-cols-3 mb-6 bg-white dark:bg-gray-800 shadow-lg">
              <StatsCard
                title="Accounts"
                value={stats.totalJoinings}
                textColor="text-blue-600"
                icon={Users}
              />
              <StatsCard
                title="Active"
                value={stats.activeAccounts}
                textColor="text-green-600"
                icon={User}
              />
              <StatsCard
                title="Inactive"
                value={stats.inactiveAccounts}
                textColor="text-red-600"
                icon={IoRemoveCircle}
              />
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg px-4 py-6">
              {/* Header Section */}
              <div className="flex flex-row items-center justify-between gap-2 sm:gap-0 border-b border-gray-200 dark:border-gray-700 pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                  Members List
                </h2>

                 {/* Mobile filter toggle button */}
              <div className="md:hidden flex justify-end">
                <button 
                  className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-400 text-gray-900 rounded-lg shadow"
                  onClick={toggleMobileFilters}
                >
                  <Filter className="w-3 h-3" />
                  {showMobileFilters ? "Hide Filters" : "Show Filters"}
                </button>
              </div>

                {/* Export Buttons - Hidden on mobile, visible on larger screens */}
                <div className="hidden md:block">
                  <ExportSection />
                </div>
              </div>

              {/* Copied Message */}
              {isCopied && (
                <div className="absolute right-[15rem] flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
                  Copied! <FaCopy />
                </div>
              )}

              {/* Date Filters - Hidden on mobile, visible on larger screens */}
              <div className="hidden md:block">
                <DateFiltersComponent />
              </div>

             
              {/* Mobile filters dropdown */}
              {showMobileFilters && (
                <div className="md:hidden py-2  animate-fadeDown">
                  <DateFiltersComponent />
                  <div className="px-4 py-1 rounded-lg flex items-center justify-center">
                    <ExportSection />
                  </div>
                </div>
              )}

              {/* Filters */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-6 mt-4">
                <div className="flex-1 sm:col-span-2 sm:min-w-[200px]">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
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
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Table */}
              <CommonTable
                data={paginatedData}
                selectedRows={selectedRows}
                onRowSelect={handleRowSelect}
                selectAll={selectAll}
                onSelectAll={handleSelectAll}
                sortConfig={sortConfig}
                onSort={handleSort}
                memberStatus={memberStatus}
                pinStatus={pinStatus}
                levelStatus={levelStatus}
                onEditClick={handleEditClick}
                onBlockToggle={handleBlockToggle}
                onPinToggle={handlePinToggle}
                onLevelToggle={handleLevelToggle}
                lastEdited={lastEdited}
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
                      disabled={currentPage === totalPages}
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
        
        {/* Edit Modal */}
        {editModalOpen && selectedMember && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-200 ease-in-out 
            ${
              isModalClosing
                ? "bg-opacity-0 backdrop-blur-none"
                : "bg-opacity-50 backdrop-blur-sm"
            }
            bg-black/70`}
            onClick={handleModalClose}
          >
            <div
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl w-11/12 md:w-3/4 lg:w-1/2 p-4 h-[35rem] xl:h-[38rem] overflow-auto my-4 mx-4
              transform transition-all duration-200 ease-in-out
              ${isModalClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"}
              hover:shadow-2xl
              animate-modalEntry`}
              onClick={(e) => e.stopPropagation()}
              style={{
                "--tw-ring-color": "rgba(59, 130, 246, 0.5)",
                "--tw-ring-offset-width": "0px",
                "--tw-ring-offset-color": "#fff",
                "--tw-ring-width": "3px",
              }}
            >
              <div className="relative">
                <h2
                  className="text-xl font-bold mb-6 text-gray-800 dark:text-white
                transform transition-all duration-300 ease-out
                translate-y-0 opacity-100"
                >
                  Edit Member Information
                </h2>

                {/* Content wrapper with fade-in animation */}
                <div
                  className="transform transition-all duration-300 ease-out
                translate-y-0 opacity-100"
                >
                  <EditMemberInfo
                    member={selectedMember}
                    onSave={handleSave}
                    onClose={handleModalClose}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-4 right-10 z-40 w-80 rounded-lg border border-green-500 bg-green-50 p-4 dark:border-green-600 dark:bg-green-900">
            <div className="flex items-center">
              <Check className="h-6 w-6 text-green-500 dark:text-green-400" />
              <p className="ml-3 text-green-700 dark:text-green-300 text-sm">
                information updated successfully!
              </p>
            </div>
          </div>
        )}

        <ConfirmationDialog
          isOpen={confirmDialog.isOpen}
          onClose={() => setConfirmDialog({ isOpen: false })}
          onConfirm={confirmDialog.onConfirm}
          title={confirmDialog.title}
          message={confirmDialog.message}
          actionType={confirmDialog.actionType}
          memberData={confirmDialog.memberData}
          currentStatus={confirmDialog.currentStatus}
        />
      </div>
    </div>
  );
};

export default MembersList;