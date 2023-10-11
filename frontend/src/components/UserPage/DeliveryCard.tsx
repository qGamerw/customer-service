import {Card} from "antd";
import React, {FC} from "react";
import './styles/DeliveryCard.css';

const DeliveryCard: FC = () => {
    return (
        <div className={"deliveryCard"}>
            <Card
                hoverable
                className={"deliveryCard__card"}
            >
                <div className={"deliveryCard__card-fields"}>
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