import React, { useState, useEffect, useCallback } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './styles/Slider.css';

const Slider: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [userActive, setUserActive] = useState<boolean>(false);
    const slides: string[] = [
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
        setUserActive(true);
    };

    // Используем useCallback для оптимизации функции goToNextSlide
    const goToNextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
        setUserActive(true);
    }, [slides.length]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (!userActive) {
            interval = setInterval(goToNextSlide, 5000);
        }

        // Очищаем интервал при размонтировании компонента
        return () => clearInterval(interval);
    }, [userActive, goToNextSlide]);

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
                        <img
                            className="slider-img"
                            src={slides[currentIndex]}
                            alt={`Slide ${currentIndex + 1}`}
                        />
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
