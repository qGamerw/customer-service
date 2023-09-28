import {configureStore} from '@reduxjs/toolkit'
import dishesReducer from "./slices/dishesSlice";
import additivesReducer from "./slices/additivesSlice";
import ordersReducer from "./slices/ordersSlice";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import clientReducer from "./slices/сlientSlice"

export default configureStore({
    reducer: {
        dishes: dishesReducer,
        additives: additivesReducer,
        orders: ordersReducer,
        cart: cartReducer,
        auth: authReducer,
        user: clientReducer
    },
})