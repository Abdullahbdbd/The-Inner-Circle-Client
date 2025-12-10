import React from "react";
import { FaCalendarAlt, FaRedoAlt } from "react-icons/fa";
import { FaEye, FaLock } from "react-icons/fa6";

const MetadataSection = ({ lesson }) => {
  return (
    <section className="bg-base-100 shadow-sm rounded-2xl p-6 md:p-8 border border-base-200 mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        🕓 Lesson Metadata
      </h2>

      <div className="grid sm:grid-cols-3 gap-6 text-gray-700">
        {/* Created Date */}
        <div className="flex items-center gap-3">
          <FaCalendarAlt className="text-primary text-lg" />
          <div>
            <p className="text-sm text-gray-500">Created</p>
            <p className="font-medium">
              {lesson.createdAt
                ? new Date(lesson.createdAt).toLocaleDateString("en-GB")
                : "N/A"}
            </p>
          </div>
        </div>

        {/* Updated Date */}
        <div className="flex items-center gap-3">
          <FaRedoAlt className="text-secondary text-lg" />
          <div>
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="font-medium">
              {lesson.updatedAt
                ? new Date(lesson.updatedAt).toLocaleDateString("en-GB")
                : "Not updated yet"}
            </p>
          </div>
        </div>

        {/* Visibility */}
        <div className="flex items-center gap-3">
          {lesson.privacy === "Public" ? (
            <FaEye className="text-success text-lg" />
          ) : (
            <FaLock className="text-gray-500 text-lg" />
          )}
          <div>
            <p className="text-sm text-gray-500">Visibility</p>
            <p className="font-medium text-gray-600 italic">
             Public
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetadataSection;
