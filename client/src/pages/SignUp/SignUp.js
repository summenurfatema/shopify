import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/UserContext/UserContext";
import { toast } from "react-hot-toast";
import { GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {

  //getting props from user context
  const { createUserByEmailAndPass, updateUser, signInByGoogle } = useContext(AuthContext);
  
  // navigator/ route
  const navigate = useNavigate();

  //storing form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Buyer",
  });

  //storing data after change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //sign up by email and password
  const handleSignupByEmail = (e) => {
    e.preventDefault();
    createUserByEmailAndPass(formData.email, formData.password)
      .then((result) => {
        const user = result.user;
        const userInfo = {
          displayName: formData.name,
          email: formData.email,
        };
        updateUser(userInfo)
          .then(() => {
            navigate("/signin");
          })
          .catch((error) => console.error(error));
        toast.success("Account created successfully !!");
      })
      .catch((err) => console.error(err));

    //posting user info to backend
    fetch("https://shopify-snqy.onrender.com/api/v1/post-users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ formData }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
         console.log(data.error);
        } else {
          // Handle the success response here if needed
          toast.success("User created successfully !!!");
        }
      });
  };

  //sign in by google account
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInByGoogle(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user.email);

        const formData = {
          email: user.email,
          role: "Buyer",
        };

        fetch("https://shopify-snqy.onrender.com/api/v1/post-users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ formData }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              console.error(data.error);
              navigate("/");
            } else {
              toast.success("Login successful");
              navigate("/");
            }
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };
  return (
    <>
      <div className="flex justify-center items-center font-sans py-10  bg-gray-200">
        <div className="w-full max-w-md p-4 border rounded-md shadow-md sm:p-8 bg-white text-gray-800">
          <h2 className="mb-3 text-3xl font-semibold text-center">
            Login to your account
          </h2>
          <p className="text-lg text-center text-gray-800">
           Already have an account?{" "}
            <Link className="hover:text-blue-500 cursor-pointer" to="/signin">
              Sign in here
            </Link>
          </p>
          <div className="my-6 space-y-4">
            <button
              onClick={handleGoogleSignIn}
              aria-label="Login with Google"
              type="button"
              className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ri focus:ri focus:ri  hover:bg-gray-100 duration-150"
            >
              <FcGoogle className='text-2xl'/>
              <p className="text-lg text-center text-gray-800 font-semibold">
                Login with Google
              </p>
            </button>
          </div>
          <div className="flex items-center w-full my-4">
            <hr className="w-full text-gray-700" />
            <p className="px-3 text-gray-700">OR</p>
            <hr className="w-full text-gray-700" />
          </div>
          <form onSubmit={handleSignupByEmail} className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm">
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 bg-white text-gray-800 outline-none"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 bg-white text-gray-800 outline-none"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="outline-none w-full px-3 py-2 border rounded-md dark:border-gray-700 bg-white text-gray-800"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-gray-800">Set your role</span>
              </label>
              <select
                name="role"
                className="select select-bordered select-md w-full  border border-black bg-white text-gray-800  h-12 outline-none rounded-md"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="Buyer">Buyer</option>
                <option value="Seller">Seller</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full px-8 py-3 font-semibold rounded-md bg-indigo-700 text-white"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
      
    </>
  );
};

export default SignUp;
