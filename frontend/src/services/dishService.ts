import axios from "axios";
import {setDishes} from "../slices/dishesSlice";
import {AppDispatch} from "../store";

const API_URL: string = "/dishes";

const getDishes = (dispatch: AppDispatch) => {
    return axios.get(API_URL+"/any").then(
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