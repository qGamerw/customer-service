import React, {useState} from 'react';
import {Pagination} from 'antd';
import CardDishFromCart from './CardDishFromCart';

const ListDishesFromCart = ({dishes}) => {
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = dishes.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <div style={{display: "flex", justifyContent: "space-between", gap: "30px",flexWrap: "wrap",  height: "400", margin: "10px"}}>
                {itemsToDisplay.map((dish) => (
                    <div key={dish.id}>
                        <CardDishFromCart dish={dish}/>
                    </div>
                ))}
            </div>
            {dishes.length &&
                <Pagination
                    current={currentPage}
                    total={dishes.length}
                    pageSize={itemsPerPage}
                    onChange={(page) => handlePageChange(page)}
                />
            }
        </div>
    );
};

export default ListDishesFromCart;
