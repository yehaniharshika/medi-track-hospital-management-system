import {Nurse} from "../models/Nurse.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

export const initialState: Nurse[] = [];

const api = axios.create({
    baseURL : "http://localhost:3003/nurse",
});

export const saveNurse = createAsyncThunk(
    "doctor/saveNurse",
    async (formData : FormData) => {
        try {
            const response = await api.post('/add' , formData , {
                headers: { "Content-Type": "multipart/form-data" }
            });
            return response.data;
        }catch(error) {
            console.error("Error saving Nurse: ", error);
            throw error;
        }
    }
);

export const updateNurse = createAsyncThunk(
    'doctor/updateNurse',
    async (formData : FormData) => {
        try {
            const response = await api.put(`/update/${formData.get('nurseId')}`, formData);
            return response.data;
        }catch (error){
            console.error("Error updating Nurse: ", error);
            throw error;
        }
    }
);

export const deleteNurse = createAsyncThunk(
    'doctor/deleteNurse',
    async (nurseId : string) => {
        try {
            const response = await api.delete(`/delete/${nurseId}`);
            return response.data;
        }catch (error){
            console.error("Error deleting Nurse:", error);
        }
    }
);

export const getNurses = createAsyncThunk(
    'doctor/getNurses',
    async () => {
        try {
            const response = await api.get('/view');
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