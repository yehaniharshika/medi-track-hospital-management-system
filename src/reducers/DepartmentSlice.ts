import {Department} from "../models/Department.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface DepartmentState {
    departments: Department[];
}

const initialState: DepartmentState = {
    departments: [],
}

const departmentSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {
        addDepartment: (state, action: PayloadAction<Department>) => {
            state.departments.push(action.payload);
        },

        updateDepartment: (state, action: PayloadAction<Department>) => {
            const index = state.departments.findIndex(
                (department) => department.departmentId === action.payload.departmentId
            );

            if (index !== -1){
                state.departments[index] = action.payload;
            }
        },

        deleteDepartment: (state, action: PayloadAction<string>) => {
            state.departments = state.departments.filter((department) => department.departmentId !== action.payload);
        },
    },

});

export const {addDepartment, updateDepartment, deleteDepartment} = departmentSlice.actions;
export default departmentSlice.reducer;