import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Row, Card, Form, Input, Button, message} from 'antd';
import {LockOutlined, MailOutlined} from '@ant-design/icons';
import {login} from "../slices/authSlice";
import authService from "../services/authService";
import {useDispatch} from "react-redux";

const AuthPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = (values) => {
        authService.login(values).then((user) => {
            console.log(user)
            dispatch(login(user))
            message.success("Вы успешно вошли в систему! Здравствуйте!")
            navigate("/")
        }, (error) => {
            const _content = (error.response && error.response.data) || error.message || error.toString();
            console.log(_content);
            message.error("Неверно указан логин или пароль!")
        });
    };

    return (
        <Row style={{justifyContent: 'center', paddingTop: '20px'}}>
            <Card style={{
                width: '1000px',
                height: '600px',
                background: 'linear-gradient(to right, #007bff 50%, white 50%)',
                borderWidth: "3px"
            }}>
                <div style={{display: 'flex'}}>
                    <div style={{
                        flex: 1,
                        color: 'white',
                        padding: '50px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingBottom: '30px'
                    }}>
                        <h1 style={{fontSize: '36px', textAlign: 'center', marginBottom: '20px'}}>
                            Здравствуйте!
                        </h1>
                        <p style={{fontSize: '18px', textAlign: 'center'}}>
                            Если вы впервые у нас в гостях, и у вас нет аккаунта, то вы можете зарегистрироваться на
                            нашем сайте.
                        </p>
                        <Link to="/api/auth/signup" style={{marginTop: '20px'}}>
                            <Button type="primary" shape="round" size="large"
                                    style={{backgroundColor: '#0e4acb', color: '#FFFFFF'}}>
                                Зарегистрироваться
                            </Button>
                        </Link>
                    </div>
                    <div style={{flex: 1, padding: '50px'}}>
                        <h2 style={{fontSize: '24px', marginBottom: '20px', textAlign: 'center'}}>Авторизация</h2>
                        <Form
                            name="normal_login"
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="email"
                                rules={[{required: true, message: 'Пожалуйста, введите email!'}]}
                            >
                                <Input prefix={<MailOutlined/>} type="email" placeholder="Email"/>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{required: true, message: 'Пожалуйста, введите пароль!'}]}
                            >
                                <Input.Password prefix={<LockOutlined/>} placeholder="Пароль"/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{backgroundColor: '#0e4acb'}}>
                                    Войти
                                </Button>
                            </Form.Item>
                        </Form>
                        <p style={{fontSize: '18px', textAlign: 'center'}}>Забыли пароль? <Link
                            to="/recovery">Восстановите</Link></p>
                    </div>
                </div>
            </Card>
        </Row>
    );
};

export default AuthPage;
