import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";

const CommentSection = ({ lesson }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

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
    };

    await axiosSecure.post(`/public-lessons/${lesson._id}/comment`, newComment);
    queryClient.invalidateQueries(["lesson", lesson._id]);
    reset();
  };

  return (
    <div className="mt-8 bg-base-100 p-6 rounded-xl shadow-sm border border-base-200">
      <h2 className="text-xl font-semibold mb-4">💬 Comments</h2>

      {/* Comment form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-3 mb-6">
        <img
          src={user?.photoURL || "/default-avatar.png"}
          alt="user"
          className="w-10 h-10 rounded-full"
        />
        <input
          {...register("comment", { required: true })}
          type="text"
          placeholder="Write a comment..."
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary">Post</button>
      </form>

      {/* Comment list */}
      <div className="space-y-4">
        {lesson?.comments?.length > 0 ? (
          lesson.comments
            .slice()
            .reverse()
            .map((cmt, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-base-200 p-3 rounded-lg">
                <img
                  src={cmt.userPhoto || "/default-avatar.png"}
                  alt={cmt.userName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{cmt.userName}</h4>
                    <span className="text-xs text-gray-500">
                      {new Date(cmt.time).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-1">{cmt.text}</p>
                </div>
              </div>
            ))
        ) : (
          <p className="text-gray-400 italic">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
