import React, { useEffect, useState, useMemo } from "react";
import { FaLock, FaSearch, FaCalendarAlt, FaUserEdit, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserStatus from "../../hooks/useUserStatus";
import { Link } from "react-router";
import { motion } from "framer-motion";
import LoadingPage from "../../component/LoadingPage/LoadingPage";

const PublicLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isPremium } = useUserStatus();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");
  const [sort, setSort] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const lessonsPerPage = 6;

  useEffect(() => {
    axiosSecure.get("/public-lessons")
      .then((res) => {
        setLessons(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosSecure]);

  const filteredLessons = useMemo(() => {
    let filtered = [...lessons];
    if (search) {
      filtered = filtered.filter((lesson) =>
        lesson.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category) filtered = filtered.filter((l) => l.category === category);
    if (tone) filtered = filtered.filter((l) => l.tone === tone);

    if (sort === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === "mostSaved") {
      filtered.sort((a, b) => (b.favoritesCount || 0) - (a.favoritesCount || 0));
    }
    return filtered;
  }, [lessons, search, category, tone, sort]);

  const totalPages = Math.ceil(filteredLessons.length / lessonsPerPage);
  const startIndex = (currentPage - 1) * lessonsPerPage;
  const paginatedLessons = filteredLessons.slice(startIndex, startIndex + lessonsPerPage);

  if (loading) return (
    <LoadingPage></LoadingPage>
  );

  const uniqueCategories = [...new Set(lessons.map((l) => l.category))];
  const uniqueTones = [...new Set(lessons.map((l) => l.tone))];

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* --- Compact Hero Section --- */}
      <div className="bg-white border-b border-slate-200 mb-8">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-2 tracking-tight">
            Library of <span className="text-teal-600 italic">Wisdom</span>
          </h1>
          <p className="text-slate-500 text-sm max-w-xl mx-auto font-medium">
            Explore community-shared life lessons and insights.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* --- Sleek Filter Bar --- */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-wrap gap-3 items-center mb-10">
          <div className="relative flex-grow min-w-[200px]">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-3" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-teal-500/20 text-sm"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <select className="bg-slate-50 border-none rounded-xl py-2 px-3 text-xs font-bold text-slate-600 outline-none" value={category} onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }}>
              <option value="">Category</option>
              {uniqueCategories.map(cat => <option key={cat}>{cat}</option>)}
            </select>

            <select className="bg-slate-50 border-none rounded-xl py-2 px-3 text-xs font-bold text-slate-600 outline-none" value={tone} onChange={(e) => { setTone(e.target.value); setCurrentPage(1); }}>
              <option value="">Tone</option>
              {uniqueTones.map(t => <option key={t}>{t}</option>)}
            </select>

            <select className="bg-slate-50 border-none rounded-xl py-2 px-3 text-xs font-bold text-teal-600 outline-none" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="mostSaved">Popular</option>
            </select>
          </div>
        </div>

        {/* --- Smaller Grid Cards --- */}
        {paginatedLessons.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
             <MdOutlineExplore className="text-4xl text-slate-300 mx-auto mb-3" />
             <p className="text-slate-500 text-sm font-bold">No results found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedLessons.map((lesson) => {
              const isLocked = lesson.accessLevel === "Premium" && !isPremium;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  key={lesson._id}
                  className="bg-white rounded-[1.8rem] border border-slate-100 p-6 flex flex-col hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 relative group overflow-hidden"
                >
                  {/* Category & Badge (Compact) */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-teal-50 text-teal-700 text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md">
                      {lesson.category}
                    </span>
                    <span className={`text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-wider ${lesson.accessLevel === "Premium" ? "bg-amber-50 text-amber-600 border border-amber-100" : "bg-green-50 text-green-600 border border-green-100"}`}>
                      {lesson.accessLevel}
                    </span>
                  </div>

                  {/* Content (Shorter) */}
                  <div className={`flex-grow ${isLocked ? "blur-[6px] opacity-30 select-none pointer-events-none" : ""}`}>
                    <h2 className="text-lg font-bold text-slate-800 leading-tight mb-2 group-hover:text-teal-600 transition-colors line-clamp-1">
                      {lesson.title}
                    </h2>
                    <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2">
                      {lesson.description}
                    </p>

                    <div className="flex gap-3 mb-6">
                       <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase">
                          <FaUserEdit className="text-teal-500" /> {lesson.tone}
                       </div>
                       <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase">
                          <FaCalendarAlt className="text-teal-500" /> {new Date(lesson.createdAt).toLocaleDateString()}
                       </div>
                    </div>
                  </div>

                  {/* Creator & Link (Compact) */}
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                      <img src={lesson.creatorPhoto} className="w-6 h-6 rounded-full border border-teal-50" alt="" />
                      <span className="text-[10px] font-bold text-slate-700 truncate">{lesson.creatorName}</span>
                    </div>
                    
                    <Link
                      to={isLocked ? "/upgrade" : `/public-lessons/${lesson._id}`}
                      className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ${isLocked ? 'text-slate-300 pointer-events-none' : 'text-teal-600 hover:text-teal-700 transition-colors'}`}
                    >
                      {isLocked ? 'Locked' : 'Details'} <FaChevronRight size={8} />
                    </Link>
                  </div>

                  {/* Lock Overlay (Compact) */}
                  {isLocked && (
                    <div className="absolute inset-0 z-10 bg-white/30 flex flex-col items-center justify-center p-4 text-center">
                       <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-100 max-w-[160px]">
                          <FaLock className="text-amber-500 mx-auto mb-2 text-sm" />
                          <h4 className="text-[10px] font-black text-slate-800 uppercase mb-1">Premium</h4>
                          <Link to="/upgrade" className="text-[9px] font-bold text-teal-600 hover:underline">Unlock →</Link>
                       </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* --- Compact Pagination --- */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => { setCurrentPage(prev => prev - 1); window.scrollTo(0,0); }}
              className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-teal-50 transition-colors disabled:opacity-20"
            >
              <FaChevronLeft size={10} className="text-slate-600" />
            </button>

            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setCurrentPage(idx + 1); window.scrollTo(0,0); }}
                  className={`w-9 h-9 rounded-xl font-black text-[10px] transition-all ${currentPage === idx + 1 ? 'bg-teal-600 text-white shadow-md shadow-teal-200' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo(0,0); }}
              className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-teal-50 transition-colors disabled:opacity-20"
            >
              <FaChevronRight size={10} className="text-slate-600" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicLessons;