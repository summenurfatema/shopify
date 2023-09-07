import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


const HeroSlider = () => {
    const services = [
      {
        title: "Clothing Emporium",
        description:
          "Discover a World of Fashion at Our Exclusive Clothing Emporium",
        image:
          "https://img.freepik.com/free-photo/beautiful-smiling-young-blonde-woman-pointing-sunglasses-holding-shopping-bags-credit-card-pink-wall_496169-1506.jpg?size=626&ext=jpg&ga=GA1.2.1540219272.1675657721&semt=sph",
      },
        {
          title: "Customized Travel Packages",
          description:
            "Your Ultimate Destination for Premium Clothing and Exquisite Bags",
          image:
            "https://images.pexels.com/photos/1058959/pexels-photo-1058959.jpeg?auto=compress&cs=tinysrgb&w=1600",
        },
        {
          title: "Clothing Emporium",
          description:
            "Discover a World of Fashion at Our Exclusive Clothing Emporium",
          image:
            "https://img.freepik.com/free-photo/closeup-shot-cool-looking-afro-american-girl-posing-with-some-shopping-bags_181624-45777.jpg?w=740&t=st=1693751021~exp=1693751621~hmac=8e15168e0c019a059e411746030a76394cc9118e41c82260c00d6b076824272a",
        },
        ]
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}

    >
      {services.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="w-full h-[600px] relative z-10">
            <img
              src={slide.image}
              alt="slider"
            
              className="object-cover h-full w-full"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
              <h2 className="text-3xl font-semibold">{slide.title}</h2>
              <p className="text-lg mt-2">{slide.description}</p>
              <button className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-blue-600">
                SHOP NOW
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
