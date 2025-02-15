import {Department} from "../models/Department.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export const initialState: Department[] = [];


const departmentSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {
        addDepartment: (state, action: PayloadAction<Department>) => {
            state.push(action.payload);
        },

        updateDepartment: (state, action: PayloadAction<Department>) => {
            const index = state.findIndex((department) => department.departmentId === action.payload.departmentId
            );

            if (index !== -1){
                state[index] = action.payload;
            }
        },

        deleteDepartment: (state, action: PayloadAction<string>) => {
            return state.filter((department) => department.departmentId !== action.payload);
        },
    },

});

export const {addDepartment, updateDepartment, deleteDepartment} = departmentSlice.actions;
export default departmentSlice.reducer;