import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CartItem {
        Id: number;
        dishId: number;
        quantity: number;
        cartId: number;
}

interface CartState {
    cartItems: CartItem[];
}

const initialState: CartState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        setCart: (state, action: PayloadAction<CartItem[]>) => {
            state.cartItems = action.payload;
        },
    }

});

export const {setCart} = cartSlice.actions;
export default cartSlice.reducer;