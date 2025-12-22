import React from 'react';
import { Link } from 'react-router';
import { motion } from "framer-motion";
import { FaTimesCircle, FaUndo, FaArrowLeft } from "react-icons/fa";

const PaymentCancelled = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-[#f8fafc] px-6 py-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-xl shadow-slate-200/50 text-center relative overflow-hidden"
            >
                {/* Decorative background stripe */}
                <div className="absolute top-0 left-0 w-full h-2 bg-rose-500"></div>
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-rose-50 rounded-full opacity-50"></div>

                {/* Cancel Icon Animation */}
                <motion.div 
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center mx-auto mb-6"
                >
                    <FaTimesCircle className="text-rose-500 text-4xl" />
                </motion.div>

                {/* Text Content */}
                <h1 className="text-3xl font-black text-slate-800 mb-3 tracking-tight">
                    Payment <span className="text-rose-600">Cancelled</span>
                </h1>
                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-10">
                    It looks like the transaction was interrupted. No worries, your account hasn't been charged. Feel free to try again whenever you're ready.
                </p>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <Link
                        to="/upgrade"
                        className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg shadow-slate-200"
                    >
                        <FaUndo size={12} /> Try Again
                    </Link>
                    
                    <Link
                        to="/"
                        className="w-full flex items-center justify-center gap-2 bg-slate-50 text-slate-600 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-100"
                    >
                        <FaArrowLeft size={10} /> Back to Home
                    </Link>
                </div>

                {/* Support Hint */}
                <div className="mt-8 pt-8 border-t border-slate-50">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">
                        Need help? Contact our support team.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default PaymentCancelled;