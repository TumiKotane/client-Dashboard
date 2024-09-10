import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// Create the Redux store with the specified reducer
export const store = configureStore({
    reducer: {
        auth: authReducer, // Add the auth slice reducer here
    },
});

// Define the RootState type from the store's state
export type RootState = ReturnType<typeof store.getState>;

// Define the AppDispatch type from the store's dispatch function
export type AppDispatch = typeof store.dispatch;
