import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        setCart: (state, action) => {
            state.items = action.payload;
        },
        addProduct: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem){
                existingItem.amount++;
            } else {
                action.payload.amount = 1;
                state.items = [...state.items, action.payload]
            }
        },
        rewoveFromCart: (state,action) => {
            state.items = state.items.filter(element => element.id !== action.payload);
        },
    }

});

export const {setCart} = cartSlice.actions;
export default cartSlice.reducer;