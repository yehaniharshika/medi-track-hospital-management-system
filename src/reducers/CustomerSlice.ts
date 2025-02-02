import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Customer} from "../models/Customer.ts";


export interface CustomerState {
    customers: Customer[];
}

// export const initialState: Crop[] =[];
const initialState: CustomerState = {
    customers: [],
}

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {

        addCustomer: (state: CustomerState, action: PayloadAction<Customer>) => {
            state.customers.push(action.payload);
        },

        updateCustomer(state, action: PayloadAction<Customer>) {
            const index = state.customers.findIndex(
                (customer) => customer.email === action.payload.email
            );
            if (index !== -1) {
                state.customers[index] = action.payload;
            }
        },

        deleteCustomer(state, action: PayloadAction<string>) {
            state.customers = state.customers.filter((c) => c.email !== action.payload);
        },
    },
});
export const {addCustomer,updateCustomer,deleteCustomer} = customerSlice.actions;

export default customerSlice.reducer;