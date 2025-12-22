import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaPlusCircle, FaBookOpen, FaLayerGroup, FaSmile, FaLock, FaCrown } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import useUserStatus from "../../../hooks/useUserStatus";

const AddLessons = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const userStatus = useUserStatus();

  const handleAddLesson = (data) => {
    const lessonData = {
      ...data,
      creatorEmail: user?.email,
      creatorName: user?.displayName || user?.name || "Anonymous",
      creatorPhoto: user?.photoURL,
    };

    axiosSecure.post("/add-lessons", lessonData).then((res) => {
      if (res.data.insertedId) {
        toast.success("Your Lesson has been added successfully!");
        reset();
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 pt-12 pb-16 mb-10">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <FaPlusCircle className="text-teal-600" /> Create New <span className="text-teal-600">Lesson</span>
          </h2>
          <p className="text-slate-500 text-sm mt-2 font-medium">Share your insights, stories, and wisdom with the community.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12"
        >
          <form onSubmit={handleSubmit(handleAddLesson)} className="space-y-8">
            
            {/* Lesson Title */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                <FaBookOpen className="text-teal-500" /> Lesson Title
              </label>
              <input
                type="text"
                {...register("title", { required: true })}
                placeholder="e.g. The Power of Patience in Career"
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500/20 transition-all text-sm font-bold text-slate-700 outline-none"
              />
            </div>

            {/* Full Description */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Insight / Story Details
              </label>
              <textarea
                {...register("description", { required: true })}
                rows={6}
                placeholder="Write your full lesson or story here..."
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500/20 transition-all text-sm font-medium text-slate-600 outline-none resize-none leading-relaxed"
              ></textarea>
            </div>

            {/* Grid for Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  <FaLayerGroup className="text-teal-500" /> Category
                </label>
                <select
                  {...register("category", { required: true })}
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500/20 transition-all text-sm font-bold text-slate-700 outline-none appearance-none"
                >
                  <option value="Personal Growth">Personal Growth</option>
                  <option value="Career">Career</option>
                  <option value="Relationships">Relationships</option>
                  <option value="Mindset">Mindset</option>
                  <option value="Mistakes Learned">Mistakes Learned</option>
                </select>
              </div>

              {/* Emotional Tone */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  <FaSmile className="text-teal-500" /> Emotional Tone
                </label>
                <select
                  {...register("tone", { required: true })}
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500/20 transition-all text-sm font-bold text-slate-700 outline-none appearance-none"
                >
                  <option value="Motivational">Motivational</option>
                  <option value="Sad">Sad</option>
                  <option value="Realization">Realization</option>
                  <option value="Gratitude">Gratitude</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Privacy */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  <FaLock className="text-teal-500" /> Privacy Setting
                </label>
                <select
                  {...register("privacy", { required: true })}
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500/20 transition-all text-sm font-bold text-slate-700 outline-none appearance-none"
                >
                  <option value="Public">Public (Everyone can see)</option>
                  <option value="Private">Private (Only me)</option>
                </select>
              </div>

              {/* Access Level */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  <FaCrown className="text-teal-500" /> Access Level
                </label>
                <select
                  {...register("accessLevel", { required: true })}
                  disabled={!userStatus?.isPremium}
                  className={`w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 transition-all text-sm font-bold text-slate-700 outline-none appearance-none ${
                    !userStatus?.isPremium ? "opacity-50 cursor-not-allowed" : "focus:ring-teal-500/20"
                  }`}
                >
                  <option value="Free">Free for Everyone</option>
                  <option value="Premium">Premium Only</option>
                </select>
                {!userStatus?.isPremium && (
                  <p className="text-[10px] text-amber-600 font-bold mt-1 ml-2">Upgrade to Premium to create paid lessons</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full md:w-max px-12 py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-teal-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3"
              >
                Create Lesson Now
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddLessons;