import HomePage from "../HomePage/HomePage";
import CurrentOrder from "../Seller/CurrentOrder/CurrentOrder";
import SellerProduct from "../Seller/SellerProduct/SellerProduct";
import UpdateProduct from "../Seller/UpdateProduct/UpdateProduct";
import UploadProduct from "../Seller/UploadProduct/UploadProduct";
import Main from "../layout/Main";
import SellerLayout from "../layout/SellerLayout";
import Cart from "../pages/Cart/Cart";
import Login from "../pages/Login/Login";
import MyCart from "../pages/MyCart.js/MyCart";
import MyOrder from "../pages/MyOrder/MyOrder";
import ProductCard from "../pages/ProductSection/AllProduct/ProductCard";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/product-details/:id",
        element: <ProductCard />,
        loader: ({ params }) =>
          fetch(
            `https://shopify-snqy.onrender.com/api/v1/get-product-details-by/${params.id}`
          ).then((res) => res.json()),
      },
      {
        path: "/my-cart",
        element: (
          <PrivateRoute>
            <MyCart />
          </PrivateRoute>
        ),
      },

      {
        path: "/my-order/:email",
        element:    <PrivateRoute><MyOrder /></PrivateRoute> ,
        loader: ({ params }) =>
          fetch(
            `https://shopify-snqy.onrender.com/api/v1/get-my-order/${params.email}`
          ),
      },
    ],
  },

  {
    path: "/signin",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },

  {
    path: "/seller",
    element: <SellerLayout />,
    children: [
      {
        path: "/seller",
        element: (
          <PrivateRoute>
            <SellerProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/seller/upload-product",
        element: (
          <PrivateRoute>
            <UploadProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/seller/current-order",
        element: (
          <PrivateRoute>
            <CurrentOrder />
          </PrivateRoute>
        ),
      },
      {
        path: "/seller/update-product/:id",
        element: (
          <PrivateRoute>
            {" "}
            <UpdateProduct />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://shopify-snqy.onrender.com/api/v1/get-product-details-by/${params.id}`
          ).then((res) => res.json()),
      },
    ],
  },
]);
