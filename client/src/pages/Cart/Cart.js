import React, { useEffect, useState } from "react";

const Cart = () => {
  const [carts, setCats] = useState([]);
  useEffect(() => {
    fetch("cart.json")
      .then((res) => res.json())
      .then((data) => {
        setCats(data);
      });
  }, []);
  //
   // Initialize quantities after cart data is fetched
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
cart.productPrice * quantities[index]
);

  // Calculate subtotal
  const subtotal = newCartItemPrices.reduce((acc, price) => acc + price, 0);

  // Calculate total including selected shipping option
  const selectedShippingPrice = shippingOptions.find(
    (option) => option.id === selectedShippingOption
  )?.price;

  const total = subtotal + selectedShippingPrice;
  return (
    <div className="px-0 md:px-10 2xl:px-14 3xl:px-20">
      <h1 className="text-4xl text-black font-semibold py-14">Shoping cart</h1>
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
            const newCartItemPrice = cart.productPrice * quantities[index];
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
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="w-full lg:w-3/12 border rounded-md shadow-lg p-4 mx-5 space-y-4">
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
         
        </div>
      </div>
    </div>
  );
};

export default Cart;
