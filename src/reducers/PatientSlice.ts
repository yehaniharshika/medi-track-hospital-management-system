import {Patient} from "../models/Patient.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

export const initialState: Patient[] = [];

const api = axios.create({
    baseURL : "http://localhost:3003/patient"
});

export const savePatient = createAsyncThunk(
    'patient/savePatient',
    async (patient : Patient) => {
        try {
            const response = await api.post('/add', patient);
            return response.data;
        }catch (error){
            return console.log("error",error);
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

export const updatePatient = createAsyncThunk(
    'patient/updatePatient',
    async (patient : Patient) =>{
        try {
            const response = await api.put(`/update/${patient.patientId}`,patient);
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
        addPatient: (state, action: PayloadAction<Patient>) => {
            state.push(action.payload);
        },

        updatePatient: (state, action: PayloadAction<Patient>) => {
            const index = state.findIndex(
                (patient) => patient.patientId === action.payload.patientId);

            if (index !== -1) {
                state[index] = action.payload;
            }
        },

        deletePatient: (state, action: PayloadAction<string>) => {
            return state.filter((patient) => patient.patientId !== action.payload);
        },
    },
});

export const {addPatient, updatePatient, deletePatient} = patientSlice.actions;
export default patientSlice.reducer;