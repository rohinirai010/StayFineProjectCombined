import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import authReducer from './slices/authSlice';
import adminAuthReducer from '../adminSlices/authSlice'

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  adminAuth: adminAuthReducer,
});

// Configure store with root reducer
export const store = configureStore({
  reducer: rootReducer,
});
