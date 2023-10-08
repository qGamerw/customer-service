import axios from "axios";

const API_URL = "/api/auth/";

const register = (registration) => {
    const {username, number, dateOfBirth, email, password} = registration;
    return axios.post(API_URL + "signup", {
        username,
        number,
        dateOfBirth,
        email,
        password,
    },);
};

const login = (login) => {
    const {email, password} = login;

    return axios
        .post(API_URL + "signin", {
            email,
            password,
        })
        .then((response) => {
            console.log(response)

            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {

    console.log("logout")
    localStorage.removeItem("user");

};

const authService = {
    register,
    login,
    logout,
};

export default authService;