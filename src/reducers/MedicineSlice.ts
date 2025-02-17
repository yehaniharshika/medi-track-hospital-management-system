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
    extraReducers: (builder) => {
        builder
            .addCase(saveMedicine.fulfilled, (state, action) => {
                state.push(action.payload);
            })

            .addCase(saveMedicine.pending, (_, action) => {
                console.error("Pending save Medicine",action.payload);
            })

            .addCase(saveMedicine.rejected, (_, action) => {
                console.error("Failed to save Medicine:", action.payload);
            });

        builder
            .addCase(deleteMedicine.rejected, (_, action) => {
                console.error("Failed to delete Medicine:", action.payload);
            })

            .addCase(deleteMedicine.pending, (_, action) => {
                console.log("Pending delete Medicine",action.payload);
            })

            .addCase(deleteMedicine.fulfilled, (state, action) => {
                return state = state.filter((medicine:Medicine)=> medicine.medicineId !== action.payload.medicineId);
            });

        builder
            .addCase(updateMedicine.rejected, (_, action) => {
                console.error("Failed to update Medicine:", action.payload);
            })

            .addCase(updateMedicine.fulfilled, (state, action) => {
                const medicine = state.find((medicine:Medicine) => medicine.medicineId === action.payload.medicineId);
                if (medicine) {
                    medicine.medicineName = action.payload.medicineName;
                    medicine.brand = action.payload.brand;
                    medicine.medicineImg = action.payload.medicineImg;
                    medicine.dosage_form = action.payload.dosage_form;
                    medicine.unit_price = action.payload.unit_price;
                    medicine.quantity_in_stock = action.payload.quantity_in_stock;
                    medicine.expiry_date = action.payload.expiry_date;
                }
            })

            .addCase(updateMedicine.pending, (_, action) => {
                console.log("Pending update Medicine:", action.payload);
            });

        builder
            .addCase(getMedicines.fulfilled, (_, action) => {
                return action.payload;
            })
            .addCase(getMedicines.pending, (_, action) => {
                console.log("Pending get Medicine:", action.payload);
            })
            .addCase(getMedicines.rejected, (_, action) => {
                console.error("Failed to get Medicines:", action.payload);
            })

    }
});

export const {addedMedicine, updatedMedicine, deletedMedicine} = medicineSlice.actions;
export default medicineSlice.reducer;