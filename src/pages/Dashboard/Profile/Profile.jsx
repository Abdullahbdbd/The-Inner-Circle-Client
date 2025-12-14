import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  // Load user info from MongoDB
  const { data: dbUser = {}, refetch } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      reset(res.data);
      return res.data;
    },
  });

  // Handle update
  const handleUpdate = async (data) => {
    try {
      await axiosSecure.patch(`/users/${user.email}`, data);
      await updateUserProfile({
        displayName: data.displayName,
        photoURL: data.photoURL,
      });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      refetch();
    } catch (err) {
      toast.error("Update failed!", err.message);
    }
  };

  // User lessons & favorites count
  const { data: myLessons = [] } = useQuery({
    queryKey: ["my-lessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-lessons?email=${user.email}`);
      return res.data;
    },
  });

  const lessonsCount = myLessons.length;
  const totalFavorites = myLessons.reduce(
    (acc, lesson) => acc + (lesson.favoritesCount || 0),
    0
  );

  // Filter user's public lessons only
  const publicLessons = myLessons.filter((l) => l.privacy === "Public");

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-center mb-8">👤 My Profile</h2>

      {/* Profile Card */}
      <div className="card bg-base-100 shadow-xl w-full max-w-2xl mx-auto p-6 border border-base-300">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Avatar */}
          <div className="avatar">
            <div className="w-28 h-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={dbUser.photoURL || user?.photoURL || "/default-avatar.png"}
                alt="profile"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-semibold flex items-center justify-center md:justify-start gap-2">
              {dbUser.displayName || user.displayName}
              {dbUser.isPremium && (
                <span className="text-yellow-500 flex items-center gap-1">
                  <FaStar /> Premium
                </span>
              )}
            </h3>
            <p className="text-gray-500">{user.email}</p>
            <p>Total Lessons: {lessonsCount}</p>
            <p>Total Favorites: {totalFavorites}</p>

            <button
              className="btn btn-outline btn-sm mt-3"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* ✏️ Edit Modal */}
      {isEditing && (
        <dialog id="edit_profile_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Update Profile</h3>
            <form onSubmit={handleSubmit(handleUpdate)} className="space-y-3">
              <input
                {...register("displayName")}
                placeholder="Display Name"
                className="input input-bordered w-full"
                defaultValue={dbUser.displayName}
              />

              <input
                {...register("photoURL")}
                placeholder="Photo URL"
                className="input input-bordered w-full"
                defaultValue={dbUser.photoURL}
              />

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      {/* 🧾 Public Lessons by this user */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          🌟 My Public Lessons
        </h3>

        {publicLessons.length === 0 ? (
          <p className="text-gray-500 text-center">
            You haven’t published any public lessons yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicLessons.map((lesson) => (
              <div
                key={lesson._id}
                className="card bg-base-100 shadow-md hover:shadow-lg transition border border-base-300"
              >
                <div className="card-body">
                  <h3 className="font-semibold text-lg">{lesson.title}</h3>
                  <p className="text-sm text-gray-600">
                    {lesson.description.slice(0, 100)}...
                  </p>
                  <div className="flex justify-between items-center mt-3 text-sm">
                    <span className="badge badge-outline">{lesson.category}</span>
                    <span className="badge badge-outline">{lesson.tone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
