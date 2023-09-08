
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TbTrashOff } from 'react-icons/tb';

const SellerProduct = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/get-all-product")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  // Calculate the range of products to display based on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className=''>
    <div className="overflow-x-auto font-sans h-screen">
      <table className="p-6 text-lg text-left w-full border rounded-md">
        <thead>
          <tr className="bg-gray-200 text-gray-800">
            <th className="p-3 text-xs lg:text-sm 2xl:text-lg text-center">Product</th>
            <th className="p-3 text-xs lg:text-sm 2xl:text-lg text-center">Name</th>
            <th className="p-3 text-xs lg:text-sm 2xl:text-lg text-center">Category</th>
            <th className="p-3 text-xs lg:text-sm 2xl:text-lg text-center">Price</th>
            <th className="p-3 text-xs lg:text-sm 2xl:text-lg text-center">Stock</th>
            <th className="p-3 text-xs lg:text-sm 2xl:text-lg text-center">Action</th>
            <th className="p-3 ">Remove</th>
          </tr>
        </thead>
        <tbody className="border-b">
          {currentProducts.map((cart, index) => {
            return (
              <tr key={cart.productId} className="">
                <td className='flex justify-center items-center'>
                  <img
                    src={cart.data.imageLink}
                    className="h-14 w-12 lg:h-24 lg:w-24 object-cover rounded-lg p-2"
                    alt="CartItem"
                  />
                </td>
                <td className="w-1/4 md:w-1/6">
                  <h1 class="text-lg text-gray-800 font-normal text-center">{cart.data.productTitle}</h1>
                </td>
                <td className="w-1/4 md:w-1/6">
                  <h1 class="text-lg text-gray-800 font-normal text-center capitalize">{cart.data.category}</h1>
                </td>
                <td className="w-1/4 md:w-1/6">
                  <h1 class="text-lg text-gray-800 font-normal text-center">${cart.data.productPrice}</h1>
                </td>
                <td className="w-1/4 md:w-1/6">
                  <h1 class="text-lg text-gray-800 font-normal text-center">{cart.data.isStock==="true"?"In":"Out"}</h1>
                </td>
                <td className="w-1/4 md:w-1/6">
                  <Link to={`/seller/update-product/${cart._id}`}>
                    <h1 class="text-lg text-blue-500 font-normal text-center">Edit</h1>
                  </Link>
                </td>
                <td className='pl-8'>
                  <div  className="flex justify-center items-center h-12 w-12 rounded-full duration-200 hover:bg-red-500">
                    <TbTrashOff className="text-3xl text-center text-gray-800 hover:text-white " />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
 
    {/* Pagination controls */}
    <div className="flex justify-center mt-4">
      {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => (
        <button
          key={i}
          className={`mx-2 px-4 py-2 border rounded-md ${
            currentPage === i + 1 ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'
          }`}
          onClick={() => paginate(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  </div>
  </div>
  
  );
};

export default SellerProduct;
