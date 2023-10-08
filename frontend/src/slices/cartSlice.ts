import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICartItem} from "../types/types";

interface CartState {
    cartItems: ICartItem[];
}

const initialState: CartState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        setCart: (state, action: PayloadAction<ICartItem[]>) => {
            state.cartItems = action.payload;
        },
    }

});

export const {setCart} = cartSlice.actions;
export default cartSlice.reducer;