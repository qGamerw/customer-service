import React, {FC, useEffect} from 'react';
import UserProfile from '../components/UserPage/UserProfile';
import OrderHistory from '../components/UserPage/OrderHistory';
import {useLocation, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import DeliveryCard from '../components/UserPage/DeliveryCard';
import {Tabs} from 'antd';
const {TabPane} = Tabs;

const UserPage: FC = () => {
    const listOrder = useSelector((state: any) => state.orders.orders);
    const location = useLocation();
    const navigate = useNavigate();
    const anchorId = location.state ? location.state.anchorId : null;
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
                    <OrderHistory orders={listOrder}/>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default UserPage;
