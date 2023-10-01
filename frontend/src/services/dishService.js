import axios from "axios";
import {setDishes} from "../slices/dishesSlice";
import authHeader from "./auth-header";

const API_URL = "/dishes";

const getDishes = (dispatch) => {
    return axios.get(API_URL+"/any",{headers: authHeader()}).then(
        (response) => {
            dispatch(setDishes(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(setDishes([]));
        });

};


const dishService = {
    getDishes,
};

export default dishService