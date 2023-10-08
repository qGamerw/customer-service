import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface Dish {
    id: number;
    name: string;
    description: string;
    urlImage: string;
    category: {
        id: number;
        category: string;
    };
    price: number;
    weight: number;
}

interface DishState {
    dishes: Dish[];
}

const initialState: DishState = {
    dishes: [],
};

export const dishesSlice = createSlice({
    name: 'dishes',
    initialState: initialState,
    reducers: {
        setDishes: (state, action: PayloadAction<Dish[]>) => {
            state.dishes = action.payload;
        }
    },
})

export const {setDishes} = dishesSlice.actions;

export default dishesSlice.reducer;