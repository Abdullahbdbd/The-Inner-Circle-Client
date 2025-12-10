import React from 'react';

const InformationSection = ({lesson}) => {
    return (
      <section className="bg-base-100 shadow-md rounded-2xl p-6 md:p-10 mb-8 border border-base-200">
      {/* Category & Tone badges */}
      <div className="flex flex-wrap gap-3 mb-4">
        <span className="badge badge-outline badge-primary px-4 py-2">
          📂 {lesson.category}
        </span>
        <span className="badge badge-outline badge-secondary px-4 py-2">
          💭 {lesson.tone}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
        {lesson.title}
      </h1>

      {/* Divider */}
      <div className="divider my-4"></div>

      {/* Description */}
      <div className="prose max-w-none text-gray-700 leading-relaxed">
        {lesson.description ? (
          <p>{lesson.description}</p>
        ) : (
          <p className="italic text-gray-400">No description available.</p>
        )}
      </div>
    </section>
    );
};

export default InformationSection;