import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrash, FaEye } from "react-icons/fa";

const ReportedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedReport, setSelectedReport] = useState(null);

  // Load all reported lessons
  const { data: reports = [], refetch, isLoading } = useQuery({
    queryKey: ["reported-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reported-lessons");
      return res.data;
    },
  });

  // Delete lesson
  const handleDeleteLesson = (lessonId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This lesson will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/lessons/${lessonId}`);
        await axiosSecure.delete(`/reports/${lessonId}`);
        refetch();
        Swal.fire("Deleted!", "Lesson and reports removed.", "success");
      }
    });
  };

  // Ignore (remove all reports without deleting lesson)
  const handleIgnoreReports = async (lessonId) => {
    await axiosSecure.delete(`/reports/${lessonId}`);
    refetch();
    Swal.fire({
      icon: "success",
      title: "Reports ignored successfully!",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        🚩 Reported & Flagged Lessons
      </h2>

      {reports.length === 0 ? (
        <p className="text-center text-gray-500">
          🎉 No reports found. Everything looks clean!
        </p>
      ) : (
        <div className="overflow-x-auto shadow-lg border border-base-300 rounded-lg">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-base font-semibold">
              <tr>
                <th>#</th>
                <th>Lesson Title</th>
                <th>Reports</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={report._id}>
                  <td>{index + 1}</td>
                  <td>{report.title}</td>
                  <td>{report.reportCount}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-xs btn-info text-white"
                        onClick={() => setSelectedReport(report)}
                      >
                        <FaEye />
                      </button>
                      <button
                        className="btn btn-xs btn-error text-white"
                        onClick={() => handleDeleteLesson(report.lessonId)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for report details */}
      {selectedReport && (
        <dialog id="reportModal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-xl font-semibold mb-4">
              Lesson: {selectedReport.lessonTitle}
            </h3>
            <p className="mb-3 text-gray-600">
              Total Reports: {selectedReport.reportCount}
            </p>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {selectedReport.reports.map((r, i) => (
                <div
                  key={i}
                  className="border rounded-lg p-3 bg-base-200 text-sm"
                >
                  <p>
                    <strong>Reason:</strong> {r.reason}
                  </p>
                  <p>
                    <strong>Reporter:</strong> {r.reporterEmail}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {new Date(r.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={() => setSelectedReport(null)}
              >
                Close
              </button>
              <button
                className="btn btn-warning"
                onClick={() => {
                  handleIgnoreReports(selectedReport.lessonId);
                  setSelectedReport(null);
                }}
              >
                Ignore Reports
              </button>
              <button
                className="btn btn-error"
                onClick={() => {
                  handleDeleteLesson(selectedReport.lessonId);
                  setSelectedReport(null);
                }}
              >
                Delete Lesson
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ReportedLessons;
