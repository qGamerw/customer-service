
import axios from "axios";
import {setOrders} from "../slices/ordersSlice";
import authHeader from "./auth-header";
import {AppDispatch} from "../store";

const API_URL = "/orders";

// const getOrders = (dispatch: AppDispatch) => {
//     return axios.get(API_URL).then(
//         (response) => {
//             dispatch(setOrders(response.data));
//         },
//         (error) => {
//             const _content = (error.response && error.response.data) ||
//                 error.message ||
//                 error.toString();
//
//             console.error(_content)
//
//             dispatch(setOrders([]));
//         });
//
// };
//
// const createOrder = (order, dispatch: AppDispatch) => {
//
//     return axios.post(API_URL, order, {headers: authHeader()}).then(
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
    // getOrders,
    // createOrder,
    // cancelOrder,
};

export default orderService
