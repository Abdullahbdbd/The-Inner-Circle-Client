import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaBookmark, FaArrowRight, FaHeart } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingPage from "../../../component/LoadingPage/LoadingPage";

const MostSavedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMostSaved = async () => {
      try {
        const res = await axiosSecure.get("/most-saved-lessons");
        setLessons(res.data.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMostSaved();
  }, [axiosSecure]);

  if (loading)
    return (
      <LoadingPage></LoadingPage>
    );

  if (lessons.length === 0) return null;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section - Color Matched */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 text-center md:text-left border-l-4 border-teal-500 pl-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-3">
               Community <span className="text-teal-500">Favorites</span>
            </h2>
            <p className="text-slate-500 max-w-lg text-base">
              The lessons that resonated most with our community. Highly saved and valued wisdom.
            </p>
          </motion.div>
          
         <Link 
          to="/public-lessons" 
          className="group text-teal-600 font-semibold flex items-center gap-2 hover:text-teal-700 transition-colors"
        >
          View All <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
        </Link>
        </div>

        {/* Horizontal Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {lessons.map((lesson, i) => (
            <motion.div
              key={lesson._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group bg-white border border-slate-100 rounded-[2rem] p-8 hover:border-teal-400 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-500 flex flex-col sm:flex-row gap-6 items-center sm:items-start shadow-sm"
            >
              {/* Bookmark Sticker Style */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-br from-teal-400 to-emerald-500 p-4 rounded-2xl rotate-12 shadow-lg group-hover:rotate-0 transition-transform duration-500">
                <FaBookmark className="text-xl text-white" />
              </div>

              {/* Lesson Stats Box - Teal Theme */}
              <div className="flex-shrink-0 flex flex-col items-center justify-center w-24 h-24 bg-teal-50 rounded-[1.5rem] border border-teal-100 transition-all duration-300">
                 <FaHeart className="text-rose-500 mb-1 group-hover:animate-ping" />
                 <span className="text-2xl font-black text-teal-700 leading-none tracking-tighter">
                    {lesson.favoritesCount || 0}
                 </span>
                 <span className="text-[9px] font-bold uppercase tracking-widest text-teal-600">Saves</span>
              </div>

              {/* Lesson Content */}
              <div className="flex-grow text-center sm:text-left">
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-teal-600 px-3 py-1 bg-teal-50 rounded-full border border-teal-100">
                    {lesson.category}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 py-1 bg-slate-50 rounded-full">
                    {lesson.tone || "General"}
                  </span>
                </div>
                
                <h3 className="text-2xl font-black text-slate-800 mb-3 transition-colors line-clamp-1 leading-tight">
                  {lesson.title}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                  {lesson.description}
                </p>

                <Link
                  to={`/public-lessons/${lesson._id}`}
                  className="inline-flex items-center gap-2 font-bold text-teal-600 group-hover:underline decoration-2 underline-offset-4 transition-all"
                >
                  Read Lesson <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostSavedLessons;