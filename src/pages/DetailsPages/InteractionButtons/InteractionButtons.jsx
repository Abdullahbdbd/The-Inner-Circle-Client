import React, { useState } from "react";
import { FaHeart, FaBookmark, FaFlag, FaShareAlt } from "react-icons/fa";
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

const InteractionButtons = ({ lesson }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // ----- LIKE -----
  const [liked, setLiked] = useState(user && lesson.likes?.includes(user.email));
  const [likesCount, setLikesCount] = useState(lesson.likesCount || 0);

  const handleLike = async () => {
    if (!user) return navigate("/login");

    const newLiked = !liked;
    setLiked(newLiked);
    setLikesCount((prev) => (newLiked ? prev + 1 : prev - 1));

    try {
      await axiosSecure.patch(`/public-lessons/${lesson._id}/like`, {
        userId: user.email, // email দিয়েই রাখো consistency
      });
      queryClient.invalidateQueries(["lesson", lesson._id]);
    } catch (error) {
      console.error("Error updating like:", error);
      setLiked(!newLiked);
      setLikesCount((prev) => (newLiked ? prev - 1 : prev + 1));
    }
  };

  // ----- FAVORITE -----
  const [isFavorited, setIsFavorited] = useState(
    user && lesson.favorites?.includes(user.email)
  );

  const handleFavorite = async () => {
    if (!user) return navigate("/login");

    const newFav = !isFavorited;
    setIsFavorited(newFav);

    try {
      await axiosSecure.patch(`/public-lessons/${lesson._id}/favorite`, {
        userId: user.email,
      });
      queryClient.invalidateQueries(["lesson", lesson._id]);
    } catch (error) {
      console.error("Error updating favorite:", error);
      setIsFavorited(!newFav);
    }
  };

  // ----- SHARE -----
  const shareUrl = window.location.href;
  const title = lesson.title;

  return (
    <div className="flex flex-wrap gap-4 mt-6 items-center">
      {/* ❤️ Like Button */}
      <button
        className={`btn btn-sm ${liked ? "btn-error" : "btn-outline"}`}
        onClick={handleLike}
      >
        ❤️ {likesCount}
      </button>

      {/* 🔖 Favorite Button */}
      <button
        className={`btn btn-sm ${isFavorited ? "btn-primary" : "btn-outline"}`}
        onClick={handleFavorite}
      >
        <FaBookmark className="mr-2" />
        {lesson.favoritesCount || 0}
      </button>

      {/* 🚩 Report Button */}
      <button className="btn btn-sm btn-warning">
        <FaFlag className="mr-2" />
        Report
      </button>

      {/* 📤 Share Buttons */}
      <div className="flex gap-2 ml-2">
        <FacebookShareButton url={shareUrl} quote={title}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton url={shareUrl} title={title}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </div>
    </div>
  );
};

export default InteractionButtons;
