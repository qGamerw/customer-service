import {user} from "../constants/constants";

/**
 * Аутентификационный заголовок
 * @constructor
 */
export default function authHeader() {

    if (user && user.accessToken) {
        return { Authorization: "Bearer " + user.accessToken };
    } else {
        return {};
    }
}