import React, {FC, useState} from 'react';
import {Pagination} from 'antd';
import CardDishFromCart from './CardDishFromCart';
import {IDishFromCart} from "../../types/types";

interface ListDishesFromCart {
    dishes: IDishFromCart[];
}

const ListDishesFromCart: FC<ListDishesFromCart> = ({dishes}) => {
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = dishes.slice(startIndex, endIndex);
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "30px",
                flexWrap: "wrap",
                height: "400",
                margin: "10px"
            }}>
                {itemsToDisplay.map((dish) => (
                    <CardDishFromCart dish={dish} key={dish.id}/>
                ))}
            </div>
            {dishes.length &&
                <Pagination
                    current={currentPage}
                    total={dishes.length}
                    pageSize={itemsPerPage}
                    onChange={(page: number) => handlePageChange(page)}
                />
            }
        </div>
    );
};

export default ListDishesFromCart;
