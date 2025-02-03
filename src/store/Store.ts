import { configureStore } from "@reduxjs/toolkit";
import CustomerSlice from "../reducers/CustomerSlice.ts";
import DoctorSlice from "../reducers/DoctorSlice.ts";



const store = configureStore({
    reducer: {
        customers: CustomerSlice,
        doctors: DoctorSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
