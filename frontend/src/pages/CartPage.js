import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import ListDishesFromCart from '../components/CartPage/ListDishesFromCart';
import './style/CartPage.css';
import DeliveryForm from '../components/CartPage/DeliveryForm';
import Payment from '../components/CartPage/Payment';

const CartPage = () => {
    const listDishesFromCart = useSelector((state) => state.cart.items);
    const amountInCart = useSelector((state) =>
        state.cart.items.reduce((accumulator, item) => accumulator + item.price * item.amount, 0)
    );

    const [isTotalVisible, setIsTotalVisible] = useState(true);

    const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;

        if (windowHeight + scrollTop >= pageHeight - 10) {
            setIsTotalVisible(false);
        } else {
            setIsTotalVisible(true);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const isCartEmpty = listDishesFromCart.length === 0;

    return (
        <div className="cartPage">
            <div className="cartPage-content">
                <h2>Корзина</h2>
                {isCartEmpty ? (
                    <div>
                        <h2>Ваша корзина пуста :(</h2>
                        <img
                            className="cartPage-img-empty"
                            src="https://ne-kurim.ru/forum/attachments/orig-gif.1566829/"
                            alt="Гифка танцующего грузина"
                        />
                    </div>
                ) : (
                    <div>
                        <ListDishesFromCart dishes={listDishesFromCart}/>
                        <div className="cartPage-content-delivery">
                            <DeliveryForm/>
                        </div>
                        <div className="cartPage-content-payment">
                            <Payment amountInCart={amountInCart}/>
                        </div>
                    </div>
                )}
            </div>
            {isTotalVisible && !isCartEmpty && (
                <div className="cartPage-total">
                    <h4 className="cartPage-total-title-count">К оплате: {amountInCart} ₽</h4>
                </div>
            )}
        </div>
    );
};

export default CartPage;
