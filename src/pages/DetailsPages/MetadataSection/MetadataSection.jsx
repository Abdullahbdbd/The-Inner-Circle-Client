import React from "react";
import { FaCalendarAlt, FaRedoAlt, FaGlobeAmericas } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";

const MetadataSection = ({ lesson }) => {
  return (
    <section className="relative overflow-hidden">
      {/* Section Header */}
     <div className="mb-8 flex items-center gap-4">
  <div className="flex items-center gap-3 border-l-4 border-teal-500 pl-4">
    <h2 className="text-2xl font-black text-slate-800 tracking-tight">
      Lesson <span className="text-teal-600">Insights</span>
    </h2>
  </div>
  <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
</div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Created Date Card */}
        <div className="group p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-teal-100 transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-blue-50 text-blue-500 group-hover:scale-110 transition-transform">
              <FaCalendarAlt size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Created</p>
              <p className="text-[15px] font-bold text-slate-700 mt-1">
                {lesson?.createdAt
                  ? new Date(lesson.createdAt).toLocaleDateString("en-GB", {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Updated Date Card */}
        <div className="group p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-amber-100 transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-50 text-amber-500 group-hover:scale-110 transition-transform">
              <FaRedoAlt size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Update</p>
              <p className="text-[15px] font-bold text-slate-700 mt-1">
                {lesson?.updatedAt
                  ? new Date(lesson.updatedAt).toLocaleDateString("en-GB", {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })
                  : "Initial Version"}
              </p>
            </div>
          </div>
        </div>

        {/* Visibility Card */}
        <div className="group p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl group-hover:scale-110 transition-transform ${
              lesson?.privacy === "Public" ? "bg-emerald-50 text-emerald-500" : "bg-slate-100 text-slate-500"
            }`}>
              {lesson?.privacy === "Public" ? <FaGlobeAmericas size={20} /> : <FaLock size={20} />}
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Visibility</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`h-2 w-2 rounded-full animate-pulse ${
                   lesson?.privacy === "Public" ? "bg-emerald-500" : "bg-slate-400"
                }`}></span>
                <p className="text-[15px] font-bold text-slate-700 capitalize">
                  {lesson?.privacy || "Public"}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MetadataSection;