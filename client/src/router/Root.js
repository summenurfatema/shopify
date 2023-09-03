import HomePage from "../HomePage/HomePage";
import UploadProduct from "../Seller/UploadProduct/UploadProduct";
import Main from "../layout/Main";
import Cart from "../pages/Cart/Cart";
import ProductCard from "../pages/ProductSection/AllProduct/ProductCard";
const { createBrowserRouter } = require("react-router-dom");


export const router = createBrowserRouter([
    {
   
        path: '/',
        element: <Main></Main>,
        children: [

   {
    path: '/',
    element: <HomePage/> 
   } ,
   {
    path: '/data/:id',
    element: <ProductCard />,
    loader: ({ params }) => fetch(`http://localhost:5000/get-data-by/${params.id}`).then((res) => res.json())
  },
  {
    
        path: '/my-cart',
        element: <Cart />
    
  },
  {
    path:'/upload-product',
    element:<UploadProduct/>
  }


]}

])