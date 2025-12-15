import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield, FaUserSlash } from "react-icons/fa6";
import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all users with total lessons
  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Make Admin
  const handleMakeUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to make ${user?.displayName || "this user"} an Admin!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const roleInfo = { role: "admin" };
        const res = await axiosSecure.patch(`/users/${user._id}`, roleInfo);
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.displayName || 'This user'} is now an Admin 🎉`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    });
  };

  //  Remove Admin
  const handleRemoveAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Remove ${user?.displayName || "this user"} from Admin role?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove admin!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const roleInfo = { role: "user" };
        const res = await axiosSecure.patch(`/users/${user._id}`, roleInfo);
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.displayName || 'This user'} is no longer an Admin`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">👥 Manage Users</h2>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-base-300">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Plan</th>
              <th>Role</th>
              <th>Total Lessons</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td className="font-semibold">{user.displayName}</td>
                <td>{user.email}</td>
                <td>{user.isPremium ? "Premium ⭐" : "Free"}</td>
                <td>
                  <span
                    className={`badge ${
                      user.role === "admin"
                        ? "badge-success"
                        : "badge-outline badge-neutral"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td>{user.totalLessons || 0}</td>
                <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn btn-sm btn-error text-white"
                    >
                      <FaUserSlash /> Remove
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeUser(user)}
                      className="btn btn-sm btn-success text-white"
                    >
                      <FaUserShield /> Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
