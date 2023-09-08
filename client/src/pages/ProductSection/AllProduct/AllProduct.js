import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/get-product")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);
;
  console.log(products);
  return (
    <div className="bg-white px-0 md:px-10 2xl:px-14 3xl:px-20 py-10 lg:gap-6 font-sans">
   <h1 className="text-2xl xl:text-4xl text-center lg:text-start text-gray-800 font-semibold py-10">
        Our best collection
      </h1>
    <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {products.map((product) => (
        <Link
          to={`/data/${product._id}`}
          class="relative block rounded-lg p-4 shadow-sm shadow-indigo-100"
        >
          <img
            alt={product.productTitle}
            src={product.data.imageLink}
            class="h-96 w-full rounded-md object-cover"
          />

          <div class="mt-4 space-y-2">
            <p class="text-xl capitalize">{product.data.subcategory}</p>

            <h1 class="text-xl text-gray-500 font-semibold">
              {product.data.productTitle}
            </h1>
            <div className="flex space-x-1">
              <AiFillStar className="text-2xl text-yellow-500" />
              <AiFillStar className="text-2xl text-yellow-500" />
              <AiFillStar className="text-2xl text-yellow-500" />
              <AiFillStar className="text-2xl text-yellow-500" />
              <AiFillStar className="text-2xl text-gray-300" />
            </div>
            <h1 class="text-2xl text-gray-500 font-medium">
            ₹ {product.data.productPrice}{" "}
            
            </h1>
          </div>
          <button className="rounded-md mt-2 text-xl text-white py-3 w-full bg-indigo-700 hover:bg-indigo-500">
            View details
          </button>
        </Link>
      ))}
    </div>
    </div>
  );
};

export default AllProduct;
