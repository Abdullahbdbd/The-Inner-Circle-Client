import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserStatus from "../../hooks/useUserStatus";
import { Link } from "react-router";

const PublicLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isPremium } = useUserStatus();

  useEffect(() => {
    axiosSecure
      .get("/public-lessons")
      .then((res) => {
        setLessons(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosSecure]);

if (loading ) {
  return (
    <div className="flex justify-center items-center h-64">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
}

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        🌍 Browse Public Life Lessons
      </h1>

      {lessons.length === 0 ? (
        <p className="text-center text-gray-500">
          No public lessons available yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson) => {
            const isLocked = lesson.accessLevel === "Premium" && !isPremium;

            return (
              <div
                key={lesson._id}
                className={`card bg-base-100 shadow-xl relative ${
                  isLocked ? "overflow-hidden" : ""
                }`}
              >

                {/* Card Body */}
                <div className={`card-body ${isLocked ? "blur-sm" : ""}`}>
                  <h2 className="card-title text-lg">{lesson.title}</h2>
                  <p className="text-sm text-gray-600">
                    {lesson.description.slice(0, 100)}...
                  </p>

                  <div className="mt-3 text-gray-500">
                    <p>Category: {lesson.category}</p>
                    <p>Tone: {lesson.tone}</p>
                  </div>

                  {/* Creator Info */}
                  <div className="flex items-center gap-2 mt-3">
                    <div className="avatar">
                      <div className="w-8 rounded-full">
                        <img
                          src={lesson.creatorPhoto}
                          alt={lesson.creatorName}
                        />
                      </div>
                    </div>
                    <span className="text-sm text-gray-700">
                      {lesson.creatorName}
                    </span>
                  </div>

                  {/* Access & Date */}
                  <div className="flex justify-between items-center mt-4 text-sm">
                    <span
                      className={`badge ${
                        lesson.accessLevel === "Premium"
                          ? "badge-warning"
                          : "badge-success"
                      }`}
                    >
                      {lesson.accessLevel}
                    </span>
                    <span className="text-gray-500">
                      {new Date(lesson.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Details Button */}
                  <div className="card-actions justify-end mt-4">
                    <Link to={`/public-lessons/${lesson._id}`}
                      className={`btn btn-sm ${
                        isLocked
                          ? "btn-disabled cursor-not-allowed"
                          : "btn-primary"
                      }`}
                    >
                      See Details
                    </Link>
                  </div>
                </div>

                {/* Lock Overlay */}
                {isLocked && (
                  <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex flex-col justify-center items-center text-center px-4">
                    <FaLock className="text-3xl text-gray-600 mb-2" />
                    <p className="font-semibold text-gray-800">
                      Premium Lesson
                    </p>
                    <p className="text-sm text-gray-600">
                      Upgrade to view this content
                    </p>
                    <Link to="/upgrade" className="btn ">
                      Upgrade
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PublicLessons;
