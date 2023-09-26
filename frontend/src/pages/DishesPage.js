import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import ListDishes from '../components/DishesPage/ListDishes';
import {scroller} from 'react-scroll';
import MyCarousel from "../components/generals/Carousel";
import "./styles/DishesPage.css";
import DishService from "../services/dishService";


const DishesPage = () => {
    const listDishes = useSelector((state) => state.dishes.dishes);
    const dispatch = useDispatch()
    const location = useLocation();
    const anchorId = location.state ? location.state.anchorId : null;

    useEffect(() => {
        getDishes();
    }, []);

    const getDishes = () => {
        DishService.getDishes(dispatch);
    }

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
        <div className="dishPage">
            <div className="dishPage__content">
                <MyCarousel/>
                <h3 id="category:1">Пицца</h3>
                <ListDishes dishes={listDishes.filter(item => item.category.id === 1)}/>
                <h3 id="category:2">Роллы</h3>
                <ListDishes dishes={listDishes.filter(item => item.category.id === 2)}/>
                <h3 id="category:3">Салаты</h3>
                <ListDishes dishes={listDishes.filter(item => item.category.id === 3)}/>
                <h3 id="category:4">Вторые блюда</h3>
                <ListDishes dishes={listDishes.filter(item => item.category.id === 4)}/>
            </div>
        </div>
    );
};

export default DishesPage;
