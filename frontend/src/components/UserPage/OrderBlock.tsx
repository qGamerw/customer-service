import { Card } from 'antd';
import React, { FC } from 'react';
import { IOrderFromHistory} from '../../types/types';

interface OrderBlockProps {
    order: IOrderFromHistory;
}

const OrderBlock: FC<OrderBlockProps> = ({ order }) => {
    return (
        <div className="orderBlock">
            <Card hoverable className="orderBlock__card">
                <div className="orderBlock__card-content">
                    <p>Номер заказа: {order.id}</p>
                    <p>Адрес: {order.address}, кв. {order.flat}, этаж {order.floor}, подъезд {order.frontDoor}</p>
                    <p>Дата и время заказа: {order.orderTime}</p>
                    <p>Стоимость: {order.totalPrice} ₽</p>
                    <p>Статус: {order.status}</p>
                    <p>Блюда:</p>
                    <ul>
                        {order.listDishesFromOrder.map((dish) => (
                            <li key={dish.dishId}>
                                {dish.dishName} - Количество: {dish.quantity}
                            </li>
                        ))}
                    </ul>

                </div>
            </Card>
        </div>
    );
};

export default OrderBlock;
