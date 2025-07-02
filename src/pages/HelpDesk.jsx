import React, { useState, useEffect } from "react";
import {
  AlertCircle,
  Clock,
  CheckCircle,
  Search,
  Plus,
  Loader2,
} from "lucide-react";
import { DataTable } from "../components/BinarySoftwareCommonComponents/DataTable";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

// Dummy data for support tickets
const dummyTickets = [
  {
    id: 1,
    subject: "Change my email address",
    userId: "USER001",
    dateTime: "2024-03-15 10:30:00",
    complaintTo: "Admin",
    status: "Pending",
    ticketNo: "TKT-001",
    priority: "Medium",
    adminNote: "Under review",
  },
  {
    id: 2,
    subject: "Deposit deducted but not credited",
    userId: "USER002",
    dateTime: "2024-03-14 14:15:00",
    complaintTo: "Billing Team",
    status: "Resolved",
    ticketNo: "TKT-002",
    priority: "High",
    adminNote: "Issue resolved, amount credited",
  },
  {
    id: 3,
    subject: "Change my USDT wallet address",
    userId: "USER003",
    dateTime: "2024-03-13 09:45:00",
    complaintTo: "Support Team",
    status: "Progress",
    ticketNo: "TKT-003",
    priority: "Low",
    adminNote: "Verification in progress",
  },
  {
    id: 4,
    subject: "My query is not listed here",
    userId: "USER004",
    dateTime: "2024-03-12 16:20:00",
    complaintTo: "General Support",
    status: "Pending",
    ticketNo: "TKT-004",
    priority: "Medium",
    adminNote: "Awaiting response",
  },
  {
    id: 5,
    subject: "Deposit completed but timed out",
    userId: "USER005",
    dateTime: "2024-03-11 11:00:00",
    complaintTo: "Technical Team",
    status: "Resolved",
    ticketNo: "TKT-005",
    priority: "High",
    adminNote: "Technical issue fixed",
  },
];

// Dummy user data
const dummyUser = {
  userrefid: "USER001",
  username: "demouser",
  email: "demo@example.com",
  mobile: "+1234567890",
};

