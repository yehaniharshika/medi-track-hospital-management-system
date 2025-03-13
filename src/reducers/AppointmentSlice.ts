import {Appointment} from "../models/Appointment.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";


const initialState: Appointment[] = [];

const api = axios.create({
    baseURL : "http://localhost:3003/appointment",
})

export const saveAppointment = createAsyncThunk(
    "appointment/saveAppointment",
    async (appointment: Appointment) => {
        const token = localStorage.getItem("accessToken");
        try {
            const response = await api.post('/add',appointment, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            Swal.fire({
                title: "✅ Success!",
                html: '<p class="swal-text">Appointment saved successfully.</p>', // Added class for styling
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
            console.error("Error saving Appointment:", error);
            Swal.fire({
                title: "Error!",
                html: '<p class="swal-text">Failed to save Appointment.</p>', // Added class for styling
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


/*update Appointment*/
export const updateAppointment = createAsyncThunk(
    "appointment/updateAppointment",
    async (appointment: Appointment) => {
        const token = localStorage.getItem("accessToken");
        try {
            const response = await api.put(`/update/${appointment.appointmentCode}`, appointment, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            Swal.fire({
                title: "✅ Success!",
                html: '<p class="swal-text">Appointment updated successfully.</p>',
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
                },
            });

            return response.data;  // Ensure the updated appointment is returned
        } catch (error) {
            console.error("Error updating Appointment: ", error);
            Swal.fire({
                title: "Error!",
                html: '<p class="swal-text">Failed to update Appointment.</p>',
                icon: "error",
                confirmButtonText: "OK",
                background: "white",
                color: "black",
                confirmButtonColor: "green",
                timer: 3000,
                width: "420px",
                customClass: {
                    title: "swal-title",
                    popup: "swal-popup",
                    confirmButton: "swal-button",
                },
            });

        }
    }
);

export const deleteAppointment = createAsyncThunk(
    'appointment/deleteAppointment',
    async (appointmentCode : string) => {
        const token = localStorage.getItem("accessToken");

        const result = await Swal.fire({
            title: "⚠️ Are you sure?",
            html: '<p class="swal-text">Do you really want to delete this Appointment?</p>',
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

        if (result.isConfirmed){
            try {
                const response = await api.delete(`/delete/${appointmentCode}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                // Show success message
                Swal.fire({
                    title: "✅ Deleted!",
                    html: '<p class="swal-text">Successfully deleted Appointment.</p>',
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
                console.error("Error deleting Appointment: ", error);
                Swal.fire({
                    title: "❌ Error!",
                    html: '<p class="swal-text">Failed to delete Appointment.</p>',
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
            }
        }

    }
);

export const getAppointments = createAsyncThunk(
    'appointment/getAppointments',
    async () => {
        const token = localStorage.getItem("accessToken");
        try {
            const response = await api.get('/view',{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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
                const index = state.findIndex((appointment: Appointment) => appointment.appointmentCode === action.payload.appointmentCode);

                if (index !== -1) {
                    state[index] = action.payload; // Replace with updated data
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