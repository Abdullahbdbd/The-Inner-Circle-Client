import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

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
    return <h1 className="text-center mt-10 text-lg">Loading...</h1>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-6">
      <h2 className="text-3xl font-bold">Upgrade to Premium 🌟</h2>

      <div className="card bg-base-100 shadow-lg p-6 w-96 text-center">
        <img
          src={user?.photo}
          alt={user?.displayName}
          className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
        />
        <h3 className="text-xl font-semibold">{user?.displayName}</h3>
        <p className="text-gray-600">{user?.email}</p>

        <div className="divider"></div>

        <p className="text-gray-700 mb-3">
          Lifetime access to <span className="font-bold">Premium</span> plan —
          ৳1500
        </p>

        <button onClick={handlePayment} className="btn btn-primary w-full">
          💳 Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
