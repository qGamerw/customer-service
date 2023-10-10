import axios from "axios";
import authHeader from "./auth-header";
import {setCart} from "../slices/cartSlice";
import {AppDispatch} from "../store";

const API_URL = "/cart";

const getCart = (cartId: number | undefined, dispatch: AppDispatch) => {

    return axios.get(API_URL + `/${cartId}`, {headers: authHeader()}).then(
        (response) => {
            console.log(response.data)
            dispatch(setCart(response.data))
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(setCart([]));

        });
}

const addToCart = (cartId: number | undefined, dishId: number, dispatch: AppDispatch) => {

    console.log(`${API_URL}/${cartId}/dish/${dishId}`, {quantity: 1}, {headers: authHeader()})

    return axios.post(`${API_URL}/${cartId}/dish/${dishId}`, {quantity: 1}, {headers: authHeader()}).then(
        () => {
            getCart(cartId, dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const updateQuantity = (cartId: number | undefined, dishId: number, quantity: {
    quantity: number
}, dispatch: AppDispatch) => {

    console.log(`Обновление кол-ва ${API_URL}/${cartId}/dish/${dishId}`, quantity, {headers: authHeader()})

    return axios.put(`${API_URL}/${cartId}/dish/${dishId}`, quantity, {headers: authHeader()}).then(
        () => {
            getCart(cartId, dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const deleteFromCart = (cartId: number | undefined, dishId: number, dispatch: AppDispatch) => {
    console.log(`Удаление ${API_URL}/${cartId}/dish/${dishId}`, {headers: authHeader()})
    return axios.delete(`${API_URL}/${cartId}/dish/${dishId}`, {headers: authHeader()}).then(
        () => {
            getCart(cartId, dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const cartService = {
    getCart,
    addToCart,
    updateQuantity,
    deleteFromCart,
};

export default cartService