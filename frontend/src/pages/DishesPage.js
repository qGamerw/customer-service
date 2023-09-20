import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import ListDishes from "../components/generals/ListDishes";

const DishesPage = () => {
    const listPizza = useSelector((state) => state.dishes.dishes)
    const dispatch = useDispatch();
    const location = useLocation();
    const anchorId = location.state ? location.state.anchorId : null;

    useEffect(() => {
        const element = document.getElementById(anchorId);
        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
        }
    }, [anchorId]);

    return (
        <div>
            <h3 id={"category:1"}>Пиццы</h3>
            <ListDishes dishes={listPizza}/>
            <h3 id={"category:2"}>Роллы</h3>
            <ListDishes dishes={listPizza}/>
            <h3 id={"category:3"}>Компбо</h3>
            <ListDishes dishes={listPizza}/>
            <h3 id={"category:4"}>Супы</h3>
            <ListDishes dishes={listPizza}/>

        </div>
    );
};

export default DishesPage;