import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield, FaUserSlash, FaEnvelope, FaGem, FaAward } from "react-icons/fa6";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import LoadingPage from "../../../component/LoadingPage/LoadingPage";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all users
  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Make Admin logic
  const handleMakeUser = (user) => {
    Swal.fire({
      title: "Promote to Admin?",
      text: `Are you sure you want to give Admin rights to ${user?.displayName || "this user"}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#14b8a6", // Teal-600
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Promote!",
      customClass: { popup: 'rounded-[2rem]' }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const roleInfo = { role: "admin" };
        const res = await axiosSecure.patch(`/users/${user._id}`, roleInfo);
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            icon: "success",
            title: "Promoted!",
            text: `${user.displayName} is now an Admin.`,
            confirmButtonColor: "#14b8a6",
            customClass: { popup: 'rounded-[2rem]' }
          });
        }
      }
    });
  };

  // Remove Admin logic
  const handleRemoveAdmin = (user) => {
    Swal.fire({
      title: "Remove Admin Rights?",
      text: `Demote ${user?.displayName || "this user"} to a regular user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e", // Rose-500
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Demote!",
      customClass: { popup: 'rounded-[2rem]' }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const roleInfo = { role: "user" };
        const res = await axiosSecure.patch(`/users/${user._id}`, roleInfo);
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            icon: "success",
            title: "Demoted!",
            text: `${user.displayName} is no longer an Admin.`,
            confirmButtonColor: "#14b8a6",
            customClass: { popup: 'rounded-[2rem]' }
          });
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* --- Header Section --- */}
      <div className="bg-white border-b border-slate-200 pt-12 pb-16 mb-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
               Manage <span className="text-teal-600">Users</span>
            </h2>
            <p className="text-slate-500 text-sm mt-2 font-medium">
              Oversee community members and manage system <span className="text-teal-600 font-bold">Roles & Permissions</span>.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <LoadingPage></LoadingPage>
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-6 px-8 text-[11px] font-black uppercase text-slate-400">User Profile</th>
                    <th className="py-6 text-[11px] font-black uppercase text-slate-400 text-center">Membership</th>
                    <th className="py-6 text-[11px] font-black uppercase text-slate-400 text-center">Role</th>
                    <th className="py-6 text-[11px] font-black uppercase text-slate-400 text-center">Contributions</th>
                    <th className="py-6 px-8 text-right text-[11px] font-black uppercase text-slate-400">Permissions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-slate-50/50 transition-colors group">
                      {/* Name & Email */}
                      <td className="py-6 px-8">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold border border-slate-200 group-hover:bg-teal-50 group-hover:text-teal-600 transition-all">
                                {user.displayName?.charAt(0) || "U"}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-black text-slate-800">{user.displayName}</span>
                                <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                                    <FaEnvelope size={10} /> {user.email}
                                </span>
                            </div>
                        </div>
                      </td>

                      {/* Plan Status */}
                      <td className="py-6 text-center">
                        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter inline-flex items-center gap-1.5 border ${
                          user.isPremium 
                          ? "bg-amber-50 text-amber-600 border-amber-100" 
                          : "bg-slate-100 text-slate-500 border-slate-200"
                        }`}>
                          {user.isPremium ? <FaGem size={10} /> : null}
                          {user.isPremium ? "Premium" : "Free Plan"}
                        </span>
                      </td>

                      {/* Role Badge */}
                      <td className="py-6 text-center">
                        <span className={`text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-widest border ${
                          user.role === "admin" 
                          ? "bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-100" 
                          : "bg-white text-slate-400 border-slate-200"
                        }`}>
                          {user.role}
                        </span>
                      </td>

                      {/* Total Lessons */}
                      <td className="py-6 text-center">
                        <div className="flex flex-col items-center">
                            <span className="text-sm font-black text-slate-700">{user.totalLessons || 0}</span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Lessons</span>
                        </div>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-6 px-8 text-right">
                        <div className="flex justify-end">
                          {user.role === "admin" ? (
                            <button
                              onClick={() => handleRemoveAdmin(user)}
                              className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all border border-rose-100"
                            >
                              <FaUserSlash size={12}/> Remove Admin
                            </button>
                          ) : (
                            <button
                              onClick={() => handleMakeUser(user)}
                              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-teal-600 transition-all border border-slate-900"
                            >
                              <FaUserShield size={12}/> Make Admin
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;