import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaBookOpen, FaFlag, FaStar, FaCalendarDay, FaArrowTrendUp, FaCircleCheck } from "react-icons/fa6";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Cell } from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import LoadingPage from "../../../component/LoadingPage/LoadingPage";

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
      <LoadingPage></LoadingPage>
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

  const chartData = monthlyGrowth.map((m) => {
    const userMonth = userGrowth.find((u) => u._id.month === m._id.month);
    return {
      month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m._id.month - 1],
      lessons: m.lessons,
      users: userMonth ? userMonth.users : 0,
    };
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* --- Admin Header --- */}
      <div className="bg-white border-b border-slate-200 pt-12 pb-16 mb-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Admin <span className="text-teal-600">Overview</span>
            </h2>
            <p className="text-slate-500 text-sm mt-2 font-medium italic">
              System performance and community growth analytics at a glance.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* --- Summary Cards --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {[
            { label: "Total Users", val: totalUsers, icon: <FaUsers />, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Lessons", val: totalPublicLessons, icon: <FaBookOpen />, color: "text-teal-600", bg: "bg-teal-50" },
            { label: "Reports", val: totalReports, icon: <FaFlag />, color: "text-rose-600", bg: "bg-rose-50" },
            { label: "Today's New", val: todaysLessons, icon: <FaCalendarDay />, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Top Creators", val: topContributors.length, icon: <FaStar />, color: "text-purple-600", bg: "bg-purple-50" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col items-center text-center"
            >
              <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center text-xl mb-4`}>
                {item.icon}
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{item.label}</h3>
              <p className="text-2xl font-black text-slate-800">{item.val}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* --- Growth Analytics Chart --- */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
            <h3 className="text-xl font-black text-slate-800 tracking-tight mb-8 flex items-center gap-2">
              Growth <span className="text-teal-600">Analytics</span> <FaArrowTrendUp className="text-teal-500" size={16}/>
            </h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}}
                  />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                  <Legend iconType="circle" wrapperStyle={{paddingTop: '20px', fontWeight: 'bold', fontSize: '12px'}} />
                  <Bar dataKey="lessons" name="New Lessons" fill="#0f172a" radius={[6, 6, 0, 0]} barSize={30} />
                  <Bar dataKey="users" name="New Users" fill="#14b8a6" radius={[6, 6, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* --- Top Contributors List --- */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm h-full">
            <h3 className="text-xl font-black text-slate-800 tracking-tight mb-6">🏆 Hall of Fame</h3>
            <div className="space-y-4">
              {topContributors.map((user, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-teal-200 transition-all group"
                >
                  <div className="relative">
                    <img
                      src={user.creatorPhoto || "https://i.ibb.co/4fY8K6V/default-avatar.png"}
                      alt="user"
                      className="w-12 h-12 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform"
                    />
                    {idx === 0 && (
                        <div className="absolute -top-2 -right-2 bg-amber-400 text-white p-1 rounded-full border-2 border-white">
                            <FaStar size={8} />
                        </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-black text-slate-800 truncate">{user.creatorName}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                        <FaCircleCheck className="text-teal-500" size={10} />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        {user.totalLessons} Lessons
                        </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {topContributors.length === 0 && (
                  <p className="text-slate-400 text-sm italic text-center py-10">No data found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;