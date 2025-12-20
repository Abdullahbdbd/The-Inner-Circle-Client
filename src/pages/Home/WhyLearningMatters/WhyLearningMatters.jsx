import React from "react";
import { FaLightbulb, FaHeart, FaUsers, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";

const WhyLearningMatters = () => {
  const benefits = [
    {
      icon: <FaLightbulb />,
      title: "Unlock Hidden Perspectives",
      desc: "Life's challenges are lessons in disguise. Reflecting on them discovers unique viewpoints that sharpen your mind.",
      gradient: "from-teal-400 to-blue-500",
    },
    {
      icon: <FaHeart />,
      title: "Foster Deep Empathy",
      desc: "Understanding your own triumphs allows you to truly connect with others. Shared vulnerability is the foundation.",
      gradient: "from-fuchsia-500 to-rose-500",
    },
    {
      icon: <FaUsers />,
      title: "Impact Future Generations",
      desc: "Your stories are the blueprints for tomorrow. Leave behind a legacy of wisdom for others to follow and learn.",
      gradient: "from-cyan-400 to-blue-600",
    },
    {
      icon: <FaChartLine />,
      title: "Master Self-Reflection",
      desc: "True growth starts inward. Analyze experiences to decode patterns and master the art of living intentionally.",
      gradient: "from-indigo-400 to-purple-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
            <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center items-center gap-2 mb-4"
          >
            <span className="w-10 h-[2px] bg-teal-500"></span>
            <span className="text-teal-600 font-bold uppercase tracking-[4px] text-xs">Core Values</span>
            <span className="w-10 h-[2px] bg-teal-500"></span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-slate-800 mb-3"
          >
            Why Learning From <span className="text-teal-500">Life Matters</span>
          </motion.h2>
          <p className="text-slate-500 max-w-lg mx-auto text-sm italic">
            "The only real mistake is the one from which we learn nothing."
          </p>
        </div>

        {/* Small & Compact Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative bg-white rounded-[1.8rem] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-slate-100 flex flex-col h-full"
            >
              {/* Compact Gradient Header */}
              <div className={`h-28 w-full bg-gradient-to-br ${b.gradient} flex items-center justify-center relative`}>
                <div className="text-white text-4xl drop-shadow-lg z-10 transition-transform duration-500 group-hover:scale-110">
                  {b.icon}
                </div>
                {/* Step Number Background */}
                <div className="absolute -bottom-4 right-6 text-6xl font-black text-slate-900/5 select-none transition-colors group-hover:text-white/10">
                  0{i + 1}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 pt-8 flex flex-col flex-grow relative">
                <h3 className="text-lg font-extrabold text-slate-800 mb-2 leading-tight group-hover:text-teal-600 transition-colors">
                  {b.title}
                </h3>
                
                <div className="w-8 h-1 bg-gradient-to-r from-teal-400 to-blue-500 mb-3 rounded-full transition-all duration-500 group-hover:w-16"></div>

                <p className="text-slate-500 text-xs leading-relaxed font-medium">
                  {b.desc}
                </p>

                {/* Subtle Hover Action */}
                <div className="mt-4 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-teal-600 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  Reflect <span className="text-sm">→</span>
                </div>
              </div>

              {/* Bottom Decorative Line */}
              <div className={`h-1.5 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r ${b.gradient}`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyLearningMatters;