import React from "react";
import { IoIosCloseCircle } from "react-icons/io";

const OrderModal = ({ order }) => {

  //function for close modal
  const handleCloseModal = (order) => {
    const modalToggle = document.getElementById(`my-${order._id}`);
    modalToggle.checked = false;
  };
  return (
    <div className="">
      <input type="checkbox" id={`my-${order._id}`} className="modal-toggle" />
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
          <div className="grid grid-cols-1  md:grid-cols-2 gap-5 py-2">
            {order?.products?.items?.map((item, itemIndex) => (
              <div class="flex items-center gap-4 border rounded-md p-2 border-gray-300 shadow-lg">
                <img
                  alt="Developer"
                  src={item.productImage}
                  class="h-24 w-24 rounded-full object-cover"
                />

                <div>
                  <>
                    <h3 class="text-lg font-medium text-gray-800">
                      {item.productTitle}
                    </h3>
                    <h3 class="text-lg font-medium text-gray-800">
                      Qnty: {item.quantity}
                    </h3>
                  </>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
