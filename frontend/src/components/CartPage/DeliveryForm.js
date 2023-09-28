import React, {useState} from 'react';
import {Form, Input, Radio, Button} from 'antd';

const DeliveryForm = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [deliveryMethod, setDeliveryMethod] = useState('courier'); // Устанавливаем начальное значение по умолчанию

    const onFinish = (values) => {
        // Обработка данных формы
        console.log('Received values:', values);
    };

    return (
        <div>
            <h2>Информация о доставке</h2>
            <Form name="deliveryForm" onFinish={onFinish}>
                <Form.Item
                    label="Имя:"
                    name="username"
                    rules={[{required: true, message: 'Пожалуйста, введите ваше имя!'}]}
                >
                    <Input value={name} onChange={(e) => setName(e.target.value)}/>
                </Form.Item>
                <Form.Item
                    label="Адрес:"
                    name="address"
                    rules={[{required: true, message: 'Пожалуйста, введите ваш адрес!'}]}
                >
                    <Input value={address} onChange={(e) => setAddress(e.target.value)}/>
                </Form.Item>
                <Form.Item
                    label="Телефон:"
                    name="number"
                    rules={[{required: true, message: 'Пожалуйста, введите ваш номер телефона!'}]}
                >
                    <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                </Form.Item>
                <Form.Item label="Способ доставки:" name="deliveryMethod">
                    <Radio.Group onChange={(e) => setDeliveryMethod(e.target.value)} value={deliveryMethod}>
                        <Radio value="courier">Курьер</Radio>
                        <Radio value="pickup">Самовывоз</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </div>
    );
};

export default DeliveryForm;
