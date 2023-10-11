import {Space, Spin} from 'antd';
import React from "react";
import './styles/Preloader.css';

const Preloader = () => (
    <Space size="middle" className={"space"}>
        <Spin size="large"/>
        <Spin/>
        <Spin size="large"/>
    </Space>
);
export default Preloader;