import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/UserContext/UserContext";
import { useLoaderData } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";
import { GiNotebook } from "react-icons/gi";
import { AiOutlineDash } from "react-icons/ai";
import { FaBoxOpen } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";

const MyOrder = () => {
  const { user } = useContext(AuthContext);
  const orders = useLoaderData();

  const handleCloseModal = (order) => {
    const modalToggle = document.getElementById(`my-${order._id}`);
    modalToggle.checked = false;
  };
  const handleCloseStatusModal = (order) => {
    const modalToggle = document.getElementById(`status-${order._id}`);
    modalToggle.checked = false;
  };

  return (
    <div className="bg-white font-sans px-0 md:px-10 2xl:px-14 3xl:px-20 h-screen">
      <h1 className="text-2xl xl:text-4xl text-center lg:text-start text-black font-semibold py-14">
        My orders
      </h1>
      <div className="flex justify-center items-center">
        <table className="p-6 text-lg text-left w-full lg:w-9/12 border text-gray-800">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-center">Order ID</th>
              <th className="p-3 text-center">Email</th>
              <th className="p-3 text-center">Amount</th>
              <th className="p-3 text-center">Orders</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="border-b space-y-3 p-2">
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="p-4 text-center">{order.orderId}</td>
                <td className="p-4 text-center">{order.email}</td>
                <td className="p-4 text-center">{order.totalAmount}</td>
                <td className="p-4 text-center">
                  <label htmlFor={`my-${order._id}`}>View products</label>

                  <div className="">
                    <input
                      type="checkbox"
                      id={`my-${order._id}`}
                      className="modal-toggle"
                    />
                    <div
                      className="modal"
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                       
                      }}
                    >
                      <div className="modal-box w-11/12 max-w-3xl bg-white">
                        <IoIosCloseCircle
                          className="text-2xl text-gray-800 float-right cursor-pointer"
                          onClick={() => handleCloseModal(order)}
                        />
                        <ul>
                        {order.products.items.map((item, itemIndex) => (
                            
                          <li className="text-start justify-evenly flex items-center"  key={itemIndex}>

                          <img
                    src={item.productImage}
                    className="h-14 w-14 lg:h-24 lg:w-20 object-cover rounded-lg p-2"
                    alt="CartItem"/>
                  
                  
                          
                          
                          <p className="text-center"  key={itemIndex}>{item.productTitle}</p>
                          <p className="text-end"  key={itemIndex}>Qnty: {item.quantity}</p>
                          
                          
                          </li>
                        ))}
                      </ul>
                   
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <label htmlFor={`status-${order._id}`}>View products</label>

                  <div className="">
                    <input
                      type="checkbox"
                      id={`status-${order._id}`}
                      className="modal-toggle"
                    />
                    <div
                      className="modal"
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        zIndex: 2147483647,
                      }}
                    >
                      <div className="modal-box w-11/12 max-w-3xl bg-white">
                        <IoIosCloseCircle
                          className="text-2xl text-gray-800 float-right cursor-pointer"
                          onClick={() => handleCloseStatusModal(order)}
                        />
                       
                        <div className="flex justify-around items-center m-14">
                          <div className="flex flex-col items-center justify-center bg-indigo-100 p-10 rounded-full">
                            <GiNotebook className="text-4xl" />
                            <p className="font-bold text-center">
                              Order is taken
                            </p>
                          </div>
                          <AiOutlineDash className="text-4xl font-bold" />
                          <AiOutlineDash className="text-4xl" />
                          <div
                            className={`flex flex-col items-center justify-center p-10 rounded-full ${
                              order.status === "pending" ? "bg-indigo-200" : "" // Add a default value if needed
                            }`}
                          >
                            <FaBoxOpen className="text-4xl" />
                            <p className="font-bold text-center">
                              Packing complete
                            </p>
                          </div>
                          <AiOutlineDash className="text-4xl" />
                          <AiOutlineDash className="text-4xl" />
                          <div
                            className={`flex flex-col items-center justify-center p-10 rounded-full ${
                              order.status === "pending" ? "bg-indigo-300" : "" // Add a default value if needed
                            }`}
                          >
                            <TbTruckDelivery className="text-4xl" />
                            <p className="font-bold text-center">
                              Ready to parcel
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrder;
