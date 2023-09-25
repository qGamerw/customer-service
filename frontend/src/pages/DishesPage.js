import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ListDishes from '../components/DishesPage/ListDishes';
import { scroller } from 'react-scroll';
import MyCarousel from "../components/generals/Carousel";


const DishesPage = () => {
    const listPizza = useSelector((state) => state.dishes.dishes);
    const location = useLocation();
    const anchorId = location.state ? location.state.anchorId : null;
    console.log(anchorId)

    useEffect(() => {
        if (anchorId) {
            scroller.scrollTo(anchorId, {
                duration: 800,
                smooth: 'easeInOutQuart',
                offset: -60,
            });
        }
    }, [anchorId]);

    return (
        <div>
            <MyCarousel/>
            <h3 id="category:1">Пиццы</h3>
            <ListDishes dishes={listPizza} />
            <h3 id="category:2">Роллы</h3>
            <ListDishes  dishes={listPizza} />
            <h3 id="category:3">Компбо</h3>
            <ListDishes dishes={listPizza} />
            <h3 id="category:4">Супы</h3>
            <ListDishes dishes={listPizza} />
        </div>
    );
};

export default DishesPage;
