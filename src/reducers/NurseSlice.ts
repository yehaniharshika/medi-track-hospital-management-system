import {Nurse} from "../models/Nurse.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface NurseState {
    nurses: Nurse[];
}

const initialState: NurseState = {
    nurses: [],
}

const nurseSlice = createSlice({
    name: "nurse",
    initialState,
    reducers: {
        addNurse: (state, action: PayloadAction<Nurse>) => {
            state.nurses.push(action.payload);
        },

        updateNurse: (state, action: PayloadAction<Nurse>) => {
            const index = state.nurses.findIndex(
                (nurse) => nurse.nurseId === action.payload.nurseId);

            if (index !== -1) {
                state.nurses[index] = action.payload;
            }
        },

        deleteNurse: (state, action: PayloadAction<string>) => {
            state.nurses = state.nurses.filter((nurse) => nurse.nurseId !== action.payload);
        },
    },
});
export const {addNurse, updateNurse, deleteNurse} = nurseSlice.actions;
export default nurseSlice.reducer;