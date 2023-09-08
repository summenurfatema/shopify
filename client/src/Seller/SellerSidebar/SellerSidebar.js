import React, { useContext } from 'react';
import { AuthContext } from '../../context/UserContext/UserContext';
import {ImUpload} from 'react-icons/im'
import {MdProductionQuantityLimits} from 'react-icons/md'
import {RiDoorOpenFill} from 'react-icons/ri'
import {FaBox} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';

const SellerSidebar = () => {

    //getting props from user context
    const {user,logOut} = useContext(AuthContext)

    //navigate/route
    const navigate = useNavigate()

    // function for log out
    const handleLogOut = () => {
        logOut().then(() => {
          navigate("/signin");
        });
      };
      
    return (
        <div className="h-full p-3 space-y-2 w-96 bg-white text-gray-800 font-sans border rounded-md">
        <div className="flex items-center p-2 space-x-4">
            <img src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?size=626&ext=jpg&ga=GA1.2.1540219272.1675657721&semt=ais" alt="" className="w-12 h-12 rounded-full dark:bg-gray-500" />
            <div>
                <h2 className="text-xl font-bold capitalize">Welcome {user?.displayName} !!!</h2>
            </div>
        </div>
        <div className="divide-y divide-gray-700">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
                <li className="bg-white text-gray-800 hover:bg-indigo-600 hover:text-white rounded-md">
                    <Link rel="noopener noreferrer" href="/seller" className="flex items-center p-2 space-x-3 rounded-md">
                    <MdProductionQuantityLimits className='text-xl' />
                        <span className='font-semibold text-lg'>My Products</span>
                    </Link>
                </li>
                <li className='bg-white text-gray-800 hover:bg-indigo-600 hover:text-white rounded-md'>
                    <Link rel="noopener noreferrer" href="/seller/upload-product" className="flex items-center p-2 space-x-3 rounded-md">
                    <ImUpload className='text-xl' />
                        <span className='font-semibold text-lg'>Upload a product</span>
                    </Link>
                </li>
                <li className='bg-white text-gray-800 hover:bg-indigo-600 hover:text-white rounded-md'>
                    <Link rel="noopener noreferrer" href='/seller/current-order' className="flex items-center p-2 space-x-3 rounded-md">
                    <FaBox className='text-xl' />
                        <span className='font-semibold text-lg'>Current orders</span>
                    </Link>
                </li>
                
            </ul>
            <ul className="pt-4 pb-2 space-y-1 text-sm">
              
                <li onClick={handleLogOut} className='bg-white text-gray-800 hover:bg-indigo-600 hover:text-white rounded-md'>
                    <Link rel="noopener noreferrer" href="/" className="flex items-center p-2 space-x-3 rounded-md">
                    <RiDoorOpenFill className='text-xl' />
                        <span className='font-semibold text-lg'>Logout</span>
                    </Link>
                </li>
            </ul>
        </div>
    </div>
    );
};

export default SellerSidebar;