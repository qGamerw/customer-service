import axios from "axios";
import {ILogin, IRegistration} from "../types/types";

const API_URL = "/api/auth/";

/**
 * Запрос для регистрации пользователя
 * @constructor
 */
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

/**
 * Запрос для аутентификации пользователя
 * @constructor
 */
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

/**
 * Выход из аккаунта пользователя
 * @constructor
 */
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