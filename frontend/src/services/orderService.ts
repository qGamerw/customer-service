import {setOrders} from "../slices/ordersSlice";
import axios, {AxiosResponse} from "axios";
import authHeader from "./auth-header";
import {AppDispatch} from "../store";
import {IOrderFromHistory, IOrderResponse} from "../types/types";
import CartService from "./cartService";
import {user} from "../constants/constants";

const API_URL = "/orders";

/**
 * Запрос для получения заказов пользователя
 * @constructor
 */
const getOrders = (userId: number, dispatch: AppDispatch) => {
    return axios.get(API_URL + `/client/${userId}`, {headers: authHeader()}).then(
        (response: AxiosResponse<IOrderFromHistory[]>) => {
            console.log(response.data)
            dispatch(setOrders(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
            dispatch(setOrders([]));
        });
};

/**
 * Запрос на создание заказа
 * @constructor
 */
const createOrder = (order: IOrderResponse, dispatch: AppDispatch) => {
    console.log(`Создание заказа: ${API_URL}`, {order}, {headers: authHeader()})
    return axios.post(API_URL, order, {headers: authHeader()}).then(
        (response) => {
            CartService.getCart(user?.id, dispatch)
            return response.data;
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

/**
 * Запрос на отмену заказа
 * @constructor
 */
const cancelOrder = (userId: number, orderId: number, message: string, dispatch: AppDispatch) => {
    console.log(`Отмена заказа: ${API_URL}/${orderId}/cancel`, {orderId, message}, {headers: authHeader()})

    return axios.put(`${API_URL}/${orderId}/cancel`, {orderId, message}, {headers: authHeader()}).then(
        (response) => {
            getOrders(userId, dispatch);
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            console.error(_content);
        }
    );
};

/**
 * Запрос для оплаты заказа
 * @constructor
 */
const paymentOfOrderById = (userId: number, orderId: number, dispatch: AppDispatch) => {
    console.log(`Оплата заказа ${API_URL}/${orderId}/payment`, {headers: authHeader()})
    return axios.put(`${API_URL}/${orderId}/payment`, "",{headers: authHeader()}).then(
        (response) => {
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const orderService = {
    getOrders,
    createOrder,
    cancelOrder,
    paymentOfOrderById,
};

export default orderService