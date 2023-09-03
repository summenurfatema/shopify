import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
const UploadProduct = () => {
  const { handleSubmit, control } = useForm();

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      console.log(data);
      // 'data' contains all the form values as an object
      const response = await fetch(
        `http://localhost:5000/upload-product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({data}),
        }
      );

      if (response.ok) {
        alert("A product added successfully");
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  
  return (
    <div>
      <section className="p-6 bg-gray-100 text-gray-800">
     
        <form
          novalidate=""
          action=""
          className="container flex flex-col mx-auto space-y-12  "
          onSubmit={handleSubmit(onSubmit)}
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm w-full">
         
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-4 mx-60 p-8 border bg-white rounded-md">
              {/* product title */}
              <div className="col-span-full">
                <label htmlFor="productTitle" className="text-lg font-medium">
                  Product Title
                </label>
                <Controller
                  name="productTitle"
                  control={control}
                  defaultValue=""
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
                <label htmlFor="productDescription" className="text-lg font-medium">
                  Product Description
                </label>
                <Controller
                  name="productDescription"
                  control={control}
                  defaultValue=""
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
                <label htmlFor="imageLink" className="text-lg font-medium">
                  Image Link
                </label>
                <Controller
                  name="imageLink"
                  control={control}
                  defaultValue=""
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
                <label htmlFor="sku" className="text-lg font-medium">
                  Seller SKU
                </label>
                <Controller
                  name="sku"
                  control={control}
                  defaultValue=""
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
                <label htmlFor="color">Color</label>
                <Controller
                  name="color"
                  control={control}
                  defaultValue=""
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
                <label htmlFor="size">Size</label>
                <Controller
                  name="size"
                  control={control}
                  defaultValue=""
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
                <label htmlFor="category">Category</label>
                <Controller
                  name="category"
                  control={control}
                  defaultValue="men"// Set default value here if needed
                 
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
                <label htmlFor="subCategory">Subcategory</label>
                <Controller
                  name="subCategory"
                  control={control}
                  defaultValue="cloth"
                  render={({ field }) => (
                    <select
                      {...field}
                      id="subCategory"
                      className="w-full rounded-md capitalize border h-12 focus:ring focus:ri focus:ri outline-none border-gray-500 pl-3 bg-white text-gray-900"
                    >
                       <option value="cloth">Cloth</option>
                      <option value="shoe">Shoe</option>
                      <option value="ornaments">Ornaments</option>
                      <option value="bag">Bag</option>
                      <option value="watch">Watch</option>
                      
                    </select>
                  )}
                />
              </div>
              {/* Availability */}
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="available">Available</label>
                <Controller
                  name="available"
                  control={control}
                  defaultValue="true"
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
                <label htmlFor="productPrice" className="text-lg font-medium">
                  Price
                </label>
                <Controller
                  name="productPrice"
                  control={control}
                  defaultValue=""
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
                <label htmlFor="quantity" className="text-lg font-medium">
                  Quantity
                </label>
                <Controller
                  name="quantity"
                  control={control}
                  defaultValue=""
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
                  name="isStock"
                  control={control}
                  defaultValue="true"
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
                <label htmlFor="packageWeight" className="text-lg font-medium">
                  Package Weight
                </label>
                <Controller
                  name="packageWeight"
                  control={control}
                  defaultValue=""
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
                <label htmlFor="dimension" className="text-lg font-medium">
                  Dimension
                </label>
                <Controller
                  name="dimension"
                  control={control}
                  defaultValue=""
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
              <button type="submit"  class="inline-flex items-center justify-center h-12 px-6 font-medium text-lg tracking-wide text-white  rounded shadow-md bg-indigo-600 hover:bg-indigo-500 focus:shadow-outline focus:outline-none">
            Upload
          </button>
            </div>
           
          </fieldset>
   
        
        </form>
        
      </section>
    </div>
  );
};

export default UploadProduct;
// import React, { useState } from "react";

// const UploadProduct = () => {
//   const [formData, setFormData] = useState({
//     productTitle: "",
//     productDescription: "",
//     imageLink: "",
//     sellerSKU: "",
//     color: "Red",
//     size: "S",
//     category: "men",
//     subcategory: "shirt",
//     available: "Yes",
//     price: "",
//     quantity: "",
//     stockStatus: "Stock In",
//     packageWeight: "",
//     dimension: "",
//   });
//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Now 'formData' contains all the form values as an object.
//     console.log(formData);
//   };

//   const [selectedCategory, setSelectedCategory] = useState("men");

//   // Define subcategories for each category
//   const subcategories = {
//     men: ["shirt", "tshirt", "watch", "shoe"],
//     women: ["bag", "shoe", "dress", "ornaments"],
//     kids: ["dress", "kid shoe"],
//   };

//   // Function to handle category change
//   const handleCategoryChange = (event) => {
//     setSelectedCategory(event.target.value);
//   };
//   return (
//     <div>
//       <section className="p-6 bg-white text-gray-800">
//         <form
//           novalidate=""
//           action=""
//           className="container flex flex-col mx-auto space-y-12"
//           onSubmit={handleSubmit}
//         >
//           <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-white">
//             <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
//               {/* product title */}
//               <div className="col-span-full">
//                 <label for="title" className="text-lg font-medium">
//                   Product Title
//                 </label>
//                 <input
//                   id="title"
//                   type="text"

//                   className="w-full rounded-md border h-12 focus:ring focus:ri focus:ri outline-none border-gray-500 pl-3 bg-white text-gray-900"
//                 />
//               </div>
//               {/* product Description*/}
//               <div className="col-span-full">
//                 <label for="description" className="text-sm">
//                   Product Description
//                 </label>
//                 <input
//                   id="description"
//                   type="text"

//                   className="w-full rounded-md border h-12 focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
//                 />
//               </div>
//               {/* Image Link */}
//               <div className="col-span-full">
//                 <label for="image" className="text-sm">
//                   Image Link
//                 </label>
//                 <input
//                   id="image"
//                   type="text"

//                   className="w-full rounded-md border h-12 focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
//                 />
//               </div>
//               {/* Seller SKU*/}
//               <div className="col-span-full sm:col-span-2">
//                 <label for="sku" className="text-sm">
//                   Seller SKU
//                 </label>
//                 <input
//                   id="sku"
//                   type="text"

//                   className="w-full rounded-md border h-12 focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
//                 />
//               </div>
//               {/* color */}
//               <div className="col-span-full sm:col-span-2">
//                 <label for="color">Color</label>

//                 <select

//                   id="color"
//                   className="w-full rounded-md border h-12 focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
//                 >
//                   <option value="#f00">Red</option>
//                   <option value="#008000">Green</option>
//                   <option value="#0000FF">Blue</option>
//                   <option value="#fff">white</option>
//                   <option value="#000">Black</option>
//                 </select>
//               </div>
//               {/* size */}
//               <div className="col-span-full sm:col-span-2">
//                 <label for="cars">Size</label>

//                 <select

//                   id="cars"
//                   className="w-full rounded-md border h-12 focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
//                 >
//                   <option value="volvo">S</option>
//                   <option value="saab">M</option>
//                   <option value="mercedes">L</option>
