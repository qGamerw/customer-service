import axios from "axios";
import {ILogin, IRegistration, IUser} from "../types/types";
import authHeader from "./auth-header";
import {Dispatch} from "redux";
import {login, setUserData} from "../slices/authSlice";

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
const loginUser = async (loginData: ILogin, dispatch: Dispatch) => {
    const { username, password } = loginData;

    let response = await axios.post(API_URL + "signin", {
            username,
            password,
        })
    console.log(response);
    dispatch(login(response.data));

    const headers = authHeader();
    console.log(headers);
    let detailsResponse = await axios
        .get<IUser>("/api/auth", {headers});
    console.log(detailsResponse);
    dispatch(setUserData(detailsResponse.data));

    return detailsResponse.data;

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
    loginUser,
    logout,
};

export default authService;