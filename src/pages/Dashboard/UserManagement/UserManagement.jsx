import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield, FaUserSlash } from "react-icons/fa6";
import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

// Make User an Admin
const handleMakeUser = (user) => {
  Swal.fire({
    title: "Are you sure?",
    text: `You are about to make ${user?.name || 'this user'} an Admin!`,
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
          title: `${user?.name || 'This user'} is now an Admin `,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  });
};


// Remove Admin 
const handleRemoveAdmin = (user) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won’t be able to revert this!",
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
          title: `This user is no longer an Admin`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  });
};


  return (
    <div>
      <h1>Users:{users.length}</h1>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Plan</th>
              <th>Role</th>
              <th>Role Toggle</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="text-sm opacity-50">{user.email}</div>
                </td>
                <td>{user.isPremium === true ? "Premium" : "Free"}</td>
                <td>{user.role}</td>
                <th>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn bg-red-500"
                    >
                      <FaUserSlash />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeUser(user)}
                      className="btn bg-green-500"
                    >
                      <FaUserShield></FaUserShield>
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
