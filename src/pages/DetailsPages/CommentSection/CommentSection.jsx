import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";
import { IoSend } from "react-icons/io5";

const CommentSection = ({ lesson }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (data) => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    const newComment = {
      userId: user.uid,
      userName: user.displayName,
      userPhoto: user.photoURL,
      text: data.comment,
      time: new Date().toISOString(), // Ensure time is sent if backend doesn't handle it
    };

    await axiosSecure.post(`/public-lessons/${lesson._id}/comment`, newComment);
    queryClient.invalidateQueries(["lesson", lesson._id]);
    reset();
  };

  return (
    <div className="w-full">
      {/* Header with Style consistent with MetadataSection */}
      <div className="mb-10 flex items-center gap-4">
        <div className="flex items-center gap-3 border-l-4 border-teal-500 pl-4">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            Discussion <span className="text-teal-600">({lesson?.comments?.length || 0})</span>
          </h2>
        </div>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
      </div>

      {/* --- Comment Input Form --- */}
      <div className="bg-slate-50 p-4 md:p-6 rounded-[2rem] border border-slate-100 mb-10 transition-all focus-within:ring-2 focus-within:ring-teal-100 focus-within:bg-white">
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-start gap-4">
          <div className="hidden sm:block">
            <img
              src={user?.photoURL || "https://i.ibb.co/5R9Y76X/user-placeholder.png"}
              alt="user"
              className="w-11 h-11 rounded-2xl object-cover ring-2 ring-white shadow-md"
            />
          </div>
          <div className="flex-1 relative">
            <textarea
              {...register("comment", { required: true })}
              placeholder="Share your thoughts about this lesson..."
              className="w-full bg-transparent border-none focus:ring-0 text-slate-700 placeholder:text-slate-400 resize-none py-2 min-h-[60px]"
            />
            <div className="flex justify-end mt-2 pt-2 border-t border-slate-200/60">
              <button 
                type="submit" 
                className="btn btn-sm md:btn-md bg-teal-600 hover:bg-teal-700 text-white border-none rounded-xl px-6 flex items-center gap-2 transition-all hover:gap-3 shadow-lg shadow-teal-100"
              >
                <span>Post</span>
                <IoSend className="text-xs" />
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* --- Comment List --- */}
      <div className="space-y-6">
        {lesson?.comments?.length > 0 ? (
          lesson.comments
            .slice()
            .reverse()
            .map((cmt, idx) => (
              <div key={idx} className="group flex items-start gap-4 p-4 rounded-3xl transition-all hover:bg-slate-50/80 border border-transparent hover:border-slate-100">
                <img
                  src={cmt.userPhoto || "https://i.ibb.co/5R9Y76X/user-placeholder.png"}
                  alt={cmt.userName}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-bold text-slate-800 truncate">{cmt.userName}</h4>
                    <span className="text-[10px] md:text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-full whitespace-nowrap">
                      {new Date(cmt.time).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <div className="relative">
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {cmt.text}
                    </p>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div className="text-center py-16 px-4 bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200">
            <div className="text-4xl mb-4 opacity-40">💬</div>
            <p className="text-slate-500 font-medium">No discussions yet. Start the conversation!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;