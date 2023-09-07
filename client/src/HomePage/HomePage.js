import React from 'react';
import AllProduct from '../pages/ProductSection/AllProduct/AllProduct';
import HeroSlider from '../pages/HeroSlider/HeroSlider';
import FeaturedProduct from '../pages/FeaturedSection/FeaturedProduct';
import TrustedCompany from '../pages/TrustedCompany/TrustedCompany';
import State from '../pages/State/State';

const HomePage = () => {
    return (
        <div>
            <HeroSlider/>
            <AllProduct/>
            <FeaturedProduct/>
            <TrustedCompany/>
            <State/>
        </div>
    );
};

export default HomePage;