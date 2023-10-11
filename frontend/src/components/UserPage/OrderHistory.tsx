import {Space} from 'antd';
import React, {FC} from 'react';
import {IOrder} from '../../types/types';
import OrderBlock from './OrderBlock';
import './styles/OrderHistory.css';

interface OrderHistoryProps {
    orders: IOrder[];
}

const OrderHistory: FC<OrderHistoryProps> =
    ({
         orders
     }) => {
        return (
            <div className={"orderHistory"}>
                {orders.length > 0 ? (
                    <Space direction="horizontal" size="large" wrap>
                        {orders.map((order) => (
                            <OrderBlock
                                order={order}
                                key={order.id}
                            />
                        ))}
                    </Space>
                ) : (
                    <div>Нет выполненных заказов</div>
                )}
            </div>
        );
    };

export default OrderHistory;
