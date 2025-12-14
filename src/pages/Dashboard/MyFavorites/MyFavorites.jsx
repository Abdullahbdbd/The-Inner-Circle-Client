import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyFavorites = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [filter, setFilter] = useState({ category: "", tone: "" });

  //Load user's favorites
  const { data: favorites = [], refetch, isLoading } = useQuery({
    queryKey: ["favorites", user?.uid],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites/${user.uid}`);
      console.log(user?.uid);
      
      return res.data;
    },
  });

  // Remove favorite
  const handleRemoveFavorite = async (lessonId) => {
    Swal.fire({
      title: "Remove from favorites?",
      text: "This lesson will be removed from your favorites list.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/public-lessons/${lessonId}/favorite`, {
          userId: user.uid,
        });
        refetch();
        Swal.fire("Removed!", "Lesson removed from favorites.", "success");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  //Filtered favorites
  const filteredFavorites = favorites.filter((fav) => {
    const matchCategory = filter.category
      ? fav.category === filter.category
      : true;
    const matchTone = filter.tone ? fav.tone === filter.tone : true;
    return matchCategory && matchTone;
  });

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        ❤️ My Favorite Lessons
      </h2>

      {/* 🔍 Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <select
          className="select select-bordered"
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
        >
          <option value="">All Categories</option>
          {[...new Set(favorites.map((f) => f.category))].map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <select
          className="select select-bordered"
          onChange={(e) => setFilter({ ...filter, tone: e.target.value })}
        >
          <option value="">All Tones</option>
          {[...new Set(favorites.map((f) => f.tone))].map((tone) => (
            <option key={tone}>{tone}</option>
          ))}
        </select>
      </div>

      {/* 🧾 Table */}
      {filteredFavorites.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          You haven’t favorited any lessons yet.
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-base-300">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-base font-semibold">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Tone</th>
                <th>Access</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredFavorites.map((lesson, index) => (
                <tr key={lesson._id}>
                  <td>{index + 1}</td>
                  <td>{lesson.title}</td>
                  <td>{lesson.category}</td>
                  <td>{lesson.tone}</td>
                  <td>{lesson.accessLevel}</td>

                  <td>
                    <div className="flex gap-2">
                      <Link
                        to={`/public-lessons/${lesson._id}`}
                        className="btn btn-xs btn-outline btn-primary"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => handleRemoveFavorite(lesson._id)}
                        className="btn btn-xs btn-error text-white"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyFavorites;
