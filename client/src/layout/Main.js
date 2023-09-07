import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../pages/NavBar/NavBar';
import Footer from '../pages/Footer/Footer';

const Main = () => {
    return (
        <div>
            <NavBar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Main;