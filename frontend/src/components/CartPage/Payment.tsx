import React, {FC, useEffect, useState} from 'react';
import {Button, Checkbox, message} from 'antd';
import {Link} from 'react-router-dom';
import {addMinutes, format} from 'date-fns';
import './styles/Payment.css';
import OrderService from "../../services/orderService";
import {useAppDispatch} from "../../hooks";

interface PaymentProps {
    totalPrice: number;
    children?: React.ReactNode;
}

const Payment: FC<PaymentProps> =
    ({
         totalPrice,
         children
     }) => {
        const [checkBoxOffer, setCheckBoxOffer] = useState<boolean>(true);
        const currentTime: Date = new Date();
        const deliveryTime: Date = addMinutes(currentTime, 60);
        const formattedTime: string = format(deliveryTime, 'HH:mm');

        const handlePayment = () => {
            const orderId = 11;

            OrderService.paymentOfOrderById(orderId)
                .then(() => {
                    message.success('Заказ успешно оплачен');
                })
                .catch((error) => {
                    message.error('Ошибка при оплате заказа: ' + error.message);
                });
        };

        useEffect(() => {
            const cartTotal: Element | null = document.querySelector('.cartPage__total');
            if (cartTotal) {
                if (!checkBoxOffer) {
                    cartTotal.classList.add('cartPage-total-hidden');
                } else {
                    cartTotal.classList.remove('cartPage-total-hidden');
                }
            }
        }, [checkBoxOffer]);


        return (
            <div>
                {children}
                <div>
                    <h2>Оплата</h2>
                    <Checkbox
                        checked={checkBoxOffer}
                        onChange={() => {
                            setCheckBoxOffer(!checkBoxOffer);
                        }}
                    >
                        Соглашаюсь на распространение указанных в заказе персональных данных третьим лицам. С
                        условиями{' '}
                        <Link to={'https://p.finance/pdf/offer_ru.pdf'}>Публичной оферты</Link> ознакомлен.
                    </Checkbox>
                    {!checkBoxOffer && (
                        <div>
                            <span
                                style={{color: 'red'}}>Необходимо подтвердить согласие с условиями публичной оферты</span>
                        </div>
                    )}
                    <h4>Доставим до: {formattedTime}</h4>
                    <h3>К оплате: {totalPrice} ₽</h3>
                    <Button
                        onClick={handlePayment}
                        type="primary"
                        htmlType="button"
                    >
                        Оплатить
                    </Button>
                </div>
            </div>
        );
    };

export default Payment;