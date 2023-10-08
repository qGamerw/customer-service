import {Button, Card, Layout} from "antd";
import React from "react";

const DeliveryCard = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Card
                hoverable
                style={{
                    width: 500,
                    margin: "50px auto",
                    overflow: 'auto',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                    }}
                >
                    <p>Номер заказа: </p>
                    <p>Адрес: </p>
                    <p>Заказ:</p>
                    <p>Статус заказа:</p>

                </div>
            </Card>
        </div>
    );
};

export default DeliveryCard;