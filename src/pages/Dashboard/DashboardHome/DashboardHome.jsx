import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaPlusCircle, FaBookOpen, FaHeart, FaChartPie } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: summary = {}, isLoading } = useQuery({
    queryKey: ["dashboard-summary", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/summary/${user.email}`);
      return res.data;
    },
  });

  // analytics
  const { data: analytics = [] } = useQuery({
    queryKey: ["user-analytics", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/analytics/${user.email}`);
      return res.data;
    },
  });
  const chartData = analytics.map((item) => ({
    month: item._id.month,
    category: item._id.category,
    tone: item._id.tone,
    total: item.total,
  }));

  if (isLoading)
    return (
      <div className="flex justify-center py-16">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8 text-center">
        📊 Dashboard Overview
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body text-center">
            <FaBookOpen className="text-4xl text-blue-500 mx-auto mb-2" />
            <h3 className="text-xl font-semibold">Total Lessons</h3>
            <p className="text-3xl font-bold">{summary.totalLessons}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body text-center">
            <FaHeart className="text-4xl text-rose-500 mx-auto mb-2" />
            <h3 className="text-xl font-semibold">Total Favorites</h3>
            <p className="text-3xl font-bold">{summary.totalFavorites}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body text-center">
            <FaChartPie className="text-4xl text-emerald-500 mx-auto mb-2" />
            <h3 className="text-xl font-semibold">Weekly Reflections</h3>
            <p className="text-3xl font-bold">
              {Math.floor(Math.random() * 10 + 5)}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Lessons */}
      <div className="bg-base-100 shadow-md rounded-xl p-6 border border-base-300 mb-10">
        <h3 className="text-2xl font-semibold mb-4">
          🕒 Recently Added Lessons
        </h3>
        {summary.recentLessons?.length === 0 ? (
          <p className="text-gray-500">You haven’t added any lessons yet.</p>
        ) : (
          <div className="space-y-3">
            {summary.recentLessons.map((lesson) => (
              <div
                key={lesson._id}
                className="flex justify-between items-center bg-base-200 p-3 rounded-lg"
              >
                <div>
                  <h4 className="font-semibold">{lesson.title}</h4>
                  <p className="text-sm text-gray-500">{lesson.category}</p>
                </div>
                <Link
                  to={`/public-lessons/${lesson._id}`}
                  className="btn btn-sm btn-outline btn-primary"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-base-100 shadow-md rounded-xl p-6 border border-base-300 mb-10">
        <h3 className="text-2xl font-semibold mb-4">⚡ Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Link to="/dashboard/add-lessons" className="btn btn-primary gap-2">
            <FaPlusCircle /> Add New Lesson
          </Link>
          <Link
            to="/dashboard/my-lessons"
            className="btn btn-outline btn-success"
          >
            My Lessons
          </Link>
          <Link
            to="/dashboard/my-favorites"
            className="btn btn-outline btn-info"
          >
            My Favorites
          </Link>
        </div>
      </div>

      {/* Analytics Chart */}
      <div className="bg-base-100 shadow-md rounded-xl p-6 border border-base-300">
        <h3 className="text-2xl font-semibold mb-4">
          📈 Weekly Contribution Chart
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis
              dataKey="month"
              tickFormatter={(m) =>
                [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ][m - 1]
              }
            />
            <Tooltip
              formatter={(value, name, props) => [
                `${value} Lessons`,
                `Tone: ${props.payload.tone}, Category: ${props.payload.category}`,
              ]}
            />
            <Legend />
            <Bar dataKey="total" fill="#3B82F6" name="Lessons" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardHome;
