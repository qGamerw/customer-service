import React, {FC, useEffect, useState} from 'react';
import {Button, Checkbox} from 'antd';
import {Link} from 'react-router-dom';
import {addMinutes, format} from 'date-fns';
import './styles/Payment.css';
import StripeCheckout, {Token} from 'react-stripe-checkout';

interface PaymentProps {
    totalPrice: number;
    onFinish: () => void;
}

const Payment: FC<PaymentProps> =
    ({
         totalPrice,
         onFinish,
     }) => {
        const [checkBoxOffer, setCheckBoxOffer] = useState<boolean>(true);
        const currentTime: Date = new Date();
        const deliveryTime: Date = addMinutes(currentTime, 60);
        const formattedTime: string = format(deliveryTime, 'HH:mm');
        const stripePublishableKey =
            'pk_test_51Nw1DlI64lV8opEVvQQ0MOs33EPOddlFi6wpBWpjMdEvGMp5wBH89SOsZvAxkkq7mOtlvyCBrEZDv01rzkF52d1w00on7r85QY';

        const onToken = (res: Token) => {
            fetch('/cart/create-checkout-session', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzbWlybm92cGEzQHlhbmRleC5ydSIsImlhdCI6MTY5NjExMjEzOSwiZXhwIjoxNjk2MTk4NTM5fQ.F0QR3elE5I04Vi18AMcb-puO8PvQSIzB1febD4fYUuM`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(res),
            }).then((res: Response) => {
                res.json().then((data) => {
                    console.log(`Payment token generated, ${data.name}`);
                });
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
                <div className="cartPage--content--payment">
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
                    {/*<StripeCheckout
                        label="Оплатить"
                        token={onToken}
                        name="Оплата заказа"
                        currency="RUB"
                        amount={totalPrice * 100}
                        locale="auto"
                        stripeKey={stripePublishableKey}
                    />*/}
                    <Button type="primary" onClick={onFinish}>
                        Оплатить
                    </Button>
                </div>
            </div>
        );
    };

export default Payment;