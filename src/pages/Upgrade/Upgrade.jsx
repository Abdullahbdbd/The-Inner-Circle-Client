import React from "react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

// Reusable feature row with icon
  const FeatureRow = ({ text, active }) => (
    <div className="flex items-start gap-3">
      <div
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
          active ? "bg-teal-500/10" : "bg-gray-200/70"
        }`}
      >
        {active ? (
          <svg
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            className="h-4 w-4 text-teal-500"
          >
            <path
              d="M5 13l4 4L19 7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            className="h-4 w-4 text-gray-400"
          >
            <path
              d="M6 18L18 6M6 6l12 12"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <p
        className={`text-sm font-medium ${
          active ? "text-slate-800" : "text-slate-500"
        }`}
      >
        {text}
      </p>
    </div>
  );

const Upgrade = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 flex flex-col items-center justify-center px-4 py-10">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 bg-clip-text text-transparent">
          Upgrade to Premium
        </h1>
        <p className="text-slate-600 mt-3">
          Unlock unlimited lessons, ad-free experience, and advanced tools!
        </p>
      </div>

      {/* Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 w-full max-w-5xl">
        {/* Free Plan Card */}
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
          <div className="p-8 relative">
            <h3 className="text-lg font-semibold text-slate-700 uppercase">
              Free Plan
            </h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-blue-600">৳0</span>
              <span className="text-sm text-slate-500">/ forever</span>
            </div>
            <p className="mt-2 text-slate-600 text-sm">
              Perfect for casual learners just getting started.
            </p>

            <div className="mt-6 space-y-3 text-left">
              <FeatureRow text="Up to 10 lessons only" active={false} />
              <FeatureRow
                text="Premium lesson creation not allowed"
                active={false}
              />
              <FeatureRow text="Limited access to public lessons" active={false} />
              <FeatureRow text="Contains ads" active={false} />
              <FeatureRow text="No priority listing" active={false} />
              <FeatureRow text="Limited access time" active={false} />
              <FeatureRow text="Basic email support" active={false} />
            </div>

            <button
              disabled
              className="mt-8 w-full py-3 rounded-full font-semibold bg-gray-200 text-slate-500 cursor-not-allowed"
            >
              Current Plan
            </button>
          </div>
        </div>

        {/* Premium Plan Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-white via-white to-white p-[1px] shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-teal-400 to-green-400 opacity-20"></div>

          <div className="relative rounded-2xl bg-white p-8">
            {/* Badge */}
            <div className="absolute -right-[1px] -top-[1px] overflow-hidden rounded-tr-2xl">
              <div className="absolute h-20 w-20 bg-gradient-to-r from-blue-500 to-green-500"></div>
              <div className="absolute h-20 w-20 bg-white/90"></div>
              <div className="absolute right-0 top-[22px] h-[2px] w-[56px] rotate-45 bg-gradient-to-r from-teal-400 to-green-400"></div>
              <span className="absolute right-1 top-1 text-[10px] font-semibold text-blue-600">
                POPULAR
              </span>
            </div>

            <h3 className="text-lg font-semibold text-blue-600 uppercase">
              Premium Plan
            </h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-teal-600">৳1500</span>
              <span className="text-sm text-slate-500">/ lifetime</span>
            </div>
            <p className="mt-2 text-slate-600 text-sm">
              For dedicated learners and creators
            </p>

            <div className="mt-6 space-y-3 text-left">
              <FeatureRow text="Unlimited lessons" active={true} />
              <FeatureRow text="Create premium lessons" active={true} />
              <FeatureRow text="Access all premium lessons" active={true} />
              <FeatureRow text="Ad-free experience" active={true} />
              <FeatureRow text="Featured priority listing" active={true} />
              <FeatureRow text="Lifetime access" active={true} />
              <FeatureRow text="24/7 premium support" active={true} />
            </div>

            <Link
              to={`/payment/${user.email}`}
              className="mt-8 block w-full py-3 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 hover:opacity-90 transition-all shadow-md text-center"
            >
              Upgrade to Premium
            </Link>

            <p className="text-xs text-center text-slate-500 mt-3">
              30-day money-back guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
