import {Card} from 'antd';
import React from 'react';
import {IOrder} from '../../types/types';

interface OrderBlockProps {
    order: IOrder;
}

const OrderBlock: React.FC<OrderBlockProps> =
    ({
         order
     }) => {
        return (
            <div className={"orderBlock"}>
                <Card
                    hoverable
                    className={"card"}
                >
                    <div className={"fields"}>
                        <p>Номер заказа: {order.id}</p>
                        <p>Адрес: {order.address}</p>
                        <p>Дата: </p>
                        <p>Заказ:</p>
                    </div>
                </Card>
            </div>
        );
    };

export default OrderBlock;
