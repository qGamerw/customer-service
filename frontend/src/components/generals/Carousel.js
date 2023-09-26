import React from 'react';
import {Carousel} from 'antd';

const MyCarousel = () => {
    const contentStyle = {
        height: '360px',
        // width: '100%',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    return (
        <Carousel autoplay>
            <div>
                <img style={contentStyle}
                     src={"https://cdpiz1.pizzasoft.ru/rs/280x280/pizzafab/items/3/italyanskoe-assorti-bolshaya-main_image-3562-74986.jpg"}
                     alt={"Изображение 1"}/>
            </div>
            <div>
                <img style={contentStyle}
                     src={"https://cdpiz1.pizzasoft.ru/rs/600x600/pizzafab/items/3/margarita-bolshaya-main_image-3587-77377.jpg"}
                     alt={"Изображение 2"}/>
            </div>
            <div>
                <img style={contentStyle}
                     src={"https://cdpiz1.pizzasoft.ru/rs/600x600/pizzafab/items/3/margarita-bolshaya-main_image-3587-77377.jpg"}
                     alt={"Изображение 3"}/>
            </div>
        </Carousel>
    );
};


export default MyCarousel;
