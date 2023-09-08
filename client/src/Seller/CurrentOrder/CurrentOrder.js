import React, { useEffect, useState } from "react";
import { IoIosStats } from "react-icons/io";
import { AiOutlineFundView } from "react-icons/ai";
import { FaBoxOpen } from 'react-icons/fa';
import { TbTruckDelivery } from 'react-icons/tb';
import OrderModal from "../../pages/Modal/OrderModal/OrderModal";
import OrderStaticsModal from "../../pages/Modal/OrderStaticsModal/OrderStaticsModal";
import { toast } from "react-hot-toast";


const CurrentOrder = () => {
  //state of orders
    const [orders,setOrders] =useState([])

    //getting all orders from backend
    useEffect(() => {
        fetch(`https://shopify-snqy.onrender.com/api/v1/get-all-order`)
          .then((res) => res.json())
          .then((data) => {
            setOrders(data);
          });
      }, []);


// make the status packing confirmed
const handlePackingConfirmed = async (_id) => {
    const updatedStatus = "packed";
    const confirmation = window.confirm(
      "All products are packed ?"
    );

    if (!confirmation) {
      return;
    }

    try {
      const response = await fetch(
        `https://shopify-snqy.onrender.com/api/v1/make-status-packed/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ updatedStatus }),
        }
      );

      if (response.ok) {
        toast.success("You've changed the status as 'Packed' successfully.");
      } else {
        console.error("Failed to update");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };


//  make the status deliverd confirmed

const handleDeliveredConfirmed = async (_id) => {
    const updatedStatus = "delivered";
    const confirmation = window.confirm(
      "All products are ready to delivered ?"
    );

    if (!confirmation) {
      return;
    }

    try {
      const response = await fetch(
        `https://shopify-snqy.onrender.com/api/v1/make-status-delivered/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ updatedStatus }),
        }
      );

      if (response.ok) {
        toast.success("You've changed the status as 'Delivered' successfully.");
      } else {
        console.error("Failed to update");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="bg-white font-sans w-full">
      
      <div className="flex justify-between items-center">
      {orders.length === 0 ? (
        <div className="h-screen">
          <p className="text-sm md:text-lg 2xl:text-2xl text-gray-800 font-medium text-center py-14">
            You don't have any order yet !!!
          </p>
        </div>)
        :
        (<div className="flex flex-col w-full p-2 space-y-4 sm:p-10 bg-white text-gray-800 border rounded-md">
        <h1 className="text-2xl xl:text-4xl text-center lg:text-start text-black font-semibold">
        Current orders
      </h1>
          <ul className="flex flex-col divide-y divide-gray-700 w-full">
            {orders.map((order) => (
              <li className="flex flex-col py-6 sm:flex-row sm:justify-between">
                <div className="flex flex-col lg:flex-row w-full lg:space-x-2 ">
                  <img
                    className="flex-shrink-0 object-cover w-20 h-20 border rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                    src="https://img.freepik.com/free-photo/hands-delivering-mail-package_1101-289.jpg?size=626&ext=jpg&ga=GA1.1.1540219272.1675657721&semt=ais"
                    alt="Order"
                  />
                  <div className="flex flex-col justify-between w-full pb-3  pt-4 lg:pt-0">
                    <div className="flex justify-between w-full pb-2 space-x-2">
                      <div className="space-y-1">
                        <h3 className="text-sm font-semibold leadi sm:pr-8">
                          Order ID: {order.orderId}
                        </h3>
                        <p className="text-sm text-gray-700 hidden md:block">
                          Client: {order.email}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">
                          Amount ₹ {order?.totalAmount?.toFixed(2)}
                        </p>
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
                        <OrderStaticsModal order={order}/>
                      </label>
                    
                    </div>
                    <div className="flex text-sm divide-x">
                      <p
                        htmlFor={`my-${order._id}`}
                        className="flex items-center px-2 py-1 pl-0 space-x-1"
                      >
                        <FaBoxOpen className="text-2xl" />
                       {order?.status==='pending'?
                        <span className="cursor-pointer" onClick={()=>handlePackingConfirmed(order._id)}>Packing incomplete</span>
                        :
                        <span className="cursor-not-allowed">Packing completed</span>
                       }
                      </p>
                      <label
                        htmlFor={`status-${order._id}`}
                        className="flex items-center px-2 py-1 space-x-1"
                      >
                        <TbTruckDelivery className="text-2xl" />
                       {order.status === "packed" ? (
                    <span className="cursor-pointer" onClick={() => handleDeliveredConfirmed(order._id)}>
                      Ready to deliver
                    </span>
                  ) : order.status === "pending" ? (
                    <span className="cursor-not-allowed">Not ready to deliver</span>
                  ) : <span className="cursor-not-allowed">Delivered</span>}
                      </label>
                    
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>)
}
      </div>
    </div>
  );
};

export default CurrentOrder;
