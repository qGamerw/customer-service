import {Button, Card, Modal, message} from 'antd';
import React, {FC, useState} from 'react';
import {IOrderFromHistory} from '../../types/types';
import TextArea from 'antd/es/input/TextArea';
import orderService from '../../services/orderService';
import {useAppDispatch} from '../../hooks';

interface OrderBlockProps {
    order: IOrderFromHistory;
}

const OrderBlock: FC<OrderBlockProps> = ({order}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [cancelReason, setCancelReason] = useState('');
    const dispatch = useAppDispatch();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if (cancelReason) {
            const userId = order.clientId;
            const orderId = order.id;

            orderService
                .cancelOrder(userId, orderId, cancelReason, dispatch)
                .then(() => {
                    orderService.getOrders(userId, dispatch);
                    setIsModalVisible(false);
                    message.success('Заказ успешно отменен');
                })
                .catch((error) => {
                    message.error('Ошибка при отмене заказа: ' + error.message);
                });
        } else {
            message.error('Введите причину отмены заказа');
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="orderBlock">
            <Card hoverable className="orderBlock__card">
                <div className="orderBlock__card-content">
                    <p>Номер заказа: {order.id}</p>
                    <p>Адрес: {order.address}, кв. {order.flat}, этаж {order.floor}, подъезд {order.frontDoor}</p>
                    <p>Дата и время заказа: {order.orderTime}</p>
                    <p>Стоимость: {order.totalPrice} ₽</p>
                    <p>Статус: {order.status}</p>
                    <p>Блюда:</p>
                    <ul>
                        {order.listDishesFromOrder.map((dish) => (
                            <li key={dish.dishId}>
                                {dish.dishName} - Количество: {dish.quantity}
                            </li>
                        ))}
                    </ul>
                    {order.status === 'CANCELLED' ? (
                        <p></p>
                    ) : (
                        <Button
                            style={{backgroundColor: 'red'}}
                            type="primary"
                            onClick={showModal}>
                            Отменить заказ
                        </Button>
                    )}
                </div>
            </Card>
            <Modal
                title="Причина отмены заказа"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <TextArea
                    placeholder="Введите причину отмены заказа"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                />
            </Modal>
        </div>
    );
};

export {OrderBlock};
