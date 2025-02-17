import {Department} from "../models/Department.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

export const initialState: Department[] = [];

const api = axios.create({
    baseURL : "http://localhost:3003/department",
})

export const saveDepartment = createAsyncThunk(
    "department/saveDepartment",
    async (department : Department) => {
        try {
            const response = await api.post('/add',department);
            return response.data;
        }catch (error) {
            console.error("Error saving Department:", error);
        }
    }
);

export const deleteDepartment = createAsyncThunk(
    "department/deleteDepartment",
    async (departmentId : string) => {
        try {
            const response = await api.delete(`/delete/${departmentId}`);
            return response.data;
        }catch (error) {
            console.error("Error deleting Department:", error);
        }
    }
);

export const updateDepartment = createAsyncThunk(
    "department/updateDepartment",
    async (department : Department) =>{
        try {
            const response = await api.put(`/update/${department.departmentId}`,department);
            return response.data;
        }catch (error){
            console.error("Error updating Department:", error);
        }
    }
);

export const getDepartments = createAsyncThunk(
    "department/getDepartments",
    async () =>{
        try {
            const response = await api.get('/view');
            return response.data;
        }catch (error){
            console.error("Error getting Departments: ", error);
        }
    }
);

const departmentSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {
        addDepartment: (state, action: PayloadAction<Department>) => {
            state.push(action.payload);
        },

        updatedDepartment: (state, action: PayloadAction<Department>) => {
            const index = state.findIndex((department) => department.departmentId === action.payload.departmentId
            );

            if (index !== -1){
                state[index] = action.payload;
            }
        },

        deletedDepartment: (state, action: PayloadAction<string>) => {
            return state.filter((department) => department.departmentId !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveDepartment.fulfilled, (state, action) => {
                state.push(action.payload);
            })

            .addCase(saveDepartment.pending, (_, action) => {
                console.error("Pending save Department: ",action.payload);
            })

            .addCase(saveDepartment.rejected, (_, action) => {
                console.error("Failed to save Department: ", action.payload);
            });

        builder
            .addCase(deleteDepartment.fulfilled, (state, action) => {
                return state = state.filter((department : Department)=> department.departmentId !== action.payload.departmentId);
            })

            .addCase(deleteDepartment.rejected, (_, action) => {
                console.error("Failed to delete departmentId: ", action.payload);
            })

            .addCase(deleteDepartment.pending, (_, action) => {
                console.log("Pending delete department: ",action.payload);
            });

        builder
            .addCase(updateDepartment.rejected, (_, action) => {
                console.error("Failed to update department: ", action.payload);
            })

            .addCase(updateDepartment.fulfilled, (state, action) => {
                const department = state.find((department:Department) => department.departmentId === action.payload.departmentId);
                if (department) {
                    department.departmentName = action.payload.departmentName;
                    department.departmentEmail = action.payload.departmentEmail;
                    department.location = action.payload.location;
                    department.headOfDepartment = action.payload.headOfDepartment;
                    department.phoneNumber = action.payload.phoneNumber;
                }
            })
            .addCase(updateDepartment.pending, (_, action) => {
                console.log("Pending update department:", action.payload);
            });

        builder
            .addCase(getDepartments.fulfilled, (_, action) => {
                return action.payload;
            })
            .addCase(getDepartments.pending, (_, action) => {
                console.log("Pending get Department:", action.payload);
            })
            .addCase(getDepartments.rejected, (_, action) => {
                console.error("Failed to get Department:", action.payload);
            });
    }

});

export const {addDepartment, updatedDepartment, deletedDepartment} = departmentSlice.actions;
export default departmentSlice.reducer;