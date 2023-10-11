import {Space, Spin} from 'antd';
import React, {FC} from "react";
import './styles/Preloader.css';

const Preloader: FC = () => (
    <Space size="middle" className={"preloader"}>
        <Spin size="large"/>
        <Spin/>
        <Spin size="large"/>
    </Space>
);
export default Preloader;