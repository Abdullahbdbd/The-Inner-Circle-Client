import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaHome, FaArrowRight } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 font-sans">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 p-8 md:p-12 max-w-lg w-full"
      >
        <FaExclamationTriangle className="text-6xl text-rose-500 mx-auto mb-6 animate-bounce-slow" />
        
        <h1 className="text-7xl md:text-8xl font-black text-slate-800 mb-4 leading-tight">
          4<span className="text-teal-600">0</span>4
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-700 mb-4 tracking-tight">
          Page Not <span className="text-teal-600">Found</span>
        </h2>
        
        <p className="text-slate-500 text-lg mb-8 leading-relaxed">
          Oops! It looks like the page you are looking for does not exist.
          Please check the URL or navigate back to the homepage.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center gap-3 px-8 py-4 bg-teal-600 text-white font-bold rounded-xl shadow-lg shadow-teal-100 
                     hover:bg-teal-700 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
        >
          <FaHome className="text-xl" />
          <span className="text-lg">Go to Homepage</span>
          <FaArrowRight className="ml-1 text-sm group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-12 text-slate-400 text-sm"
      >
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;