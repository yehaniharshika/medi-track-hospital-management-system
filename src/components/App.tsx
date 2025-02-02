import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router";

import {Navigate} from "react-router-dom";
import SignUp from "./Signup.tsx";
import Login from "./Login.tsx";
import ForgetPW from "./ForgetPW.tsx";
import Dashboard from "../pages/Dashboard.tsx";
import DepartmentSection from "../pages/DepartmentSection.tsx";
import DoctorSection from "../pages/DoctorSection.tsx";
import NurseSection from "../pages/NurseSection.tsx";
import PatientSection from "../pages/PatientSection.tsx";
import AppointmentSection from "../pages/AppointmentSection.tsx";
import MedicineSection from "../pages/MedicineSection.tsx";
import MedicalReportSection from "../pages/MedicalReportSection.tsx";
import PaymentSection from "../pages/PaymentSection.tsx";
import {Provider} from "react-redux";
import store from "../store/Store.ts";
import {RootLayout} from "./RootLayout.tsx";


function App() {

    const routes = createBrowserRouter([
        {
            path: '',
            element: <RootLayout />,
            children: [
                { path: '', element: <Navigate to="/signup" replace /> }, // Default to Sign-Up
                { path: '/signup', element: <SignUp /> }, // Sign-Up route
                { path: '/login', element: <Login /> },
                { path: '/forgot-password', element: <ForgetPW /> },
                { path: '/dashboard', element: <Dashboard /> }, // Dashboard route
                { path: '/department', element: <DepartmentSection /> },
                { path: '/doctor', element: <DoctorSection /> },
                { path: '/nurse', element: <NurseSection /> },
                { path: '/patient', element: <PatientSection /> },
                { path: '/appointment', element: <AppointmentSection /> },
                { path: '/medicine', element: <MedicineSection /> },
                { path: '/report', element: <MedicalReportSection /> },
                { path: '/payment', element: <PaymentSection /> },
            ],
        },
    ]);


    return (
        <Provider store={store}>
            <RouterProvider router={routes} />
        </Provider>
    );
}

export default App;
