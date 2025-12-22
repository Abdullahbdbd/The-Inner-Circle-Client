import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { FaAward, FaMedal, FaStar } from "react-icons/fa";
import LoadingPage from "../../../component/LoadingPage/LoadingPage";

const TopContributors = () => {
  const axiosSecure = useAxiosSecure();
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const res = await axiosSecure.get("/top-contributors");
        setContributors(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchContributors();
  }, [axiosSecure]);

  if (loading)
    return (
      <LoadingPage></LoadingPage>
    );

  if (contributors.length === 0) return null;

  // র‍্যাঙ্ক অনুযায়ী আইকন এবং কালার সেট করা
  const getRankStyle = (index) => {
    switch (index) {
      case 0: return { icon: <FaAward />, color: "text-yellow-500", label: "Champion" };
      case 1: return { icon: <FaMedal />, color: "text-slate-400", label: "Silver" };
      case 2: return { icon: <FaMedal />, color: "text-orange-400", label: "Bronze" };
      default: return { icon: <FaStar />, color: "text-teal-400", label: "Contributor" };
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center items-center gap-2 mb-4"
          >
            <span className="w-10 h-[2px] bg-teal-500"></span>
            <span className="text-teal-600 font-bold uppercase tracking-[4px] text-xs">Hall of Fame</span>
            <span className="w-10 h-[2px] bg-teal-500"></span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800">
             Top <span className="text-teal-500">Contributors</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto">
            Honoring the brilliant minds who shared the most wisdom this week.
          </p>
        </div>

        {/* Contributors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {contributors.map((user, i) => {
            const rank = getRankStyle(i);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group bg-slate-50 border border-slate-100 p-8 rounded-[2.5rem] flex flex-col items-center transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-teal-500/10"
              >
                {/* Ranking Badge */}
                <div className={`absolute -top-4 right-8 bg-white shadow-lg p-3 rounded-2xl ${rank.color} text-xl transform group-hover:rotate-12 transition-transform`}>
                  {rank.icon}
                </div>

                {/* Avatar with Ring Animation */}
                <div className="relative mb-6">
                  <div className={`absolute inset-0 rounded-full blur-md opacity-0 transition-opacity bg-teal-500 scale-110`}></div>
                  <div className="relative w-24 h-24 rounded-full p-1 border-2 border-teal-500/20 transition-colors duration-500">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      src={user.creatorPhoto || "https://i.ibb.co/vYvYmXG/user.png"}
                      alt={user.creatorName}
                    />
                  </div>
                </div>

                {/* User Info */}
                <div className="text-center">
                  <h3 className="font-black text-xl text-slate-800 mb-1 group-hover:text-teal-600 transition-colors">
                    {user.creatorName}
                  </h3>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-200/50 px-3 py-1 rounded-full group-hover:bg-teal-50 group-hover:text-teal-600 transition-all">
                      {rank.label}
                    </span>
                    <div className="mt-4 flex items-center justify-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 group-hover:border-teal-100 group-hover:bg-teal-50/30 transition-all">
                      <span className="text-2xl font-black text-teal-600 leading-none">
                        {user.totalLessons}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase text-left leading-[1] mt-1">
                        Lessons<br/>Shared
                      </span>
                    </div>
                  </div>
                </div>

                {/* Decorative Bottom Bar */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-teal-500 rounded-full group-hover:w-2/3 transition-all duration-500"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopContributors;