import React from 'react';
import CardDish from "../DishesPage/CardDish";
import {Button, InputNumber} from "antd";
import {useDispatch} from "react-redux";
import {CloseCircleOutlined} from "@ant-design/icons";
import "./styles/CardDishFromCart.css";
import CartService from "../../services/cartService";

const CardDishFromCart = ({dish}) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user"));
    const handleUpdateAmount = (dishId, quantity) => {
        CartService.updateQuantity(user.id, dishId, quantity, dispatch)
    }

    const handleRemoveClick = (dishId) => {
        CartService.deleteFromCart(user.id, dishId, dispatch)
    }

    return (
        <div className={"cardDishFromCart"}>
            <CardDish dish={dish} showUseButton={false}>
                <div style={{display: "flex", justifyContent: "space-around", alignItems: "start"}}>
                    <InputNumber
                        value={dish.quantity}
                        min={1}
                        onChange={(quantity) => handleUpdateAmount(dish.id, quantity)}
                    />
                    <Button onClick={() => handleRemoveClick(dish.id)} type="text" size={"large"}
                            icon={<CloseCircleOutlined/>}/>
                </div>
            </CardDish>
        </div>
    );
};

export default CardDishFromCart;