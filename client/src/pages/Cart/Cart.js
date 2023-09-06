import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/UserContext/UserContext";
import { TbTrashOff } from "react-icons/tb";

const Cart = () => {
  const {user} = useContext(AuthContext)
  const [carts, setCarts] = useState([]);
  console.log(carts.length);
  useEffect(() => {
    fetch(`http://localhost:5000/get-cart-item/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setCarts(data);
      });
  }, []);
  // //
  //  // Initialize quantities after cart data is fetched
    const [quantities, setQuantities] = useState([]);
   useEffect(() => {
    setQuantities(carts.map(() => 1));
  }, [carts]);



  const handleQuantityPlus = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
  };

  // Function to handle quantity decrease for a specific item
  const handleQuantityMinus = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 1) {
      newQuantities[index] -= 1;
      setQuantities(newQuantities);
    }
  };
//
const [selectedShippingOption, setSelectedShippingOption] = useState("free");
const shippingOptions = [
  { id: "flat", label: "Flat rate", price: 20 },
  { id: "local", label: "Local pick up", price: 25 },
  { id: "free", label: "Free shipping", price: 0 },
];

const newCartItemPrices = carts.map((cart, index) =>
cart.price * quantities[index]
);

  // Calculate subtotal
  const subtotal = newCartItemPrices.reduce((acc, price) => acc + price, 0);

  // Calculate total including selected shipping option
  const selectedShippingPrice = shippingOptions.find(
    (option) => option.id === selectedShippingOption
  )?.price;

  const total = subtotal + selectedShippingPrice;
  //
  useEffect(() => {
    const loadPaymentButtonScript = () => {
      const form = document.getElementById("form");
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
  //
 
  // const handleAddItems = async () => {
  //   const newItems = carts.map((cart) => ({
  //     productTitle: cart.productTitle,
  //     productImage: cart.imageLink,
  //     quantity: parseInt(cart.quantity),
  //     sku: cart.sku,
  //   }));
  
  //   try {
  //     // Create a single object with an "items" property containing the array of products
  //     const products = {
  //       items: newItems,
  //     };
  
  //     const orderData = {
  //       client: user?.email,
  //       totalAmount: parseInt(total),
  //       products: products,
  //       status:"pending"
       
  //     };
  
  //     // Log the object before sending the request
  //     console.log("Adding items:", orderData);
  
  //     const response = await fetch("http://localhost:5000/add-items", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(orderData),
  //     });
  
  //     // Check if the response status is OK (200) before considering it successful
  //     if (response.status === 200) {
  //       console.log("Items added successfully:", newItems);
  //     } else {
  //       console.error("Failed to add items:", newItems);
  //     }
  
  //     // Clear the cart or update it as needed
  //     setCarts([]);
  //   } catch (error) {
  //     console.error("Error adding items to order:", error);
  //     // Handle error (e.g., display an error message to the user)
  //   }
  // };
  const handleAddItems = async () => {
    // ... Your existing code for creating orders ...
  
    try {
      // Log the object before sending the request
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
                  status:"pending"
                 
                };
            
                // Log the object before sending the request
                console.log("Adding items:", orderData);
      console.log("Adding items:", orderData);
  
      const response = await fetch("http://localhost:5000/add-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
  
      // Check if the response status is OK (200) before considering it successful
      if (response.status === 200) {
        console.log("Items added successfully:", carts);
  
        // Remove the items from the cartCollection
        // Assuming each cart item has an _id property
        await fetch("http://localhost:5000/remove-items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user?.email }),
        });
  
        // Clear the cart or update it as needed
        setCarts([]);
      } else {
        console.error("Failed to add items:", carts);
      }
    } catch (error) {
      console.error("Error adding items to order:", error);
      // Handle error (e.g., display an error message to the user)
    }
  };
  
  
      // Clear the cart or update it as needed
      const handleDelete = (cart) => {
        const agree = window.confirm("Are you ready to delete this product?");
        if (agree) {
          fetch(
            `http://localhost:5000/delete-cart-item/${cart._id}`,
            {
              method: "DELETE",
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.deletedCount > 0) {
                alert(" This product has been deleted successfully !");
                window.location.reload()
              }
            });
        }
      };
      
  
  return (
    <div className="px-0 md:px-10 2xl:px-14 3xl:px-20 font-sans bg-white h-screen">
      <h1 className="text-2xl xl:text-4xl text-center lg:text-start text-black font-semibold py-14">Shoping cart</h1>
      {
        carts.length === 0 ?
        <>
        <p className="text-sm md:text-lg 2xl:text-2xl text-gray-800 font-medium text-center">Your cart is empty. Do some <span><a href='/' className="text-blue-600 cursor-pointer hover:underline" >Shopping</a></span> !!!</p>
        <p className="text-sm md:text-lg 2xl:text-2xl text-gray-800 font-medium text-center">order <span><a href={`/my-order/${user?.email}`} className="text-blue-600 cursor-pointer hover:underline" >Here</a></span> !!!</p>
        </>
        :
        <div className="flex flex-col lg:flex-row items-start">

      
      <table className=" p-6 text-lg text-left w-full lg:w-9/12 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3">Product</th>
         
            <th className="p-3">Quantity</th>
               <th className="p-3">Price</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody className="border-b ">
        {carts.map((cart, index) => {
            const newCartItemPrice = cart.price * quantities[index];
            return (
              <tr key={cart.productId} className="">
                <td>
                  <img
                    src={cart.productImage}
                    className="h-14 w-12 lg:h-24 lg:w-20 object-cover rounded-lg p-2"
                    alt="CartItem"
                  />
                </td>            
                <td>
                  <div className="flex space-x-3 items-center">
                    <button
                      className="text-2xl font-bold px-2 lg:px-4 py-1 bg-gray-100 border rounded-md"
                      onClick={() => handleQuantityMinus(index)}
                    >
                      -
                    </button>
                    <span className="text-xl">{quantities[index]}</span>
                    <button
                      className="text-2xl font-bold px-2 lg:px-4 py-1 bg-gray-100 border rounded-md"
                      onClick={() => handleQuantityPlus(index)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="text-sm lg:text-xl">${newCartItemPrice.toFixed(2)}</td>
                <td className='pl-5'>
                               <div onClick={()=>handleDelete(cart)}  className="flex justify-center items-center h-12 w-12 rounded-full duration-200 hover:bg-red-500">
                                 <TbTrashOff className="text-3xl text-center text-gray-800 hover:text-white " />
                               </div>
                               </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="w-full lg:w-3/12 border rounded-md shadow-lg p-4 mt-10 lg:mt-0 lg:mx-5 space-y-4">
       <div className="flex justify-between items-center border-b pb-2">
       <p className="text-2xl text-black font-semibold">Subtotal:</p>
       <p className="text-2xl text-black font-semibold">${subtotal.toFixed(2)}</p>
       </div>
         
          <form className="flex flex-col space-y-3 py-2">
            {shippingOptions.map((option) => (
              <div key={option.id}>
                <input
                  type="radio"
                  id={option.id}
                  value={option.id}
                  checked={selectedShippingOption === option.id}
                  onChange={() => setSelectedShippingOption(option.id)}
                />
                <label className="text-xl text-black pl-2" htmlFor={option.id}>
                  {option.label} <span className="text-blue-500">${option.price.toFixed(2)}</span>
                </label>
              </div>
            ))}
          </form>
          <div className="flex justify-between items-center border-t pt-2">
       <p className="text-2xl text-black font-semibold ">Total:</p>
       <p className="text-2xl text-black font-semibold">${total.toFixed(2)}</p>
       </div>
         <form className="w-full  float-right" id="form" onClick={handleAddItems}></form>
        </div>
      </div>
      }
    </div>
  );
};

export default Cart;
