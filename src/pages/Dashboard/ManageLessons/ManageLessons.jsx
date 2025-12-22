import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrash, FaStar, FaFilter, FaLayerGroup, FaShieldHalved } from "react-icons/fa6";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import LoadingPage from "../../../component/LoadingPage/LoadingPage";

const ManageLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState({
    category: "",
    privacy: "",
    flagged: "",
  });

  // Load all lessons
  const { data: lessons = [], refetch, isLoading } = useQuery({
    queryKey: ["all-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/public-lessons");
      return res.data;
    },
  });

  // Delete Lesson Logic
  const handleDeleteLesson = (lessonId) => {
    Swal.fire({
      title: "Delete permanently?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
      customClass: { popup: 'rounded-[2rem]' }
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/public-lessons/${lessonId}`);
        refetch();
        Swal.fire({
            title: "Deleted!",
            icon: "success",
            confirmButtonColor: "#14b8a6",
            customClass: { popup: 'rounded-[2rem]' }
        });
      }
    });
  };

  // Feature Toggle Logic
  const handleFeatureToggle = async (lesson) => {
    const updatedStatus = !lesson.isFeatured;
    await axiosSecure.patch(`/lessons/${lesson._id}/feature`, {
      isFeatured: updatedStatus,
    });
    refetch();
    Swal.fire({
      icon: "success",
      title: updatedStatus ? "Featured 🌟" : "Unfeatured",
      toast: true,
      position: 'top-end',
      timer: 2000,
      showConfirmButton: false,
    });
  };

  // Mark Reviewed Logic
  const handleMarkReviewed = async (lesson) => {
    await axiosSecure.patch(`/lessons/${lesson._id}/review`, {
      reviewed: true,
    });
    refetch();
    Swal.fire({
      icon: "success",
      title: "Marked as Reviewed ✅",
      toast: true,
      position: 'top-end',
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const filteredLessons = lessons.filter((lesson) => {
    const matchCategory = filter.category ? lesson.category === filter.category : true;
    const matchPrivacy = filter.privacy ? lesson.privacy === filter.privacy : true;
    const matchFlagged = filter.flagged === "true" ? lesson.isFlagged === true : filter.flagged === "false" ? lesson.isFlagged === false : true;
    return matchCategory && matchPrivacy && matchFlagged;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* --- Header Section --- */}
      <div className="bg-white border-b border-slate-200 pt-12 pb-16 mb-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Manage <span className="text-teal-600">Lessons</span>
            </h2>
            <p className="text-slate-500 text-sm mt-2 font-medium">
              Review, feature, or moderate all lessons across the platform.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* --- Stats Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Public Content", val: lessons.filter(l => l.privacy === "Public").length, color: "text-blue-600", bg: "bg-blue-50", icon: <FaLayerGroup /> },
            { label: "Private Drafts", val: lessons.filter(l => l.privacy === "Private").length, color: "text-teal-600", bg: "bg-teal-50", icon: <FaCheckCircle /> },
            { label: "Flagged Items", val: lessons.filter(l => l.isFlagged).length, color: "text-rose-600", bg: "bg-rose-50", icon: <FaShieldHalved /> }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
                <h3 className="text-2xl font-black text-slate-800">{stat.val}</h3>
              </div>
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center text-lg`}>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* --- Filters Section --- */}
        <div className="bg-white p-4 rounded-[2rem] border border-slate-200 mb-8 flex flex-wrap items-center gap-4 shadow-sm">
          <div className="px-4 text-slate-400"><FaFilter /></div>
          <select 
            className="select select-ghost focus:bg-transparent font-bold text-slate-600"
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          >
            <option value="">All Categories</option>
            {[...new Set(lessons.map((l) => l.category))].map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <select 
            className="select select-ghost focus:bg-transparent font-bold text-slate-600"
            onChange={(e) => setFilter({ ...filter, privacy: e.target.value })}
          >
            <option value="">All Privacy</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>

          <select 
            className="select select-ghost focus:bg-transparent font-bold text-slate-600"
            onChange={(e) => setFilter({ ...filter, flagged: e.target.value })}
          >
            <option value="">Status: All</option>
            <option value="true">Flagged Only</option>
            <option value="false">Safe Only</option>
          </select>
        </div>

        {/* --- Table Section --- */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center py-20 text-teal-600"><LoadingPage></LoadingPage></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-400">
                    <th className="py-6 px-8 text-[11px] font-black uppercase">Lesson Info</th>
                    <th className="py-6 text-[11px] font-black uppercase">Creator</th>
                    <th className="py-6 text-[11px] font-black uppercase text-center">Featured</th>
                    <th className="py-6 text-[11px] font-black uppercase text-center">Status</th>
                    <th className="py-6 px-8 text-right text-[11px] font-black uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLessons.map((lesson) => (
                    <tr key={lesson._id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="py-6 px-8">
                        <div>
                          <p className="text-sm font-black text-slate-800 leading-none mb-1">{lesson.title}</p>
                          <span className="text-[10px] font-bold text-teal-600 uppercase tracking-tighter bg-teal-50 px-2 py-0.5 rounded">
                            {lesson.category}
                          </span>
                        </div>
                      </td>
                      <td className="py-6 text-sm font-bold text-slate-500">{lesson.creatorName}</td>
                      <td className="py-6 text-center">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${lesson.isFeatured ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400'}`}>
                          {lesson.isFeatured ? '★ Featured' : 'Standard'}
                        </span>
                      </td>
                      <td className="py-6 text-center">
                        <div className="flex flex-col items-center gap-1">
                             <span className={`text-[10px] font-black uppercase ${lesson.reviewed ? 'text-teal-600' : 'text-rose-500'}`}>
                                {lesson.reviewed ? 'Reviewed' : 'Pending'}
                             </span>
                             <span className="text-[9px] font-bold text-slate-300 uppercase">{lesson.privacy}</span>
                        </div>
                      </td>
                      <td className="py-6 px-8 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleFeatureToggle(lesson)}
                            className={`p-2.5 rounded-xl transition-all border ${lesson.isFeatured ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-slate-400 border-slate-200 hover:text-amber-500 hover:border-amber-200'}`}
                            title="Feature Lesson"
                          >
                            <FaStar size={14} />
                          </button>
                          <button 
                            onClick={() => handleMarkReviewed(lesson)}
                            className={`p-2.5 rounded-xl transition-all border ${lesson.reviewed ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-slate-400 border-slate-200 hover:text-teal-600 hover:border-teal-200'}`}
                            title="Mark Reviewed"
                          >
                            <FaCheckCircle size={14} />
                          </button>
                          <button 
                            onClick={() => handleDeleteLesson(lesson._id)}
                            className="p-2.5 rounded-xl bg-white text-slate-400 border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all"
                            title="Delete Lesson"
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageLessons;