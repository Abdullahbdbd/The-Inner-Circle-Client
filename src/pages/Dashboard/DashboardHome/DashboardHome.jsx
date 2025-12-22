import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaPlus, FaBookOpen, FaHeart, FaChartPie, FaChevronRight, FaArrowTrendUp } from "react-icons/fa6";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  Cell
} from "recharts";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import LoadingPage from "../../../component/LoadingPage/LoadingPage";

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

  const { data: analytics = [] } = useQuery({
    queryKey: ["user-analytics", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/analytics/${user.email}`);
      return res.data;
    },
  });

  const chartData = analytics.map((item) => ({
    month: item._id.month,
    total: item.total,
    category: item._id.category,
  }));

  if (isLoading) return (
   <LoadingPage></LoadingPage>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* --- Header --- */}
      <div className="bg-white border-b border-slate-200 pt-12 pb-16 mb-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">
              Welcome back, <span className="text-teal-600">{user?.displayName?.split(' ')[0] || 'User'}!</span> 
            </h2>
            <p className="text-slate-500 text-sm mt-2 font-medium">Here's what's happening with your lessons today.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* --- Summary Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Total Lessons", val: summary.totalLessons, icon: <FaBookOpen />, color: "bg-blue-50 text-blue-600" },
            { label: "Total Favorites", val: summary.totalFavorites, icon: <FaHeart />, color: "bg-rose-50 text-rose-600" },
            { label: "Reflections", val: Math.floor(Math.random() * 10 + 5), icon: <FaChartPie />, color: "bg-teal-50 text-teal-600" }
          ].map((card, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center justify-between"
            >
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">{card.label}</p>
                <h3 className="text-4xl font-black text-slate-800">{card.val}</h3>
              </div>
              <div className={`w-14 h-14 ${card.color} rounded-2xl flex items-center justify-center text-xl shadow-inner`}>
                {card.icon}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- Recent Lessons --- */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Recently Added</h3>
                <Link to="/dashboard/my-lessons" className="text-teal-600 text-xs font-bold flex items-center gap-1 hover:underline">View All <FaChevronRight size={10}/></Link>
              </div>
              
              <div className="space-y-4">
                {summary.recentLessons?.length === 0 ? (
                  <p className="text-slate-400 italic text-sm py-4">No lessons added yet.</p>
                ) : (
                  summary.recentLessons.slice(0, 4).map((lesson) => (
                    <div key={lesson._id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-teal-200 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all">
                           <FaBookOpen size={14}/>
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-slate-700">{lesson.title}</h4>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{lesson.category}</p>
                        </div>
                      </div>
                      <Link to={`/public-lessons/${lesson._id}`} className="p-2 text-slate-400 hover:text-teal-600"><FaChevronRight/></Link>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* --- Chart Area --- */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
              <h3 className="text-xl font-black text-slate-800 tracking-tight mb-8 flex items-center gap-2">
                Contribution <span className="text-teal-600">Analytics</span> <FaArrowTrendUp className="text-teal-500" size={16}/>
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}}
                      tickFormatter={(m) => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m - 1]}
                    />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip 
                      cursor={{fill: '#f8fafc'}}
                      contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}}
                    />
                    <Bar dataKey="total" radius={[6, 6, 0, 0]} barSize={35}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#14b8a6' : '#0f172a'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* --- Sidebar Quick Actions --- */}
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl shadow-slate-300/50">
              <h3 className="text-lg font-black mb-6 tracking-tight">Quick Actions</h3>
              <div className="flex flex-col gap-3">
                <Link to="/dashboard/add-lessons" className="flex items-center justify-between bg-teal-600 p-4 rounded-2xl hover:bg-teal-500 transition-all group">
                  <span className="text-xs font-black uppercase tracking-widest">New Lesson</span>
                  <FaPlus className="group-hover:rotate-90 transition-transform"/>
                </Link>
                <Link to="/dashboard/my-lessons" className="flex items-center justify-between bg-slate-800 p-4 rounded-2xl hover:bg-slate-700 transition-all">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-300">My Lessons</span>
                  <FaChevronRight size={12}/>
                </Link>
                <Link to="/dashboard/my-favorites" className="flex items-center justify-between bg-slate-800 p-4 rounded-2xl hover:bg-slate-700 transition-all">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-300">My Favorites</span>
                  <FaHeart size={12} className="text-rose-500"/>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 mb-4">
                 <FaRocket size={20}/>
              </div>
              <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">Pro Tip</h4>
              <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed">
                Regularly updating your lessons increases community engagement by up to 40%. Keep sharing!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;