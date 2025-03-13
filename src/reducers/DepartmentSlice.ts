import {Department} from "../models/Department.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
//npm install sweetalert2
import Swal from "sweetalert2";
import "../pages/style/alert.css"


export const initialState: Department[] = [];

const api = axios.create({
    baseURL : "http://localhost:3003/department",
})

export const saveDepartment = createAsyncThunk(
    "department/saveDepartment",
    async (department : Department) => {
        const token = localStorage.getItem("accessToken");
        try {
            const response = await api.post('/add',department,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            Swal.fire({
                title: "✅ Success!",
                html: '<p class="swal-text">Department saved successfully.</p>', // Added class for styling
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

        }catch (error) {
            console.error("Error saving Department:", error);
            Swal.fire({
                title: "Error!",
                html: '<p class="swal-text">Failed to save department.</p>', // Added class for styling
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

export const deleteDepartment = createAsyncThunk(
    "department/deleteDepartment",
    async (departmentId: string) => {
        const token = localStorage.getItem("accessToken");

        // Show confirmation alert before deletion
        const result = await Swal.fire({
            title: "⚠️ Are you sure?",
            html: '<p class="swal-text">Do you really want to delete this department?</p>',
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

        // If user confirms, proceed with deletion
        if (result.isConfirmed) {
            try {
                const response = await api.delete(`/delete/${departmentId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                // Show success message
                Swal.fire({
                    title: "✅ Deleted!",
                    html: '<p class="swal-text">Department has been successfully deleted.</p>',
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
            } catch (error) {
                console.error("Error deleting Department:", error);

                // Show error message
                Swal.fire({
                    title: "❌ Error!",
                    html: '<p class="swal-text">Failed to delete department.</p>',
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


export const updateDepartment = createAsyncThunk(
    "department/updateDepartment",
    async (department : Department) =>{
        const token = localStorage.getItem("accessToken");
        try {
            const response = await api.put(`/update/${department.departmentId}`,department,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            Swal.fire({
                title: "✅ Success!",
                html: '<p class="swal-text">Department updated successfully.</p>', // Added class for styling
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
            console.error("Error updating Department:", error);
        }
    }
);

export const getDepartments = createAsyncThunk(
    "department/getDepartments",
    async () =>{
        const token = localStorage.getItem("accessToken");
        try {
            const response = await api.get('/view',{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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