import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Edit2,
} from 'lucide-react';
import Header from '../../partials/Header';
import Sidebar from '../../partials/Sidebar';
import OverallCommonTable from '../../components/OverallCommonTable';
import { exportToCSV, exportToExcel, exportToPDF } from '../../utils/Utils';
import DocumentViewer from '../../partials/kyc/DocumentViewer';
import logo from "../../images/mainLogo.webp"
import { IoRemoveCircle } from 'react-icons/io5';

const StatsCard = ({ title, value, textColor = "text-black", icon: Icon }) => (
  <div className="p-2 flex flex-col items-center sm:items-start justify-center gap-1 transform transition-all duration-300">
    <h3 className={`text-base font-medium text-center tracking-wide ${textColor}`}>
      {title}
    </h3>
    <p className="text-2xl font-bold text-center">{value}</p>
  </div>
);

const ExportButton = ({ label, bgColor, shadow, onClick }) => (
  <button
    className={`${bgColor} ${shadow}  text-white px-2  sm:px-4 py-1 text-xs sm:text-sm rounded-lg hover:opacity-90 cursor-pointer`}
    onClick={onClick}
  >
    {label}
  </button>
);

const KycHistory = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [kycStatusFilter, setKycStatusFilter] = useState("all");
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [showRemarkModal, setShowRemarkModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [remarkText, setRemarkText] = useState("");
  const itemsPerPage = 5;

  // Sample data 
  const [data, setData] = useState([
    {
      id: 1,
      memberId: "FGFC19",
      fullname: "Hiral patel",
      mobileNumber: "8830607310",
      panCard: logo,
      panStatus: "Pending",
      aadharFront: "/api/placeholder/800/600",
      aadharFrontStatus: "Pending",
      aadharBack: "/api/placeholder/800/600",
      aadharBackStatus: "Pending",
      overallStatus: "Pending",
      remark: "",
    },
    {
      id: 2,
      memberId: "FGFC20",
      fullname: "Neha Devesh Gupta",
      mobileNumber: "9763311234",
      panCard: "/api/placeholder/800/600",
      panStatus: "Pending",
      aadharFront: "/api/placeholder/800/600",
      aadharFrontStatus: "Pending",
      aadharBack: "/api/placeholder/800/600",
      aadharBackStatus: "Pending",
      overallStatus: "Pending",
      remark: "",
    },
  ]);

  const getDefaultRemark = (panStatus, aadharFrontStatus, aadharBackStatus) => {
    // If all approved
    if (panStatus === "Approved" && aadharFrontStatus === "Approved" && aadharBackStatus === "Approved") {
      return "All documents verified";
    }
    
    // If all pending
    if (panStatus === "Pending" && aadharFrontStatus === "Pending" && aadharBackStatus === "Pending") {
      return "Documents pending for verification";
    }
    
    // If any rejected, return empty string as actual rejection remark will be shown
    if (panStatus === "Rejected" || aadharFrontStatus === "Rejected" || aadharBackStatus === "Rejected") {
      return "";
    }
    
    // For mixed status (some pending, some approved)
    return "Partial verification completed";
  };

  // Stats calculation
  const stats = {
    totalKyc: data.length,
    approvedKyc: data.filter(item => item.overallStatus === "Approved").length,
    pendingKyc: data.filter(item => item.overallStatus === "Pending").length,
    rejectedKyc: data.filter(item => item.overallStatus === "Rejected").length,
  };

  // Updated columns configuration
  const columns = [
    { key: 'id', label: 'Sr No' },
    { key: 'memberId', label: 'Member ID' },
    { key: 'fullname', label: 'Fullname' },
    { key: 'mobileNumber', label: 'Mobile Number' },
    { 
        key: 'panCard', 
        label: 'Pan Card',
        render: (row) => (
            <div className="flex justify-center">
          <DocumentViewer
            document={row.panCard}
            status={row.panStatus}
            onApprove={() => handleStatusUpdate(row.id, 'pan', 'Approved')}
            onReject={() => handleStatusUpdate(row.id, 'pan', 'Rejected')}
            onAddRemark={(remark) => handleRemarkUpdate(row.id, remark)}
          />
          </div>
        )
      },
      {
        key: 'panStatus',
        label: 'Status',
        render: (row) => (
            <div className="flex justify-center">
          <span className={`px-2 py-[2px] rounded-full text-[10px] ${
            row.panStatus === "Approved" 
              ? "bg-green-100 text-green-800"
              : row.panStatus === "Rejected"
              ? "bg-red-100 text-red-800" 
              : "bg-yellow-100 text-yellow-800"
          }`}>
            {row.panStatus}
          </span>
          </div>
        )
      },
    { 
      key: 'aadharFront', 
      label: 'Aadhar Front',
      render: (row) => (
        <div className="flex justify-center">
        <DocumentViewer
          document={row.aadharFront}
          status={row.aadharFrontStatus}
          onApprove={() => handleStatusUpdate(row.id, 'aadharFront', 'Approved')}
          onReject={() => handleStatusUpdate(row.id, 'aadharFront', 'Rejected')}
          onAddRemark={(remark) => handleRemarkUpdate(row.id, remark)}
        />
        </div>
      )
    },
    {
        key: 'aadharFrontStatus',
        label: 'Status',
        render: (row) => (
            <div className="flex justify-center">
          <span className={`px-2 py-[2px] rounded-full text-[10px] ${
            row.aadharFrontStatus === "Approved" 
              ? "bg-green-100 text-green-800"
              : row.aadharFrontStatus === "Rejected"
              ? "bg-red-100 text-red-800" 
              : "bg-yellow-100 text-yellow-800"
          }`}>
            {row.aadharFrontStatus}
          </span>
          </div>
        )
      },
    { 
      key: 'aadharBack', 
      label: 'Aadhar Back',
      render: (row) => (
        <div className="flex justify-center">
        <DocumentViewer
          document={row.aadharBack}
          status={row.aadharBackStatus}
          onApprove={() => handleStatusUpdate(row.id, 'aadharBack', 'Approved')}
          onReject={() => handleStatusUpdate(row.id, 'aadharBack', 'Rejected')}
          onAddRemark={(remark) => handleRemarkUpdate(row.id, remark)}
        />
        </div>
      )
    },
    {
        key: 'aadharBackStatus',
        label: 'Status',
        render: (row) => (
            <div className="flex justify-center">
          <span className={`px-2 py-[2px] rounded-full text-[10px] ${
            row.aadharBackStatus === "Approved" 
              ? "bg-green-100 text-green-800"
              : row.aadharBackStatus === "Rejected"
              ? "bg-red-100 text-red-800" 
              : "bg-yellow-100 text-yellow-800"
          }`}>
            {row.aadharBackStatus}
          </span>
          </div>
        )
      },
      {
        key: 'overallStatus',
        label: 'Overall Status',
        render: (row) => {
          const status = calculateOverallStatus(
            row.panStatus,
            row.aadharFrontStatus,
            row.aadharBackStatus
          );
          
          return (
            <div className="flex justify-center">
              <span className={`px-2 py-[2px] rounded-full text-[10px] ${
                status === "Approved"
                  ? "bg-green-100 text-green-800"
                  : status === "Rejected"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}>
                {status}
              </span>
            </div>
          );
        }
      },
      
      {
        key: 'remark',
        label: 'Remark',
        render: (row) => {
          // If there's a custom remark (from rejection), show it with edit button
          if (row.remark && row.remark !== "Partial verification completed" && row.remark !== "All documents verified") {
            return (
              <div className="flex items-start justify-start gap-2">
                <span className="text-sm text-red-600">{row.remark}</span>
                <button 
                  onClick={() => handleRemarkEdit(row)}
                  className="p-1 text-blue-500 hover:text-blue-600"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            );
          }
          
          const remarkText = row.remark || getDefaultRemark(
            row.panStatus,
            row.aadharFrontStatus,
            row.aadharBackStatus,
            row.remark === "Partial verification completed"
          );
      
          return (
            <div className="flex items-start justify-start">
              <span className={`text-xs ${
                remarkText === "All documents verified"
                  ? "text-green-600"
                  : remarkText.includes("pending")
                  ? "text-yellow-600"
                  : remarkText.includes("Partial")
                  ? "text-blue-600"
                  : "text-gray-600"
              }`}>
                {remarkText}
              </span>
            </div>
          );
        }
      }
  
  ];

  // Filtering logic
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );

      const matchesStatus =
        kycStatusFilter === "all" ||
        item.overallStatus.toLowerCase() === kycStatusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [data, searchTerm, kycStatusFilter]);

  // Pagination logic
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Event handlers
  const handleStatusUpdate = (id, type, status) => {
  setData(prevData => 
    prevData.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [`${type}Status`]: status };
        
        // Calculate new overall status
        const newOverallStatus = calculateOverallStatus(
          type === 'pan' ? status : updatedItem.panStatus,
          type === 'aadharFront' ? status : updatedItem.aadharFrontStatus,
          type === 'aadharBack' ? status : updatedItem.aadharBackStatus
        );
        
        // Check if all documents are approved
        const allApproved = 
          (type === 'pan' ? status : updatedItem.panStatus) === "Approved" &&
          (type === 'aadharFront' ? status : updatedItem.aadharFrontStatus) === "Approved" &&
          (type === 'aadharBack' ? status : updatedItem.aadharBackStatus) === "Approved";

        // Update remark based on conditions
        let newRemark = item.remark;
        if (allApproved) {
          newRemark = "All documents verified";
        } else if (status === "Approved") {
          newRemark = "Partial verification completed";
        }

        return {
          ...updatedItem,
          overallStatus: newOverallStatus,
          remark: newRemark
        };
      }
      return item;
    })
  );
};

 

  const handleRemarkEdit = (member) => {
    setRemarkText(member.remark || "");
    setSelectedMember(member);
    setShowRemarkModal(true);
  };

  const handleRemarkSubmit = () => {
    const updatedData = data.map(item => {
      if (item.id === selectedMember.id) {
        return { ...item, remark: remarkText };
      }
      return item;
    });
    setData(updatedData);
    setShowRemarkModal(false);
    setRemarkText("");
    setSelectedMember(null);
  };

  const handleSort = (key) => {
    setSortConfig((prevSort) => ({
      key,
      direction:
        prevSort.key === key && prevSort.direction === "asc" ? "desc" : "asc",
    }));
  };

  const resetFilters = () => {
    setSearchTerm("");
    setKycStatusFilter("all");
  };

  const handleBulkExport = (exportType) => {
    const selectedData = filteredData.filter((row) => selectedRows.has(row.id));
    const dataToExport = selectedRows.size > 0 ? selectedData : filteredData;

    switch (exportType) {
      case "csv":
        exportToCSV(dataToExport, "kyc_history.csv");
        break;
      case "excel":
        exportToExcel(dataToExport, "kyc_history.xlsx");
        break;
      case "pdf":
        exportToPDF(dataToExport, "kyc_history.pdf");
        break;
      default:
        break;
    }
  };

  const handleRemarkUpdate = (id, remark) => {
    setData(prevData => 
      prevData.map(item => {
        if (item.id === id) {
          // Only update the custom remark if provided
          return { 
            ...item, 
            remark: remark || getDefaultRemark(item.panStatus, item.aadharFrontStatus, item.aadharBackStatus)
          };
        }
        return item;
      })
    );
  };


  const calculateOverallStatus = (panStatus, aadharFrontStatus, aadharBackStatus) => {
    // If any document is rejected, overall status is rejected
    if (panStatus === "Rejected" || aadharFrontStatus === "Rejected" || aadharBackStatus === "Rejected") {
      return "Rejected";
    }
    
    // If all documents are pending, overall status is pending
    if (panStatus === "Pending" && aadharFrontStatus === "Pending" && aadharBackStatus === "Pending") {
      return "Pending";
    }
    
    // If all documents are approved, overall status is approved
    if (panStatus === "Approved" && aadharFrontStatus === "Approved" && aadharBackStatus === "Approved") {
      return "Approved";
    }
    
    // If some documents are pending and others are approved (mixed state), show as pending
    return "Pending";
  };



  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow p-4 sm:p-6">
          <div className="max-w-full mx-auto">
            {/* Stats Cards */}
            <div className="max-w-full sm:max-w-sm  px-2 rounded-xl grid grid-cols-2 sm:grid-cols-4 mb-6 bg-white dark:bg-gray-800 shadow-lg">
              <StatsCard
                title="Total kyc"
                value={stats.totalKyc}
                textColor="text-blue-600"
                icon={Users}
              />
              <StatsCard
                title="Approved"
                value={stats.approvedKyc}
                textColor="text-green-600"
                icon={CheckCircle}
              />
              <StatsCard
                title="Pending"
                value={stats.pendingKyc}
                textColor="text-yellow-600"
                icon={Clock}
              />
              <StatsCard
                title="Rejected"
                value={stats.rejectedKyc}
                textColor="text-red-600"
                icon={XCircle}
              />
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg px-4 py-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 border-b border-gray-200 dark:border-gray-700 pb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  KYC History
                </h2>
                <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex gap-2">
                  <ExportButton
                    label="CSV"
                    bgColor="bg-blue-500"
                    shadow="shadow-md shadow-blue-600"
                    onClick={() => handleBulkExport("csv")}
                  />
                  <ExportButton
                    label="Excel"
                    bgColor="bg-green-500"
                    shadow="shadow-md shadow-green-600"
                    onClick={() => handleBulkExport("excel")}
                  />
                  <ExportButton
                    label="PDF"
                    bgColor="bg-red-500"
                    shadow="shadow-md shadow-red-600"
                    onClick={() => handleBulkExport("pdf")}
                  />
                    <button
                          onClick={resetFilters}
                          className="flex items-center justify-center gap-1 px-2 sm:px-3 py-1 text-[10px] sm:text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors cursor-pointer"
                        >
                          <IoRemoveCircle className="w-4 h-4" />
                          Clear Filters
                        </button>
                </div>
                </div>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-3 gap-4 py-6">
                <div className="flex-1 col-span-2 min-w-[200px]">
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
                  value={kycStatusFilter}
                  onChange={(e) => setKycStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
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
                    setSelectedRows(new Set(paginatedData.map(row => row.id)));
                  }
                  setSelectAll(!selectAll);
                }}
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
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-2 sm:px-4 py-1 text-xs sm:text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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

        {/* Remark Modal */}
        {showRemarkModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 animate-modalEntry">
              <h3 className="text-lg font-bold mb-4">Update Remark</h3>
              <textarea
                className="w-full px-3 py-2 text-sm border rounded-lg focus:ring focus:ring-blue-500"
                rows="4"
                value={remarkText}
                onChange={(e) => setRemarkText(e.target.value)}
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowRemarkModal(false)}
                  className="px-4 py-1 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRemarkSubmit}
                  className="px-4 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KycHistory;