const Helpdesk = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("helpdesk");
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [tickets, setTickets] = useState(dummyTickets);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [successMessage, setSuccessMessage] = useState("");
  const [priority, setPriority] = useState("");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleProfilePanel = () => {
    setIsProfileExpanded(!isProfileExpanded);
  };

  // Simulate initial loading
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const columns = [
    {
      key: "subject",
      header: "Subject",
      render: (value) => (
        <div className="text-[12px] sm:text-sm text-orange-400">{value}</div>
      ),
    },
    {
      key: "userId",
      header: "UserID",
      render: (value) => (
        <div className="text-[12px] sm:text-sm text-gray-600">{value}</div>
      ),
    },
    {
      key: "dateTime",
      header: "DateTime",
      render: (value) => (
        <div className="text-[12px] sm:text-sm text-gray-600">{value}</div>
      ),
    },
    {
      key: "complaintTo",
      header: "Complaint To",
      render: (value) => (
        <div className="text-[12px] sm:text-sm text-gray-600">{value}</div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (value) => {
        const statusConfig = {
          Pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
          Resolved: { color: "bg-green-100 text-green-800", icon: CheckCircle },
          Progress: { color: "bg-blue-100 text-blue-800", icon: Clock },
        };
        const config = statusConfig[value] || statusConfig["Pending"];
        const IconComponent = config.icon;

        return (
          <span
            className={`inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-medium ${config.color}`}
          >
            <IconComponent className="w-3 h-3" />
            {value}
          </span>
        );
      },
    },
    {
      key: "adminNote",
      header: "Note",
      render: (value) => (
        <div className="text-[12px] sm:text-sm text-gray-600">{value}</div>
      ),
    },
    {
      key: "ticketNo",
      header: "Ticket No",
      render: (value) => (
        <div className="text-[12px] sm:text-sm text-gray-600">{value}</div>
      ),
    },
  ];

  const getBorderColor = () => {
    switch (priority) {
      case "High":
        return "border-red-500";
      case "Medium":
        return "border-yellow-500";
      case "Low":
        return "border-green-500";
      default:
        return "border-gray-300 dark:border-gray-600";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    // Create new ticket with dummy data
    const newTicket = {
      id: tickets.length + 1,
      subject: formData.get("subject"),
      userId: dummyUser.userrefid,
      dateTime: new Date().toLocaleString(),
      complaintTo: formData.get("complaintTo"),
      status: "Pending",
      ticketNo: `TKT-${String(tickets.length + 1).padStart(3, "0")}`,
      priority: formData.get("priority"),
      adminNote: "New ticket submitted",
    };

    // Simulate API delay
    setTimeout(() => {
      setTickets((prevTickets) => [newTicket, ...prevTickets]);
      setSuccessMessage("Complaint registered successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      setActiveTab("dashboard");
      setLoading(false);

      // Reset form
      e.target.reset();
      setPriority("");
    }, 1000);
  };

  const TabButton = ({ id, label, icon: Icon, count }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[12px] sm:text-sm font-medium transition-colors cursor-pointer ${
        activeTab === id
          ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white  hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-sm"
          : "text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700"
      }`}
    >
      <Icon className="w-3.5 sm:w-4 h-3.5 sm:h-4 mr-1 sm:mr-2" />
      {label}
      {count !== undefined && (
        <span
          className={`ml-2 px-1.5 sm:px-2 py-[1px] sm:py-0.5 rounded-full text-[11px] sm:text-xs ${
            activeTab === id
              ? "bg-[#571043] text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );

  // Filter and search logic
  const search = searchTerm.trim().toLowerCase();
  const filter = filterStatus.toLowerCase();

  const filteredTickets = tickets.filter((ticket) => {
    const subject = ticket.subject.toLowerCase();
    const ticketNo = ticket.ticketNo.toLowerCase();
    const status = ticket.status.toLowerCase();

    const matchesSearch =
      search === "" || subject.includes(search) || ticketNo.includes(search);

    const matchesFilter = filter === "all" || status === filter;

    return matchesSearch && matchesFilter;
  });

  // Stats calculation
  const stats = [
    {
      label: "Total Tickets",
      value: filteredTickets.length,
      icon: AlertCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-900",
    },
    {
      label: "Pending",
      value: filteredTickets.filter((t) => t.status.toLowerCase() === "pending")
        .length,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-900",
    },
    {
      label: "Resolved",
      value: filteredTickets.filter(
        (t) => t.status.toLowerCase() === "resolved"
      ).length,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-900",
    },
  ];

  // Export configuration for DataTable
  const exportConfig = {
    filename: "support-tickets-report",
    title: "Support Tickets Report",
    searchPlaceholder: "Search tickets...",
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

          {/* Helpdesk Content */}
          <main className="flex-1 overflow-auto px-4 sm:px-6 py-4 relative lg:ml-20">
            <div className="w-full mx-auto">
              <div className="flex flex-col gap-4">
                {/* Page Header */}
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-[18px] sm:text-2xl font-bold text-gray-700 dark:text-white">
                      Support Center
                    </h1>
                    <p className="text-[12px]  sm:text-sm text-gray-500 dark:text-gray-400">
                      Manage and track your support tickets
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("new")}
                    className="hidden sm:inline-flex items-center  px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-sm cursor-pointer"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    New Ticket
                  </button>
                </div>

                {/* Navigation */}
                <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
                  <TabButton
                    id="dashboard"
                    label="Dashboard"
                    icon={AlertCircle}
                    count={tickets.length}
                  />
                  <TabButton id="new" label="Submit New Ticket" icon={Plus} />
                </div>

                {activeTab === "dashboard" && (
                  <>
                    {/* Stats */}
                    <div className="grid grid-cols-3 md:grid-cols-4  lg:grid-cols-5 xl:grid-cols-6 gap-1.5 sm:gap-3">
                      {stats.map((stat) => (
                        <div
                          key={stat.label}
                          className={`bg-white rounded-xl shadow-lg border border-gray-200 px-2 sm:px-4 py-1.5 md:py-2 `}
                        >
                          <div className="flex items-center gap-2 sm:gap-4">
                            <div className={` hidden sm:block  ${stat.color}`}>
                              <stat.icon className="w-4 sm:w-6 h-4 sm:h-6" />
                            </div>
                            <div className="flex-1">
                              <p className="text-[12px] sm:text-sm font-medium text-gray-600 dark:text-gray-200">
                                {stat.label}
                              </p>
                              <p
                                className={`text-[18px] sm:text-2xl font-semibold ${stat.color}  `}
                              >
                                {stat.value}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Search and Filter */}
                    <div className="sm:bg-white sm:dark:bg-gray-800 rounded-lg shadow-sm  sm:p-4 mb-8">
                      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-3 sm:mb-4">
                        <div className="col-span-2 relative">
                          <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 sm:w-4.5 h-3.5 sm:h-4.5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search by ticket ID or subject..."
                            className="w-full pl-6 sm:pl-10 pr-4 py-1.5 sm:py-2 text-xs sm:text-[15px] rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <select
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="px-1.5 sm:px-4 text-xs sm:text-[15px] py-1.5 sm:py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="all">All Status</option>
                          <option value="pending">Pending</option>
                          <option value="resolved">Resolved</option>
                          <option value="progress">Progress</option>
                        </select>
                      </div>

                      {loading ? (
                        <div className="flex justify-center items-center py-8">
                          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                        </div>
                      ) : (
                        <DataTable
                          data={filteredTickets}
                          columns={columns}
                          searchable={false}
                          exportable={true}
                          selectable={true}
                          maxHeight="500px"
                          exportConfig={exportConfig}
                        />
                      )}
                    </div>
                  </>
                )}

                {activeTab === "new" && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6">
                    <h2 className="text-[16px] sm:text-lg font-medium text-gray-700 dark:text-white mb-4 sm:mb-6">
                      Complaint Registration Form
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[13px]  sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Subject
                          </label>
                          <select
                            name="subject"
                            required
                            className="w-full px-2 sm:px-4 py-2 text-sm sm:text-[15px] rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <option value="">Select your query...</option>
                            <option>Change my email address</option>
                            <option>Change my USDT wallet address</option>
                            <option>Change my XRP wallet address</option>
                            <option>Deposit deducted but not credited</option>
                            <option>Deposit completed but timed out</option>
                            <option>
                              Deposit completed but I pressed the back button
                            </option>
                            <option>
                              Deposit completed but marked as declined
                            </option>
                            <option>
                              I deposited more than the entered amount
                            </option>
                            <option>
                              I deposited less than the entered amount
                            </option>
                            <option>My query is not listed here</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[13px]  sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Complaint To
                          </label>
                          <input
                            type="text"
                            name="complaintTo"
                            required
                            className="w-full px-2 sm:px-4 py-2 text-sm sm:text-[15px] rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[13px]  sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Priority
                          </label>
                          <select
                            name="priority"
                            required
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className={`w-full px-2 sm:px-4 py-2 text-sm sm:text-[15px] rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${getBorderColor()}`}
                          >
                            <option value="">-- Select Priority --</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[13px]  sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Upload File
                          </label>
                          <input
                            type="file"
                            name="file"
                            className="w-full px-2 sm:px-4 py-2 text-sm sm:text-[15px] rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-[13px]  sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Grievance Description
                          </label>
                          <textarea
                            name="description"
                            rows="2"
                            required
                            placeholder="Enter Ticket Details"
                            className="w-full px-2 sm:px-4 py-2 text-sm sm:text-[15px] rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          ></textarea>
                        </div>
                      </div>

                      <div className="flex justify-end gap-4">
                        <button
                          type="button"
                          onClick={() => setActiveTab("dashboard")}
                          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-xl cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl disabled:opacity-50 bg-gradient-to-r from-purple-500 to-pink-600 text-white  hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-sm cursor-pointer"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            "Add Ticket"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {successMessage && (
                <div className="p-3 mb-4 text-green-800 bg-green-100 border border-green-300 rounded">
                  {successMessage}
                </div>
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

export default Helpdesk;