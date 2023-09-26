import React from 'react';
import {Menu} from 'antd';
import {ShoppingCartOutlined, UserOutlined, InfoCircleOutlined, MenuOutlined} from '@ant-design/icons';
import {Link, Route, Routes} from 'react-router-dom';
import AboutPage from '../../pages/AboutPage';
import CartPage from '../../pages/CartPage';
import ClientPage from '../../pages/ClientPage';
import DishesPage from '../../pages/DishesPage';
import {NotFoundPage} from '../../pages/NotFoundPage';
import './style/NavMenu.css';
import RegisterPage from "../../pages/RegisterPage";
import AuthPage from "../../pages/AuthPage";

const NavigationMenu = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const isUserAuthenticated = user == null;

    const clientLink = isUserAuthenticated ? '/client' : '/api/auth/signin';

    return (
        <div>
            <div className="navigationMenu">
                <Menu mode="horizontal">
                    <Menu.SubMenu key="restaurant-menu" title="Меню" icon={<MenuOutlined/>}>
                        <Menu.Item key="category:1">
                            <Link to="/" state={{anchorId: 'category:1'}}>Категория 1</Link>
                        </Menu.Item>
                        <Menu.Item key="category:2">
                            <Link to="/" state={{anchorId: 'category:2'}}>Категория 2</Link>
                        </Menu.Item>
                        <Menu.Item key="category:3">
                            <Link to="/" state={{anchorId: 'category:3'}}>Категория 3</Link>
                        </Menu.Item>
                        <Menu.Item key="category:4">
                            <Link to="/" state={{anchorId: 'category:4'}}>Категория 4</Link>
                        </Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item key="cart" icon={<ShoppingCartOutlined/>}>
                        <Link to="/cart">Корзина</Link>
                    </Menu.Item>
                    <Menu.SubMenu key="personal-account" title="Личный кабинет" icon={<UserOutlined/>}>
                        <Menu.Item key="client-profile">
                            <Link to={clientLink} state={{ anchorId: 'client-profile' }}>Профиль</Link>
                        </Menu.Item>
                        <Menu.Item key="setting:2">
                            <Link to={clientLink}>Доставка</Link>
                        </Menu.Item>
                        <Menu.Item key="order">
                            <Link to={clientLink} state={{ anchorId: 'order' }}>Заказы</Link>
                        </Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item key="about-company" icon={<InfoCircleOutlined/>}>
                        <Link to="/about">О компании</Link>
                    </Menu.Item>
                </Menu>
            </div>

            <Routes>
                <Route path="/" element={<DishesPage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/client" element={<ClientPage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
                <Route path="/api/auth/signup" element={<RegisterPage/>}/>
                <Route path="/api/auth/signin" element={<AuthPage/>}/>
            </Routes>
        </div>
    );
};

export default NavigationMenu;
