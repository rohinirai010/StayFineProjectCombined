import React, { useState, useMemo } from "react";
import { User, Filter } from "lucide-react";
import { DataTable } from "../../components/BinarySoftwareCommonComponents/DataTable";

//  Downline Members Page
export const DownlineMembersPage = () => {
  const [levelFilter, setLevelFilter] = useState("");

  // Sample data for downline members
  const sampleDownlineData = [
    {
      id: 1,
      memberName: "David Andrade",
      memberId: "INF8536507",
      placement: "INF00123",
      sponsor: "INF00123",
      level: 1,
    },
    {
      id: 2,
      memberName: "Michael Davis",
      memberId: "INF4234484",
      placement: "INF8536507",
      sponsor: "INF00123",
      level: 2,
    },
    {
      id: 3,
      memberName: "Brent Hall",
      memberId: "INF52392884",
      placement: "INF4234484",
      sponsor: "INF4234484",
      level: 3,
    },
    {
      id: 4,
      memberName: "Carrie Washington",
      memberId: "INF91650711",
      placement: "INF8536507",
      sponsor: "INF8536507",
      level: 2,
    },
    {
      id: 5,
      memberName: "Barbara Duran",
      memberId: "INF75481323",
      placement: "INF00123",
      sponsor: "INF00123",
      level: 1,
    },
    {
      id: 6,
      memberName: "Randall Greene",
      memberId: "INF40589561",
      placement: "INF52392884",
      sponsor: "INF4234484",
      level: 4,
    },
    {
      id: 7,
      memberName: "Jeremy Lee",
      memberId: "INF55326858",
      placement: "INF4234484",
      sponsor: "INF4234484",
      level: 3,
    },
    {
      id: 8,
      memberName: "Jonathan Jones",
      memberId: "INF08459470",
      placement: "INF91650711",
      sponsor: "INF91650711",
      level: 3,
    },
    {
      id: 9,
      memberName: "Ronald Gillespie",
      memberId: "INF73874705",
      placement: "INF75481323",
      sponsor: "INF75481323",
      level: 2,
    },
    {
      id: 10,
      memberName: "Sean Skinner",
      memberId: "INF90762773",
      placement: "INF40589561",
      sponsor: "INF4234484",
      level: 5,
    },
    {
      id: 11,
      memberName: "Jose Turner",
      memberId: "INF47794581",
      placement: "INF90762773",
      sponsor: "INF4234484",
      level: 6,
    },
    {
      id: 12,
      memberName: "Robert Grimes",
      memberId: "INF13950839",
      placement: "INF55326858",
      sponsor: "INF4234484",
      level: 4,
    },
    {
      id: 13,
      memberName: "Sarah Johnson",
      memberId: "INF22334455",
      placement: "INF75481323",
      sponsor: "INF75481323",
      level: 2,
    },
    {
      id: 14,
      memberName: "Mark Wilson",
      memberId: "INF33445566",
      placement: "INF22334455",
      sponsor: "INF75481323",
      level: 3,
    },
    {
      id: 15,
      memberName: "Test User",
      memberId: "TESTUSER",
      placement: "INF55326858",
      sponsor: "INF4234484",
      level: 4,
    },
    {
      id: 16,
      memberName: "Shiraishi",
      memberId: "SHIRAISHI",
      placement: "INF47794581",
      sponsor: "INF4234484",
      level: 7,
    },
  ];

  const columns = [
    {
      key: "memberName",
      header: "Member Name",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-sm">
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-xs text-gray-500">{row.memberId}</div>
          </div>
        </div>
      ),
    },
    {
      key: "placement",
      header: "Placement",
    },
    {
      key: "sponsor",
      header: "Sponsor",
    },
    {
      key: "level",
      header: "Level",
      render: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {value}
        </span>
      ),
    },
  ];

  // Filter data by level
  const filteredData = useMemo(() => {
    if (!levelFilter) return sampleDownlineData;
    return sampleDownlineData.filter(
      (member) => member.level.toString() === levelFilter
    );
  }, [levelFilter]);

  // Calculate stats
  const stats = {
    totalDownlineMembers: filteredData.length,
    totalLevels: Math.max(...sampleDownlineData.map((m) => m.level)),
  };

  // Get unique levels for filter dropdown
  const uniqueLevels = [
    ...new Set(sampleDownlineData.map((m) => m.level)),
  ].sort((a, b) => a - b);

  // Export configuration for DataTable
  const exportConfig = {
    filename: "downline-members",
    title: "Downline Members Report",
    searchPlaceholder: "Search members..."
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl sm:px-2 py-1.5 sm:py-2">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-5">
          <h1 className="text-[17px] sm:text-xl font-bold text-gray-900 ">
            Downline Members
          </h1>
          <p className="text-[12px] sm:text-[15px] text-gray-600">
            Manage and view your downline network members
          </p>
        </div>

        {/* Stats Cards and Level Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-2 mb-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-2 ">
              <div className="flex flex-col items-center justify-center">
                <p className="text-[11px] sm:text-[13px] font-medium text-gray-600">
                  Total Downline Members
                </p>
                <p className="text-[15px] sm:text-[22px] font-bold text-gray-900">
                  {stats.totalDownlineMembers}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-2 ">
              <div className="flex flex-col items-center justify-center">
                <p className="text-[11px] sm:text-[13px] font-medium text-gray-600">
                  Total Levels
                </p>
                <p className="text-[15px] sm:text-[22px] font-bold text-gray-900">
                  {stats.totalLevels}
                </p>
              </div>
            </div>
          </div>

          {/* Level Filter */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-3 py-2 ">
            <div className="flex flex-col gap-2">
              <label className="text-[12px] sm:text-[13px] font-medium text-gray-600 flex items-center gap-2">
                <Filter className="w-3 sm:w-4 h-3 sm:h-4" />
                Filter by Level
              </label>
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="text-[12px] sm:text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Levels</option>
                {uniqueLevels.map((level) => (
                  <option key={level} value={level.toString()}>
                    Level {level}
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
      </div>
    </div>
  );
};

export default DownlineMembersPage;