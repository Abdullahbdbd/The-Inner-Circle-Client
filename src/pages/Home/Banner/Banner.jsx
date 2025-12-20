import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router";
import "./Banner.css";

// Swiper Styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// Assets
import banner3 from "../../../assets/banner1.jpg";
import banner1 from "../../../assets/banner3.jpg";
import banner2 from "../../../assets/banner4.jpg";
import banner5 from "../../../assets/banner5.jpg";
import banner6 from "../../../assets/banner6.jpg";

const slides = [
  {
    title: "Capture. Reflect. Grow.",
    desc: "Preserve your life lessons, reflect on your journey, and grow every single day. Life is full of experiences.",
    author: "Ethan Parker",
    img: banner1,
  },
  {
    title: "Share Your Wisdom",
    desc: "Inspire others by sharing what life has taught you. Every story can change someone’s perspective forever.",
    author: "Sophia Rivera",
    img: banner2,
  },
  {
    title: "Learn from Experience",
    desc: "Discover insights and growth lessons from real people. Explore, connect, and grow with a community.",
    author: "Maya Bennett",
    img: banner3,
  },
  {
    title: "Evolve Through Insights.",
    desc: "Transform your perspective by learning from the triumphs and trials of others. Knowledge is the only asset that grows when shared.",
    author: "Isabella Chen",
    img: banner5,
  },
  {
    title: "Legacy in Every Story.",
    desc: "Your journey matters. Document your life's milestones and create a lasting legacy for those who follow in your footsteps.",
    author: "Marcus Aurelius",
    img: banner6,
  },
];

const Banner = () => {
  return (
    <div className="w-full h-[600px] md:h-screen bg-black overflow-hidden">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade, Navigation]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={true}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full flex items-center justify-center">
              {/* background Image with Sharpness Filter */}
              
              <div
                className="absolute inset-0 transition-transform duration-[5000ms] scale-110"
                style={{
                  background: `url(${slide.img}) center/cover no-repeat`,
                  filter: "brightness(0.8) contrast(1.1)",
                }}
              />

              {/* Sophisticated Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

              {/* Content Box */}
              <div className="relative z-10 container mx-auto px-6 md:px-12 text-left">
                <div className="max-w-2xl">
                  {/* Subtle Badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-2 mb-4"
                  >
                    <span className="w-8 h-[2px] bg-teal-400"></span>
                    <span className="text-teal-400 uppercase tracking-[4px] text-xs font-bold">
                      Life Lessons
                    </span>
                  </motion.div>

                  {/* Main Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl md:text-7xl font-bold text-white leading-[1.1] drop-shadow-lg"
                  >
                    {slide.title}
                  </motion.h1>

                  {/* Description with Glass effect */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-6 p-4 md:p-0 backdrop-blur-[2px] md:backdrop-blur-none bg-black/10 md:bg-transparent rounded-lg"
                  >
                    <p className="text-gray-200 text-lg md:text-xl max-w-lg leading-relaxed border-l-4 border-teal-500 pl-4">
                      {slide.desc}
                    </p>
                    <p className="mt-4 text-teal-300 font-medium italic opacity-90">
                      — {slide.author}
                    </p>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-4 flex flex-wrap gap-6 items-center"
                  >
                    <Link
                      to="/public-lessons"
                      className="relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white shadow-xl shadow-teal-500/20 transition-all active:scale-95 bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 overflow-hidden group"
                    >
                      {/* Icon wrapper */}
                      <span className="relative flex-shrink-0 w-6 h-6 rounded-full bg-white text-teal-500 grid place-items-center overflow-hidden">
                        {/* Original Icon */}
                        <svg
                          viewBox="0 0 14 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="absolute w-4 h-4 text-teal-500 transition-transform duration-300 transform group-hover:translate-x-[150%] group-hover:-translate-y-[150%]"
                        >
                          <path
                            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                            fill="currentColor"
                          />
                        </svg>

                        {/* Copy Icon */}
                        <svg
                          viewBox="0 0 14 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="absolute w-4 h-4 text-teal-500 transition-transform duration-300 transform -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0"
                        >
                          <path
                            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>

                      {/* Button Text */}
                      <span className="relative">Explore Lessons</span>
                    </Link>

                    {/* Styled Upgrade Button from Uiverse */}
                    <Link to="/upgrade" className="uiverse-upgrade-btn">
                      <span>Upgrade Now</span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
