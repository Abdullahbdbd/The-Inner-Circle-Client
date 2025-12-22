import React from 'react';
import { motion } from 'framer-motion';

const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6">
      <div className="relative flex flex-col items-center">
        
        {/* --- মেইন এনিমেটেড লোগো/শেপ --- */}
        <div className="relative w-24 h-24 mb-8">
          {/* বাইরের ঘুরতে থাকা রিং */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute inset-0 border-t-4 border-b-4 border-teal-500 rounded-full"
          />
          
          {/* ভেতরের পালস করতে থাকা রিং */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-4 border-4 border-slate-200 rounded-full"
          />

          {/* মাঝখানের সলিড ডট */}
          <div className="absolute inset-[38%] bg-teal-600 rounded-full shadow-lg shadow-teal-200"></div>
        </div>

        {/* --- লোডিং টেক্সট --- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            Please <span className="text-teal-600">Wait</span>
          </h2>
          
          {/* এনিমেটেড ডট ডট */}
          <div className="flex justify-center gap-1 mt-2">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="w-1.5 h-1.5 bg-teal-400 rounded-full"
              />
            ))}
          </div>
          
          <p className="text-slate-400 text-sm font-medium mt-4 tracking-widest uppercase">
            Loading Content
          </p>
        </motion.div>

        {/* --- ব্যাকগ্রাউন্ড ডেকোরেশন (ঐচ্ছিক) --- */}
        <div className="absolute -z-10 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-50"></div>
      </div>
    </div>
  );
};

export default LoadingPage;