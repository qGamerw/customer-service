import React, {useState} from 'react';
import {Button, InputNumber, Modal, Tooltip} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {addProduct, rewoveFromCart, updateAmount} from "../../slices/cartSlice"
import "./styles/CardDish.css"
import CartService from "../../services/cartService";

const CardDish = ({dish, children, showUseButton}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const itemFromCartById = (useSelector((state) => state.cart.items.find(item => item.id === dish.id)))
    const handleAddClick = () => {
        CartService.addToCart(1,dish.id,dispatch)
    }

    const handleUpdateAmount = (dishId, amount) => {
       /* dispatch(updateAmount({dishId, amount}))
        if (amount === 0) {
            dispatch(rewoveFromCart(dishId))
        }*/
    }

    return (
        <div className={"cardDish"}>
            <img
                src={dish.urlImage}
                alt={"Изображение блюда:" + dish.name}
                style={{width: "370px",  borderRadius: "10%", height: "270px", cursor: "pointer"}}
                onClick={() => {
                    setIsModalOpen(true)
                }}
            />
                <div className={"cardDish__name"}>{dish.name}</div>
            <div className={"card__container"}>
                <div className={"cardDish__price"}>{dish.price} ₽</div>
                {showUseButton && (
                    <Button
                        className={"cardDish__useButton"}
                        type="link"
                        onClick={() => {
                            setIsModalOpen(true)
                        }}
                    >
                        Выбрать
                    </Button>
                )}
            </div>

            {children}

            <Modal
                title={dish.name}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
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
                            arrowContentStyle={"0px"}
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
                                    value={itemFromCartById.amount}
                                    min={0}
                                    onChange={(amount) => handleUpdateAmount(dish.id, amount)}
                                />
                            ) : (
                                <Button
                                    onClick={handleAddClick}
                                    type={"primary"}
                                    danger
                                    shape={"round"}
                                    size={"large"}
                                >
                                    Добавить в корзину
                                </Button>
                            )}
                        </div>

                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CardDish;
