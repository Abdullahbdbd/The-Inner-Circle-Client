import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaTrash, FaEye, FaCalendarAlt, FaGlobeAmericas, FaLock, FaRocket, FaFilter, FaChevronRight } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import LoadingPage from "../../../component/LoadingPage/LoadingPage";

const MyFavorites = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState({ category: "", tone: "" });

  // Load user's favorites
  const { data: favorites = [], refetch, isLoading } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Remove from favorites
  const handleRemoveFavorite = async (lessonId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Remove this lesson from your favorites?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#14b8a6",
      cancelButtonColor: "#f43f5e",
      confirmButtonText: "Yes, remove it!",
      customClass: {
        popup: 'rounded-[2rem]',
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/public-lessons/${lessonId}/favorite`, {
          userId: user.email,
        });
        refetch();
        Swal.fire({
          title: "Removed!",
          text: "Lesson removed from favorites.",
          icon: "success",
          confirmButtonColor: "#14b8a6",
          customClass: { popup: 'rounded-[2rem]' }
        });
      }
    });
  };

  const filteredFavorites = favorites.filter((fav) => {
    const matchCategory = filter.category ? fav.category === filter.category : true;
    const matchTone = filter.tone ? fav.tone === filter.tone : true;
    return matchCategory && matchTone;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* --- Header Section (Identical to My Lessons) --- */}
      <div className="bg-white border-b border-slate-200 pt-12 pb-16 mb-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
               My <span className="text-teal-600">Favorites</span>
            </h2>
            <p className="text-slate-500 text-sm mt-2 font-medium">
              You have saved <span className="text-teal-600 font-bold">{favorites.length}</span> precious lessons to your collection.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* --- Filter Bar --- */}
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-wrap gap-4 items-center mb-8">
          <div className="flex items-center gap-2 px-4 border-r border-slate-100 text-slate-400">
            <FaFilter size={12} />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Filters</span>
          </div>

          <select
            className="select select-sm bg-slate-50 border-none rounded-xl text-xs font-bold text-slate-700 focus:ring-2 focus:ring-teal-500/20 outline-none"
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
            value={filter.category}
          >
            <option value="">All Categories</option>
            {[...new Set(favorites.map((f) => f.category))].map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            className="select select-sm bg-slate-50 border-none rounded-xl text-xs font-bold text-slate-700 focus:ring-2 focus:ring-teal-500/20 outline-none"
            onChange={(e) => setFilter({ ...filter, tone: e.target.value })}
            value={filter.tone}
          >
            <option value="">All Tones</option>
            {[...new Set(favorites.map((f) => f.tone))].map((tone) => (
              <option key={tone} value={tone}>{tone}</option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <LoadingPage></LoadingPage>
          </div>
        ) : filteredFavorites.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-300">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaRocket className="text-slate-300" />
            </div>
            <p className="text-slate-400 font-bold text-sm italic">You haven't added any favorites yet.</p>
            <Link to="/public-lessons" className="inline-block mt-6 px-8 py-3 bg-teal-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-teal-700 transition-all shadow-lg shadow-teal-100">
              Explore All Lessons
            </Link>
          </div>
        ) : (
          /* --- Table Styling (Fully Matched with My Lessons) --- */
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Content Details</th>
                    <th className="py-6 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
                    <th className="py-6 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">Tone</th>
                    <th className="py-6 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">Visibility</th>
                    <th className="py-6 px-8 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredFavorites.map((lesson) => (
                    <tr key={lesson._id} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="py-6 px-8">
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-slate-800 group-hover:text-teal-600 transition-colors line-clamp-1">{lesson.title}</span>
                          <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">Added to Favorites</span>
                        </div>
                      </td>

                      <td className="py-6 text-center">
                        <span className="text-[10px] font-black bg-teal-50 text-teal-600 px-3 py-1 rounded-md border border-teal-100 uppercase">
                          {lesson.category}
                        </span>
                      </td>

                      <td className="py-6 text-center">
                        <span className="text-[10px] font-black bg-slate-100 text-slate-600 px-3 py-1 rounded-md border border-slate-200 uppercase">
                          {lesson.tone}
                        </span>
                      </td>

                      <td className="py-6 text-center">
                        <div className="flex flex-col gap-1.5 items-center">
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md flex items-center gap-1 border ${
                            lesson.privacy === "Public" ? "bg-teal-50 text-teal-600 border-teal-100" : "bg-slate-50 text-slate-400 border-slate-100"
                          }`}>
                            {lesson.privacy === "Public" ? <FaGlobeAmericas size={8} /> : <FaLock size={8} />} {lesson.privacy}
                          </span>
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md border ${
                            lesson.accessLevel === "Premium" ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-slate-50 text-slate-500 border-slate-100"
                          }`}>
                             {lesson.accessLevel}
                          </span>
                        </div>
                      </td>

                      <td className="py-6 px-8">
                        <div className="flex justify-end items-center gap-3">
                          <Link 
                            to={`/public-lessons/${lesson._id}`} 
                            className="w-9 h-9 flex items-center justify-center bg-slate-900 text-white rounded-xl hover:bg-teal-600 transition-all shadow-md"
                            title="View Lesson"
                          >
                            <FaEye size={12} />
                          </Link>
                          <button 
                            onClick={() => handleRemoveFavorite(lesson._id)} 
                            className="w-9 h-9 flex items-center justify-center bg-slate-50 text-slate-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all border border-slate-100"
                            title="Remove Favorite"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;