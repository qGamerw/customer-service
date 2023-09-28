import React, {useEffect} from 'react';
import UserProfile from "../components/ClientPage/UserProfile";
import OrderHistory from "../components/ClientPage/OrderHistory";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import DeliveryCard from "../components/ClientPage/DeliveryCard";
import {Space} from "antd";

const ClientPage = () => {
    const listOrder = useSelector((state) => state.orders.orders)
    const location = useLocation();
    const anchorId = location.state ? location.state.anchorId : null;
    console.log(anchorId)

    useEffect(() => {
        const element = document.getElementById(anchorId);
        console.log(element)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [anchorId]);

    return (
        <div>
            <h3 id={"client-profile"}></h3>
            <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, paddingRight: '20px' }}>
                <h3 id={"client-profile"}>Профиль</h3>
                <UserProfile />
            </div>
            <div style={{ flex: 1, paddingLeft: '20px' }}>
                <h3>Доставка</h3>
                <DeliveryCard />
            </div>
            </div>
            <h3 id={"order"}>Заказы</h3>
            <OrderHistory orders={listOrder}/>
        </div>
    );
};

export default ClientPage;