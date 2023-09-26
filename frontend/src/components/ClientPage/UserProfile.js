import React, { useState } from "react";
import {Button, Card, Input, Form, Radio} from "antd";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        name: "Иван",
        birthDate: "23/02/2001",
        gender: "муж",
        phoneNumber: "",
    });

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
                        <Form.Item label="Имя" name="name">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Дата рождения" name="birthDate">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Пол" name="gender">
                            <Radio.Group>
                                <Radio value="муж">Мужской</Radio>
                                <Radio value="жен">Женский</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="Номер телефона"
                            name="phoneNumber"
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
                            Имя: <span>{userData.name}</span>
                        </p>
                        <p>
                            Дата рождения: <span>{userData.birthDate}</span>
                        </p>
                        <p>
                            Пол: <span>{userData.gender}</span>
                        </p>
                        <p>
                            Номер телефона: <span>{userData.phoneNumber}</span>
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
