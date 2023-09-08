import React, { useContext, useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { Link, useLoaderData } from "react-router-dom"
import { AuthContext } from "../../../context/UserContext/UserContext";
import { toast } from 'react-hot-toast';

const ProductCard = () => {
  // getting data from loader
  const product = useLoaderData();

  //quantity state
  const [quantity, setQuantity] = useState(1);

  //getting data from User context
  const {user } = useContext(AuthContext)
  const {
    imageLink,
    productTitle,
    productDescription,
    color,
    isStock,
    category,
    sku,
  } = product.data;


  // Define a style object for the color div
  const colorDivStyle = {
    width: "35px",
    height: "35px",
    backgroundColor: color, 
    display: "inline-block",
    verticalAlign: "middle",
    border:"1px solid gray",
    marginRight: "8px", 
    borderRadius:"50%"
  };

  //change quantity
  const handleQuantityPlus = () => {
    setQuantity(quantity + 1);
  };
  const handleQuantityMinus = () => {
    setQuantity(quantity - 1);
  };

  //newprice of product
  const newPrice = (product.data.productPrice * quantity).toFixed(2);
  

   //razorpay button 
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


// Add product to my order
const handleMyOrder = () => {
  const data = {
    productName: productTitle,
    quantity: quantity,
    paidAmount: newPrice,
    email:user?.email,
    sellerSku :sku
  };
 
  const apiUrl = "https://shopify-snqy.onrender.com/api/v1/post-to-my-order";

  // Make a POST request to your backend
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((responseData) => {
      toast.success("Product is added in cart successfully!!!");
    })
    .catch((error) => {
      console.error("Error sending data to backend:", error);
    });


  }
  //adding product to cart
 const handleAddToCart = () => {
  const data = {
    productTitle:productTitle,
    productImage:imageLink,
    quantity:quantity,
    price: newPrice,
    email:user?.email,
    sellerSku :sku
  };

  const apiUrl = "https://shopify-snqy.onrender.com/api/v1/post-to-cart"; 

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({data}),
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((responseData) => {
    toast.success("Product is added in cart successfully!!!");
  })
  .catch((error) => {
    console.error("Error sending data to backend:", error);
   toast.error("Product already in cart");
  })
}


  return (
    <div className="bg-white text-gray-800 font-sans flex justify-between items-start px-0 md:px-10 2xl:px-14 3xl:px-20 py-10">
      {/* left */}
      <div className="w-1/2 ">
        <img
          alt="Home"
          src={imageLink}
          class=" w-11/12 rounded-md object-cover"
        />
      </div>
      {/* right */}
      <div class=" space-y-5 w-1/2 ">
        <div class="space-y-2">
          <p class="text-xl capitalize">For {category}</p>

          <h1 class="text-3xl text-gray-800 font-semibold">{productTitle}</h1>

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
         
        </div>
        <p className="text-xl pt-1">₹{newPrice}</p>
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
      
        <div className="flex items-center space-x-5">
        <span className="text-xl">Color: </span>
        <div style={colorDivStyle}></div>
        </div>
       
          
        {user?
         <div className="flex items-start">
        <button onClick={handleAddToCart} className="mr-3 w-40 rounded-md  text-xl text-white py-2 bg-indigo-700 hover:bg-indigo-500">
        Add to cart
      </button>

      <form onClick={handleMyOrder} id='form'></form>

      </div>
      :
      <div className="flex items-center">
      <Link to='/signin'>
        <button  className="w-40 rounded-md mt-2 text-xl text-white py-2 bg-indigo-700 hover:bg-indigo-500">
          Add to cart
        </button>
      </Link>
      <Link to='/signin'>
      <button  className="ml-3 w-40 rounded-md mt-2 text-xl text-white py-2 bg-indigo-700 hover:bg-indigo-500">
          Pay now
        </button>
      </Link>
      </div>
}


        <div className="px-5 space-y-1 border-t pt-3">
          <div className="flex items-center justify-start w-8/12">
            <TiTick className="text-xl mr-2" />
            <p class="text-lg uppercase">SKU: {sku}</p>
          </div>
          <div className="flex items-center justify-start w-8/12">
            <TiTick className="text-xl mr-2" />
            <p class="text-lg capitalize">Category: {category}</p>
          </div>
          <div className="flex items-center justify-start w-8/12">
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
