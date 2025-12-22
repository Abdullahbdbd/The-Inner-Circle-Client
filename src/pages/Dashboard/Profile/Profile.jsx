import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaStar, FaEdit, FaCrown, FaCheckCircle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useRole from "../../../hooks/useRole";
import { motion } from "framer-motion";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();

  const [isEditing, setIsEditing] = useState(false);
  const [sortBy, setSortBy] = useState("newest"); // newest or popular
  const { register, handleSubmit, reset } = useForm();

  // Load user info
  const { data: dbUser = {}, refetch: refetchUser } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      reset(res.data);
      return res.data;
    },
  });

  const { data: myLessons = [] } = useQuery({
    queryKey: ["my-lessons", user?.email, sortBy],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-lessons?email=${user.email}&sort=${
          sortBy === "popular" ? "mostSaved" : "newest"
        }`
      );
      return res.data;
    },
  });

  const handleUpdate = async (data) => {
    try {
      await axiosSecure.patch(`/users/profile/${user.email}`, data);
      await updateUserProfile({
        displayName: data.displayName,
        photoURL: data.photoURL,
      });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      refetchUser();
    } catch (err) {
      toast.error("Update failed!");
    }
  };

  const lessonsCount = myLessons.length;
  const totalFavorites = myLessons.reduce(
    (acc, lesson) => acc + (lesson.favoritesCount || 0),
    0
  );
  const publicLessons = myLessons.filter((l) => l.privacy === "Public");

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* --- Left Column: Profile Card --- */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm relative overflow-hidden"
            >
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-[4rem] -z-0 opacity-50"></div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <img
                    src={
                      dbUser.photoURL || user?.photoURL || "/default-avatar.png"
                    }
                    alt="profile"
                    className="w-28 h-28 rounded-[2rem] object-cover ring-4 ring-slate-50 shadow-md"
                  />
                  {role === "admin" ? (
                    <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white p-2 rounded-xl shadow-lg border-2 border-white">
                      <FaCrown size={12} />
                    </div>
                  ) : (
                    dbUser.isPremium && (
                      <div className="absolute -bottom-2 -right-2 bg-teal-600 text-white p-2 rounded-xl shadow-lg border-2 border-white">
                        <FaStar size={12} />
                      </div>
                    )
                  )}
                </div>

                <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                  {dbUser.displayName || user.displayName}
                  <FaCheckCircle className="text-teal-500 size-4" />
                </h3>
                <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-tighter">
                  {user.email}
                </p>

                <div className="flex gap-2 mt-4">
                  {role === "admin" && (
                    <span className="bg-amber-50 text-amber-600 text-[9px] font-black uppercase px-3 py-1 rounded-md border border-amber-100">
                      Admin
                    </span>
                  )}
                  {dbUser.isPremium && (
                    <span className="bg-teal-50 text-teal-600 text-[9px] font-black uppercase px-3 py-1 rounded-md border border-teal-100">
                      Premium
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full mt-8 flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-teal-600 transition-all"
                >
                  <FaEdit /> Edit Profile
                </button>
              </div>
            </motion.div>

            {/* --- Stats Card --- */}
            {role === "user" && (
              <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm flex justify-around">
                <div className="text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Lessons
                  </p>
                  <p className="text-xl font-black text-slate-800">
                    {lessonsCount}
                  </p>
                </div>
                <div className="w-[1px] bg-slate-100 h-10 my-auto"></div>
                <div className="text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Hearts
                  </p>
                  <p className="text-xl font-black text-slate-800">
                    {totalFavorites}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* --- Right Column: Public Lessons --- */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">
                Public Contributions
              </h3>

              {/* Sorting Buttons */}
              <div className="ml-auto flex gap-2">
                <button
                  onClick={() => setSortBy("newest")}
                  className={`px-4 py-2 rounded-xl font-bold text-xs ${
                    sortBy === "newest"
                      ? "bg-teal-600 text-white"
                      : "bg-slate-100"
                  }`}
                >
                  Newest
                </button>
                <button
                  onClick={() => setSortBy("popular")}
                  className={`px-4 py-2 rounded-xl font-bold text-xs ${
                    sortBy === "popular"
                      ? "bg-teal-600 text-white"
                      : "bg-slate-100"
                  }`}
                >
                  Most Popular
                </button>
              </div>
            </div>

            {publicLessons.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-[2rem] border border-dashed border-slate-200">
                <p className="text-slate-400 font-bold text-sm">
                  No public lessons shared yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {publicLessons.map((lesson) => (
                  <motion.div
                    key={lesson._id}
                    whileHover={{ y: -4 }}
                    className="bg-white p-5 rounded-[1.8rem] border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col"
                  >
                    <div className="mb-4">
                      <span className="text-[9px] font-black uppercase tracking-tighter px-2 py-1 bg-teal-50 text-teal-700 rounded-md">
                        {lesson.category}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-800 mb-2 line-clamp-1">
                      {lesson.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-5">
                      {lesson.description}
                    </p>
                    <div className="mt-auto pt-4 border-t border-slate-50 flex justify-between items-center">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                        {lesson.tone}
                      </span>
                      <span className="text-[9px] font-bold text-slate-300">
                        {new Date(lesson.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- Profile Update Modal --- */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white w-full max-w-sm rounded-[2rem] p-8 shadow-2xl border border-slate-100"
          >
            <h3 className="text-xl font-black text-slate-800 mb-6">
              Update Profile
            </h3>
            <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">
                  Full Name
                </label>
                <input
                  {...register("displayName")}
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-teal-500/20 transition-all text-xs font-bold text-slate-700 outline-none"
                  defaultValue={dbUser.displayName}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">
                  Photo Link
                </label>
                <input
                  {...register("photoURL")}
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-teal-500/20 transition-all text-xs font-bold text-slate-700 outline-none"
                  defaultValue={dbUser.photoURL}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-teal-600 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-teal-700 transition-all"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 bg-slate-100 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200"
                >
                  Close
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Profile;
