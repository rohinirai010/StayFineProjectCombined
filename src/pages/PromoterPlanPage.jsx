import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  Award,
  DollarSign,
  Calendar,
  CheckCircle,
  Check,
  IndianRupeeIcon,
} from "lucide-react";
import { DataTable } from "../components/BinarySoftwareCommonComponents/DataTable";

// Promoter Plan Page Component
export const PromoterPlanPage = () => {
  const [statusFilter, setStatusFilter] = useState("");

  // Sample data for Stayfine Business Promoter Plan & Payout Model - Updated to match image exactly
  const samplePromoterData = [
    {
      id: 1,
      srNo: 1,
      supermarketPartnerUnits: "10 UNIT [1 LAKH]",
      perMonthBusinessCommission: "₹1,000",
      total12Months: "12",
      totalAmountReceived: "12000",
      totalSupermarketSaleCommission: "20%",
      monthlyStatus: [
        { month: 1, status: "paid" },
        { month: 2, status: "paid" },
        { month: 3, status: "pending" },
        { month: 4, status: "pending" },
        { month: 5, status: "pending" },
        { month: 6, status: "pending" },
        { month: 7, status: "pending" },
        { month: 8, status: "pending" },
        { month: 9, status: "pending" },
        { month: 10, status: "pending" },
        { month: 11, status: "pending" },
        { month: 12, status: "pending" },
      ],
    },
    {
      id: 2,
      srNo: 2,
      supermarketPartnerUnits: "25 UNIT [2.5 LAKH]",
      perMonthBusinessCommission: "₹2,500",
      total12Months: "12",
      totalAmountReceived: "30000",
      totalSupermarketSaleCommission: "15%",
      monthlyStatus: [
        { month: 1, status: "paid" },
        { month: 2, status: "paid" },
        { month: 3, status: "paid" },
        { month: 4, status: "paid" },
        { month: 5, status: "pending" },
        { month: 6, status: "pending" },
        { month: 7, status: "pending" },
        { month: 8, status: "pending" },
        { month: 9, status: "pending" },
        { month: 10, status: "pending" },
        { month: 11, status: "pending" },
        { month: 12, status: "pending" },
      ],
    },
    {
      id: 3,
      srNo: 3,
      supermarketPartnerUnits: "50 UNIT [5 LAKH]",
      perMonthBusinessCommission: "₹5,000",
      total12Months: "12",
      totalAmountReceived: "60000",
      totalSupermarketSaleCommission: "10%",
      monthlyStatus: [
        { month: 1, status: "paid" },
        { month: 2, status: "paid" },
        { month: 3, status: "paid" },
        { month: 4, status: "paid" },
        { month: 5, status: "paid" },
        { month: 6, status: "paid" },
        { month: 7, status: "pending" },
        { month: 8, status: "pending" },
        { month: 9, status: "pending" },
        { month: 10, status: "pending" },
        { month: 11, status: "pending" },
        { month: 12, status: "pending" },
      ],
    },
    {
      id: 4,
      srNo: 4,
      supermarketPartnerUnits: "100 UNIT [10 LAKH]",
      perMonthBusinessCommission: "₹10,000",
      total12Months: "12",
      totalAmountReceived: "120000",
      totalSupermarketSaleCommission: "10%",
      monthlyStatus: [
        { month: 1, status: "paid" },
        { month: 2, status: "paid" },
        { month: 3, status: "paid" },
        { month: 4, status: "paid" },
        { month: 5, status: "paid" },
        { month: 6, status: "paid" },
        { month: 7, status: "paid" },
        { month: 8, status: "paid" },
        { month: 9, status: "pending" },
        { month: 10, status: "pending" },
        { month: 11, status: "pending" },
        { month: 12, status: "pending" },
      ],
    },
    {
      id: 5,
      srNo: 5,
      supermarketPartnerUnits: "250 UNIT [25 LAKH]",
      perMonthBusinessCommission: "₹25,000",
      total12Months: "12",
      totalAmountReceived: "300000",
      totalSupermarketSaleCommission: "8%",
      monthlyStatus: [
        { month: 1, status: "paid" },
        { month: 2, status: "paid" },
        { month: 3, status: "paid" },
        { month: 4, status: "pending" },
        { month: 5, status: "pending" },
        { month: 6, status: "pending" },
        { month: 7, status: "pending" },
        { month: 8, status: "pending" },
        { month: 9, status: "pending" },
        { month: 10, status: "pending" },
        { month: 11, status: "pending" },
        { month: 12, status: "pending" },
      ],
    },
    {
      id: 6,
      srNo: 6,
      supermarketPartnerUnits: "500 UNIT [50 LAKH]",
      perMonthBusinessCommission: "₹50,000",
      total12Months: "12",
      totalAmountReceived: "600000",
      totalSupermarketSaleCommission: "7%",
      monthlyStatus: [
        { month: 1, status: "paid" },
        { month: 2, status: "paid" },
        { month: 3, status: "paid" },
        { month: 4, status: "paid" },
        { month: 5, status: "paid" },
        { month: 6, status: "pending" },
        { month: 7, status: "pending" },
        { month: 8, status: "pending" },
        { month: 9, status: "pending" },
        { month: 10, status: "pending" },
        { month: 11, status: "pending" },
        { month: 12, status: "pending" },
      ],
    },
    {
      id: 7,
      srNo: 7,
      supermarketPartnerUnits: "1000 UNIT [1 CR.]",
      perMonthBusinessCommission: "₹1,00,000",
      total12Months: "12",
      totalAmountReceived: "1200000",
      totalSupermarketSaleCommission: "6%",
      monthlyStatus: [
        { month: 1, status: "paid" },
        { month: 2, status: "paid" },
        { month: 3, status: "paid" },
        { month: 4, status: "paid" },
        { month: 5, status: "paid" },
        { month: 6, status: "paid" },
        { month: 7, status: "paid" },
        { month: 8, status: "paid" },
        { month: 9, status: "paid" },
        { month: 10, status: "pending" },
        { month: 11, status: "pending" },
        { month: 12, status: "pending" },
      ],
    },
    {
      id: 8,
      srNo: 8,
      supermarketPartnerUnits: "2500 UNIT [2.5 CR.]",
      perMonthBusinessCommission: "₹2,50,000",
      total12Months: "12",
      totalAmountReceived: "3000000",
      totalSupermarketSaleCommission: "5%",
      monthlyStatus: [
        { month: 1, status: "paid" },
        { month: 2, status: "paid" },
        { month: 3, status: "paid" },
        { month: 4, status: "paid" },
        { month: 5, status: "paid" },
        { month: 6, status: "paid" },
        { month: 7, status: "paid" },
        { month: 8, status: "paid" },
        { month: 9, status: "paid" },
        { month: 10, status: "pending" },
        { month: 11, status: "pending" },
        { month: 12, status: "pending" },
      ],
    },
    {
      id: 9,
      srNo: 9,
      supermarketPartnerUnits: "5000 UNIT [5 CR.]",
      perMonthBusinessCommission: "₹5,00,000",
      total12Months: "12",
      totalAmountReceived: "6000000",
      totalSupermarketSaleCommission: "5%",
      monthlyStatus: [
        { month: 1, status: "paid" },
        { month: 2, status: "paid" },
        { month: 3, status: "paid" },
        { month: 4, status: "paid" },
        { month: 5, status: "paid" },
        { month: 6, status: "paid" },
        { month: 7, status: "paid" },
        { month: 8, status: "paid" },
        { month: 9, status: "paid" },
        { month: 10, status: "pending" },
        { month: 11, status: "pending" },
        { month: 12, status: "pending" },
      ],
    },
    {
      id: 10,
      srNo: 10,
      supermarketPartnerUnits: "10000 UNIT [10 CR.]",
      perMonthBusinessCommission: "₹10,00,000",
      total12Months: "12",
      totalAmountReceived: "12000000",
      totalSupermarketSaleCommission: "5%",
      monthlyStatus: [
        { month: 1, status: "paid" },
        { month: 2, status: "paid" },
        { month: 3, status: "paid" },
        { month: 4, status: "paid" },
        { month: 5, status: "pending" },
        { month: 6, status: "pending" },
        { month: 7, status: "pending" },
        { month: 8, status: "pending" },
        { month: 9, status: "pending" },
        { month: 10, status: "pending" },
        { month: 11, status: "pending" },
        { month: 12, status: "pending" },
      ],
    },
    {
      id: 11,
      srNo: 11,
      supermarketPartnerUnits: "25000 UNIT [25 CR.]",
      perMonthBusinessCommission: "₹25,00,000",
      total12Months: "12",
      totalAmountReceived: "30000000",
      totalSupermarketSaleCommission: "3%",
      monthlyStatus: [
        { month: 1, status: "paid" },
        { month: 2, status: "paid" },
        { month: 3, status: "paid" },
        { month: 4, status: "paid" },
        { month: 5, status: "pending" },
        { month: 6, status: "pending" },
        { month: 7, status: "pending" },
        { month: 8, status: "pending" },
        { month: 9, status: "pending" },
        { month: 10, status: "pending" },
        { month: 11, status: "pending" },
        { month: 12, status: "pending" },
      ],
    },
    {
      id: 12,
      srNo: 12,
      supermarketPartnerUnits: "50000 UNIT [50 CR.]",
      perMonthBusinessCommission: "₹50,00,000",
      total12Months: "12",
      totalAmountReceived: "60000000",
      totalSupermarketSaleCommission: "3%",
      monthlyStatus: [
        { month: 1, status: "paid" },
        { month: 2, status: "paid" },
        { month: 3, status: "paid" },
        { month: 4, status: "paid" },
        { month: 5, status: "pending" },
        { month: 6, status: "pending" },
        { month: 7, status: "pending" },
        { month: 8, status: "pending" },
        { month: 9, status: "pending" },
        { month: 10, status: "pending" },
        { month: 11, status: "pending" },
        { month: 12, status: "pending" },
      ],
    },
    {
      id: 13,
      srNo: 13,
      supermarketPartnerUnits: "1 LAKH UNIT [100 CR.]",
      perMonthBusinessCommission: "₹1,00,00,000",
      total12Months: "12",
      totalAmountReceived: "120000000",
      totalSupermarketSaleCommission: "3%",
      monthlyStatus: [
        { month: 1, status: "paid" },
        { month: 2, status: "paid" },
        { month: 3, status: "paid" },
        { month: 4, status: "paid" },
        { month: 5, status: "pending" },
        { month: 6, status: "pending" },
        { month: 7, status: "pending" },
        { month: 8, status: "pending" },
        { month: 9, status: "pending" },
        { month: 10, status: "pending" },
        { month: 11, status: "pending" },
        { month: 12, status: "pending" },
      ],
    },
  ];

  // Calculate received amount for each row
  const processedData = samplePromoterData.map((item) => {
    const paidCount = item.monthlyStatus.filter(
      (month) => month.status === "paid"
    ).length;
    const monthlyAmount = parseInt(
      item.perMonthBusinessCommission.replace(/[^0-9]/g, "")
    );
    const receivedAmount = paidCount * monthlyAmount;
    const totalAmount = parseInt(item.totalAmountReceived);

    return {
      ...item,
      receivedAmount,
      totalAmount,
      paidCount,
    };
  });

  // Define columns for the table
  const columns = [
    {
      key: "srNo",
      header: "Sr. No.",
      render: (value) => (
        <div className="flex items-center justify-center">
          <span className="w-5 sm:w-6 h-5 sm:h-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
            {value}
          </span>
        </div>
      ),
    },
    {
      key: "supermarketPartnerUnits",
      header: "Supermart Partner Units Matching Business L & R",
      render: (value) => (
        <div className="text-[12px] sm:text-sm font-medium text-gray-600">
          {value}
        </div>
      ),
    },
    {
      key: "perMonthBusinessCommission",
      header: "Per Month Business Commission",
      render: (value) => (
        <div className="flex items-center gap-1">
          <span className="text-[12px] sm:text-sm font-semibold text-green-600">
            {value}
          </span>
        </div>
      ),
    },
    {
      key: "total12Months",
      header: "Total (12 Month)",
      render: (value) => (
        <div className="flex items-center gap-1 justify-center">
          <Calendar className="w-3 h-3 text-blue-500" />
          <span className="text-[12px] sm:text-sm font-semibold text-blue-600">
            {value}
          </span>
        </div>
      ),
    },
    {
      key: "monthlyStatus",
      header: "Monthly Status",
      render: (value) => (
        <div className="flex flex-wrap gap-1 justify-center max-w-[200px]">
          {value.map((month) => (
            <div
              key={month.month}
              className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold border-2 ${
                month.status === "paid"
                  ? "bg-green-100 border-green-500 text-green-700"
                  : "bg-orange-100 border-orange-500 text-orange-700"
              }`}
            >
              {month.status === "paid" ? (
                <Check className="w-2.5 h-2.5 text-green-600" />
              ) : (
                "P"
              )}
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "totalAmountReceived",
      header: "Total Amount Received",
      render: (value, item) => (
        <div className="text-center">
          <div className="text-[12px] sm:text-sm font-medium">
            <span className="text-green-600">₹{item.receivedAmount.toLocaleString()}</span>
            <span className="text-gray-400 mx-1">/</span>
            <span className="text-purple-600">₹{item.totalAmount.toLocaleString()}</span>
          </div>
          <div className="text-xs text-gray-500">
            ({item.paidCount}/12 months)
          </div>
        </div>
      ),
    },
    {
      key: "totalSupermarketSaleCommission",
      header: "Total Supermart Sale Commission",
      render: (value) => (
        <div className="flex items-center gap-1 justify-center">
          <TrendingUp className="w-3 h-3 text-indigo-500" />
          <span className="text-[12px] sm:text-sm font-semibold text-indigo-600">
            {value}
          </span>
        </div>
      ),
    },
  ];

  // Filter data based on status
  const filteredData = useMemo(() => {
    if (!statusFilter) return processedData;
    return processedData.filter((item) => {
      if (statusFilter === "completed") {
        return item.paidCount === 12;
      } else if (statusFilter === "active") {
        return item.paidCount > 0 && item.paidCount < 12;
      } else if (statusFilter === "pending") {
        return item.paidCount === 0;
      }
      return true;
    });
  }, [statusFilter, processedData]);

  // Calculate stats
  const stats = {
    totalPlans: processedData.length,
    activePlans: processedData.filter(
      (item) => item.paidCount > 0 && item.paidCount < 12
    ).length,
    completedPlans: processedData.filter((item) => item.paidCount === 12)
      .length,
    totalEarnings: processedData.reduce(
      (sum, item) => sum + item.receivedAmount,
      0
    ),
  };

  // Export configuration for DataTable
  const exportConfig = {
    filename: "promoter-plan-report",
    title: "Stayfine Business Promoter Plan & Payout Model Report",
    searchPlaceholder: "Search promoter plans...",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl sm:px-2 py-0.5 lg:py-2">
      <div className="w-full mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between">

        {/* Header */}
        <div className="mb-3 md:mb-5">
          <h1 className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-xl font-semibold text-gray-700">
            Stayfine Business Promoter Plan & Payout Model
          </h1>
          <p className="text-[11px] sm:text-[12px] md:text-[13px] lg:text-[15px] text-gray-600 mt-1">
            Track your promoter plan progress and monthly payouts
          </p>
        </div>

        {/* Stats Cards and Filter */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-2">
            <div className="flex flex-col items-center justify-center">
              <p className="text-[11px] md:text-[12px] lg:text-[13px] font-medium text-gray-600">
                Total Plans
              </p>
              <p className="text-[15px] md:text-[18px] lg:text-[20px] font-bold text-gray-900">
                {stats.totalPlans}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-2">
            <div className="flex flex-col items-center justify-center">
              <p className="text-[11px] md:text-[12px] lg:text-[13px] font-medium text-gray-600">
                Total Earnings
              </p>
              <p className="text-[15px] md:text-[18px] lg:text-[20px] font-bold text-purple-600">
                ₹{stats.totalEarnings.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        </div>

        {/* Data Table */}
        <DataTable
          data={filteredData}
          columns={columns}
          searchable={true}
          exportable={false}
          selectable={false}
          maxHeight="600px"
          exportConfig={exportConfig}
        />
      </div>
    </div>
  );
};

export default PromoterPlanPage;