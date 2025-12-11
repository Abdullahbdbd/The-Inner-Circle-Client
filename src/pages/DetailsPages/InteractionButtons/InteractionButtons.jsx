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

const InteractionButtons = ({ lesson }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [liked, setLiked] = useState(user && lesson.likes?.includes(user.uid));
  const [likesCount, setLikesCount] = useState(lesson.likesCount || 0);

  // Like section
  const handleLike = async () => {
    if (!user) {
      window.location.href = "/login"; // redirect if not logged in
      return;
    }

    const newLiked = !liked;
    setLiked(newLiked);
    setLikesCount((prev) => (newLiked ? prev + 1 : prev - 1));

    try {
      await axiosSecure.patch(`/public-lessons/${lesson._id}/like`, {
        userId: user.uid,
      });
      queryClient.invalidateQueries(["lesson", lesson._id]); // refetch lesson data
    } catch (error) {
      console.error("Error updating like:", error);
      // Revert UI if API fails
      setLiked(!newLiked);
      setLikesCount((prev) => (newLiked ? prev - 1 : prev + 1));
    }
  };

  //favorite section
  const isFavorited = user && lesson.favorites?.includes(user.uid);
  const handleFavorite = async () => {
    if (!user) {
      window.location.href = "/login"; // not logged in → go to login
      return;
    }
    await axiosSecure.patch(`/public-lessons/${lesson._id}/favorite`, {
      userId: user.uid,
    });
    queryClient.invalidateQueries(["lesson", lesson._id]); // refetch lesson
  };

  // share section
  const shareUrl = window.location.href;
  const title = lesson.title;

  return (
    <div className="flex flex-wrap gap-4 mt-6">
      {/* Like Button */}
      <button
        className={`btn btn-sm ${liked ? "btn-error" : "btn-outline"}`}
        onClick={handleLike}
      >
        ❤️ {likesCount}
      </button>

      {/* Favorite Button */}
      <button
        className={`btn btn-sm ${isFavorited ? "btn-primary" : "btn-outline"}`}
        onClick={handleFavorite}
      >
        <FaBookmark className="mr-2" />
        {lesson.favoritesCount || 0}
      </button>

      {/* Report Button */}
      <button className="btn btn-sm btn-warning">
        <FaFlag className="mr-2" />
        Report
      </button>

      {/* Share Button */}
       <div className="flex gap-2">
      {/* Facebook */}
      <FacebookShareButton url={shareUrl} quote={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      {/* Twitter */}
      <TwitterShareButton url={shareUrl} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      {/* LinkedIn */}
      <LinkedinShareButton url={shareUrl} title={title}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
    </div>
  );
};

export default InteractionButtons;
