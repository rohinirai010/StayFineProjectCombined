import React from 'react';
import { Check, Edit, ChevronDown, ChevronUp } from 'lucide-react';

const CommonTable = ({
  data,
  selectedRows,
  onRowSelect,
  selectAll,
  onSelectAll,
  sortConfig,
  onSort,
  memberStatus,
  pinStatus,
  levelStatus,
  onEditClick,
  onBlockToggle,
  onPinToggle,
  onLevelToggle,
  onLoginClick,
  lastEdited
}) => {
  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return <ChevronDown className="w-4 h-4 opacity-20" />;
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  // Checkbox component
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

  return (
    <div className="overflow-x-auto rounded-t-xl">
      <table className="w-full">
        <thead className="w-full bg-gray-200 dark:bg-gray-700">
          <tr>
            <th className="px-2 py-[10px] text-xs font-medium text-gray-500 dark:text-gray-300">
              <Checkbox
                checked={selectAll}
                onChange={onSelectAll}
                className="mx-auto"
              />
            </th>
            <th className="px-2 py-[10px] text-xs font-medium text-gray-500 dark:text-gray-300 tracking-wider whitespace-nowrap">
              Edit
            </th>
            {/* Add table headers */}
            {[
              { key: 'action', label: 'Action' },
              { label: 'Block/Unblock' },
              { key: 'pinStatus', label: '0 Pin' },
              { key: 'levelManual', label: 'Level Manual' },
              { key: 'id', label: 'Sr. No' },
              { key: 'fullname', label: 'Full Name' },
              { key: 'memberId', label: 'Member Id' },
              { key: 'totalActiveDirects', label: 'Total Active Directs' },
              { key: 'password', label: 'Password' },
              { key: 'systemPackage', label: 'System Package' },
              { key: 'sponsorId', label: 'Sponsor Id' },
              { key: 'sponsorName', label: 'Sponsor Name' },
              { key: 'mobileNumber', label: 'Mobile Number' },
              { key: 'activationDate', label: 'Activation Date' },
              { key: 'registrationDate', label: 'Registration' },
              { key: 'kycStatus', label: 'KYC Status' },
              { key: 'bankStatus', label: 'Bank Status' },
              { key: 'userStatus', label: 'User Status' }
            ].map((header) => (
              <th
                key={header.key || header.label}
                className="px-2 py-[10px] text-xs font-medium text-gray-500 dark:text-gray-300 tracking-wider cursor-pointer whitespace-nowrap"
                onClick={() => header.key && onSort(header.key)}
              >
                <div className="flex items-center">
                  {header.label}
                  {header.key && <SortIcon column={header.key} />}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((row) => (
            <tr
              key={row.id}
              className="w-full text-xs bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <td className="px-2 py-[9px] whitespace-nowrap">
                <Checkbox
                  checked={selectedRows.has(row.id)}
                  onChange={() => onRowSelect(row.id)}
                  className="mx-auto"
                />
              </td>
              <td className="px-2 py-[14px] flex flex-row items-center gap-2 whitespace-nowrap">
                <div onClick={() => onEditClick(row)} className="text-center">
                  <Edit className="w-4 h-4 text-red-500 cursor-pointer" />
                </div>
                {lastEdited[row.id] && (
                  <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                    Last Edited: <br /> {lastEdited[row.id]}
                  </div>
                )}
              </td>
              <td className="px-2 py-[9px] whitespace-nowrap">
                <button 
                  onClick={() => onLoginClick(row)}
                  className="px-2 py-[2px] text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
                >
                  Login
                </button>
              </td>
              <td className="px-2 py-[9px] whitespace-nowrap">
                <button
                  onClick={() => onBlockToggle(row)}
                  className={`px-2 py-[2px] text-xs text-white rounded-lg cursor-pointer ${
                    memberStatus[row.id]
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {memberStatus[row.id] ? "Block" : "Unblock"}
                </button>
              </td>
              <td className="px-2 py-[9px] whitespace-nowrap">
                <button
                  onClick={() => onPinToggle(row)}
                  className={`px-2 py-[2px] rounded-lg text-xs cursor-pointer ${
                    pinStatus[row.id]
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {pinStatus[row.id] ? "ON" : "OFF"}
                </button>
              </td>
              <td className="px-2 py-[9px] whitespace-nowrap">
                <button
                  onClick={() => onLevelToggle(row)}
                  className={`px-2 py-[2px] rounded-lg text-xs cursor-pointer ${
                    levelStatus[row.id]
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {levelStatus[row.id] ? "Level ON" : "Level OFF"}
                </button>
              </td>
              <td className="px-2 py-[9px] whitespace-nowrap">{row.id}</td>
              <td className="px-2 py-[9px] whitespace-nowrap">{row.fullname}</td>
              <td className="px-2 py-[9px] whitespace-nowrap">{row.memberId}</td>
              <td className="px-2 py-[9px] whitespace-nowrap">{row.totalActiveDirects}</td>
              <td className="px-2 py-[9px] whitespace-nowrap">{row.password}</td>
              <td className="px-2 py-[9px] whitespace-nowrap">{row.systemPackage}</td>
              <td className="px-2 py-[9px] whitespace-nowrap">{row.sponsorId}</td>
              <td className="px-2 py-[9px] whitespace-nowrap">{row.sponsorName}</td>
              <td className="px-2 py-[9px] whitespace-nowrap">{row.mobileNumber}</td>
              <td className="px-2 py-[9px] whitespace-nowrap">{row.activationDate}</td>
              <td className="px-2 py-[9px] whitespace-nowrap">{row.registrationDate}</td>
              <td className="px-2 py-[9px] whitespace-nowrap">
                <span
                  className={`px-2 py-[2px] rounded-full text-xs ${
                    row.kycStatus === "Verified"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {row.kycStatus}
                </span>
              </td>
              <td className="px-2 py-[9px] whitespace-nowrap">
                <span
                  className={`px-2 py-[2px] rounded-full text-xs ${
                    row.bankStatus === "Verified"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {row.bankStatus}
                </span>
              </td>
              <td className="px-2 py-[9px] whitespace-nowrap">
                <span
                  className={`px-2 py-[2px] rounded-full text-xs ${
                    row.userStatus === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {row.userStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommonTable;