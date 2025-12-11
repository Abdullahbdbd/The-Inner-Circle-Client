import React, { useState } from 'react';
import { FaHeart, FaBookmark, FaFlag, FaShareAlt } from "react-icons/fa";
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQueryClient } from '@tanstack/react-query';

const InteractionButtons = ({lesson}) => {
     const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

    const [liked, setLiked] = useState(user && lesson.likes?.includes(user.uid));
  const [likesCount, setLikesCount] = useState(lesson.likesCount || 0);
  

    const handleLike = async () => {
    if (!user) {
      window.location.href = "/login"; // redirect if not logged in
      return;
    }

    const newLiked = !liked;
    setLiked(newLiked);
    setLikesCount(prev => newLiked ? prev + 1 : prev - 1);

    try {
      await axiosSecure.patch(`/public-lessons/${lesson._id}/like`, { userId: user.uid });
      queryClient.invalidateQueries(["lesson", lesson._id]); // refetch lesson data
    } catch (error) {
      console.error("Error updating like:", error);
      // Revert UI if API fails
      setLiked(!newLiked);
      setLikesCount(prev => newLiked ? prev - 1 : prev + 1);
    }
  };



//   const handleFavorite = async () => {
//     if (!user) {
//       window.location.href = "/login";
//       return;
//     }
//     await axiosSecure.patch(`/lessons/${lesson._id}/favorite`, { userId: user.uid });
//     queryClient.invalidateQueries(["lesson", lesson._id]);
//   };

//   const isLiked = user && lesson.likes?.includes(user.uid);
//   const isFavorited = user && lesson.favorites?.includes(user.uid);

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
        className="btn btn-primary"
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
      <button className="btn btn-sm btn-info" >
        <FaShareAlt className="mr-2" />
        Share
      </button>
    </div>
    );
};

export default InteractionButtons;