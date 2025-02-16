import {Patient} from "../models/Patient.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

export const initialState: Patient[] = [];

const api = axios.create({
    baseURL : "http://localhost:3003/patient"
});

export const savePatient = createAsyncThunk(
    'patient/savePatient',
    async (formData: FormData) => {
        try {
            const response = await api.post('/add', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            return response.data;
        } catch (error) {
            console.log("Error saving patient:", error);
            throw error;
        }
    }
);

export const updatePatient = createAsyncThunk(
    'patient/updatePatient',
    async (formData: FormData) => {
        try {
            const response = await api.put(`/update/${formData.get('patientId')}`, formData);
            return response.data;
        } catch (error) {
            console.error("Error updating patient:", error);
            throw error; // Throw error to be handled by createAsyncThunk
        }
    }
);

export const deletePatient = createAsyncThunk(
    'patient/deletePatient',
    async (patientId : string) =>{
        try {
            const response = await api.delete(`/delete/${patientId}`);
            return response.data;
        }catch (error){
            return console.log("error",error);
        }
    }
);



export const getPatients = createAsyncThunk(
    'patient/getPatients',
    async () =>{
        try {
            const response = await api.get('/view');
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