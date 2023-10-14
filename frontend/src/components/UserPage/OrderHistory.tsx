import {Space} from 'antd';
import React, {FC, useEffect} from 'react';
import { IOrderFromHistory} from '../../types/types';
import OrderBlock from './OrderBlock';
import './styles/OrderHistory.css';
import OrderService from "../../services/orderService";
import {user} from "../../constants/constants";
import {useAppDispatch} from "../../hooks";

interface OrderHistory {
    listOrdersFromHistory: IOrderFromHistory[];
}

const OrderHistory: FC<OrderHistory> =
    ({listOrdersFromHistory}) => {
    const client = user;
    const dispatch = useAppDispatch();


    useEffect(() => {
        const getCart = () => {
            OrderService.getOrders(client?.id ?? 0, dispatch)
        };
        getCart();
    }, []);
        return (
            <div className={"orderHistory"}>
                {listOrdersFromHistory.length > 0 ? (
                    <Space direction="horizontal" size="large" wrap>
                        {listOrdersFromHistory.map((order) => (
                            <OrderBlock
                                order={order}
                                key={order.clientId}
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
