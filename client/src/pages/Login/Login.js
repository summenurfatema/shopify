import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext/UserContext';
import { toast } from 'react-hot-toast';
import { GoogleAuthProvider } from 'firebase/auth';
import {FcGoogle} from 'react-icons/fc'

const Login = () => {
    const { signIn,google,userRole} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';
  

    const [newFormData, setNewFormData] = useState({
        email: '',
        password: '',

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewFormData({ ...newFormData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
      
        console.log(newFormData);
        signIn(newFormData.email, newFormData.password)
          .then(result => {
            const user = result.user;
            console.log(user);
            toast.success('Login successful');
              navigate(from, { replace: true });
        
          })
          .catch(error => console.error(error));
      };

    const googleProvider = new GoogleAuthProvider()

    const handleGoogleSignIn = () => {
google(googleProvider)
    .then((result) => {
      const user = result.user;
      console.log(user.email);

      const formData = {
        email: user.email,
        role: 'Buyer',
      };

      fetch('http://localhost:5000/post-users', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({formData}),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.error(data.error);
            navigate('/')
          } else {
            console.log('Login successful');
            navigate('/')
          }
        })
       .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
};
    return (
        <div className='flex justify-center items-center font-sans pt-10 bg-gray-200 h-screen'> 
            <div className="w-full max-w-md p-4 border rounded-md shadow-md sm:p-8 bg-white text-gray-800">
                <h2 className="mb-3 text-3xl font-semibold text-center">Login to your account</h2>
                <p className="text-lg text-center text-gray-800">
                    Don't have an account? <Link className='hover:text-blue-500 cursor-pointer' to="/signup">Sign up here</Link>
                </p>
                <div className="my-6 space-y-4">
                    <button onClick={handleGoogleSignIn}
                        aria-label="Login with Google"
                        type="button"
                        className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ri focus:ri  focus:ri hover:bg-gray-100 duration-150"
                    >
                        <FcGoogle className='text-2xl'/>
                        <p className="text-lg text-center text-gray-800 font-semibold">Login with Google</p>
                    </button>
                </div>
                <div className="flex items-center w-full my-4">
                    <hr className="w-full text-gray-700" />
                    <p className="px-3 text-gray-700">OR</p>
                    <hr className="w-full text-gray-700" />
                </div>
                <form noValidate="" onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm">
                                Email address
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                
                                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 bg-white text-gray-800 outline-none"
                                value={newFormData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label htmlFor="password" className="text-sm">
                                    Password
                                </label>
                                <a
                                    rel="noopener noreferrer"
                                    href="/"
                                    className="text-xs hover:underline dark:text-gray-400"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <input
                                type="password"
                                name="password"
                                id="password"
                               
                                className="outline-none w-full px-3 py-2 border rounded-md dark:border-gray-700 bg-white text-gray-800"
                                value={newFormData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-8 py-3 font-semibold rounded-md bg-indigo-700 text-white"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
