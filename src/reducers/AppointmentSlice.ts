import {Appointment} from "../models/Appointment.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

const initialState: Appointment[] = [];

const api = axios.create({
    baseURL : "http://localhost:3003/appointment",
})

export const saveAppointment = createAsyncThunk(
    "appointment/saveAppointment",
    async (appointment: Appointment) => {
        try {
            const response = await api.post('/add',appointment );
            return response.data;
        }catch(error) {
            console.error("Error saving Appointment:", error);
            throw error;
        }
    }
);

export const updateAppointment = createAsyncThunk(
    'appointment/updateAppointment',
    async (appointment : Appointment) => {
        try {
            const response = await api.put(`/update/${appointment.appointmentCode}`, appointment);
            return response.data;
        }catch (error){
            console.error("Error updating Appointment: ", error);
            throw error;
        }
    }
);

export const deleteAppointment = createAsyncThunk(
    'appointment/deleteAppointment',
    async (appointmentCode : string) => {
        try {
            const response = await api.delete(`/delete/${appointmentCode}`);
            return response.data;
        }catch (error){
            console.error("Error deleting Appointment: ", error);
        }
    }
);

export const getAppointments = createAsyncThunk(
    'appointment/getAppointments',
    async () => {
        try {
            const response = await api.get('/view');
            return response.data;
        }catch (error){
            console.error("Error:", error);
        }
    }
);


const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers: {
        addAppointment: (state, action: PayloadAction<Appointment>) => {
            state.push(action.payload);
        },

        updatedAppointment: (state, action: PayloadAction<Appointment>) => {
            const index = state.findIndex(
                (appointment) => appointment.appointmentCode === action.payload.appointmentCode
            );

            if (index !== -1){
                state[index] = action.payload;
            }
        },

        deletedAppointment: (state, action: PayloadAction<string>) => {
            return state.filter((appointment) => appointment.appointmentCode !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveAppointment.fulfilled, (state, action) => {
                state.push(action.payload);
            })

            .addCase(saveAppointment.pending, (_, action) => {
                console.error("Pending save Appointment: ",action.payload);
            })

            .addCase(saveAppointment.rejected, (_, action) => {
                console.error("Failed to save Appointment: ", action.payload);
            });

        builder
            .addCase(deleteAppointment.fulfilled, (state, action) => {
                return state = state.filter((appointment : Appointment)=> appointment.appointmentCode !== action.payload.appointmentCode);
            })

            .addCase(deleteAppointment.rejected, (_, action) => {
                console.error("Failed to delete Appointment: ", action.payload);
            })

            .addCase(deleteAppointment.pending, (_, action) => {
                console.log("Pending delete Appointment: ",action.payload);
            });

        builder
            .addCase(updateAppointment.rejected, (_, action) => {
                console.error("Failed to update Appointment: ", action.payload);
            })

            .addCase(updateAppointment.fulfilled, (state, action) => {
                const appointment = state.find((appointment : Appointment) => appointment.appointmentCode === action.payload.appointmentCode);
                if (appointment) {
                    appointment.appointmentDate = action.payload.location;
                    appointment.appointmentTime = action.payload.headOfDepartment;
                    appointment.patientId = action.payload.patientId;
                    appointment.doctorId = action.payload.doctorId;
                    appointment.appointmentType = action.payload.appointmentType;
                    appointment.appointmentStatus = action.payload.appointmentStatus;
                }
            })
            .addCase(updateAppointment.pending, (_, action) => {
                console.log("Pending update Appointment:", action.payload);
            });

        builder
            .addCase(getAppointments.fulfilled, (_, action) => {
                return action.payload;
            })
            .addCase(getAppointments.pending, (_, action) => {
                console.log("Pending get Appointments: ", action.payload);
            })
            .addCase(getAppointments.rejected, (_, action) => {
                console.error("Failed to get Appointments: ", action.payload);
            });
    }
});

export const {addAppointment, updatedAppointment, deletedAppointment} = appointmentSlice.actions;
export default appointmentSlice.reducer;