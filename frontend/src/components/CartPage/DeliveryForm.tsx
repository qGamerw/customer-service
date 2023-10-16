import React, {FC, useState} from 'react';
import TextArea from "antd/es/input/TextArea";
import {Button, Form, Input, InputNumber, Radio} from 'antd';
import PhoneInput from 'react-phone-input-2';
import {
    IDeliveryInfo,
    IDishFromCart,
    IDishFromOrderResponse,
    IOrderResponse,
} from '../../types/types';
import {user} from '../../constants/constants';
import Payment from "./Payment";
import {addMinutes, format} from "date-fns";
import OrderService from "../../services/orderService";
import {useAppDispatch} from "../../hooks";

interface DeliveryFormProps {
    listDishesFromCart: IDishFromCart[];
    totalPrice: number;
}

const DeliveryForm: FC<DeliveryFormProps> = ({
                                                 listDishesFromCart,
                                                 totalPrice,
                                             }) => {
    const dispatch = useAppDispatch();
    const currentTime: Date = new Date();
    const deliveryTime: Date = addMinutes(currentTime, 60);
    const [paymentMethod, setPaymentMethod] = useState('online');
    const formattedTime: string = format(deliveryTime, 'HH:mm');

    const onPaymentMethodChange = (e: any) => {
        setPaymentMethod(e.target.value);
    };

    const totalWeight = listDishesFromCart.reduce(
        (accumulator, item) => accumulator + (item?.weight || 0) * (item?.quantity || 0),
        0
    );

    const listDishesFromOrder: IDishFromOrderResponse[] = listDishesFromCart.map((dish) => ({
        dishId: dish.id,
        dishName: dish.name,
        quantity: dish.quantity,
    }));

    const handlePayment = () => {
        OrderService.paymentOfOrderById(user?.id ?? 0, 5, dispatch)
    };

    const onFinish = (values: IDeliveryInfo) => {
        let order: IOrderResponse = {
            ...values,
            clientId: user?.id ?? 0,
            totalPrice: totalPrice,
            weight: totalWeight,
            listDishesFromOrder: listDishesFromOrder,
        };

        OrderService.createOrder(order, dispatch).then((orderId) => {
            console.log(orderId)
        })

        const reloadTime = 1000;
        setTimeout(() => {
            window.location.reload();
        }, reloadTime);
    };

    return (
        <div className="cartPage--content--delivery">
            <h2>Информация о доставке</h2>
            <Form name="deliveryForm" onFinish={onFinish}>
                <Form.Item
                    label="Имя:"
                    name="clientName"
                    rules={[{required: true, message: 'Пожалуйста, введите ваше имя!'}]}
                >
                    <Input placeholder="Введите имя"/>
                </Form.Item>
                <Form.Item
                    label="Адрес:"
                    name="address"
                    rules={[{required: true, message: 'Пожалуйста, введите ваш адрес!'}]}
                >
                    <Input placeholder="Введите улицу и номер дома"/>
                </Form.Item>
                <Form.Item
                    label="Номер квартиры:"
                    name="flat"
                    rules={[{required: true, message: 'Пожалуйста, введите номер квартиры'}]}
                >
                    <InputNumber placeholder="Квартира"/>
                </Form.Item>
                <Form.Item
                    label="Этаж:"
                    name="floor"
                    rules={[{required: true, message: 'Пожалуйста, введите этаж'}]}
                >
                    <InputNumber placeholder="Этаж"/>
                </Form.Item>
                <Form.Item
                    label="Номер подъезда:"
                    name="frontDoor"
                    rules={[{required: true, message: 'Пожалуйста, введите номер подъезда'}]}
                >
                    <InputNumber placeholder="Подъезд"/>
                </Form.Item>
                <Form.Item
                    label="Телефон:"
                    name="clientPhoneNumber"
                    rules={[{required: true, message: 'Пожалуйста, введите ваш номер телефона!'}]}
                >
                    <PhoneInput country="ru" onlyCountries={['ru']} placeholder="+7-xxx-xxx-xx-xx"/>
                </Form.Item>
                <Form.Item label="Дополнительная информация:" name="description">
                    <TextArea placeholder="Ваши пожелания"/>
                </Form.Item>
                <Form.Item label="Способ оплаты: ">
                    <Radio.Group onChange={onPaymentMethodChange} value={paymentMethod}>
                        <Radio.Button value="online">Онлайн оплата</Radio.Button>
                        <Radio.Button value="offline">Оплата на месте</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                {paymentMethod === 'online' && (
                    <div>
                        <Payment totalPrice={totalPrice}/>
                        <Button
                            onClick={handlePayment}
                            type="primary"
                            htmlType="submit"
                        >
                            Оплатить
                        </Button>
                    </div>
                )}
                {paymentMethod === 'offline' && (
                    <div>
                        <h4>Доставим до: {formattedTime}</h4>
                        <h3>К оплате: {totalPrice} ₽</h3>
                        <Button type="primary" htmlType="submit">
                            Оформить заказ
                        </Button>
                    </div>
                )}
            </Form>
        </div>
    );
};

export default DeliveryForm;
