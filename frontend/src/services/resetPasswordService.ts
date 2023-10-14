import axios from "axios";

const forgotPassword = (email: string) => {
    return axios.post(`/forgot?email=${email}`)
        .then((response) => response.data)
        .catch((error) => {
            console.error(error);
            throw new Error("Ошибка при отправке запроса на сброс пароля.");
        });
};

const resetPassword = (token: string | undefined, password: string) => {
    return axios.post(`/reset?token=${token}`, {token, password})
        .then((response) => response.data)
        .catch((error) => {
            console.error(error);
            throw new Error("Ошибка при сбросе пароля");
        });
};

const resetPasswordService = {
    forgotPassword,
    resetPassword,
};

export default resetPasswordService;
