
import axios, {AxiosResponse} from "axios";
import {setOrders} from "../slices/ordersSlice";
import authHeader from "./auth-header";
import {AppDispatch} from "../store";
import {IOrderFromHistory, IOrderResponse} from "../types/types";

const API_URL = "/orders";

const getOrders = (userId: number, dispatch: AppDispatch) => {
    return axios.get(API_URL+`/client/${userId}`, {headers: authHeader()}).then(
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

const createOrder = (order: IOrderResponse) => {

    return axios.post(API_URL, order, {headers: authHeader()}).then(
        (response) => {
            console.log("Создан заказ {}", response)

        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};
//
// const cancelOrder = (order, dispatch: AppDispatch) => {
//     return axios.put(API_URL, order, {headers: authHeader()}).then(
//         (response) => {
//             getOrders(dispatch)
//         },
//         (error) => {
//             const _content = (error.response && error.response.data) ||
//                 error.message ||
//                 error.toString();
//
//             console.error(_content)
//         });
// };

const orderService = {
    getOrders,
    createOrder,
    // cancelOrder,
};

export default orderService
