import React, {useEffect, useState} from 'react';
import {Checkbox, Input} from "antd";
import {Link} from "react-router-dom";
import {addMinutes, format} from 'date-fns';
import './style/Payment.css';

const Payment = ({amountInCart}) => {
    const [checkBoxOffer, setCheckBoxOffer] = useState(true);
    const currentTime = new Date();
    const deliveryTime = addMinutes(currentTime, 60);
    const formattedTime = format(deliveryTime, "HH:mm");

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
            <Input placeholder={"Email для получения чека"}></Input>
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
        </div>
    );
};

export default Payment;