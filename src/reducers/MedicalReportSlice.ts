import {MedicalReport} from "../models/ MedicalReport.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface MedicalReportState {
    medicalReports: MedicalReport[];
}

const initialState: MedicalReportState = {
    medicalReports: [],
}

const medicalReportSlice = createSlice({
    name: 'medical_report',
    initialState,
    reducers: {
        addMedicalReport: (state, action: PayloadAction<MedicalReport>) => {
            state.medicalReports.push(action.payload);
        },

        updateMedicalReport: (state, action: PayloadAction<MedicalReport>) => {
            const index = state.medicalReports.findIndex(
                (medicalReport) => medicalReport.medicalReportId === action.payload.medicalReportId
            );

            if (index !== -1){
                state.medicalReports[index] = action.payload;
            }
        },

        deleteMedicalReport: (state, action: PayloadAction<string>) => {
            state.medicalReports = state.medicalReports.filter((medicalReport) => medicalReport.medicalReportId !== action.payload);
        },
    },
});

export const {addMedicalReport, updateMedicalReport, deleteMedicalReport} = medicalReportSlice.actions;
export default medicalReportSlice.reducer;