import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Doctor} from "../models/Doctor.ts";


export interface DoctorState {
    doctors: Doctor[];
}

const initialState: DoctorState = {
    doctors: [],
}

const doctorSlice = createSlice({
    name: 'doctor',
    initialState,
    reducers: {

        addDoctor: (state: DoctorState, action: PayloadAction<Doctor>) => {
            state.doctors.push(action.payload);
        },

        updateDoctor(state, action: PayloadAction<Doctor>) {
            const index = state.doctors.findIndex(
                (doctor) => doctor.doctorId === action.payload.doctorId
            );
            if (index !== -1) {
                state.doctors[index] = action.payload;
            }
        },

        deleteDoctor(state, action: PayloadAction<string>) {
            state.doctors = state.doctors.filter((doctor) => doctor.doctorId !== action.payload);
        },
    },
});

export const {addDoctor,updateDoctor,deleteDoctor} = doctorSlice.actions;
export default doctorSlice.reducer;