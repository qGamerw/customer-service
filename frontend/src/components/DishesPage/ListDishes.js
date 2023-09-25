import React from 'react';
import CardDish from './CardDish';
const ListDishes = ({dishes}) => {

    return (
        <div style={{display: "flex", flexWrap: "wrap", width: "800px", height: "400"}}>
            {dishes.map((dish) =>
                <CardDish dish={dish} key={dish.id}/>
            )}

        </div>
    );
};

export default ListDishes;