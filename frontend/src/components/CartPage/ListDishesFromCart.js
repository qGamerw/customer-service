import React, {useState} from 'react';
import {Pagination} from 'antd';
import CardDishFromCart from './CardDishFromCart';

const ListDishesFromCart = ({dishes}) => {
    const itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = dishes.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <div style={{display: 'flex', flexWrap: 'nowrap', overflowX: 'auto'}}>
                {itemsToDisplay.map((dish) => (
                    <div key={dish.id} style={{marginRight: '10px'}}>
                        <CardDishFromCart dish={dish}/>
                    </div>
                ))}
            </div>
            {dishes.length &&
                <Pagination
                    style={{marginTop: "20px"}}
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
