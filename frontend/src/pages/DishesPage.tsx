import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import ListDishes from '../components/DishesPage/ListDishes';
import {scroller} from 'react-scroll';
import DishService from "../services/dishService";
import Footer from "../components/generals/Footer";
import "./styles/DishesPage.css";
import Slider from "../components/DishesPage/Carousel";
import {IDish} from "../types/types";
import {useAppDispatch, useAppSelector} from "../hooks";


const DishesPage = () => {
    const listDishes: IDish[] = useAppSelector((state) => state.dishes.dishes);
    const dispatch = useAppDispatch()
    const location = useLocation();
    const anchorId = location.state ? location.state.anchorId : null;

    useEffect(() => {
        const getDishes = () => {
            DishService.getDishes(dispatch);
        };
        getDishes();
    }, []);

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
                <Slider/>
                <h2 id="category:1">Салаты</h2>
                <ListDishes dishes={listDishes.filter(item => item.category.category === "SALAD")}/>
                <h2 id="category:2">Роллы</h2>
                <ListDishes dishes={listDishes.filter(item => item.category.category === "ROLLS")}/>
                <h2 id="category:3">Вторые блюда</h2>
                <ListDishes dishes={listDishes.filter(item => item.category.category === "SECOND_COURSES")}/>
                <h2 id="category:4">Пицца</h2>
                <ListDishes dishes={listDishes.filter(item => item.category.category === "PIZZA")}/>
                <h2 id="category:5">Напитки</h2>
                <ListDishes dishes={listDishes.filter(item => item.category.category === "DRINKS")}/>
            </div>
            <Footer/>
        </div>
    );
};

export default DishesPage;
