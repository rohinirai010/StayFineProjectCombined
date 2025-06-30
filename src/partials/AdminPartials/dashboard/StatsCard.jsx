import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "../../components/CommonCard";
import { ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/CommonTooltip";

const StatsCard = ({ title, stats, className = '' }) => {
  // Helper function to format numbers with commas and decimals if needed
  const formatValue = (value) => {
    if (typeof value === 'string' && !isNaN(value)) {
      const num = parseFloat(value);
      return num.toLocaleString('en-US', {
        minimumFractionDigits: num % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 2
      });
    }
    return value;
  };

  // Helper to determine if a value represents currency
  const isCurrency = (label, value) => {
    return (
      label.toLowerCase().includes('balance') ||
      label.toLowerCase().includes('amount') ||
      label.toLowerCase().includes('turnover') ||
      label.toLowerCase().includes('earning') ||
      (typeof value === 'string' && value.includes('.00'))
    );
  };

  // Helper to determine if a value represents a percentage
  const isPercentage = (value) => {
    return typeof value === 'string' && value.includes('%');
  };

  // Helper to determine if a value represents a date
  const isDate = (value) => {
    return typeof value === 'string' && 
           (value.includes('/') || value.includes('-')) && 
           value.length > 8;
  };

  return (
    <Card className={`
      transform transition-all duration-300 
      hover:translate-y-[-4px] hover:shadow-lg
      rounded-xl bg-white dark:bg-gray-900
      border border-gray-100 dark:border-gray-800 
      ${className}
    `}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Details for {title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid gap-4">
          {Object.entries(stats).map(([label, value]) => (
            <div key={label} className="flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {label}
                </span>
                {(label.toLowerCase().includes('growth') || label.toLowerCase().includes('ratio')) && (
                  <span className={`
                    flex items-center text-sm font-medium
                    ${Number(value) > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}
                  `}>
                    {Number(value) > 0 ? (
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 mr-1" />
                    )}
                    {value}
                  </span>
                )}
              </div>
              <div className={`
                text-2xl font-bold tracking-tight
                ${isCurrency(label, String(value)) ? 'text-emerald-600 dark:text-emerald-400' : ''}
                ${isPercentage(String(value)) ? 'text-violet-600 dark:text-violet-400' : ''}
                ${isDate(String(value)) ? 'text-gray-700 dark:text-gray-300 text-base' : ''}
                ${!isCurrency(label, String(value)) && !isPercentage(String(value)) && !isDate(String(value)) ? 'text-gray-900 dark:text-gray-100' : ''}
              `}>
                {isCurrency(label, String(value)) && '₹'}
                {formatValue(value)}
              </div>
              {isCurrency(label, String(value)) && (
                <div className="mt-1 h-1 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 dark:bg-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (Number(value) / 1000000) * 100)}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;