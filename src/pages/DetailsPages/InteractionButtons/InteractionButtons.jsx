import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark, FaFlag, FaShareNodes } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const InteractionButtons = ({ lesson }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // ----- LIKE Logic (Functionality Unchanged) -----
  const [liked, setLiked] = useState(user && lesson.likes?.includes(user.email));
  const [likesCount, setLikesCount] = useState(lesson.likesCount || 0);

  const handleLike = async () => {
    if (!user) return navigate("/login");
    const newLiked = !liked;
    setLiked(newLiked);
    setLikesCount((prev) => (newLiked ? prev + 1 : prev - 1));
    try {
      await axiosSecure.patch(`/public-lessons/${lesson._id}/like`, { userId: user.email });
      queryClient.invalidateQueries(["lesson", lesson._id]);
    } catch (error) {
      setLiked(!newLiked);
      setLikesCount((prev) => (newLiked ? prev - 1 : prev + 1));
    }
  };

  // ----- FAVORITE Logic (Functionality Unchanged) -----
  const [isFavorited, setIsFavorited] = useState(user && lesson.favorites?.includes(user.email));

  const handleFavorite = async () => {
    if (!user) return navigate("/login");
    const newFav = !isFavorited;
    setIsFavorited(newFav);
    try {
      await axiosSecure.patch(`/public-lessons/${lesson._id}/favorite`, { userId: user.email });
      queryClient.invalidateQueries(["lesson", lesson._id]);
    } catch (error) {
      setIsFavorited(!newFav);
    }
  };

  // ----- REPORT Logic (Functionality Unchanged) -----
  const handleReport = async () => {
    if (!user) return navigate("/login");
    const { value: reason } = await Swal.fire({
      title: "Report Lesson",
      input: "select",
      inputOptions: {
        inappropriate: "Inappropriate Content",
        hate: "Hate Speech",
        false: "False Information",
        spam: "Spam",
        other: "Other",
      },
      inputPlaceholder: "Select a reason",
      showCancelButton: true,
      confirmButtonColor: "#14b8a6",
    });

    if (!reason) return;

    try {
      await axiosSecure.post(`/lessons/${lesson._id}/report`, {
        reporterEmail: user.email,
        reason,
        title: lesson.title
      });
      Swal.fire({ icon: "success", title: "Report Submitted", timer: 1500, showConfirmButton: false });
    } catch (error) {
       Swal.fire({ icon: "error", title: "Failed to Report" });
    }
  };

  const shareUrl = window.location.href;
  const title = lesson.title;

  return (
    <div className="flex items-center gap-3">
      {/* ❤️ Like Button - ইমেজের মতো রাউন্ডেড স্টাইল */}
      <button
        onClick={handleLike}
        className={`group flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 border ${
          liked 
          ? "bg-rose-50 border-rose-100 text-rose-500 shadow-sm" 
          : "bg-white border-slate-100 text-slate-400 hover:border-rose-200 hover:text-rose-400"
        }`}
        title="Like Lesson"
      >
        {liked ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
      </button>

      {/* 🔖 Favorite Button */}
      <button
        onClick={handleFavorite}
        className={`group flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 border ${
          isFavorited 
          ? "bg-teal-50 border-teal-100 text-teal-600 shadow-sm" 
          : "bg-white border-slate-100 text-slate-400 hover:border-teal-200 hover:text-teal-500"
        }`}
        title="Save to Favorites"
      >
        {isFavorited ? <FaBookmark size={18} /> : <FaRegBookmark size={18} />}
      </button>

      {/* 📤 Share Dropdown - ইমেজের ঐ শেয়ার আইকনের মতো */}
      <div className="dropdown dropdown-top dropdown-end">
        <label 
          tabIndex={0} 
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-slate-100 text-slate-400 hover:border-slate-300 hover:text-slate-600 cursor-pointer transition-all"
        >
          <FaShareNodes size={18} />
        </label>
        <div tabIndex={0} className="dropdown-content z-[1] p-3 shadow-2xl bg-white border border-slate-100 rounded-[1.5rem] mb-2 flex gap-3 animate-bounce-short">
          <FacebookShareButton url={shareUrl} quote={title}>
            <FacebookIcon size={35} round />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} title={title}>
            <TwitterIcon size={35} round />
          </TwitterShareButton>
          <LinkedinShareButton url={shareUrl} title={title}>
            <LinkedinIcon size={35} round />
          </LinkedinShareButton>
        </div>
      </div>

      {/* 🚩 Report Button */}
      <button 
        onClick={handleReport}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-slate-100 text-slate-300 hover:border-rose-100 hover:text-rose-400 transition-all"
        title="Report content"
      >
        <FaFlag size={16} />
      </button>
    </div>
  );
};

export default InteractionButtons;