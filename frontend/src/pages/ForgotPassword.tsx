import React, {FC, useState} from 'react';
import {Form, Input, Button, message} from 'antd';
import resetPasswordService from '../services/resetPasswordService';
import './styles/ForgotPassword.css';

const ForgotPassword: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [success] = useState<boolean>(false);
    const [error] = useState<string>('');

    const handleFormSubmit = async (values: { email: string }) => {
        setLoading(true);
        console.log(values);

        try {
            await resetPasswordService.forgotPassword(values.email);
            message.success("Ссылка для сброса пароля успешно отправлена")
        } catch (err) {
            message.error("Ошибка при отправке письма на почту")
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-container">
            <h1 className="forgot-password-title">Забыли пароль?</h1>
            {success && (
                <div className="success-message">
                    Сообщение успешно отправлено на вашу почту. Пожалуйста, проверьте вашу почту и следуйте инструкциям.
                </div>
            )}
            {error && <div className="error-message">{error}</div>}
            <Form
                className="forgot-password-form"
                onFinish={handleFormSubmit}
            >
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите ваш Email!',
                        },
                        {
                            type: 'email',
                            message: 'Введите корректный Email!',
                        },
                    ]}
                >
                    <Input type="email" name="email"/>
                </Form.Item>
                <div className="forgot-password-button-container">
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="forgot-password-submit-button"
                            loading={loading}
                        >
                            Отправить ссылку для сброса пароля
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default ForgotPassword;
