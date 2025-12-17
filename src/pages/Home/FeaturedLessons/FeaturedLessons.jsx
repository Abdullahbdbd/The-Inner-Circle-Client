import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const FeaturedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [featuredLessons, setFeaturedLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axiosSecure.get("/featured-lessons"); // server route
        console.log(res.data);
        
        setFeaturedLessons(res.data.slice(0, 4)); // max 4 lessons
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  if (featuredLessons.length === 0) {
    return null; // No featured lessons
  }
  

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">🌟 Featured Lessons</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredLessons.map((lesson) => (
          <div
            key={lesson._id}
            className="card bg-base-100 shadow-lg hover:shadow-xl transition border border-base-300"
          >
            <div className="card-body">
              <h3 className="font-semibold text-lg">{lesson.title}</h3>
              <p className="text-sm text-gray-600">
                {lesson.description.slice(0, 100)}...
              </p>
              <div className="flex justify-between items-center mt-3 text-sm">
                <span className="badge badge-outline">{lesson.category}</span>
                <span className="badge badge-outline">{lesson.tone}</span>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedLessons;
