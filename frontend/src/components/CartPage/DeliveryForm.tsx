import React, {FC} from 'react';
import {Button, Form, Input, InputNumber} from 'antd';
import TextArea from "antd/es/input/TextArea";
import PhoneInput from "react-phone-input-2";
import {
    IDeliveryInfo,
    IDishFromCart,
    IDishFromOrderResponse,
    IOrderResponse,
    IUserResponse
} from "../../types/types";
import {user} from "../../constants/constants";
import OrderService from "../../services/orderService";
import {useAppDispatch, useAppSelector} from "../../hooks";

interface DeliveryForm {
    listDishesFromCart: IDishFromCart[];
    totalPrice: number;
}
const DeliveryForm: FC<DeliveryForm> = ({listDishesFromCart, totalPrice}) => {
    // const client: IUserResponse | null = user;
    const dispatch = useAppDispatch();
    const lastOrderId: number = useAppSelector((state) => state.orders.lastOrderId);
    const totalWeight: number = listDishesFromCart.reduce(
        (accumulator: number, item: IDishFromCart | undefined) =>
            accumulator + (item?.weight|| 0) * (item?.quantity || 0), 0
    );

    const listDishesFromOrder: IDishFromOrderResponse[] = listDishesFromCart.map((dish) => {
        return{
            dishId: dish.id,
            dishName: dish.name,
            quantity: dish.quantity,
        }
    })

    const handlePayment = () => {
        OrderService.paymentOfOrderById(user?.id ?? 0, 5, dispatch)

    }

    const onFinish = (values: IDeliveryInfo) => {
        let order: IOrderResponse = {
            ...values,
            clientId: user?.id ?? 0,
            totalPrice: totalPrice,
            weight: totalWeight,
            listDishesFromOrder: listDishesFromOrder
        };
            OrderService.createOrder(order, dispatch).then((orderId) => {
            console.log(orderId)
        })

        const reloadTime = 1;
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
                    <Input
                        placeholder="Введите улицу и номер дома"
                    />
                </Form.Item>
                <Form.Item
                    label="Номер квартиры:"
                    name="flat"
                    rules={[{required: true, message: 'Пожалуйста, введите номер квартиры'}]}
                >
                    <InputNumber placeholder="Квартира"
                    />
                </Form.Item>
                <Form.Item
                    label="Этаж:"
                    name="floor"
                    rules={[{required: true, message: 'Пожалуйста, введите этаж'}]}
                >
                    <InputNumber placeholder="Этаж"
                    />
                </Form.Item>
                <Form.Item
                    label="Номер подъезда:"
                    name="frontDoor"
                    rules={[{required: true, message: 'Пожалуйста, введите номер подъезда'}]}
                >
                    <InputNumber placeholder="Подъезд"
                    />
                </Form.Item>
                <Form.Item
                    label="Телефон:"
                    name="clientPhoneNumber"
                    rules={[{required: true, message: 'Пожалуйста, введите ваш номер телефона!'}]}
                >
                    <PhoneInput
                        country="ru"
                        onlyCountries={["ru"]}
                        placeholder="+7-xxx-xxx-xx-xx"
                    />
                </Form.Item>
                <Form.Item
                    label="Дополнительная информация:"
                    name="description"
                >
                    <TextArea
                        placeholder="Ваши пожелания"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Оформить заказ
                    </Button>
                </Form.Item>
            </Form>
            <Button type="primary" onClick={handlePayment}>
                Оплатить
            </Button>
        </div>
    );
};

export default DeliveryForm;
