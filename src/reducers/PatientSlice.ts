import {Patient} from "../models/Patient.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface PatientState {
    patients: Patient[];
}

const initialState: PatientState = {
    patients: [],
}

const patientSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {
        addPatient: (state, action: PayloadAction<Patient>) => {
            state.patients.push(action.payload);
        },

        updatePatient: (state, action: PayloadAction<Patient>) => {
            const index = state.patients.findIndex(
                (patient) => patient.patientId === action.payload.patientId);

            if (index !== -1) {
                state.patients[index] = action.payload;
            }
        },

        deletePatient: (state, action: PayloadAction<string>) => {
            state.patients = state.patients.filter((patient) => patient.patientId !== action.payload);
        },
    },
});

export const {addPatient, updatePatient, deletePatient} = patientSlice.actions;
export default patientSlice.reducer;