import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Row, Card, Form, Input, Button, Select, message} from 'antd';
import {UserOutlined, MailOutlined, CalendarOutlined, LockOutlined, PhoneOutlined} from '@ant-design/icons';
import authService from '../services/authService';
import {IRegistration} from "../types/types";

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
        <Row style={{justifyContent: 'center', paddingTop: '20px'}}>
            <Card
                style={{
                    width: '1000px',
                    height: '600px',
                    background: 'linear-gradient(to right, #007bff 50%, white 50%)',
                    borderWidth: '3px',
                }}
            >
                <div style={{display: 'flex'}}>
                    <div
                        style={{
                            flex: 1,
                            color: 'white',
                            padding: '50px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingBottom: '190px',
                        }}
                    >
                        <h1 style={{fontSize: '36px', textAlign: 'center', marginBottom: '20px'}}>
                            Добро пожаловать!
                        </h1>
                        <p style={{fontSize: '18px', textAlign: 'center'}}>
                            Если вы уже зарегистрированы на нашем сайте, то эта форма не для вас.
                        </p>
                        <Link to="/api/auth/signin" style={{marginTop: '20px'}}>
                            <Button type="primary" shape="round" size="large"
                                    style={{backgroundColor: '#0e4acb', color: '#FFFFFF'}}>
                                Авторизироваться
                            </Button>
                        </Link>
                    </div>
                    <div style={{flex: 1, padding: '50px'}}>
                        <h2 style={{fontSize: '24px', marginBottom: '20px', textAlign: 'center'}}>Регистрация</h2>
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
