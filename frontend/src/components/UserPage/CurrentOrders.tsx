import {Space} from "antd";
import React, {FC, useEffect} from "react";
import './styles/DeliveryCard.css';
import {IOrderFromHistory} from "../../types/types";
import OrderBlock from "./OrderBlock";
import OrderService from "../../services/orderService";
import {user} from "../../constants/constants";
import {useAppDispatch} from "../../hooks";

interface CurrentOrders {
    listOfCurrentOrders: IOrderFromHistory[];
}

const CurrentOrders: FC<CurrentOrders> = ({listOfCurrentOrders}) => {
    const dispatch = useAppDispatch();
    const client = user;
    useEffect(() => {
        const getCart = () => {
            OrderService.getOrders(client?.id ?? 0, dispatch)
        };
        getCart();
    }, []);
    return (
        <div className={"deliveryCard"}>
            {listOfCurrentOrders.length > 0 ? (
                <Space direction="horizontal" size="large" wrap>
                    {listOfCurrentOrders.map((order) => (
                        <OrderBlock
                            order={order}
                            key={order.id}
                        />
                    ))}
                </Space>
            ) : (
                <div>Нет текущих заказов</div>
            )}
        </div>
    );
};

export default CurrentOrders;