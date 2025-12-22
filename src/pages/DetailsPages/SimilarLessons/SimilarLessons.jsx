import React from "react";
import { Link } from "react-router";
import { FaArrowRight, FaLayerGroup, FaBullhorn } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../../../component/LoadingPage/LoadingPage";

const SimilarLessons = ({ lessonId }) => {
  const axiosSecure = useAxiosSecure();

  const { data: relatedLessons = [], isLoading } = useQuery({
    queryKey: ["related-lessons", lessonId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/public-lessons/${lessonId}/related`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <LoadingPage></LoadingPage>
    );
  }

  return (
    <section className="w-full">
      {/* Header with Consistent Style */}
      <div className="mb-10 flex items-center gap-4">
        <div className="flex items-center gap-3 border-l-4 border-teal-500 pl-4">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            More to <span className="text-teal-600">Explore</span>
          </h2>
        </div>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
      </div>

      {relatedLessons.length === 0 ? (
        <div className="bg-slate-50 border border-dashed border-slate-200 rounded-[2rem] p-12 text-center">
            <p className="text-slate-400 font-medium italic">No related lessons found at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedLessons.map((lesson) => (
            <div
              key={lesson._id}
              className="group bg-white rounded-[2rem] border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden flex flex-col"
            >
              <div className="p-8 flex flex-col flex-1">
                {/* Category & Tone Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-teal-50 text-teal-600 text-[10px] font-bold uppercase tracking-wider rounded-full border border-teal-100/50">
                    <FaLayerGroup className="text-[9px]" /> {lesson.category}
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider rounded-full border border-slate-100">
                    <FaBullhorn className="text-[9px]" /> {lesson.tone}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-xl text-slate-800 mb-3 group-hover:text-teal-600 transition-colors duration-300 line-clamp-2 leading-snug">
                  {lesson.title}
                </h3>

                {/* Description */}
                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {lesson.description}
                </p>

                {/* Footer Action */}
                <div className="mt-auto pt-6 border-t border-slate-50">
                  <Link
                    to={`/public-lessons/${lesson._id}`}
                    className="flex items-center justify-between w-full group/btn"
                  >
                    <span className="text-sm font-bold text-slate-700 group-hover/btn:text-teal-600 transition-colors">
                        Explore Lesson
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover/btn:bg-teal-600 group-hover/btn:text-white transition-all duration-300">
                        <FaArrowRight size={12} />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SimilarLessons;