import React, {FC} from 'react';
import {Form, Input, Button, message} from 'antd';
import {useParams} from 'react-router-dom';
import resetPasswordService from '../services/resetPasswordService';
import './styles/ResetPassword.css';

const ResetPassword: FC = () => {
    const {token} = useParams<{ token: string | undefined }>();

    const handleFormSubmit = async (values: { password: string, confirmPassword: string }) => {
        if (!token) {
            message.error('Токен отсутствует. Невозможно выполнить сброс пароля');
            return;
        }

        if (values.password !== values.confirmPassword) {
            message.error('Введенные пароли не совпадают');
            return;
        }

        try {
            await resetPasswordService.resetPassword(token, values.password);
            message.success('Пароль успешно сброшен');
        } catch (error) {
            message.error('Ошибка при сбросе пароля');
        }
    };

    return (
        <div className="reset-password-container">
            <h1 className="reset-password-title">Установка нового пароля</h1>
            <Form className="reset-password-form" onFinish={handleFormSubmit}>
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
                    name="confirmPassword"
                    label="Подтвердите пароль"
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
                    <Button type="primary" htmlType="submit" className="reset-password-submit-button">
                        Установить новый пароль
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ResetPassword;
