import React, { useMemo } from "react";
import { FaHeart, FaBookmark, FaEye } from "react-icons/fa";


const EngagementSection = ({ lesson }) => {
  const views = useMemo(() => Math.floor(Math.random() * 10000), []);

  const formatNumber = (num) => {
    if (!num) return 0;
    return num >= 1000 ? (num / 1000).toFixed(1) + "K" : num;
  };


  return (
    <section className="bg-base-100 shadow-md rounded-2xl p-6 md:p-8 mb-8 border border-base-200">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        📊 Stats & Engagement
      </h2>

      <div className="grid sm:grid-cols-3 gap-6 text-center text-gray-700">
        {/* Likes */}
        <div className="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-base-200 transition">
          <FaHeart className="text-3xl text-rose-500 mb-2" />
          <p className="text-lg font-semibold text-gray-800">
            {formatNumber(lesson.likesCount)}{" "}
            <span className="text-sm font-normal text-gray-500">Likes</span>
          </p>
        </div>

        {/* Favorites */}
        <div className="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-base-200 transition">
          <FaBookmark className="text-3xl text-amber-500 mb-2" />
          <p className="text-lg font-semibold text-gray-800">
            {formatNumber(lesson.favoritesCount)}{" "}
            <span className="text-sm font-normal text-gray-500">Favorites</span>
          </p>
        </div>

        {/* Views */}
        <div className="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-base-200 transition">
          <FaEye className="text-3xl text-sky-500 mb-2" />
          <p className="text-lg font-semibold text-gray-800">
            {formatNumber(views)}{" "}
            <span className="text-sm font-normal text-gray-500">Views</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default EngagementSection;
