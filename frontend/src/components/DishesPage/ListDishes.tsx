import React, {FC} from 'react';
import CardDish from './CardDish';
import {IDish} from "../../types/types";
import './styles/ListDishes.css';

interface ListDishes {
    dishes: IDish[];
}

const ListDishes: FC<ListDishes> =
    ({
         dishes
     }) => {

        return (
            <div className={"listDishes"}>
                {dishes.map((dish) =>
                    <CardDish dish={dish} key={dish.id} showUseButton={true}/>
                )}

            </div>
        );
    };

export default ListDishes;