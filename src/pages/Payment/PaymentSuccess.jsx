import React, { useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { FaCheckCircle, FaRocket, FaArrowRight } from "react-icons/fa";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#f8fafc] px-6 py-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-xl shadow-slate-200/50 text-center relative overflow-hidden"
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-teal-500"></div>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-50 rounded-full opacity-50"></div>

        {/* Success Icon Animation */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative inline-block"
        >
          <div className="w-20 h-20 bg-teal-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-teal-500 text-4xl" />
          </div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-1 -right-1"
          >
            <FaRocket className="text-amber-400 text-sm" />
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <h1 className="text-3xl font-black text-slate-800 mb-3 tracking-tight">
          Payment <span className="text-teal-600">Successful!</span>
        </h1>
        <p className="text-slate-500 font-medium text-sm leading-relaxed mb-10">
          Hurray! Your payment was processed successfully. Your **Premium access** is now fully activated. Enjoy all the exclusive wisdom!
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            to="/public-lessons"
            className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-teal-700 transition-all shadow-lg shadow-teal-100"
          >
            Explore Premium Lessons <FaArrowRight size={12} />
          </Link>
          
          <Link
            to="/dashboard/profile"
            className="w-full flex items-center justify-center gap-2 bg-slate-50 text-slate-600 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-100"
          >
            Go to My Profile
          </Link>
        </div>

        {/* Order Info Hint */}
        <div className="mt-8 pt-8 border-t border-slate-50">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Session ID: {sessionId?.slice(0, 15)}...
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;