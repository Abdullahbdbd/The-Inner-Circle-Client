import React from 'react';
import { Link } from "react-router";
import { FaUserCircle, FaBookOpen } from "react-icons/fa";

const CreatorSection = ({lesson}) => {
    return (
         <section className="bg-base-100 shadow-md rounded-2xl p-6 md:p-8 mb-8 border border-base-200">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        👤 Author / Creator
      </h2>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Author Photo */}
        <div className="avatar">
          <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
            {lesson.creatorPhoto ? (
              <img
                src={lesson.creatorPhoto}
                alt={lesson.creatorName}
                className="object-cover w-full h-full"
              />
            ) : (
              <FaUserCircle className="w-full h-full text-gray-400" />
            )}
          </div>
        </div>

        {/* lesson Info */}
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            {lesson.creatorName}
          </h3>
          <p className="text-gray-600 flex items-center justify-center sm:justify-start gap-2 mb-3">
            <FaBookOpen className="text-primary" />
            <span>
              Total Lessons:{" "}
              <span className="font-semibold text-gray-800">
                {lesson.totalLessons || 0}
              </span>
            </span>
          </p>

          <Link
            to={`/author/${lesson.creatorEmail}`}
            className="btn btn-outline btn-primary btn-sm mt-2"
          >
            View all lessons by this author →
          </Link>
        </div>
      </div>
    </section>
    );
};

export default CreatorSection;