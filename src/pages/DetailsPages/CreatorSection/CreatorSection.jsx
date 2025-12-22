import React from "react";
import { Link } from "react-router";
import { FaUserCircle, FaArrowRight } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const CreatorSection = ({ lesson }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: creatorLessons = [] } = useQuery({
    queryKey: ["creator-lessons", lesson.creatorEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-lessons?email=${lesson.creatorEmail}`);
      return res.data;
    },
  });

  // Creator Profile URL
  const profileUrl = `/author/${lesson.creatorEmail}`;

  return (
    <div className="flex items-center gap-4 group">
      {/* --- Profile Image (Clickable) --- */}
      <Link to={profileUrl} className="relative cursor-pointer">
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-teal-500/20 p-0.5 group-hover:border-teal-500 transition-colors duration-300 shadow-sm group-hover:shadow-md">
          {lesson.creatorPhoto ? (
            <img
              src={lesson.creatorPhoto}
              alt={lesson.creatorName}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <FaUserCircle className="w-full h-full text-slate-300" />
          )}
        </div>
        {/* Online Dot */}
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-teal-500 border-2 border-white rounded-full"></div>
      </Link>

      {/* --- Creator Text Info --- */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <Link to={profileUrl} className="hover:text-teal-600 transition-colors duration-200">
            <h4 className="text-[15px] font-black text-slate-800 leading-tight">
              {lesson.creatorName}
            </h4>
          </Link>
          <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">Author</span>
        </div>
        
        <div className="flex items-center gap-3 mt-1">
          <p className="text-[13px] font-bold text-slate-400">
            {creatorLessons.length || 0} Lessons Published
          </p>
          
          <Link
            to={profileUrl}
            className="text-[12px] font-black text-teal-600 hover:text-teal-700 flex items-center gap-1 group/link"
          >
            Profile <FaArrowRight className="group-hover/link:translate-x-1 transition-transform" size={10} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreatorSection;