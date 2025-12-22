import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrash, FaEye, FaTriangleExclamation, FaClock, FaUserPen, FaXmark } from "react-icons/fa6";
import { IoShieldCheckmark } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import LoadingPage from "../../../component/LoadingPage/LoadingPage";

const ReportedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedReport, setSelectedReport] = useState(null);

  const { data: reports = [], refetch, isLoading } = useQuery({
    queryKey: ["reported-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reported-lessons");
      return res.data;
    },
  });

  const handleDeleteLesson = (lessonId) => {
    Swal.fire({
      title: "Confirm Deletion?",
      text: "This flagged lesson will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete Lesson",
      customClass: { popup: 'rounded-[2rem]' }
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/lessons/${lessonId}`);
        await axiosSecure.delete(`/reports/${lessonId}`);
        refetch();
        Swal.fire({
            title: "Action Taken",
            text: "Lesson removed from platform.",
            icon: "success",
            confirmButtonColor: "#14b8a6",
            customClass: { popup: 'rounded-[2rem]' }
        });
      }
    });
  };

  const handleIgnoreReports = async (lessonId) => {
    await axiosSecure.delete(`/reports/${lessonId}`);
    refetch();
    Swal.fire({
      icon: "success",
      title: "Reports Cleared",
      text: "The lesson is now marked as safe.",
      toast: true,
      position: 'top-end',
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* --- Header --- */}
      <div className="bg-white border-b border-slate-200 pt-12 pb-16 mb-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
               <FaTriangleExclamation className="text-rose-500 animate-pulse" size={28}/> 
               Moderation <span className="text-rose-600">Queue</span>
            </h2>
            <p className="text-slate-500 text-sm mt-2 font-medium">
              Review content reported by the community for <span className="text-rose-500 font-bold underline">Policy Violations</span>.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {isLoading ? (
          <div className="flex justify-center py-20"><LoadingPage></LoadingPage></div>
        ) : reports.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-[2.5rem] border border-slate-100 p-20 text-center shadow-sm">
            <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl">
                <IoShieldCheckmark />
            </div>
            <h3 className="text-2xl font-black text-slate-800">Clear Skies!</h3>
            <p className="text-slate-400 font-medium mt-2">No pending reports found in the database.</p>
          </motion.div>
        ) : (
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-400">
                    <th className="py-6 px-8 text-[11px] font-black uppercase">Lesson ID / Title</th>
                    <th className="py-6 text-[11px] font-black uppercase text-center">Alert Level</th>
                    <th className="py-6 text-[11px] font-black uppercase text-center">Total Reports</th>
                    <th className="py-6 px-8 text-right text-[11px] font-black uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {reports.map((report, index) => (
                    <tr key={report._id} className="hover:bg-rose-50/30 transition-colors">
                      <td className="py-6 px-8">
                        <div>
                          <p className="text-sm font-black text-slate-800 mb-1">{report.title}</p>
                          <p className="text-[10px] font-mono text-slate-400">REF: {report.lessonId.slice(-8).toUpperCase()}</p>
                        </div>
                      </td>
                      <td className="py-6 text-center">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                            report.reportCount > 5 ? 'bg-rose-100 text-rose-600 border-rose-200' : 'bg-amber-100 text-amber-600 border-amber-200'
                        }`}>
                          {report.reportCount > 5 ? 'Critical' : 'Warning'}
                        </span>
                      </td>
                      <td className="py-6 text-center font-black text-slate-700">{report.reportCount}</td>
                      <td className="py-6 px-8 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => setSelectedReport(report)} className="p-3 bg-slate-900 text-white rounded-xl hover:bg-teal-600 transition-all shadow-lg shadow-slate-200">
                            <FaEye size={14}/>
                          </button>
                          <button onClick={() => handleDeleteLesson(report.lessonId)} className="p-3 bg-white text-rose-600 border border-rose-100 rounded-xl hover:bg-rose-600 hover:text-white transition-all">
                            <FaTrash size={14}/>
                          </button>
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

      {/* --- Detailed Report Modal --- */}
      <AnimatePresence>
        {selectedReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="bg-rose-600 p-8 text-white flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-black tracking-tight">{selectedReport.title}</h3>
                  <p className="text-rose-100 text-xs mt-1 font-bold uppercase tracking-widest">Moderation Review Case</p>
                </div>
                <button onClick={() => setSelectedReport(null)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all">
                  <FaXmark size={20}/>
                </button>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-6 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase text-slate-400">Reports</p>
                    <p className="text-2xl font-black text-rose-600">{selectedReport.reportCount}</p>
                  </div>
                  <div className="h-10 w-[1px] bg-slate-200"></div>
                  <p className="text-sm font-medium text-slate-500 italic">"Please review each reporter's testimony carefully before taking action."</p>
                </div>

                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {selectedReport.reports.map((r, i) => (
                    <div key={i} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-rose-200 transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2 text-teal-600">
                           <FaUserPen size={12}/>
                           <span className="text-[11px] font-black">{r.reporterEmail}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                           <FaClock size={10}/> {new Date(r.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border-l-4 border-rose-500">
                         {r.reason}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex gap-3">
                  <button onClick={() => { handleIgnoreReports(selectedReport.lessonId); setSelectedReport(null); }}
                    className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-teal-50 hover:text-teal-600 transition-all border border-transparent hover:border-teal-100"
                  >
                    Dismiss Reports
                  </button>
                  <button onClick={() => { handleDeleteLesson(selectedReport.lessonId); setSelectedReport(null); }}
                    className="flex-1 py-4 bg-rose-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-rose-700 transition-all shadow-lg shadow-rose-200"
                  >
                    Ban Lesson
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReportedLessons;