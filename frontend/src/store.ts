import {configureStore} from '@reduxjs/toolkit'
import dishesReducer from "./slices/dishesSlice";
import additivesReducer from "./slices/additivesSlice";
import ordersReducer from "./slices/ordersSlice";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice"

export const store = configureStore({
    reducer: {
        dishes: dishesReducer,
        additives: additivesReducer,
        orders: ordersReducer,
        cart: cartReducer,
        auth: authReducer,
        user: userReducer
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch