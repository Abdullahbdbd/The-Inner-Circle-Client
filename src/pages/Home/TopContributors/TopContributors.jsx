import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TopContributors = () => {
  const axiosSecure = useAxiosSecure();
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const res = await axiosSecure.get("/top-contributors");
        setContributors(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchContributors();
  }, [axiosSecure]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );

  if (contributors.length === 0) return null;

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">🏆 Top Contributors of the Week</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {contributors.map((user, i) => (
            <div
              key={i}
              className="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition p-6"
            >
              <div className="flex flex-col items-center">
                <div className="avatar mb-3">
                  <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={user.creatorPhoto || "/default-avatar.png"}
                      alt={user.creatorName}
                    />
                  </div>
                </div>
                <h3 className="font-semibold text-lg">{user.creatorName}</h3>
                <p className="text-gray-500 text-sm">
                  {user.totalLessons} Lessons Created
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopContributors;
