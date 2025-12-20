import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaArrowRight, FaLightbulb } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";

const FeaturedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [featuredLessons, setFeaturedLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axiosSecure.get("/featured-lessons");
        setFeaturedLessons(res.data.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner text-teal-500 loading-lg"></span>
      </div>
    );
  }

  if (featuredLessons.length === 0) return null;

  return (

  
    <div className="max-w-7xl mx-auto px-6 py-20 mt-20">
      {/* Header Section */}
         <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 text-center md:text-left border-l-4 border-teal-500 pl-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-3">
                     Featured <span className="text-teal-500">Lessons</span>
                  </h2>
                  <p className="text-slate-500 max-w-lg text-base">
                    Handpicked insights from our community contributors.
                  </p>
                </motion.div>
                
                 <Link 
          to="/public-lessons" 
          className="group text-teal-600 font-semibold flex items-center gap-2 hover:text-teal-700 transition-colors"
        >
          View All <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
        </Link>
              </div>
      

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredLessons.map((lesson) => (
          <div
            key={lesson._id}
            className="group flex flex-col bg-white border border-gray-100 rounded-3xl p-7 shadow-xl transition-all duration-500 ease-in-out hover:border-teal-400 hover:shadow-2xl transform hover:-translate-y-3 hover:scale-[1.03]"
          >
            {/* Tag/Category */}
            <div className="mb-5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-4 py-1.5 rounded-full transition-colors duration-300">
                {lesson.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-slate-800 mb-4 transition-colors duration-300 line-clamp-2">
              {lesson.title}
            </h3>

            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
              {lesson.description}
            </p>

            {/* Bottom Section */}
            <div className="mt-auto pt-5 border-t border-gray-50 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-tighter">
                {lesson.tone || "Insight"}
              </span>
              <Link
                to={`/public-lessons/${lesson._id}`}
                className="bg-slate-50 p-3 rounded-full text-slate-400 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300 shadow-sm"
                title="Read Details"
              >
                <FaArrowRight className="group-hover:rotate-[-45deg] transition-transform duration-300" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedLessons;