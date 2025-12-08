import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Banner.css";

const Banner = () => {
  const slide1 = "https://i.ibb.co.com/WvDBY11z/slider-image1.webp";
  const slide2 =
    "https://i.ibb.co.com/Z1tzg3X5/ernest-hemingway-kurt-hutton.jpg";
  const slide3 =
    "https://img.freepik.com/free-photo/young-attractive-smiling-male-student-joyfully-looking-camera-while-studying-library-university_574295-1561.jpg?semt=ais_incoming&w=740&q=80";
  return (
    <div className="banner-container ">
      <Swiper
        direction="vertical"
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {/* 1st slide  */}
        <SwiperSlide>
          <div
            className="w-full h-screen flex flex-col md:flex-row items-center justify-center
                      bg-gradient-to-br from-blue-100 to-teal-100"
          >
            {/* Left Side: Text */}
            <div className="md:w-1/2 flex flex-col justify-center items-start md:ml-20">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                <span className="font-extralight">Always Push Yourself to</span>{" "}
                <br /> The Next Level
              </h1>
              <p className="text-sm max-w-md opacity-90 mt-2">
                You've always been beautiful. Now you are just deciding to be
                healthier, fitter, faster and stronger.
              </p>
              <p className="text-xl md:text-2xl text-primary font-light opacity-80 mt-6">
                Mr.Fahim
              </p>
              <button
                className="bg-primary px-8 py-3 rounded-lg shadow-lg hover:bg-secondary
                             hover:shadow-xl hover:scale-105 transform transition duration-300 mt-3"
              >
                Get Free Session
              </button>
            </div>

            {/* Right Side: Image */}
            <div className="md:w-1/2  mt-8 md:mt-0 flex justify-end">
              <img
                src={slide1}
                alt="Banner Person"
                className="w-full h-[590px] max-w-lg object-contain"
              />
            </div>
          </div>
        </SwiperSlide>

        {/* 2nd slide  */}
        <SwiperSlide>
          <div
            className="w-full h-screen flex flex-col md:flex-row items-center justify-center
                      bg-gradient-to-br from-blue-100 to-teal-100"
          >
            {/* Left Side: Text */}
            <div className="md:w-1/2 flex flex-col justify-center items-start md:ml-20">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                <span className="font-extralight">Always Push Yourself to</span>{" "}
                <br /> The Next Level
              </h1>
              <p className="text-sm max-w-md opacity-90 mt-2">
                You've always been beautiful. Now you are just deciding to be
                healthier, fitter, faster and stronger.
              </p>
              <p className="text-xl md:text-2xl text-primary font-light opacity-80 mt-6">
                Mr.Fahim
              </p>
              <button
                className="bg-primary px-8 py-3 rounded-lg shadow-lg hover:bg-secondary
                             hover:shadow-xl hover:scale-105 transform transition duration-300 mt-3"
              >
                Get Free Session
              </button>
            </div>

            {/* Right Side: Image */}
            <div className="md:w-1/2  mt-8 md:mt-0 flex justify-end">
              <img
                src={slide2}
                alt="Banner Person"
                className="w-full h-[590px] max-w-lg object-contain"
              />
            </div>
          </div>
        </SwiperSlide>

        {/* 3rd slide  */}
        <SwiperSlide>
          <div
            className="w-full h-screen flex flex-col md:flex-row items-center justify-center
                      bg-gradient-to-br from-blue-100 to-teal-100"
          >
            {/* Left Side: Text */}
            <div className="md:w-1/2 flex flex-col justify-center items-start md:ml-20">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                <span className="font-extralight">Always Push Yourself to</span>{" "}
                <br /> The Next Level
              </h1>
              <p className="text-sm max-w-md opacity-90 mt-2">
                You've always been beautiful. Now you are just deciding to be
                healthier, fitter, faster and stronger.
              </p>
              <p className="text-xl md:text-2xl text-primary font-light opacity-80 mt-6">
                Mr.Fahim
              </p>
              <button
                className="bg-primary px-8 py-3 rounded-lg shadow-lg hover:bg-secondary
                             hover:shadow-xl hover:scale-105 transform transition duration-300 mt-3"
              >
                Get Free Session
              </button>
            </div>

            {/* Right Side: Image */}
            <div className="md:w-1/2  mt-8 md:mt-0 flex justify-end">
              <img
                src={slide3}
                alt="Banner Person"
                className="w-full h-[590px] max-w-lg object-contain"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
