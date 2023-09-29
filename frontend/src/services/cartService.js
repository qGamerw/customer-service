import axios from "axios";
import authHeader from "./auth-header";
import {setCart} from "../slices/cartSlice";

const API_URL = "/cart";

const getCart = (cartId, dispatch) => {

    return axios.get(API_URL + `/${cartId}`,{headers: authHeader()}).then(
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

const addToCart = (cartId, dishId, dispatch) => {

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

const updateQuantity = (clientId, dishId, quantity, dispatch) => {
    return axios.put(`${API_URL}/${clientId}/dish/${dishId}`, quantity, {headers: authHeader()}).then(
        () => {
            getCart(clientId, dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const deleteFromCart = (cartId, dishId, dispatch) => {

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
    deleteFromCart,
};

export default cartService