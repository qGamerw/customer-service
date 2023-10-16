import React, {FC} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import './styles/Footer.css';

const Footer: FC = () => {
    return (
        <footer className="footer">
            <div className="footer__menu">
                <div className="footer__menu-section">
                    <h3>Меню</h3>
                    <ul>
                        <li>
                            <RouterLink to="/" state={{anchorId: 'category:1'}}>
                                Салаты
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/" state={{anchorId: 'category:2'}}>
                                Роллы
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/" state={{anchorId: 'category:3'}}>
                                Вторые блюда
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/" state={{anchorId: 'category:4'}}>
                                Пицца
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/" state={{anchorId: 'category:5'}}>
                                Напитки
                            </RouterLink>
                        </li>
                    </ul>
                </div>
                <div className="footer__menu-section">
                    <h3>Клиент</h3>
                    <ul>
                        <li>
                            <RouterLink to="/cart">Корзина</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/user?tab=profile">Профиль</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/user?tab=delivery">Текущие доставки</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/user?tab=order">История заказов</RouterLink>
                        </li>
                    </ul>
                </div>
                <div className="footer__menu-section">
                    <h3>Другое</h3>
                    <ul>
                        <li>
                            <RouterLink to="/about">О компании</RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
            <p>&copy; {new Date().getFullYear()} Грузинский ресторан</p>
        </footer>
    );
};

export default Footer;
