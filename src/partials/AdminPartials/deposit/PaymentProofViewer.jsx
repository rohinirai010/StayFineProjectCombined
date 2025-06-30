import React, { useState } from 'react';
import { Eye, X, Check, RotateCcw } from 'lucide-react';

const PaymentProofViewer = ({ document, status, onApprove, onReject }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showRemarkInput, setShowRemarkInput] = useState(false);
  const [remark, setRemark] = useState("");

  const handleApprove = () => {
    onApprove();
    setIsOpen(false);
  };

  const handleRejectClick = () => {
    setShowRemarkInput(true);
  };

  const handleRemarkSubmit = () => {
    if (remark.trim()) {
      onReject(remark);  // Pass the remark to parent component
      setRemark("");
      setShowRemarkInput(false);
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setShowRemarkInput(false);
    setRemark("");
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center p-[2px] text-blue-500 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-200 dark:hover:bg-blue-100 cursor-pointer"
      >
        <Eye className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl m-4 animate-modalEntry">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Payment Proof</h3>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowRemarkInput(false);
                  setRemark("");
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-4 flex justify-center">
                <img
                  src={document}
                  alt="Payment proof"
                  className="max-w-full h-auto rounded-lg shadow-lg"
                  style={{ maxHeight: '60vh' }}
                />
              </div>

              {!showRemarkInput && (status === 'Pending' || status === 'Rejected') && (
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleApprove}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
                  >
                    {status === 'Rejected' ? <RotateCcw className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                    {status === 'Rejected' ? 'Re-approve' : 'Approve'}
                  </button>
                  {status === 'Pending' && (
                    <button
                      onClick={handleRejectClick}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2"
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
                    className="w-full px-3 text-gray-900 py-2 border rounded-lg focus:ring focus:ring-blue-500"
                    rows={3}
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-gray-700 bg-gray-400 rounded-lg hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleRemarkSubmit}
                      disabled={!remark.trim()}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
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

export default PaymentProofViewer;