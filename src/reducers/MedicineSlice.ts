import {Medicine} from "../models/Medicine.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";


export const initialState: Medicine[] = [];

const api = axios.create({
    baseURL : "http://localhost:3003/medicine"
});

export const saveMedicine = createAsyncThunk(
    'medicine/saveMedicine',
    async (formData : FormData) => {
        const token = localStorage.getItem("accessToken");
        try {
            const response = await api.post('/add' , formData , {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            Swal.fire({
                title: "✅ Success!",
                html: '<p class="swal-text">Medicine saved successfully.</p>', // Added class for styling
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
        }catch(error) {
            console.error("Error saving Medicine:", error);
            Swal.fire({
                title: "Error!",
                html: '<p class="swal-text">Failed to save Medicine.</p>', // Added class for styling
                icon: "error",
                confirmButtonText: "OK",
                background: "white",
                color: "black",
                confirmButtonColor: "green",
                timer: 3000, // Auto-close after 10 seconds
                width: "420px", // Small window size
                customClass: {
                    title: "swal-title",
                    popup: "swal-popup",
                    confirmButton: "swal-button",
                }
            });
            throw error;
        }
    }
);

export const updateMedicine = createAsyncThunk(
    'medicine/updateMedicine',
    async (formData : FormData) => {
        const token = localStorage.getItem("accessToken");

        try {
            const response = await api.put(`/update/${formData.get('medicineId')}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            Swal.fire({
                title: "✅ Success!",
                html: '<p class="swal-text">Medicine updated successfully.</p>', // Added class for styling
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
        }catch (error){
            console.error("Error updating Medicine:", error);
            Swal.fire({
                title: "❌ Error!",
                html: '<p class="swal-text">Failed to update Medicine.</p>', // Added class for styling
                icon: "error",
                confirmButtonText: "OK",
                background: "white",
                color: "black",
                confirmButtonColor: "green",
                timer: 3000, // Auto-close after 10 seconds
                width: "420px", // Small window size
                customClass: {
                    title: "swal-title",
                    popup: "swal-popup",
                    confirmButton: "swal-button",
                }
            });
            throw error;
        }
    }
);

export const deleteMedicine = createAsyncThunk(
    'medicine/deleteMedicine',
    async (medicineId : string) => {
        const token = localStorage.getItem("accessToken");
        const result = await Swal.fire({
            title: "⚠️ Are you sure?",
            html: '<p class="swal-text">Do you really want to delete this Medicine?</p>',
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "No, Cancel",
            background: "white",
            color: "black",
            confirmButtonColor: "red",
            cancelButtonColor: "gray",
            width: "450px",
            customClass: {
                title: "swal-title",
                popup: "swal-popup",
                confirmButton: "swal-button",
                cancelButton: "swal-cancel-button"
            }
        });

        if (result.isConfirmed) {
            try {
                const response = await api.delete(`/delete/${medicineId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                // Show success message
                Swal.fire({
                    title: "✅ Deleted!",
                    html: '<p class="swal-text">Successfully deleted Medicine.</p>',
                    icon: "success",
                    confirmButtonText: "OK",
                    background: "white",
                    color: "black",
                    confirmButtonColor: "green",
                    timer: 3000,
                    width: "450px",
                    customClass: {
                        title: "swal-title",
                        popup: "swal-popup",
                        confirmButton: "swal-button",
                    }
                });
                return response.data;
            }catch (error){
                Swal.fire({
                    title: "❌ Error!",
                    html: '<p class="swal-text">Failed to delete Medicine.</p>',
                    icon: "error",
                    confirmButtonText: "OK",
                    background: "white",
                    color: "black",
                    confirmButtonColor: "red",
                    timer: 3000,
                    width: "450px",
                    customClass: {
                        title: "swal-title",
                        popup: "swal-popup",
                        confirmButton: "swal-button",
                    }
                });
                console.error("Error deleting Medicine:", error);
            }
        }

    }
);

export const getMedicines = createAsyncThunk(
    'medicine/getMedicines',
    async () => {
        const token = localStorage.getItem("accessToken");

        try {
            const response = await api.get('/view', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
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