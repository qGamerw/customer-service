import axios from "axios";
import {setClients} from "../slices/сlientSlice";
import authHeader from "./auth-header";

const API_URL = "/clients";

const getClients = (id, dispatch) => {
    return axios.get(API_URL + `/${id}`, {headers: authHeader()}).then(
        (response) => {
            dispatch(setClients(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(setClients([]));
        });
};

const updateClient = (user, dispatch) => {
    return axios.put(API_URL, user, {headers: authHeader()}).then(
        (response) => {
            getClients(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const deleteClient = (id, dispatch) => {
    return axios.delete(API_URL + `/${id}`, {headers: authHeader()}).then(
        (response) => {
            getClients(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const clientService = {
    getClients,
    updateClient,
    deleteClient,
};

export default clientService