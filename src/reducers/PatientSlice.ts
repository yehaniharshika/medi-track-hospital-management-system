import {Patient} from "../models/Patient.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

export const initialState: Patient[] = [];

const api = axios.create({
    baseURL : "http://localhost:3003/patient"
});

export const savePatient = createAsyncThunk(
    'patient/savePatient',
    async (formData: FormData) => {
        const token = localStorage.getItem("accessToken");

        try {
            const response = await api.post('/add', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            Swal.fire({
                title: "✅ Success!",
                html: '<p class="swal-text">Patient saved successfully.</p>', // Added class for styling
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
            console.log("Error saving patient:", error);
            Swal.fire({
                title: "Error!",
                html: '<p class="swal-text">Failed to save Patient.</p>', // Added class for styling
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

export const updatePatient = createAsyncThunk(
    'patient/updatePatient',
    async (formData: FormData) => {
        const token = localStorage.getItem("accessToken");

        try {
            const response = await api.put(`/update/${formData.get('patientId')}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            Swal.fire({
                title: "✅ Success!",
                html: '<p class="swal-text">Patient updated successfully.</p>', // Added class for styling
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
            console.error("Error updating patient:", error);
            Swal.fire({
                title: "❌ Error!",
                html: '<p class="swal-text">Failed to update Patient.</p>', // Added class for styling
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
        }
    }
);

export const deletePatient = createAsyncThunk(
    'patient/deletePatient',
    async (patientId : string) =>{
        const token = localStorage.getItem("accessToken");

        const result = await Swal.fire({
            title: "⚠️ Are you sure?",
            html: '<p class="swal-text">Do you really want to delete this Patient?</p>',
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

        if(result.isConfirmed) {
            try {
                const response = await api.delete(`/delete/${patientId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                // Show success message
                Swal.fire({
                    title: "✅ Deleted!",
                    html: '<p class="swal-text">Successfully deleted Patient.</p>',
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
                // Show error message
                Swal.fire({
                    title: "❌ Error!",
                    html: '<p class="swal-text">Failed to delete Patent.</p>',
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
                return console.log("error",error);
            }
        }

    }
);

export const getPatients = createAsyncThunk(
    'patient/getPatients',
    async () =>{
        const token = localStorage.getItem("accessToken");

        try {
            const response = await api.get('/view', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        }catch (error){
            return console.log("error",error);
        }
    }
)

const patientSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {
        addedPatient: (state, action: PayloadAction<Patient>) => {
            state.push(action.payload);
        },

        updatedPatient: (state, action: PayloadAction<Patient>) => {
            const index = state.findIndex(
                (patient) => patient.patientId === action.payload.patientId);

            if (index !== -1) {
                state[index] = action.payload;
            }
        },

        deletedPatient: (state, action: PayloadAction<string>) => {
            return state.filter((patient) => patient.patientId !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(savePatient.fulfilled, (state, action) => {
                state.push(action.payload);
            })

            .addCase(savePatient.pending, (_, action) => {
                console.error("Pending save Patient",action.payload);
            })

            .addCase(savePatient.rejected, (_, action) => {
                console.error("Failed to save Patient:", action.payload);
            });

        builder
            .addCase(deletePatient.rejected, (_, action) => {
                console.error("Failed to delete Patient:", action.payload);
            })

            .addCase(deletePatient.pending, (_, action) => {
                console.log("Pending delete Patient",action.payload);
            })

            .addCase(deletePatient.fulfilled, (state, action) => {
                return state = state.filter((patient:Patient)=> patient.patientId !== action.payload.patientId);
            });


        builder
            .addCase(updatePatient.rejected, (_, action) => {
                console.error("Failed to update Patient:", action.payload);
            })
            .addCase(updatePatient.fulfilled, (state, action) => {
                const patient = state.find((patient:Patient) => patient.patientId === action.payload.patientId);
                if (patient) {
                    patient.patientName = action.payload.patientName;
                    patient.age = action.payload.age;
                    patient.patientImg = action.payload.patientImg;
                    patient.addressLine1 = action.payload.addressLine1;
                    patient.addressLine2 = action.payload.addressLine2;
                    patient.postalCode = action.payload.postalCode;
                    patient.gender = action.payload.gender;
                    patient.contactNumber = action.payload.contactNumber;
                    patient.blood_type = action.payload.blood_type;
                    patient.chronic_diseases = action.payload.chronic_diseases;
                    patient.last_visit_date = action.payload.last_visit_date;
                }
            })
            .addCase(updatePatient.pending, (_, action) => {
                console.log("Pending update Patient:", action.payload);
            });

        builder
            .addCase(getPatients.fulfilled, (_, action) => {
                return action.payload;
            })
            .addCase(getPatients.pending, (_, action) => {
                console.log("Pending get Patient:", action.payload);
            })
            .addCase(getPatients.rejected, (_, action) => {
                console.error("Failed to get patients:", action.payload);
            })
    }
});

export const {addedPatient, updatedPatient, deletedPatient} = patientSlice.actions;
export default patientSlice.reducer;