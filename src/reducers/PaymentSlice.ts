import {Payment} from "../models/Payment.ts";
import axios from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const initialState: Payment[] = [];

const api = axios.create({
    baseURL: "http://localhost:3003/payment",
});

export const createPayment = createAsyncThunk(
    'payment/savePayment',
    async (paymentData: Payment) => {
        const token = localStorage.getItem("accessToken");

        try {
            const response = await api.post('/create', paymentData,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            Swal.fire({
                title: "✅ Success!",
                html: '<p class="swal-text">Payment Successful!</p>', // Added class for styling
                icon: "success",
                confirmButtonText: "OK",
                background: "white",
                color: "black",
                confirmButtonColor: "green",
                timer: 3000, // Auto-close after 10 seconds
                width: "450px", // Small window size
                customClass: {
                    title: "swal-title",
                    popup: "swal-popup",
                    confirmButton: "swal-button",
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error creating payment: ', error);
            Swal.fire({
                title: "Error!",
                html: '<p class="swal-text">Failed Payment!</p>', // Added class for styling
                icon: "error",
                confirmButtonText: "OK",
                background: "white",
                color: "black",
                confirmButtonColor: "green",
                timer: 3000,
                width: "420px",
                customClass: {
                    title: "swal-title",
                    popup: "swal-popup",
                    confirmButton: "swal-button",
                }
            });
        }
    }
);

export const getPayments = createAsyncThunk(
    'payment/getPayments',
    async () => {
        const token = localStorage.getItem("accessToken");

        try {
            const response = await api.get('/view',{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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
