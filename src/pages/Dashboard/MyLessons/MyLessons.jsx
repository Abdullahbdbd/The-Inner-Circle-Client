import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaLock, FaTrash, FaHeart, FaThumbsUp, FaRocket, FaPlus, FaImage } from "react-icons/fa6";
import { FaEdit, FaChevronRight, FaTimes, FaCalendarAlt, FaGlobeAmericas } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useUserStatus from "../../../hooks/useUserStatus";
import { motion } from "framer-motion";
import LoadingPage from "../../../component/LoadingPage/LoadingPage";

const MyLessons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [editingLesson, setEditingLesson] = useState(null);
  const { isPremium } = useUserStatus(); // assuming isPremium is a boolean from your hook
  const { register, handleSubmit, reset } = useForm();

  // Load Lessons
  const { data: lessons = [], refetch, isLoading } = useQuery({
    queryKey: ["my-lessons", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/my-lessons?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleLessonsDelete = (id) => {
    Swal.fire({
      title: "Delete permanently?",
      text: "This lesson will be gone forever!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
      customClass: { popup: 'rounded-[2rem]' }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/public-lessons/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            toast.success("Lesson deleted successfully");
          }
        });
      }
    });
  };

  const handleEditClick = (lesson) => {
    setEditingLesson(lesson);
    reset({
      title: lesson.title,
      description: lesson.description,
      category: lesson.category,
      tone: lesson.tone,
      privacy: lesson.privacy,
      accessLevel: lesson.accessLevel,
      image: lesson.image // if you have an image URL
    });
    document.getElementById("update_modal").showModal();
  };

  const handleUpdate = async (data) => {
    try {
      const res = await axiosSecure.put(`/public-lessons/${editingLesson._id}`, data);
      if (res.data.modifiedCount > 0) {
        toast.success("Lesson updated successfully!");
        refetch();
        document.getElementById("update_modal").close();
        setEditingLesson(null);
      }
    } catch (error) {
      toast.error("Update failed!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* --- Header Section --- */}
      <div className="bg-white border-b border-slate-200 pt-16 pb-20 mb-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-end">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
              My <span className="text-teal-600">Lessons</span>
            </h2>
            <p className="text-slate-500 text-sm mt-3 font-medium">
              Manage your <span className="text-teal-600 font-bold">{lessons.length}</span> contributions to the community.
            </p>
          </motion.div>
          <Link to="/dashboard/add-lessons" className="hidden md:flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-teal-600 transition-all">
            <FaPlus /> New Lesson
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {isLoading ? (
          <div className="flex justify-center py-20"><LoadingPage></LoadingPage></div>
        ) : lessons.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
            <FaRocket size={40} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-400 font-bold italic">No lessons found. Start sharing today!</p>
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-6 px-8 text-[11px] font-black uppercase text-slate-400">Lesson Title</th>
                    <th className="py-6 text-[11px] font-black uppercase text-slate-400 text-center">Category</th>
                    <th className="py-6 text-[11px] font-black uppercase text-slate-400 text-center">Tone</th>
                    <th className="py-6 text-center text-[11px] font-black uppercase text-slate-400">Stats</th>
                    <th className="py-6 text-center text-[11px] font-black uppercase text-slate-400">Visibility</th>
                    <th className="py-6 text-[11px] font-black uppercase text-slate-400 text-center">Published</th>
                    <th className="py-6 px-8 text-right text-[11px] font-black uppercase text-slate-400">Manage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {lessons.map((lesson) => (
                    <tr key={lesson._id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="py-6 px-8 max-w-[300px]">
                        <span className="text-sm font-black text-slate-800 group-hover:text-teal-600 transition-colors">{lesson.title}</span>
                      </td>
                      <td className="py-6 text-center">
                        <span className="text-[10px] font-black bg-teal-50 text-teal-700 px-3 py-1 rounded-full uppercase tracking-tighter">
                          {lesson.category}
                        </span>
                      </td>
                      <td className="py-6 text-center">
                        <span className="text-[10px] font-black bg-slate-100 text-slate-600 px-3 py-1 rounded-full uppercase tracking-tighter">
                          {lesson.tone}
                        </span>
                      </td>
                      <td className="py-6">
                        <div className="flex justify-center gap-4">
                          <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5"><FaThumbsUp size={12}/> {lesson.likesCount || 0}</span>
                          <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5"><FaHeart size={12}/> {lesson.favoritesCount || 0}</span>
                        </div>
                      </td>
                      <td className="py-6 text-center">
                        <div className="flex flex-col gap-1 items-center">
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md flex items-center gap-1 border ${lesson.privacy === "Public" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-100 text-slate-500 border-slate-200"}`}>
                            {lesson.privacy === "Public" ? <FaGlobeAmericas size={8} /> : <FaLock size={8} />} {lesson.privacy}
                          </span>
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md border ${lesson.accessLevel === "Premium" ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-blue-50 text-blue-600 border-blue-100"}`}>
                             {lesson.accessLevel}
                          </span>
                        </div>
                      </td>
                      <td className="py-6 text-center">
                        <div className="flex flex-col items-center">
                          <span className="text-[11px] font-bold text-slate-600">
                            {lesson.createdAt ? new Date(lesson.createdAt).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            }) : 'N/A'}
                          </span>
                          <span className="text-[9px] text-slate-400 font-medium">Original Post</span>
                        </div>
                      </td>
                      <td className="py-6 px-8 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleEditClick(lesson)} className="p-2.5 bg-slate-100 text-slate-500 rounded-xl hover:bg-teal-600 hover:text-white transition-all"><FaEdit size={14}/></button>
                          <button onClick={() => handleLessonsDelete(lesson._id)} className="p-2.5 bg-slate-100 text-slate-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all"><FaTrash size={14}/></button>
                          <Link to={`/public-lessons/${lesson._id}`} className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-teal-600 shadow-md"><FaEye size={14}/></Link>
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

     {/* --- Pro Update Modal --- */}
<dialog id="update_modal" className="modal backdrop-blur-md">
  <div className="modal-box bg-white rounded-[2rem] p-0 overflow-hidden max-w-3xl border-none shadow-2xl h-auto max-h-[90vh] flex flex-col">
    
    {/* Fixed Header */}
    <div className="p-6 bg-slate-900 text-white flex justify-between items-center shrink-0">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-teal-500/20 flex items-center justify-center border border-teal-500/30">
          <FaEdit className="text-teal-400" size={20} />
        </div>
        <div>
          <h3 className="text-xl font-black tracking-tight leading-none">Edit Your Lesson</h3>
          <p className="text-slate-400 text-[10px] uppercase font-bold mt-1 tracking-widest">Update content & settings</p>
        </div>
      </div>
      <button 
        onClick={() => document.getElementById("update_modal").close()} 
        className="h-10 w-10 flex items-center justify-center bg-slate-800 rounded-full hover:bg-rose-500 transition-all active:scale-95"
      >
        <FaTimes />
      </button>
    </div>

    {/* Scrollable Form Body */}
    <form onSubmit={handleSubmit(handleUpdate)} className="flex-1 overflow-y-auto custom-scrollbar p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        
        {/* Title - Full Width */}
        <div className="md:col-span-2 group">
          <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest mb-1.5 block">Lesson Title</label>
          <input 
            {...register("title", {required: true})} 
            placeholder="e.g. Life is a journey"
            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all font-bold text-slate-700 outline-none" 
          />
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest block">Category</label>
          <select {...register("category")} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none cursor-pointer focus:border-teal-500 focus:bg-white transition-all">
            <option value="Personal Growth">Personal Growth</option>
            <option value="Career">Career</option>
            <option value="Relationships">Relationships</option>
            <option value="Mindset">Mindset</option>
            <option value="Mistakes Learned">Mistakes Learned</option>
          </select>
        </div>

        {/* Tone */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest block">Tone of Voice</label>
          <select {...register("tone")} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none cursor-pointer focus:border-teal-500 focus:bg-white transition-all">
            <option value="Formal">Formal</option>
            <option value="Casual">Casual</option>
            <option value="Inspirational">Inspirational</option>
            <option value="Direct">Direct</option>
            <option value="Reflective">Reflective</option>
          </select>
        </div>

        {/* Visibility */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest block">Visibility</label>
          <select {...register("privacy")} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:border-teal-500 focus:bg-white transition-all">
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>

        {/* Access Level */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest block">Access Level</label>
          <select 
            {...register("accessLevel")} 
            disabled={!isPremium} 
            className={`w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none transition-all ${!isPremium ? "opacity-50 cursor-not-allowed" : "focus:border-teal-500 focus:bg-white"}`}
          >
            <option value="Free">Free</option>
            <option value="Premium">Premium</option>
          </select>
          {!isPremium && <p className="text-[9px] text-rose-500 font-bold ml-1 italic">*Locked for Free Users</p>}
        </div>

        {/* Description - Full Width */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest block">Description / Core Lesson</label>
          <textarea 
            {...register("description", {required: true})} 
            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all font-medium text-slate-600 outline-none min-h-[140px] resize-none" 
            placeholder="Share the details of your lesson..."
          />
        </div>
      </div>

      {/* Fixed Footer with Actions */}
      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
        <button 
          type="submit" 
          className="flex-1 bg-teal-600 text-white py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-teal-700 transition-all shadow-lg shadow-teal-100 active:scale-[0.98]"
        >
          Save Changes
        </button>
        <button 
          type="button" 
          onClick={() => document.getElementById("update_modal").close()} 
          className="px-10 py-4 bg-slate-100 text-slate-500 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-200 transition-all active:scale-[0.98]"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</dialog>
    </div>
  );
};

export default MyLessons;