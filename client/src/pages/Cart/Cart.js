import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/UserContext/UserContext";
import { toast } from "react-hot-toast";


const Cart = () => {
  const { user } = useContext(AuthContext);

  //cart state
  const [carts, setCarts] = useState([]);
  // quantity state
  const [quantities, setQuantities] = useState([]);

  // pagination
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = carts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(carts.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // delivary charge state
  const [selectedShippingOption, setSelectedShippingOption] = useState("free");

  // get cart items
  useEffect(() => {
    fetch(`http://localhost:5000/get-cart-item/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setCarts(data);
      });
  }, []);


// setup quantity of every product
  useEffect(() => {
    setQuantities(carts.map(() => 1));
  }, [carts]);


  //increase quantity
  const handleQuantityPlus = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
  };

  // decrease quantity
  const handleQuantityMinus = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 1) {
      newQuantities[index] -= 1;
      setQuantities(newQuantities);
    }
  };

  // delivery charge options

  const shippingOptions = [
    { id: "flat", label: "Flat rate", price: 20 },
    { id: "local", label: "Local pick up", price: 25 },
    { id: "free", label: "Free shipping", price: 0 },
  ];

  // all items price

  const newCartItemPrices = carts.map(
    (cart, index) => cart.price * quantities[index]
  );

  // Calculate subtotal
  const subtotal = newCartItemPrices.reduce((acc, price) => acc + price, 0);

  // Calculate total including selected shipping option
  const selectedShippingPrice = shippingOptions.find(
    (option) => option.id === selectedShippingOption
  )?.price;

  //calculate total price with devivery charge

  const total = subtotal + selectedShippingPrice;

  // razorpay button

  useEffect(() => {
    const loadPaymentButtonScript = () => {
      const form = document.getElementById("payment");
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/payment-button.js";
      script.async = true;
      script.dataset.payment_button_id = "pl_MXRJDPUPoDIfxQ";

      if (form) {
        form.appendChild(script);
      }
    };
    loadPaymentButtonScript();

    return () => {
      const script = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/payment-button.js"]'
      );
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  //order's collection
  const handleOrders = async () => {
 
    try {
      // getting all product information
      const newItems = carts.map((cart) => ({
        productTitle: cart.productTitle,
        productImage: cart.productImage,
        quantity: parseInt(cart.quantity),
        sellerSku: cart.sellerSku,
      }));

      const products = {
        items: newItems,
      };

      const orderData = {
        email: user?.email,
        totalAmount: parseInt(total),
        products: products,
        status: "pending",
      };

      // post order to mongodb

      const response = await fetch("http://localhost:5000/add-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.status === 200) {
        toast.success("WoW, our order is confirmed !!!");

        // Removing product after taken the order

        await fetch("http://localhost:5000/remove-items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user?.email }),
        });

        setCarts([]);

      } else {
        console.error("Failed to add items:", carts);
      }
    } catch (error) {
      console.error("Error adding items to order:", error);
    }
  };

  // Clear the cart or update it as needed
  const handleProductDelete = (cart) => {
    const agree = window.confirm("Are you ready to delete this product?");
    if (agree) {
      fetch(`http://localhost:5000/delete-cart-item/${cart._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert(" This product has been deleted successfully !");
            window.location.reload();
          }
        });
    }
  };

  return (
    <div className="px-0 md:px-10 2xl:px-14 3xl:px-20 font-sans bg-white">
      <h1 className="text-2xl xl:text-4xl text-center lg:text-start text-black font-semibold py-10">
        Shoping cart
      </h1>
      {carts.length === 0 ? (
        <>
          <p className="text-sm md:text-lg 2xl:text-2xl text-gray-800 font-medium text-center">
            Your cart is empty. Do some{" "}
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
      ) : (
        <div className="flex flex-col p-6 space-y-4 bg-white text-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-start border rounded-md p-8">
            <div className="flex flex-col divide-y divide-gray-700 w-full lg:w-6/12 3xl:w-6/12 ">
              {/* Cart items */}
              <ul className="flex flex-col ">
                {currentItems.map((cart, index) => {
                  const newCartItemPrice = cart.price * quantities[index];
                  return (
                    <li className="flex w-full flex-col lg:flex-row   border p-3 mb-3 shadow-lg space-x-2 rounded-md">
                      
                      <img
                        className="flex-shrink-0 object-cover w-full  lg:h-24 lg:w-24 rounded outline-none"
                        src={cart.productImage}
                        alt={cart.productTitle}
                      />
                      
                      <div className="flex flex-col justify-between w-full pb-4">
                        <div className="flex justify-between w-full pb-2 space-x-2 pt-3 lg:pt-0">
                          <div className="space-y-1">
                            <h3 className="text-lg font-semibold leadi sm:pr-8">
                              {cart.productTitle}
                            </h3>
                          </div>
                          <div className="text-right">
                            <button
                              onClick={() => handleProductDelete(cart)}
                              type="button"
                              className="flex items-center px-2 py-1 pl-0 space-x-1"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                className="w-4 h-4 fill-current"
                              >
                                <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                                <rect
                                  width="32"
                                  height="200"
                                  x="168"
                                  y="216"
                                ></rect>
                                <rect
                                  width="32"
                                  height="200"
                                  x="240"
                                  y="216"
                                ></rect>
                                <rect
                                  width="32"
                                  height="200"
                                  x="312"
                                  y="216"
                                ></rect>
                                <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                              </svg>
                              <span>Remove</span>
                            </button>

                          </div>
                        </div>
                        <p className="text-md font-medium">
                          Price: ₹ {newCartItemPrice.toFixed(2)}
                        </p>
                        {/* quantity */}
                        <div className="flex space-x-3 items-center my-3">
                          <button
                            className="text-lg font-bold px-2 lg:px-4 py-1 bg-gray-100 border rounded-md"
                            onClick={() => handleQuantityMinus(index)}
                          >
                            -
                          </button>
                          <span className="text-lg">{quantities[index]}</span>
                          <button
                            className="text-lg font-bold px-2 lg:px-4 py-1 bg-gray-100 border rounded-md"
                            onClick={() => handleQuantityPlus(index)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="flex justify-center items-center my-2 border-none">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`bg-${currentPage === index + 1 ? 'indigo-700' : 'white'} text-${currentPage === index + 1 ? 'white' : 'indigo-700'} text-xl rounded-lg px-4 border mr-2 py-1`}
          >
            {index + 1}
          </button>
        ))}
      </div>
            </div>
            {/*Amoun calculation */}
            <div className="space-y-1 border w-full lg:w-5/12  3xl:w-5/12 p-4 text-right rounded-md">
              <p>
                Subtotal:
                <span className="font-semibold pl-2 pb-2">
                ₹ {subtotal.toFixed(2)}
                </span>
              </p>
              <form className="flex flex-col space-y-3 py-2 mb-3">
                {shippingOptions.map((option) => (
                  <div key={option.id}>
                    <input
                      type="radio"
                      id={option.id}
                      value={option.id}
                      checked={selectedShippingOption === option.id}
                      onChange={() => setSelectedShippingOption(option.id)}
                    />
                    <label className="pl-2" htmlFor={option.id}>
                      {option.label}{" "}
                      <span className="text-blue-500">
                        ₹ {option.price.toFixed(2)}
                      </span>
                    </label>
                  </div>
                ))}
              </form>
              <p>
                Total amount:
                <span className="font-semibold pl-2 pb-4">
                ₹ {total.toFixed(2)}
                </span>
              </p>

              <form
                className="w-full"
                id="payment"
                onClick={handleOrders}
              ></form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
