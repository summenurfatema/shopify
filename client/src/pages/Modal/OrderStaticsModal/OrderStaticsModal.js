import React from "react";
import { AiOutlineDash } from "react-icons/ai";
import { FaBoxOpen } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { IoIosCloseCircle } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import { RxDoubleArrowDown } from "react-icons/rx";

const OrderStaticsModal = ({ order }) => {
  //function for close modal
  const handleCloseStatusModal = (order) => {
    const modalToggle = document.getElementById(`status-${order._id}`);
    modalToggle.checked = false;
  };
  return (
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

          <div className="flex flex-col md:flex-row justify-around items-center m-5 3xl:m-14">
            <div className="flex flex-col items-center justify-center bg-indigo-200 p-10 rounded-full">
              <GiNotebook className="text-4xl" />
              <p className="font-bold text-center">Order is taken</p>
            </div>
            <AiOutlineDash className="text-4xl hidden md:block" />
            <AiOutlineDash className="text-4xl hidden md:block" />
            <RxDoubleArrowDown className="text-3xl my-2 md:hidden" />
            <div
              className={`flex flex-col items-center justify-center p-10  rounded-full ${
                order.status === "packed" || order.status === "delivered"
                  ? "bg-indigo-300"
                  : "bg-gray-100"
              }`}
            >
              <FaBoxOpen className="text-4xl" />
              <p className="font-bold text-center">Packing completed</p>
            </div>
            <AiOutlineDash className="text-4xl hidden md:block" />
            <AiOutlineDash className="text-4xl hidden md:block" />
            <RxDoubleArrowDown className="text-3xl my-2 md:hidden" />
            <div
              className={`flex flex-col items-center justify-center p-10 rounded-full ${
                order.status === "delivered" ? "bg-indigo-400" : "bg-gray-100"
              }`}
            >
              <TbTruckDelivery className="text-4xl" />
              <p className="font-bold text-center">Parcel is on the way</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStaticsModal;
