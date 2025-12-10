import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserStatus = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchUserStatus = async () => {
      try {
        const res = await axiosSecure.get(`/users/${user.email}`);
        setIsPremium(res.data?.isPremium === true);
      } catch (error) {
        console.error("❌ Failed to fetch user status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStatus();
  }, [user, axiosSecure]);

  return { isPremium, loading };
};

export default useUserStatus;
