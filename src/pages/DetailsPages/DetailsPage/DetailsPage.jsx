import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import InformationSection from '../InformationSection/InformationSection';
import MetadataSection from '../MetadataSection/MetadataSection';
import CreatorSection from '../CreatorSection/CreatorSection';
import EngagementSection from '../EngagementSection/EngagementSection';
import CommentSection from '../CommentSection/CommentSection';
import SimilarLessons from '../SimilarLessons/SimilarLessons';
import InteractionButtons from '../InteractionButtons/InteractionButtons';

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
console.log(lesson);

if (isLoading) {
  return (
    <div className="flex justify-center items-center h-64">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
}
  return (
    
    <div>
      <InformationSection lesson={lesson}></InformationSection>
      <MetadataSection lesson={lesson}></MetadataSection>
      <CreatorSection lesson={lesson}></CreatorSection>
      <InteractionButtons lesson={lesson}></InteractionButtons>
      <EngagementSection lesson={lesson}></EngagementSection>
      <CommentSection lesson={lesson}></CommentSection>
      <SimilarLessons lessonId={lesson._id}></SimilarLessons>
    </div>
  );
};

export default DetailsPage;