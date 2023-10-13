import {Space} from 'antd';
import React, {FC, useEffect} from 'react';
import {IDish, IOrderFromHistory, IOrderResponse} from '../../types/types';
import OrderBlock from './OrderBlock';
import './styles/OrderHistory.css';
import OrderService from "../../services/orderService";
import {user} from "../../constants/constants";
import {useAppDispatch, useAppSelector} from "../../hooks";

interface OrderHistory {
    listOrders: IOrderFromHistory[];
}

const OrderHistory: FC<OrderHistory> =
    ({listOrders}) => {
    const client = user;
    const dispatch = useAppDispatch();

        console.log(listOrders)

    useEffect(() => {
        const getCart = () => {
            // OrderService.getOrders(client?.id ?? 0, dispatch)
        };
        getCart();
    }, []);
        return (
            <div className={"orderHistory"}>
                {listOrders.length > 0 ? (
                    <Space direction="horizontal" size="large" wrap>
                        {listOrders.map((order) => (
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
