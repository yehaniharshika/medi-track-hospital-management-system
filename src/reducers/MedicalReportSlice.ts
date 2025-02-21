import {MedicalReport} from "../models/ MedicalReport.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

export const initialState: MedicalReport[] = [];

const api = axios.create({
    baseURL : "http://localhost:3003/medicalReport",
})

export const saveMedicalReport = createAsyncThunk(
    "medicalReport/saveMedicalReport",
    async (medicalReport: MedicalReport) => {
        try {
            const response = await api.post('/add',medicalReport );
            return response.data;
        }catch(error) {
            console.error("Error saving Medical Report:", error);
            throw error;
        }
    }
);

export const updateMedicalReport = createAsyncThunk(
    'medicalReport/updateMedicalReport',
    async (medicalReport: MedicalReport) => {
        try {
            const response = await api.put(`/update/${medicalReport.medicalReportId}`, medicalReport);
            return response.data;
        }catch (error){
            console.error("Error updating Medical Report: ", error);
            throw error;
        }
    }
);

export const deleteMedicalReport = createAsyncThunk(
    'medicalReport/deleteMedicalReport',
    async (medicalReportId : string) => {
        try {
            const response = await api.delete(`/delete/${medicalReportId}`);
            return response.data;
        }catch (error){
            console.error("Error deleting Medical Report: ", error);
        }
    }
);

export const getMedicalReports = createAsyncThunk(
    'medicalReport/getMedicalReports',
    async () => {
        try {
            const response = await api.get('/view');
            return response.data;
        }catch (error){
            console.error("Error:", error);
        }
    }
);


const medicalReportSlice = createSlice({
    name: 'medical_report',
    initialState,
    reducers: {
        addMedicalReport: (state, action: PayloadAction<MedicalReport>) => {
            state.push(action.payload);
        },

        updatedMedicalReport: (state, action: PayloadAction<MedicalReport>) => {
            const index = state.findIndex(
                (medicalReport) => medicalReport.medicalReportId === action.payload.medicalReportId
            );

            if (index !== -1){
                state[index] = action.payload;
            }
        },

        deletedMedicalReport: (state, action: PayloadAction<string>) => {
            return  state.filter((medicalReport) => medicalReport.medicalReportId !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveMedicalReport.fulfilled, (state, action) => {
                state.push(action.payload);
            })

            .addCase(saveMedicalReport.pending, (_, action) => {
                console.error("Pending save Medical Report: ",action.payload);
            })

            .addCase(saveMedicalReport.rejected, (_, action) => {
                console.error("Failed to save Medical Report: ", action.payload);
            });

        builder
            .addCase(deleteMedicalReport.fulfilled, (state, action) => {
                return state = state.filter((medicalReport : MedicalReport)=> medicalReport.medicalReportId !== action.payload.medicalReportId);
            })

            .addCase(deleteMedicalReport.rejected, (_, action) => {
                console.error("Failed to delete medicalReportId: ", action.payload);
            })

            .addCase(deleteMedicalReport.pending, (_, action) => {
                console.log("Pending delete medical Report: ",action.payload);
            });

        builder
            .addCase(updateMedicalReport.rejected, (_, action) => {
                console.error("Failed to update Medical Report: ", action.payload);
            })

            .addCase(updateMedicalReport.fulfilled, (state, action) => {
                const medicalReport = state.find((medicalReport : MedicalReport) => medicalReport.medicalReportId === action.payload.medicalReportId);
                if (medicalReport) {
                    medicalReport.reportDate = action.payload.location;
                    medicalReport.testResults = action.payload.headOfDepartment;
                    medicalReport.notes = action.payload.location;
                    medicalReport.patientId = action.payload.patientId;
                    medicalReport.patientName = action.payload.patientName;
                    medicalReport.doctorId = action.payload.doctorId;
                }
            })
            .addCase(updateMedicalReport.pending, (_, action) => {
                console.log("Pending update Medical Report:", action.payload);
            });

        builder
            .addCase(getMedicalReports.fulfilled, (_, action) => {
                return action.payload;
            })
            .addCase(getMedicalReports.pending, (_, action) => {
                console.log("Pending get Medical Reports: ", action.payload);
            })
            .addCase(getMedicalReports.rejected, (_, action) => {
                console.error("Failed to get Medical Reports: ", action.payload);
            });
    }
});

export const {addMedicalReport, updatedMedicalReport, deletedMedicalReport} = medicalReportSlice.actions;
export default medicalReportSlice.reducer;