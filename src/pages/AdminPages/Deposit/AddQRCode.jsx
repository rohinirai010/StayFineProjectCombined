import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus,
  Trash2,
  Eye
} from 'lucide-react';
import { IoRemoveCircle } from 'react-icons/io5';
import Header from '../../../partials/AdminPartials/Header'; 
import Sidebar from '../../../partials/AdminPartials/Sidebar';
import OverallCommonTable from '../../../components/OverallCommonTable';
import { exportToCSV, exportToExcel, exportToPDF } from '../../../utils/Utils';
import ConfirmationDialog from '../../../components/ConfirmationDialog';

const ExportButton = ({ label, bgColor, shadow, onClick }) => (
  <button
    className={`${bgColor} ${shadow} text-white px-2 sm:px-4 py-1 text-xs sm:text-sm rounded-lg hover:opacity-90`}
    onClick={onClick}
  >
    {label}
  </button>
);


const QRViewer = ({ qrImage, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full m-5 animate-modalEntry">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">QR Code Preview</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 cursor-pointer">
              <IoRemoveCircle className="w-6 h-6" />
          </button>
        </div>
        <div className="flex justify-center">
          <img src={qrImage} alt="QR Code" className="w-64 h-64 object-contain" />
        </div>
      </div>
    </div>
  );
};

const AddQRCode = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [qrTypeFilter, setQrTypeFilter] = useState("all");
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [showModal, setShowModal] = useState(false);
  const [selectedQRType, setSelectedQRType] = useState('UPI');
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedQRImage, setSelectedQRImage] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    qrId: null,
    qrData: null
  });

  const [formData, setFormData] = useState({
    depositAddress: '',
    networkAddress: '',
    qrImage: null
  });

  // Sample data
  const [data, setData] = useState([
    {
      id: 1,
      qrType: "UPI",
      qrImage: "/api/placeholder/200/200",
      depositAddress: "user@upi",
      networkAddress: "UPI Network",
      dateAdded: "2025-02-14"
    },
    {
      id: 2,
      qrType: "USDT",
      qrImage: "/api/placeholder/200/200",
      depositAddress: "TRC20Address123",
      networkAddress: "TRC20",
      dateAdded: "2025-02-14"
    }
  ]);

  const columns = [
    { key: 'id', label: 'Sr No' },
    { key: 'qrType', label: 'QR Type' },
    { 
      key: 'qrImage', 
      label: 'QR Code',
      render: (row) => (
        <div className="flex justify-start">
           <button
            onClick={() => {
              setSelectedQRImage(row.qrImage);
              setViewerOpen(true);
            }}
            className="inline-flex items-center justify-center p-1 text-blue-500 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-200 dark:hover:bg-blue-100 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      )
    },
    { key: 'depositAddress', label: 'Deposit Address' },
    { key: 'networkAddress', label: 'Network Address' },
    { key: 'dateAdded', label: 'Date Added' },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex justify-start">
          <button
            onClick={() => handleDelete(row.id)}
            className="text-red-500 hover:text-red-700 cursor-pointer"
          >
            <Trash2 className="w-4 h-4    " />
          </button>
        </div>
      )
    }
  ];

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesType = qrTypeFilter === "all" || item.qrType.toLowerCase() === qrTypeFilter.toLowerCase();
      return matchesSearch && matchesType;
    });
  }, [data, searchTerm, qrTypeFilter]);

  const itemsPerPage = 5;
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQR = {
      id: data.length + 1,
      qrType: selectedQRType,
      qrImage: formData.qrImage ? URL.createObjectURL(formData.qrImage) : "/api/placeholder/200/200",
      depositAddress: formData.depositAddress,
      networkAddress: formData.networkAddress,
      dateAdded: new Date().toISOString().split('T')[0]
    };
    setData([...data, newQR]);
    setShowModal(false);
    setFormData({ depositAddress: '', networkAddress: '', qrImage: null });
  };

  
