import React from "react";
import { useLoaderData } from "react-router-dom";
import { IoIosStats } from "react-icons/io";
import { AiOutlineFundView } from "react-icons/ai";

import OrderModal from "../Modal/OrderModal/OrderModal";
import OrderStaticsModal from "../Modal/OrderStaticsModal/OrderStaticsModal";

const MyOrder = () => {
  const orders = useLoaderData();

  return (
    <div className="bg-white font-sans px-0 md:px-10 2xl:px-14 3xl:px-20">
      <h1 className="text-2xl xl:text-4xl text-center lg:text-start text-black font-semibold py-14">
        My orders
      </h1>
      <div className="flex justify-center items-center">
        <div className="flex flex-col mx-3 p-6 space-y-4 sm:p-10 bg-white text-gray-800 border rounded-md">
          {
            orders.length === 0?
            <>
          <p className="text-sm md:text-lg 2xl:text-2xl text-gray-800 font-medium text-center py-14">
            You didn't make any order yet. Do some{" "}
            <span>
              <a
                href="/"
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Shopping
              </a>
            </span>{" "}
            !!!
          </p>
        </>
        :
         
          <ul className="flex flex-col divide-y divide-gray-700 w-full md:w-[500px] lg:w-[700px] xl:w-[800px] 3xl:w-[1200px]">
            {orders.map((order) => (
              <li className="flex flex-col py-6 sm:flex-row sm:justify-between">
               {
                order?.products?.items?.map(o=>(
                  <div className="flex flex-col lg:flex-row w-full lg:space-x-2 ">
                  <img
                    className="flex-shrink-0 object-cover w-20 h-20 border rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                    src="https://img.freepik.com/free-photo/hands-delivering-mail-package_1101-289.jpg?size=626&ext=jpg&ga=GA1.1.1540219272.1675657721&semt=ais"
                    alt="Order"
                  />
                  <div className="flex flex-col justify-between w-full pb-3  pt-4 lg:pt-0">
                    <div className="flex justify-between w-full pb-2 space-x-2">
                      <div className="space-y-1">
                        <h3 className="text-sm lg:text-lg font-semibold leadi sm:pr-8">
                          Order ID: {o.orderId}
                        </h3>
                        {/* <p className="text-sm text-gray-700 hidden md:block">
                          Email: {order.email}
                        </p> */}
                      </div>
                      <div className="text-right">
                        {/* <p className="text-sm lg:text-lg font-semibold">
                          Amount ₹ {order.totalAmount.toFixed(2)}
                        </p> */}
                      </div>
                    </div>
                    <div className="flex text-sm divide-x">
                      <label
                        htmlFor={`my-${order._id}`}
                        className="flex items-center px-2 py-1 pl-0 space-x-1"
                      >
                        <AiOutlineFundView className="text-2xl" />
                        <span>View products</span>
                      </label>
                      <OrderModal order={order} />
                      <label
                        htmlFor={`status-${order._id}`}
                        className="flex items-center px-2 py-1 space-x-1"
                      >
                        <IoIosStats className="text-2xl" />
                        <span>View status</span>
                      </label>
                      <OrderStaticsModal order={order} />
                    </div>
                  </div>
                </div>
                ))
               }
              </li>
            ))}
          </ul>
}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
