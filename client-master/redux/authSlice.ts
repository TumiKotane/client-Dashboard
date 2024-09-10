import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define types for the state
interface User {
    id: string;
    email: string;
    // Add other user properties if needed
}

interface AuthState {
    user: User | null;
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
}

// comment out if bugging
export interface Users {
    id: string;
    email: string;
    role: string;
    // Add other user properties as needed
}

interface AuthState {
    user: User | null;
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
}

// Define initial state
const initialState: AuthState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Define types for the loginUser payload
interface LoginUserPayload {
    email: string;
    password: string;
}

// Async thunk for logging in the user
export const loginUser = createAsyncThunk<User, LoginUserPayload, { rejectValue: string }>(
    'user/loginUser',
    async (user, thunkAPI) => {
        try {
            const response = await axios.post('http://192.168.137.226:5000/login', {
                email: user.email,
                password: user.password,
            });
            return response.data;
        } catch (error: any) {
            if (error.response) {
                const message = error.response.data.msg;
                return thunkAPI.rejectWithValue(message);
            }
            return thunkAPI.rejectWithValue('An unknown error occurred');
        }
    }
);

// Async thunk for getting the current user (for authentication check)
export const getMe = createAsyncThunk<User, void, { rejectValue: string }>(
    'user/getMe',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('http://192.168.137.226:5000/me');
            return response.data;
        } catch (error: any) {
            if (error.response) {
                const message = error.response.data.msg;
                return thunkAPI.rejectWithValue(message);
            }
            return thunkAPI.rejectWithValue('An unknown error occurred');
        }
    }
);

// Create a slice for user authentication
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            // loginUser async thunk
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || '';
            })
            // getMe async thunk
            .addCase(getMe.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMe.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(getMe.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || '';
            });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
