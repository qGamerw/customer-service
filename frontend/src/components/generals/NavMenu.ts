import React, {useState, useEffect} from 'react';
import {Menu} from 'antd';
import {ShoppingCartOutlined, UserOutlined, InfoCircleOutlined, MenuOutlined} from '@ant-design/icons';
import {Link, Route, Routes} from 'react-router-dom';
import AboutPage from '../../pages/AboutPage';
import CartPage from '../../pages/CartPage';
import ClientPage from '../../pages/ClientPage';
import DishesPage from '../../pages/DishesPage';
import {NotFoundPage} from '../../pages/NotFoundPage';
import './styles/NavMenu.css';
import RegisterPage from "../../pages/RegisterPage";
import AuthPage from "../../pages/AuthPage";

const NavigationMenu = () => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setIsUserAuthenticated(user != null);
    }, []);


    return (
        <div>
            <div className="navigationMenu">
                <Menu mode="horizontal">
                        <Menu.SubMenu key="restaurant-menu" title="Меню" icon={<MenuOutlined/>}>
                            <Menu.Item key="category:1">
                                <Link to="/" state={{anchorId: 'category:1'}}>Салаты</Link>
                            </Menu.Item>
                            <Menu.Item key="category:2">
                                <Link to="/" state={{anchorId: 'category:2'}}>Роллы</Link>
                            </Menu.Item>
                            <Menu.Item key="category:3">
                                <Link to="/" state={{anchorId: 'category:3'}}>Вторые блюда</Link>
                            </Menu.Item>
                            <Menu.Item key="category:4">
                                <Link to="/" state={{anchorId: 'category:4'}}>Пицца</Link>
                            </Menu.Item>
                            <Menu.Item key="category:5">
                                <Link to="/" state={{anchorId: 'category:5'}}>Напитки</Link>
                            </Menu.Item>
                        </Menu.SubMenu>
                    <Menu.Item key="cart" icon={<ShoppingCartOutlined/>}>
                        {isUserAuthenticated ? (
                            <Link to="/cart">Корзина</Link>
                        ) : (
                            <Link to="/api/auth/signin">Корзина</Link>
                        )}
                    </Menu.Item>
                    {isUserAuthenticated ? (
                        <Menu.SubMenu key="personal-account" title="Личный кабинет" icon={<UserOutlined/>}>
                            <Menu.Item key="client-profile">
                                <Link to="/client?tab=profile">Профиль</Link>
                            </Menu.Item>
                            <Menu.Item key="delivery">
                                <Link to="/client?tab=delivery">Доставка</Link>
                            </Menu.Item>
                            <Menu.Item key="order">
                                <Link to="/client?tab=order">Заказы</Link>
                            </Menu.Item>
                        </Menu.SubMenu>
                    ) : (
                        <Menu.Item key="login" icon={<UserOutlined/>}>
                            <Link to="/api/auth/signin">Войти</Link>
                        </Menu.Item>
                    )}
                    <Menu.Item key="about-company" icon={<InfoCircleOutlined/>}>
                        <Link to="/about">О компании</Link>
                    </Menu.Item>
                </Menu>
            </div>

            <Routes>
                <Route path="/" element={<DishesPage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                {isUserAuthenticated ? (
                    <>
                        <Route path="/client" element={<ClientPage/>}/>\
                    </>
                ) : (
                    <>
                        <Route path="/api/auth/signup" element={<RegisterPage/>}/>
                        <Route path="/api/auth/signin" element={<AuthPage/>}/>
                    </>
                )}
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </div>
    );
};

export default NavigationMenu;
