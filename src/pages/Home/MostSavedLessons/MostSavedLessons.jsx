import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MostSavedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMostSaved = async () => {
      try {
        const res = await axiosSecure.get("/most-saved-lessons");
        setLessons(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMostSaved();
  }, [axiosSecure]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );

  if (lessons.length === 0) return null;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">💖 Most Saved Lessons</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition p-6"
            >
              <h3 className="font-semibold text-lg mb-2">{lesson.title}</h3>
              <p className="text-sm text-gray-600">
                {lesson.description.slice(0, 100)}...
              </p>
              <div className="flex justify-between items-center mt-3 text-sm">
                <span className="badge badge-outline">{lesson.category}</span>
                <span className="badge badge-outline">{lesson.favoritesCount || 0} ❤️</span>
              </div>
              <div className="card-actions justify-end mt-4">
                <Link
                  to={`/public-lessons/${lesson._id}`}
                  className="btn btn-sm btn-primary"
                >
                  See Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostSavedLessons;
