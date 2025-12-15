import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaBookOpen, FaFlag, FaStar, FaCalendarDay } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: summary = {}, isLoading } = useQuery({
    queryKey: ["admin-summary"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-summary");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );

  const {
    totalUsers,
    totalPublicLessons,
    totalReports,
    topContributors = [],
    todaysLessons,
    monthlyGrowth = [],
    userGrowth = [],
  } = summary;

  // Merge user + lesson growth into one chart dataset
  const chartData = monthlyGrowth.map((m) => {
    const userMonth = userGrowth.find((u) => u._id.month === m._id.month);
    return {
      month: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ][m._id.month - 1],
      lessons: m.lessons,
      users: userMonth ? userMonth.users : 0,
    };
  });

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-center mb-8">📊 Admin Dashboard Overview</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
        <div className="card bg-base-100 shadow border border-base-300">
          <div className="card-body text-center">
            <FaUsers className="text-4xl text-blue-500 mx-auto mb-2" />
            <h3 className="font-semibold">Total Users</h3>
            <p className="text-2xl font-bold">{totalUsers}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow border border-base-300">
          <div className="card-body text-center">
            <FaBookOpen className="text-4xl text-emerald-500 mx-auto mb-2" />
            <h3 className="font-semibold">Public Lessons</h3>
            <p className="text-2xl font-bold">{totalPublicLessons}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow border border-base-300">
          <div className="card-body text-center">
            <FaFlag className="text-4xl text-rose-500 mx-auto mb-2" />
            <h3 className="font-semibold">Reported Lessons</h3>
            <p className="text-2xl font-bold">{totalReports}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow border border-base-300">
          <div className="card-body text-center">
            <FaCalendarDay className="text-4xl text-yellow-500 mx-auto mb-2" />
            <h3 className="font-semibold">Today’s New</h3>
            <p className="text-2xl font-bold">{todaysLessons}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow border border-base-300">
          <div className="card-body text-center">
            <FaStar className="text-4xl text-purple-500 mx-auto mb-2" />
            <h3 className="font-semibold">Top Contributors</h3>
            <p className="text-lg font-bold">{topContributors.length}</p>
          </div>
        </div>
      </div>

      {/* Top Contributors */}
      <div className="bg-base-100 shadow border border-base-300 rounded-xl p-6 mb-10">
        <h3 className="text-2xl font-semibold mb-4">🏆 Top Contributors</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {topContributors.map((user, idx) => (
            <div
              key={idx}
              className="flex items-center bg-base-200 p-3 rounded-lg gap-3"
            >
              <img
                src={user.creatorPhoto || "https://i.ibb.co.com/4fY8K6V/default-avatar.png"}
                alt="user"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{user.creatorName}</p>
                <p className="text-sm text-gray-500">
                  {user.totalLessons} Lessons
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-base-100 shadow border border-base-300 rounded-xl p-6">
        <h3 className="text-2xl font-semibold mb-4">📈 Growth Analytics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="lessons" fill="#3B82F6" name="Lessons" radius={[4,4,0,0]} />
            <Bar dataKey="users" fill="#10B981" name="Users" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
