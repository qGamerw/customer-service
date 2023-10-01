import React, { useState} from "react";
import {Button, Card, Input, Form, message} from "antd";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import AuthService from "../../services/authService";

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState()
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        AuthService.logout();
        message.success("Вы успешно вышли! До свидания!")
    };

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = (values) => {
        setUserData(values);
        setIsEditing(false);
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
                        style={{ padding: "16px" }}
                    >
                        <Form.Item label="Имя" name="username">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Дата рождения" name="dateOfBirth">
                            <Input />
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
                                <SaveOutlined />
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
                            Дата рождения: <span>{user.dateOfBirth}</span>
                        </p>
                        <p>
                            Номер телефона: <span>{user.number}</span>
                        </p>
                    </div>
                )}

                <Button
                    type="primary"
                    style={{
                        background: "black",
                        fontWeight: "bold",
                        margin: "10px 0",
                    }}
                    onClick={toggleEditing}
                >
                    {isEditing ? <span>Отменить</span> : <EditOutlined />}
                </Button>
            </Card>
        </div>
    );
};

export default UserProfile;
