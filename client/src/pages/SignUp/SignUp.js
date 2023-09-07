import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/UserContext/UserContext";
import { toast } from "react-hot-toast";
import { GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  const { createUser, updateUser, google } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Buyer", // Set the default role to 'Buyer'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignupByEmail = (e) => {
    e.preventDefault();
    // Here, formData contains the object with form data
    console.log(formData);
    createUser(formData.email, formData.password)
      .then((result) => {
        const user = result.user;
        const userInfo = {
          displayName: formData.name,
          email: formData.email,
        };
        updateUser(userInfo)
          .then(() => {
            navigate("/login");
          })
          .catch((error) => console.error(error));
        toast.success("Account created successfully !!");
      })
      .catch((err) => console.error(err));

    fetch("http://localhost:5000/post-users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ formData }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          // Display the error message in an alert
          toast.error(data.error);
        } else {
          // Handle the success response here if needed
          alert("User created successfully");
        }
      });
  };
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    google(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user.email);

        const formData = {
          email: user.email,
          role: "Buyer",
        };

        fetch("http://localhost:5000/post-users", {
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
      {/* <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSignupByEmail}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                required
                                type="text"
                                name="name"
                                placeholder="Name"
                                className="input input-bordered"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                required
                                type="text"
                                name="email"
                                placeholder="Email"
                                className="input input-bordered"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                required
                                type="password"
                                name="password"
                                placeholder="**********"
                                className="input input-bordered"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Set your role</span>
                            </label>
                            <select
                                name="role"
                                className="select select-bordered select-md w-full max-w-xs"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="Buyer">Buyer</option>
                                <option value="Seller">Seller</option>
                            </select>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn w-full bg-cyan-600">
                                Sign Up
                            </button>
                        </div>
                        <p>
                            Already have an account? <Link to="/login">Login here !!</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div> */}
      {/* ... */}
      <div className="flex justify-center items-center font-sans pt-10  bg-gray-200 h-screen">
        <div className="w-full max-w-md p-4 border rounded-md shadow-md sm:p-8 bg-white text-gray-800">
          <h2 className="mb-3 text-3xl font-semibold text-center">
            Login to your account
          </h2>
          <p className="text-lg text-center text-gray-800">
            Don't have an account?{" "}
            <Link className="hover:text-blue-500 cursor-pointer" to="/signup">
              Sign up here
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
                <span className="label-text">Set your role</span>
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
      );
    </>
  );
};

export default SignUp;
