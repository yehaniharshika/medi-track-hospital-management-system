import { configureStore } from "@reduxjs/toolkit";
import DoctorSlice from "../reducers/DoctorSlice.ts";
import NurseSlice from "../reducers/NurseSlice.ts";
import PatientSlice from "../reducers/PatientSlice.ts";
import AppointmentSlice from "../reducers/AppointmentSlice.ts";
import MedicineSlice from "../reducers/MedicineSlice.ts";
import MedicalReportSlice from "../reducers/MedicalReportSlice.ts";
import DepartmentSlice from "../reducers/DepartmentSlice.ts";
import PaymentSlice from "../reducers/PaymentSlice.ts";
import AuthSlice from "../reducers/AuthSlice.ts";



const store = configureStore({
    reducer: {
        auth : AuthSlice,
        departments: DepartmentSlice,
        doctors: DoctorSlice,
        nurses : NurseSlice,
        patients : PatientSlice,
        appointments : AppointmentSlice,
        medicines : MedicineSlice,
        medicalReports : MedicalReportSlice,
        payments : PaymentSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
