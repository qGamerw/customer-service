import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Input} from "antd";
import {Link} from "react-router-dom";
import {addMinutes, format} from 'date-fns';
import './styles/Payment.css';
import StripeCheckout from "react-stripe-checkout";

const Payment = ({amountInCart}) => {
    const [checkBoxOffer, setCheckBoxOffer] = useState(true);
    const currentTime = new Date();
    const deliveryTime = addMinutes(currentTime, 60);
    const formattedTime = format(deliveryTime, "HH:mm");
    const stripePublishableKey = "pk_test_51Nw1DlI64lV8opEVvQQ0MOs33EPOddlFi6wpBWpjMdEvGMp5wBH89SOsZvAxkkq7mOtlvyCBrEZDv01rzkF52d1w00on7r85QY"

    const onToken = (res) => {
        fetch('/cart/create-checkout-session', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzbWlybm92cGEzQHlhbmRleC5ydSIsImlhdCI6MTY5NjExMjEzOSwiZXhwIjoxNjk2MTk4NTM5fQ.F0QR3elE5I04Vi18AMcb-puO8PvQSIzB1febD4fYUuM`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(res),
        }).then(res => {
            res.json().then(data => {
                console.log(`Payment token generated, ${data.name}`)
            })
        })
    };

    useEffect(() => {
        const cartTotal = document.querySelector('.cartPage__total');
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
            <h2>Оплата</h2>
            <Checkbox checked={checkBoxOffer} onChange={() => {
                setCheckBoxOffer(!checkBoxOffer)
            }}>Соглашаюсь на распространение указанных в заказе персональных данных третьим лицам. С условиями <Link
                to={"https://p.finance/pdf/offer_ru.pdf"}>Публичной оферты</Link> ознакомлен.</Checkbox>
            {!checkBoxOffer && (
                <div>
                    <span style={{color: "red"}}>Необходимо подтвердить согласие с условиями публичной оферты</span>
                </div>
            )}
            <h4>Доставим до: {formattedTime}</h4>
            <h3>К оплате: {amountInCart} ₽</h3>

            <StripeCheckout
                token={onToken}
                name="Оплата заказа"
                currency="Rub"
                amount={amountInCart * 100}
                locale="ru"
                stripeKey={stripePublishableKey}
            >
                <Button type="primary" htmlType="submit">
                    Оформить заказ
                </Button>
            </StripeCheckout>

        </div>
    );
};

export default Payment;