import axios from "axios";

/**
 * Запрос для отправки сообщения с ссылкой на сброс пароля на почту
 * @constructor
 */
const forgotPassword = (email: string) => {
    return axios.post(`/forgot`, {email: email})
        .then((response) => response.data)
        .catch((error) => {
            console.error(error);
            throw new Error("Ошибка при отправке запроса на сброс пароля.");
        });
};

/**
 * Запрос для обновления пароля
 * @constructor
 */
const resetPassword = (token: string | undefined, password: string, confirmPassword: string) => {
    return axios.post(`/reset?token=${token}`, {password, confirmPassword})
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
