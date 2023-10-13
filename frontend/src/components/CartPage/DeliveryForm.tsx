import React, {FC, useState} from 'react';
import {Button, Form, Input, InputNumber, Radio} from 'antd';
import TextArea from "antd/es/input/TextArea";
import PhoneInput from "react-phone-input-2";
import {IDeliveryInfo, IDishFromCart, IDishFromOrderResponse, IOrderResponse, IUserResponse} from "../../types/types";
import {user} from "../../constants/constants";
import OrderService from "../../services/orderService";

interface DeliveryForm {
    listDishesFromCart: IDishFromCart[];
    totalPrice: number;
}
const DeliveryForm: FC<DeliveryForm> = ({listDishesFromCart, totalPrice}) => {

    const [username, setUsername] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [flat, setFlat] = useState<number>(0);
    const [floor, setFloor] = useState<number>(0);
    const [frontDoor, setFrontDoor] = useState<number>(0);
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const client: IUserResponse | null = user;
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


    const onFinish = (values: IDeliveryInfo) => {
        let order: IOrderResponse = {
            ...values,
            clientId: client?.id ?? 0,
            totalPrice: totalPrice,
            totalWeight: totalWeight,
            listDishesFromOrder: listDishesFromOrder
        };
        OrderService.createOrder(order);
    };

    return (
        <div>
            <h2>Информация о доставке</h2>
            <Form name="deliveryForm" onFinish={onFinish}>
                <Form.Item
                    label="Имя:"
                    name="clientName"
                    rules={[{required: true, message: 'Пожалуйста, введите ваше имя!'}]}
                >
                    <Input value={username} onChange={(e) => setUsername(e.target.value)}/>
                </Form.Item>
                <Form.Item
                    label="Адрес:"
                    name="address"
                    rules={[{required: true, message: 'Пожалуйста, введите ваш адрес!'}]}
                >
                    <Input
                        value={address} onChange={(e) => setAddress(e.target.value)}
                        placeholder="Введите улицу и номер дома"
                    />
                </Form.Item>
                <Form.Item
                    label="Номер квартиры:"
                    name="flat"
                    rules={[{required: true, message: 'Пожалуйста, введите номер квартиры'}]}
                >
                    <InputNumber
                        value={flat} onChange={(flat) => setFlat(flat ?? 0)}
                    />
                </Form.Item>
                <Form.Item
                    label="Этаж:"
                    name="floor"
                    rules={[{required: true, message: 'Пожалуйста, введите этаж'}]}
                >
                    <InputNumber
                        value={floor} onChange={(floor) => setFloor(floor ?? 0)}
                    />
                </Form.Item>
                <Form.Item
                    label="Номер подъезда:"
                    name="frontDoor"
                    rules={[{required: true, message: 'Пожалуйста, введите номер подъезда'}]}
                >
                    <InputNumber
                        value={frontDoor} onChange={(e) => setFrontDoor(frontDoor ?? 0)}
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
                        value={description} onChange={(e) => setDescription(e.target.value)}
                        placeholder="Ваше пожелание"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Оформить заказ
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default DeliveryForm;
