import React, { useEffect, useState, useMemo } from "react";
import { FaLock, FaSearch } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserStatus from "../../hooks/useUserStatus";
import { Link } from "react-router";

const PublicLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isPremium } = useUserStatus();

  // Filter & Sort states
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");
  const [sort, setSort] = useState("newest");

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

  const filteredLessons = useMemo(() => {
    let filtered = [...lessons];

    // 🔍 Search Filter
    if (search) {
      filtered = filtered.filter((lesson) =>
        lesson.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 📂 Category Filter
    if (category) {
      filtered = filtered.filter((lesson) => lesson.category === category);
    }

    // 💭 Tone Filter
    if (tone) {
      filtered = filtered.filter((lesson) => lesson.tone === tone);
    }

    // 🔄 Sort
    if (sort === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === "mostSaved") {
      filtered.sort((a, b) => (b.favoritesCount || 0) - (a.favoritesCount || 0));
    }

    return filtered;
  }, [lessons, search, category, tone, sort]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const uniqueCategories = [...new Set(lessons.map((l) => l.category))];
  const uniqueTones = [...new Set(lessons.map((l) => l.tone))];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        🌍 Browse Public Life Lessons
      </h1>

      {/* 🔍 Search + Filter + Sort Bar */}
      <div className="flex flex-wrap gap-4 justify-center mb-10">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search by title..."
            className="input input-bordered pr-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute right-3 top-3 text-gray-400" />
        </div>

        {/* Category Filter */}
        <select
          className="select select-bordered"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        {/* Tone Filter */}
        <select
          className="select select-bordered"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option value="">All Tones</option>
          {uniqueTones.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        {/* Sort Option */}
        <select
          className="select select-bordered"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="mostSaved">Most Saved</option>
        </select>
      </div>

      {/* 🧾 Lessons Grid */}
      {filteredLessons.length === 0 ? (
        <p className="text-center text-gray-500">No lessons found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLessons.map((lesson) => {
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
                    <Link
                      to={`/public-lessons/${lesson._id}`}
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
                    <Link to="/upgrade" className="btn btn-sm mt-2">
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
