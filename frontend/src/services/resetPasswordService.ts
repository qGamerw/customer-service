import axios from "axios";
import authHeader from "./auth-header";

/**
 * Запрос для сброса пароля по email
 * @constructor
 */
const forgotPassword = async (email: string) => {
    try {
        const response = await axios.put(`/api/auth/reset-password`, {email: email});
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Ошибка при отправке запроса на сброс пароля.");
    }
};

/**
 * Запрос для обновления пароля
 * @constructor
 */
const resetPassword = async (oldPassword: string, newPassword: string) => {
    try {
        const headers = authHeader();
        const response = await axios.put(`/api/auth/change-password`, {oldPassword: oldPassword,
            newPassword: newPassword}, {headers});
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Ошибка при смене пароля");
    }
};

const resetPasswordService = {
    forgotPassword,
    resetPassword,
};

export default resetPasswordService;
