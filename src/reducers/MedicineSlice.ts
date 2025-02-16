import {Medicine} from "../models/Medicine.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

export const initialState: Medicine[] = [];

const api = axios.create({
    baseURL : "http://localhost:3003/medicine"
});

export const saveMedicine = createAsyncThunk(
    'medicine/saveMedicine',
    async (formData : FormData) => {
        try {
            const response = await api.post('/add' , formData , {
                headers: { "Content-Type": "multipart/form-data" }
            });
            return response.data;
        }catch(error) {
            console.error("Error saving Medicine:", error);
            throw error;
        }
    }
);

export const updateMedicine = createAsyncThunk(
    'medicine/updateMedicine',
    async (formData : FormData) => {
        try {
            const response = await api.put(`/update/${formData.get('medicineId')}`, formData);
            return response.data;
        }catch (error){
            console.error("Error updating Medicine:", error);
            throw error;
        }
    }
);

export const deleteMedicine = createAsyncThunk(
    'medicine/deleteMedicine',
    async (medicineId : string) => {
        try {
            const response = await api.delete(`/delete/${medicineId}`);
            return response.data;
        }catch (error){
            console.error("Error deleting Medicine:", error);
        }
    }
);

export const getMedicines = createAsyncThunk(
    'medicine/getMedicines',
    async () => {
        try {
            const response = await api.get('/view');
            return response.data;
        }catch (error){
            console.error("Error:", error);
        }
    }
)

const medicineSlice = createSlice({
    name: "medicine",
    initialState,
    reducers: {
        addedMedicine: (state, action: PayloadAction<Medicine>) => {
            state.push(action.payload);
        },

        updatedMedicine: (state, action: PayloadAction<Medicine>) => {
            const index = state.findIndex(
                (medicine) => medicine.medicineId === action.payload.medicineId
            );

            if (index !== -1){
                state[index] = action.payload;
            }
        },

        deletedMedicine: (state, action: PayloadAction<string>) => {
            return  state.filter((medicine) => medicine.medicineId !== action.payload);
        },
    },
});

export const {addedMedicine, updatedMedicine, deletedMedicine} = medicineSlice.actions;
export default medicineSlice.reducer;