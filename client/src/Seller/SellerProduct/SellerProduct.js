
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TbTrashOff } from 'react-icons/tb';
import toast from 'react-hot-toast';

const SellerProduct = () => {

  // state of products
  const [products, setProducts] = useState([]);

 //state of current page for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    fetch("https://shopify-snqy.onrender.com/api/v1/get-all-product")
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

 // Delete product
 const handleProductDelete = (product) => {
  const agree = window.confirm("Are you ready to delete this product?");
  if (agree) {
    fetch(`https://shopify-snqy.onrender.com/api/v1/delete-product/${product._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success(" This product has been deleted successfully !");
          window.location.reload();
        }
      });
  }
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
          {currentProducts.map((product, index) => {
            return (
              <tr key={product.productId} className="">
                <td className='flex justify-center items-center'>
                  <img
                    src={product.data.imageLink}
                    className="h-14 w-12 lg:h-24 lg:w-24 object-cover rounded-lg p-2"
                    alt="productItem"
                  />
                </td>
                <td className="w-1/4 md:w-1/6">
                  <h1 class="text-lg text-gray-800 font-normal text-center">{product.data.productTitle}</h1>
                </td>
                <td className="w-1/4 md:w-1/6">
                  <h1 class="text-lg text-gray-800 font-normal text-center capitalize">{product.data.category}</h1>
                </td>
                <td className="w-1/4 md:w-1/6">
                  <h1 class="text-lg text-gray-800 font-normal text-center">₹ {product.data.productPrice}</h1>
                </td>
                <td className="w-1/4 md:w-1/6">
                  <h1 class="text-lg text-gray-800 font-normal text-center">{product.data.isStock==="true"?"In":"Out"}</h1>
                </td>
                <td className="w-1/4 md:w-1/6">
                  <Link to={`/seller/update-product/${product._id}`}>
                    <h1 class="text-lg text-blue-500 font-normal text-center">Edit</h1>
                  </Link>
                </td>
                <td className='pl-8'>
                  <div onClick={()=>handleProductDelete(product)}  className="flex justify-center items-center h-12 w-12 rounded-full duration-200 hover:bg-red-500">
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
