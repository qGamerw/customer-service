import {Card} from 'antd';
import React, {FC} from 'react';
import {IOrder} from '../../types/types';

interface OrderBlockProps {
    order: IOrder;
}

const OrderBlock: FC<OrderBlockProps> =
    ({
         order
     }) => {
        return (
            <div className={"orderBlock"}>
                <Card
                    hoverable
                    className={"orderBlock__card"}
                >
                    <div className={"orderBlock__card-"}>
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
