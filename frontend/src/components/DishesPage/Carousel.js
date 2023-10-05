import React, { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './styles/Slider.css';

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userActive, setUserActive] = useState(false);
    const slides = [
        'https://s1.1zoom.ru/b5050/269/415245-svetik_3840x2400.jpg',
        'https://s1.1zoom.ru/big3/666/420713-svetik.jpg',
        'https://s1.1zoom.ru/big3/800/418026-svetik.jpg',
        'https://s1.1zoom.ru/big3/524/418516-svetik.jpg',
        'https://s1.1zoom.ru/big3/926/420986-svetik.jpg',
        'https://s1.1zoom.ru/big3/23/421764-svetik.jpg',
        'https://s1.1zoom.ru/big3/700/422236-svetik.jpg',
    ];

    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
        setUserActive(true); // Установить флаг активности пользователя
    };

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
        setUserActive(true); // Установить флаг активности пользователя
    };

    // Добавляем автоматическое переключение каждые 5 секунд (5000 миллисекунд)
    useEffect(() => {
        let interval;

        if (!userActive) {
            interval = setInterval(goToNextSlide, 5000);
        }

        // Очищаем интервал при размонтировании компонента
        return () => clearInterval(interval);
    }, [userActive]);

    // Сброс флага активности пользователя после перемещения слайда
    useEffect(() => {
        const timeout = setTimeout(() => {
            setUserActive(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [currentIndex]);

    return (
        <div className="slider">
            <button className="slider-button prev" onClick={goToPrevSlide}>
                &lt;
            </button>
            <TransitionGroup className="slider-wrapper">
                <CSSTransition
                    key={currentIndex}
                    timeout={1000}
                    classNames="slide"
                    unmountOnExit
                >
                    <div className="slider-slide">
                        <img className="slider-img" src={slides[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
                    </div>
                </CSSTransition>
            </TransitionGroup>
            <button className="slider-button next" onClick={goToNextSlide}>
                &gt;
            </button>
        </div>
    );
};

export default Slider;
