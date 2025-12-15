import React from "react";
import { Link } from "react-router";
import { FaLock } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

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
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }


  return (
     <section className="mt-10">
      <h2 className="text-2xl font-bold mb-6">✨ Similar & Recommended Lessons</h2>

      {relatedLessons.length === 0 ? (
        <p className="text-gray-500 italic">No related lessons found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedLessons.map((lesson) => (
            <div
              key={lesson._id}
              className="card bg-base-100 shadow-md hover:shadow-lg transition border border-base-200"
            >
              <div className="card-body">
                <h3 className="font-semibold text-lg">{lesson.title}</h3>
                <p className="text-gray-600 text-sm">
                  {lesson.description.slice(0, 100)}...
                </p>
                <div className="flex justify-between items-center mt-3">
                  <span className="badge badge-outline">{lesson.category}</span>
                  <span className="badge badge-outline">{lesson.tone}</span>
                </div>
                <Link
                  to={`/public-lessons/${lesson._id}`}
                  className="btn btn-sm btn-primary mt-4"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SimilarLessons;
