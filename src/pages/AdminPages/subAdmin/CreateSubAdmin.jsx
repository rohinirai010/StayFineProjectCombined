import React, { useState, useEffect, useMemo } from "react";
import { Search, PlusCircle, Edit, Trash2, User, Eye, EyeOff } from "lucide-react";
import Header from "../../../partials/AdminPartials/Header";
import Sidebar from "../../../partials/AdminPartials/Sidebar";
import OverallCommonTable from "../../../components/OverallCommonTable";
import ConfirmationDialog from "../../../components/ConfirmationDialog";

import { dummySubAdmins, roleOptions, permissionOptions } from "../../../utils/SubAdminDummyData.js";
import { GiCancel } from "react-icons/gi";

// Reusable components
const StatsCard = ({ title, value, textColor = "text-black" }) => (
  <div className="sm:px-4 py-2 sm:py-4 flex flex-col items-center sm:items-start justify-center gap-1">
    <div className="flex items-center gap-2">
    
      <h3 className={`text-sm sm:text-base font-medium tracking-wide ${textColor}`}>
        {title}
      </h3>
    </div>
    <p className="text-xl font-bold text-center">{value}</p>
  </div>
);

const FormField = ({ 
  label, 
  name, 
  type = "text", 
  value, 
  onChange, 
  error, 
  placeholder, 
  children,
  className = ""
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label} {error && "*"}
      </label>
      <div className="relative">
        {children || (
          <input
            type={type === "password" ? (showPassword ? "text" : "password") : type}
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 border rounded-lg focus:ring focus:ring-blue-500 bg-white dark:bg-gray-800 ${
              error ? "border-red-500" : "border-gray-300 dark:border-gray-500"
            }`}
            placeholder={placeholder}
          />
        )}
        {type === "password" && (
          <button
            type="button"
            className="absolute right-2 top-2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

const SearchBox = ({ value, onChange }) => (
  <div className="relative">
    <input
      type="text"
      placeholder="Search here.."
      className="w-full px-2 sm:px-4 py-2 text-sm border rounded-lg focus:ring focus:ring-blue-500 bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <Search className="absolute right-3 top-3 sm:top-2 h-4 w-4 text-gray-400" />
  </div>
);

const CreateSubAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [subAdmins, setSubAdmins] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    adminId: null,
    adminData: null
  });
  
  // Default form state
  const defaultFormState = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
    permissions: [],
    status: "Active"
  };
  
  // Form state using a single state object
  const [formData, setFormData] = useState(defaultFormState);
  const [errors, setErrors] = useState({});

  const itemsPerPage = 5;

  // Load data on component mount
  useEffect(() => {
    setSubAdmins(dummySubAdmins);
  }, []);

  // Table columns definition
  const columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "phone", label: "Phone", sortable: true },
    { key: "password", label: "Password", sortable: true },
    { key: "role", label: "Role", sortable: true },
    { 
      key: "permissions", 
      label: "Permissions", 
      sortable: false,
      render: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.permissions.slice(0, 2).map((perm, index) => (
            <span key={index} className="px-2 py-[2px] bg-blue-100 text-blue-800 rounded-full text-xs">
              {perm}
            </span>
          ))}
          {row.permissions.length > 2 && (
            <span className="px-2 py-[2px] bg-gray-100 text-gray-800 rounded-full text-xs">
              +{row.permissions.length - 2}
            </span>
          )}
        </div>
      )
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
    {
      key: "actions",
      label: "Actions",
      sortable: false,
      render: (row) => (
        <div className="flex items-center gap-2">
          <button onClick={() => handleEdit(row)} className="cursor-pointer">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={() => handleDelete(row.id)} className="text-red-600 cursor-pointer">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  // Sorting, filtering, and pagination logic combined into hooks in a real application
  const sortData = (data, config) => {
    if (!config.key) return data;
    return [...data].sort((a, b) => {
      if (a[config.key] < b[config.key]) return config.direction === "asc" ? -1 : 1;
      if (a[config.key] > b[config.key]) return config.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const filteredData = useMemo(() => {
    return subAdmins.filter((item) => {
      // Search term filter
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus = statusFilter === "all" || item.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [subAdmins, searchTerm, statusFilter]);

  const paginatedData = useMemo(() => {
    const sortedData = sortData(filteredData, sortConfig);
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Stats data
  const stats = useMemo(() => ({
    totalSubAdmins: filteredData.length,
    activeSubAdmins: filteredData.filter(admin => admin.status === "Active").length,
    inactiveSubAdmins: filteredData.filter(admin => admin.status === "Inactive").length
  }), [filteredData]);

  // Event handlers
  const handleSort = (key) => {
    setSortConfig(prevSort => ({
      key,
      direction: prevSort.key === key && prevSort.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleRowSelect = (id) => {
    const newSelected = new Set(selectedRows);
    newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
    setSelectedRows(newSelected);
    setSelectAll(newSelected.size === paginatedData.length);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map(row => row.id)));
    }
    setSelectAll(!selectAll);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handlePermissionChange = (permission) => {
    setFormData(prev => {
      const updatedPermissions = [...prev.permissions];
      const index = updatedPermissions.indexOf(permission);
      
      if (index !== -1) {
        updatedPermissions.splice(index, 1);
      } else {
        updatedPermissions.push(permission);
      }
      
      return { ...prev, permissions: updatedPermissions };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['name', 'email', 'phone', 'password', 'role'];
    
    // Check required fields
    requiredFields.forEach(field => {
      if (!formData[field]?.trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    // Password validation
    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    // Permissions validation
    if (formData.permissions.length === 0) {
      newErrors.permissions = "At least one permission is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData(defaultFormState);
    setEditingId(null);
    setErrors({});
  };

  // CRUD operations
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (editingId) {
      // Update existing subadmin
      setSubAdmins(
        subAdmins.map(admin => admin.id === editingId ? { ...admin, ...formData, id: editingId } : admin)
      );
    } else {
      // Add new subadmin
      const newSubAdmin = {
        ...formData,
        id: subAdmins.length + 1,
        createdAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
      };
      setSubAdmins([...subAdmins, newSubAdmin]);
    }
    
    resetForm();
    setShowForm(false);
  };

  const handleEdit = (subAdmin) => {
    setEditingId(subAdmin.id);
    setFormData({
      name: subAdmin.name,
      email: subAdmin.email,
      phone: subAdmin.phone,
      password: subAdmin.password,
      confirmPassword: subAdmin.password,
      role: subAdmin.role,
      permissions: subAdmin.permissions,
      status: subAdmin.status
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const adminToDelete = subAdmins.find(admin => admin.id === id);
    setDeleteConfirmation({
      isOpen: true,
      adminId: id,
      adminData: {
        memberId: `Admin-${id}`,
        fullname: adminToDelete.name
      }
    });
  };
  
  const handleConfirmDelete = () => {
    if (deleteConfirmation.adminId) {
      setSubAdmins(subAdmins.filter(admin => admin.id !== deleteConfirmation.adminId));
      setDeleteConfirmation({ isOpen: false, adminId: null, adminData: null });
    }
  };
  
  const handleCancelDelete = () => {
    setDeleteConfirmation({ isOpen: false, adminId: null, adminData: null });
  };

  const toggleForm = () => {
    if (showForm) {
      resetForm();
    }
    setShowForm(!showForm);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow p-4 sm:p-6">
          <div className="max-w-full mx-auto">
            {/* Stats Cards */}
            <div className=" max-w-full sm:max-w-xs px-2 rounded-xl grid grid-cols-3  mb-4 sm:mb-6 bg-white dark:bg-gray-800  shadow-lg">
              <StatsCard
                title="Total"
                value={stats.totalSubAdmins}
                textColor="text-blue-600"
                
              />
              <StatsCard
                title="Active"
                value={stats.activeSubAdmins}
                textColor="text-green-600"
                
              />
              <StatsCard
                title="Inactive"
                value={stats.inactiveSubAdmins}
                textColor="text-red-600"
                
              />
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg px-3 sm:px-4 py-6">
              {/* Header Section */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 border-b border-gray-200 dark:border-gray-700 pb-4">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white">
                  Manage Sub-Administrators
                </h2>
                
                <button
                  onClick={toggleForm}
                  className={`flex items-center gap-2 px-2 sm:px-4 py-1 sm:py-2  rounded-xl shadow-md text-white  transition-colors cursor-pointer ${showForm ? "bg-red-800 hover:bg-red-900" : "bg-gradient-to-r from-[#E20C88]  to-[#571043] hover:to-[#E20C88]   hover:from-[#571043]"}`}
                >
                  {
                    showForm ? <GiCancel className="w-4 sm:w-5 h-4 sm:h-5" /> : <PlusCircle className="w-4 sm:w-5 h-4 sm:h-5" />
                  }
                  
                  {showForm ? "Cancel" : "Create Sub-Admin"}
                </button>
              </div>

              {/* Form Section */}
              {showForm && (
                <div className="mt-6 mb-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
                    {editingId ? "Edit Sub-Admin" : "Create New Sub-Admin"}
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        error={errors.name}
                        placeholder="Enter full name"
                      />

                      <FormField
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={errors.email}
                        placeholder="Enter email address"
                      />

                      <FormField
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        error={errors.phone}
                        placeholder="Enter phone number"
                      />
                      
                      <FormField
                        label="Role"
                        name="role"
                        error={errors.role}
                      >
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 border rounded-lg focus:ring focus:ring-blue-500 bg-white dark:bg-gray-800 ${
                            errors.role ? "border-red-500" : "border-gray-300 dark:border-gray-500"
                          }`}
                        >
                          <option value="">Select a role</option>
                          {roleOptions.map(role => (
                            <option key={role} value={role}>{role}</option>
                          ))}
                        </select>
                      </FormField>

                      <FormField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        error={errors.password}
                        placeholder="Enter password"
                      />

                      <FormField
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        error={errors.confirmPassword}
                        placeholder="Confirm password"
                      />

                      <FormField
                        label="Status"
                        name="status"
                      >
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 border rounded-lg focus:ring focus:ring-blue-500 bg-white dark:bg-gray-800"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </FormField>
                    </div>

                    {/* Permissions */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Permissions {errors.permissions && "*"}
                      </label>
                      {errors.permissions && (
                        <p className="text-red-500 text-xs mb-2">{errors.permissions}</p>
                      )}
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {permissionOptions.map(permission => (
                          <div key={permission} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`permission-${permission}`}
                              checked={formData.permissions.includes(permission)}
                              onChange={() => handlePermissionChange(permission)}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <label
                              htmlFor={`permission-${permission}`}
                              className="text-sm ml-2 text-gray-700 dark:text-gray-300"
                            >
                              {permission}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Form actions */}
                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          resetForm();
                          setShowForm(false);
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="text-sm sm:text-base px-2 sm:px-4 py-2 bg-gradient-to-r from-[#E20C88]  to-[#571043] hover:to-[#E20C88]   hover:from-[#571043] text-white rounded-lg shadow-md cursor-pointer"
                      >
                        {editingId ? "Update Sub-Admin" : "Create Sub-Admin"}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Filters */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                <div className="flex-1 sm:col-span-2 sm:min-w-[200px]">
                  <SearchBox value={searchTerm} onChange={setSearchTerm} />
                </div>

                <select
                  className="px-4 py-2 text-xs sm:text-sm border rounded-lg focus:ring focus:ring-blue-500 bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Table Section */}
              <div className="mt-6">
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
                <div className="py-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Showing {Math.min(filteredData.length, 1 + (currentPage - 1) * itemsPerPage)} to{" "}
                      {Math.min(currentPage * itemsPerPage, filteredData.length)}{" "}
                      of {filteredData.length} entries
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-2 sm:px-4 py-1 text-xs sm:text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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
          </div>
        </main>
      </div>

      <ConfirmationDialog
        isOpen={deleteConfirmation.isOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Sub-Admin"
        message="Are you sure you want to delete this sub-admin? This action cannot be undone."
        actionType="block"
        memberData={deleteConfirmation.adminData}
      />
    </div>
  );
};

export default CreateSubAdmin;