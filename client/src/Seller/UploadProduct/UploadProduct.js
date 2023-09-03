import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
const UploadProduct = () => {
  const { handleSubmit, control } = useForm();

  // Function to handle form submission
  const onSubmit = (data) => {
    console.log(data); // 'data' contains all the form values as an object
  };

  const [selectedCategory, setSelectedCategory] = useState("men");

  // Define subcategories for each category
  const subcategories = {
    men: ["shirt", "tshirt", "watch", "shoe"],
    women: ["bag", "shoe", "dress", "ornaments"],
    kids: ["dress", "kid shoe"],
  };

  // Function to handle category change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
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
                <label htmlFor="productTitle" className="text-sm">
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
                <label htmlFor="productDescription" className="text-sm">
                  Product Description
                </label>
                <Controller
                  name="productDescription"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      id="productDescription"
                      type="text"
                      className="w-full rounded-md border h-12 focus:ring focus:ri focus:ri outline-none border-gray-500 pl-3 bg-white text-gray-900"
                    />
                  )}
                />
              </div>
              {/* Image Link */}
              <div className="col-span-full">
                <label htmlFor="image" className="text-sm">
                  Image Link
                </label>
                <Controller
                  name="imageLink"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      id="image"
                      type="text"
                      className="w-full rounded-md border h-12 focus:ring focus:ri focus:ri outline-none border-gray-500 pl-3 bg-white text-gray-900"
                    />
                  )}
                />
              </div>
              {/* Seller SKU */}
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="sku" className="text-sm">
                  Seller SKU
                </label>
                <Controller
                  name="sellerSKU"
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
                // Set default value here if needed
                  render={({ field }) => (
                    <select
                      {...field}
                      id="category"
                      defaultValue="men"
                      onChange={handleCategoryChange}
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
                <label htmlFor="subcategory">Subcategory</label>
                <Controller
                  name="subcategory"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <select
                      {...field}
                      id="subcategory"
                      className="w-full rounded-md capitalize border h-12 focus:ring focus:ri focus:ri outline-none border-gray-500 pl-3 bg-white text-gray-900"
                    >
                      {subcategories[selectedCategory].map((subcategory) => (
                        <option key={subcategory} value={subcategory}>
                          {subcategory}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>
              {/* Availability */}
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="availability">Available</label>
                <Controller
                  name="availability"
                  control={control}
                  defaultValue="true"
                  render={({ field }) => (
                    <select
                      {...field}
                      id="availability"
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
                <label htmlFor="price" className="text-sm">
                  Price
                </label>
                <Controller
                  name="price"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      id="price"
                      type="text"
                      placeholder=""
                      className="w-full rounded-md border h-12 focus:ring focus:ri focus:ri outline-none border-gray-500 pl-3 bg-white text-gray-900"
                    />
                  )}
                />
              </div>
              {/* Quantity */}
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="quantity" className="text-sm">
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
                <label htmlFor="stock">Stock Status</label>
                <Controller
                  name="stockStatus"
                  control={control}
                  defaultValue="true"
                  render={({ field }) => (
                    <select
                      {...field}
                      id="stock"
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
                <label htmlFor="weight" className="text-sm">
                  Package Weight
                </label>
                <Controller
                  name="packageWeight"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      id="weight"
                      type="text"
                      placeholder=""
                      className="w-full rounded-md border h-12 focus:ring focus:ri focus:ri outline-none border-gray-500 pl-3 bg-white text-gray-900"
                    />
                  )}
                />
              </div>
              {/* Dimension */}
              <div className="col-span-full">
                <label htmlFor="dimension" className="text-sm">
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
            </div>
           
          </fieldset>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        
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
//                 <label for="title" className="text-sm">
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
//                   <option value="audi">XL</option>
//                 </select>
//               </div>
//               {/* category */}
//               <div className="col-span-full sm:col-span-2">
//                 <label htmlFor="category">Category</label>
//                 <select
//                   name="category"
//                   id="category"
//                   className="w-full rounded-md border h-12  focus:ring dark:border-gray-700 dark:text-gray-900"
//                   onChange={handleCategoryChange}
//                   value={selectedCategory}
//                 >
//                   <option value="men">Men</option>
//                   <option value="women">Women</option>
//                   <option value="kids">Kids</option>
//                 </select>
//               </div>
//               {/* subcategory */}
//               <div className="col-span-full sm:col-span-2">
//                 <label htmlFor="subcategory">Subcategory</label>
//                 <select
//                   name="subcategory"
//                   id="subcategory"
//                   className="w-full rounded-md border h-12  focus:ring dark:border-gray-700 dark:text-gray-900"
//                 >
//                   {subcategories[selectedCategory].map((subcategory) => (
//                     <option key={subcategory} value={subcategory}>
//                       {subcategory}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               {/* available */}
//               <div className="col-span-full sm:col-span-2">
//                 <label for="availavle">Available</label>

//                 <select

//                   id="availavle"
//                   className="w-full rounded-md border h-12 focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
//                 >
//                   <option value="true">Yes</option>
//                   <option value="false">No</option>
//                 </select>
//               </div>
//               {/* price */}
//               <div className="col-span-full sm:col-span-2">
//                 <label for="price" className="text-sm">
//                   Price
//                 </label>
//                 <input
//                   id="price"
//                   type="text"
//                   placeholder=""
//                   className="w-full rounded-md border h-12 focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
//                 />
//               </div>
//               {/* quantity */}
//               <div className="col-span-full sm:col-span-2">
//                 <label for="quantity" className="text-sm">
//                   Quantity
//                 </label>
//                 <input
//                   id="quantity"
//                   type="text"
//                   placeholder=""
//                   className="w-full rounded-md border h-12 focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
//                 />
//               </div>
//               {/* in stock */}
//               <div className="col-span-full sm:col-span-2">
//                 <label for="stock">Stock Status</label>

//                 <select

//                   id="stock"
//                   className="w-full rounded-md border h-12 focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
//                 >
//                   <option value="true">Stock In</option>

