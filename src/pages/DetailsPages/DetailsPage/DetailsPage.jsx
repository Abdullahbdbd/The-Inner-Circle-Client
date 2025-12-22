import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

// Components
import InformationSection from "../InformationSection/InformationSection";
import MetadataSection from "../MetadataSection/MetadataSection";
import CreatorSection from "../CreatorSection/CreatorSection";
import EngagementSection from "../EngagementSection/EngagementSection";
import CommentSection from "../CommentSection/CommentSection";
import SimilarLessons from "../SimilarLessons/SimilarLessons";
import InteractionButtons from "../InteractionButtons/InteractionButtons";
import LoadingPage from "../../../component/LoadingPage/LoadingPage";

const DetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: lesson, isLoading } = useQuery({
    queryKey: ["lesson", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/public-lessons/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
     <LoadingPage></LoadingPage>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* --- Main Post Card (ইমেজটি যেভাবে আছে) --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] shadow-xl shadow-slate-200 overflow-hidden border border-slate-100"
        >
          {/* 1. InformationSection (যা ইমেজের জায়গা নিবে) */}
          <div className="w-full">
            <InformationSection lesson={lesson} />
          </div>

          {/* 2. Card Bottom Area (Creator & Buttons) */}
          <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-50">
            {/* Bottom Left: Creator Section */}
            <div className="flex items-center">
              <CreatorSection lesson={lesson} />
            </div>

            {/* Bottom Right: Interaction Buttons */}
            <div className="flex items-center gap-2">
              <InteractionButtons lesson={lesson} />
            </div>
          </div>

          <div className="p-8 bg-white">
            <CommentSection lesson={lesson} />
          </div>

          <div className="p-8 bg-white">
            <MetadataSection lesson={lesson} />
          </div>

          <div className="px-8 py-4 bg-slate-50/50 border-y border-slate-50">
            <EngagementSection lesson={lesson} />
          </div>
        </motion.div>

        {/* --- Similar Lessons (কার্ডের বাইরে নিচে) --- */}
        <div className="mt-12">
          <SimilarLessons lessonId={lesson._id} />
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
