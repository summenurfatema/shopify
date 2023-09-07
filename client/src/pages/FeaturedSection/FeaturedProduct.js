import React from 'react';

const FeaturedProduct = () => {
    return (
        <section className='bg-white font-sans'>
            
      
  <div className="px-4 py-8  md:px-10 2xl:px-14 3xl:px-20 sm:py-12 sm:px-6 lg:px-8">
  <h1 className="text-2xl xl:text-4xl text-center lg:text-start text-black font-semibold py-14">Featured Products</h1>
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
      <div className="grid p-6 bg-gray-100 rounded place-content-center sm:p-8">
        <div className="max-w-md mx-auto text-center lg:text-left">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Watches</h2>

            <p className="mt-4 text-gray-500">
            Explore our handpicked collection of the season's hottest styles. From elegant watches to trendy accessories, find everything you need to stay fashion-forward.
            </p>
          </header>

        
        </div>
      </div>

      <div className="lg:col-span-2 lg:py-8 3xl:pl-20">
        <ul className="grid grid-cols-2 gap-4 3xl:gap-10">
          <li>
            
              <img
                src="https://img.freepik.com/premium-vector/realistic-watch-clock-chronograph-grey-orange-rubber-strap-dial-men-fashion-white-background-vector_33869-2564.jpg?size=626&ext=jpg&ga=GA1.1.1540219272.1675657721&semt=sph"
                alt="Watch"
                className="object-cover w-full rounded aspect-square"
              />

              <div className="mt-3">
                <h3
                  className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4"
                >
                  Smart Watch
                </h3>

                <p className="mt-1 text-sm text-gray-700">₹1400</p>
              </div>
            
          </li>

          <li>
           
              <img
                src="https://img.freepik.com/free-vector/smartwatch-front-side_23-2147498802.jpg?size=626&ext=jpg&ga=GA1.2.1540219272.1675657721&semt=sph"
                alt=""
                className="object-cover w-full rounded aspect-square"
              />

              <div className="mt-3">
                <h3
                  className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4"
                >
                  Smart Watch
                </h3>

                <p className="mt-1 text-sm text-gray-700">₹1500</p>
              </div>
         
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>
    );
};

export default FeaturedProduct;
