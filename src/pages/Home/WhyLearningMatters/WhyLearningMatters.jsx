import React from "react";
import { FaLightbulb, FaHeart, FaUsers, FaChartLine } from "react-icons/fa";

const WhyLearningMatters = () => {
  const benefits = [
    {
      icon: <FaLightbulb className="text-yellow-500 text-4xl mb-3" />,
      title: "Gain Real-World Wisdom",
      desc: "Books teach knowledge, but life teaches understanding. Learning from real experiences gives you wisdom that can’t be learned in classrooms.",
    },
    {
      icon: <FaHeart className="text-rose-500 text-4xl mb-3" />,
      title: "Build Emotional Resilience",
      desc: "Every challenge you face strengthens your emotional intelligence. Learning from your past helps you handle future struggles with confidence and empathy.",
    },
    {
      icon: <FaUsers className="text-blue-500 text-4xl mb-3" />,
      title: "Inspire and Connect With Others",
      desc: "When you share your life lessons, you not only reflect on your own journey but also inspire others to grow, heal, and find direction.",
    },
    {
      icon: <FaChartLine className="text-emerald-500 text-4xl mb-3" />,
      title: "Grow Continuously",
      desc: "Life is the greatest teacher. Every mistake, success, and moment is an opportunity to evolve, improve, and become the best version of yourself.",
    },
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          🌱 Why Learning From Life Matters
        </h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Life itself is a classroom. Every experience — good or bad — holds a
          lesson that shapes who we are and how we grow. Discover the power of
          reflection, growth, and shared wisdom.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition p-6"
            >
              <div className="flex flex-col items-center text-center">
                {b.icon}
                <h3 className="font-semibold text-lg mb-2">{b.title}</h3>
                <p className="text-gray-600 text-sm">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyLearningMatters;
