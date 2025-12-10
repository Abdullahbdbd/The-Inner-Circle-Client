import React from "react";
import { Link } from "react-router";
import { FaLock } from "react-icons/fa";

const SimilarLessons = ({ lessons = [], currentUser }) => {
  if (lessons.length === 0) return null;

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6 text-center">
        🔄 Similar & Recommended Lessons
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.slice(0, 6).map((lesson) => {
          const isLocked = lesson.accessLevel === "Premium" && !currentUser?.isPremium;

          return (
            <div
              key={lesson._id}
              className={`card bg-base-100 shadow-lg relative overflow-hidden`}
            >
              {/* Optional Image */}
              {lesson.image && (
                <figure>
                  <img
                    src={lesson.image}
                    alt={lesson.title}
                    className={`h-48 w-full object-cover ${
                      isLocked ? "blur-sm brightness-75" : ""
                    }`}
                  />
                </figure>
              )}

              <div className={`card-body ${isLocked ? "blur-sm" : ""}`}>
                <h3 className="card-title text-lg">{lesson.title}</h3>
                <p className="text-sm text-gray-600 truncate">
                  {lesson.description?.slice(0, 80)}...
                </p>

                <div className="flex justify-between items-center mt-3 text-sm">
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

                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/public-lessons/${lesson._id}`}
                    className={`btn btn-sm ${
                      isLocked ? "btn-disabled cursor-not-allowed" : "btn-primary"
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
                  <p className="font-semibold text-gray-800">Premium Lesson</p>
                  <p className="text-sm text-gray-600">
                    Upgrade to view this content
                  </p>
                  <Link to="/upgrade" className="btn btn-sm mt-2">
                    Upgrade
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SimilarLessons;
