import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ListDishesFromCart from '../components/CartPage/ListDishesFromCart';
import DeliveryForm from '../components/CartPage/DeliveryForm';
import Payment from '../components/CartPage/Payment';
import CartService from "../services/cartService";
import './styles/CartPage.css';
import DishService from "../services/dishService";

const CartPage = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const listItemFromCart = useSelector((state) => state.cart.items)
        const isCartEmpty = listItemFromCart.length === 0;
        const listDishes = useSelector((state) => state.dishes.dishes);
        const dispatch = useDispatch();
        const listDishesFromCart = listDishes
            .filter((dish) => {
                return listItemFromCart.some((selectedDish) => selectedDish.dishId === dish.id);
            })
            .map((dish) => {
                const selectedDish = listItemFromCart.find((item) => item.dishId === dish.id);
                return {...dish, quantity: selectedDish.quantity};
            });
        const amountInCart = listDishesFromCart.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);
        const [isTotalVisible, setIsTotalVisible] = useState(true);

        useEffect(() => {
            const getCart = () => {
                DishService.getDishes(dispatch);
                CartService.getCart(user.id, dispatch)
            };
            getCart();
        }, [dispatch]);


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

        return (
            <div className="cartPage">
                <div className="cartPage-content">
                    <h2>Корзина</h2>
                    {isCartEmpty ? (
                        <div className={"cartEmpty"}>
                            <h2>Ваша корзина пуста :(</h2>
                            <div className={"cartEmpty__images__container"}><img
                                className="cartPage-img-empty"
                                src="https://ne-kurim.ru/forum/attachments/orig-gif.1566829/"
                                alt="Гифка танцующего грузина"
                            />
                                <img
                                    className="cartPage-img-empty"
                                    src="https://ne-kurim.ru/forum/attachments/orig-gif.1566829/"
                                    alt="Гифка танцующего грузина"
                                    style={{transform: 'scaleX(-1)'}}
                                /></div>
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
    }
;

export default CartPage;
