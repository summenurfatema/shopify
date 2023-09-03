import React from 'react';
import HomePage from '../HomePage/HomePage';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../pages/NavBar/NavBar';

const Main = () => {
    return (
        <div>
            <NavBar/>
            <Outlet/>
        </div>
    );
};

export default Main;