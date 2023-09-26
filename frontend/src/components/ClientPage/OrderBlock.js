import {Button, Card, Layout} from "antd";
import React from "react";

const OrderBlock = ({order}) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Card
                hoverable
                style={{
                    width: 500,
                    margin: '50px auto',
                    overflow: 'auto',
                    wordWrap: 'break-word',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                    }}
                >
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
