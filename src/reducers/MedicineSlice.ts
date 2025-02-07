import {Medicine} from "../models/Medicine.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface MedicineState {
    medicines: Medicine[];
}

const initialState: MedicineState = {
    medicines: [],
}

const medicineSlice = createSlice({
    name: "medicine",
    initialState,
    reducers: {
        addMedicine: (state, action: PayloadAction<Medicine>) => {
            state.medicines.push(action.payload);
        },

        updateMedicine: (state, action: PayloadAction<Medicine>) => {
            const index = state.medicines.findIndex(
                (medicine) => medicine.medicineId === action.payload.medicineId
            );

            if (index !== -1){
                state.medicines[index] = action.payload;
            }
        },

        deleteMedicine: (state, action: PayloadAction<string>) => {
            state.medicines = state.medicines.filter((medicine) => medicine.medicineId !== action.payload);
        },
    },
});

export const {addMedicine, updateMedicine,deleteMedicine} = medicineSlice.actions;
export default medicineSlice.reducer;