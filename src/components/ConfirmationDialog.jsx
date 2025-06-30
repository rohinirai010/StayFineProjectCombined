import React from 'react';
import { AlertTriangle } from 'lucide-react';
import "../css/additional.css"

const ConfirmationDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  actionType,
  memberData 
}) => {
  if (!isOpen) return null;

  const getActionColor = () => {
    switch (actionType) {
      case 'login':
        return 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700';
      case 'block':
        return 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700';
      case 'unblock':
        return 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700';
      case 'pin':
      case 'level':
        return 'bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700';
      default:
        return 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-96 rounded-lg bg-white p-6 dark:bg-gray-800 transform transition-all duration-200 ease-out scale-100 opacity-100 shadow-xl animate-modalEntry m-4 sm:m-0">
        <div className="mb-4 flex items-center gap-3">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
        
        <div className="mb-6 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Member ID:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {memberData?.memberId}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Name:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {memberData?.fullname}
            </span>
          </div>

          {/* Additional Details for View Transaction */}
          {memberData?.extraDetails && (
            <div className="mt-4 space-y-2 border-t pt-4 dark:border-gray-700">
              {memberData.extraDetails.map((detail, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{detail.label}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            {message}
          </p>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
          >
            Close
          </button>
          {actionType !== 'login' && (
            <button
              onClick={onConfirm}
              className={`rounded-md px-4 py-2 text-sm text-white transition-colors duration-200 cursor-pointer ${getActionColor()}`}
            >
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;