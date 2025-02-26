import {Payment} from "../models/Payment.ts";
import axios from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const initialState: Payment[] = [];

const api = axios.create({
    baseURL: "http://localhost:3003/payment",
});

export const createPayment = createAsyncThunk(
    'payment/savePayment',
    async (paymentData: Payment) => {
        try {
            const response = await api.post('/create', paymentData);
            return response.data;
        } catch (error) {
            console.error('Error creating payment: ', error);
            throw error;
        }
    }
);

export const getPayments = createAsyncThunk(
    'payment/getPayments',
    async () => {
        try {
            const response = await api.get('/view');
            return response.data;
        }catch (error){
            console.error('Error getting payment: ', error);
        }
    }
);

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        createdPayment(state, action: PayloadAction<Payment>) {
            state.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPayment.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(createPayment.pending, (state) => {
                console.log("Pending create payment");
                // Always return the current state
                return state;
            })
            .addCase(createPayment.rejected, (state, action) => {
                console.error("Failed to create payment:", action.error);
                // Always return the current state
                return state;
            })
            .addCase(getPayments.fulfilled, (state, action) => {
                // Ensure action.payload is an array, else return current state
                return Array.isArray(action.payload) ? action.payload : state;
            })
            .addCase(getPayments.pending, (state) => {
                console.log("Pending get Payments");
                return state;
            })
            .addCase(getPayments.rejected, (state, action) => {
                console.error("Failed to get Payments: ", action.error);
                return state;
            });
    }
});


export const {createdPayment} = paymentSlice.actions;
export default paymentSlice.reducer;
