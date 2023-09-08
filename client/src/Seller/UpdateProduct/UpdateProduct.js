import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import {MdMovieEdit} from 'react-icons/md'

const UpdateProduct = () => {
  const { handleSubmit, control } = useForm();
  const initialData = useLoaderData()

  // Function to handle form submission
  const onSubmit = async (data) => {
    console.log(data);
    try {
        console.log(data);
        // 'data' contains all the form values as an object
        const response = await fetch(
          `http://localhost:5000/update-product/${initialData._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({data}),
          }
        );
  
        if (response.ok) {
          alert("A product updated successfully");
        } else {
          console.error("Error:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
  };
  return (
    <div>
      <section className="p-1 md:p-6 bg-white border rounded-md text-gray-800 font-sans">
      <div className="flex justify-center border-b pb-2 mx-1 md:mx-10">
        <MdMovieEdit className='text-xl' />
     <h1 className="text-xl text-gray-800 font-bold pl-3">Update {initialData.data.productTitle}</h1>
     </div>
        <form
          novalidate=""
          action=""
          className="container flex flex-col mx-auto space-y-12  "
          onSubmit={handleSubmit(onSubmit)}
        >
          <fieldset className="grid grid-cols-4 gap-6 p-1 md:p-6 rounded-md shadow-sm w-full">
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-4 mx-0 lg:mx-5 p-2 md:p-8 border bg-white rounded-md">
              {/* product title */}
              <div className="col-span-full">
                <label htmlFor="productTitle" className="text-lg font-medium pb-2">
                  Product Title
                </label>
                <Controller
                rules={{ required: true }}
                  name="productTitle"
                  control={control}
                  defaultValue={initialData.data.productTitle} // Set initial value from useLoaderData
                  render={({ field }) => (
                    <input
                      {...field}
                      id="productTitle"
                      type="text"
                      className="w-full rounded-md border h-12 focus:ring focus:ri focus:ri outline-none border-gray-500 pl-3 bg-white text-gray-900"
                    />
                  )}
                />
              </div>
              {/* Product Description */}
              <div className="col-span-full">
                <label htmlFor="productDescription" className="text-lg font-medium pb-2">
                  Product Description
                </label>
                <Controller
                rules={{ required: true }}
                  name="productDescription"
                  control={control}
                  defaultValue={initialData.data.productDescription} 
                  render={({ field }) => (
                    <textarea
                      {...field}
                      id="productDescription"
                      type="text"
                      className="w-full rounded-md border h-16 focus:ring focus:ri focus:ri outline-none border-gray-500 pl-3 bg-white text-gray-900"
                      ></textarea>
                  )}
                />
              </div>
              {/* Image Link */}
              <div className="col-span-full">
                <label htmlFor="imageLink" className="text-lg font-medium pb-2">
                  Image Link
                </label>
                <Controller
                rules={{ required: true }}
                  name="imageLink"
                  control={control}
                  defaultValue={initialData.data.imageLink} 
                  render={({ field }) => (
                    <input
                      {...field}
                      id="imageLink"
                      type="text"
                      className="w-full rounded-md border h-12 focus:ring focus:ri focus:ri outline-none border-gray-500 pl-3 bg-white text-gray-900"
                    />
                  )}
                />
              </div>
              {/* Seller SKU */}
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="sku" className="text-lg font-medium pb-2">
                  Seller SKU
                </label>
                <Controller
                rules={{ required: true }}
                  name="sku"
                  control={control}
                   defaultValue={initialData.data.sku} 
                  render={({ field }) => (
                    <input
                      {...field}
                      id="sku"
                      type="text"
                      className="w-full rounded-md border h-12 focus:ring focus:ri focus:ri outline-none border-gray-500 pl-3 bg-white text-gray-900"
                    />
                  )}
                />
              </div>
              {/* color */}
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="color" className="text-lg font-medium">Color</label>
                <Controller
                  rules={{ required: true }}
                  name="color"
                  control={control}
                   defaultValue={initialData.data.color} 
                  render={({ field }) => (
                    <select
                      {...field}
                      id="color"
                      className="w-full rounded-md border h-12 focus:ring focus:ri focus:ri outline-none border-gray-500 pl-3 bg-white text-gray-900"
                    >
                      <option value="#f00">Red</option>
                      <option value="#008000">Green</option>
                      <option value="#0000FF">Blue</option>
                      <option value="#fff">White</option>
                      <option value="#000">Black</option>
                      <option value="#964B00">Brown</option>
                    </select>
                  )}
                />
              </div>
              {/* size */}
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="size" className="text-lg font-medium">Size</label>
                <Controller
                   rules={{ required: true }}
                   name="size"
                   control={control}
                   defaultValue={initialData.data.size} 
                   render={({ field }) => (
                    <select
                      {...field}
                      id="size"
                      className="w-full rounded-md border h-12 focus:ring focus:ri focus:ri outline-none border-gray-500 pl-3 bg-white text-gray-900"
                    >
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  )}
                />
              </div>
              {/* Category */}
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="category" className="text-lg font-medium">Category</label>
                <Controller
                rules={{ required: true }}
                  name="category"
                  control={control}
                  defaultValue={initialData.data.category} 
                  render={({ field }) => (
                    <select
                      {...field}
                      id="category"
                      className="w-full rounded-md border h-12 focus:ring focus:ri focus:ri outline-none border-gray-500 pl-3 bg-white text-gray-900"
                    >
                      <option value="men">Men</option>
                      <option value="women">Women</option>
                      <option value="kids">Kids</option>
                    </select>
                  )}
                />
              </div>
              {/* Subcategory */}
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="subCategory" className="text-lg font-medium">Sub Category</label>
                <Controller
                rules={{ required: true }}
                  name="subCategory"
                  control={control}
                  defaultValue={initialData.data.subCategory} 
                  render={({ field }) => (
                    <select
                      {...field}
                      id="subCategory"
                      className="w-full rounded-md border h-12 focus:ring focus:ri focus:ri outline-none border-gray-500 pl-3 bg-white text-gray-900"
                    >
                      <option value="cloth">Cloth</option>
                      <option value="shoe">Shoe</option>
                      <option value="bag">Bag</option>
                      <option value="ornament">Ornament</option>
                      <option value="watch">Watch</option>
                     
                    </select>
                  )}
                />
              </div>
              {/* Availability */}
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="available" className="text-lg font-medium">Available</label>
                <Controller
                rules={{ required: true }}
                  name="available"
                  control={control}
                  defaultValue={initialData.data.available} 
                  render={({ field }) => (
                    <select
                      {...field}
                      id="available"
                      className="w-full rounded-md border h-12 focus:ring focus:ri focus:ri outline-none border-gray-500 pl-3 bg-white text-gray-900"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  )}
                />
              </div>
              {/* price */}
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="productPrice" className="text-lg font-medium pb-2">
                  Price
                </label>
                <Controller
                rules={{ required: true }}
                  name="productPrice"
                  control={control}
                   defaultValue={initialData.data.productPrice} 
                  render={({ field }) => (
                    <input
                      {...field}
                      id="productPrice"
                      type="text"
                      placeholder=""
                      className="w-full rounded-md border h-12 focus:ring focus:ri focus:ri outline-none border-gray-500 pl-3 bg-white text-gray-900"
                    />
                  )}
                />
              </div>
              {/* Quantity */}
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="quantity" className="text-lg font-medium pb-2">
                  Quantity
                </label>
                <Controller
                rules={{ required: true }}
                  name="quantity"
                  control={control}
                   defaultValue={initialData.data.quantity} 
                  render={({ field }) => (
                    <input
                      {...field}
                      id="quantity"
                      type="text"
                      placeholder=""
                      className="w-full rounded-md border h-12 focus:ring focus:ri focus:ri outline-none border-gray-500 pl-3 bg-white text-gray-900"
                    />
                  )}
                />
              </div>
              {/* Stock Status */}
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="isStock">Stock Status</label>
                <Controller
                rules={{ required: true }}
                  name="isStock"
                  control={control}
                  defaultValue={initialData.data.isStock} 
                  render={({ field }) => (
                    <select
                      {...field}
                      id="isStock"
                      className="w-full rounded-md border h-12 focus:ring focus:ri focus:ri outline-none border-gray-500 pl-3 bg-white text-gray-900"
                    >
                      <option value="true">Stock In</option>
                      <option value="false">Stock out</option>
                    </select>
                  )}
                />
              </div>
              {/* package weight */}
              <div className="col-span-full">
                <label htmlFor="packageWeight" className="text-lg font-medium pb-2">
                  Package Weight
                </label>
                <Controller
                rules={{ required: true }}
                  name="packageWeight"
                  control={control}
                   defaultValue={initialData.data.packageWeight} 
                  render={({ field }) => (
                    <input
                      {...field}
                      id="packageWeight"
                      type="text"
                      placeholder=""
                      className="w-full rounded-md border h-12 focus:ring focus:ri focus:ri outline-none border-gray-500 pl-3 bg-white text-gray-900"
                    />
                  )}
                />
              </div>
              {/* Dimension */}
              <div className="col-span-full">
                <label htmlFor="dimension" className="text-lg font-medium pb-2">
                  Dimension
                </label>
                <Controller
                rules={{ required: true }}
                  name="dimension"
                  control={control}
                   defaultValue={initialData.data.dimension} 
                  render={({ field }) => (
                    <input
                      {...field}
                      id="dimension"
                      type="text"
                      placeholder=""
                      className="w-full rounded-md border h-12 focus:ring focus:ri focus:ri outline-none border-gray-500 pl-3 bg-white text-gray-900"
                    />
                  )}
                />
              </div>
              <button type="submit"  class="w-36 lg:w-60 h-12 px-6 font-medium text-lg tracking-wide text-white  rounded shadow-md bg-indigo-600 hover:bg-indigo-500 focus:shadow-outline focus:outline-none">
            Update
          </button>
            </div>
            
          </fieldset>
         
        </form>
      </section>
    </div>
  );
};

export default UpdateProduct;
