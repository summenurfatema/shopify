import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { useLoaderData } from "react-router-dom";

const ProductCard = () => {
  const data = useLoaderData();
  console.log(data);
  const {
    productName,
    offerPrice,
    previousPrice,
    productDescription,
    color,
    productImage,
    productColor,
    productSize,
    productQuantity,
    isStock,
    category,
    sku,
  } = data;
  // Define a style object for the color div
  const colorDivStyle = {
    width: "35px",
    height: "35px",
    backgroundColor: "#000", // Set the background color dynamically
    display: "inline-block",
    verticalAlign: "middle",
    border:"1px solid gray",
    marginRight: "8px", 
    borderRadius:"50%"
    // Adjust as needed
  };
  const [quantity, setQuantity] = useState(1);
  const handleQuantityPlus = () => {
    setQuantity(quantity + 1);
  };
  const handleQuantityMinus = () => {
    setQuantity(quantity - 1);
  };
  //newprice
  const newPrice = (data.productPrice * quantity).toFixed(2);
  return (
    <div className="font-sans flex justify-between items-start px-0 md:px-10 2xl:px-14 3xl:px-20 py-10">
      {/* left */}
      <div className="w-1/2 ">
        <img
          alt="Home"
          src={data.productImage}
          class=" w-11/12 rounded-md object-cover"
        />
      </div>
      {/* right */}
      <div class=" space-y-5 w-1/2 ">
        <div class="space-y-2">
          <p class="text-xl">{category}</p>

          <h1 class="text-3xl text-gray-800 font-semibold">{productName}</h1>

          <div className="flex space-x-3 items-center">
            <>
              {isStock === "true" ? (
                <button className="px-3 py-2 bg-blue-100 text-blue-600 text-xl">
                  in stock
                </button>
              ) : (
                <button className="px-3 py-1 bg-gray-200 text-gray-600 text-xl rounded-md">
                  out of stock
                </button>
              )}
            </>
            <div className="flex space-x-1">
              <AiFillStar className="text-2xl text-yellow-500" />
              <AiFillStar className="text-2xl text-yellow-500" />
              <AiFillStar className="text-2xl text-yellow-500" />
              <AiFillStar className="text-2xl text-yellow-500" />
              <AiFillStar className="text-2xl text-gray-300" />
            </div>
          </div>
          <p className="text-xl pt-1">{productDescription}</p>
          <h1 class="text-2xl text-gray-500 font-medium">
            ${offerPrice} <del className="text-sm">${previousPrice}</del>{" "}
          </h1>
        </div>

        <div className="flex space-x-3 items-center">
          <button
            className="text-2xl font-bold px-4 py-1 bg-gray-100 border rounded-md"
            onClick={handleQuantityMinus}
          >
            -
          </button>
          <span className="text-xl">{quantity}</span>
          <button
            className="text-2xl font-bold px-4 py-1 bg-gray-100 border rounded-md"
            onClick={handleQuantityPlus}
          >
            +
          </button>
        </div>
        <p className="text-xl pt-1">${newPrice}</p>
        <div className="flex items-center space-x-5">
        <span className="text-xl">Color: </span>
        <div style={colorDivStyle}></div>
        </div>
       
          
        <button className="w-40 rounded-md mt-2 text-xl text-white py-3 bg-indigo-700 hover:bg-indigo-500">
          Add to cart
        </button>

        <div className="px-5 space-y-1 border-t pt-3">
          <div className="flex items-center justify-start w-5/12">
            <TiTick className="text-xl mr-2" />
            <p class="text-lg">SKU: {sku}</p>
          </div>
          <div className="flex items-center justify-start w-5/12">
            <TiTick className="text-xl mr-2" />
            <p class="text-lg">Category: {category}</p>
          </div>
          <div className="flex items-center justify-start w-5/12">
            <TiTick className="text-xl mr-2" />
            <p class="text-lg">30 days easy return</p>
          </div>
          <div className="flex items-center justify-start w-12/12">
            <TiTick className="text-xl mr-2" />
            <p class="text-lg">Order before 2.30pm for same day dispatch</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
