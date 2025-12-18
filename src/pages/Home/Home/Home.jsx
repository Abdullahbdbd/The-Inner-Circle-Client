import React from "react";
import Banner from "../Banner/Banner";
import FeaturedLessons from "../FeaturedLessons/FeaturedLessons";
import WhyLearningMatters from "../WhyLearningMatters/WhyLearningMatters";
import TopContributors from "../TopContributors/TopContributors";
import MostSavedLessons from "../MostSavedLessons/MostSavedLessons";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturedLessons></FeaturedLessons>
      <WhyLearningMatters></WhyLearningMatters>
      <TopContributors></TopContributors>
      <MostSavedLessons></MostSavedLessons>
    </div>
  );
};

export default Home;
