import React, { useState } from 'react';
import { Eye, X, Check, RotateCcw } from 'lucide-react';
import { IoRemoveCircle } from 'react-icons/io5';

const DocumentViewer = ({ document, status, onApprove, onReject, onAddRemark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showRemarkInput, setShowRemarkInput] = useState(false);
  const [remark, setRemark] = useState('');

  const handleReject = () => {
    setShowRemarkInput(true);
  };

  const handleApprove = () => {
    onApprove();
    setIsOpen(false);
  };

  const handleRemarkSubmit = () => {
    onReject();
    onAddRemark(remark);
    setRemark('');
    setShowRemarkInput(false);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-center">
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center p-[2px] text-blue-500 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-200 dark:hover:bg-blue-100 cursor-pointer"
      >
        <Eye className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 bg-opacity-50 backdrop-blur-xs ">
          <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl m-4 animate-modalEntry">
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
              <h3 className="text-lg font-semibold">Document Preview</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
              >
                          <IoRemoveCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-4 flex justify-center">
                <img
                  src={document}
                  alt="Document preview"
                  className="max-w-full h-auto rounded-lg shadow-lg"
                  style={{ maxHeight: '60vh' }}
                />
              </div>

              {(status === 'Pending' || status === 'Rejected') && !showRemarkInput && (
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleApprove}
                    className="px-2 sm:px-4 py-1 sm:py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2 cursor-pointer"
                  >
                    {status === 'Rejected' ? <RotateCcw className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                    {status === 'Rejected' ? 'Re-approve' : 'Approve'}
                  </button>
                  {status === 'Pending' && (
                    <button
                      onClick={handleReject}
                      className="px-2 sm:px-4 py-1 sm:py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                      Reject
                    </button>
                  )}
                </div>
              )}

              {showRemarkInput && (
                <div className="mt-4">
                  <textarea
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    placeholder="Enter rejection reason..."
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    rows={3}
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => setShowRemarkInput(false)}
                      className="px-2 sm:px-4 py-1 sm:py-2 text-gray-600 dark:bg-gray-200 dark:hover:bg-gray-300 rounded-lg hover:text-gray-900 dark:text-gray-600 dark:hover:text-gray-800 cursor-pointer font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleRemarkSubmit}
                      disabled={!remark.trim()}
                      className="px-2 sm:px-4 py-1 sm:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentViewer;