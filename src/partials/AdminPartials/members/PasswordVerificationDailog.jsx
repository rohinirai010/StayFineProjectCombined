import React, {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    Button,
    Input,
  } from "../../../components/CommonCard";

// Password verification dialog component
const PasswordVerificationDialog = ({ isOpen, onClose, onConfirm }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleVerify = () => {
    // For demo purposes, using a static password "admin123"
    if (password === "admin123") {
      onConfirm();
      onClose();
      setPassword("");
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Admin Verification Required</DialogTitle>
        </DialogHeader>
        <div className="">
          <div className="space-y-2">
            <label className="text-sm font-medium ">Enter Admin Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleVerify()}
              className="w-full"
            />
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="cursor-pointer text-gray-200 bg-gray-500 hover:bg-gray-800 dark:hover:bg-gray-100  dark:hover:text-gray-800">Cancel</Button>
          <Button onClick={handleVerify} className="cursor-pointer bg-blue-500 text-white hover:bg-blue-600">Verify</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


export default PasswordVerificationDialog;