import {createSlice} from "@reduxjs/toolkit";

export const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [
            {
                id: 1,
                address: "ул.Разина д.12 кв.35"
            },
            {
                id: 2,
                address: "ул.Мира д.12 кв.35"
            }
        ],
    },
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
        }
    },
})

export const {setOrders} = ordersSlice.actions;

export default ordersSlice.reducer;