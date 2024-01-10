import React, {FC, useEffect, useState} from "react";
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
import authService from "../../services/authService";
import {IUserResponse} from "../../types/types";
import {useAppDispatch} from "../../hooks";
import './styles/UserProfile.css';
import {RootState} from "../../store";
import {useSelector} from "react-redux";
import resetPasswordService from "../../services/resetPasswordService";

/**
 * Вкладка профиля пользователя
 * @constructor
 */
const UserProfile: FC = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const user = useSelector((store: RootState) => store.auth.user);
    const [success, setSuccess] = useState<boolean>(false);
    const handleLogout = () => {
        AuthService.logout();
        message.success("Вы успешно вышли! До свидания!");
        const reloadTime = 1;
        setTimeout(() => {
            window.location.reload();
        }, reloadTime);
    };

    const toggleEditing = () => {
        setSuccess(false);
        setIsEditing(!isEditing);
    };

    const handleFormSubmit = async (values: { oldPassword: string, password: string, newPassword: string }) => {


        if (values.password !== values.newPassword) {
            message.error('Введенные пароли не совпадают');
            return;
        } else if(values.oldPassword === values.newPassword){
            message.error('Новый пароль не должен соответсвовать старому!');
            return;
        }

        try {
            await resetPasswordService.resetPassword(values.oldPassword, values.newPassword);
            setSuccess(true);
        } catch (error) {
            message.error('Ошибка при сбросе пароля');
        }
    };

    const handleSave = (values: IUserResponse) => {
        try {
            authService.updateUser(values, dispatch);
            window.location.reload();
            setIsEditing(false);
            message.success("Данные успешно сохранены!");

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
                        {user && isEditing ? (
                            <>
                                <Form initialValues={user} onFinish={handleSave} className={"userProfile__form-fields"}>
                                    <Form.Item
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Пожалуйста, введите имя пользователя!",
                                            },
                                        ]}
                                    >
                                        <Input disabled={true}/>
                                    </Form.Item>
                                    <Form.Item name="email" rules={[
                                        {
                                            required: true,
                                            message: "Пожалуйста, введите почту!",
                                        },
                                    ]}>
                                        <Input prefix={<MailOutlined/>}/>
                                    </Form.Item>
                                    <Form.Item
                                        name="birthdate"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Пожалуйста, введите дату рождения!",
                                            },
                                        ]}
                                    >
                                        <Input prefix={<CalendarOutlined/>} disabled={true} type="date"
                                               placeholder="Дата рождения"/>
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
                                        <PhoneInput country="ru" onlyCountries={["ru"]} placeholder="+7-xxx-xxx-xx-xx"/>
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit"
                                                className={"userProfile__button_save"}

                                        >
                                            <SaveOutlined/>
                                            Сохранить
                                        </Button>
                                    </Form.Item>
                                </Form>

                                <h1 className="resetPassword-h1">Установка нового пароля</h1>
                                <Form className="resetPassword__form-content" onFinish={handleFormSubmit}>
                                    <Form.Item
                                        name="oldPassword"
                                        label="Старый пароль"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Пожалуйста, введите старый пароль!',
                                            },
                                        ]}
                                    >
                                        <Input type="password"/>
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        label="Новый пароль"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Пожалуйста, введите новый пароль!',
                                            },
                                        ]}
                                    >
                                        <Input type="password"/>
                                    </Form.Item>
                                    <Form.Item
                                        name="newPassword"
                                        label="Подтверждение"
                                        dependencies={['password']}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Пожалуйста, подтвердите пароль!',
                                            },
                                            ({getFieldValue}) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('Введенные пароли не совпадают!'));
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input type="password"/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit"
                                                className={"userProfile__button_save"}>
                                            Изменить
                                        </Button>
                                    </Form.Item>
                                </Form>
                                {success && <h1 className="resetPassword-h1" style={{color:"green", textAlign:"center"}}> Успех!</h1>}
                            </>
                        ) : (
                            <div>
                                <p>
                                    <span>{user && user.username}</span>
                                </p>
                                <p>
                                    <span>{user && user.email}</span>
                                </p>
                                <p>
                                    <span>{user && user.birthdate.toString()}</span>
                                </p>
                                <p>
                                    <span>{user && formatPhoneNumber(user.number)}</span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <Button className={"userProfile__button_editing"} onClick={toggleEditing}>
                    {isEditing ? <span>Отменить</span> : <EditOutlined/>}
                </Button>
                <Link to="/">
                    <Button
                        icon={<LogoutOutlined style={{fontSize: '30px'}}/>}
                        onClick={handleLogout}
                        className={"userProfile__button_logout"}
                    />
                </Link>
            </Card>
        </div>
    );
};

export {UserProfile};