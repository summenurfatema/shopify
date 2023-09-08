import React, { useContext } from 'react';
import { AuthContext } from '../../context/UserContext/UserContext';
import {ImUpload} from 'react-icons/im'
import {MdProductionQuantityLimits} from 'react-icons/md'
import {RiDoorOpenFill} from 'react-icons/ri'
import { useNavigate } from 'react-router-dom';

const SellerSidebar = () => {
    const {user,logOut} = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogOut = () => {
        logOut().then(() => {
          navigate("/signin");
        });
      };
    return (
        <div className="h-full p-3 space-y-2 w-96 bg-white text-gray-800 font-sans border rounded-md">
        <div className="flex items-center p-2 space-x-4">
            <img src="https://source.unsplash.com/100x100/?portrait" alt="" className="w-12 h-12 rounded-full dark:bg-gray-500" />
            <div>
                <h2 className="text-xl font-bold capitalize">Welcome {user?.displayName} !!!</h2>
            </div>
        </div>
        <div className="divide-y divide-gray-700">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
                <li className="bg-white text-gray-800 hover:bg-indigo-600 hover:text-white rounded-md">
                    <a rel="noopener noreferrer" href="/seller" className="flex items-center p-2 space-x-3 rounded-md">
                    <MdProductionQuantityLimits className='text-xl' />
                        <span className='font-semibold text-lg'>My Products</span>
                    </a>
                </li>
                <li className='bg-white text-gray-800 hover:bg-indigo-600 hover:text-white rounded-md'>
                    <a rel="noopener noreferrer" href="/seller/upload-product" className="flex items-center p-2 space-x-3 rounded-md">
                    <ImUpload className='text-xl' />
                        <span className='font-semibold text-lg'>Upload a product</span>
                    </a>
                </li>
                <li className='bg-white text-gray-800 hover:bg-indigo-600 hover:text-white rounded-md'>
                    <a rel="noopener noreferrer" href={`/seller/current-order/${user?.email}`} className="flex items-center p-2 space-x-3 rounded-md">
                    <ImUpload className='text-xl' />
                        <span className='font-semibold text-lg'>Current orders</span>
                    </a>
                </li>
                
            </ul>
            <ul className="pt-4 pb-2 space-y-1 text-sm">
              
                <li onClick={handleLogOut} className='bg-white text-gray-800 hover:bg-indigo-600 hover:text-white rounded-md'>
                    <a rel="noopener noreferrer" href="/" className="flex items-center p-2 space-x-3 rounded-md">
                    <RiDoorOpenFill className='text-xl' />
                        <span className='font-semibold text-lg'>Logout</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    );
};

export default SellerSidebar;