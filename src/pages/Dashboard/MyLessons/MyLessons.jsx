import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaLock, FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyLessons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: lessons = [], refetch } = useQuery({
    queryKey: ["my-lessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-lessons?email=${user.email}`);
      return res.data;
    },
  });

  // delete lessons
  const handleLessonsDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/public-lessons/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your lesson has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">📘 My Lessons</h2>

      {lessons.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          You haven’t created any lessons yet.
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-base-300">
          <table className="table table-zebra w-full">
            {/* Table Head */}
            <thead className="bg-base-200 text-base font-semibold">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Privacy</th>
                <th>Access</th>
                <th>Created</th>
                <th>Reactions</th>
                <th>Favorite</th>
                <th>Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {lessons.map((lesson, index) => (
                <tr key={lesson._id}>
                  <td>{index + 1}</td>
                  <td className="font-medium">{lesson.title}</td>
                  <td>{lesson.category}</td>

                  {/* privacy */}
                  <td>
                    <span
                      className={`badge ${
                        lesson.privacy === "Public"
                          ? "badge-success"
                          : "badge-ghost"
                      }`}
                    >
                      {lesson.privacy === "Public" ? (
                        <>
                          <FaEye className="mr-1" /> Public
                        </>
                      ) : (
                        <>
                          <FaLock className="mr-1" /> Private
                        </>
                      )}
                    </span>
                  </td>

                  {/* Access */}
                  <td>
                    <span
                      className={`badge ${
                        lesson.accessLevel === "Premium"
                          ? "badge-warning"
                          : "badge-info"
                      }`}
                    >
                      {lesson.accessLevel}
                    </span>
                  </td>

                  {/* Created Date */}
                  <td>
                    {new Date(lesson.createdAt).toLocaleDateString("en-GB")}
                  </td>

                  {/* Likes or Reactions */}
                  <td>{lesson.likesCount || 0}</td>

                  {/* Favorites */}
                  <td>{lesson.favoritesCount || 0}</td>

                  {/* Actions */}
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-xs btn-info text-white">
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleLessonsDelete(lesson._id)}
                        className="btn btn-xs btn-error text-white"
                      >
                        <FaTrash />
                      </button>
                      <Link
                        to={`/lessons/${lesson._id}`}
                        className="btn btn-xs btn-outline btn-primary"
                      >
                        Details
                      </Link>
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

export default MyLessons;
