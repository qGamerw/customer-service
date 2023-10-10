import {Space} from 'antd';
import React from 'react';
import {IOrder} from '../../types/types';
import OrderBlock from './OrderBlock';

interface OrderHistoryProps {
    orders: IOrder[];
}

const OrderHistory: React.FC<OrderHistoryProps> =
    ({
         orders
    }) => {
    return (
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
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
