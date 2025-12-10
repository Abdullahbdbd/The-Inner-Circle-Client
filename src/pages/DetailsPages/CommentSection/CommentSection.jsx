import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";

const CommentSection = ({ user, comments = [], onCommentSubmit }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!data.comment || data.comment.trim() === "") return;

    // Comment submit callback
    onCommentSubmit(data.comment);
    reset();
  };

  return (
    <section className="bg-base-100 shadow-md rounded-2xl p-6 md:p-8 mb-8 border border-base-200">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        💬 Comments ({comments.length})
      </h2>

      {/* Comment input form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-start gap-4 mb-6"
      >
        <div className="avatar">
          <div className="w-10 rounded-full">
            {user ? (
              <img src={user.photoURL} alt={user.displayName} />
            ) : (
              <FaUserCircle className="text-4xl text-gray-400" />
            )}
          </div>
        </div>

        <div className="flex-1">
          <textarea
            {...register("comment")}
            placeholder={
              user
                ? "Write your comment..."
                : "Please log in to write a comment..."
            }
            className="textarea textarea-bordered w-full min-h-[80px]"
          />
          <div className="text-right mt-2">
            <button
              type="submit"
              className="btn btn-primary btn-sm flex items-center gap-2"
            >
              <FaPaperPlane /> Post
            </button>
          </div>
        </div>
      </form>

      {/* Comments list */}
      <div className="space-y-5">
        {comments.length === 0 ? (
          <p className="text-gray-500 italic text-center">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          comments.map((c) => (
            <div
              key={c._id}
              className="flex items-start gap-4 p-3 bg-base-200 rounded-xl"
            >
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img src={c.userPhoto} alt={c.userName} />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-gray-800">{c.userName}</h4>
                  <span className="text-xs text-gray-500">
                    {new Date(c.time).toLocaleDateString("en-GB")}
                  </span>
                </div>
                <p className="text-gray-700 mt-1">{c.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CommentSection;
