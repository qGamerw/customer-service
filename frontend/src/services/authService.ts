import axios from "axios";
import {ILogin, IRegistration} from "../types/types";

const API_URL = "/api/auth/";

const register = (registration: IRegistration) => {
    const { username, number, dateOfBirth, email, password } = registration;
    return axios.post(API_URL + "signup", {
        username,
        number,
        dateOfBirth,
        email,
        password,
    });
};

const login = (loginData: ILogin) => {
    const { email, password } = loginData;

    return axios
        .post(API_URL + "signin", {
            email,
            password,
        })
        .then((response) => {
            console.log(response);

            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    console.log("logout");
    localStorage.removeItem("user");
};

const authService = {
    register,
    login,
    logout,
};

export default authService;