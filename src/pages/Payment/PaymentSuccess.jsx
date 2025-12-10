import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
      .then(res=>{
        console.log(res.data);
        
      })
    }
  }, [sessionId, axiosSecure]);

  return (
    <div>
      <h1 className="text-green-500">Payment Successful</h1>
    </div>
  );
};

export default PaymentSuccess;
