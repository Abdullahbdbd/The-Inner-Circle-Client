import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaLock, FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useUserStatus from "../../../hooks/useUserStatus";

const MyLessons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [editingLesson, setEditingLesson] = useState(null);
  const userStatus=useUserStatus()
  const { register, handleSubmit, reset } = useForm();

  const { data: lessons = [], refetch } = useQuery({
    queryKey: ["my-lessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-lessons?email=${user.email}`);
      return res.data;
    },
  });

  //Delete Lesson
  const handleLessonsDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
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
            Swal.fire("Deleted!", "Your lesson has been deleted.", "success");
          }
        });
      }
    });
  };

  //Handle Edit Click
  const handleEditClick = (lesson) => {
    setEditingLesson(lesson);
    reset(lesson);
    document.getElementById("update_modal").showModal();
  };

  // Handle Update
  const handleUpdate = async (data) => {
    try {
      const res = await axiosSecure.put(
        `/public-lessons/${editingLesson._id}`,
        data
      );
      if (res.data.modifiedCount > 0) {
        toast.success("Lesson updated successfully!");
        refetch();
        document.getElementById("update_modal").close();
      }
    } catch (error) {
      console.error(error);
      toast.error("Update failed!");
    }
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
            <thead className="bg-base-200 text-base font-semibold">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Privacy</th>
                <th>Access</th>
                <th>Created</th>
                <th>Likes</th>
                <th>Favorites</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {lessons.map((lesson, index) => (
                <tr key={lesson._id}>
                  <td>{index + 1}</td>
                  <td className="font-medium">{lesson.title}</td>
                  <td>{lesson.category}</td>

                  <td>
                    <span
                      className={`badge ${
                        lesson.privacy === "Public"
                          ? "badge-success"
                          : "badge-ghost"
                      }`}
                    >
                      {lesson.privacy}
                    </span>
                  </td>

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

                  <td>
                    {new Date(lesson.createdAt).toLocaleDateString("en-GB")}
                  </td>

                  <td>{lesson.likesCount || 0}</td>
                  <td>{lesson.favoritesCount || 0}</td>

                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(lesson)}
                        className="btn btn-xs btn-info text-white"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleLessonsDelete(lesson._id)}
                        className="btn btn-xs btn-error text-white"
                      >
                        <FaTrash />
                      </button>
                      <Link
                        to={`/public-lessons/${lesson._id}`}
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

      {/* Update Modal */}
      <dialog id="update_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">Update Lesson</h3>

          <form onSubmit={handleSubmit(handleUpdate)} className="space-y-3">
            <input
              {...register("title")}
              placeholder="Title"
              className="input input-bordered w-full"
            />

            <textarea
              {...register("description")}
              placeholder="Description"
              className="textarea textarea-bordered w-full"
              rows="3"
            ></textarea>

            <select
              {...register("category", { required: true })}
              defaultValue="Select a category"
              className="select w-full"
            >
              <option disabled>Select a category</option>
              <option value="Personal Growth">Personal Growth</option>
              <option value="Career">Career</option>
              <option value="Relationships">Relationships</option>
              <option value="Mindset">Mindset</option>
              <option value="Mistakes Learned">Mistakes Learned</option>
            </select>

             <select
              {...register("tone", { required: true })}
              defaultValue="Select emotional tone"
              className="select w-full"
            >
              <option disabled>Select emotional tone</option>
              <option value="Motivational">Motivational</option>
              <option value="Sad">Sad</option>
              <option value="Realization">Realization</option>
              <option value="Gratitude">Gratitude</option>
            </select>

            <select {...register("privacy")} className="select select-bordered w-full">
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>

            <select
              {...register("accessLevel")}
              className="select select-bordered w-full"
              disabled={!userStatus.isPremium}
            >
              <option value="Free">Free</option>
              <option value="Premium">Premium</option>
            </select>

            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
              <button
                type="button"
                onClick={() => document.getElementById("update_modal").close()}
                className="btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyLessons;
