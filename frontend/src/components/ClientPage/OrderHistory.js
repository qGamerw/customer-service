import {Button, Card, Layout, Space} from "antd";
import React from "react";
import OrderBlock from "./OrderBlock";


const OrderHistory = ({ orders }) => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {orders.length > 0 ? (
                <Space direction="horizontal" size="large" wrap>
                    {orders.map((order) => (
                        <OrderBlock
                            order = {order}
                            key = {order.id}
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
