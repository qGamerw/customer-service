import {Card} from "antd";
import React from "react";
import './styles/DeliveryCard.css';

const DeliveryCard = () => {
    return (
        <div className={"deliveryCard"}>
            <Card
                hoverable
                className={"card"}
            >
                <div className={"fields"}>
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