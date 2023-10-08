import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IOrder} from "../types/types";


interface OrderState {
    orders: IOrder[];
}

const initialState: OrderState = {
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
};

export const ordersSlice = createSlice({
    name: 'orders',
    initialState: initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<IOrder[]>) => {
            state.orders = action.payload;
        }
    },
})

export const {setOrders} = ordersSlice.actions;

export default ordersSlice.reducer;