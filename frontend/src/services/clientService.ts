import axios from "axios";
import {setUser} from "../slices/userSlice";
import authHeader from "./auth-header";
import {AppDispatch} from "../store";
import {IUserResponse} from "../types/types";

const API_URL = "/clients";

const getClients = (id: number, dispatch: AppDispatch) => {
    return axios.get(API_URL + `/${id}`, {headers: authHeader()}).then(
        (response) => {
            dispatch(setUser(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(setUser([]));
        });
};

const updateClient = (id: number, user: IUserResponse, dispatch: AppDispatch) => {
    return axios.put(`${API_URL}/${id}`, user, {headers: authHeader()}).then(
        (response) => {
            getClients(id, dispatch);
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};
const deleteClient = (id: number, dispatch: AppDispatch) => {
    return axios.delete(API_URL + `/${id}`, {headers: authHeader()}).then(
        (response) => {
            getClients(id, dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const clientService = {
    updateClient,
    deleteClient,
};

export default clientService
