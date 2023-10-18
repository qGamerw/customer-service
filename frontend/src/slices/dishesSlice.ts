import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDish} from "../types/types";

interface DishesState {
    dishes: IDish[];
}

const initialState: DishesState = {
    dishes: [],
};

export const dishesSlice = createSlice({
    name: 'dishes',
    initialState: initialState,
    reducers: {
        setDishes: (state, action: PayloadAction<IDish[]>) => {
            state.dishes = [...state.dishes, ...action.payload];
        }

    },
})

export const {setDishes} = dishesSlice.actions;

export default dishesSlice.reducer;