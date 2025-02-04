import {Appointment} from "../models/Appointment.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface AppointmentState {
    appointments: Appointment[];
}

const initialState: AppointmentState = {
    appointments: [],
}

const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers: {
        addAppointment: (state, action: PayloadAction<Appointment>) => {
            state.appointments.push(action.payload);
        },

        updateAppointment: (state, action: PayloadAction<Appointment>) => {
            const index = state.appointments.findIndex(
                (appointment) => appointment.appointmentCode === action.payload.appointmentCode
            );

            if (index !== -1){
                state.appointments[index] = action.payload;
            }
        },

        deleteAppointment: (state, action: PayloadAction<string>) => {
            state.appointments = state.appointments.filter((appointment) => appointment.appointmentCode !== action.payload);
        },
    },
});

export const {addAppointment, updateAppointment, deleteAppointment} = appointmentSlice.actions;
export default appointmentSlice.reducer;