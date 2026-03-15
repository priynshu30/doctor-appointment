import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import appointmentReducer from './features/appointmentSlice';
import serviceReducer from './features/serviceSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appointment: appointmentReducer,
    service: serviceReducer,
  },
});

export default store;
