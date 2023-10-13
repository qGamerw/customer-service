import React, {FC, useEffect} from 'react';
import {UserProfile} from '../components/UserPage/UserProfile';
import OrderHistory from '../components/UserPage/OrderHistory';
import {useLocation, useNavigate} from 'react-router-dom';
import DeliveryCard from '../components/UserPage/DeliveryCard';
import {Tabs} from 'antd';
import {IOrderFromHistory, IOrderResponse} from "../types/types";
import {useAppSelector} from "../hooks";
const {TabPane} = Tabs;

const UserPage: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const anchorId = location.state ? location.state.anchorId : null;
    const listOrders: IOrderFromHistory[] = useAppSelector((state) => state.orders.orders);
    const searchParams = new URLSearchParams(location.search);
    const activeTabParam = searchParams.get('tab') || 'profile';

    useEffect(() => {
        const element = document.getElementById(anchorId);
        if (element) {
            element.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
    }, [anchorId]);

    const handleTabChange = (activeKey: string) => {
        navigate(`/user?tab=${activeKey}`);
    };

    return (
        <div>
            <Tabs tabPosition="left" activeKey={activeTabParam} onChange={handleTabChange}>
                <TabPane tab="Профиль" key="profile">
                    <h3>Профиль</h3>
                    <UserProfile/>
                </TabPane>
                <TabPane tab="Доставка" key="delivery">
                    <h3>Доставка</h3>
                    <DeliveryCard/>
                </TabPane>
                <TabPane tab="Заказы" key="order">
                    <h3>Заказы</h3>
                    <OrderHistory listOrders = {listOrders}/>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default UserPage;
