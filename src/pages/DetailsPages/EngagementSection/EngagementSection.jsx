import React, { useMemo } from "react";
import { FaHeart, FaBookmark, FaEye } from "react-icons/fa";

const EngagementSection = ({ lesson }) => {
  // Functionality preserved exactly as requested
  const views = useMemo(() => Math.floor(Math.random() * 10000), []);

  const formatNumber = (num) => {
    if (!num) return 0;
    return num >= 1000 ? (num / 1000).toFixed(1) + "K" : num;
  };

  return (
    <section className="relative overflow-hidden pb-5">
      {/* Section Header with Left Border - MetadataSection Style */}
      <div className="mb-8 flex items-center gap-4">
        <div className="flex items-center gap-3 border-l-4 border-teal-500 pl-4">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            Engagement <span className="text-teal-600">Stats</span>
          </h2>
        </div>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
      </div>

      {/* Info Cards Grid - Matching MetadataSection Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Likes Card */}
        <div className="group p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-rose-100 transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-rose-50 text-rose-500 group-hover:scale-110 transition-transform">
              <FaHeart size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Likes</p>
              <p className="text-[15px] font-bold text-slate-700 mt-1">
                {formatNumber(lesson?.likesCount)}
              </p>
            </div>
          </div>
        </div>

        {/* Favorites Card */}
        <div className="group p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-amber-100 transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-50 text-amber-500 group-hover:scale-110 transition-transform">
              <FaBookmark size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Saved By</p>
              <p className="text-[15px] font-bold text-slate-700 mt-1">
                {formatNumber(lesson?.favoritesCount)}
              </p>
            </div>
          </div>
        </div>

        {/* Views Card */}
        <div className="group p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-sky-100 transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-sky-50 text-sky-500 group-hover:scale-110 transition-transform">
              <FaEye size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Views</p>
              <p className="text-[15px] font-bold text-slate-700 mt-1">
                {formatNumber(views)}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EngagementSection;