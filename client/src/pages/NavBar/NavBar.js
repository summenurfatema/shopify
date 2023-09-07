import { useContext, useState } from "react";
import { AuthContext } from "../../context/UserContext/UserContext";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut, userRole } = useContext(AuthContext);
  console.log(userRole);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut().then(() => {
      navigate("/login");
    });
  };


  return (
    <div class="bg-white font-sans z-50">
      <div class="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div class="relative flex items-center justify-between">
          <div class="flex items-center">
            <a
              href="/"
              class="inline-flex items-center mr-8"
            >
              <span class="ml-2 text-3xl font-bold tracking-wide text-gray-800 capitalize">
                Shopify
              </span>
            </a>
          </div>
          <ul class="flex items-center hidden space-x-8 lg:flex">
            {userRole === "Buyer" ? (
              <>
                <li>
                  <a
                    href={`/my-order/${user?.email}`}
                    class="font-medium text-lg tracking-wide text-gray-800 transition-colors duration-200 hover:text-teal-accent-400"
                  >
                    My order
                  </a>
                </li>

                <li>
                  <a
                    href="/my-cart"
                    class="font-medium text-lg tracking-wide text-gray-800 transition-colors duration-200 hover:text-teal-accent-400"
                  >
                    My Cart
                  </a>
                </li>
                <li>
                  {user ? (
                    <button
                      onClick={() => logOut()}
                      class="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-700 hover:bg-purple-600 focus:shadow-outline focus:outline-none"
                    >
                      Logout
                    </button>
                  ) : (
                    <a
                      href="/login"
                      class="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-700 hover:bg-purple-600 focus:shadow-outline focus:outline-none"
                    >
                      Sign in
                    </a>
                  )}
                </li>

                <li>
                  {
                    user?
                    <img title={user?.displayName} className="h-12 w-12 rounded-full" src='https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?size=626&ext=jpg&ga=GA1.2.1540219272.1675657721&semt=ais' alt={user?.displayName}/>
                    :
                    <FaUserCircle
                    className="text-3xl text-gray-800"
                    title={user?.displayName}
                  />
                  }
                  
                </li>
              </>
            ) : (
              <li>
                <Link to="/seller">
                  <button class="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-700 hover:bg-purple-600 focus:shadow-outline focus:outline-none">
                    Dashboard
                  </button>
                </Link>
              </li>
            )}
          </ul>
          <div class="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              class="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div class="absolute top-0 left-0 w-full z-50">
                <div class="p-5 bg-white border rounded shadow-sm">
                  <div class="flex items-center justify-between mb-4">
                    <div>
                      <a
                        href="/"
                        class="inline-flex items-center"
                      >
                        <span class="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                          Shopify
                        </span>
                      </a>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        class="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul class="space-y-4">
                    { user&&
                        <li>
              <img className="h-12 w-12 rounded-full" src='https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?size=626&ext=jpg&ga=GA1.2.1540219272.1675657721&semt=ais' alt={user?.displayName}/>
              <p className="pt-2 font-medium text-sm tracking-wide text-gray-800">Welcome {user?.displayName}</p>

               
                </li>
                 }
                      {
                        userRole === "Buyer" ?
                        <>
                         
                        <li>
                  <a
                    href={`/my-order/${user?.email}`}
                    class="font-medium text-lg tracking-wide text-gray-800"
                  >
                    My order
                  </a>
                </li>

                <li>
                  <a
                    href="/my-cart"
                    class="font-medium text-lg tracking-wide text-gray-800"
                  >
                    My Cart
                  </a>
                </li>
                <li className="w-32 md:w-64 lg:w-full">
                  {user ? (
                    <button
                      onClick={handleLogOut}
                      class="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-700 hover:bg-purple-600 focus:shadow-outline focus:outline-none"
                    >
                      Logout
                    </button>
                  ) : (
                    <a
                      href="/login"
                      class="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-700 hover:bg-purple-600 focus:shadow-outline focus:outline-none"
                    >
                      Sign in
                    </a>
                  )}
                </li>
                        </>

                        :
                        <>
                        <li>
                  <a
                    href='/seller'
                    class="font-medium text-lg tracking-wide text-gray-800"
                  >
                   My Products
                  </a>
                </li>

                <li>
                  <a
                    href="/seller/upload-product"
                    class="font-medium text-lg tracking-wide text-gray-800"
                  >
                   Upload a product
                  </a>
                </li>
                        </>
                      }
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
