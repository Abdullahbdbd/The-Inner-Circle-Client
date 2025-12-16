import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrash, FaStar, FaCheckCircle } from "react-icons/fa";

const ManageLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState({
    category: "",
    privacy: "",
    flagged: "",
  });

  // Load all lessons
  const { data: lessons = [], refetch, isLoading } = useQuery({
    queryKey: ["all-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/public-lessons");
      return res.data;
    },
  });

  // Delete Lesson
  const handleDeleteLesson = (lessonId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This lesson will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/public-lessons/${lessonId}`);
        refetch();
        Swal.fire("Deleted!", "Lesson has been removed.", "success");
      }
    });
  };

  // Mark Featured
  const handleFeatureToggle = async (lesson) => {
    const updatedStatus = !lesson.isFeatured;
    await axiosSecure.patch(`/lessons/${lesson._id}/feature`, {
      isFeatured: updatedStatus,
    });
    refetch();
    Swal.fire({
      icon: "success",
      title: updatedStatus
        ? "Lesson marked as Featured 🌟"
        : "Removed from Featured",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Mark Reviewed
  const handleMarkReviewed = async (lesson) => {
    await axiosSecure.patch(`/lessons/${lesson._id}/review`, {
      reviewed: true,
    });
    refetch();
    Swal.fire({
      icon: "success",
      title: "Lesson marked as Reviewed ✅",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Filter lessons
  const filteredLessons = lessons.filter((lesson) => {
    const matchCategory = filter.category
      ? lesson.category === filter.category
      : true;
    const matchPrivacy = filter.privacy
      ? lesson.privacy === filter.privacy
      : true;
    const matchFlagged =
      filter.flagged === "true"
        ? lesson.isFlagged === true
        : filter.flagged === "false"
        ? lesson.isFlagged === false
        : true;
    return matchCategory && matchPrivacy && matchFlagged;
  });

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        🧠 Manage All Lessons
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <select
          className="select select-bordered"
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
        >
          <option value="">All Categories</option>
          {[...new Set(lessons.map((l) => l.category))].map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <select
          className="select select-bordered"
          onChange={(e) => setFilter({ ...filter, privacy: e.target.value })}
        >
          <option value="">All Privacy</option>
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>

        <select
          className="select select-bordered"
          onChange={(e) => setFilter({ ...filter, flagged: e.target.value })}
        >
          <option value="">All Lessons</option>
          <option value="true">Flagged</option>
          <option value="false">Not Flagged</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg border border-base-300 rounded-lg">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Creator</th>
              <th>Privacy</th>
              <th>Featured</th>
              <th>Reviewed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLessons.map((lesson, index) => (
              <tr key={lesson._id}>
                <td>{index + 1}</td>
                <td>{lesson.title}</td>
                <td>{lesson.category}</td>
                <td>{lesson.creatorName}</td>
                <td>{lesson.privacy}</td>
                <td>{lesson.isFeatured ? "✅ Yes" : "❌ No"}</td>
                <td>{lesson.reviewed ? "✅ Yes" : "❌ No"}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() => handleFeatureToggle(lesson)}
                    >
                      <FaStar />
                    </button>
                    <button
                      className="btn btn-xs btn-info"
                      onClick={() => handleMarkReviewed(lesson)}
                    >
                      <FaCheckCircle />
                    </button>
                    <button
                      className="btn btn-xs btn-error text-white"
                      onClick={() => handleDeleteLesson(lesson._id)}
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

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="card bg-base-100 border p-4">
          <h3 className="font-semibold">Public Lessons</h3>
          <p className="text-2xl font-bold text-blue-500">
            {lessons.filter((l) => l.privacy === "Public").length}
          </p>
        </div>
        <div className="card bg-base-100 border p-4">
          <h3 className="font-semibold">Private Lessons</h3>
          <p className="text-2xl font-bold text-green-500">
            {lessons.filter((l) => l.privacy === "Private").length}
          </p>
        </div>
        <div className="card bg-base-100 border p-4">
          <h3 className="font-semibold">Flagged Lessons</h3>
          <p className="text-2xl font-bold text-red-500">
            {lessons.filter((l) => l.isFlagged).length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManageLessons;
