import React, {FC, useState} from "react";
import {Button, Card, Input, Form, message} from "antd";
import {
    CalendarOutlined,
    EditOutlined,
    LogoutOutlined,
    MailOutlined,
    SaveOutlined,
} from "@ant-design/icons";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import AuthService from "../../services/authService";
import {Link} from "react-router-dom";
import userService from "../../services/userService";
import {IUserResponse} from "../../types/types";
import {useAppDispatch} from "../../hooks";
import './styles/UserProfile.css';

const UserProfile: FC = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const user: IUserResponse = JSON.parse(localStorage.getItem("user") || "null");
    const [userData, setUserData] = useState<IUserResponse>(user);

    const handleLogout = () => {
        AuthService.logout();
        message.success("Вы успешно вышли! До свидания!");
        const reloadTime = 1;
        setTimeout(() => {
            window.location.reload();
        }, reloadTime);
    };

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = async (values: IUserResponse) => {
        try {
            await userService.updateUser(user?.id, values, dispatch);
            setIsEditing(false);
            message.success("Данные успешно сохранены!");
            const updatedUser = {...user, ...values};
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUserData(updatedUser);
        } catch (error) {
            message.error("Произошла ошибка при сохранении данных.");
        }
    };

    const formatPhoneNumber = (phoneNumber: string | undefined) => {
        if (!phoneNumber) return "";
        const countryCode: string = phoneNumber.slice(0, 1);
        const firstPart: string = phoneNumber.slice(1, 4);
        const secondPart: string = phoneNumber.slice(4, 7);
        const thirdPart: string = phoneNumber.slice(7, 9);
        const fourthPart: string = phoneNumber.slice(9, 12);

        return `+${countryCode} (${firstPart}) ${secondPart}-${thirdPart}-${fourthPart}`;
    };

    return (
        <div className={"userProfile"}>
            <Card hoverable className={"userProfile__card"}>
                <div className="userProfile__content">
                    <div className="userProfile__left">
                        <div className={"userProfile__fields"}>
                            <p>
                                <span className={"infoTitle"}>Имя:</span>
                            </p>
                            <p>
                                <span className={"infoTitle"}>E-mail:</span>
                            </p>
                            <p>
                                <span className={"infoTitle"}>Дата рождения:</span>
                            </p>
                            <p>
                                <span className={"infoTitle"}>Номер телефона:</span>
                            </p>
                        </div>
                    </div>
                    <div className="userProfile__right">
                        {isEditing ? (
                            <Form initialValues={userData} onFinish={handleSave} className={"userProfile__form-fields"}>
                                <Form.Item
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Пожалуйста, введите имя пользователя!",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item name="email">
                                    <Input prefix={<MailOutlined />} disabled={isEditing} />
                                </Form.Item>
                                <Form.Item
                                    name="dateOfBirth"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Пожалуйста, введите дату рождения!",
                                        },
                                    ]}
                                >
                                    <Input prefix={<CalendarOutlined />} type="date" placeholder="Дата рождения" />
                                </Form.Item>
                                <Form.Item
                                    name="number"
                                    validateTrigger={["onBlur"]}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Введите номер телефона",
                                        },
                                    ]}
                                >
                                    <PhoneInput country="ru" onlyCountries={["ru"]} placeholder="+7-xxx-xxx-xx-xx" />
                                </Form.Item>
                                <Form.Item>
                                    <Button className={"userProfile__button_save"}
                                    >
                                        <SaveOutlined />
                                        Сохранить
                                    </Button>
                                </Form.Item>
                            </Form>
                        ) : (
                            <div>
                                <p>
                                    <span>{user.username}</span>
                                </p>
                                <p>
                                    <span>{user.email}</span>
                                </p>
                                <p>
                                    <span>{user.dateOfBirth.toString()}</span>
                                </p>
                                <p>
                                    <span>{formatPhoneNumber(user.number)}</span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <Button className={"userProfile__button_editing"} onClick={toggleEditing}>
                    {isEditing ? <span>Отменить</span> : <EditOutlined />}
                </Button>
                <Link to="/">
                    <Button
                        icon={<LogoutOutlined style={{ fontSize: '30px' }} />}
                        onClick={handleLogout}
                        className={"userProfile__button_logout"}
                    />
                </Link>
            </Card>
        </div>
    );
};

export {UserProfile};