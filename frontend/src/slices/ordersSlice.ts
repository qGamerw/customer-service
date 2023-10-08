import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface Order {
    id: number;
    address: string;
}
interface OrderState {
    orders: Order[];
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
        setOrders: (state, action: PayloadAction<Order[]>) => {
            state.orders = action.payload;
        }
    },
})

export const {setOrders} = ordersSlice.actions;

export default ordersSlice.reducer;