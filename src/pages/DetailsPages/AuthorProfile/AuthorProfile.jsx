import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaStar, FaCrown, FaCheckCircle } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AuthorProfile = () => {
  const { email } = useParams();
  const axiosSecure = useAxiosSecure();
  const [sortBy, setSortBy] = useState("newest");

  // 🔹 Load author info
  const { data: author = {} } = useQuery({
    queryKey: ["author", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${email}`);
      return res.data;
    },
  });

  // 🔹 Load author's public lessons
  const { data: authorLessons = [] } = useQuery({
    queryKey: ["author-lessons", email, sortBy],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-lessons?email=${email}&sort=${
          sortBy === "popular" ? "mostSaved" : "newest"
        }`
      );
      return res.data;
    },
  });

  // Filter only Public lessons
  const publicLessons = authorLessons.filter(
    (lesson) => lesson.privacy === "Public"
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* --- Author Info Card --- */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className=" max-w-[400px] mx-auto bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm text-center relative overflow-hidden mb-10"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-[4rem] opacity-50 "></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="relative mb-6">
              <img
                src={author.photoURL || "/default-avatar.png"}
                alt="profile"
                className="w-28 h-28 rounded-[2rem] object-cover ring-4 ring-slate-50 shadow-md"
              />
              {author.role === "admin" ? (
                <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white p-2 rounded-xl shadow-lg border-2 border-white">
                  <FaCrown size={12} />
                </div>
              ) : (
                author.isPremium && (
                  <div className="absolute -bottom-2 -right-2 bg-teal-600 text-white p-2 rounded-xl shadow-lg border-2 border-white">
                    <FaStar size={12} />
                  </div>
                )
              )}
            </div>

            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              {author.displayName}
              <FaCheckCircle className="text-teal-500 size-4" />
            </h3>
            <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-tighter">
              {author.email}
            </p>

            <div className="flex gap-2 mt-4">
              {author.role === "admin" && (
                <span className="bg-amber-50 text-amber-600 text-[9px] font-black uppercase px-3 py-1 rounded-md border border-amber-100">
                  Admin
                </span>
              )}
              {author.isPremium && (
                <span className="bg-teal-50 text-teal-600 text-[9px] font-black uppercase px-3 py-1 rounded-md border border-teal-100">
                  Premium
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* --- Lessons Section --- */}
        <div className="flex items-center gap-4 mb-6">
         <div className="mb-8 flex items-center gap-4">
  <div className="flex items-center gap-3 border-l-4 border-teal-500 pl-4">
    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
      Public Lessons by <span className="text-teal-600">{author.displayName || "Author"}</span>
    </h3>
  </div>
  {/* ঐচ্ছিক: ডিজাইনটি আরও প্রিমিয়াম করতে ডানপাশে একটি হালকা লাইন */}
  <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
</div>

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
              No public lessons found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
  );
};

export default AuthorProfile;
