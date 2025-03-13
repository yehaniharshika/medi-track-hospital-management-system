import {Nurse} from "../models/Nurse.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

export const initialState: Nurse[] = [];

const api = axios.create({
    baseURL : "http://localhost:3003/nurse",
});

/*Add nurse*/
export const saveNurse = createAsyncThunk(
    "nurse/saveNurse",
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
                html: '<p class="swal-text">Nurse saved successfully.</p>', // Added class for styling
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
            console.error("Error saving Nurse: ", error);
            Swal.fire({
                title: "Error!",
                html: '<p class="swal-text">Failed to save Nurse.</p>', // Added class for styling
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


/*update nurse*/
export const updateNurse = createAsyncThunk(
    'nurse/updateNurse',
    async (formData : FormData) => {
        const token = localStorage.getItem("accessToken");

        try {
            const response = await api.put(`/update/${formData.get('nurseId')}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            Swal.fire({
                title: "✅ Success!",
                html: '<p class="swal-text">Nurse updated successfully.</p>', // Added class for styling
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
            console.error("Error updating Nurse: ", error);
            Swal.fire({
                title: "❌ Error!",
                html: '<p class="swal-text">Failed to update Nurse.</p>', // Added class for styling
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

/*delete Nurse*/
export const deleteNurse = createAsyncThunk(
    'nurse/deleteNurse',
    async (nurseId : string) => {
        const token = localStorage.getItem("accessToken");

        const result = await Swal.fire({
            title: "⚠️ Are you sure?",
            html: '<p class="swal-text">Do you really want to delete this Nurse?</p>',
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
                const response = await api.delete(`/delete/${nurseId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                // Show success message
                Swal.fire({
                    title: "✅ Deleted!",
                    html: '<p class="swal-text">Successfully deleted Nurse.</p>',
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
                    html: '<p class="swal-text">Failed to delete Nurse.</p>',
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
                console.error("Error deleting Nurse:", error);
            }
        }

    }
);

/*Get Nurses*/
export const getNurses = createAsyncThunk(
    'nurse/getNurses',
    async () => {
        const token = localStorage.getItem("accessToken");

        try {
            const response = await api.get('/view',{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        }catch (error){
            console.error("Error:", error);

        }
    }
);

const nurseSlice = createSlice({
    name: "nurse",
    initialState,
    reducers: {
        addNurse: (state, action: PayloadAction<Nurse>) => {
            state.push(action.payload);
        },

        updatedNurse: (state, action: PayloadAction<Nurse>) => {
            const index = state.findIndex(
                (nurse) => nurse.nurseId === action.payload.nurseId);

            if (index !== -1) {
                state[index] = action.payload;
            }
        },

        deletedNurse: (state, action: PayloadAction<string>) => {
            return state.filter((nurse) => nurse.nurseId !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveNurse.fulfilled, (state, action) => {
                state.push(action.payload);
            })

            .addCase(saveNurse.pending, (_, action) => {
                console.error("Pending save Nurse ",action.payload);
            })

            .addCase(saveNurse.rejected, (_, action) => {
                console.error("Failed to save Nurse: ", action.payload);
            });

        builder
            .addCase(deleteNurse.rejected, (_, action) => {
                console.error("Failed to delete Nurse: ", action.payload);
            })

            .addCase(deleteNurse.pending, (_, action) => {
                console.log("Pending delete Nurse: ",action.payload);
            })

            .addCase(deleteNurse.fulfilled, (state, action) => {
                return state = state.filter((nurse:Nurse)=> nurse.nurseId !== action.payload.nurseId);
            });

        builder
            .addCase(updateNurse.rejected, (_, action) => {
                console.error("Failed to update Nurse: ", action.payload);
            })

            .addCase(updateNurse.fulfilled, (state, action) => {
                const nurse = state.find((nurse:Nurse) => nurse.nurseId === action.payload.nurseId);
                if (nurse) {
                    nurse.nurseName = action.payload.nurseName;
                    nurse.nurseImg = action.payload.nurseImg;
                    nurse.gender = action.payload.gender;
                    nurse.contactNumber = action.payload.contactNumber;
                    nurse.qualification = action.payload.qualification;
                    nurse.email = action.payload.email;
                    nurse.departmentId = action.payload.departmentId;
                }
            })

            .addCase(updateNurse.pending, (_, action) => {
                console.log("Pending update Nurse: ", action.payload);
            });

        builder
            .addCase(getNurses.fulfilled, (_, action) => {
                return action.payload;
            })
            .addCase(getNurses.pending, (_, action) => {
                console.log("Pending get Nurses: ", action.payload);
            })
            .addCase(getNurses.rejected, (_, action) => {
                console.error("Failed to get Nurses: ", action.payload);
            })
    }
});
export const {addNurse, updatedNurse, deletedNurse} = nurseSlice.actions;
export default nurseSlice.reducer;