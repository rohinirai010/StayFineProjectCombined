import React, { useState, useMemo } from "react";
import {
  Search,
  Download,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  FileText,
  FileSpreadsheet,
  File,
  Check,
  X,
} from "lucide-react";

// Load jsPDF from CDN
const loadJsPDF = () => {
  if (window.jsPDF) return Promise.resolve(window.jsPDF);

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script.onload = () => resolve(window.jspdf?.jsPDF || window.jsPDF);
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// Reusable DataTable Component
export const DataTable = ({
  data,
  columns,
  searchable = true,
  exportable = true,
  selectable = true,
  className = "",
  maxHeight = "400px",
  // New props for export configuration
  exportConfig = {
    filename: "data-export",
    title: "Data Report",
    searchPlaceholder: "Search..."
  }
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [filters, setFilters] = useState({});

  // Extract export configuration with defaults
  const {
    filename = "data-export",
    title = "Data Report",
    searchPlaceholder = "Search..."
  } = exportConfig;

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter((item) => {
      const matchesSearch =
        searchTerm === "" ||
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return String(item[key]).toLowerCase().includes(value.toLowerCase());
      });

      return matchesSearch && matchesFilters;
    });

    if (sortField) {
      filtered.sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        const modifier = sortDirection === "asc" ? 1 : -1;

        if (typeof aVal === "number" && typeof bVal === "number") {
          return (aVal - bVal) * modifier;
        }
        return String(aVal).localeCompare(String(bVal)) * modifier;
      });
    }

    return filtered;
  }, [data, searchTerm, sortField, sortDirection, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredAndSortedData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Handle row selection
  const handleRowSelect = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map((item) => item.id)));
    }
  };

  // Export functionality
  const exportData = async (format) => {
    const dataToExport =
      selectedRows.size > 0
        ? filteredAndSortedData.filter((item) => selectedRows.has(item.id))
        : filteredAndSortedData;

    if (format === "csv") {
      const headers = columns.map((col) => col.header).join(",");
      const rows = dataToExport
        .map((item) => columns.map((col) => `"${item[col.key]}"`).join(","))
        .join("\n");
      const csv = `${headers}\n${rows}`;

      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } else if (format === "excel") {
      const headers = columns.map((col) => col.header).join("\t");
      const rows = dataToExport
        .map((item) => columns.map((col) => item[col.key]).join("\t"))
        .join("\n");
      const excel = `${headers}\n${rows}`;

      const blob = new Blob([excel], { type: "application/vnd.ms-excel" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.xls`;
      a.click();
      window.URL.revokeObjectURL(url);
    } else if (format === "pdf") {
      try {
        const jsPDF = await loadJsPDF();
        const doc = new jsPDF();

        // Add title
        doc.setFontSize(16);
        doc.text(title, 20, 20);

        // Add date
        doc.setFontSize(10);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);

        // Add selection info if applicable
        if (selectedRows.size > 0) {
          doc.text(
            `Selected ${selectedRows.size} of ${filteredAndSortedData.length} records`,
            20,
            40
          );
        } else {
          doc.text(`Total records: ${dataToExport.length}`, 20, 40);
        }

        // Table setup
        let yPosition = 55;
        const pageHeight = doc.internal.pageSize.height;
        const margin = 20;
        const rowHeight = 8;
        
        // Dynamic column widths based on number of columns
        const availableWidth = doc.internal.pageSize.width - 2 * margin;
        const columnWidths = columns.map(() => availableWidth / columns.length);

        // Table headers
        doc.setFontSize(9);
        doc.setFont(undefined, "bold");
        let xPosition = margin;

        columns.forEach((column, index) => {
          doc.text(column.header, xPosition, yPosition);
          xPosition += columnWidths[index];
        });

        // Draw header line
        doc.line(
          margin,
          yPosition + 2,
          margin + columnWidths.reduce((a, b) => a + b, 0),
          yPosition + 2
        );
        yPosition += 10;

        // Table data
        doc.setFont(undefined, "normal");
        dataToExport.forEach((item, index) => {
          if (yPosition > pageHeight - 30) {
            doc.addPage();
            yPosition = 30;
          }

          xPosition = margin;
          columns.forEach((column, colIndex) => {
            const cellValue = String(item[column.key] || "");
            // Truncate text if too long
            const maxWidth = columnWidths[colIndex] - 2;
            const text =
              doc.getTextWidth(cellValue) > maxWidth
                ? cellValue.substring(
                    0,
                    Math.floor(
                      (cellValue.length * maxWidth) / doc.getTextWidth(cellValue)
                    )
                  ) + "..."
                : cellValue;
            doc.text(text, xPosition, yPosition);
            xPosition += columnWidths[colIndex];
          });

          yPosition += rowHeight;
        });

        // Save the PDF
        doc.save(`${filename}.pdf`);
      } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Error generating PDF. Please try again.");
      }
    }

    setShowExportMenu(false);
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-lg border border-gray-200 ${className}`}
    >
      {/* Header with Search and Controls */}
      <div className="p-3 sm:p-4 border-b border-gray-200">
        <div className="flex flex-row gap-2 sm:gap-4 items-start sm:items-center justify-between">
          {/* Search */}
          {searchable && (
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-1.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 sm:w-4 h-3 sm:h-4" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-6 sm:pl-10 pr-4 py-0.5 sm:py-1.5 text-[12px] sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          {/* Export Button */}
          {exportable && (
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center gap-2 px-2 sm:px-4 py-1.5 text-[12px] sm:text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-sm cursor-pointer"
              >
                <Download className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                Export
                <ChevronDown className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              </button>

              {showExportMenu && (
                <div className="absolute right-0 top-11 bg-white rounded-lg shadow-xl border border-gray-200 z-50 min-w-[140px] sm:min-w-[160px]">
                  <div className="p-1.5 text-[12px] sm:text-sm">
                    <button
                      onClick={() => exportData("pdf")}
                      className="w-full flex items-center gap-3 px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border-b"
                    >
                      <FileText className="w-4 h-4 text-red-500" />
                      PDF
                    </button>
                    <button
                      onClick={() => exportData("excel")}
                      className="w-full flex items-center gap-3 px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border-b"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-green-500" />
                      Excel
                    </button>
                    <button
                      onClick={() => exportData("csv")}
                      className="w-full flex items-center gap-3 px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <File className="w-4 h-4 text-blue-500" />
                      CSV
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Selection Info */}
        {selectable && selectedRows.size > 0 && (
          <div className="mt-3 flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
            <Check className="w-4 h-4" />
            {selectedRows.size} row(s) selected
            <button
              onClick={() => setSelectedRows(new Set())}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Table Container  */}
      <div 
        className="overflow-auto border-b border-gray-200"
        style={{ maxHeight }}
      >
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
            <tr>
              {selectable && (
                <th className="w-12 px-2 sm:px-4 py-[9px] whitespace-nowrap bg-gray-50">
                  <input
                    type="checkbox"
                    checked={
                      selectedRows.size === paginatedData.length &&
                      paginatedData.length > 0
                    }
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-2 sm:px-4 py-[9px]  text-left whitespace-nowrap bg-gray-50"
                >
                  <button
                    onClick={() => handleSort(column.key)}
                    className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider hover:text-gray-900 transition-colors"
                  >
                    {column.header}
                    {sortField === column.key ? (
                      sortDirection === "asc" ? (
                        <ChevronUp className="w-4 h-4 text-blue-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-blue-500" />
                      )
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {paginatedData.map((item, index) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 transition-colors"
              >
                {selectable && (
                  <td className="px-4 py-[6px]  whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(item.id)}
                      onChange={() => handleRowSelect(item.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-2 sm:px-4 py-[6px]  text-[12px] text-gray-900 whitespace-nowrap"
                  >
                    {column.render
                      ? column.render(item[column.key], item)
                      : item[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer with Pagination */}
      <div className="px-3 py-3 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50">
        <div className="flex items-center gap-4">
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-lg px-2 sm:px-3 py-0.5 sm:py-1 text-[12px] sm:text-[13px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {[5, 10, 20, 50, 100].map((num) => (
              <option key={num} value={num}>
                {num} per page
              </option>
            ))}
          </select>
          <span className="text-[12px] sm:text-[13px] text-gray-700">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredAndSortedData.length)}{" "}
            of {filteredAndSortedData.length} results
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg text-[12px] sm:text-sm transition-colors ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};