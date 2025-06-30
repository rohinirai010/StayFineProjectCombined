import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../ReduxStateManagement/user/slices/authSlice';

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => !!state.auth.token);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(loadUser()).unwrap();
      } catch (error) {
        console.log("Authentication check failed");
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [dispatch]);

  if (loading) {
    // Show a loading indicator while checking auth state
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/user/login" />;
};

export default PrivateRoute;