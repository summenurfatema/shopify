import React from 'react';
import AllProduct from '../pages/ProductSection/AllProduct/AllProduct';
import HeroSlider from '../pages/HeroSlider/HeroSlider';
import FeaturedProduct from '../pages/FeaturedSection/FeaturedProduct';

const HomePage = () => {
    return (
        <div>
            <HeroSlider/>
            <AllProduct/>
            <FeaturedProduct/>
        </div>
    );
};

export default HomePage;