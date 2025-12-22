import React from 'react';
import { FaBookOpen, FaQuoteLeft } from "react-icons/fa6";

const InformationSection = ({ lesson }) => {
  return (
    <div className="relative overflow-hidden bg-white group">
      {/* --- Background Decorative Element --- */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500"></div>
      
      <div className="relative p-8 md:p-12">
        {/* Category & Tone Badges */}
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 text-teal-600 text-[11px] font-black uppercase tracking-widest border border-teal-100 shadow-sm">
            <FaBookOpen size={12} /> {lesson.category}
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-500 text-[11px] font-black uppercase tracking-widest border border-slate-200 shadow-sm">
            <FaQuoteLeft size={10} /> {lesson.tone}
          </span>
        </div>

        {/* Title Section */}
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
            {lesson.title}
          </h1>
          
          {/* Accent Line */}
          <div className="w-20 h-1.5 bg-teal-500 rounded-full mb-8"></div>
        </div>

        {/* Description Section */}
        <div className="relative">
          {lesson.description ? (
            <div className="prose max-w-none text-slate-600">
              <p className="text-md font-medium leading-relaxed text-slate-500 italic border-l-4 border-slate-200 pl-6 py-2">
                {lesson.description}
              </p>
            </div>
          ) : (
            <p className="italic text-slate-300 font-medium">
              No description provided for this lesson.
            </p>
          )}
        </div>
      </div>

      {/* --- Bottom Accent Gradient --- */}
      <div className="h-1.5 w-full bg-gradient-to-r from-teal-500 via-teal-400 to-transparent opacity-30"></div>
    </div>
  );
};

export default InformationSection;