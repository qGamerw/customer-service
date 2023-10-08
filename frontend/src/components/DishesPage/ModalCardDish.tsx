import React, {FC, useState} from 'react';
import {Button, InputNumber, Modal, Tooltip} from "antd";
import {Link} from "react-router-dom";
import CartService from "../../services/cartService";
import {user} from "../../constants/constants";
import {useDispatch, useSelector} from "react-redux";
import {ICartItem, IDish} from "../../types/types";
import { RootState } from '../../store';

interface ModalCardDishProps {
    dish: IDish;
    isModalOpen: boolean;
    onClose: () => void;
}

const ModalCardDish: FC<ModalCardDishProps> = ({dish, isModalOpen, onClose}) => {

    const [isLogged] = useState(user !== null);
    const dispatch = useDispatch();
    const itemFromCartById: ICartItem | undefined = useSelector((state: RootState) => state.cart.cartItems.find(item => item.dishId === dish.id))

    const handleAddClick = () => {
        isLogged && (
            CartService.addToCart(user?.id, dish.id, dispatch)
        )
    }

    const handleUpdateAmount = (dishId: number, quantity: number) => {
        const newQuantity = {
            quantity: quantity,
        };
        CartService.updateQuantity(user?.id, dishId, newQuantity, dispatch)
        if (quantity === 0) {
            CartService.deleteFromCart(user?.id, dishId, dispatch)
        }
    }
    return (
        <Modal
            title={dish.name}
            open={isModalOpen}
            onCancel={onClose}
            width={1000}
            footer={null}
        >
            <div style={{display: "flex"}}>
                <div style={{flex: 1}}>
                    <img
                        src={dish.urlImage}
                        alt={'Фото ' + dish.name}
                        style={{
                            width: "100%",
                            height: "auto",
                            maxWidth: "500px",
                        }}
                    />
                </div>
                <div style={{flex: 1, marginLeft: "20px"}}>
                    <p>{dish.weight} гр.</p>
                    <Tooltip
                        placement={"bottom"}
                        title={dish.description}
                    >
                        <Button type={"link"}>
                                <span style={{color: "black", textDecoration: "underline", textUnderlineOffset: "3px"}}>
                                    Состав
                                </span>
                        </Button>
                    </Tooltip>
                    <div>
                        <p>{dish.price} ₽</p>
                        {itemFromCartById ? (
                            <InputNumber
                                value={itemFromCartById?.quantity ?? 0}
                                min={0}
                                onChange={(quantity: number | null) => handleUpdateAmount(dish.id, quantity ?? 0)}
                            />

                        ) : (
                            <Button
                                onClick={handleAddClick}
                                type="primary"
                                danger
                                shape="round"
                                size="large"
                            >
                                {isLogged ? (
                                    <div>Добавить в корзину</div>
                                ) : (
                                    <Link to="/api/auth/signin">Войти</Link>
                                )}
                            </Button>
                        )}
                    </div>

                </div>
            </div>
        </Modal>
    );
};

export default ModalCardDish;