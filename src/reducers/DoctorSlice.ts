import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Doctor} from "../models/Doctor.ts";
import axios from "axios";

export const initialState: Doctor[] = [];

const api = axios.create({
    baseURL : "http://localhost:3003/doctor",
})

export const saveDoctor = createAsyncThunk(
    "doctor/saveDoctor",
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

export const updateDoctor = createAsyncThunk(
    'doctor/updateDoctor',
    async (formData : FormData) => {
        try {
            const response = await api.put(`/update/${formData.get('doctorId')}`, formData);
            return response.data;
        }catch (error){
            console.error("Error updating Doctor:", error);
            throw error;
        }
    }
);

export const deleteDoctor = createAsyncThunk(
    'doctor/deleteDoctor',
    async (doctorId : string) => {
        try {
            const response = await api.delete(`/delete/${doctorId}`);
            return response.data;
        }catch (error){
            console.error("Error deleting Doctor:", error);
        }
    }
);

export const getDoctors = createAsyncThunk(
    'doctor/getDoctors',
    async () => {
        try {
            const response = await api.get('/view');
            return response.data;
        }catch (error){
            console.error("Error:", error);
        }
    }
);

const doctorSlice = createSlice({
    name: 'doctor',
    initialState,
    reducers: {
        addDoctor: (state, action: PayloadAction<Doctor>) => {
            state.push(action.payload);
        },

        updatedDoctor(state, action: PayloadAction<Doctor>) {
            const index = state.findIndex(
                (doctor) => doctor.doctorId === action.payload.doctorId);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },

        deletedDoctor(state, action: PayloadAction<string>) {
            return  state.filter((doctor) => doctor.doctorId !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveDoctor.fulfilled, (state, action) => {
                state.push(action.payload);
            })

            .addCase(saveDoctor.pending, (_, action) => {
                console.error("Pending save Doctor ",action.payload);
            })

            .addCase(saveDoctor.rejected, (_, action) => {
                console.error("Failed to save Doctor: ", action.payload);
            });

        builder
            .addCase(deleteDoctor.rejected, (_, action) => {
                console.error("Failed to delete Doctor:", action.payload);
            })

            .addCase(deleteDoctor.pending, (_, action) => {
                console.log("Pending delete Doctor",action.payload);
            })

            .addCase(deleteDoctor.fulfilled, (state, action) => {
                return state = state.filter((doctor:Doctor)=> doctor.doctorId !== action.payload.doctorId);
            });

        builder
            .addCase(updateDoctor.rejected, (_, action) => {
                console.error("Failed to update Doctor:", action.payload);
            })

            .addCase(updateDoctor.fulfilled, (state, action) => {
                const doctor = state.find((doctor:Doctor) => doctor.doctorId === action.payload.doctorId);
                if (doctor) {
                    doctor.doctorName = action.payload.doctorName;
                    doctor.specialty = action.payload.specialty;
                    doctor.doctorImg = action.payload.doctorImg;
                    doctor.gender = action.payload.gender;
                    doctor.contactNumber = action.payload.contactNumber;
                    doctor.email = action.payload.email;
                    doctor.departmentId = action.payload.departmentId;
                }
            })

            .addCase(updateDoctor.pending, (_, action) => {
                console.log("Pending update Doctor:", action.payload);
            });

        builder
            .addCase(getDoctors.fulfilled, (_, action) => {
                return action.payload;
            })
            .addCase(getDoctors.pending, (_, action) => {
                console.log("Pending get Doctors:", action.payload);
            })
            .addCase(getDoctors.rejected, (_, action) => {
                console.error("Failed to get Doctors:", action.payload);
            })

    }
});

export const {addDoctor,updatedDoctor,deletedDoctor} = doctorSlice.actions;
export default doctorSlice.reducer;