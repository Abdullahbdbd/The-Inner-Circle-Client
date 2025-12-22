import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingPage from "../../component/LoadingPage/LoadingPage";

const Payment = () => {
  const { email } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: user = {} } = useQuery({
    queryKey: ["user", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${email}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      _id: user._id,
      email: user.email,
      price: 1500,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    window.location.assign(res.data.url);
  };

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
        {/* Decorative gradient blobs */}
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-gradient-to-br from-blue-400 via-teal-400 to-green-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-gradient-to-br from-green-400 via-teal-400 to-blue-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>

        {/* User Info */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <h2 className="text-2xl font-extrabold text-slate-800">
            {user?.displayName}
          </h2>
          <p className="text-gray-500 mb-6">{user?.email}</p>

          {/* Payment Card */}
          <div className="w-full bg-gradient-to-br from-blue-500 via-teal-400 to-green-400 rounded-2xl p-1 mb-6">
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <h3 className="text-lg font-semibold text-teal-600 mb-2">
                Premium Plan
              </h3>
              <p className="text-gray-700 mb-4">
                Lifetime access to <span className="font-bold">Premium</span> plan
              </p>
              <div className="text-3xl font-bold text-teal-600 mb-4">৳1500</div>
              <button
                onClick={handlePayment}
                className="w-full py-3 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 hover:scale-105 transition-transform"
              >
                Pay Now
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-400">
            Secure checkout powered by Stripe
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
