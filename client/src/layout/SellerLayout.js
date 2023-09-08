import React from 'react';
import SellerSidebar from '../Seller/SellerSidebar/SellerSidebar';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../pages/NavBar/NavBar';

const SellerLayout = () => {
    return (
        <div className='bg-white'>

            <NavBar/>
            <div className='flex justify-center items-start  px-0 md:px-10 2xl:px-14 3xl:px-20 mt-10'>
             <div className='w-full lg:w-4/12  hidden lg:block'> 
            <SellerSidebar/>
            </div> 
            <div className='w-full lg:w-8/12'> 
            <Outlet/>
            </div>
            </div>
        </div>
    );
};

export default SellerLayout;