//funcation to handle deletion
  const handleDelete = (id) => {
    const qrToDelete = data.find(item => item.id === id);
    setDeleteConfirmation({
      isOpen: true,
      qrId: id,
      qrData: {
        memberId: `QR-${id}`,
        fullname: `${qrToDelete.qrType} QR Code`
      }
    });
  };

    // function for confirmed deletion
    const handleConfirmDelete = () => {
      if (deleteConfirmation.qrId) {
        setData(data.filter(item => item.id !== deleteConfirmation.qrId));
        setDeleteConfirmation({ isOpen: false, qrId: null, qrData: null });
      }
    };
  
    // function to cancel deletion
    const handleCancelDelete = () => {
      setDeleteConfirmation({ isOpen: false, qrId: null, qrData: null });
    };

  const handleFileChange = (e) => {
    setFormData({ ...formData, qrImage: e.target.files[0] });
  };

  const handleBulkExport = (exportType) => {
    const selectedData = filteredData.filter((row) => selectedRows.has(row.id));
    const dataToExport = selectedRows.size > 0 ? selectedData : filteredData;

    switch (exportType) {
      case "csv":
        exportToCSV(dataToExport, "qr_codes.csv");
        break;
      case "excel":
        exportToExcel(dataToExport, "qr_codes.xlsx");
        break;
      case "pdf":
        exportToPDF(dataToExport, "qr_codes.pdf");
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow p-4 sm:p-6">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg px-4 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 border-b border-gray-200 dark:border-gray-700 pb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                QR Code Management
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
                    onClick={() => {
                      setSearchTerm("");
                      setQrTypeFilter("all");
                    }}
                    className="flex items-center gap-1 px-2 sm:px-3 py-1 text-[10px] sm:text-xs text-red-600 hover:text-red-900 dark:text-red-600 dark:hover:text-red-100 transition-colors cursor-pointer"
                  >
                    <IoRemoveCircle className="w-4 h-4" />
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6">
              <div className="col-span-2">
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
                value={qrTypeFilter}
                onChange={(e) => setQrTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="upi">UPI</option>
                <option value="usdt">USDT</option>
              </select>

              <button
                onClick={() => setShowModal(true)}
                className="flex items-center justify-center gap-2 text-xs sm:text-sm px-3 sm:px-4 py-1 bg-gradient-to-r from-[#E20C88]  to-[#571043] hover:to-[#E20C88]   hover:from-[#571043] text-white rounded-lg  cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add QR Code
              </button>

              {/* <div className="flex gap-2 mb-6">
              <button
                onClick={() => handleAddQR('UPI')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Plus className="w-4 h-4" />
                Add UPI QR
              </button>
              <button
                onClick={() => handleAddQR('USDT')}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              >
                <Plus className="w-4 h-4" />
                Add USDT QR
              </button>
            </div> */}
            </div>

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
            />

            {/* Add QR Modal */}
            {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-50 backdrop-blur-xs">
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 animate-modalEntry m-4">
     
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className='flex justify-between items-center'>

        <h3 className="text-base  font-bold mb-4 text-gray-700 dark:text-gray-200">Add QR Code</h3>
          <div className="flex  gap-2 mb-4">
            <button
              type="button"
              onClick={() => setSelectedQRType('UPI')}
              className={`px-4 py-1 text-sm rounded-xl cursor-pointer ${
                selectedQRType === 'UPI'
                  ? 'bg-[#E20C88] text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              UPI
            </button>
            <button
              type="button"
              onClick={() => setSelectedQRType('USDT')}
              className={`px-4 py-1 text-sm rounded-xl cursor-pointer ${
                selectedQRType === 'USDT'
                  ? 'bg-[#E20C88] text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              USDT
            </button>
          </div>
          </div>
          <div>
            <label className="block text-xs tracking-wide mb-1 text-gray-900 dark:text-gray-200">
              Deposit Address
            </label>
            <input
              type="text"
              className="w-full px-3 py-1 text-sm border rounded-lg focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              value={formData.depositAddress}
              onChange={(e) => setFormData({...formData, depositAddress: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-xs tracking-wide mb-1 text-gray-900 dark:text-gray-200">
              Network Address
            </label>
            <input
              type="text"
              className="w-full px-3 py-1 text-sm border rounded-lg focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              value={formData.networkAddress}
              onChange={(e) => setFormData({...formData, networkAddress: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-xs tracking-wide mb-1 text-gray-900 dark:text-gray-200">
              QR Code Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-3 py-2 text-xs cursor-pointer border rounded-lg focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              onChange={handleFileChange}
              required
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-2 sm:px-4 py-1 sm:py-1 text-sm text-gray-600 bg-gray-200 hover:bg-gray-300 dark:bg-gray-200 dark:hover:bg-gray-300 rounded-lg hover:text-gray-900 dark:text-gray-600 dark:hover:text-gray-800 cursor-pointer font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-1 text-sm bg-[#E20C88] text-white rounded-lg hover:bg-[#E20C88]/80 cursor-pointer"
          >
            Add QR Code
          </button>
        </div>
      </form>
    </div>
  </div>
)}


             {/* QR Code Viewer */}
             <QRViewer
              qrImage={selectedQRImage}
              isOpen={viewerOpen}
              onClose={() => setViewerOpen(false)}
            />

            {/* Delete Confirmation */}
            <ConfirmationDialog 
             isOpen={deleteConfirmation.isOpen}
             onClose={handleCancelDelete}
             onConfirm={handleConfirmDelete}
             title="Delete QR Code"
             message="Are you sure you want to delete this QR code? This action cannot be undone."
             actionType="block"
             memberData={deleteConfirmation.qrData}
             />

            {/* Pagination */}
            <div className="py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredData.length)}{" "}
                  of {filteredData.length} entries
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-2 sm:px-4 py-1 sm:py-2 text-xs  sm:text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddQRCode;