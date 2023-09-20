import React, { useState } from 'react';
import {Button, Modal, Tooltip} from "antd";

const CardDish = ({ dish }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <img
                src={dish.urlImage}
                alt={"Изображение блюда:" + dish.name}
                style={{ width: "200px", height: "150px", cursor: "pointer" }}
                onClick={showModal} // Открываем модальное окно по клику на изображение
            />
            <div className={"cardDish__title"}>
                <div>{dish.name}</div>
                <div>{dish.price} руб.</div>
            </div>

            <Button type="link" shape="circle" onClick={showModal}>
                Выбрать
            </Button>

            <Modal
                title={dish.name}
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={700}
                footer={null}
            >
                <div style={{ display: "flex" }}>
                    <div style={{ flex: 1 }}>
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
                    <div style={{ flex: 1, marginLeft: "20px" }}>
                        <p>{dish.weight} гр.</p>
                        <Tooltip
                            placement={"bottom"}
                            arrowContentStyle={"0px"}
                            title={dish.description}
                        >
                            <Button type={"link"}>
                                <span style={{color:"black", textDecoration: "underline", textUnderlineOffset: "3px"}}>
                                    Состав
                                </span>
                            </Button>
                        </Tooltip>
                        <div>
                            <p>{dish.price} руб.</p>
                            <Button
                                type={"primary"}
                                danger
                                shape={"round"}
                                size={"large"}
                            >
                                Купить
                            </Button>
                        </div>

                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CardDish;
