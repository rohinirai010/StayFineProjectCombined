import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Download, Copy, FileSpreadsheet } from 'lucide-react';
import { FaFilePdf } from 'react-icons/fa';

const ExportDropdown = ({ onExport }) => {
  const [isOpen, setIsOpen] = useState(false);

  const exportOptions = [
    { label: 'Copy to Clipboard', icon: Copy, action: 'copy' },
    { label: 'Export as Excel', icon: FileSpreadsheet, action: 'excel' },
    { label: 'Export as PDF', icon: FaFilePdf, action: 'pdf' }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-800/50 rounded-lg transition-colors cursor-pointer border border-indigo-200 dark:border-indigo-800"
      >
        <Download className="w-4 h-4" />
        Export Data
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 z-50">
          {exportOptions.map((option) => (
            <button
              key={option.action}
              onClick={() => {
                onExport(option.action);
                setIsOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <option.icon className="w-4 h-4" />
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const CommonTable = ({
  data,
  columns,
  selectedRows = new Set(), // Default to an empty Set
  onRowSelect,
  selectAll,
  onSelectAll,
  sortConfig,
  onSort,
  onExport,
  showCheckbox = false, // Add a new prop to control checkbox visibility
}) => {
  const Checkbox = ({ checked, onChange, className = "" }) => (
    <div
      className={`w-5 h-5 border-2 rounded-md cursor-pointer flex items-center justify-center transition-colors ${
        checked
          ? "bg-indigo-500 border-indigo-600 dark:bg-indigo-600 dark:border-indigo-700"
          : "bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600 hover:border-indigo-500 dark:hover:border-indigo-400"
      } ${className}`}
      onClick={onChange}
    >
      {checked && <Check className="w-3 h-3 text-white" />}
    </div>
  );

  const SortIcon = ({ column }) => {
    if (sortConfig?.key !== column) return <ChevronDown className="w-4 h-4 opacity-20" />;
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
    ) : (
      <ChevronDown className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
    );
  };

  // Empty state component
  const EmptyState = () => (
    <div className="py-12 flex flex-col items-center justify-center">
      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">No results found</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter to find what you're looking for.</p>
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <ExportDropdown onExport={onExport} />
      </div>
      
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        {data.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800 text-nowrap">
              <tr>
                {showCheckbox && (
                  <th className="w-12 px-3 py-3.5 text-nowrap">
                    <Checkbox
                      checked={selectAll}
                      onChange={onSelectAll}
                      className="mx-auto"
                    />
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.key}
                    onClick={() => column.sortable !== false && onSort(column.key)}
                    className={`px-6 py-3.5 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider ${
                      column.sortable !== false ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {column.label}
                      {column.sortable !== false && <SortIcon column={column.key} />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {data.map((row, index) => (
                <tr
                  key={row.id}
                  className={`hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-colors ${
                    index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/30'
                  }`}
                >
                  {showCheckbox && (
                    <td className="w-12 px-3 py-4">
                      <Checkbox
                        checked={selectedRows.has(row.id)}
                        onChange={() => onRowSelect(row.id)}
                        className="mx-auto"
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={`${row.id}-${column.key}`}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"
                    >
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default CommonTable;