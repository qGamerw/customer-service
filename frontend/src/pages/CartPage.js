import React from 'react';
import {useSelector} from "react-redux";
import ListDishesFromCart from "../components/CartPage/ListDishesFromCart";
import "./style/CartPage.css"
import DeliveryForm from "../components/CartPage/DeliveryForm";
import Payment from "../components/CartPage/Payment";

const CartPage = () => {
    const listDishesFromCart = useSelector((state) => state.cart.items)
    const amountInCart = useSelector((state) => state.cart.items.reduce((accumulator, item) => accumulator + item.price * item.amount, 0))

    return (
        <div className="cartPage">
            <div className="cartPage__content">
                <h2>Корзина</h2>
                {(listDishesFromCart.length) ? (
                    <div>
                        <ListDishesFromCart dishes={listDishesFromCart}/>
                        <div className="cartPage__content__delivery">
                            <DeliveryForm/>
                        </div>
                        <div className="cartPage__content__payment">
                            <Payment amountInCart={amountInCart}/>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2>Ваша корзина пуста :(</h2>
                        <img className="cartPage__img--empty"
                             src="https://ne-kurim.ru/forum/attachments/orig-gif.1566829/"
                             alt={"Гифка танцующего грузина"}
                        />
                    </div>
                )
                }
            </div>
            <div className="cartPage__total">
                <h4 className="cartPage__total__title--count">К оплате: {amountInCart} ₽</h4>
            </div>
        </div>
    );
};

export default CartPage;