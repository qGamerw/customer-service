import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IOrderFromHistory} from "../types/types";


interface OrderState {
    orders: IOrderFromHistory[];
    lastOrderId: number;
}

const initialState: OrderState = {
    orders: [],
    lastOrderId: 0
};

export const ordersSlice = createSlice({
    name: 'orders',
    initialState: initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<IOrderFromHistory[]>) => {
            state.orders = action.payload;
        },
        setLastOrderId: (state, action: PayloadAction<number>) => {
            state.lastOrderId = action.payload;
        },
    },
})

export const {setOrders, setLastOrderId} = ordersSlice.actions;

export default ordersSlice.reducer;