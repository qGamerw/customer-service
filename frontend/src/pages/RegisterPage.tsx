import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Row, Card, Form, Input, Button, Select, message} from 'antd';
import {UserOutlined, MailOutlined, CalendarOutlined, LockOutlined, PhoneOutlined} from '@ant-design/icons';
import authService from '../services/authService';
import {IRegistration} from "../types/types";
import './styles/RegisterPage.css';

const {Option} = Select;

const RegisterPage: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = (values: IRegistration) => {
        authService
            .register(values)
            .then(() => {
                message.success('Вы успешно зарегистрированы');
                navigate('/api/auth/signin');
            })
            .catch((error) => {
                message.error('Ошибка при регистрации');
                console.error(error);
            });
    };

    const [value, setValue] = useState<number>(1);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('radio checked', e.target.value);
        setValue(Number(e.target.value));
    };

    return (
        <Row className={"row"}>
            <Card className={"card"}>
                <div style={{display: 'flex'}}>
                    <div className={"divCard"}>
                        <h1 className={"h1_card"}>
                            Добро пожаловать!
                        </h1>
                        <p className={"p_card"}>
                            Если вы уже зарегистрированы на нашем сайте, то эта форма не для вас.
                        </p>
                        <Link to="/api/auth/signin" style={{marginTop: '20px'}}>
                            <Button
                                type="primary"
                                shape="round"
                                size="large"
                                className={"buttonAuth"}>
                                Авторизироваться
                            </Button>
                        </Link>
                    </div>
                    <div style={{flex: 1, padding: '50px'}}>
                        <h2 className={"h2_card"}>
                            Регистрация
                        </h2>
                        <Form form={form} layout="vertical" name="register" onFinish={onFinish}>
                            <Form.Item
                                name="username"
                                rules={[{required: true, message: 'Пожалуйста, введите имя пользователя!'}]}
                            >
                                <Input prefix={<UserOutlined/>} placeholder="Имя пользователя"/>
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[{required: true, message: 'Пожалуйста, введите email!'}]}
                            >
                                <Input prefix={<MailOutlined/>} type="email" placeholder="Email"/>
                            </Form.Item>
                            <Form.Item
                                name="number"
                                rules={[{required: true, message: 'Пожалуйста, введите номер телефона!'}]}
                            >
                                <Input prefix={<PhoneOutlined/>} placeholder="Номер телефона"/>
                            </Form.Item>
                            <Form.Item
                                name="dateOfBirth"
                                rules={[{required: true, message: 'Пожалуйста, введите дату рождения!'}]}
                            >
                                <Input prefix={<CalendarOutlined/>} type="date" placeholder="Дата рождения"/>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{required: true, message: 'Пожалуйста, введите пароль!'}]}
                            >
                                <Input.Password prefix={<LockOutlined/>} placeholder="Пароль"/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{backgroundColor: '#0e4acb'}}>
                                    Зарегистрироваться
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Card>
        </Row>
    );
};

export default RegisterPage;
