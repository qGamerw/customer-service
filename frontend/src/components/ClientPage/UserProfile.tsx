import React, {useState} from "react";
import {Button, Card, Input, Form, message} from "antd";
import {CalendarOutlined, EditOutlined, LogoutOutlined, MailOutlined, SaveOutlined} from "@ant-design/icons";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import AuthService from "../../services/authService";
import {Link} from "react-router-dom";
import clientService from "../../services/clientService";
import { useDispatch } from 'react-redux';
import {user} from "../../constants/constants";


const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
       const [userData, setUserData] = useState(user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        AuthService.logout();
        message.success("Вы успешно вышли! До свидания!")
        const reloadTime = 1;
        setTimeout(() => {
            window.location.reload();
        }, reloadTime);
    };

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };


    const handleSave = async (values) => {
        try {
            await clientService.updateClient(user?.id, values, dispatch);
            setIsEditing(false);
            message.success("Данные успешно сохранены!");
            const updatedUser = { ...user, ...values };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUserData(updatedUser);
        } catch (error) {
            message.error("Произошла ошибка при сохранении данных.");
        }
    };

    const formatPhoneNumber = (phoneNumber) => {
        if (!phoneNumber) return '';
        const countryCode = phoneNumber.slice(0, 1);
        const firstPart = phoneNumber.slice(1, 4);
        const secondPart = phoneNumber.slice(4, 7);
        const thirdPart = phoneNumber.slice(7, 9);
        const fourthPart = phoneNumber.slice(9, 12);

        return `+${countryCode} (${firstPart}) ${secondPart}-${thirdPart}-${fourthPart}`;
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Card
                hoverable
                style={{
                    width: 500,
                    margin: "50px auto",

                }}
            >
                {isEditing ? (
                    <Form
                        initialValues={userData}
                        onFinish={handleSave}
                        style={{padding: "16px"}}
                    >
                        <Form.Item label="Имя" name="username"
                            rules={[{required: true, message: 'Пожалуйста, введите имя пользователя!'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label="E-mail"
                            name="email"
                        >
                            <Input
                                prefix={<MailOutlined />}
                                disabled={isEditing}
                            />
                        </Form.Item>
                        <Form.Item label="Дата рождения"
                            name="dateOfBirth"
                            rules={[{required: true, message: 'Пожалуйста, введите дату рождения!'}]}
                        >
                            <Input prefix={<CalendarOutlined/>} type="date" placeholder="Дата рождения"/>
                        </Form.Item>
                        <Form.Item
                            label="Номер телефона"
                            name="number"
                            validateTrigger={['onBlur']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите номер телефона',
                                },
                            ]}
                        >
                            <PhoneInput
                                country="ru"
                                onlyCountries={["ru"]}
                                placeholder="+7-xxx-xxx-xx-xx"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                <SaveOutlined/>
                                Сохранить
                            </Button>
                        </Form.Item>
                    </Form>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "left",
                        }}
                    >
                        <p>
                            Имя: <span>{user.username}</span>
                        </p>
                        <p>
                            E-mail: <span>{user.email}</span>
                        </p>
                        <p>
                            Дата рождения: <span>{user.dateOfBirth}</span>
                        </p>
                        <p>
                            Номер телефона:   <span> {formatPhoneNumber(user.number)}</span>
                        </p>
                    </div>
                )}

                <Button
                    style={{
                        background: "black",
                        fontWeight: "bold",
                        margin: "10px 0",
                        color: 'white'
                    }}
                    onClick={toggleEditing}
                >
                    {isEditing ? <span>Отменить</span> : <EditOutlined/>}
                </Button>
                <Link to="/">
                    <Button
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                        style={{
                            width: '45.6px',
                            background: 'black',
                            color: 'white',
                            marginLeft: '20px' }}
                    />
                </Link>

            </Card>
        </div>
    );
};

export default UserProfile;
