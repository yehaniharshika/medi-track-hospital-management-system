import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {User} from "../models/User.ts";

// Define the AuthState structure
export interface AuthState {
    users: User[];
    isLoggedIn: boolean;
    currentUser: User | null;
}

// Initial state
const initialState: AuthState = {
    users: [],
    isLoggedIn: false,
    currentUser: null,
};

// Create the slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signup: (state, action: PayloadAction<User>) => {
            const existingUser = state.users.find((u) => u.email === action.payload.email);

            if (existingUser) {
                throw new Error('An account with this email already exists.');
            }

            state.users.push(action.payload);
        },
        login: (state, action: PayloadAction<{ email: string; password: string }>) => {
            const { email, password } = action.payload;
            const user = state.users.find((u) => u.email === email);

            if (!user) {
                throw new Error('No account found with this email.');
            }

            if (user.password !== password) {
                throw new Error('The password you entered is incorrect.');
            }

            state.isLoggedIn = true;
            state.currentUser = user;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.currentUser = null;
        },
        resetPassword: (state, action: PayloadAction<{ email: string; newPassword: string }>) => {
            const { email, newPassword } = action.payload;
            const user = state.users.find((u) => u.email === email);

            if (!user) {
                throw new Error('No account found with this email.');
            }

            user.password = newPassword;
        },
    },
});

// Export actions and reducer
export const { signup, login, logout, resetPassword } = authSlice.actions;
export default authSlice.reducer;
