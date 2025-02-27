// src/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define AuthState to store both tokens
interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Initialize state from localStorage
const initialState: AuthState = {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    status: 'idle',
    error: null,
};

// Async Thunk for User Login
export const loginUser = createAsyncThunk<{ accessToken: string; refreshToken: string }, { username: string; password: string }>(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3003/auth/login', credentials);
            const { accessToken, refreshToken } = response.data;

            // Store tokens in localStorage
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            // Return tokens
            return { accessToken, refreshToken };
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async Thunk for User Registration
export const registerUser = createAsyncThunk<void, { name: string; username: string; password: string; role: string }>(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            await axios.post('http://localhost:3003/auth/register', userData);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Create Auth Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.accessToken = null;
            state.refreshToken = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.status = 'succeeded';
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
