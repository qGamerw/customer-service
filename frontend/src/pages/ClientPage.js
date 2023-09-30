import React, { useEffect } from 'react';
import UserProfile from "../components/ClientPage/UserProfile";
import OrderHistory from "../components/ClientPage/OrderHistory";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DeliveryCard from "../components/ClientPage/DeliveryCard";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const ClientPage = () => {
    const listOrder = useSelector((state) => state.orders.orders);
    const location = useLocation();
    const navigate = useNavigate();
    const anchorId = location.state ? location.state.anchorId : null;

    const searchParams = new URLSearchParams(location.search);
    const activeTabParam = searchParams.get("tab") || 'profile';

    useEffect(() => {
        const element = document.getElementById(anchorId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [anchorId]);

    const handleTabChange = (activeKey) => {
        navigate(`/client?tab=${activeKey}`);
    };

    return (
        <div>
            <Tabs tabPosition="left" activeKey={activeTabParam} onChange={handleTabChange}>
                <TabPane tab="Профиль" key="profile">
                    <h3>Профиль</h3>
                    <UserProfile />
                </TabPane>
                <TabPane tab="Доставка" key="delivery">
                    <h3>Доставка</h3>
                    <DeliveryCard />
                </TabPane>
                <TabPane tab="Заказы" key="order">
                    <h3>Заказы</h3>
                    <OrderHistory orders={listOrder} />
                </TabPane>
            </Tabs>
        </div>
    );
};
export default ClientPage;
