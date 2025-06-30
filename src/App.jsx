import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";

import "./css/style.css";

import "./i18n";

//main website imports
import Home from "./pages/MainWebsitePages/Home";

// User Side imports
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PasswordRecovery from "./pages/PasswordRecovery";
import Welcome from "./pages/Welcome";
import { loadUser } from "./ReduxStateManagement/user/slices/authSlice";
import NetworksPage from "./pages/Networks";
import PayoutPage from "./pages/PayoutPage";
import EWalletPage from "./pages/EwalletPage";
import PromoterPlanPage from "./pages/PromoterPlanPage";

//Admin Side imports
import AdminDashboard from "./pages/AdminPages/AdminDashboard";
import AdminLogin from "./pages/AdminPages/AdminLogin";
import MembersList from "./pages/AdminPages/Members/MembersList";
import CreateSubAdmin from "./pages/AdminPages/subAdmin/CreateSubAdmin";
import AddQRCode from "./pages/AdminPages/Deposit/AddQRCode";
import DepositHistory from "./pages/AdminPages/Deposit/DepositHistory";
import WithdrawalHistory from "./pages/AdminPages/Withdrawal/WithdrawalHistory";
import DailyROIReport from "./pages/AdminPages/Reports/DailyROIReport";
import AffiliateProgramReport from "./pages/AdminPages/Reports/AffiliateProgramReport";
import DirectIncentiveBonus from "./pages/AdminPages/Reports/DirectIncentiveBonus";
import ParallelMiningBonusReport from "./pages/AdminPages/Reports/ParallelMiningBonusReport";
import OdlSetting from "./pages/AdminPages/Settings/OdlSetting";
import LevelSetting from "./pages/AdminPages/Settings/LevelSetting";
import AdminProtectedRoute from "./routes/AdminProtectedRoute.jsx";
import UserProtectedRoute from "./routes/UserProtectedRoute.jsx";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // Check authentication when app loads
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        {/* ----------------------------------- Main Website Routes ------------------------------------- */}
        <Route exact path="/" element={<Home />} />
        

        {/* ----------------------------------- Admin Panel Routes -------------------------------------- */}
        <Route exact path="/admin/login" element={<AdminLogin />} />
        
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        <Route 
          exact 
          path="/admin/members-list" 
          element={
              <MembersList />
          } 
        />

        <Route
          exact
          path="/admin/create-subadmin"
          element={
              <CreateSubAdmin />
          }
        />

        <Route 
          exact 
          path="/admin/add-qr" 
          element={
              <AddQRCode />
          } 
        />
        
        <Route
          exact
          path="/admin/deposit-history"
          element={
              <DepositHistory />
          }
        />

        <Route
          exact
          path="/admin/withdraw-history"
          element={
              <WithdrawalHistory />
          }
        />
 
        <Route 
          exact 
          path="/admin/daily-roi" 
          element={
              <DailyROIReport />
          } 
        />

        <Route 
          exact 
          path="/admin/direct-bonus" 
          element={
              <DirectIncentiveBonus />
          } 
        />

        <Route
          exact
          path="/admin/affiliate-program"
          element={
              <AffiliateProgramReport />
          }
        />

        <Route
          exact
          path="/admin/parallel-bonus-report"
          element={
              <ParallelMiningBonusReport />
          }
        />

        <Route 
          exact 
          path="/admin/odl-setting" 
          element={
              <OdlSetting />
          } 
        />
        
        <Route 
          exact 
          path="/admin/level-setting" 
          element={
              <LevelSetting />
          } 
        /> 

        {/* -------------------------------- User Panel Routes ----------------------------------------- */}

        <Route
          exact
          path="/user/dashboard"
          element={
            <UserProtectedRoute>
              <Dashboard />
            </UserProtectedRoute>
          }
        />

        <Route exact path="/user/login" element={<Login />} />
        <Route exact path="/password-recover" element={<PasswordRecovery />} />
        <Route exact path="/user/register" element={<Register />} />
        <Route exact path="/user/welcome" element={<Welcome />} />
        
        <Route 
          exact 
          path="/user/networks" 
          element={
              <NetworksPage />
          } 
        />
        
        <Route 
          exact 
          path="/user/e-wallet" 
          element={
              <EWalletPage />
          } 
        />
        
        <Route 
          exact 
          path="/user/plan" 
          element={
              <PromoterPlanPage />
          } 
        />
        
        <Route 
          exact 
          path="/user/withdrawal" 
          element={
              <PayoutPage />
          } 
        />
      </Routes>
    </>
  );
}

export default App;